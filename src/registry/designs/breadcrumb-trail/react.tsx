// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';

export interface BreadcrumbTrailProps { label?: string; className?: string }
export default function BreadcrumbTrail({ label = "Breadcrumb trail", className = '' }: BreadcrumbTrailProps) {
  const [active, setActive] = useState('Overview');
  return <section className={`bwm-surface bwm-breadcrumb-trail ${className}`}><nav className="bwm-list" aria-label={label}>{['Overview', 'Components', 'Contribute'].map((entry) => <button key={entry} aria-current={active === entry ? 'page' : undefined} onClick={() => setActive(entry)}>{entry}<span>↗</span></button>)}</nav></section>;
}
