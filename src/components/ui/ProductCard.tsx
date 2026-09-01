"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist-context";

export function ProductCard({ product }: { product: Product }) {
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.handle);

  const price = product.priceRange.minVariantPrice.amount;
  const compareAt = product.compareAtPriceRange?.minVariantPrice.amount ?? null;
  const discount = getDiscountPercent(price, compareAt);
  const currency = product.priceRange.minVariantPrice.currencyCode as string;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.handle);
  };

  return (
    <div className="group flex flex-col min-w-0">
      <div className="relative block overflow-hidden rounded-xl sm:rounded-2xl bg-sand-50 aspect-[4/5] card-elevated">
        <Link href={`/products/${product.handle}`} className="block h-full w-full">
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText}
            width={product.featuredImage.width}
            height={product.featuredImage.height}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
            loading="lazy"
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>

        {/* Discount / Category Badge */}
        {discount ? (
          <span className="absolute left-2 top-2 sm:left-3 sm:top-3 rounded-full bg-clay px-2 py-0.5 text-[9px] sm:text-xs font-bold text-white shadow-sm pointer-events-none">
            -{discount}%
          </span>
        ) : (
          <span className="absolute left-2 top-2 sm:left-3 sm:top-3 rounded-full bg-sand-100/95 backdrop-blur-sm px-2 py-0.5 text-[9px] sm:text-xs font-semibold text-charcoal shadow-sm pointer-events-none">
            Koleksi
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={wishlisted ? `Hapus ${product.title} dari wishlist` : `Simpan ${product.title} ke wishlist`}
          className={`absolute right-2 top-2 sm:right-3 sm:top-3 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer ${
            wishlisted
              ? "bg-clay text-white shadow-md scale-105"
              : "bg-white/85 text-stone-600 hover:bg-white hover:text-clay hover:scale-105 shadow-sm"
          }`}
          title={wishlisted ? "Tersimpan di Wishlist" : "Tambah ke Wishlist"}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill={wishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        {/* Hover overlay CTA */}
        <Link
          href={`/products/${product.handle}`}
          className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/50 via-black/20 to-transparent p-2.5 sm:p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hidden sm:block"
        >
          <span className="inline-flex h-8 sm:h-9 w-full items-center justify-center rounded-full bg-white text-xs sm:text-sm font-medium text-charcoal shadow-sm hover:bg-sand-50 transition">
            Lihat Detail
          </span>
        </Link>
      </div>

      <div className="pt-2 sm:pt-3 flex flex-col flex-1 min-w-0">
        <Link
          href={`/products/${product.handle}`}
          className="line-clamp-1 text-xs sm:text-sm font-medium text-charcoal hover:text-ocean transition-colors"
          title={product.title}
        >
          {product.title}
        </Link>
        <p className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5 truncate">
          {product.material ?? product.productType}
        </p>
        <div className="mt-1 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
          <span className="text-xs sm:text-sm font-semibold text-charcoal">
            {formatPrice(price, currency)}
          </span>
          {compareAt && (
            <span className="text-[10px] sm:text-[11px] text-stone-400 line-through">
              {formatPrice(compareAt, currency)}
            </span>
          )}
        </div>
        {discount ? (
          <p className="mt-0.5 text-[9px] sm:text-[11px] font-medium text-clay truncate">
            Hemat {formatPrice((parseFloat(compareAt!) - parseFloat(price)).toString(), currency)}
          </p>
        ) : (
          <p className="mt-0.5 text-[9px] sm:text-[10px] text-stone-400 truncate">Katalog referensi</p>
        )}
      </div>
    </div>
  );
}
