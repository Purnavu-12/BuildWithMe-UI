import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { components, getComponent, sources, labels, engineLabels, siteUrl } from '@/lib/registry';
import { Preview } from '@/components/preview';
import { SourceViewer } from '@/components/source-viewer';
import { InstallCommand } from '@/components/install-command';
export function generateStaticParams() {
  return components.map(({ id }) => ({ id }));
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getComponent(id);
  return { title: item?.title ?? 'Component not found', description: item?.description };
}
export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getComponent(id);
  if (!item) notFound();
  return (
    <main id="main-content" className="detail-page">
      <Link href="/components" className="back-link">
        <ArrowLeft size={14} /> Back to the collection
      </Link>
      <div className="detail-heading">
        <div>
          <div className="eyebrow">
            {labels[item.category]} / {engineLabels[item.engine]}
          </div>
          <h1>
            {item.title}
            <span className="detail-dot">.</span>
          </h1>
          <p>{item.description}</p>
        </div>
        <Link href={`/preview/${id}`} className="small-button">
          Open preview <ArrowUpRight size={14} />
        </Link>
      </div>
      <Preview id={id} controls />
      <div className="detail-columns">
        <div className="detail-content">
          <section>
            <h2>Make it yours</h2>
            <p>
              Install the source into your project. Every line is yours to understand and change.
            </p>
            <InstallCommand id={id} site={siteUrl} />
            <p className="fine-print">
              Requires React and a project initialized with shadcn.{' '}
              <Link href="/docs/installation">Installation guide ↗</Link>
            </p>
          </section>
          <section>
            <h2>Usage</h2>
            <SourceViewer files={[{ path: 'usage.tsx', content: item.usage }]} />
          </section>
          <section>
            <h2>Component API</h2>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {item.props.map((prop) => (
                    <tr key={prop.name}>
                      <td>
                        <code>{prop.name}</code>
                      </td>
                      <td>
                        <code>{prop.type}</code>
                      </td>
                      <td>{prop.default}</td>
                      <td>{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section>
            <h2>Source, with nothing hidden</h2>
            <SourceViewer files={sources[id]} />
          </section>
          <section>
            <h2>Accessibility & motion</h2>
            <p>{item.accessibility}</p>
          </section>
        </div>
        <aside className="component-info">
          <h2>The details</h2>
          <dl>
            <dt>Created by</dt>
            <dd>{item.author.name}</dd>
            <dt>Animation engine</dt>
            <dd>{engineLabels[item.engine]}</dd>
            <dt>License</dt>
            <dd>MIT · free to use and remix</dd>
            <dt>Origin</dt>
            <dd>
              {item.origin === 'original' ? 'Original implementation' : 'Adapted implementation'}
            </dd>
            {item.sourceUrl ? (
              <>
                <dt>Original source</dt>
                <dd>
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                    View source ↗
                  </a>
                </dd>
              </>
            ) : null}
            {item.adaptations.length ? (
              <>
                <dt>Adaptations</dt>
                <dd>{item.adaptations.join(' ')}</dd>
              </>
            ) : null}
            <dt>Dependencies</dt>
            <dd>
              {Object.entries(item.dependencies).length
                ? Object.entries(item.dependencies).map(([name, version]) => (
                    <code key={name}>
                      {name}@{version}
                      <br />
                    </code>
                  ))
                : 'No animation dependencies'}
            </dd>
            <dt>Lineage</dt>
            <dd>
              {item.parent ? (
                <Link href={`/components/${item.parent}`}>Remixed from {item.parent}</Link>
              ) : (
                'Original component · no parent'
              )}
            </dd>
          </dl>
          <hr />
          <p>Made something from this?</p>
          <Link href="/docs/contributing">
            Share your own variant <ArrowUpRight size={13} />
          </Link>
        </aside>
      </div>
    </main>
  );
}
