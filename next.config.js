/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['via.placeholder.com'], // Add domains for external images if needed
  },
  // Enable Trailing Slash
  trailingSlash: false,
  // Configure asset prefix for CDN if needed
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.example.com' : '',
  // Configure environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'BizInsight Dashboard',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
  // Modify redirects to avoid conflicts with middleware
  async redirects() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/:path*',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;