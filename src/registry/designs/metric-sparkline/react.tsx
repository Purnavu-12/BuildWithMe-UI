// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';

import '../../shared/base.css';
import './metric-sparkline.css';

export interface MetricSparklineProps {
  label?: string;
  className?: string;
}
export default function MetricSparkline({
  label = 'Metric sparkline',
  className = '',
}: MetricSparklineProps) {
  return (
    <section className={`bw-demo bwm-metric-sparkline ${className}`}>
      <figure className="bwm-panel bwm-metric">
        <figcaption>
          {label}
          <small>Weekly velocity · example data</small>
        </figcaption>
        <strong>+24.8%</strong>
        <svg viewBox="0 0 180 54" role="img" aria-label={`${label}: a rising weekly trend`}>
          <path d="M2 46 C30 44 34 18 58 30 S92 45 112 22 S146 8 178 4" />
        </svg>
        <small>7 periods · steady growth</small>
      </figure>
    </section>
  );
}
