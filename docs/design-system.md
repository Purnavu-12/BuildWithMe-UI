# Interface Cosmos design system

BuildWithMe UI uses pure black, warm ivory, graphite, and calibrated neutral gray. Dark and light are designed as separate surfaces. Dark is a spatial field with restrained bloom and deep panels. Light is editorial paper with ink typography, graphite structure, and soft physical depth. Framework identity comes from labels and geometry rather than brand colors.

## Semantic tokens

Site surfaces use `--bg`, `--surface`, `--surface-2`, `--ink`, `--muted`, `--faint`, `--line`, `--line-strong`, `--inverse`, and `--paper`. Component previews use a separate public boundary:

```css
[data-bwm-theme='dark' | 'light'] {
  --bwm-component-canvas: ...;
  --bwm-component-panel: ...;
  --bwm-component-fg: ...;
  --bwm-component-muted: ...;
  --bwm-component-border: ...;
  --bwm-component-focus: ...;
}
```

Component styles map their local `--bw-*` variables to this boundary. Never select a preview through a distant site-theme ancestor. The closest `data-bwm-theme` boundary must be sufficient to render a complete dark or light artifact regardless of stylesheet order.

## Type and rhythm

Geist Sans carries interface and editorial text. Geist Mono carries coordinates, source paths, commands, counts, availability, and technical annotations. Display text uses `clamp()` with tight negative tracking and 0.86–0.98 line height. Body copy stays between 45 and 70 characters per line with 1.6–1.75 line height. Fine borders, a restrained 72px grid, orbital paths, and purposeful negative space connect the site surfaces.

## Geometry and material

The four-diamond brand mark represents one source idea and its three framework expressions. It appears in navigation, metadata artwork, and as the conceptual seed of Interface Cosmos. Do not replace it with framework logos in primary storytelling. Grain, coordinates, and grid lines stay below content contrast and disappear for increased-contrast preferences.

## Interaction hierarchy

CSS owns hover, focus, selected, and simple reveal states. Motion owns chapter progress and DOM transforms. Anime.js owns the isolated source-line sequence. React Three Fiber owns the optional constellation. A rendered element has one animation owner. Native scroll and semantic reading order remain intact.

Components, catalog cards, documentation, empty states, and contribution flows use the same focus ring, neutral surfaces, border cadence, and type scale. Real previews carry visual interest. Hover and pointer depth are enhancements; labels, controls, and information remain complete without them.

Accessibility is a visual constraint. Maintain visible focus, AA contrast, 200% zoom, 44px touch targets for primary controls, semantic headings, and a logical server-rendered reading order in both themes. Reduced motion keeps the complete narrative and removes decorative grain and timeline motion.
