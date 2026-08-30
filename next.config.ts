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
  // SEO: canonical domain — apex -> www redirect (Vercel also handles, but Next ensures single canonical)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "easthtic.my.id" }],
        destination: "https://www.easthtic.my.id/:path*",
        permanent: true,
      },
      // Vercel preview URL redirect hint (optional)
      // Common Vercel domains -> canonical
      {
        source: "/:path*",
        has: [{ type: "host", value: "easthtic-of-indonesia.vercel.app" }],
        destination: "https://www.easthtic.my.id/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
