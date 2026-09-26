import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/theme-provider';
import { Header, Footer } from '@/components/shell';
import { registryStats } from '@/lib/registry';
import './globals.css';
export const metadata: Metadata = {
  title: {
    default: 'BuildWithMe UI — Build the interface. Keep the source.',
    template: '%s · BuildWithMe UI',
  },
  description:
    `Discover ${registryStats.designs} open-source component designs with ${registryStats.implementations} React, Vue, and Svelte framework sources.`,
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
