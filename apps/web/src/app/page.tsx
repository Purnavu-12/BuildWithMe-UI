import { Suspense } from 'react';
import { Catalog } from '@/components/catalog';
import { components } from '@/lib/registry';
export default function Home() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="page-loading">
          Preparing the collection…
        </main>
      }
    >
      <Catalog
        home
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
