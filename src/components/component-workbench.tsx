'use client';

import Link from 'next/link';
import { useId, useRef, useTransition, type KeyboardEvent, type ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { frameworks, type Framework } from '@/registry/schema';
import { Preview } from './preview';
import { FrameworkPreview } from './framework-preview';
import { ComponentInstall } from './install-command';
import { SourceViewer, type SourceFiles } from './source-viewer';

export function ComponentWorkbench({
  id,
  site,
  sources,
  definitions,
  inspector,
}: {
  id: string;
  site: string;
  sources: SourceFiles;
  definitions: Record<Framework, { usage: string; verification?: { status: string } }>;
  inspector: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const value = params.get('framework');
  const framework: Framework = frameworks.includes(value as Framework)
    ? (value as Framework)
    : 'react';
  const [pending, transition] = useTransition();
  const groupId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function choose(next: Framework) {
    const search = new URLSearchParams(params.toString());
    if (next === 'react') search.delete('framework');
    else search.set('framework', next);
    transition(() =>
      router.push(`${pathname}${search.size ? `?${search}` : ''}`, { scroll: false }),
    );
  }
  function navigate(event: KeyboardEvent<HTMLButtonElement>, current: number) {
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? 2
          : event.key === 'ArrowRight'
            ? (current + 1) % 3
            : event.key === 'ArrowLeft'
              ? (current + 2) % 3
              : -1;
    if (next < 0) return;
    event.preventDefault();
    choose(frameworks[next]);
    buttons.current[next]?.focus();
  }
  return (
    <>
      <div
        className="workbench-frameworks"
        role="tablist"
        aria-label="Component framework"
        aria-busy={pending}
      >
        {frameworks.map((item, index) => (
          <button
            key={item}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            id={`${groupId}-${item}`}
            role="tab"
            aria-selected={framework === item}
            aria-controls={`${groupId}-preview`}
            tabIndex={framework === item ? 0 : -1}
            onClick={() => choose(item)}
            onKeyDown={(event) => navigate(event, index)}
          >
            <span>{item}</span>
            <small>{definitions[item].verification?.status ?? 'provisional'}</small>
          </button>
        ))}
      </div>
      <Link className="workbench-standalone" href={`/preview/${id}/${framework}`}>
        Open standalone preview ↗
      </Link>
      <section className="detail-workbench">
        <div
          className="detail-preview"
          id={`${groupId}-preview`}
          role="tabpanel"
          aria-labelledby={`${groupId}-${framework}`}
        >
          {framework === 'react' ? (
            <Preview key={framework} id={id} controls />
          ) : (
            <FrameworkPreview key={framework} id={id} framework={framework} />
          )}
        </div>
        <aside className="detail-panel">
          <section className="detail-section">
            <h2>Install the source</h2>
            <p>
              Receive the complete component and its dependencies. npm packages are not published.
            </p>
            <ComponentInstall id={id} site={site} framework={framework} />
          </section>
          {inspector}
        </aside>
      </section>
      <section className="detail-source-section">
        <p className="section-index">
          SOURCE / {framework.toUpperCase()} ·{' '}
          {definitions[framework].verification?.status ?? 'provisional'}
        </p>
        <h2>Nothing hidden. Everything yours.</h2>
        <SourceViewer
          key={framework}
          sources={sources}
          framework={framework}
          onFrameworkChange={choose}
          usage={definitions[framework].usage}
        />
      </section>
    </>
  );
}
