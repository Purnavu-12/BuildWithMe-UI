# Kinetic Playground design system

BuildWithMe UI uses charcoal, warm paper, acid lime, cyan, and coral. The selected Center Stage composition puts the promise and primary action ahead of the Interface Engine. Alternate chapters become paper surfaces; technical reading surfaces use quieter panels. The four-diamond identity and "Build the interface. Keep the source." promise remain authoritative.

## Semantic tokens

Site surfaces use `--bg`, `--surface`, `--surface-2`, `--ink`, `--muted`, `--faint`, `--line`, `--line-strong`, `--inverse`, and `--paper`. Component previews use a separate public boundary:

```css
[data-bwm-theme='dark'],
[data-bwm-theme='light'] {
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

The selected reference refinement uses a larger, responsively framed live scene: lime assembly cubes, saturated cyan arcs, coral/paper discs, denser wire planes, and smaller satellite parts. Constellation replaces the hero arcs with layered panels. Paper sections keep their own backgrounds before hydration, so the dark hero and warm chapter can be visible together. Its cyan connection path leads to paired dark demo/source cards; technical controls remain functional rather than illustrative chrome.

The hero artwork occupies a reserved normal-flow stage and animates in place. It does not scale, translate, or dock in response to scrolling. Desktop chapters own independent illustration rows above their demonstrations; mobile renders those illustrations inline. This replaces the earlier shared scroll-docked artboard at the user's request.

The four-diamond brand mark represents one source idea and its three framework expressions. It appears in navigation, metadata artwork, and as the conceptual seed of Interface Cosmos. Do not replace it with framework logos in primary storytelling. Grain, coordinates, and grid lines stay below content contrast and disappear for increased-contrast preferences.

## Interaction hierarchy

CSS owns hover, focus, selected, and simple reveal states. Motion owns component DOM transitions. Anime.js owns the scoped Interface Engine SVG timeline. React Three Fiber owns the optional canvas. A rendered element has one animation owner. Native scroll and semantic reading order remain intact. Desktop canvas eligibility and layout share the 981px breakpoint.

Components, catalog cards, documentation, empty states, and contribution flows use the same focus ring, neutral surfaces, border cadence, and type scale. Real previews carry visual interest. Hover and pointer depth are enhancements; labels, controls, and information remain complete without them.

Accessibility is a visual constraint. Maintain visible focus, AA contrast, 200% zoom, 44px touch targets for primary controls, semantic headings, and a logical server-rendered reading order in both themes. Reduced motion keeps the complete narrative and removes decorative grain and timeline motion.
