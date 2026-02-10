import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: 'https', 
        hostname: 'image.daisyui.com', 
        port: '',
        pathname: '/images/**', 
      },
      {
        protocol: 'https', 
        hostname: 'elfolystore.alkyall.com', 
        port: '', 
        pathname: '/images/**', 
      },
    ],
  },
};

export default nextConfig;
