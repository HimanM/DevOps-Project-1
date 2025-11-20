import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.BACKEND_URL || 'http://backend:5000/api/:path*',
      },
      {
        source: '/metrics',
        destination: process.env.BACKEND_URL || 'http://backend:5000/metrics',
      },
    ]
  },
  output: 'standalone',
  reactCompiler: true,
};

export default nextConfig;
