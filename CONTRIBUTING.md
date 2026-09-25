# Contributing

Bug reports, docs, accessibility improvements, reviews, components, and engine variants are welcome.

## First contribution

1. Fork and clone the repository. Install Node.js 22+ and pnpm 10.28.1.
2. Run `pnpm install`; create `feat/<description>` or `fix/<description>`.
3. Run `pnpm component:new my-button buttons css`. Categories: buttons, text, cards, backgrounds, ai. Engines: css, motion, animejs.
4. Complete the generated source, CSS, preview, metadata, and README. Replace placeholder descriptions. Credit the actual creator; never invent an identity.
5. Run `pnpm registry:validate` and `pnpm dev`. Inspect the component at `/components/my-button`.
6. Run `pnpm check`. For distribution or UI changes, run `pnpm test:install` and `pnpm test:e2e` after installing Chromium with `pnpm exec playwright install chromium`.
7. Open a PR using the template. Include screenshots, dependencies, provenance, validation results, and accessibility notes.

## Source distribution

Every import must be declared. Include local files in metadata; no private workspace aliases. The builder flattens listed files into `components/buildwithme/<id>/` and rewrites local imports. File basenames within an entry must be unique. Test installation in a clean project.

## Accessibility

Semantic controls, keyboard operation, visible focus, meaningful names, sufficient contrast, and reduced-motion behavior are required. Hover cannot be the sole way to access an action. Do not announce every animation frame to screen readers. Effects must clean up when unmounted.

## Attribution

Submit original or clearly licensed MIT-compatible code. Adaptations need origin, sourceUrl, adaptation notes, and retained notices. Remixes set parent to a valid registry ID and preserve original credit. No paid kits, premium Motion code, or uncertain-license snippets.

## Review

One logical change per PR. Maintainers review behavior, documentation, accessibility, dependencies, provenance, and installability. No arbitrary user submissions execute on the website before review. Use Conventional Commits. Never commit local plans, credentials, dependency folders, build outputs, or generated registry artifacts.
