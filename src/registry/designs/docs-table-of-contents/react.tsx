// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState, useRef, useId } from 'react';
import '../../shared/base.css';
import './docs-table-of-contents.css';

export interface DocsTableOfContentsProps {
  label?: string;
  className?: string;
}
export default function DocsTableOfContents({
  label = 'Docs table of contents',
  className = '',
}: DocsTableOfContentsProps) {
  const uid = useId();
  const [index, setIndex] = useState(0);
  const content = useRef<HTMLDivElement>(null);
  const sections = ['Overview', 'Installation', 'Customization'];
  function track() {
    if (!content.current) return;
    const nodes = Array.from(content.current.querySelectorAll<HTMLElement>('[data-section]'));
    let current = 0;
    nodes.forEach((node, i) => {
      if (node.offsetTop - content.current!.offsetTop <= content.current!.scrollTop + 30)
        current = i;
    });
    setIndex(current);
  }
  return (
    <section className={`bw-demo bwm-docs-table-of-contents ${className}`}>
      <div className="bwm-outline">
        <nav aria-label={label}>
          {sections.map((section, i) => (
            <a
              key={section}
              href={`#${uid}-${i}`}
              aria-current={index === i ? 'location' : undefined}
              onClick={() => setIndex(i)}
            >
              {section}
            </a>
          ))}
        </nav>
        <div
          ref={content}
          className="bwm-document"
          tabIndex={0}
          aria-label="Example document"
          onScroll={track}
        >
          {sections.map((section, i) => (
            <section key={section} id={`${uid}-${i}`} data-section>
              <h3>{section}</h3>
              <p>
                {
                  [
                    'Start with a clear promise and a small set of useful components.',
                    'Install the complete source closure in your chosen framework.',
                    'Adjust semantic tokens, content, and motion to fit your product.',
                  ][i]
                }
              </p>
              <p>
                Keep technical reading surfaces calm. Let headings and spacing explain the
                structure.
              </p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
