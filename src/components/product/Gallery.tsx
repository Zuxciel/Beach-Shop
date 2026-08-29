"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/types";

export function Gallery({ images, title }: { images: ProductImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand-100 md:aspect-[4/5]"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <Image
          src={images[active].url}
          alt={images[active].altText}
          fill
          priority={active === 0}
          className={`object-cover transition-transform duration-700 ${zoom ? "scale-110" : "scale-100"}`}
          sizes="(max-width:1024px) 100vw, 50vw"
        />
        {/* Video badge if last image is video stand-in */}
        {active === images.length - 1 && images.length > 3 && (
          <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">5s loop • beach setting</span>
        )}

        {/* Prev/next mobile */}
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-3 md:hidden">
          <button onClick={() => setActive((a) => (a - 1 + images.length) % images.length)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow">‹</button>
          <button onClick={() => setActive((a) => (a + 1) % images.length)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow">›</button>
        </div>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
          {images.map((_, i) => (
            <span key={i} className={`h-1.5 w-6 rounded-full transition ${i === active ? "bg-white" : "bg-white/40"}`} />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="hidden gap-3 overflow-x-auto md:flex">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition ${i === active ? "border-ocean" : "border-transparent hover:border-sand-200"}`}
          >
            <Image src={img.url} alt={img.altText} fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>

      {/* Swipeable carousel on mobile - also show as dots above but keep thumbnails swipeable */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide md:hidden">
        {images.map((img, i) => (
          <button key={i} onClick={() => setActive(i)} className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg ${i === active ? "ring-2 ring-ocean" : "opacity-70"}`}>
            <Image src={img.url} alt={img.altText} fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>
    </div>
  );
}
