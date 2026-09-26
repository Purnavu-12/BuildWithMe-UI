# Engineering rules

## Architecture

This is one Next.js App Router application. Read `docs/architecture.md` before structural changes. Typed manifests and framework sources under `src/registry/designs/` are authoritative. Never edit `src/generated/`, `public/r/`, or other generated registry outputs.

## Components

Every design maintains React, Vue, and Svelte capability parity. Use each framework naturally while preserving visual intent, public behavior, keyboard interaction, labels, reduced motion, and failure recovery. Do not execute arbitrary submitted source in the browser.

## Interface Cosmos

`src/lib/home-story.ts` is the internal homepage narrative configuration. Featured IDs must exist in the registry and all displayed counts must be derived. Motion owns scroll-linked DOM state, Anime.js owns isolated SVG or code timelines, and React Three Fiber owns canvas state. Never assign the same element to multiple animation engines. Preserve the server-rendered reading order and CSS/SVG fallback.

## Provenance

Original work needs a creator identity and license confirmation. Adapted work requires upstream URL, author, license, and a modification note. Remixes require a valid parent and modification note. Preserve notices in source and generated artifacts.

## Validation

Use pnpm. Run `pnpm check` after substantial changes, `pnpm test:e2e` for experience changes, and `pnpm test:install` for registry or distribution changes. Inspect dark and light themes, mobile layouts, keyboard behavior, and reduced motion.

## Git and release

Work on feature branches and stage explicit reviewed paths. Do not track secrets, caches, generated files, `.release`, local memory, or bootstrap prompts. Do not publish packages, push, or deploy unless the user asks.
