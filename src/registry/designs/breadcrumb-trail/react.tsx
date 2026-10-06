// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';
import './breadcrumb-trail.css';

export interface BreadcrumbTrailProps {
  label?: string;
  className?: string;
}
export default function BreadcrumbTrail({
  label = 'Breadcrumb trail',
  className = '',
}: BreadcrumbTrailProps) {
  const [current, setCurrent] = useState('Navigation');
  return (
    <section className={`bw-demo bwm-breadcrumb-trail ${className}`}>
      <nav className="bwm-breadcrumb" aria-label={label}>
        <ol>
          <li>
            <button type="button" onClick={() => setCurrent('Workspace')}>
              Workspace
            </button>
          </li>
          <li className="bwm-crumb-overflow">
            <details>
              <summary aria-label="Show parent pages">…</summary>
              <button type="button" onClick={() => setCurrent('Library')}>
                Library
              </button>
            </details>
          </li>
          <li>
            <button type="button" aria-current="page" onClick={() => setCurrent('Navigation')}>
              {current}
            </button>
          </li>
        </ol>
      </nav>
    </section>
  );
}
