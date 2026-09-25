// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './tilt-card.css';
import { motion } from 'motion/react';

import { useState, type ReactNode } from 'react';
export default function TiltCard({
  paused = false,
  children,
}: AnimationProps & { children?: ReactNode }) {
  const { ref, active } = useAnimation(paused);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  return (
    <div ref={ref} className="bw-demo bw-perspective" data-active={active}>
      <motion.div
        className="bw-panel bw-tilt"
        animate={active ? tilt : { rotateX: 0, rotateY: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setTilt({
            rotateX: -(e.clientY - r.top - r.height / 2) / 14,
            rotateY: (e.clientX - r.left - r.width / 2) / 14,
          });
        }}
        onPointerLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      >
        {children ?? (
          <>
            <p className="bw-caption">A new perspective</p>
            <div className="bw-tilt-orbit" aria-hidden="true" />
            <h3 className="bw-title">More than a surface.</h3>
          </>
        )}
      </motion.div>
    </div>
  );
}
