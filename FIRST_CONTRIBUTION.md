# Make your first contribution in 10 minutes

You can improve BuildWithMe UI without learning three frameworks or the registry system. Start with documentation, copy, accessibility notes, a small website fix, or a focused issue labeled [`good first issue`](https://github.com/Purnavu-12/BuildWithMe-UI/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

## 1. Get the project running

```sh
git clone https://github.com/Purnavu-12/BuildWithMe-UI.git
cd BuildWithMe-UI
pnpm install
pnpm dev
```

Open `http://localhost:3000` and choose one small change. Ask on the issue if its scope is unclear.

## 2. Create a branch and make the change

```sh
git switch -c docs/clearer-installation
```

Useful starting points:

- Improve wording in `README.md`, `CONTRIBUTING.md`, or `src/lib/docs.ts`.
- Fix a keyboard label, focus state, contrast issue, or responsive layout.
- Reproduce a reported bug and add clear steps to the issue.
- Improve one existing React, Vue, or Svelte source without changing its shared public capability.

You only need three-framework parity when you add a new design or change a capability shared by all frameworks.

The current visual direction is Kinetic Playground: charcoal and warm paper, lime, cyan, and coral. For component work, start with the [acceptance contracts](docs/component-contracts.md). Install the full source closure, including helpers, styles, and notices; copying only the main source file may leave required files behind. npm packages remain unpublished.

## 3. Run the check that matches your change

| Change                                   | Before opening the pull request                       |
| ---------------------------------------- | ----------------------------------------------------- |
| Markdown or copy only                    | Review the rendered text and links                    |
| Website TypeScript or styles             | `pnpm lint && pnpm typecheck`                         |
| Registry metadata or one existing source | `pnpm registry:validate && pnpm typecheck`            |
| New design or shared capability          | `pnpm check:quick` and review the changed interaction |

CI runs only lint, types, unit tests, and registry validation. Broader build, browser, and package checks are available locally when relevant; you do not need to run every suite for a small fix. If an unrelated check fails, include the result in your pull request and ask for help.

## 4. Open the pull request

Explain the problem, what changed, and how you checked it. Screenshots help with visible changes. Provenance is required only when source or visual work comes from another project.

Every useful contribution counts: typo fixes, issue reproduction, docs, accessibility review, design feedback, and code.
