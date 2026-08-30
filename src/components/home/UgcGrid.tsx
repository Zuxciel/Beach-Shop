"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import type { UGCPost } from "@/lib/types";
import { ugcPosts as fallback } from "@/lib/data";

export function UgcGrid() {
  const [posts, setPosts] = useState<UGCPost[]>(fallback);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIG = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ugc", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Gagal memuat IG feed");
      setPosts(data.data);
    } catch (e: any) {
      setError(e.message || "Gagal memuat IG, menampilkan kurasi lokal.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIG();
  }, []);

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-6 lg:px-8 md:py-20">
      <div className="flex flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
          #{siteConfig.brand.instagram}
        </p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl text-charcoal">Gaya Pesisir Tropis</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
          Inspirasi padu-padan tas anyaman dan aksesori pantai {siteConfig.brand.name} di pesisir pulau dewata.
        </p>
        <button
          onClick={fetchIG}
          disabled={loading}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-sand-200 bg-white px-4 py-1.5 text-xs font-medium hover:border-ocean transition disabled:opacity-60"
        >
          {loading ? "Memuat API..." : "↻ Refresh Feed Instagram"}
        </button>
        {error && <p className="mt-2 text-xs text-clay">{error}</p>}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group relative overflow-hidden rounded-2xl bg-sand-100 aspect-square shadow-sm"
          >
            <Image
              src={post.imageUrl}
              alt={post.altText}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:768px) 50vw, 25vw"
              loading="lazy"
              unoptimized={post.imageUrl.startsWith("/")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute inset-x-0 bottom-0 p-3.5">
              <p className="text-xs font-semibold text-white">{post.author}</p>
              <p className="text-[11px] text-white/90 line-clamp-2 mt-0.5">{post.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href={`https://instagram.com/${siteConfig.brand.instagram}`}
          target="_blank"
          rel="noopener"
          className="inline-flex h-11 items-center justify-center rounded-full border border-sand-200 bg-white px-6 text-sm font-medium hover:border-ocean hover:text-ocean transition shadow-sm"
        >
          Ikuti @{siteConfig.brand.instagram} di Instagram
        </a>
      </div>
    </section>
  );
}
