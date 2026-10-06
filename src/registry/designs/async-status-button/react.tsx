// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import { motion } from 'motion/react';

import { useState, useEffect, useRef } from 'react';
export default function AsyncStatusButton({
  paused = false,
  onAction,
}: AnimationProps & { onAction?: () => Promise<void> }) {
  const { ref, active } = useAnimation(paused);
  const [status, setStatus] = useState('idle');
  const alive = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      clearTimeout(timer.current);
    };
  }, []);
  async function run() {
    if (status === 'working') return;
    setStatus('working');
    try {
      await (onAction
        ? onAction()
        : new Promise<void>((resolve) => {
            timer.current = setTimeout(resolve, 1200);
          }));
      if (alive.current) setStatus('done');
    } catch {
      if (alive.current) setStatus('error');
    }
  }
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <motion.button
        className="bw-button"
        animate={{ scale: active && status === 'done' ? 1.04 : 1 }}
        disabled={status === 'working'}
        aria-busy={status === 'working'}
        onClick={run}
      >
        <span aria-live="polite">
          {status === 'working'
            ? 'Saving…'
            : status === 'done'
              ? '✓ Saved. Run again?'
              : status === 'error'
                ? 'Try again'
                : 'Save your changes'}
        </span>
      </motion.button>
    </div>
  );
}
