// Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/elastic-stack.tsx under MIT. Copyright (c) Ashutoshx7.
'use client';
import { useState } from 'react';
import { useAnimation } from '../../shared/use-animation';
import '../../shared/base.css';
import './elastic-stack.css';
export default function ElasticStack({
  label = 'Elastic stack',
  paused = false,
}: {
  label?: string;
  paused?: boolean;
}) {
  const { ref, active } = useAnimation(paused);
  const [selected, setSelected] = useState('Plan');
  const items = ['Plan', 'Build', 'Review', 'Ship'];
  const icons = ['01', '02', '03', '04'];
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <div>
        <nav className="adapt-elastic" aria-label={label}>
          {items.map((item, i) => (
            <button
              type="button"
              key={item}
              aria-label={item}
              aria-pressed={selected === item}
              onClick={() => setSelected(item)}
            >
              <span aria-hidden="true">{icons[i]}</span>
              <b>{item}</b>
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
