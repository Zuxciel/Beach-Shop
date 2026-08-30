"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  const wa = `https://wa.me/${siteConfig.brand.whatsapp}`;
  return (
    <footer className="mt-16 border-t border-sand-200 bg-sand-50">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-xl tracking-[0.2em]">EASTHTIC</p>
            <p className="text-sm tracking-[0.3em] text-stone-500">OF INDONESIA</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-stone-600">
              Katalog identitas bertema pantai — ilustrasi koleksi untuk referensi visual. Foto & deskripsi dapat berbeda dengan ketersediaan aktual. Hubungi WhatsApp untuk konfirmasi.
            </p>
            <div className="mt-4 text-sm text-stone-600">
              <p>{siteConfig.brand.address}</p>
              <p className="mt-1">{siteConfig.brand.email} • {siteConfig.brand.phone}</p>
              <p className="mt-1">IG: @{siteConfig.brand.instagram}</p>
            </div>
            <div className="mt-6 flex gap-2">
              <a href={wa} target="_blank" rel="noopener" className="inline-flex rounded-full bg-ocean px-5 py-2 text-sm font-medium text-white hover:bg-[#0f2e2c]">WhatsApp</a>
              <a href="/contact" className="inline-flex rounded-full border border-sand-200 bg-white px-5 py-2 text-sm font-medium hover:border-ocean">Kontak</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest">Koleksi</h4>
            <ul className="mt-4 space-y-3 text-sm text-stone-600">
              <li><Link href="/collections/shop-all" className="hover:text-ocean">Semua Koleksi</Link></li>
              <li><Link href="/collections/beach-bags" className="hover:text-ocean">Tas Pantai</Link></li>
              <li><Link href="/collections/sun-hats" className="hover:text-ocean">Topi Pantai</Link></li>
              <li><Link href="/collections/footwear" className="hover:text-ocean">Sandal Pantai</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest">Identitas</h4>
            <ul className="mt-4 space-y-3 text-sm text-stone-600">
              <li><Link href="/pages/lookbook" className="hover:text-ocean">Lookbook</Link></li>
              <li><Link href="/contact" className="hover:text-ocean">Kontak & Alamat</Link></li>
              <li><Link href="/contact" className="hover:text-ocean">Cara Pemesanan (via WA)</Link></li>
              <li><a href={`https://instagram.com/${siteConfig.brand.instagram}`} target="_blank" rel="noopener" className="hover:text-ocean">Instagram @{siteConfig.brand.instagram}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest">Kabar</h4>
            <p className="mt-4 text-sm text-stone-600">Kabar koleksi katalog — ilustrasi, bukan penawaran mengikat.</p>
            <div className="mt-4">
              <NewsletterForm placeholder={siteConfig.newsletter.placeholder} />
            </div>
            <p className="mt-3 text-xs text-stone-500">Ilustrasi katalog — konfirmasi via WhatsApp sebelum transaksi.</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-sand-200 pt-6 text-xs text-stone-500 md:flex-row">
          <p>© 2026 {siteConfig.brand.name}. Ilustrasi katalog — bukan jaminan ketersediaan/harga. Foto dapat berbeda.</p>
          <div className="flex gap-4">
            <span>Katalog identitas — hubungi WhatsApp</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
