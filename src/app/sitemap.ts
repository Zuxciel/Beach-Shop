import type { MetadataRoute } from "next";
import { products, collections } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

function toAbsoluteUrl(url: string, base: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${base}${cleanPath}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.brand.url.replace(/\/$/, "");
  const now = new Date();

  // 1. Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      images: [toAbsoluteUrl("/og-image.jpg", base)],
    },
    {
      url: `${base}/pages/lookbook`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      images: [toAbsoluteUrl("/img/Beach1.jpg", base)],
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // 2. Collection Pages
  const seen = new Set(staticPages.map((p) => p.url));
  const colPages: MetadataRoute.Sitemap = collections
    .filter((c) => !seen.has(`${base}/collections/${c.handle}`))
    .map((c) => {
      const pageUrl = `${base}/collections/${c.handle}`;
      seen.add(pageUrl);
      return {
        url: pageUrl,
        lastModified: now,
        changeFrequency: c.handle === "shop-all" ? ("daily" as const) : ("weekly" as const),
        priority: c.handle === "shop-all" ? 0.9 : 0.8,
        images: c.image ? [toAbsoluteUrl(c.image.url, base)] : undefined,
      };
    });

  // 3. Product Pages with Google Image sitemap tags
  const prodPages: MetadataRoute.Sitemap = products.map((p) => {
    const pageUrl = `${base}/products/${p.handle}`;
    const rawImages = p.images?.length
      ? p.images.map((img) => img.url)
      : p.featuredImage?.url
      ? [p.featuredImage.url]
      : [];

    const productImages = rawImages.length
      ? rawImages.map((imgUrl) => toAbsoluteUrl(imgUrl, base))
      : undefined;

    return {
      url: pageUrl,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: productImages,
    };
  });

  return [...staticPages, ...colPages, ...prodPages];
}
