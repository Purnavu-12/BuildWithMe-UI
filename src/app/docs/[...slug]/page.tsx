import { notFound } from 'next/navigation';
import { DocsNav } from '@/components/shell';
import { docs } from '@/lib/docs';
export function generateStaticParams() {
  return Object.keys(docs).map((slug) => ({ slug: [slug] }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  return { title: docs[(await params).slug.join('/')]?.title ?? 'Documentation' };
}
export default async function Doc({ params }: { params: Promise<{ slug: string[] }> }) {
  const doc = docs[(await params).slug.join('/')];
  if (!doc) notFound();
  return (
    <div className="docs-layout">
      <DocsNav />
      <main id="main-content" className="docs-content">
        <p className="mono-label">BuildWithMe UI / Handbook</p>
        <h1>{doc.title}</h1>
        <p>{doc.intro}</p>
        {doc.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
            {section.code ? (
              <pre tabIndex={0}>
                <code>{section.code}</code>
              </pre>
            ) : null}
          </section>
        ))}
      </main>
    </div>
  );
}
