# Engineering rules

## Architecture

Read `docs/architecture.md` and relevant design notes. Registry metadata lives beside source. Packages own schema, validation, generation, search, shared website UI, and canonical agent knowledge. Web code consumes validated generated data.

## Code

Use strict TypeScript, semantic React, and small client boundaries. Read the installed Next.js documentation under `apps/web/node_modules/next/dist/docs/` when framework behavior is uncertain. Keep animation engines out of the initial catalog bundle and use the generated lazy preview map. Do not evaluate arbitrary submitted code.

## Components

Declare every distribution file and third-party import. React is a peer requirement. Components must work outside this monorepo. Use scoped CSS and the common animation lifecycle hook. Metadata needs usage, props, dependencies, accessibility, author, license, and provenance. Adaptations require source URLs and retained notices. Parent links must not cycle.

## Dependencies

Evaluate purpose, maintenance, license, size, security, and alternatives. Pin direct dependency versions and use pnpm only. Keep optional animation engines local to their components. Do not add unrelated runtimes.

## Validation

`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm registry:validate`, `pnpm build`. For UI and distribution work also run browser and clean-install checks. Verify both themes, mobile, keyboard, and reduced motion. Update source and maintained docs together.

## Git and release

Use feature branches and Conventional Commits. Stage explicit reviewed paths. No unrelated modifications. Do not push, publish packages, or deploy without a user request. Generated distribution artifacts are deployment outputs, not tracked files. Add releases and Changesets when publicly versioned packages exist.

## Project memory

Update `memory/PROJECT_STATE.md` after substantial work. Record significant decisions, not transcripts or temporary task logs. Never commit AGENT.local.md, USER.md, local active-task notes, or the original bootstrap prompt.
