// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';

export interface PricingMatrixProps { label?: string; className?: string }
export default function PricingMatrix({ label = "Pricing matrix", className = '' }: PricingMatrixProps) {
  const [added, setAdded] = useState(false);
  return <section className={`bwm-surface bwm-pricing-matrix ${className}`}><article className="bwm-product"><span>{label}</span><strong>$48</strong><button onClick={() => setAdded((current) => !current)}>{added ? 'Added' : 'Add to project'}</button></article></section>;
}
