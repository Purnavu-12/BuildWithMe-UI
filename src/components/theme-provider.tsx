'use client';
import { ThemeProvider as Provider, useTheme } from 'next-themes';
import type { ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <Provider attribute="data-theme" defaultTheme="dark" enableSystem>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Provider>
  );
}
export function ThemeSelect() {
  const { theme, setTheme } = useTheme();
  return (
    <label className="theme-select">
      <span className="sr-only">Color theme</span>
      <select
        aria-label="Color theme"
        value={theme ?? 'dark'}
        onChange={(e) => setTheme(e.target.value)}
        suppressHydrationWarning
      >
        <option value="dark">Dark</option>
        <option value="light">Light</option>
        <option value="system">System</option>
      </select>
    </label>
  );
}
