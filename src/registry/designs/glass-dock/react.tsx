// Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/glass-dock.tsx under MIT. Copyright (c) Ashutoshx7.
'use client';
import { useState } from 'react';
import { useAnimation } from '../../shared/use-animation';
import '../../shared/base.css';
import './glass-dock.css';
export default function GlassDock({
  label = 'Glass dock',
  paused = false,
}: {
  label?: string;
  paused?: boolean;
}) {
  const { ref, active } = useAnimation(paused);
  const [selected, setSelected] = useState('Home');
  const items = ['Home', 'Search', 'Create', 'Profile'];
  const icons = ['⌂', '⌕', '＋', '◉'];
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <div>
        <nav className="adapt-dock" aria-label={label}>
          {items.map((item, i) => (
            <button
              type="button"
              key={item}
              aria-label={item}
              aria-pressed={selected === item}
              onClick={() => setSelected(item)}
            >
              <span aria-hidden="true">{icons[i]}</span>
            </button>
          ))}
        </nav>
        <p className="bw-caption" role="status">
          {selected} selected
        </p>
      </div>
    </div>
  );
}
