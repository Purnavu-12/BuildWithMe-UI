'use client';

import dynamic from 'next/dynamic';

const Universe = dynamic(() => import('./hero-universe'), { ssr: false });

export function HeroVisual() {
  return (
    <div className="hero-visual" role="img" aria-label="55 component designs connected across React, Vue, and Svelte">
      <div className="hero-static" aria-hidden="true">
        <i /><i /><i />
      </div>
      <Universe />
      <div className="universe-label universe-label-react">React <span>55</span></div>
      <div className="universe-label universe-label-vue">Vue <span>55</span></div>
      <div className="universe-label universe-label-svelte">Svelte <span>55</span></div>
      <div className="universe-counter"><strong>165</strong><span>framework sources</span></div>
    </div>
  );
}
