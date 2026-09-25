import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { repositoryUrl } from '@/lib/registry';
export const metadata = { title: 'Build with us' };
export default function Contribute() {
  return (
    <main id="main-content" className="contribute-page">
      <p className="eyebrow">OPEN SOURCE / OPEN INVITATION</p>
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
        <div>
          <span>01 / MAKE IT</span>
          <h2>Bring your idea.</h2>
          <p>
            Start with the component scaffold. Build with CSS, Motion, or Anime.js. Make something
            useful and make it yours.
          </p>
        </div>
        <div>
          <span>02 / CARE FOR IT</span>
          <h2>Think of everyone.</h2>
          <p>
            Document the source, credit its creators, and test it with a keyboard, on a phone, and
            with reduced motion.
          </p>
        </div>
        <div>
          <span>03 / SHARE IT</span>
          <h2>Build it together.</h2>
          <p>
            Open a pull request with a working preview. We review the code, refine the details, and
            share the result.
          </p>
        </div>
      </div>
      <div className="contribute-actions">
        <Link href="/docs/contributing" className="primary-button">
          Read the contributor guide <ArrowUpRight size={15} />
        </Link>
        {repositoryUrl ? (
          <a
            className="small-button"
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
