# Production readiness audit and implementation plan

Audit date: 2026-09-26. Baseline: commit `3995ed1`.

## Implementation status

The production-readiness branch now has an explicit `data-bwm-theme` boundary, removes duplicated global theme definitions from adapted CSS, follows the site theme by default, preserves explicit preview overrides, and retries React failures through a local remount. Vue and Svelte framework routes mount generated, code-split runtimes inside same-origin iframes with typed theme, pause, replay, ready, and error messages. These sources remain **provisional** until the capability parity audit is complete.

The catalog introduction and component detail hierarchy have been compressed so artifacts appear in the first viewport. Cards expose source availability, creator attribution, lifecycle state, and framework-source wording. npm is visibly unpublished; source installation is the active path. Icons, Open Graph artwork, manifest, robots, sitemap gating, repository configuration, production URL validation, CODEOWNERS, issue labels, package dependency aggregation, generated React/Vue/Svelte declarations, notice files, real tarball inspection, and a protected manual release workflow are implemented.

The current verification pass completed `pnpm check`, `pnpm test:install`, and all 78 Playwright cases in Chromium, Firefox, and WebKit. The browser suite includes 24 dark/light responsive image baselines, automated accessibility checks, isolated framework preview checks, reduced-motion and save-data fallbacks, and theme isolation. The visual baselines still need human approval before they become a release gate.

The remaining release gates are full 55-design behavior parity across Vue and Svelte, independent installation of every source artifact into clean fixtures, baseline visual regression approval across all target browsers and viewports, measured field performance, npm ownership, Storybook generation, and the opt-in live editor. The canonical production target is `https://build-with-me-ui.vercel.app`; package publication has not been performed.

## Assessment

The repository has useful registry, routing, packaging, and test infrastructure, but is not yet ready to promise production-quality multi-framework components. Build success does not establish behavior, styling, accessibility, or installation parity. Do not claim superiority to shadcn/ui or VengeanceUI without comparable evidence.

## Baseline findings and current disposition

The table records the defects found at the start of this branch. Theme leakage, preview misrepresentation, CSS pollution, declaration generation, tarball inspection, public wording, visual assertions, community routing, and browser artwork are fixed. Framework behavior parity and independent source-artifact installation remain open and are represented publicly as provisional.

| Priority | Finding                                        | Evidence and consequence                                                                                                                                                                                                                                                                     |
| -------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0       | Nested preview theme leaks                     | Browser reproduction: open magnetic-button, set site to light and retain dark preview. Stage background is `rgb(5, 5, 5)`, component foreground is `rgb(32, 37, 27)`, panel token is `#fff`. The ancestor light selector in `src/registry/shared/base.css` crosses the nested dark boundary. |
| P0       | Framework preview misrepresentation            | `src/app/preview/[id]/[framework]/page.tsx` validates framework but renders the same React-only `Preview` for every framework.                                                                                                                                                               |
| P0       | Framework sources lack equivalent behavior     | Glass dock Vue source is an `adapt-simple` card with an inert Explore button; React is a dock. Adaptive sidebar Vue is a generic toggling card, unlike the React navigation. Audit every source; source-file counts are not parity evidence.                                                 |
| P0       | Cross-component CSS pollution                  | Adapted stylesheets repeat global `.bw-demo` layout and token definitions. Loading one component can change other components. Bundled styles concatenate these definitions.                                                                                                                  |
| P0       | Missing component styling                      | Adaptive sidebar React uses `bwm-surface` and `bwm-list`; neither has a definition in shared base CSS or application global CSS. It can render while appearing unfinished.                                                                                                                   |
| P0       | Package types lose the public contract         | `scripts/build-packages.ts` writes React declarations as `ComponentType<Record<string, unknown>>`. Vue export maps have no types conditions.                                                                                                                                                 |
| P0       | Installation tests overstate coverage          | `scripts/install-smoke.ts` checks source strings but never installs registry artifacts. Next renders exports, Nuxt renders only MagneticButton, SvelteKit renders only a count. Package references use release directories, not packed tarballs.                                             |
| P1       | Pack check does not pack                       | `scripts/pack-smoke.ts` counts exports and checks a nonempty dist directory; it does not inspect a package tarball.                                                                                                                                                                          |
| P1       | Release metadata and notices need verification | Package generator omits dependency aggregation for external animation engines, uses a hand-written version, and does not explicitly copy upstream license/notice files. Current fixture explicitly supplies animation dependencies, potentially masking missing package metadata.            |
| P1       | Public claim exceeds evidence                  | Component detail says `THREE NATIVE IMPLEMENTATIONS`; use framework-source wording until parity is proven.                                                                                                                                                                                   |
| P1       | Visual checks are captures, not regressions    | Existing e2e tests call screenshot without baseline comparison. React preview checks establish element visibility, not intended interaction or correct colors.                                                                                                                               |
| P1       | Release configuration was incomplete           | Resolved for the website: environment defaults, canonical metadata, sitemap, robots, and source-install commands use `https://build-with-me-ui.vercel.app`. npm scope authority still needs confirmation.                                                                                   |
| P2       | Community tooling incomplete                   | Six issue forms and `config.yml` already exist; config only disables blank issues. CODEOWNERS, triage automation, and funding configuration are absent. Funding is optional and needs a real enabled destination.                                                                            |
| P2       | Browser asset missing                          | Local production browser reports `/favicon.ico` 404.                                                                                                                                                                                                                                         |

