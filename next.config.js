/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',  // Creates static HTML/CSS/JS for GitHub Pages
  images: {
    unoptimized: true,  // Required for static export
  },
  basePath: process.env.NODE_ENV === 'production' ? '/kenhendricks00.github.io' : '',
  trailingSlash: true,
}

module.exports = nextConfig
