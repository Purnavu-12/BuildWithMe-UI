// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './shimmer-button.css';

export default function ShimmerButton({
  paused = false,
  label = 'Make something great',
  onClick,
}: AnimationProps & { label?: string; onClick?: () => void }) {
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <button className="bw-button bw-shimmer" onClick={onClick}>
        {label}
      </button>
    </div>
  );
}
