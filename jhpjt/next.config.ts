import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: "/upload/:path*",
        destination: "http://43.200.171.164/upload/:path*",
      },
    ];
  },

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
