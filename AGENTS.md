# BuildWithMe-UI agent entry point

BuildWithMe-UI is a Next.js application supporting React, Vue, and Svelte components.

## Reading order
- `AGENT.md` — engineering rules and repository conventions.
- `IDENTITY.md` — engineering principles and priorities.
- `docs/architecture.md` — read before structural changes.
- `docs/component-contracts.md` — read before changing component behavior.
- `CONTRIBUTING.md` — contribution workflow and guidelines.

## Development rules
- **Source of truth:** `src/registry/designs/` contains authoritative manifests and framework implementations. Never edit generated registry outputs or import maps directly.
- **Validation:** Use pnpm. Run `pnpm check:quick` by default; use `pnpm check` for substantial changes, `pnpm test:e2e` for UI changes, and `pnpm test:install` for distribution changes.
- **Accessibility and licensing:** Preserve keyboard usability, reduced-motion support, creator attribution, and license notices.
- **Contribution workflow:** Follow `CONTRIBUTING.md`, work on feature branches, and inspect staged files before committing.
- **Git hygiene:** Never commit secrets, personal files, build outputs, bootstrap prompts, or temporary plans.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

Next.js APIs and conventions may differ from your training data. Before writing code, consult the relevant guide under `node_modules/next/dist/docs/` and follow any deprecation notices.

This block is maintained by `next dev`. See `node_modules/next/dist/server/lib/generate-agent-files.js`. Avoid editing or removing it manually, as the development server may recreate it.

<!-- END:nextjs-agent-rules -->