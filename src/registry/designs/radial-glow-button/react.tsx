// Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/radial-glow-button.tsx under MIT. Copyright (c) Ashutoshx7.
'use client';
import { useAnimation } from '../../shared/use-animation';
import '../../shared/base.css';
import './radial-glow-button.css';
export default function RadialGlowButton({
  label = 'Radial glow button',
  paused = false,
  onClick,
}: {
  label?: string;
  paused?: boolean;
  onClick?: () => void;
}) {
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <button
        className="adapt-radial"
        type="button"
        onClick={onClick}
        onPointerMove={(e) => {
          if (!active) return;
          const box = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--rx', `${e.clientX - box.left}px`);
          e.currentTarget.style.setProperty('--ry', `${e.clientY - box.top}px`);
        }}
      >
        <span>{label}</span>
        <i aria-hidden="true" />
      </button>
    </div>
  );
}
