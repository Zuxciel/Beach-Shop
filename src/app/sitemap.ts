import type { MetadataRoute } from "next";
import { products, collections } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.brand.url.replace(/\/$/, "");
  const now = new Date();

  // Static pages — shop-all is also in collections, so dedup via filter below
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/pages/lookbook`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const seen = new Set(staticPages.map((p) => p.url));
  const colPages: MetadataRoute.Sitemap = collections
    .filter((c) => !seen.has(`${base}/collections/${c.handle}`))
    .map((c) => ({
      url: `${base}/collections/${c.handle}`,
      lastModified: now,
      changeFrequency: (c.handle === "shop-all" ? "daily" : "weekly") as "daily" | "weekly",
      priority: c.handle === "shop-all" ? 0.9 : 0.8,
    }));

  const prodPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.handle}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...colPages, ...prodPages];
}
