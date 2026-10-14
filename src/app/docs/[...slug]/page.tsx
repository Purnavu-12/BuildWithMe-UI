import { notFound } from 'next/navigation';
import { DocsNav } from '@/components/shell';
import { docs } from '@/lib/docs';
import Link from 'next/link';
export function generateStaticParams() {
  return Object.keys(docs).map((slug) => ({ slug: [slug] }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const slug = (await params).slug.join('/');
  return {
    title: docs[slug]?.title ?? 'Documentation',
    alternates: { canonical: `/docs/${slug}` },
  };
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
        {doc.sections.map((section, index) => (
          <section key={section.id ?? index} id={section.id}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
            {section.steps ? (
              <ol>
                {section.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            ) : null}
            {section.code ? (
              <pre tabIndex={0}>
                <code>{section.code}</code>
              </pre>
            ) : null}
            {section.links ? (
              <ul>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </main>
    </div>
  );
}
