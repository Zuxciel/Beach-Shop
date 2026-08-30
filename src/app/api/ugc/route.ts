import { NextResponse } from "next/server";
import { ugcPosts } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export async function GET() {
  const igToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  // Jika ada Instagram Graph API token di environment, coba fetch live dari Instagram
  if (igToken) {
    try {
      const igRes = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${igToken}`,
        { next: { revalidate: 3600 } }
      );

      if (igRes.ok) {
        const igData = await igRes.json();
        if (igData.data && Array.isArray(igData.data)) {
          const livePosts = igData.data.slice(0, 8).map((p: any) => ({
            id: p.id,
            imageUrl: p.media_type === "VIDEO" ? p.thumbnail_url || p.media_url : p.media_url,
            altText: p.caption || `Koleksi ${siteConfig.brand.name} di Instagram`,
            author: `@${p.username || siteConfig.brand.instagram}`,
            caption: p.caption || "Inspirasi suasana pantai khas Bali.",
            permalink: p.permalink,
          }));

          return NextResponse.json({
            success: true,
            source: "instagram_graph_api",
            data: livePosts,
          });
        }
      }
    } catch (e) {
      console.warn("[Instagram API] Live fetch error, falling back to curated posts:", e);
    }
  }

  // Fallback ke data kurasi katalog Aesthetic of Indonesia
  return NextResponse.json({
    success: true,
    source: "curated_feed",
    data: ugcPosts.map((p) => ({
      ...p,
      author: `@${siteConfig.brand.instagram}`,
    })),
  });
}
