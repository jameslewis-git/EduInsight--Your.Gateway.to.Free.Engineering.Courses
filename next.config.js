// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // We're using server components, so SSR should be enabled
  // output: 'export', // Explicitly remove static export
  distDir: '.next',
  images: {
    // Enable image optimization since we're using server-side rendering
    unoptimized: false,
    domains: ['source.unsplash.com', 'images.unsplash.com', 'img-c.udemycdn.com', 'prod-discovery.edx-cdn.org', 'd3njjcbhbojbot.cloudfront.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Skip SSG for auth callback route which requires useSearchParams
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
  // Configure swcMinify
  swcMinify: true,
  // Force specific routes to be always dynamic
  experimental: {
    // Use the correct experimental options for Next.js 15
    serverActions: {},
  },
  // Add explicit route configuration
  // This ensures these routes are always rendered as server-side
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: '/auth/callback/',
          destination: '/auth/callback/index.html',
          has: [
            {
              type: 'query',
              key: 'code',
              value: '(?<code>.*)',
            },
          ],
        },
      ],
    };
  },
};

export default nextConfig;
