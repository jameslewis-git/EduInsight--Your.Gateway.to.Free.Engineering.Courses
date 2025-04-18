// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: '.next',
  images: {
    unoptimized: true,
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
