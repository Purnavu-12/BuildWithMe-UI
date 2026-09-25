// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';

export interface ProductQuickViewProps { label?: string; className?: string }
export default function ProductQuickView({ label = "Product quick view", className = '' }: ProductQuickViewProps) {
  const [added, setAdded] = useState(false);
  return <section className={`bwm-surface bwm-product-quick-view ${className}`}><article className="bwm-product"><span>{label}</span><strong>$48</strong><button onClick={() => setAdded((current) => !current)}>{added ? 'Added' : 'Add to project'}</button></article></section>;
}
