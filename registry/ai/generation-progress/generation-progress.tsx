// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './generation-progress.css';
import { motion } from 'motion/react';

import { useState, useEffect } from 'react';
const steps = ['Understanding your idea', 'Bringing it together', 'Ready to make it yours'];
export default function GenerationProgress({ paused = false }: AnimationProps) {
  const { ref, active, reduced } = useAnimation(paused);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!active || progress >= 100) return;
    const t = setInterval(() => setProgress((v) => Math.min(v + 2, 100)), 120);
    return () => clearInterval(t);
  }, [active, progress]);
  const value = reduced ? 100 : progress;
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <div className="bw-panel bw-progress">
        <p className="bw-caption">Local generation demo</p>
        <p className="bw-description">{steps[value === 100 ? 2 : value > 40 ? 1 : 0]}</p>
        <div
          role="progressbar"
          aria-label="Generation"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          className="bw-progress-track"
        >
          <motion.span
            animate={{ width: `${value}%` }}
            transition={{ duration: active ? 0.2 : 0 }}
          />
        </div>
        <div className="bw-progress-footer">
          <span>{value}%</span>
          <button onClick={() => setProgress(0)}>Restart ↗</button>
        </div>
      </div>
    </div>
  );
}
