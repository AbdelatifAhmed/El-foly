import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: 'https', // Or 'http' if applicable
        hostname: 'image.daisyui.com', // Replace with the hostname of your external image source
        port: '', // Leave empty unless a specific port is required
        pathname: '/images/**', // Adjust the path as needed, use '**' for any subdirectories
      },
    ],
  },
};

export default nextConfig;
