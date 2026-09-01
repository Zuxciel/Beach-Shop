"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/lib/wishlist-context";
import { products } from "@/lib/data";
import { formatPrice, getDiscountPercent } from "@/lib/utils";

export function WishlistClient() {
  const { wishlist, remove, clear, count } = useWishlist();
  const items = products.filter((p) => wishlist.includes(p.handle));

  if (count === 0) {
    return (
      <div className="mx-auto max-w-[900px] px-4 md:px-6 py-12 md:py-16 text-center">
        <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-sand-100 text-2xl">♡</div>
        <h1 className="mt-4 font-display text-2xl sm:text-3xl text-charcoal">Wishlist Kosong</h1>
        <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          Simpan koleksi favorit dengan klik ikon hati di kartu produk. Wishlist tersimpan lokal di browser Anda — tidak hilang saat refresh.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:gap-3">
          <Link href="/collections/shop-all" className="rounded-full btn-premium px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white shadow-sm">
            Lihat Koleksi
          </Link>
          <Link href="/pages/lookbook" className="rounded-full border border-sand-200 bg-white px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:border-ocean transition">
            Lookbook
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1100px] px-3.5 max-[360px]:px-2.5 sm:px-6 py-6 sm:py-8 md:py-12 pb-24 sm:pb-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-charcoal">Wishlist</h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-600">{count} koleksi tersimpan lokal.</p>
        </div>
        <button
          onClick={clear}
          className="rounded-full border border-sand-200 bg-white px-4 py-1.5 text-xs font-medium hover:border-clay hover:text-clay transition cursor-pointer"
        >
          Kosongkan
        </button>
      </div>

      <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => {
          const price = p.priceRange.minVariantPrice.amount;
          const compareAt = p.compareAtPriceRange?.minVariantPrice.amount ?? null;
          const discount = getDiscountPercent(price, compareAt);
          return (
            <div key={p.id} className="group relative flex gap-3 sm:gap-4 rounded-2xl border border-sand-200 bg-white p-3 sm:p-4 card-elevated">
              <Link href={`/products/${p.handle}`} className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-sand-100">
                <Image src={p.featuredImage.url} alt={p.featuredImage.altText} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="112px" />
                {discount && <span className="absolute left-1.5 top-1.5 rounded-full bg-clay px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-white">-{discount}%</span>}
              </Link>
              <div className="flex flex-1 flex-col min-w-0">
                <Link href={`/products/${p.handle}`} className="font-medium text-xs sm:text-sm text-charcoal hover:text-ocean line-clamp-1 transition-colors">{p.title}</Link>
                <p className="text-[11px] sm:text-xs text-stone-500 truncate mt-0.5">{p.material}</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-1.5">
                  <span className="text-xs sm:text-sm font-semibold text-charcoal">{formatPrice(price, p.priceRange.minVariantPrice.currencyCode)}</span>
                  {compareAt && <span className="text-[10px] sm:text-xs text-stone-400 line-through">{formatPrice(compareAt, p.priceRange.minVariantPrice.currencyCode)}</span>}
                </div>
                <div className="mt-auto flex gap-2 pt-2.5">
                  <Link href={`/products/${p.handle}`} className="flex-1 rounded-full btn-premium px-3 py-1.5 text-center text-xs font-medium text-white shadow-2xs">Detail</Link>
                  <button onClick={() => remove(p.handle)} className="rounded-full border border-sand-200 bg-white px-3 py-1.5 text-xs font-medium hover:border-clay hover:text-clay transition cursor-pointer">Hapus</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-[11px] sm:text-xs text-stone-400">Wishlist tersimpan otomatis di peramban Anda.</p>
    </div>
  );
}
