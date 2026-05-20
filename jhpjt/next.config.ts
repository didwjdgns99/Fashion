import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: "/upload/:path*",
        destination:
          "http://ec2-43-200-171-164.ap-northeast-2.compute.amazonaws.com/upload/:path*",
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      {
        protocol: "http",
        hostname: "ec2-43-200-171-164.ap-northeast-2.compute.amazonaws.com",
        pathname: "/upload/**",
      },
    ],
  },
};

export default nextConfig;
