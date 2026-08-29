"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/lib/types";
import { Gallery } from "./Gallery";
import { VariantSelector } from "./VariantSelector";
import { CrossSell } from "./CrossSell";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";

export function ProductClient({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const initial: Record<string, string> = {};
  product.options.forEach((o) => (initial[o.name] = o.values[0]));
  const [selected, setSelected] = useState<Record<string, string>>(initial);
  const [qty, setQty] = useState(1);

  const selectedVariant = useMemo(() => {
    return (
      product.variants.find((v) => v.selectedOptions.every((o) => selected[o.name] === o.value)) ?? product.variants[0]
    );
  }, [product.variants, selected]);

  const isWishlisted = wishlist.includes(product.handle);

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-stone-500">
        <ol className="flex gap-1.5">
          <li><a href="/" className="hover:text-ocean">Home</a></li>
          <li>/</li>
          <li><a href={`/collections/${product.category === "bags" ? "beach-bags" : product.category}`} className="hover:text-ocean capitalize">{product.category}</a></li>
          <li>/</li>
          <li className="text-charcoal font-medium">{product.title}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <Gallery images={product.images} title={product.title} />

        {/* Details - sticky on desktop */}
        <div className="lg:sticky lg:top-[80px] lg:h-fit lg:pl-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">{product.vendor} • {product.productType}</p>
          <h1 className="mt-2 font-display text-3xl leading-tight md:text-[36px]">{product.title}</h1>
          {product.rating && (
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="flex text-amber-500">{"★".repeat(5)}</span>
              <span className="font-medium">{product.rating.value}</span>
              <span className="text-stone-500">({product.rating.count} reviews)</span>
            </div>
          )}

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{formatPrice(selectedVariant.price)}</span>
            {selectedVariant.compareAtPrice && <span className="text-stone-400 line-through">{formatPrice(selectedVariant.compareAtPrice)}</span>}
            {selectedVariant.compareAtPrice && <span className="rounded-full bg-clay px-2 py-0.5 text-xs font-bold text-white">Sale</span>}
          </div>

          <div className="prose prose-sm mt-4 text-stone-600 max-w-none" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

          <div className="mt-6">
            <VariantSelector product={product} selected={selected} onSelect={(n, v) => setSelected((s) => ({ ...s, [n]: v }))} />
          </div>

          {/* Quantity + ATC */}
          <div className="mt-6 flex gap-3">
            <div className="flex items-center gap-2 rounded-full border border-sand-200 bg-white px-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-sand-50">−</button>
              <span className="min-w-6 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-sand-50">+</button>
            </div>
            <Button
              className="flex-1"
              size="lg"
              disabled={!selectedVariant.availableForSale}
              onClick={() => addToCart(product.handle, selectedVariant.id, qty)}
            >
              {selectedVariant.availableForSale ? "Add to Cart" : "Out of Stock"}
            </Button>
            <button
              onClick={() => toggleWishlist(product.handle)}
              aria-label="Wishlist"
              className={`flex h-12 w-12 items-center justify-center rounded-full border ${isWishlisted ? "border-clay bg-clay text-white" : "border-sand-200 bg-white hover:border-ocean"}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"><path d="M12 21s-6.5-4.2-8.5-8.2A4.5 4.5 0 0 1 12 5a4.5 4.5 0 0 1 8.5 7.8C18.5 16.8 12 21 12 21Z" /></svg>
            </button>
          </div>

          {/* Value proposition strip */}
          <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-sand-50 p-4">
            {[
              { icon: "🌿", label: "Eco-friendly\nMaterials" },
              { icon: "✋", label: "Handcrafted\nQuality" },
              { icon: "🪶", label: "Breathable &\nLightweight" },
            ].map((v) => (
              <div key={v.label} className="text-center">
                <span className="text-lg">{v.icon}</span>
                <p className="mt-1 whitespace-pre text-xs font-medium leading-tight">{v.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <details className="rounded-xl border border-sand-200 bg-white p-4 open:bg-sand-50">
              <summary className="cursor-pointer font-medium list-none flex justify-between">Shipping & Returns <span>+</span></summary>
              <p className="mt-2 text-stone-600 text-xs leading-6">Free shipping over $50. Easy 30-day returns. Eco gift wrap available.</p>
            </details>
            <details className="rounded-xl border border-sand-200 bg-white p-4">
              <summary className="cursor-pointer font-medium list-none flex justify-between">Materials & Care <span>+</span></summary>
              <p className="mt-2 text-stone-600 text-xs leading-6">Wipe with dry cloth. Store in dust bag. Avoid prolonged sun when not in use.</p>
            </details>
          </div>
        </div>
      </div>

      <CrossSell currentHandle={product.handle} />

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-[64px] z-20 flex gap-2 border-t border-sand-200 bg-white p-3 md:hidden">
        <div className="flex items-center gap-1 rounded-full border border-sand-200 px-2">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-8 w-8">−</button>
          <span className="text-sm font-medium w-6 text-center">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="h-8 w-8">+</button>
        </div>
        <Button className="flex-1" disabled={!selectedVariant.availableForSale} onClick={() => addToCart(product.handle, selectedVariant.id, qty)}>
          Add to Cart • {formatPrice((parseFloat(selectedVariant.price) * qty).toFixed(2))}
        </Button>
      </div>
      <div className="h-[80px] md:hidden" />
    </div>
  );
}
