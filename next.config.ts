import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  // Solo se ejecuta durante 'npm run dev'. Ignorado en 'output: export'.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api-php/:path*',
          destination: 'http://localhost:8888/vicards-api/:path*',
        },
      ]
    }
  }
};

export default nextConfig;
