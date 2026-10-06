// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './streaming-message.css';

import { useState, useEffect } from 'react';
const message =
  'Great things are built together. Start with a small idea, add a little care, and share what you learn.';
export default function StreamingMessage({
  paused = false,
  text = message,
}: AnimationProps & { text?: string }) {
  const { ref, active, reduced } = useAnimation(paused);
  const [length, setLength] = useState(0);
  useEffect(() => {
    setLength(0);
  }, [text]);
  useEffect(() => {
    if (!active || length >= text.length) return;
    const t = setInterval(() => setLength((v) => Math.min(v + 2, text.length)), 45);
    return () => clearInterval(t);
  }, [active, text.length, length]);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <div className="bw-panel bw-message">
        <p className="bw-caption">An idea, taking shape</p>
        <p className="bw-description">
          <span className="bw-sr-only">{text}</span>
          <span aria-hidden="true">
            {reduced ? text : text.slice(0, length)}
            <span className="bw-caret" />
          </span>
        </p>
      </div>
    </div>
  );
}
