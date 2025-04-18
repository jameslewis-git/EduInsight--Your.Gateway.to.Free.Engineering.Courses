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
  
  // Exclude problematic routes from static generation
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // Remove routes with useSearchParams from static generation
    delete defaultPathMap['/auth/callback'];
    delete defaultPathMap['/signup-confirmation'];
    
    return defaultPathMap;
  },
};

export default nextConfig;
