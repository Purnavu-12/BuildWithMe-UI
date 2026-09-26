# Contributing to BuildWithMe UI

Thank you for helping build an open component ecosystem. Contributions can be new designs, framework parity improvements, accessibility fixes, documentation, bug reports, or reviews.

## Create a component

```sh
pnpm install
pnpm component:new signal-card data-display css
pnpm dev
```

The scaffold creates four authored files under `src/registry/designs/signal-card/`: one typed manifest and React, Vue, and Svelte sources. Generated previews, documentation, search data, registry JSON, package maps, and README content are not edited manually.

## Completion requirements

- Preserve equivalent capability and accessibility across React, Vue, and Svelte.
- Use semantic controls, visible focus, useful labels, and reduced-motion behavior.
- Declare every non-framework dependency with an exact version.
- Keep the implementation usable outside this repository.
- Test keyboard, touch, dark and light themes, and responsive layouts.
- Add focused tests for stateful or failure-prone behavior.

The registry currently guarantees three source variants per design. Do not describe a design as having native framework parity until its parity review covers props, emitted events, visual intent, keyboard behavior, labels, state transitions, reduced motion, and failure recovery in all three frameworks.

## Motion contributions

Assign each animated element to one owner: CSS for simple state transitions, Motion for React gestures and scroll-linked DOM state, Anime.js for isolated timelines, or Three.js for canvas rendering. Provide a readable reduced-motion state and never require the canvas for navigation or meaning. New homepage story placements belong in the internal story configuration rather than component manifests.

## Provenance

- Original work: provide your display name or GitHub handle and confirm the license.
- Adapted work: also provide the upstream URL, author, license, and a concise modification note.
- Remix: reference the parent registry ID and describe the variation.

Do not submit premium code, copied source with incompatible licensing, or work with uncertain ownership.

## Validate

```sh
pnpm registry:validate
pnpm check
pnpm test:e2e
pnpm test:install
```

Use the pull request template and include screenshots, parity notes, accessibility verification, dependency changes, and provenance.
