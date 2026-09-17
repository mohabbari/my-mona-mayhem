<div align="center">

# 🎮 Mona Mayhem

### Build your GitHub contribution battle arena

**A retro arcade-themed Astro workshop for VS Code and GitHub Copilot CLI.**

[Start the workshop](workshop/00-overview.md) · [Use this template](https://github.com/mohabbari/my-mona-mayhem/generate)

</div>

🌐 [Português (Brasil)](README.pt_BR.md) | [Español](README.es.md)

![Mona Mayhem Screenshot](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)

> **Mona Mayhem** is a workshop template for building a retro arcade-style website that compares the GitHub contribution graphs of two users. This is the **starting point**: you’ll build the app step by step with GitHub Copilot.

## 🕹️ What you’ll build

Turn contribution streaks into an arcade showdown. Along the way, you’ll practice:

- Designing and building an Astro application
- Working with GitHub contribution data
- Iterating on a distinctive, design-first visual theme
- Using GitHub Copilot to plan, implement, review, and polish a project

*The screenshot above shows what you’ll build by the end of the workshop.*

## 📚 Choose your workshop path

Follow the track that matches the way you like to work:

- **VS Code track** — Chat, Plan Mode, Agent Mode, background agents, and editor-native review loops
- **CLI track** — `copilot`, `@file` context, `/plan`, autonomous edits, `/fleet`, `/delegate`, and `/review`

| Part | Title | Copilot focus |
| --- | --- | --- |
| [00](workshop/00-overview.md) | Overview | Track selection and learning goals |
| [01](workshop/01-setup.md) | Setup & Context Engineering | Instructions, permissions, and environment setup |
| [02](workshop/02-plan-and-scaffold.md) | Plan & Scaffold | Planning the API and page architecture |
| [03](workshop/03-agent-mode.md) | Build the Game | Agentic implementation and iteration |
| [04](workshop/04-design-vibes.md) | Design-First Theming | Visual design planning and implementation |
| [05](workshop/05-polish.md) | Polish & Parallel Work | Parallelism, reviews, and quality passes |
| [06](workshop/06-bonus.md) | Bonus & Extensions | Open-ended feature ideas and extra Copilot experiments |

## 🚀 Get started

### 1. Create your own repository

Click **Use this template** to create a new repo, or fork this repository.

### 2. Pick your workflow

- **VS Code:** Clone your repo and open it in VS Code.
- **GitHub Copilot CLI:** Clone your repo locally, install `copilot`, and work from your terminal.

### 3. Enter the arena

Open the [workshop guide](workshop/00-overview.md) and start building.

## ✅ Prerequisites

### Shared

- GitHub Copilot (Pro, Business, or Enterprise)
- Git
- Node.js

### VS Code track

- VS Code v1.107+
- GitHub Copilot extension signed in

### CLI track

- GitHub Copilot CLI (`copilot`)
- Node.js 22+ if you plan to install the CLI via `npm install -g @github/copilot`
- Or Homebrew / WinGet if you prefer a native package manager install

## 🧰 Technology stack

- **Framework:** [Astro](https://astro.build/) v6
- **Runtime:** Node.js with the [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/) adapter
- **Font:** Press Start 2P (retro gaming font)
- **API:** GitHub’s contribution graph API

## 🚢 Deployment notes

### Current GitHub Pages setup

The workflow in `.github/workflows/deploy.yml` currently deploys static workshop/docs content from `docs/` and `workshop/` to GitHub Pages. It does not build or deploy the Astro app from `src/`.

### Deploying the Astro app to GitHub Pages

GitHub Pages is static hosting, so the Astro app should use static output:

1. Change `output` in `astro.config.mjs` from `server` to `static`.
2. Remove the Node adapter (`@astrojs/node`) from `astro.config.mjs` and `package.json`.
3. Update the GitHub Actions workflow to run `npm ci` and `npm run build`, then upload `dist/` as the Pages artifact.
4. If deploying to a project page (`https://<user>.github.io/<repo>/`), set `site` and `base` in `astro.config.mjs`.

If you plan to keep API routes running in production, use a server platform instead of GitHub Pages, such as Vercel, Netlify, or a Node host.

## 📄 License

[MIT](LICENSE)
