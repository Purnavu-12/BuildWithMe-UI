// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import '../../shared/base.css';

export interface MetricSparklineProps { label?: string; className?: string }
export default function MetricSparkline({ label = "Metric sparkline", className = '' }: MetricSparklineProps) {
  return <section className={`bwm-surface bwm-metric-sparkline ${className}`}><div className="bwm-metric"><strong>+24.8%</strong><span>Weekly velocity</span><svg viewBox="0 0 180 54" role="img" aria-label={label + ' rising weekly trend'}><path d="M2 46 C30 44 34 18 58 30 S92 45 112 22 S146 8 178 4" /></svg></div></section>;
}
