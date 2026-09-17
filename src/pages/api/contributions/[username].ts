import type { APIRoute } from 'astro';

export const prerender = false;

// GitHub usernames: 1-39 chars, alphanumeric with single (non-leading/trailing/doubled) hyphens.
const USERNAME_PATTERN = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

const UPSTREAM_TIMEOUT_MS = 8000;
const CACHE_TTL_MS = 5 * 60 * 1000;

interface CacheEntry {
	body: string;
	expiresAt: number;
}

const contributionsCache = new Map<string, CacheEntry>();

function jsonResponse(body: unknown, status: number, cacheable: boolean): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': cacheable
				? `public, max-age=300, s-maxage=3600, stale-while-revalidate=86400`
				: 'no-store',
		},
	});
}

export const GET: APIRoute = async ({ params }) => {
	const rawUsername = params.username?.trim();

	if (!rawUsername || !USERNAME_PATTERN.test(rawUsername)) {
		return jsonResponse({ error: 'Invalid username' }, 400, false);
	}

	const username = rawUsername.toLowerCase();

	const cached = contributionsCache.get(username);
	if (cached && cached.expiresAt > Date.now()) {
		return new Response(cached.body, {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
			},
		});
	}

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

	let response: Response;
	try {
		response = await fetch(`https://github.com/${encodeURIComponent(username)}.contribs`, {
			signal: controller.signal,
		});
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			return jsonResponse({ error: 'Upstream request timed out' }, 504, false);
		}
		return jsonResponse({ error: 'Failed to reach GitHub' }, 502, false);
	} finally {
		clearTimeout(timeout);
	}

	if (response.status === 404) {
		return jsonResponse({ error: 'User not found' }, 404, false);
	}

	if (!response.ok) {
		return jsonResponse({ error: 'Upstream service error' }, 502, false);
	}

	let data: unknown;
	try {
		data = await response.json();
	} catch {
		return jsonResponse({ error: 'Received malformed data from GitHub' }, 502, false);
	}

	const body = JSON.stringify(data);
	contributionsCache.set(username, { body, expiresAt: Date.now() + CACHE_TTL_MS });

	return new Response(body, {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
		},
	});
};
