// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './stagger-reveal.css';
import { animate, stagger } from 'animejs';

import { useEffect } from 'react';
export default function StaggerReveal({
  paused = false,
  text = 'Ideas into interfaces.',
}: AnimationProps & { text?: string }) {
  const { ref, active } = useAnimation(paused);
  useEffect(() => {
    if (!active || !ref.current) return;
    const animation = animate(ref.current.querySelectorAll('.bw-word'), {
      opacity: [0, 1],
      y: [16, 0],
      delay: stagger(110),
      duration: 700,
      ease: 'out(3)',
    });
    return () => {
      animation.revert();
    };
  }, [active, text]);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <p className="bw-large-text">
        <span className="bw-sr-only">{text}</span>
        {text.split(' ').map((word, i) => (
          <span className="bw-word" key={i} aria-hidden="true">
            {word}{' '}
          </span>
        ))}
      </p>
    </div>
  );
}
