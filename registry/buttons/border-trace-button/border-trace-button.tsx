// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './border-trace-button.css';

export default function BorderTraceButton({
  paused = false,
  label = 'Explore the possibilities',
  onClick,
}: AnimationProps & { label?: string; onClick?: () => void }) {
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <button className="bw-button bw-trace" onClick={onClick}>
        <span>{label}</span>
      </button>
    </div>
  );
}
