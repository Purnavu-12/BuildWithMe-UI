import Link from 'next/link';
import { ArrowUpRight, BookOpen, Code2, Github } from 'lucide-react';
import { repositoryUrl } from '@/lib/registry';

export const metadata = { title: 'Build with us' };

const firstIssues = `${repositoryUrl}/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22`;

export default function Contribute() {
  return (
    <main id="main-content" className="contribute-page">
      <p className="mono-label">OPEN SOURCE / EVERY USEFUL CHANGE COUNTS</p>
      <h1>
        Start small.
        <br />
        Build with us.
      </h1>
      <p className="contribute-lead">
        Fix a sentence, reproduce a bug, improve one framework, or bring a complete new design. You
        do not need to know the whole system before your first pull request.
      </p>

      <section className="contribution-steps" aria-labelledby="contribution-lanes">
        <h2 id="contribution-lanes" className="sr-only">
          Contribution paths
        </h2>
        <article>
          <span>01 / FIRST 10 MINUTES</span>
          <BookOpen aria-hidden="true" />
          <h2>Make one clear fix.</h2>
          <p>
            Choose documentation, copy, accessibility notes, or a contained website issue. No
            three-framework work is required.
          </p>
          <a href={firstIssues} target="_blank" rel="noreferrer">
            Find a good first issue <ArrowUpRight size={13} />
          </a>
        </article>
        <article>
          <span>02 / FOCUSED IMPROVEMENT</span>
          <Code2 aria-hidden="true" />
          <h2>Improve what exists.</h2>
          <p>
            Fix one React, Vue, or Svelte implementation. Share what you tested and let maintainers
            coordinate broader parity.
          </p>
          <Link href="/components">
            Choose a component <ArrowUpRight size={13} />
          </Link>
        </article>
        <article>
          <span>03 / COMPLETE DESIGN</span>
          <Github aria-hidden="true" />
          <h2>Add to the ecosystem.</h2>
          <p>
            Use the scaffold for a new design. This advanced path carries the shared contract across
            all three frameworks.
          </p>
          <Link href="/docs/contributing">
            Read the full workflow <ArrowUpRight size={13} />
          </Link>
        </article>
      </section>

      <section className="contribute-quickstart" aria-labelledby="quickstart-title">
        <div>
          <p className="mono-label">HUMAN QUICKSTART / FOUR STEPS</p>
          <h2 id="quickstart-title">Your first contribution should feel possible.</h2>
          <p>
            Clone, branch, make one change, and run only the check that matches its scope. CI runs
            the basic code checks; broader testing depends on what you change.
          </p>
        </div>
        <pre tabIndex={0} aria-label="Local contribution setup commands">
          <code>{`git clone ${repositoryUrl}.git\ncd BuildWithMe-UI\npnpm install\npnpm dev`}</code>
        </pre>
      </section>

      <div className="contribute-actions">
        <a
          href={`${repositoryUrl}/blob/main/FIRST_CONTRIBUTION.md`}
          className="button button-light"
          target="_blank"
          rel="noreferrer"
        >
          First contribution guide <ArrowUpRight size={15} />
        </a>
        <a className="button button-ghost" href={repositoryUrl} target="_blank" rel="noreferrer">
          View on GitHub <Github size={14} />
        </a>
        <a
          className="button button-ghost"
          href={`${repositoryUrl}/issues/new/choose`}
          target="_blank"
          rel="noreferrer"
        >
          Open an issue <ArrowUpRight size={14} />
        </a>
      </div>
    </main>
  );
}
