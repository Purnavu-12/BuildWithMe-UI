// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './scramble-reveal.css';
import { animate } from 'animejs';

import { useEffect, useRef } from 'react';
export default function ScrambleReveal({
  paused = false,
  text = 'HELLO, BUILDER.',
}: AnimationProps & { text?: string }) {
  const { ref, active } = useAnimation(paused);
  const output = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!active) return;
    const state = { progress: 0 };
    const chars = '01#/<>';
    const animation = animate(state, {
      progress: text.length,
      duration: 1300,
      ease: 'linear',
      onUpdate: () => {
        if (output.current)
          output.current.textContent = text
            .split('')
            .map((c, i) =>
              i < state.progress ? c : chars[(i + Math.floor(state.progress * 3)) % chars.length],
            )
            .join('');
      },
    });
    return () => {
      animation.revert();
      if (output.current) output.current.textContent = text;
    };
  }, [active, text]);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <p className="bw-scramble">
        <span className="bw-sr-only">{text}</span>
        <span ref={output} aria-hidden="true">
          {text}
        </span>
      </p>
    </div>
  );
}
