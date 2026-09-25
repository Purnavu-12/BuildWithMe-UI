// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './spotlight-card.css';

import type { ReactNode } from 'react';
export default function SpotlightCard({
  paused = false,
  children,
}: AnimationProps & { children?: ReactNode }) {
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <div
        className="bw-panel bw-spotlight"
        onPointerMove={(e) => {
          if (!active) return;
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
        }}
      >
        {children ?? (
          <>
            <p className="bw-caption">A little unexpected</p>
            <h3 className="bw-title">Follow your curiosity.</h3>
            <p className="bw-description">The best ideas start with a little exploration.</p>
          </>
        )}
      </div>
    </div>
  );
}
