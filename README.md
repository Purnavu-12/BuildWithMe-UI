# BuildWithMe UI

**Build the interface. Keep the source.**

BuildWithMe-UI is an open-source component ecosystem served by one Next.js application. Its 40 designs ship as 120 native React, Vue, and Svelte implementations. Install a tree-shakeable package for speed, add framework-specific source for ownership, or copy the code directly.

## Start locally

Requires Node.js 22+ and pnpm 10.28.1.

```sh
pnpm install
pnpm dev
```

Open `http://localhost:3000`. The dev command validates and generates the registry before starting Next.js.

## Install components

```sh
pnpm add @buildwithme/react
pnpm add @buildwithme/vue
pnpm add @buildwithme/svelte
```

Every component page also provides a source command such as:

```sh
pnpm dlx shadcn@latest add http://localhost:3000/r/react/magnetic-button.json
```

The package publication folders are generated with `pnpm packages:build` and remain untracked until a release is prepared.

## Add a design

```sh
pnpm component:new signal-card data-display css
pnpm registry:validate
pnpm check
```

The scaffold creates four authored files: a typed manifest and native React, Vue, and Svelte sources. Catalog metadata, documentation, previews, registry artifacts, package exports, discovery records, and README content are generated.

See [CONTRIBUTING.md](CONTRIBUTING.md), [architecture](docs/architecture.md), and [agent guidance](AGENTS.md).

## Quality commands

- `pnpm check` validates formatting-independent code quality, types, tests, the registry, the Next.js production build, and all three package outputs.
- `pnpm test:e2e` verifies the discovery journey, accessibility, responsive layouts, reduced motion, and public registry endpoints.
- `pnpm test:install` builds publication folders, checks all 120 source artifacts, compiles Svelte output, and builds a clean Next.js fixture from `@buildwithme/react`.

## Configuration

Copy `.env.example` to `.env.local`. `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_REPOSITORY_URL` remain optional until real public destinations exist.

## License

Original project code is MIT licensed. Adapted and remixed designs retain their recorded upstream licenses and provenance. See [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
