'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Command, Search, X } from 'lucide-react';

type SearchItem = { title: string; description: string; href: string; meta: string };

export function CommandSearch({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    return (
      value
        ? items.filter((item) =>
            `${item.title} ${item.description} ${item.meta}`.toLowerCase().includes(value),
          )
        : items
    ).slice(0, 9);
  }, [items, query]);

  function open() {
    dialog.current?.showModal();
    setQuery('');
    setActiveIndex(0);
    requestAnimationFrame(() => input.current?.focus());
  }

  function close() {
    dialog.current?.close();
    setQuery('');
    setActiveIndex(0);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (results.length > 0) {
        setActiveIndex((prev) => (prev + 1) % results.length);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (results.length > 0) {
        setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
      }
    } else if (event.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < results.length) {
        event.preventDefault();
        const selectedItem = results[activeIndex];
        close();
        router.push(selectedItem.href);
      }
    }
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      const typing = /INPUT|TEXTAREA|SELECT/.test(target.tagName) || target.isContentEditable;
      if (
        (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) ||
        (event.key === '/' && !typing)
      ) {
        event.preventDefault();
        open();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const activeId =
    results.length > 0 && activeIndex >= 0 && activeIndex < results.length
      ? `command-option-${activeIndex}`
      : undefined;

  return (
    <>
      <button className="command-trigger" onClick={open} aria-label="Search components and documentation">
        <Search size={13} />
        <span>Search</span>
        <kbd>⌘K</kbd>
      </button>
      <dialog
        className="command-dialog"
        ref={dialog}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
      >
        <div className="command-panel">
          <label className="command-input">
            <Search size={16} />
            <span className="sr-only">Search components and documentation</span>
            <input
              ref={input}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search components, domains, frameworks…"
              autoComplete="off"
              role="combobox"
              aria-expanded="true"
              aria-haspopup="listbox"
              aria-controls="command-search-listbox"
              aria-autocomplete="list"
              aria-activedescendant={activeId}
            />
            <button onClick={close} aria-label="Close search">
              <X size={15} />
            </button>
          </label>
          <div className="command-results" id="command-search-listbox" role="listbox" aria-label="Search results">
            {results.map((item, index) => (
              <Link
                key={item.href}
                id={`command-option-${index}`}
                href={item.href}
                onClick={close}
                onMouseEnter={() => setActiveIndex(index)}
                role="option"
                aria-selected={activeIndex === index ? 'true' : 'false'}
                data-active={activeIndex === index}
              >
                <span>
                  <b>{item.title}</b>
                  <small>{item.description}</small>
                </span>
                <em>{item.meta}</em>
              </Link>
            ))}
            {!results.length ? <p>No matching component or guide.</p> : null}
          </div>
          <footer>
            <span>
              <Command size={12} /> BuildWithMe discovery
            </span>
            <span>ESC to close</span>
          </footer>
        </div>
      </dialog>
    </>
  );
}
