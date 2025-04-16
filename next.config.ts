import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Thay thế node:process trong client-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        process: false,
      };
    }
    return config;
  },
};

export default nextConfig;
