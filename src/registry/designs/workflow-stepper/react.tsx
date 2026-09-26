// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';

export interface WorkflowStepperProps { label?: string; className?: string }
export default function WorkflowStepper({ label = "Workflow stepper", className = '' }: WorkflowStepperProps) {
  const [step, setStep] = useState(1);
  return <section className={`bwm-surface bwm-workflow-stepper ${className}`}><ol className="bwm-steps" aria-label={label}>{['Discover', 'Adapt', 'Ship'].map((entry, index) => <li key={entry} data-active={index <= step}><button onClick={() => setStep(index)}><i />{entry}</button></li>)}</ol></section>;
}
