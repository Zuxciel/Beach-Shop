import type { MetadataRoute } from "next";
import { products, collections } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.brand.url.replace(/\/$/, "");
  const now = new Date();

  // Static pages with priority & changeFrequency for better crawling
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/collections/shop-all`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/pages/lookbook`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const colPages: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${base}/collections/${c.handle}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const prodPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.handle}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...colPages, ...prodPages];
}
