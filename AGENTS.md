# BuildWithMe-UI agent entry point

BuildWithMe-UI is a community source-component registry, with a Next.js discovery website.

Read in order: `AGENT.md`, `IDENTITY.md`, `memory/PROJECT_STATE.md`, `memory/DECISIONS.md`, relevant `design-notes/`, and package documentation.

- Registry source and metadata are authoritative. Never edit generated public JSON or the generated import map.
- Use pnpm. Run `pnpm check` after substantial changes; add `pnpm test:e2e` for UI changes and `pnpm test:install` for distribution changes.
- Preserve licensing, creator attribution, reduced motion, and keyboard usability.
- Follow `CONTRIBUTING.md`. Work on feature branches. Inspect staged files before committing.
- Never track secrets, personal files, build outputs, bootstrap prompts, or temporary plans.