The local `prior-art/`, `design-notes/`, and `memory/` directories remain excluded from version control. GitHub default branch is verified as main, with feat/registry-v0 retained separately.

## Phase 1 — Preview correctness and theme boundaries

1. Add failing cases for all site-theme/preview-theme combinations, saved theme hydration, and system preference changes.
2. Put semantic component tokens on the nearest explicit theme boundary. Avoid ancestor selectors that match through another theme boundary. Retain standalone package support without depending on website-only tokens.
3. Scope each design's layout rules to its own root; keep common rules in one shared stylesheet. Eliminate load-order dependence and verify two different designs side by side.
4. Provide missing structural styles and replace hardcoded surfaces, text, border, disabled, hover, focus, and decorative colors. Preserve a deliberate monochrome palette; remove stale lime tokens.
5. Default preview to following site theme, with explicit dark/light overrides. Expose theme selection on mobile and use hydration-safe controls.
6. Implement isolated framework-specific preview bundles from reviewed source, loaded only when selected. Never label a React rendering as Vue or Svelte. Until ready, visibly mark unsupported live previews.
7. Retry failed previews locally without refreshing the entire page. Pause engines on offscreen and hidden-tab events; verify controls actually reach each implementation.

Acceptance: every shipped design passes a four-combination site/preview theme matrix; switching component order does not change computed styles; each framework URL mounts its actual runtime; keyboard/replay/pause/recovery pass; mobile controls remain operable.

## Phase 2 — Capability parity and distribution integrity

1. Inventory all 55 designs by framework: actual behavior, props, events, slots/children, keyboard input, labels, states, reduced motion, visual intent, and failure handling. Keep a checked-in status matrix with evidence links.
2. Replace generic Vue/Svelte cards in batches: actions, navigation/forms, overlays/status, data/commerce, motion/AI. Establish one fully equivalent component per family before bulk work.
3. Derive React declarations from real sources, generate Vue declarations, verify Svelte declarations, and add consumer type tests that reject invalid props and accept documented callbacks.
4. Aggregate external dependencies per framework; test per-component imports and tree shaking; preserve required client directives and include complete licenses/notices in packages and source artifacts.
5. Pack real tarballs and install them into clean Next.js, Nuxt, and SvelteKit projects. Render and exercise every export. Separately materialize every registry item into clean fixtures and test imports, CSS, behavior, and builds without workspace aliases.
6. Make publication status explicit in installation UI. Do not present unpublished npm commands as the recommended working path. Source and copy paths must include styles and setup instructions.

Acceptance: 165 verified source installations and all package exports exercised in their real frameworks; invalid consumer code fails type checks; tarball contents and required notices verified; parity wording only changes after the matrix passes.

## Phase 3 — Interface Cosmos visual refinement

Use frontend-design principles to retain the distinctive four-diamond identity and sharpen the existing narrative, rather than replacing it with generic sections.

- Signal: readable server-rendered headline and actions, one strong luminous object, working install choice with honest release status.
- Constellation: registry-derived domain groups; a small number of real, lazy previews demonstrate the collection.
- Translation: the same component and action shown across three verified implementations, with synchronized props and matching source examples.
- Ownership: reveal the actual source and installation paths; make copy success/failure and required dependencies clear.
- Open Orbit: compact attribution, transparent adaptation notes, and a practical first-contribution action.

