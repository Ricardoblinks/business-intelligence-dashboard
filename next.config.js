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
  // Customize webpack config if needed
  webpack: (config, { isServer, dev }) => {
    // Custom webpack configurations
    return config;
  },
  // Internationalization settings if needed
  // i18n: {
  //   locales: ['en', 'fr', 'es'],
  //   defaultLocale: 'en',
  // },
  // Handle redirects if needed
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  // Error handling
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;