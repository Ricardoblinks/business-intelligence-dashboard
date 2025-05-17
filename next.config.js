/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['via.placeholder.com'], 
    },
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_APP_NAME: 'BizInsight Dashboard',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
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