Desktop uses a sticky visual stage with normal scroll. Mobile uses compact linear chapters. Motion owns DOM choreography, Anime.js isolated sequences, and Three.js canvas state. Keep essential content out of canvas, avoid scroll trapping, and provide complete static/reduced-motion fallbacks. Apply the same typography, spacing, surfaces, focus and empty-state system to catalog, details, docs, and contribution pages.

Acceptance: approved baseline comparisons at 360/768/1280/1536 in both themes; no overflow; no canvas dependency for reading or navigation; no initial nonselected framework runtime; no hero-induced layout shift. Target field p75 LCP <=2.5s, INP <=200ms, CLS <=0.1; collect measurements before claiming compliance.

## Phase 4 — Contributor tools and community

Generate Storybook stories from manifests for isolated states, controls, interaction checks, and theme regression coverage. Begin with the website's React components; use dedicated framework harnesses for Vue/Svelte. Keep Storybook out of the production homepage bundle.

Add an opt-in live editing sandbox after real framework previews and distribution work. Use explicit launch, sandboxed execution on a separate origin, pinned dependencies, reset/share controls, and a clear network/privacy boundary. Do not execute edited code inside the site's trusted runtime. Sandpack is a candidate to prototype, not an assumption of universal framework support.

Add CODEOWNERS with confirmed maintainer routing, labels on existing issue forms, minimal-permission triage, release notes, and a public support policy. Add FUNDING only after an enabled sponsor destination is supplied. Make scaffolding produce meaningful framework implementations/tests rather than generic parity placeholders.

## Phase 5 — Release and deployment

The repository and production URLs are configured. Canonical metadata, sitemap, robots, icons, social images, and source-install commands use the production URL while environment variables can override it. Vercel supports Next.js directly; lack of a vercel.json alone is not a deployment defect. Keep deployment preview checks documented and avoid maintaining both Vercel and Netlify configs without a real need.

Prepare versioned releases with changelogs, packed artifacts, npm provenance/trusted publishing where supported, and a manual release gate. Confirm npm scope access and package availability before enabling npm installation as default. Deploy/publish only as a separate authorized release action after the earlier gates pass.

## Verification and work order

Work in feature branches with main as PR base. Preserve existing staged user changes. First deliver a small theme/preview correctness change with reproductions, then framework runtime/parity work, then distribution repair, visual refinement, contributor tooling, and release preparation. Do not import further components until the current collection has reliable behavior and attribution.

Run `pnpm check`, `pnpm test:e2e`, and `pnpm test:install` after relevant implementation changes, with strengthened tests described above. Add Chromium/Firefox/WebKit coverage, keyboard and touch journeys, contrast checks in both themes, screen-reader review, zoom, and no-JavaScript content checks. Record what each check proves; never substitute export counts for runtime coverage.

## Research references

Reviewed 2026-09-26:

- https://www.vengenceui.com/ and https://github.com/Ashutoshx7/VengeanceUI — interaction-first component discovery and source-install presentation. Adapt selectively with exact upstream provenance and license preservation; no copied branding or social proof.
- https://animejs.com/ — choreographed visual sequences as inspiration for a coherent narrative, not more simultaneous motion.
- https://motion.dev/docs/react-scroll-animations — scroll-linked and scroll-triggered motion; preserve normal scrolling and reduced-motion alternatives.
- https://vercel.com/oss — frameworks, runtimes, SDKs and broader ecosystem coverage; not a single UI component collection or an affiliation claim. The requested oss.md fetch failed; HTML source was used.
- https://github.com/pacocoursey/next-themes — theme hydration and system preference behavior.
- https://storybook.js.org/docs/get-started/frameworks/nextjs-vite — Next.js component workshop integration.
- https://sandpack.codesandbox.io/docs — candidate opt-in editing environment; evaluate supported templates and isolation before adopting.

Scope of this implementation: source, packaging and test review; production-browser reproduction; cross-browser regression coverage; clean framework fixture builds; and official/reference-site research. It is not a completed 165-implementation behavioral parity audit, independent installation of all 165 source artifacts, package publication, or a deployment.
