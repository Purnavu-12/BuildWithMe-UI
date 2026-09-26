# Architecture

BuildWithMe-UI is one Next.js App Router application. The website, documentation, registry service, search, previews, validation, contributor tooling, and release packaging live in this repository without workspace or Turborepo boundaries.

## Authoritative data

`src/registry/designs/<id>/` is the source of truth. Each design has:

- `manifest.ts` — typed metadata, framework mapping, accessibility, installation, and provenance.
- `react.tsx` — React and Next.js implementation.
- `vue.vue` — Vue and Nuxt implementation.
- `svelte.svelte` — Svelte and SvelteKit implementation.
- An optional design stylesheet when an existing effect benefits from shared CSS.

The manifest uses a discriminated provenance model. Original work needs a creator and license. Adaptations additionally require upstream URL, author, license, and modification notes. Remixes require a valid parent and modification notes.

## Generation

`scripts/registry.ts` validates manifests, safe paths, files, dependencies, relations, and provenance. It generates:

- `/registry.json`
- `/r/<framework>/<id>.json`
- `/index.v2.json`
- `/.well-known/buildwithme.json`
- The server-consumed registry and source data.
- A statically analyzable lazy React preview map.

Generated output is ignored by Git. Submitted code is never executed dynamically; only reviewed source included in the generated import map can render.

## Package publication

`scripts/build-packages.ts` creates untracked publication folders in `.release/`:

- React is bundled with tsup using per-component entry points.
- Vue SFCs are compiled with Vite and the Vue plugin.
- Svelte components are processed with `svelte-package`.

The public packages are `@buildwithme/react`, `@buildwithme/vue`, and `@buildwithme/svelte`. Publishing is a separate release action.

## Rendering and performance

Pages, documentation, search inputs, chapter copy, and registry metadata are server-rendered. Interactive previews are lazy imports. The catalog does not eagerly load every preview or framework runtime.

The homepage story is configured in `src/lib/home-story.ts`. It validates its featured IDs against the registry and derives every public count from registry data. `InterfaceCosmos` progressively enhances the server-rendered chapters: Motion owns chapter progress and DOM transitions, Anime.js owns the isolated SVG/code ignition sequence, and React Three Fiber owns the canvas. No element is controlled by two engines.

The Three.js universe is imported from a client boundary, reserves its dimensions, uses one instanced node mesh and one buffered line network, and pauses when the story is hidden or off-screen. The server-rendered SVG/CSS constellation remains available before hydration and is the final presentation for mobile, reduced motion, save-data, low-power, and WebGL failure modes. See `docs/motion-system.md` for budgets and verification.

Global command search uses a native dialog and searches components, product domains, documentation, and frameworks. It is available from the header and with `Command/Ctrl + K` or `/` outside editable fields.
