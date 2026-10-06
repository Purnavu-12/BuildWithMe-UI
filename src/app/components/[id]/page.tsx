import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import {
  components,
  domainLabels,
  engineLabels,
  getComponent,
  siteUrl,
  sources,
} from '@/lib/registry';
import { ComponentWorkbench } from '@/components/component-workbench';

export function generateStaticParams() {
  return components.map(({ id }) => ({ id }));
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getComponent(id);
  return {
    title: item?.title ?? 'Component not found',
    description: item?.summary,
    alternates: { canonical: `/components/${id}` },
  };
}

export default async function Detail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ framework?: string }>;
}) {
  const { id } = await params;
  await searchParams;
  const item = getComponent(id);
  if (!item) notFound();
  const provenance = item.provenance;
  const inspector = (
    <>
      <section className="detail-section">
        <h2>Accessibility</h2>
        <p>{item.accessibility.summary}</p>
        <ul>
          {item.accessibility.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>
      <section className="detail-section">
        <h2>Component API</h2>
        <div className="table-scroll">
          <table className="props-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
              </tr>
            </thead>
            <tbody>
              {item.props.map((prop) => (
                <tr key={prop.name}>
                  <td>
                    <code>{prop.name}</code>
                    <small>{prop.description}</small>
                  </td>
                  <td>{prop.type}</td>
                  <td>{prop.default}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="detail-section">
        <details className="provenance-details">
          <summary>Creator, license, and provenance</summary>
          <p>
            <span className="creator-chip">
              BY{' '}
              {provenance.creator.url ? (
                <a href={provenance.creator.url} target="_blank" rel="noreferrer">
                  {provenance.creator.name}
                </a>
              ) : (
                provenance.creator.name
              )}
            </span>
          </p>
          <p>
            License:{' '}
            <a href="https://opensource.org/license/mit" target="_blank" rel="noreferrer">
              {provenance.license}
            </a>
          </p>
          {provenance.type === 'adapted' ? (
            <>
              <p>
                Adapted from{' '}
                <a href={provenance.upstreamUrl} target="_blank" rel="noreferrer">
                  {provenance.upstreamAuthor} ↗
                </a>{' '}
                under {provenance.upstreamLicense}.
              </p>
              <p>{provenance.modification}</p>
            </>
          ) : provenance.type === 'remix' ? (
            <>
              <p>
                Remixed from{' '}
                <Link href={`/components/${provenance.parent}`}>{provenance.parent}</Link>.
              </p>
              <p>{provenance.modification}</p>
            </>
          ) : (
            <p>Original implementation. Preserve its attribution when redistributing.</p>
          )}
        </details>
      </section>
      <Link className="button button-ghost" href="/docs/contributing">
        Remix this component <ArrowUpRight size={13} />
      </Link>
    </>
  );
  return (
    <main id="main-content" className="detail-page">
      <header className="detail-title">
        <Link href="/components" className="detail-back">
          <ArrowLeft size={12} /> COLLECTION /{' '}
          {String(components.indexOf(item) + 1).padStart(2, '0')}
        </Link>
        <div className="detail-lede">
          <div>
            <p className="mono-label">
              {item.domains.map((domain) => domainLabels[domain]).join(' · ')} /{' '}
              {item.engines.map((engine) => engineLabels[engine]).join(' + ')}
            </p>
            <h1>{item.title}</h1>
          </div>
          <p>{item.summary}</p>
        </div>
      </header>
      <Suspense
        fallback={
          <div className="workbench-loading" role="status">
            Preparing the component workbench…
          </div>
        }
      >
        <ComponentWorkbench
          id={id}
          site={siteUrl}
          sources={sources[id]}
          definitions={item.frameworks}
          inspector={inspector}
        />
      </Suspense>
    </main>
  );
}
