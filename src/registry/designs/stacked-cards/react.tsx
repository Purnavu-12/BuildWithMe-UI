// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './stacked-cards.css';
import { motion } from 'motion/react';

import { useState } from 'react';
const ideas = ['Start something.', 'Make it useful.', 'Share the source.'];
export default function StackedCards({ paused = false }: AnimationProps) {
  const { ref, active } = useAnimation(paused);
  const [index, setIndex] = useState(0);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <div className="bw-stack">
        <span className="bw-stack-back" aria-hidden="true" />
        <motion.button
          key={index}
          initial={active ? { rotate: -6, x: -15 } : false}
          animate={{ rotate: 0, x: 0 }}
          className="bw-panel bw-stack-front"
          onClick={() => setIndex((v) => (v + 1) % ideas.length)}
          aria-label={`${ideas[index]} Shuffle cards`}
        >
          <span className="bw-caption">IDEA 0{index + 1} / 03</span>
          <span className="bw-title">{ideas[index]}</span>
          <span className="bw-description">Click to shuffle ↗</span>
        </motion.button>
      </div>
    </div>
  );
}
