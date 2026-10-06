// Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/wave-grid-background.tsx under MIT. Copyright (c) Ashutoshx7.
'use client';
import { useAnimation } from '../../shared/use-animation';
import '../../shared/base.css';
import './wave-grid-background.css';
export default function WaveGridBackground({
  label = 'Wave grid background',
  paused = false,
}: {
  label?: string;
  paused?: boolean;
}) {
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <div className="adapt-wave" role="img" aria-label={label}>
        {Array.from({ length: 35 }, (_, index) => (
          <i
            key={index}
            style={{ animationDelay: `${(index % 7) * 55 + Math.floor(index / 7) * 40}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
