// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';
import './floating-label-field.css';

export interface FloatingLabelFieldProps {
  label?: string;
  className?: string;
}
export default function FloatingLabelField({
  label = 'Floating label field',
  className = '',
}: FloatingLabelFieldProps) {
  const [value, setValue] = useState('');
  return (
    <section className={`bw-demo bwm-floating-label-field ${className}`}>
      <label className="bwm-floating">
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder=" " />
        <span>{label}</span>
      </label>
    </section>
  );
}
