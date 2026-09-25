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

Pages, documentation, search inputs, and registry metadata are server-rendered. Interactive previews are lazy imports. The homepage Three.js universe is isolated behind a client-side dynamic import and replaced by a static composition for reduced motion. The catalog does not eagerly load every preview or framework runtime.
