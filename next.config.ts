import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Note: Since the repo is named 'alessio.github.io', it is served at the root domain.
  // We don't need a basePath prefix.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
