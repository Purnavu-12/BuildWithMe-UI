// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './press-depth-button.css';

export default function PressDepthButton({
  paused = false,
  label = 'Give it a push',
  onClick,
}: AnimationProps & { label?: string; onClick?: () => void }) {
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <button className="bw-button bw-depth" onClick={onClick}>
        {label}
      </button>
    </div>
  );
}
