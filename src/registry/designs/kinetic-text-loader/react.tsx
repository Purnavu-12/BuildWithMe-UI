// Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/kinetic-text-loader.tsx under MIT. Copyright (c) Ashutoshx7.
'use client';
import { useAnimation } from '../../shared/use-animation';
import '../../shared/base.css';
import './kinetic-text-loader.css';
export default function KineticTextLoader({
  label = 'Kinetic text loader',
  paused = false,
}: {
  label?: string;
  paused?: boolean;
}) {
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <div className="adapt-kinetic" role="status" aria-label={label}>
        <span aria-hidden="true">BUILD · SHIP · REMIX · </span>
        <span aria-hidden="true">SOURCE · OPEN · YOURS · </span>
      </div>
    </div>
  );
}
