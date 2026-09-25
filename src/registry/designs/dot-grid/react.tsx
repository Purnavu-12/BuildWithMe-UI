// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './dot-grid.css';

export default function DotGrid({ paused = false }: AnimationProps) {
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo bw-dots" data-active={active}>
      <span className="bw-grid-label">Room for your next idea.</span>
    </div>
  );
}
