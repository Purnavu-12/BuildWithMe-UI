import { notFound } from 'next/navigation';
import { Preview } from '@/components/preview';
import { components, getComponent } from '@/lib/registry';
export function generateStaticParams() {
  return components.map(({ id }) => ({ id }));
}
export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getComponent(id);
  if (!item) notFound();
  return (
    <main id="main-content" className="standalone-preview">
      <h1>{item.title}</h1>
      <Preview id={id} controls />
    </main>
  );
}
