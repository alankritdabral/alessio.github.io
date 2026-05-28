import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/alessio.github.io',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
