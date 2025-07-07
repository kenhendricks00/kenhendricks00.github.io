/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',  // Creates static HTML/CSS/JS for GitHub Pages
  images: {
    unoptimized: true,  // GitHub Pages doesn't support Next.js Image optimization
  },
  // Set basePath to match your GitHub repo name in production (e.g., '/portfolio-next')
  // Leave this as empty string if you'll be using a custom domain or deploying to username.github.io
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: true,
}

module.exports = nextConfig
