// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';
import './multi-step-form.css';

export interface MultiStepFormProps {
  label?: string;
  className?: string;
}
export default function MultiStepForm({
  label = 'Multi-step form',
  className = '',
}: MultiStepFormProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [complete, setComplete] = useState(false);
  return (
    <section className={`bw-demo bwm-multi-step-form ${className}`}>
      <form
        className="bwm-panel"
        aria-label={label}
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 2) setStep(step + 1);
          else setComplete(true);
        }}
      >
        <small>STEP {step + 1} / 3 · Local demonstration</small>
        <h3>{label}</h3>
        {complete ? (
          <p role="status">Thanks, {name}. Your local profile is ready.</p>
        ) : (
          <>
            {step === 0 ? (
              <label>
                Your name
                <input
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            ) : step === 1 ? (
              <label>
                Email address
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            ) : (
              <dl>
                <dt>Name</dt>
                <dd>{name}</dd>
                <dt>Email</dt>
                <dd>{email}</dd>
              </dl>
            )}
            <div className="bwm-row">
              <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)}>
                Back
              </button>
              <button type="submit">{step === 2 ? 'Complete profile' : 'Continue'}</button>
            </div>
          </>
        )}
      </form>
    </section>
  );
}
