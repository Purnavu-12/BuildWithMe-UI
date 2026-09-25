// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './animated-tabs.css';
import { motion } from 'motion/react';

import { useState, useId } from 'react';
const tabs = ['Design', 'Develop', 'Deliver'];
const copy = [
  'A good idea deserves a thoughtful interface.',
  'Turn the details into something that works.',
  'Put it into the world. Keep making it better.',
];
export default function AnimatedTabs({ paused = false }: AnimationProps) {
  const { ref, active } = useAnimation(paused);
  const [selected, setSelected] = useState(0);
  const id = useId();
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <div className="bw-tab-box">
        <div role="tablist" aria-label="Workflow" className="bw-tabs">
          {tabs.map((label, i) => (
            <button
              key={label}
              id={`${id}-tab-${i}`}
              role="tab"
              aria-selected={selected === i}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={selected === i ? 0 : -1}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => {
                let n: number;
                if (e.key === 'ArrowRight') n = (i + 1) % 3;
                else if (e.key === 'ArrowLeft') n = (i + 2) % 3;
                else if (e.key === 'Home') n = 0;
                else if (e.key === 'End') n = 2;
                else return;
                e.preventDefault();
                setSelected(n);
                document.getElementById(`${id}-tab-${n}`)?.focus();
              }}
            >
              {selected === i ? (
                <motion.span
                  className="bw-tab-indicator"
                  layoutId={`${id}-indicator`}
                  transition={{ duration: active ? 0.2 : 0 }}
                />
              ) : null}
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`${id}-panel-${selected}`}
          aria-labelledby={`${id}-tab-${selected}`}
          tabIndex={0}
          className="bw-description bw-tab-copy"
        >
          {copy[selected]}
        </div>
      </div>
    </div>
  );
}
