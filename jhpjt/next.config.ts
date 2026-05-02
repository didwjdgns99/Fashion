import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/upload/**",
      },
    ],
  },
};

export default nextConfig;
