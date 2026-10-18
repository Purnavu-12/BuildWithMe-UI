import Link from 'next/link';
import { notFound } from 'next/navigation';
import IntegrationExample from '@/registry/examples/integration/react';
import { FrameworkPreview } from '@/components/framework-preview';
import { DocsNav } from '@/components/shell';
import { frameworks, type Framework } from '@/registry/schema';
export function generateStaticParams() {
  return frameworks.map((framework) => ({ framework }));
}
export async function generateMetadata({ params }: { params: Promise<{ framework: string }> }) {
  const { framework } = await params;
  return {
    title: `${framework} integration example`,
    alternates: { canonical: `/examples/${framework}` },
  };
}
export default async function Examples({ params }: { params: Promise<{ framework: string }> }) {
  const { framework } = await params;
  if (!frameworks.includes(framework as Framework)) notFound();
  return (
    <div className="docs-layout">
      <DocsNav
        integrationExamplesHref={`/examples/${framework}`}
        integrationExamplesActive
      />
      <main id="main-content" className="docs-content integration-examples-content">
        <div className="standalone-preview">
          <h1>Build with real data.</h1>
          <p>Change application state, customize content, and inspect component events.</p>
          <nav className="example-actions" aria-label="Example framework">
            {frameworks.map((item) => (
              <Link
                key={item}
                href={`/examples/${item}`}
                aria-current={item === framework ? 'page' : undefined}
              >
                {item}
              </Link>
            ))}
          </nav>
          {framework === 'react' ? (
            <div className="preview-stage" data-bwm-theme="dark">
              <IntegrationExample />
            </div>
          ) : (
            <FrameworkPreview id="integration-example" framework={framework as 'vue' | 'svelte'} />
          )}
        </div>
      </main>
    </div>
  );
}
