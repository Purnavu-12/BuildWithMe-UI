// MIT · BuildWithMe-UI contributors. Preserve this notice when redistributing.
'use client';
import { useEffect, useRef, useState } from 'react';
import { observeMotion } from './motion-lifecycle';
export type AnimationProps = { paused?: boolean };
/** Stops work when hidden, off screen, explicitly paused, or reduced motion is requested. */
export function useAnimation(paused = false) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    if (!ref.current) return;
    const lifecycle = observeMotion(
      ref.current,
      (state) => {
        setReduced(state.reduced);
        setActive(state.active);
      },
      paused,
    );
    return () => lifecycle.destroy();
  }, [paused]);
  return { ref, active, reduced };
}
