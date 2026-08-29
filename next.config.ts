import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN / network access during `next dev` (fixes 403 for _next/static when opening via 192.168.x.x)
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.1.6:3000",
    "http://192.168.1.6",
    "192.168.1.6",
    "192.168.1.6:3000",
    // wildcard for any device on common private ranges (Next matches suffix)
    "*.192.168.1.6",
    "*.localhost",
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
