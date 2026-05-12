import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['better-auth'],
  allowedDevOrigins: ['192.168.0.8'],
};

export default nextConfig;
