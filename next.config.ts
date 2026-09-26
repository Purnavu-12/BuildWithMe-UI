import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  experimental: { optimizePackageImports: ['lucide-react'] },
};
export default config;
