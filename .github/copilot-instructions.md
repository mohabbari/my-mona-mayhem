# Mona Mayhem Instructions

## Project Overview

- Mona Mayhem is a retro arcade-style Astro app for comparing two GitHub contribution graphs.
- The application lives in `src/`; ignore `workshop/` and its translations unless a task explicitly targets workshop content.
- `docs/` contains published workshop documentation, not the Astro application.
- The app uses Astro 6, TypeScript strict mode, and the Node adapter in server output mode.
- Server API routes live under `src/pages/api/`. The contributions endpoint is dynamic and must remain server-rendered (`prerender = false`).

## Commands

- `npm run dev` starts the local Astro development server.
- `npm run build` creates a production build and is the primary validation command.
- `npm run preview` serves the production build locally.
- `npm run astro -- check` runs Astro's TypeScript and template checks when needed.

## Astro Practices

- Follow Astro file-based routing: pages belong in `src/pages/`; use `src/pages/api/` for endpoints.
- Prefer static Astro templates by default; add client-side JavaScript only for interactive UI that cannot be handled on the server.
- Keep API handlers typed with `APIRoute`, validate route parameters and remote responses, and return appropriate JSON status codes and content types.
- Preserve the existing tab indentation and TypeScript strictness. Keep changes focused and avoid unrelated refactors.
- Use public assets through root-relative paths such as `/favicon.svg` and keep secrets out of client-side code and committed files.