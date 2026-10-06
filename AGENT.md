# Engineering rules

## Architecture

This is one Next.js App Router application. Read `docs/architecture.md` before structural changes. Typed manifests and framework sources under `src/registry/designs/` are authoritative. Never edit `src/generated/`, `public/r/`, or other generated registry outputs.

## Components

Every design maintains React, Vue, and Svelte capability parity. Use each framework naturally while preserving visual intent, public behavior, keyboard interaction, labels, reduced motion, and failure recovery. Do not execute arbitrary submitted source in the browser.

The selected product direction is Kinetic Playground / Center Stage. Read `docs/component-contracts.md` before changing advertised behavior. Compilation is evidence for source integrity, not browser parity. Keep verification provisional until the contract and visual review pass. `scripts/source-artifacts.ts` owns dependency closure materialization; include helpers, styles, portable artwork modules, and notices in source and package outputs.

## Interface Cosmos

`src/lib/home-story.ts` is the internal homepage narrative configuration. Featured IDs must exist in the registry and all displayed counts must be derived. Native scroll updates chapter navigation only; the hero artwork animates in place. Motion owns component DOM state, Anime.js owns isolated SVG or code timelines, and React Three Fiber owns canvas state. Never assign the same element to multiple animation engines. Preserve the server-rendered reading order and CSS/SVG fallback.

## Provenance

Original work needs a creator identity and license confirmation. Adapted work requires upstream URL, author, license, and a modification note. Remixes require a valid parent and modification note. Preserve notices in source and generated artifacts.

## Validation

Use pnpm. The default CI runs `pnpm check:quick`: lint, types, unit tests, and registry validation in one job. Choose broader local checks by scope: `pnpm check` for substantial build changes, `pnpm test:e2e` for relevant interactions, and `pnpm test:install` for distribution changes. Avoid requiring the entire browser matrix or new screenshot baselines for routine contributions. Inspect dark and light themes, mobile layouts, keyboard behavior, and reduced motion when affected.

## Git and release

Work on feature branches and stage explicit reviewed paths. Do not track secrets, caches, generated files, `.release`, local memory, or bootstrap prompts. Do not publish packages, push, or deploy unless the user asks.
