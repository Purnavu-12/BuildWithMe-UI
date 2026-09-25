import type { NextConfig } from 'next';
import path from 'node:path';
const config: NextConfig = {
  turbopack: { root: path.resolve(import.meta.dirname, '../..') },
  poweredByHeader: false,
};
export default config;
