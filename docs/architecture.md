# Architecture

Git is the authoritative store. `registry/<category>/<id>/` contains metadata, source, scoped CSS, preview, and README. Shared animation lifecycle and base styles live in `registry/shared/` and are explicitly listed in each entry.

## Pipeline

Schema → validator → generated data, lazy preview map, discovery index, shadcn JSON → Next.js website and source consumers.

`packages/registry-schema` owns public metadata types. `validator` validates all entries and imports using the TypeScript parser. `registry` generates outputs and normalizes local imports for source distribution. `search` filters discovery data. `ui` owns shared website controls. `agent-kit` owns canonical agent instructions.

The website uses server-rendered detail and documentation routes, a client-side searchable catalog, and lazy component previews. The preview map only imports reviewed repository files. Effects pause off-screen, in hidden tabs, and under reduced-motion preferences.

## Public outputs

- `/registry.json`: shadcn registry manifest.
- `/r/<id>.json`: source files, exact dependencies, attribution, and provenance.
- `/index.v1.json`: versioned discovery metadata.
- `/llms.txt`: machine-readable entry points.

Artifacts in public/r, the manifest/index, and src/generated are reproducible build outputs and ignored. Build before serving. Production origin and repository links are environment configuration. No database or credentials are required.

## Deliberate boundaries

React only in V0. Preview tooling belongs to apps/web. No empty CLI, MCP, core, or playground packages. A custom installer, hosted submissions, accounts, arbitrary code execution, and analytics are deferred. Public rollout requires a real domain, repository URL, private reporting channel, and GitHub branch protection.
