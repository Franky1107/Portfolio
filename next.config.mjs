/** @type {import('next').NextConfig} */

// The site is served from https://franky1107.github.io/Portfolio/, so production
// builds live under /Portfolio. Override with BASE_PATH="" for a root deploy.
const isProd = process.env.NODE_ENV === 'production';
const basePath = process.env.BASE_PATH ?? (isProd ? '/Portfolio' : '');

const nextConfig = {
  output: 'export', // static HTML in ./out — works on GitHub Pages
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
