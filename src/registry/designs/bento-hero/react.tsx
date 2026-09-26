// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';

export interface BentoHeroProps { label?: string; className?: string }
export default function BentoHero({ label = "Bento hero", className = '' }: BentoHeroProps) {
  const [open, setOpen] = useState(false);
  return <section className={`bwm-surface bwm-bento-hero ${className}`}><div className="bwm-action"><span className="bwm-kicker">BUILDWITHME / UI</span><strong>{label}</strong><p>Designed once. Ready for every framework.</p><button onClick={() => setOpen((current) => !current)}>{open ? 'Selected' : 'Try interaction'}</button></div></section>;
}
