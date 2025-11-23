import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.BACKEND_URL || 'http://devops-project-1-backend:5000/api/:path*',
      },
      {
        source: '/metrics',
        destination: process.env.BACKEND_URL || 'http://devops-project-1-backend:5000/metrics',
      },
    ]
  },
  output: 'standalone',
  reactCompiler: true,
};

export default nextConfig;
