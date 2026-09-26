// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './expandable-card.css';
import { motion, AnimatePresence } from 'motion/react';

import { useState } from 'react';
export default function ExpandableCard({ paused = false }: AnimationProps) {
  const { ref, active } = useAnimation(paused);
  const [open, setOpen] = useState(false);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <motion.div layout={active} className="bw-panel">
        <p className="bw-caption">Field notes · 001</p>
        <h3 className="bw-title">Less, but better.</h3>
        <button
          className="bw-expand-toggle"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close the story −' : 'Read the story +'}
        </button>
        <AnimatePresence>
          {open ? (
            <motion.p
              initial={{ opacity: active ? 0 : 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bw-description"
            >
              Start with the essentials. Give every element a purpose, every interaction a little
              care, and every idea room to breathe.
            </motion.p>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
