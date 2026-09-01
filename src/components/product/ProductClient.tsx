"use client";

import type { Product } from "@/lib/types";
import { Gallery } from "./Gallery";
import { CrossSell } from "./CrossSell";
import { siteConfig } from "@/lib/site-config";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import { ContactForm } from "@/components/forms/ContactForm";
import { useWishlist } from "@/lib/wishlist-context";
import Link from "next/link";

export function ProductClient({ product }: { product: Product }) {
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.handle);

  const price = product.priceRange.minVariantPrice.amount;
  const compareAt = product.compareAtPriceRange?.minVariantPrice.amount ?? null;
  const currency = product.priceRange.minVariantPrice.currencyCode as string;
  const discount = getDiscountPercent(price, compareAt);
  const hasDiscount = discount !== null;
  const hemat = hasDiscount && compareAt ? parseFloat(compareAt) - parseFloat(price) : 0;

  const openChatForProduct = () => {
    window.dispatchEvent(
      new CustomEvent("open-aesthetic-chat", {
        detail: {
          message: `Halo! Saya tertarik dengan produk ${product.title}. Bisakah jelaskan detail bahan dan kecocokannya?`,
        },
      })
    );
  };

  return (
    <div className="mx-auto max-w-[1400px] px-3.5 max-[360px]:px-2.5 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 overflow-hidden">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 text-xs text-stone-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-ocean transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={`/collections/${product.category === "bags" ? "beach-bags" : product.category === "hats" ? "sun-hats" : "footwear"}`}
              className="hover:text-ocean capitalize transition-colors"
            >
              {product.category === "bags" ? "Tas Pantai" : product.category === "hats" ? "Topi Pantai" : "Sandal Pantai"}
            </Link>
          </li>
          <li>/</li>
          <li className="text-charcoal font-medium truncate max-w-[160px] sm:max-w-none">{product.title}</li>
        </ol>
      </nav>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
        <Gallery images={product.images} title={product.title} />

        {/* Details */}
        <div className="lg:sticky lg:top-[84px] lg:h-fit min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
              {siteConfig.brand.name} • {product.productType}
            </p>
            {/* Wishlist quick toggle */}
            <button
              onClick={() => toggle(product.handle)}
              aria-label={wishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-all cursor-pointer ${
                wishlisted
                  ? "bg-clay/10 border-clay text-clay"
                  : "bg-white border-sand-200 text-stone-600 hover:border-clay hover:text-clay"
              }`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={wishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span>{wishlisted ? "Tersimpan" : "Simpan Wishlist"}</span>
            </button>
          </div>

          <h1 className="mt-1.5 font-display text-2xl sm:text-3xl lg:text-[34px] leading-tight text-charcoal break-words">
            {product.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500 break-words">{product.material}</p>

          {/* Harga Referensi */}
          <div className="mt-3 flex flex-wrap items-baseline gap-2.5">
            <span className="text-xl sm:text-2xl font-semibold text-charcoal">{formatPrice(price, currency)}</span>
            {compareAt && (
              <span className="text-xs sm:text-sm text-stone-400 line-through">
                {formatPrice(compareAt, currency)}
              </span>
            )}
            {hasDiscount ? (
              <span className="rounded-full bg-clay px-2 py-0.5 text-[11px] font-bold text-white shadow-2xs">
                -{discount}%
              </span>
            ) : (
              <span className="rounded-full bg-sand-100 px-2.5 py-0.5 text-[11px] font-medium text-stone-600">
                Koleksi Pilihan
              </span>
            )}
          </div>
          {hasDiscount && (
            <p className="mt-1 text-xs font-medium text-clay">
              Estimasi hemat {formatPrice(hemat.toString(), currency)}
            </p>
          )}

          <div
            className="prose prose-sm mt-3 text-stone-600 max-w-none text-xs sm:text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          {/* Chatbot Action Card */}
          <div className="mt-5 rounded-2xl border border-sand-200 bg-sand-50 p-4 sm:p-5 card-elevated">
            <div className="flex items-center gap-2 text-ocean font-medium text-xs sm:text-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              Konsultasi Langsung dengan Asisten AI
            </div>
            <p className="mt-1.5 text-xs leading-5 text-stone-600">
              Ingin tahu lebih banyak tentang ukuran, ketersediaan, atau tips padu-padan untuk <b>{product.title}</b>? Tanyakan langsung ke asisten AI kami.
            </p>
            <div className="mt-3.5 flex flex-col sm:flex-row gap-2">
              <button
                onClick={openChatForProduct}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full btn-premium px-5 py-2.5 text-xs sm:text-sm font-medium text-white shadow-sm cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>Tanya Asisten AI</span>
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-sand-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-medium hover:border-ocean transition text-stone-700 text-center"
              >
                Info Toko
              </Link>
            </div>
          </div>

          <div className="mt-5 space-y-2.5 text-sm">
            <details className="rounded-xl border border-sand-200 bg-white p-3.5 open:bg-sand-50 transition-colors" open>
              <summary className="cursor-pointer font-medium list-none flex justify-between text-xs sm:text-sm text-charcoal">
                Spesifikasi & Material <span>+</span>
              </summary>
              <div className="mt-2.5 text-xs leading-5 text-stone-600 space-y-1">
                <p>• <b>Material Utama</b>: {product.material}</p>
                <p>• <b>Kategori</b>: {product.productType}</p>
                <p>• <b>Inspirasi Desain</b>: Kerajinan pesisir khas Bali</p>
                <p>• <b>Perawatan</b>: Bersihkan dengan lap lembut, simpan di tempat kering.</p>
              </div>
            </details>

            <details className="rounded-xl border border-sand-200 bg-white p-3.5">
              <summary className="cursor-pointer font-medium list-none flex justify-between text-xs sm:text-sm text-charcoal">
                Kirim Pesan via Formulir <span>+</span>
              </summary>
              <div className="mt-3">
                <ContactForm product={product.title} />
              </div>
            </details>
          </div>
        </div>
      </div>

      <CrossSell currentHandle={product.handle} />

      {/* Mobile Sticky CTA — sits above BottomNav */}
      <div className="fixed inset-x-0 bottom-16 max-[360px]:bottom-14 z-20 flex gap-2 border-t border-sand-200/80 bg-white/95 backdrop-blur-md p-2.5 md:hidden shadow-[0_-2px_10px_rgba(44,36,27,0.08)]">
        <button
          onClick={openChatForProduct}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full btn-premium py-2.5 text-xs font-medium text-white shadow cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Tanya Asisten AI</span>
        </button>
        <button
          onClick={() => toggle(product.handle)}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all ${
            wishlisted
              ? "bg-clay text-white border-clay shadow-sm"
              : "bg-sand-50 border-sand-200 text-stone-700 hover:border-clay hover:text-clay"
          }`}
          aria-label="Wishlist"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={wishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-sand-200 bg-sand-50 px-3.5 py-2 text-xs font-medium text-stone-700"
        >
          Kontak
        </Link>
      </div>
      <div className="h-28 md:hidden" aria-hidden />
    </div>
  );
}
