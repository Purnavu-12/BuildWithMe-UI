// MIT · BuildWithMe-UI contributors. Preserve this notice when redistributing.
'use client';
import { useEffect, useRef, useState } from 'react';
export type AnimationProps = { paused?: boolean };
/** Stops work when hidden, off screen, explicitly paused, or reduced motion is requested. */
export function useAnimation(paused = false) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    const update = () => {
      setReduced(media.matches);
      setActive(!paused && !media.matches && visible && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    if (ref.current) observer.observe(ref.current);
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {
      observer.disconnect();
      media.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, [paused]);
  return { ref, active, reduced };
}
