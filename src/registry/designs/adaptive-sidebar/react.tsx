// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';
import './adaptive-sidebar.css';

export interface AdaptiveSidebarProps {
  label?: string;
  className?: string;
}
export default function AdaptiveSidebar({
  label = 'Adaptive sidebar',
  className = '',
}: AdaptiveSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState('Overview');
  const items = ['Overview', 'Components', 'Contribute'];
  return (
    <section className={`bw-demo bwm-adaptive-sidebar ${className}`}>
      <div className="bwm-sidebar" data-collapsed={collapsed}>
        <nav aria-label={label}>
          <button
            type="button"
            className="bwm-control"
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? '→' : '←'}
            <span hidden={collapsed}>Workspace</span>
          </button>
          {items.map((item, i) => (
            <button
              type="button"
              key={item}
              aria-label={item}
              aria-current={selected === item ? 'page' : undefined}
              onClick={() => setSelected(item)}
            >
              <b aria-hidden="true">{['◈', '▦', '＋'][i]}</b>
              <span hidden={collapsed}>{item}</span>
            </button>
          ))}
        </nav>
        <article>
          <small>WORKSPACE</small>
          <h3>{selected}</h3>
          <p>
            {selected === 'Overview'
              ? 'Your next interface starts here.'
              : selected === 'Components'
                ? 'Explore reusable building blocks.'
                : 'Share an idea. Keep its source open.'}
          </p>
        </article>
      </div>
    </section>
  );
}
