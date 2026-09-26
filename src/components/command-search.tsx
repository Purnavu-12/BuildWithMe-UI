'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Command, Search, X } from 'lucide-react';

type SearchItem = { title: string; description: string; href: string; meta: string };

export function CommandSearch({ items }: { items: SearchItem[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    return (value ? items.filter((item) => `${item.title} ${item.description} ${item.meta}`.toLowerCase().includes(value)) : items).slice(0, 9);
  }, [items, query]);
  function open() { dialog.current?.showModal(); requestAnimationFrame(() => input.current?.focus()); }
  function close() { dialog.current?.close(); setQuery(''); }
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
    <dialog className="command-dialog" ref={dialog} onClick={(event) => { if (event.target === dialog.current) close(); }}>
      <div className="command-panel">
        <label className="command-input"><Search size={16}/><span className="sr-only">Search components and documentation</span><input ref={input} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search components, domains, frameworks…" autoComplete="off"/><button onClick={close} aria-label="Close search"><X size={15}/></button></label>
        <div className="command-results" role="listbox" aria-label="Search results">
          {results.map((item) => <Link key={item.href} href={item.href} onClick={close} role="option"><span><b>{item.title}</b><small>{item.description}</small></span><em>{item.meta}</em></Link>)}
          {!results.length ? <p>No matching component or guide.</p> : null}
        </div>
        <footer><span><Command size={12}/> BuildWithMe discovery</span><span>ESC to close</span></footer>
      </div>
    </dialog>
  </>;
}
