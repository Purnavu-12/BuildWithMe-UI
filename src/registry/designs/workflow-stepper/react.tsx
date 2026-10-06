// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';
import './workflow-stepper.css';

export interface WorkflowStepperProps {
  label?: string;
  className?: string;
}
export default function WorkflowStepper({
  label = 'Workflow stepper',
  className = '',
}: WorkflowStepperProps) {
  const [step, setStep] = useState(1);
  const steps = ['Discover', 'Adapt', 'Ship'];
  return (
    <section className={`bw-demo bwm-workflow-stepper ${className}`}>
      <div className="bwm-panel">
        <ol className="bwm-steps" aria-label={label}>
          {steps.map((entry, i) => (
            <li key={entry} data-state={i < step ? 'complete' : i === step ? 'active' : 'pending'}>
              <button
                type="button"
                aria-current={i === step ? 'step' : undefined}
                onClick={() => setStep(i)}
              >
                <b aria-hidden="true">{i < step ? '✓' : i + 1}</b>
                {entry}
                <span className="bw-sr-only">
                  {i < step ? ' completed' : i === step ? ' current' : ' pending'}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p role="status">
          {steps[step]} — step {step + 1} of 3
        </p>
        <div className="bwm-row">
          <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)}>
            Back
          </button>
          <button type="button" disabled={step === 2} onClick={() => setStep(step + 1)}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
