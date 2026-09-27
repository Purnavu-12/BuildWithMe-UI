# BuildWithMe UI

**Build the interface. Keep the source.**

BuildWithMe-UI is an open-source component ecosystem served by one Next.js application. Its 55 designs ship as 165 React, Vue, and Svelte framework sources. Install framework-specific source for ownership or copy the code directly. Package builds exist for release verification, but the packages are not yet published to npm.

The homepage tells that system as **Interface Cosmos**: one source signal expands into a registry-derived constellation, translates across three frameworks, becomes installable source, and returns to an open contributor orbit. The story copy and controls are server-rendered. Motion coordinates scroll-linked DOM transitions, Anime.js owns isolated line and code sequences, and React Three Fiber owns the optional constellation canvas. Mobile, reduced-motion, save-data, low-power, and WebGL failure paths use the same semantic story with CSS and SVG.

## Your first contribution

New here? Start with [FIRST_CONTRIBUTION.md](FIRST_CONTRIBUTION.md). A documentation, copy, or small UI fix takes one branch and one relevant check. You do not need to know React, Vue, Svelte, and the registry to help.

## Start locally

Requires Node.js 22+ and pnpm 10.28.1.

```sh
pnpm install
pnpm dev
```

Open `http://localhost:3000`. The dev command validates and generates the registry before starting Next.js.

## Install components

Every component page provides the currently available source command:

```sh
pnpm dlx shadcn@latest add https://build-with-me-ui.vercel.app/r/react/magnetic-button.json
```

The package publication folders are generated with `pnpm packages:build` and remain untracked until a release is prepared. The site does not present npm commands as available until a real release is published.

## Add a design

```sh
pnpm component:new signal-card data-display css
pnpm registry:validate
pnpm check
```

The scaffold creates four authored files: a typed manifest and React, Vue, and Svelte sources. Catalog metadata, documentation, previews, registry artifacts, package exports, discovery records, and README content are generated.

See [CONTRIBUTING.md](CONTRIBUTING.md), [architecture](docs/architecture.md), [design system](docs/design-system.md), and [motion system](docs/motion-system.md). Coding tools use the canonical [agent guidance](AGENTS.md); human contributors do not need it.

## Quality commands

- `pnpm check` validates formatting-independent code quality, types, tests, the registry, the Next.js production build, and all three package outputs.
- `pnpm test:e2e` verifies the discovery journey, accessibility, responsive layouts, reduced motion, and public registry endpoints.
- `pnpm test:install` builds publication folders, validates all 165 source artifacts, compiles Svelte output, and builds clean Next.js, Nuxt, and SvelteKit package fixtures.

## Configuration

Copy `.env.example` to `.env.local` when you need to override the canonical production site or repository URL.

Run `pnpm env:validate` in the production environment before deploying. It rejects missing, invalid, non-HTTPS, and localhost public URLs.

## License

Original project code is MIT licensed. Adapted and remixed designs retain their recorded upstream licenses and provenance. See [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
