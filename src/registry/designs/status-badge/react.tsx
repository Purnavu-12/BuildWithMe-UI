// Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/ui/badge.tsx under MIT. Copyright (c) Vercel, Inc..
'use client';
import { useAnimation } from '../../shared/use-animation';
import '../../shared/base.css';
import './status-badge.css';
export default function StatusBadge({
  label = 'Status badge',
  paused = false,
}: {
  label?: string;
  paused?: boolean;
}) {
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <div className="adapt-status" role="status">
        <i aria-hidden="true" />
        <span>{label}</span>
        <small>Operational · demo</small>
      </div>
    </div>
  );
}
