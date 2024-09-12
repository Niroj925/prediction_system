/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, 
  },
  env: {
    BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_API,
  },
};

module.exports = nextConfig;
