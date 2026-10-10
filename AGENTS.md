# BuildWithMe-UI agent entry point

BuildWithMe-UI is a single Next.js application serving a multi-framework component ecosystem.

Read in order: `AGENT.md`, `IDENTITY.md`, `memory/PROJECT_STATE.md`, `memory/DECISIONS.md`, relevant `design-notes/`, and package documentation.

- Typed manifests and React, Vue, and Svelte sources under `src/registry/designs/` are authoritative. Never edit generated public JSON or the generated import map.
- Use pnpm. Run `pnpm check` after substantial changes; add `pnpm test:e2e` for UI changes and `pnpm test:install` for distribution changes.
- Preserve licensing, creator attribution, reduced motion, and keyboard usability.
- Follow `CONTRIBUTING.md`. Work on feature branches. Inspect staged files before committing.
- Never track secrets, personal files, build outputs, bootstrap prompts, or temporary plans.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
