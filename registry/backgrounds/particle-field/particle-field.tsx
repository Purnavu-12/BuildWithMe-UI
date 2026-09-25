// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './particle-field.css';
import { animate, stagger } from 'animejs';

import { useEffect } from 'react';
export default function ParticleField({ paused = false }: AnimationProps) {
  const { ref, active } = useAnimation(paused);
  useEffect(() => {
    if (!active || !ref.current) return;
    const animation = animate(ref.current.querySelectorAll('.bw-particle'), {
      y: [-8, 8],
      opacity: [0.2, 0.9],
      delay: stagger(80),
      duration: 2400,
      alternate: true,
      loop: true,
      ease: 'inOutSine',
    });
    return () => {
      animation.revert();
    };
  }, [active]);
  return (
    <div ref={ref} className="bw-demo bw-particles" data-active={active} aria-hidden="true">
      {Array.from({ length: 30 }, (_, i) => (
        <span
          className="bw-particle"
          key={i}
          style={{
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
            width: (i % 3) + 2,
            height: (i % 3) + 2,
          }}
        />
      ))}
    </div>
  );
}
