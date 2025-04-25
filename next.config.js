// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export to enable server-side rendering
  // output: 'export',
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
};

export default nextConfig;
