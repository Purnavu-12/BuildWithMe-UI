// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';
import './pricing-matrix.css';

export interface PricingMatrixProps {
  label?: string;
  className?: string;
}
export default function PricingMatrix({
  label = 'Pricing matrix',
  className = '',
}: PricingMatrixProps) {
  const [yearly, setYearly] = useState(false);
  const [selected, setSelected] = useState('');
  const plans = ['Starter', 'Studio', 'Team'];
  const prices = [0, 18, 42];
  return (
    <section className={`bw-demo bwm-pricing-matrix ${className}`}>
      <div className="bwm-pricing">
        <h3>{label}</h3>
        <div className="bwm-row">
          <small>Example plans · no checkout</small>
          <button
            type="button"
            className="bwm-control"
            aria-pressed={yearly}
            onClick={() => setYearly(!yearly)}
          >
            Yearly billing {yearly ? '✓' : '○'}
          </button>
        </div>
        <div className="bwm-plans">
          {plans.map((plan, i) => (
            <article className="bwm-panel" key={plan}>
              <h4>{plan}</h4>
              <strong>
                ${yearly ? Math.round(prices[i] * 0.8) : prices[i]}
                <small> / month</small>
              </strong>
              <ul>
                <li>{i === 0 ? 'Personal projects' : 'Unlimited projects'}</li>
                <li>{i === 2 ? 'Team workspace' : 'One workspace'}</li>
                <li>Keep your source</li>
              </ul>
              <button
                type="button"
                aria-pressed={selected === plan}
                onClick={() => setSelected(plan)}
              >
                Choose {plan}
              </button>
            </article>
          ))}
        </div>
        <p role="status">
          {selected ? `${selected} selected locally.` : 'Find room for your next idea.'}
        </p>
      </div>
    </section>
  );
}
