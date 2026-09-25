import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main-content" className="empty-state">
      <p className="eyebrow">404 / NOT IN THE COLLECTION</p>
      <h1>This piece hasn’t been built yet.</h1>
      <p>There’s still plenty to explore.</p>
      <Link href="/components" className="primary-button">
        Back to components
      </Link>
    </main>
  );
}
