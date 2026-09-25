import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { repositoryUrl } from '@/lib/registry';
export const metadata = { title: 'Build with us' };
export default function Contribute() {
  return (
    <main id="main-content" className="contribute-page">
      <p className="mono-label">OPEN SOURCE / OPEN INVITATION</p>
      <h1>
        Good things happen
        <br />
        when we build together.
      </h1>
      <p className="contribute-lead">
        An interaction you can’t stop thinking about. A tiny detail that makes a product feel right.
        There’s a place for it here.
      </p>
      <div className="contribute-steps">
        <article>
          <span>01 / MAKE IT</span>
          <h2>Bring your idea.</h2>
          <p>
            Run one command. It creates the typed manifest and native React, Vue, and Svelte sources.
          </p>
        </article>
        <article>
          <span>02 / CARE FOR IT</span>
          <h2>Think of everyone.</h2>
          <p>
            Build equivalent behavior for each framework and verify the keyboard, touch, and reduced-motion experience.
          </p>
        </article>
        <article>
          <span>03 / SHARE IT</span>
          <h2>Build it together.</h2>
          <p>
            Generated previews, docs, package maps, registry files, and validation remove the repetitive work.
          </p>
        </article>
      </div>
      <div className="contribute-actions">
        <Link href="/docs/contributing" className="button button-light">
          Read the contributor guide <ArrowUpRight size={15} />
        </Link>
        {repositoryUrl ? (
          <a
            className="button button-ghost"
            href={`${repositoryUrl}/issues/new/choose`}
            target="_blank"
            rel="noreferrer"
          >
            Open an issue <ArrowUpRight size={14} />
          </a>
        ) : null}
      </div>
      <div className="prose">
        <h2>More than new components.</h2>
        <p>
          Accessibility improvements, documentation, bug reports, engine variants, and thoughtful
          reviews all move the project forward. Start wherever you can help.
        </p>
      </div>
    </main>
  );
}
