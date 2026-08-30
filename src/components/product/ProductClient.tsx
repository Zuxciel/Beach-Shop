"use client";

import type { Product } from "@/lib/types";
import { Gallery } from "./Gallery";
import { CrossSell } from "./CrossSell";
import { siteConfig } from "@/lib/site-config";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import { ContactForm } from "@/components/forms/ContactForm";

export function ProductClient({ product }: { product: Product }) {
  const waText = encodeURIComponent(`Halo Easthtic of Indonesia, saya ingin tanya tentang ${product.title} (${product.handle})`);
  const waUrl = `https://wa.me/${siteConfig.brand.whatsapp}?text=${waText}`;

  const price = product.priceRange.minVariantPrice.amount;
  const compareAt = product.compareAtPriceRange?.minVariantPrice.amount ?? null;
  const currency = product.priceRange.minVariantPrice.currencyCode as string;
  const discount = getDiscountPercent(price, compareAt);
  const hasDiscount = discount !== null;
  const hemat = hasDiscount && compareAt ? parseFloat(compareAt) - parseFloat(price) : 0;

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-stone-500">
        <ol className="flex gap-1.5">
          <li><a href="/" className="hover:text-ocean">Home</a></li>
          <li>/</li>
          <li><a href={`/collections/${product.category === "bags" ? "beach-bags" : product.category}`} className="hover:text-ocean capitalize">{product.category === "bags" ? "Tas" : product.category === "hats" ? "Topi" : "Sandal"}</a></li>
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
          <p className="mt-2 text-sm text-stone-600">{product.material} • Ilustrasi katalog — detail dapat bervariasi</p>

          {/* Harga referensi — bukan penawaran mengikat */}
          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-2xl font-semibold text-charcoal">{formatPrice(price, currency)}</span>
            {compareAt && <span className="text-sm text-stone-400 line-through">{formatPrice(compareAt, currency)}</span>}
            {hasDiscount ? (
              <span className="rounded-full bg-clay px-2.5 py-1 text-xs font-bold text-white">-{discount}%</span>
            ) : (
              <span className="rounded-full bg-sand-100 px-2.5 py-1 text-xs font-medium text-stone-600">Koleksi Pilihan</span>
            )}
          </div>
          <p className="mt-1 text-[11px] text-stone-500">Harga & diskon referensi katalog, dapat berubah. Konfirmasi via WhatsApp sebelum transaksi.</p>
          {hasDiscount && (
            <p className="mt-1 text-xs font-medium text-clay">Referensi hemat {formatPrice(hemat.toString(), currency)} dari harga awal ilustratif</p>
          )}

          <div className="prose prose-sm mt-4 text-stone-600 max-w-none" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          <p className="mt-3 text-xs text-stone-500">Kategori: {product.productType} • Bahan: {product.material} • Identitas Katalog</p>

          {/* Identitas — bukan jual beli, disclaimer */}
          <div className="mt-6 rounded-2xl border border-sand-200 bg-sand-50 p-5">
            <p className="text-sm font-medium">Katalog identitas — bukan toko online</p>
            <p className="mt-1 text-sm text-stone-600">Foto & deskripsi bersifat ilustratif untuk pengenalan koleksi. Ketersediaan, warna, ukuran, dan harga aktual dapat bervariasi. Hubungi WhatsApp untuk konfirmasi terbaru sebelum pemesanan.</p>
            <div className="mt-4 flex gap-3">
              <a href={waUrl} target="_blank" rel="noopener" className="inline-flex flex-1 items-center justify-center rounded-full bg-ocean px-6 py-3 text-sm font-medium text-white hover:bg-[#0f2e2c]">Chat WhatsApp</a>
              <a href="/contact" className="inline-flex items-center justify-center rounded-full border border-sand-200 bg-white px-6 py-3 text-sm font-medium hover:border-ocean">Kontak</a>
            </div>
            <p className="mt-2 text-xs text-stone-500 text-center">Ilustrasi katalog • {siteConfig.brand.phone} • {siteConfig.brand.email}</p>
          </div>

          {/* Info Diskon — menarik, tidak bikin malas */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className={`rounded-2xl border p-4 text-center ${hasDiscount ? "bg-clay/10 border-clay/20" : "bg-sand-100 border-sand-200"}`}>
              <p className="text-lg">{hasDiscount ? "🏷️" : "✨"}</p>
              <p className="mt-1 text-xs font-semibold leading-tight">{hasDiscount ? "Ada Diskon" : "Koleksi Pilihan"}</p>
              <p className="text-[11px] text-stone-500">{hasDiscount ? "Referensi katalog" : "Paling dilihat"}</p>
            </div>
            <div className={`rounded-2xl border p-4 text-center ${hasDiscount ? "bg-ocean/10 border-ocean/20" : "bg-sand-50 border-sand-200"}`}>
              <p className="text-lg font-bold">{hasDiscount ? `-${discount}%` : "—"}</p>
              <p className="mt-1 text-xs font-semibold leading-tight">{hasDiscount ? "Estimasi Diskon" : "Harga Spesial"}</p>
              <p className="text-[11px] text-stone-500">{hasDiscount ? `referensi dari ${formatPrice(compareAt!, currency)}` : "Tanya WA"}</p>
            </div>
            <div className="rounded-2xl border border-sand-200 bg-white p-4 text-center">
              <p className="text-xs font-semibold">{hasDiscount ? "Estimasi Hemat" : "Harga Katalog"}</p>
              <p className={`mt-1 text-sm font-bold leading-tight ${hasDiscount ? "text-clay" : "text-charcoal"}`}>{hasDiscount ? formatPrice(hemat.toString(), currency) : formatPrice(price, currency)}</p>
              <p className="text-[11px] text-stone-500">{hasDiscount ? "referensi ilustratif" : "Referensi"}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <details className="rounded-xl border border-sand-200 bg-white p-4 open:bg-sand-50" open>
              <summary className="cursor-pointer font-medium list-none flex justify-between">Detail Koleksi <span>+</span></summary>
              <div className="mt-3 text-xs leading-6 text-stone-600 space-y-1">
                <p>• Material terinspirasi: {product.material} — ilustrasi katalog, aktual dapat bervariasi.</p>
                <p>• Pengerjaan: referensi bertema pantai — variasi tiap produk mungkin berbeda.</p>
                <p>• Perawatan umum: simpan di tempat kering, lap kain lembut (ilustrasi).</p>
                <p>• Harga referensi: {formatPrice(price, currency)} {hasDiscount && `• Estimasi diskon ${discount}% (hemat referensi ${formatPrice(hemat.toString(), currency)})`} — dapat berubah.</p>
                <p className="text-[11px] text-stone-500">*Semua detail ilustratif, konfirmasi via WhatsApp.</p>
              </div>
            </details>
            <details className="rounded-xl border border-sand-200 bg-white p-4">
              <summary className="cursor-pointer font-medium list-none flex justify-between">Cara Tanya Stok <span>+</span></summary>
              <p className="mt-2 text-stone-600 text-xs leading-6">Hubungi WhatsApp {siteConfig.brand.phone} dengan menyebut nama produk <b>{product.title}</b> untuk cek ketersediaan & detail terbaru. Situs ini hanya katalog identitas, bukan jaminan stok atau harga mengikat.</p>
            </details>
            <details className="rounded-xl border border-sand-200 bg-white p-4">
              <summary className="cursor-pointer font-medium list-none flex justify-between">Kirim Pesan ke WhatsApp (via API) <span>+</span></summary>
              <div className="mt-3">
                <p className="mb-3 text-xs text-stone-500">Form ini pakai <code className="bg-sand-100 px-1 rounded">/api/contact</code> lalu buka WhatsApp otomatis.</p>
                <ContactForm product={product.title} />
              </div>
            </details>
          </div>
        </div>
      </div>

      <CrossSell currentHandle={product.handle} />

      {/* Mobile CTA */}
      <div className="fixed inset-x-0 bottom-[64px] z-20 flex gap-2 border-t border-sand-200 bg-white p-3 md:hidden">
        <a href={waUrl} target="_blank" rel="noopener" className="flex-1 inline-flex items-center justify-center rounded-full bg-ocean px-6 py-3 text-sm font-medium text-white">Chat WhatsApp</a>
        <a href="/contact" className="inline-flex items-center justify-center rounded-full border border-sand-200 px-6 py-3 text-sm font-medium">Kontak</a>
      </div>
      <div className="h-[80px] md:hidden" />
    </div>
  );
}
