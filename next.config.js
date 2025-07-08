/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',  // Creates static HTML/CSS/JS for GitHub Pages
  images: {
    unoptimized: true,  // Required for static export
  },
  // For username.github.io repos, we shouldn't need a basePath
  basePath: '',
  trailingSlash: true,
  // Static export specific configuration
  distDir: 'out',
  // Skip type checking during builds for CI environment
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: process.env.CI === 'true',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: process.env.CI === 'true',
  }
}

module.exports = nextConfig
