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
        {/* Badge — menarik */}
        {discount ? (
          <span className="absolute left-3 top-3 rounded-full bg-clay px-2.5 py-1 text-xs font-bold text-white shadow">-{discount}%</span>
        ) : (
          <span className="absolute left-3 top-3 rounded-full bg-sand-100 px-2.5 py-1 text-xs font-semibold text-charcoal shadow-sm">Koleksi Pilihan</span>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/40 to-transparent p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex h-9 w-full items-center justify-center rounded-full bg-white text-sm font-medium text-charcoal">Lihat Detail</span>
        </div>
      </Link>
      <div className="pt-3">
        <Link href={`/products/${product.handle}`} className="line-clamp-1 font-medium text-charcoal hover:text-ocean transition-colors">
          {product.title}
        </Link>
        <p className="text-xs text-stone-500">Ilustrasi • {product.material ?? product.productType}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-charcoal">{formatPrice(price, currency)}</span>
          {compareAt && (
            <span className="text-xs text-stone-400 line-through">{formatPrice(compareAt, currency)}</span>
          )}
        </div>
        {discount ? (
          <p className="mt-0.5 text-xs font-medium text-clay">Referensi diskon {discount}% • Estimasi hemat {formatPrice((parseFloat(compareAt!) - parseFloat(price)).toString(), currency)}</p>
        ) : (
          <p className="mt-0.5 text-[11px] text-stone-400">Harga referensi — konfirmasi via WA</p>
        )}
      </div>
    </div>
  );
}
