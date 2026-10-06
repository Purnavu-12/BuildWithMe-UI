// Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/product-grid.tsx under MIT. Copyright (c) Vercel, Inc..
'use client';
import { useState } from 'react';
import { galleryImages } from '../../shared/gallery-assets';
import { useAnimation } from '../../shared/use-animation';
import '../../shared/base.css';
import './product-grid.css';
export default function ProductGrid({
  label = 'Product grid',
  paused = false,
}: {
  label?: string;
  paused?: boolean;
}) {
  const [selected, setSelected] = useState('');
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <div className="adapt-products" aria-label={label}>
        {galleryImages.map((item, index) => (
          <button
            type="button"
            key={item.title}
            aria-pressed={selected === item.title}
            onClick={() => setSelected(item.title)}
          >
            <img src={item.src} alt={item.alt} />
            <span>
              <b>{item.title}</b>
              <small>${[89, 240, 64][index]}</small>
            </span>
          </button>
        ))}
      </div>
      <p role="status" className="bw-caption">
        {selected ? `${selected} selected locally.` : 'Example objects · no checkout'}
      </p>
    </div>
  );
}
