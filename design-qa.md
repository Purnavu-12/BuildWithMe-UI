# Center Stage reference refinement

Visual target: the user-selected Center Stage image supplied on 2026-10-06. The earlier supplied Ownership screenshot documents scene occlusion; it is not a capture of this refinement.

## Implemented differences

- Hero: tighter top spacing, larger two-line promise, warmer charcoal, and a shorter footer rhythm.
- Live artwork: responsive camera framing instead of a distant fixed camera; denser wire grids, three assembled lime cubes, cyan arcs, coral/paper discs, and satellite parts. Constellation uses layered panels instead of repeating the hero arcs. SVG fallback follows the same composition changes.
- Paper chapter: cyan connecting path, large heading beside a reserved scene, and paired dark Animated Tabs/source cards. The source card exposes actual files and installation, and the preview labels its React runtime. Collection reveal and filtered domain links remain available.
- Responsive behavior: desktop cards share a grid row; mobile stacks the cards and keeps the inline scene. The hero artwork now animates in place, independent of scroll position. Chapter illustrations stay in their own normal-flow rows.

## Verification gate

Automation policy: the user requested lightweight CI on 2026-10-06. Screenshot comparison and the three-engine source matrix are now optional local checks, rather than automatic PR gates. Unreviewed images are not accepted or used to claim visual completeness. The blocked result below records the remaining design acceptance evidence, not a requirement to keep every CI suite enabled.

Actual images from GitHub's completed jobs are now available for review. They revealed mobile overlap/overflow and a saved-theme label mismatch, plus inconsistent variable-font weight rendering in Windows WebKit. Those images are not accepted as goldens for affected surfaces. The corrective code needs fresh captures; screenshot assertions remain enabled. Local browser permission remains blocked, while CI is the independent capture source.

GitHub CI has now exercised part of the browser matrix. Its superseded run confirmed old/missing screenshots and exposed real accessibility/layout issues. Overflowed command text is now keyboard-focusable; the product dialog image and spacing are bounded for short iframe viewports. Browser tests scope login status correctly and verify the documented WebGL/SVG fallback. Fresh complete browser execution and reviewed screenshot baselines remain pending; no snapshots were automatically accepted.

Fresh same-viewport screenshots, rendered reference comparison, interaction execution, contrast, and performance review remain blocked by the saved browser permission for the local URL. No visual acceptance or pixel-fidelity claim is made. Browser tests cover paired-card interactions, themes, mobile overflow, desktop placement, and hero position stability but have not been executed for this refinement.

final result: blocked
