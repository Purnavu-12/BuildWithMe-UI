'use client';

import Link from 'next/link';
import { type KeyboardEvent as ReactKeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Command, Search, X } from 'lucide-react';

type SearchItem = { title: string; description: string; href: string; meta: string };

const RESULTS_ID = 'command-search-results';

export function CommandSearch({ items }: { items: SearchItem[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const options = useRef<Array<HTMLAnchorElement | null>>([]);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    return (value ? items.filter((item) => `${item.title} ${item.description} ${item.meta}`.toLowerCase().includes(value)) : items).slice(0, 9);
  }, [items, query]);
  function resetSearch() { setQuery(''); setActiveIndex(-1); }
  function moveActive(delta: 1 | -1) {
    if (!results.length) { setActiveIndex(-1); return; }
    setActiveIndex((current) => {
      if (current < 0 || current >= results.length) return delta > 0 ? 0 : results.length - 1;
      return (current + delta + results.length) % results.length;
    });
  }
  function onSearchKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveActive(1);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveActive(-1);
      return;
    }
    if (event.key === 'Enter' && activeIndex >= 0 && activeIndex < results.length) {
      event.preventDefault();
      options.current[activeIndex]?.click();
    }
  }
  function open() { setActiveIndex(-1); dialog.current?.showModal(); requestAnimationFrame(() => input.current?.focus()); }
  function close() { dialog.current?.close(); resetSearch(); }
  useEffect(() => {
    options.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      const typing = /INPUT|TEXTAREA|SELECT/.test(target.tagName) || target.isContentEditable;
      if ((event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) || (event.key === '/' && !typing)) {
        event.preventDefault(); open();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  return <>
    <button className="command-trigger" onClick={open} aria-label="Search components and documentation"><Search size={13}/><span>Search</span><kbd>⌘K</kbd></button>
    <dialog className="command-dialog" ref={dialog} onClose={resetSearch} onClick={(event) => { if (event.target === dialog.current) close(); }}>
      <div className="command-panel">
        <label className="command-input"><Search size={16}/><span className="sr-only">Search components and documentation</span><input ref={input} value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(-1); }} onKeyDown={onSearchKeyDown} placeholder="Search components, domains, frameworks…" autoComplete="off" role="combobox" aria-expanded={true} aria-controls={RESULTS_ID} aria-autocomplete="list" aria-activedescendant={activeIndex >= 0 && activeIndex < results.length ? `command-search-option-${activeIndex}` : undefined}/><button onClick={close} aria-label="Close search"><X size={15}/></button></label>
        <div id={RESULTS_ID} className="command-results" role="listbox" aria-label="Search results">
          {results.map((item, index) => (
            <Link
              key={item.href}
              id={`command-search-option-${index}`}
              ref={(element) => { options.current[index] = element; }}
              href={item.href}
              onClick={close}
              onFocus={() => setActiveIndex(index)}
              role="option"
              aria-selected={index === activeIndex}
            >
              <span><b>{item.title}</b><small>{item.description}</small></span>
              <em>{item.meta}</em>
            </Link>
          ))}
          {!results.length ? <p>No matching component or guide.</p> : null}
        </div>
        <footer><span><Command size={12}/> BuildWithMe discovery</span><span>ESC to close</span></footer>
      </div>
    </dialog>
  </>;
}
