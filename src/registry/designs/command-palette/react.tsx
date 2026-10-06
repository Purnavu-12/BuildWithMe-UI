// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState, useRef, useId } from 'react';
import '../../shared/base.css';
import './command-palette.css';

export interface CommandPaletteProps {
  label?: string;
  className?: string;
}
export default function CommandPalette({
  label = 'Command palette',
  className = '',
}: CommandPaletteProps) {
  const uid = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const commands = [
    { name: 'Create component', group: 'Create' },
    { name: 'Open library', group: 'Navigate' },
    { name: 'Read handbook', group: 'Navigate' },
    { name: 'Share an idea', group: 'Create' },
  ];
  const matches = commands.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  function choose(name: string) {
    setSelected(name);
    dialog.current?.close();
  }
  function key(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((index + 1) % Math.max(matches.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((index + matches.length - 1) % Math.max(matches.length, 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setIndex(Math.max(matches.length - 1, 0));
    } else if (e.key === 'Enter' && matches[index]) {
      e.preventDefault();
      choose(matches[index].name);
    }
  }
  return (
    <section className={`bw-demo bwm-command-palette ${className}`}>
      <div>
        <button
          ref={trigger}
          type="button"
          className="bwm-control"
          aria-haspopup="dialog"
          onClick={() => dialog.current?.showModal()}
        >
          Open {label}
        </button>
        <p className="bw-caption" role="status">
          {selected ? `${selected} selected locally.` : ''}
        </p>
        <dialog
          ref={dialog}
          className="bwm-command"
          aria-labelledby={`${uid}-title`}
          onClose={() => trigger.current?.focus()}
        >
          <h3 id={`${uid}-title`}>{label}</h3>
          <label className="bw-sr-only" htmlFor={`${uid}-query`}>
            Search commands
          </label>
          <input
            id={`${uid}-query`}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls={`${uid}-list`}
            aria-activedescendant={matches[index] ? `${uid}-option-${index}` : undefined}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={key}
          />
          <ul id={`${uid}-list`} role="listbox" aria-label="Commands">
            {matches.map((item, i) => (
              <li
                key={item.name}
                id={`${uid}-option-${i}`}
                role="option"
                aria-selected={index === i}
              >
                <button type="button" tabIndex={-1} onClick={() => choose(item.name)}>
                  <span>{item.name}</span>
                  <small>{item.group}</small>
                </button>
              </li>
            ))}
          </ul>
          {!matches.length ? <p role="status">No matching commands.</p> : null}
          <button type="button" className="bwm-control" onClick={() => dialog.current?.close()}>
            Close commands
          </button>
        </dialog>
      </div>
    </section>
  );
}
