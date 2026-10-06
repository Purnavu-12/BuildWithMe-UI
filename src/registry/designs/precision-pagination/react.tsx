// Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/ui/pagination.tsx under MIT. Copyright (c) Vercel, Inc..
'use client';
import { useState } from 'react';
import { useAnimation } from '../../shared/use-animation';
import '../../shared/base.css';
import './precision-pagination.css';
export default function PrecisionPagination({
  label = 'Precision pagination',
  paused = false,
}: {
  label?: string;
  paused?: boolean;
}) {
  const [current, setCurrent] = useState(2);
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <nav className="adapt-pagination" aria-label={label}>
        <button
          type="button"
          aria-label="Previous page"
          disabled={current === 1}
          onClick={() => setCurrent(current - 1)}
        >
          ←
        </button>
        {[1, 2, 3, 4].map((page) => (
          <button
            type="button"
            aria-current={page === current ? 'page' : undefined}
            key={page}
            onClick={() => setCurrent(page)}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          aria-label="Next page"
          disabled={current === 4}
          onClick={() => setCurrent(current + 1)}
        >
          →
        </button>
      </nav>
    </div>
  );
}
