
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: '/hamed-portfolio',
  assetPrefix: '/hamed-portfolio/',
};
export default nextConfig;
