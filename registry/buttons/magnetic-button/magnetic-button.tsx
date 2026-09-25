// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './magnetic-button.css';
import { motion } from 'motion/react';

import { useState } from 'react';
export default function MagneticButton({
  paused = false,
  label = 'Pull me closer',
  onClick,
}: AnimationProps & { label?: string; onClick?: () => void }) {
  const { ref, active } = useAnimation(paused);
  const [point, setPoint] = useState({ x: 0, y: 0 });
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <motion.button
        className="bw-button bw-magnetic"
        animate={active ? point : { x: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 14 }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPoint({
            x: (e.clientX - r.left - r.width / 2) * 0.22,
            y: (e.clientY - r.top - r.height / 2) * 0.22,
          });
        }}
        onPointerLeave={() => setPoint({ x: 0, y: 0 })}
        onClick={onClick}
      >
        {label}
        <span aria-hidden="true"> ↗</span>
      </motion.button>
    </div>
  );
}
