// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './perspective-grid.css';

export default function PerspectiveGrid({ paused = false }: AnimationProps) {
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo bw-horizon" data-active={active}>
      <div className="bw-horizon-grid" aria-hidden="true" />
      <span className="bw-horizon-sun" aria-hidden="true" />
    </div>
  );
}
