// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './flowing-lines.css';
import { animate, stagger } from 'animejs';

import { useEffect } from 'react';
export default function FlowingLines({ paused = false }: AnimationProps) {
  const { ref, active } = useAnimation(paused);
  useEffect(() => {
    if (!active || !ref.current) return;
    const animation = animate(ref.current.querySelectorAll('.bw-flow-line'), {
      scaleY: [0.25, 1, 0.25],
      opacity: [0.2, 0.8, 0.2],
      duration: 2600,
      delay: stagger(130),
      loop: true,
      ease: 'inOutSine',
    });
    return () => {
      animation.revert();
    };
  }, [active]);
  return (
    <div ref={ref} className="bw-demo bw-flow" data-active={active} aria-hidden="true">
      {Array.from({ length: 15 }, (_, i) => (
        <span key={i} className="bw-flow-line" style={{ height: 70 + Math.sin(i * 0.45) * 65 }} />
      ))}
    </div>
  );
}
