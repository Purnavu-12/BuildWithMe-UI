// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';

export interface MultiStepFormProps { label?: string; className?: string }
export default function MultiStepForm({ label = "Multi-step form", className = '' }: MultiStepFormProps) {
  const [value, setValue] = useState('');
  return <section className={`bwm-surface bwm-multi-step-form ${className}`}><label className="bwm-field"><span>{label}</span><input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Start typing…" /></label></section>;
}
