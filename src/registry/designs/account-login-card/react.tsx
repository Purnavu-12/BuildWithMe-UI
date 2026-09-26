// Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/login.tsx under MIT. Copyright (c) Vercel, Inc..
'use client';
import { useState } from 'react';
import '../../shared/base.css';
import './account-login-card.css';

export default function AccountLoginCard({
  label = 'Account login card',
  paused = false,
}: {
  label?: string;
  paused?: boolean;
}) {
  const [complete, setComplete] = useState(false);

  return (
    <div className="bw-demo" data-active={!paused}>
      <form
        className="adapt-login"
        onSubmit={(event) => {
          event.preventDefault();
          setComplete(true);
        }}
      >
        <span>ACCOUNT / SECURE</span>
        <h3>{label}</h3>
        <label>
          Email
          <input type="email" autoComplete="email" placeholder="you@example.com" required />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
          />
        </label>
        <button type="submit">{complete ? 'Ready' : 'Continue'}</button>
        <p className="adapt-login-status" role="status" aria-live="polite">
          {complete ? 'Demo sign-in complete.' : ''}
        </p>
      </form>
    </div>
  );
}
