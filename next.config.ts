import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Do NOT add case-variant redirects (/Sureality → /sureality). Next matches
  // sources case-insensitively, which creates an infinite /sureality ⇄ /sureality loop.
  async rewrites() {
    return [
      { source: "/scatter/sureality", destination: "/sureality" },
      { source: "/scatter/Sureality", destination: "/sureality" },
    ];
  },
};

export default nextConfig;
