// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './suggestion-chips.css';
import { motion } from 'motion/react';

import { useState } from 'react';
const defaults = ['Design a landing page', 'Explore an idea', 'Write something useful'];
export default function SuggestionChips({
  paused = false,
  options = defaults,
  onSelect,
}: AnimationProps & { options?: string[]; onSelect?: (value: string) => void }) {
  const { ref, active } = useAnimation(paused);
  const [selected, setSelected] = useState('');
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <div className="bw-chips">
        <p className="bw-caption">A place to start</p>
        {options.map((text) => (
          <motion.button
            key={text}
            whileHover={active ? { x: 4 } : undefined}
            aria-pressed={selected === text}
            onClick={() => {
              setSelected(text);
              onSelect?.(text);
            }}
          >
            {text}
            <span aria-hidden="true">↗</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
