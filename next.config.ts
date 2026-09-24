import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'illustrations.popertee.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.avorainnovations.com',
      }
    ],
  },
};

export default nextConfig;
