import { describe, expect, it } from 'vitest';
import { observeMotion, type MotionState } from '../../src/registry/shared/motion-lifecycle';

describe('motion lifecycle', () => {
  it('responds to pause, visibility, reduced motion and host state, then disconnects', () => {
    const handlers = new Map<string, () => void>();
    const media = {
      matches: false,
      addEventListener: (_: string, fn: () => void) => handlers.set('media', fn),
      removeEventListener: () => handlers.delete('media'),
    };
    let intersection: (entries: { isIntersecting: boolean }[]) => void = () => {};
    let mutation: () => void = () => {};
    let disconnected = 0;
    const doc = {
      hidden: false,
      body: { dataset: { paused: 'false' } },
      addEventListener: (_: string, fn: () => void) => handlers.set('visibility', fn),
      removeEventListener: () => handlers.delete('visibility'),
      defaultView: {
        matchMedia: () => media,
        IntersectionObserver: class {
          constructor(fn: typeof intersection) {
            intersection = fn;
          }
          observe() {}
          disconnect() {
            disconnected++;
          }
        },
        MutationObserver: class {
          constructor(fn: () => void) {
            mutation = fn;
          }
          observe() {}
          disconnect() {
            disconnected++;
          }
        },
      },
    };
    const element = { ownerDocument: doc, dataset: {} };
    const states: MotionState[] = [];
    const control = observeMotion(element as unknown as HTMLElement, (state) => states.push(state));
    expect(states.at(-1)).toEqual({ active: true, reduced: false });
    control.setPaused(true);
    expect(states.at(-1)?.active).toBe(false);
    control.setPaused(false);
    intersection([{ isIntersecting: false }]);
    expect(states.at(-1)?.active).toBe(false);
    intersection([{ isIntersecting: true }]);
    doc.hidden = true;
    handlers.get('visibility')!();
    expect(states.at(-1)?.active).toBe(false);
    doc.hidden = false;
    handlers.get('visibility')!();
    expect(states.at(-1)?.active).toBe(true);
    media.matches = true;
    handlers.get('media')!();
    expect(states.at(-1)).toEqual({ active: false, reduced: true });
    media.matches = false;
    doc.body.dataset.paused = 'true';
    mutation();
    expect(states.at(-1)?.active).toBe(false);
    doc.body.dataset.paused = 'false';
    mutation();
    expect(states.at(-1)?.active).toBe(true);
    const count = states.length;
    mutation();
    expect(states).toHaveLength(count);
    control.destroy();
    control.setPaused(true);
    mutation();
    intersection([{ isIntersecting: false }]);
    expect(states).toHaveLength(count);
    expect(handlers.size).toBe(0);
    expect(disconnected).toBe(2);
  });
});
