// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './count-up.css';
import { animate } from 'animejs';

import { useEffect, useRef } from 'react';
export default function CountUp({
  paused = false,
  value = 2048,
}: AnimationProps & { value?: number }) {
  const { ref, active } = useAnimation(paused);
  const output = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!active) return;
    const state = { value: 0 };
    const animation = animate(state, {
      value,
      duration: 1800,
      ease: 'out(4)',
      onUpdate: () => {
        if (output.current)
          output.current.textContent = Math.round(state.value).toLocaleString('en-US');
      },
    });
    return () => {
      animation.revert();
      if (output.current) output.current.textContent = value.toLocaleString('en-US');
    };
  }, [active, value]);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <div>
        <p className="bw-caption">Every little step counts</p>
        <p className="bw-counter">
          <span className="bw-sr-only">{value}</span>
          <span ref={output} aria-hidden="true">
            {value.toLocaleString('en-US')}
          </span>
          <span aria-hidden="true">+</span>
        </p>
      </div>
    </div>
  );
}
