/** @type {import('next').NextConfig} */

// GitHub Pages serves the site from /Portfolio; Vercel serves it from the root.
// Vercel sets VERCEL=1 during its builds, so it gets no base path automatically.
// BASE_PATH (e.g. BASE_PATH="") overrides both.
const isProd = process.env.NODE_ENV === 'production';
const onVercel = Boolean(process.env.VERCEL);
const basePath = process.env.BASE_PATH ?? (isProd && !onVercel ? '/Portfolio' : '');

const nextConfig = {
  output: 'export', // static HTML in ./out — works on GitHub Pages
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
