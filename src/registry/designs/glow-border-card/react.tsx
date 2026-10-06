// Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/glow-border-card.tsx under MIT. Copyright (c) Ashutoshx7.
'use client';
import { useAnimation } from '../../shared/use-animation';
import '../../shared/base.css';
import './glow-border-card.css';
export default function GlowBorderCard({
  label = 'Glow border card',
  paused = false,
}: {
  label?: string;
  paused?: boolean;
}) {
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <article className="adapt-glow-card">
        <span>INTERFACE / 07</span>
        <h3>{label}</h3>
        <p>One clear surface, one moving signal, and source you can keep.</p>
        <details>
          <summary>Inspect source ↗</summary>
          <pre>border: 1px solid var(--bw-border);</pre>
        </details>
      </article>
    </div>
  );
}
