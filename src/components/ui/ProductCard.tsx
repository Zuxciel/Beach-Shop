import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.includes(product.handle);
  const price = product.priceRange.minVariantPrice.amount;
  const compareAt = product.compareAtPriceRange?.minVariantPrice.amount;

  return (
    <div className="group relative flex flex-col">
      <Link href={`/products/${product.handle}`} className="relative block overflow-hidden rounded-xl bg-sand-50 aspect-[4/5]">
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
          width={product.featuredImage.width}
          height={product.featuredImage.height}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {compareAt && <span className="absolute left-3 top-3 rounded-full bg-clay px-2.5 py-1 text-xs font-semibold text-white">Sale</span>}
        <button
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.handle);
          }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm transition hover:bg-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className={isWishlisted ? "text-clay" : "text-charcoal"}>
            <path d="M12 21s-6.5-4.2-8.5-8.2A4.5 4.5 0 0 1 12 5a4.5 4.5 0 0 1 8.5 7.8C18.5 16.8 12 21 12 21Z" />
          </svg>
        </button>
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/40 to-transparent p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex h-9 w-full items-center justify-center rounded-full bg-white text-sm font-medium text-charcoal">Quick view</span>
        </div>
      </Link>
      <div className="pt-3">
        <Link href={`/products/${product.handle}`} className="line-clamp-1 font-medium text-charcoal hover:text-ocean transition-colors">
          {product.title}
        </Link>
        <p className="text-sm text-stone-500">{product.material ?? product.productType}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-semibold text-charcoal">{formatPrice(price)}</span>
          {compareAt && <span className="text-sm text-stone-400 line-through">{formatPrice(compareAt)}</span>}
        </div>
      </div>
    </div>
  );
}
