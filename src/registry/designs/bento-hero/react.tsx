// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';
import './bento-hero.css';
import { galleryImages } from '../../shared/gallery-assets';
export interface BentoHeroProps {
  label?: string;
  className?: string;
}
export default function BentoHero({ label = 'Bento hero', className = '' }: BentoHeroProps) {
  const [selected, setSelected] = useState(false);
  return (
    <section className={`bw-demo bwm-bento-hero ${className}`}>
      <div className="bwm-bento">
        <article className="bwm-panel">
          <small>BUILDWITHME / UI</small>
          <h3>{label}</h3>
          <p>
            Build the interface.
            <br />
            Keep the source.
          </p>
          <button type="button" aria-pressed={selected} onClick={() => setSelected(!selected)}>
            {selected ? 'Added to your canvas ✓' : 'Start a canvas ↗'}
          </button>
        </article>
        <figure>
          <img src={galleryImages[0].src} alt={galleryImages[0].alt} />
          <figcaption>01 / Signal</figcaption>
        </figure>
        <aside className="bwm-panel">
          <strong>3 runtimes.</strong>
          <span>One idea. Your framework.</span>
        </aside>
      </div>
    </section>
  );
}
