"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/types";

export function Gallery({ images, title }: { images: ProductImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  return (
    <div className="flex flex-col gap-3 sm:gap-4 min-w-0">
      {/* Main image — responsive aspect, no overflow on <400px */}
      <div
        className="relative aspect-[4/5] max-[400px]:aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl bg-sand-100"
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
          <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] sm:text-xs font-medium text-white backdrop-blur">5s loop • beach setting</span>
        )}

        {/* Prev/next mobile — hanya jika >1 foto */}
        {images.length > 1 && (
          <>
            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-2 sm:px-3 md:hidden">
              <button onClick={() => setActive((a) => (a - 1 + images.length) % images.length)} className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/90 shadow text-sm">‹</button>
              <button onClick={() => setActive((a) => (a + 1) % images.length)} className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/90 shadow text-sm">›</button>
            </div>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
              {images.map((_, i) => (
                <span key={i} className={`h-1.5 w-6 rounded-full transition ${i === active ? "bg-white" : "bg-white/40"}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails — hanya tampil jika >1 foto, dan hanya 1 thumbnail jika 1 foto */}
      {images.length > 1 && (
        <>
          <div className="hidden gap-2 sm:gap-3 overflow-x-auto md:flex max-w-full">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-lg sm:rounded-xl border-2 transition ${i === active ? "border-ocean" : "border-transparent hover:border-sand-200"}`}
              >
                <Image src={img.url} alt={img.altText} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide md:hidden max-w-full pb-1">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActive(i)} className={`relative h-14 w-14 max-[400px]:h-12 max-[400px]:w-12 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-lg ${i === active ? "ring-2 ring-ocean" : "opacity-70"}`}>
                <Image src={img.url} alt={img.altText} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
