import type { MetadataRoute } from "next";
import { products, collections } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.brand.url;
  const now = new Date();
  const staticPages = [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/pages/lookbook`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
  ];
  const colPages = collections.map((c) => ({ url: `${base}/collections/${c.handle}`, lastModified: now }));
  const prodPages = products.map((p) => ({ url: `${base}/products/${p.handle}`, lastModified: now }));
  return [...staticPages, ...colPages, ...prodPages];
}
