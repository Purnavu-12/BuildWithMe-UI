// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState, useRef, useEffect } from 'react';
import '../../shared/base.css';
import './toast-stack.css';

export interface ToastStackProps {
  label?: string;
  className?: string;
}
export default function ToastStack({ label = 'Toast stack', className = '' }: ToastStackProps) {
  const [toasts, setToasts] = useState<{ id: number; remaining: number }[]>([]);
  const [paused, setPaused] = useState(false);
  const counter = useRef(0);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () =>
        setToasts((items) =>
          document.hidden || !items.length
            ? items
            : items
                .map((item) => ({ ...item, remaining: item.remaining - 250 }))
                .filter((item) => item.remaining > 0),
        ),
      250,
    );
    return () => clearInterval(timer);
  }, [paused]);
  function add() {
    const id = ++counter.current;
    setToasts((items) => [...items.slice(-2), { id, remaining: 6000 }]);
  }
  return (
    <section className={`bw-demo bwm-toast-stack ${className}`}>
      <div className="bwm-panel">
        <h3>{label}</h3>
        <div className="bwm-row">
          <button type="button" onClick={add}>
            Add notification
          </button>
          <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
            {paused ? 'Resume timeouts' : 'Pause timeouts'}
          </button>
        </div>
        <div className="bwm-toasts" role="status" aria-live="polite" aria-relevant="additions">
          {toasts.map((item) => (
            <div key={item.id} className="bwm-toast">
              <span>Source saved · {item.id}</span>
              <button
                type="button"
                aria-label={`Dismiss notification ${item.id}`}
                onClick={() => setToasts((items) => items.filter((toast) => toast.id !== item.id))}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <small>Notifications expire after six seconds. Pause keeps them available.</small>
      </div>
    </section>
  );
}
