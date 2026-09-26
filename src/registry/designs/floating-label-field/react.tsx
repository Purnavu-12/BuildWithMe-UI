// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';

export interface FloatingLabelFieldProps { label?: string; className?: string }
export default function FloatingLabelField({ label = "Floating label field", className = '' }: FloatingLabelFieldProps) {
  const [value, setValue] = useState('');
  return <section className={`bwm-surface bwm-floating-label-field ${className}`}><label className="bwm-field"><span>{label}</span><input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Start typing…" /></label></section>;
}
