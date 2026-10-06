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
- Generator-owned legacy `/index.v1.json` compatibility projection; v2 remains canonical.

`scripts/build-preview-runtimes.ts`, invoked by `previews:build`, separately generates isolated, code-split Vue and Svelte runtimes with Vite. Public handbook and root documentation are authored.

Generated output is ignored by Git. Submitted code is never executed dynamically; only reviewed source included in generated maps can render. React previews mount through Next.js. Vue and Svelte previews mount inside same-origin iframes and communicate through a typed `theme`, `pause`, `replay`, `ready`, and `error` message protocol. A framework route loads only its selected runtime.

Every component surface accepts the public `data-bwm-theme="dark|light"` boundary. Component tokens inherit from the nearest boundary, which allows a dark artifact inside the light site and the inverse without ancestor-selector leakage.

## Package publication

`scripts/build-packages.ts` creates untracked publication folders in `.release/`:

- React is bundled with tsup using per-component entry points; TypeScript emits declarations from the real source props.
- Vue SFCs are compiled with Vite and the Vue plugin; `vue-tsc` emits declaration files and package export conditions point to them.
- Svelte components and declarations are processed with `svelte-package` using a package-local TypeScript configuration.

The public package names are `@buildwithme/react`, `@buildwithme/vue`, and `@buildwithme/svelte`. The release check creates real tarballs, validates declaration targets, and inspects required license contents. Publishing is a separate release action; the site marks npm as unpublished until that action succeeds.

`scripts/source-artifacts.ts` recursively resolves reviewed relative imports within the registry boundary, rejects missing paths and filename collisions, and rewrites a complete flat source closure. Raster imports become portable data-URL modules. Registry source installation and package builds use the same collector. `test:install` consumes tarballs in `.release/tarballs/`, compiles all public artifacts in separate consumer folders, and builds consumers using all package exports. Rebuilding package folders preserves packed tarballs intended for upload.

`ComponentWorkbench` owns one framework choice synchronized through the URL. Preview, usage, source files, and installation follow it; native browser history restores the query selection. Catalog previews remain lazy React thumbnails and identify their runtime.

## Rendering and performance

Pages, documentation, search inputs, chapter copy, and registry metadata are server-rendered. Interactive previews are lazy imports. The catalog does not eagerly load every preview or framework runtime.

The homepage story is configured in `src/lib/home-story.ts`. It validates its featured IDs against the registry and derives every public count from registry data. `InterfaceCosmos` progressively enhances the server-rendered chapters: Native scroll updates chapter navigation; artwork is independent of scroll position. Motion owns component DOM transitions, Anime.js owns the autonomous SVG timeline, and React Three Fiber owns the hero canvas. No element is controlled by two engines.

The Three.js universe is imported from a client boundary, reserves its dimensions, uses one instanced node mesh and one buffered line network, and pauses when the story is hidden or off-screen. The server-rendered SVG/CSS constellation remains available before hydration and is the final presentation for mobile, reduced motion, save-data, low-power, and WebGL failure modes. See `docs/motion-system.md` for budgets and verification.

Global command search uses a native dialog and searches components, product domains, documentation, and frameworks. It is available from the header and with `Command/Ctrl + K` or `/` outside editable fields.
