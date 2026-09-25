import { Suspense } from 'react';
import { Catalog } from '@/components/catalog';
import { components } from '@/lib/registry';
export const metadata = { title: 'Explore components' };
export default function Components() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="page-loading">
          Preparing the collection…
        </main>
      }
    >
      <Catalog
        items={components.map(({ id, title, description, category, engine, tags, author }) => ({
          id,
          title,
          description,
          category,
          engine,
          tags,
          author,
        }))}
      />
    </Suspense>
  );
}
