// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './rotating-words.css';
import { motion, AnimatePresence } from 'motion/react';

import { useState, useEffect } from 'react';
const defaults = ['beautiful.', 'accessible.', 'yours.'];
export default function RotatingWords({
  paused = false,
  words = defaults,
}: AnimationProps & { words?: string[] }) {
  const { ref, active } = useAnimation(paused);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!active || !words.length) return;
    const t = setInterval(() => setIndex((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [active, words.length]);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <p className="bw-large-text">
        Build it
        <br />
        <span className="bw-rotating">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={active ? { opacity: 0, y: 15 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: active ? 0.3 : 0 }}
            >
              {words[index % words.length] ?? 'yours.'}
            </motion.span>
          </AnimatePresence>
        </span>
      </p>
    </div>
  );
}
