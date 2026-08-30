"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import type { UGCPost } from "@/lib/types";
import { ugcPosts as fallback } from "@/lib/data";

export function UgcGrid() {
  const [posts, setPosts] = useState<UGCPost[]>(fallback);
  const [loading, setLoading] = useState(false);

  const fetchIG = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ugc", { cache: "no-store" });
      const data = await res.json();
      if (res.ok && data.success && data.data) {
        setPosts(data.data);
      }
    } catch {
      // Keep fallback safely
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIG();
  }, []);

  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 sm:py-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-sand-200 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta-dark">
            Komunitas & Gaya Hidup
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal">
            Inspirasi Pesisir Tropis
          </h2>
        </div>
        <a
          href={`https://instagram.com/${siteConfig.brand.instagram}`}
          target="_blank"
          rel="noopener"
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium uppercase tracking-wider text-charcoal hover:text-ocean transition-colors"
        >
          <span>@{siteConfig.brand.instagram}</span>
          <span className="transition-transform group-hover:translate-x-1">↗</span>
        </a>
      </div>

      {/* 4-Column Image Grid */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group relative overflow-hidden rounded-xl bg-sand-100 aspect-square border border-sand-200/80 shadow-xs"
          >
            <Image
              src={post.imageUrl}
              alt={post.altText}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 25vw"
              loading="lazy"
              unoptimized={post.imageUrl.startsWith("/")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white">
              <p className="text-xs font-semibold text-sand-100">{post.author}</p>
              <p className="text-[11px] text-white/90 line-clamp-2 mt-0.5 font-light leading-snug">
                {post.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
