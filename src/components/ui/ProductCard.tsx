import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice, getDiscountPercent } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const price = product.priceRange.minVariantPrice.amount;
  const compareAt = product.compareAtPriceRange?.minVariantPrice.amount ?? null;
  const discount = getDiscountPercent(price, compareAt);
  const currency = product.priceRange.minVariantPrice.currencyCode as string;

  return (
    <div className="group flex flex-col">
      {/* Image Wrap */}
      <Link
        href={`/products/${product.handle}`}
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-lg bg-sand-100 border border-sand-200/70"
      >
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge */}
        {discount ? (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-clay px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
            -{discount}%
          </span>
        ) : (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-charcoal backdrop-blur-xs shadow-xs">
            Pilihan
          </span>
        )}

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hidden sm:block">
          <span className="inline-flex h-9 w-full items-center justify-center rounded-full bg-white/95 text-xs font-medium text-charcoal shadow-sm backdrop-blur-xs hover:bg-white transition-colors">
            Lihat Detail Koleksi
          </span>
        </div>
      </Link>

      {/* Content Meta */}
      <div className="pt-3 flex flex-col flex-1">
        <p className="text-[10px] uppercase tracking-[0.18em] text-stone-400 font-medium truncate">
          {product.material ?? product.productType}
        </p>

        <Link
          href={`/products/${product.handle}`}
          className="mt-1 line-clamp-1 font-display text-base sm:text-lg text-charcoal hover:text-ocean transition-colors"
        >
          {product.title}
        </Link>

        {/* Pricing */}
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-xs sm:text-sm font-semibold text-charcoal">
            {formatPrice(price, currency)}
          </span>
          {compareAt && (
            <span className="text-[11px] text-stone-400 line-through">
              {formatPrice(compareAt, currency)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
