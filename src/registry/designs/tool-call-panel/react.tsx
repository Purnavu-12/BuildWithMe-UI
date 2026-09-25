// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './tool-call-panel.css';

import { useState, useId } from 'react';
export default function ToolCallPanel({ paused = false }: AnimationProps) {
  const { ref, active } = useAnimation(paused);
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <div className="bw-panel bw-tool">
        <p className="bw-caption">Local demonstration</p>
        <button aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
          <span>
            <span className="bw-tool-dot" />
            search_components
          </span>
          <span>{open ? '−' : '+'}</span>
        </button>
        <p className="bw-description">3 matching components found</p>
        {open ? (
          <pre id={id}>
            {JSON.stringify({ query: 'button', engine: 'css', results: 3 }, null, 2)}
          </pre>
        ) : null}
      </div>
    </div>
  );
}
