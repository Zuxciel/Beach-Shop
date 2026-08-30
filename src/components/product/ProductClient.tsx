"use client";

import type { Product } from "@/lib/types";
import { Gallery } from "./Gallery";
import { CrossSell } from "./CrossSell";
import { siteConfig } from "@/lib/site-config";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import { ContactForm } from "@/components/forms/ContactForm";
import Link from "next/link";

export function ProductClient({ product }: { product: Product }) {
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
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-stone-500">
        <ol className="flex gap-1.5">
          <li>
            <Link href="/" className="hover:text-ocean">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={`/collections/${product.category === "bags" ? "beach-bags" : product.category === "hats" ? "sun-hats" : "footwear"}`}
              className="hover:text-ocean capitalize"
            >
              {product.category === "bags" ? "Tas Pantai" : product.category === "hats" ? "Topi Pantai" : "Sandal Pantai"}
            </Link>
          </li>
          <li>/</li>
          <li className="text-charcoal font-medium">{product.title}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <Gallery images={product.images} title={product.title} />

        {/* Details - sticky on desktop */}
        <div className="lg:sticky lg:top-[80px] lg:h-fit lg:pl-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
            {siteConfig.brand.name} • {product.productType}
          </p>
          <h1 className="mt-2 font-display text-3xl leading-tight md:text-[36px] text-charcoal">
            {product.title}
          </h1>
          <p className="mt-2 text-sm text-stone-600">{product.material}</p>

          {/* Harga Referensi */}
          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-2xl font-semibold text-charcoal">{formatPrice(price, currency)}</span>
            {compareAt && (
              <span className="text-sm text-stone-400 line-through">
                {formatPrice(compareAt, currency)}
              </span>
            )}
            {hasDiscount ? (
              <span className="rounded-full bg-clay px-2.5 py-1 text-xs font-bold text-white">
                -{discount}%
              </span>
            ) : (
              <span className="rounded-full bg-sand-100 px-2.5 py-1 text-xs font-medium text-stone-600">
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
            className="prose prose-sm mt-4 text-stone-600 max-w-none"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          {/* Chatbot Action Card */}
          <div className="mt-6 rounded-2xl border border-sand-200 bg-sand-50 p-5 shadow-sm">
            <div className="flex items-center gap-2 text-ocean font-medium text-sm">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              Konsultasi Langsung dengan Asisten AI
            </div>
            <p className="mt-1 text-xs leading-5 text-stone-600">
              Ingin tahu lebih banyak tentang ukuran, ketersediaan, atau tips padu-padan untuk <b>{product.title}</b>? Tanyakan langsung ke asisten cerdas kami.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={openChatForProduct}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-6 py-3 text-sm font-medium text-white hover:bg-[#0f2e2c] transition shadow"
              >
                <span>💬</span> Tanya Asisten AI
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-sand-200 bg-white px-6 py-3 text-sm font-medium hover:border-ocean transition"
              >
                Info Toko
              </Link>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <details className="rounded-xl border border-sand-200 bg-white p-4 open:bg-sand-50" open>
              <summary className="cursor-pointer font-medium list-none flex justify-between text-charcoal">
                Spesifikasi & Material <span>+</span>
              </summary>
              <div className="mt-3 text-xs leading-6 text-stone-600 space-y-1">
                <p>• <b>Material Utama</b>: {product.material}</p>
                <p>• <b>Kategori</b>: {product.productType}</p>
                <p>• <b>Inspirasi Desain</b>: Kerajinan pesisir khas Bali</p>
                <p>• <b>Perawatan</b>: Bersihkan dengan kain lap lembut, simpan di tempat kering.</p>
              </div>
            </details>

            <details className="rounded-xl border border-sand-200 bg-white p-4">
              <summary className="cursor-pointer font-medium list-none flex justify-between text-charcoal">
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

      {/* Mobile Sticky CTA */}
      <div className="fixed inset-x-0 bottom-[64px] z-20 flex gap-2 border-t border-sand-200 bg-white/95 backdrop-blur p-3 md:hidden shadow-lg">
        <button
          onClick={openChatForProduct}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-6 py-3 text-sm font-medium text-white shadow"
        >
          <span>💬</span> Tanya Asisten AI
        </button>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-sand-200 bg-sand-50 px-5 py-3 text-sm font-medium"
        >
          Kontak
        </Link>
      </div>
      <div className="h-[80px] md:hidden" />
    </div>
  );
}
