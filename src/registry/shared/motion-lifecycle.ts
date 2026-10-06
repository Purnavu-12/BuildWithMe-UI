// MIT · BuildWithMe-UI contributors. Preserve this notice when redistributing.
export type MotionState = { active: boolean; reduced: boolean };

/** Framework-neutral lifecycle for reviewed DOM effects; it never disables controls. */
export function observeMotion(
  element: HTMLElement,
  notify: (state: MotionState) => void,
  paused = false,
) {
  const doc = element.ownerDocument;
  const view = doc.defaultView;
  if (!view) return { setPaused: (_paused: boolean) => {}, destroy: () => {} };
  const media = view.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = true;
  let stopped = false;
  let last = '';
  function update() {
    if (stopped) return;
    const state = {
      active:
        !paused && !media.matches && visible && !doc.hidden && doc.body.dataset.paused !== 'true',
      reduced: media.matches,
    };
    element.dataset.active = String(state.active);
    element.dataset.reduced = String(state.reduced);
    const key = `${state.active}:${state.reduced}`;
    if (key !== last) {
      last = key;
      notify(state);
    }
  }
  const visibility = new view.IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  });
  visibility.observe(element);
  const host = new view.MutationObserver(update);
  host.observe(doc.body, { attributes: true, attributeFilter: ['data-paused'] });
  media.addEventListener('change', update);
  doc.addEventListener('visibilitychange', update);
  update();
  return {
    setPaused(next: boolean) {
      paused = next;
      update();
    },
    destroy() {
      stopped = true;
      visibility.disconnect();
      host.disconnect();
      media.removeEventListener('change', update);
      doc.removeEventListener('visibilitychange', update);
    },
  };
}
