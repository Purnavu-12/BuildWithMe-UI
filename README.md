# BuildWithMe UI

A little less from scratch. A lot more possibility.

An open-source, community-driven React component registry. Discover, preview, install, and remix 25 original components built with CSS, Motion, and Anime.js. Component source and metadata are authoritative; the website and installable artifacts are generated views of the registry.

## Run locally

Requires Node.js 22+ and pnpm 10.28.1.

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. The dev command generates the registry before starting Next.js. Restart it after changing metadata or adding entries.

## Install a component

Initialize shadcn in your React project, then copy the command from a component page. For a locally running registry:

```sh
pnpm dlx shadcn@latest add http://localhost:3000/r/magnetic-button.json
```

Files land in `components/buildwithme/magnetic-button/`. You own the source. Install only the engines you use; preserve attribution notices.

## Contribute

```sh
pnpm component:new my-button buttons css
pnpm registry:validate
pnpm check
```

See [CONTRIBUTING.md](CONTRIBUTING.md) and [architecture](docs/architecture.md). The [agent guide](AGENTS.md) explains where to start. Live documentation is served at `/docs/installation`.

## Quality checks

`pnpm check` runs lint, type checks, unit tests, registry validation, and a production build. `pnpm test:e2e` runs browser and accessibility checks after building. `pnpm test:install` installs all registry entries through the shadcn CLI into an isolated Next.js fixture and builds it.

## Configuration

Copy `.env.example` to `apps/web/.env.local` for Next.js public links. Set the same variables in the shell or deployment environment for registry generation. Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_REPOSITORY_URL` only when real public destinations exist. No accounts, backend credentials, analytics, or hosted AI services are required.

## License

MIT. Original components credit BuildWithMe-UI contributors. See [LICENSE](LICENSE), [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md), and each entry's provenance. Custom CLI and MCP hosting are future interfaces, not V0 features.
