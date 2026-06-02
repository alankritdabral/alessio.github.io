import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  // Since the repo is named 'alessio.github.io' but hosted by 'alankritdabral',
  // we need a basePath prefix for production.
  basePath: isProd ? '/alessio.github.io' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
