import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/theme-provider';
import { Header, Footer } from '@/components/shell';
import { registryStats } from '@/lib/registry';
import './globals.css';
const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://build-with-me-ui.vercel.app';
const socialImages = [`${publicSiteUrl}/opengraph-image`];
export const metadata: Metadata = {
  metadataBase: new URL(publicSiteUrl),
  alternates: { canonical: '/' },
  title: {
    default: 'BuildWithMe UI — Build the interface. Keep the source.',
    template: '%s · BuildWithMe UI',
  },
  description: `Discover ${registryStats.designs} open-source component designs with ${registryStats.implementations} React, Vue, and Svelte framework sources.`,
  applicationName: 'BuildWithMe UI',
  icons: { icon: '/icon', apple: '/icon' },
  openGraph: {
    title: 'BuildWithMe UI — Build the interface. Keep the source.',
    description: `${registryStats.designs} open component designs expressed across React, Vue, and Svelte.`,
    type: 'website',
    images: socialImages,
  },
  twitter: { card: 'summary_large_image', images: socialImages },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
