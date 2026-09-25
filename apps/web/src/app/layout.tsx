import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/theme-provider';
import { Header, Footer } from '@/components/shell';
import './globals.css';
export const metadata: Metadata = {
  title: {
    default: 'BuildWithMe UI — A little less from scratch.',
    template: '%s · BuildWithMe UI',
  },
  description:
    'Discover 25 open-source React components. Preview, install, customize, and build together with CSS, Motion, and Anime.js.',
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
