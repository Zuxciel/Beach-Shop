"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { shopTheLookHotspots, getProductByHandle } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function ShopTheLook() {
  const [active, setActive] = useState<string | null>(null);
  const { addBundleToCart } = useCart();
  const bundleHandles = shopTheLookHotspots.map((h) => h.productHandle);

  const activeProduct = active ? getProductByHandle(active) : null;

  return (
    <section className="bg-sand-50 py-14 md:py-20">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          {/* Image with hotspots */}
          <div className="relative overflow-hidden rounded-2xl bg-white aspect-[4/5] md:aspect-[4/3] lg:aspect-[4/3]">
            <Image
              src="https://picsum.photos/seed/shop-the-look/1200/900"
              alt="Coastal lifestyle photo featuring straw tote, suede sandals and riviera hat styled together on a beach"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              loading="lazy"
            />
            {shopTheLookHotspots.map((hs) => (
              <button
                key={hs.id}
                onClick={() => setActive((prev) => (prev === hs.productHandle ? null : hs.productHandle))}
                className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-white/30 transition hover:scale-110"
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                aria-label={`View ${hs.label}`}
              >
                <span className="h-2 w-2 rounded-full bg-ocean animate-pulse" />
                <span className="absolute h-8 w-8 rounded-full border border-ocean/30 animate-ping" />
              </button>
            ))}

            {/* Mini product card */}
            {activeProduct && (
              <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:w-[320px] rounded-2xl bg-white p-4 shadow-xl">
                <div className="flex gap-3">
                  <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-sand-100">
                    <Image src={activeProduct.featuredImage.url} alt={activeProduct.featuredImage.altText} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium line-clamp-1">{activeProduct.title}</p>
                    <p className="text-xs text-stone-500">{activeProduct.material}</p>
                    <p className="mt-1 text-sm font-semibold">{formatPrice(activeProduct.priceRange.minVariantPrice.amount)}</p>
                    <Link href={`/products/${activeProduct.handle}`} className="mt-1 inline-block text-xs font-medium text-ocean underline underline-offset-2">View product →</Link>
                  </div>
                  <button onClick={() => setActive(null)} className="h-7 w-7 flex-shrink-0 rounded-full bg-sand-100 flex items-center justify-center hover:bg-sand-200">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Copy + bundle */}
          <div className="lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">Shop The Look</p>
            <h2 className="mt-2 font-display text-3xl leading-tight md:text-4xl">
              The Sun-Bleached <br />
              <span className="italic text-terracotta-dark">Bundle</span>
            </h2>
            <p className="mt-4 text-sm leading-6 text-stone-600">
              Our stylist’s coastal uniform — the Sahara Tote, Terracotta Sandals & Riviera Hat. Tap the dots to explore each piece.
            </p>

            <ul className="mt-6 space-y-3">
              {shopTheLookHotspots.map((hs) => {
                const p = getProductByHandle(hs.productHandle);
                if (!p) return null;
                return (
                  <li key={hs.id} className="flex items-center justify-between rounded-xl border border-sand-200 bg-white px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-sand-50">
                        <Image src={p.featuredImage.url} alt={p.featuredImage.altText} fill className="object-cover" sizes="48px" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{p.title}</p>
                        <p className="text-xs text-stone-500">{formatPrice(p.priceRange.minVariantPrice.amount)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActive(p.handle)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${active === p.handle ? "bg-ocean text-white border-ocean" : "border-sand-200 hover:border-ocean hover:text-ocean"}`}
                    >
                      {active === p.handle ? "Selected" : "View"}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 rounded-xl bg-white border border-sand-200 p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Bundle Price</p>
                <p className="text-xs text-stone-500 line-through">$229</p>
              </div>
              <p className="text-xl font-display font-medium">$199 <span className="text-xs font-sans text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full ml-2">Save $30</span></p>
            </div>

            <Button className="mt-4 w-full" size="lg" onClick={() => addBundleToCart(bundleHandles)}>
              Add Bundle to Cart — $199
            </Button>
            <p className="mt-2 text-center text-xs text-stone-500">Bundle discount auto-applied. Free returns within 30 days.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
