"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent("open-aesthetic-chat"));
  };

  return (
    <footer className="mt-16 border-t border-sand-200 bg-sand-50">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-xl tracking-[0.2em]">{siteConfig.brand.shortName}</p>
            <p className="text-sm tracking-[0.3em] text-stone-500">OF INDONESIA</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-stone-600">
              Koleksi kerajinan anyaman tas, topi, dan sandal bertema pantai yang terinspirasi dari keindahan alam Bali.
            </p>
            <div className="mt-4 text-sm text-stone-600 space-y-1">
              <p>{siteConfig.brand.address}</p>
              <p>{siteConfig.brand.email}</p>
              <p>IG: @{siteConfig.brand.instagram}</p>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                onClick={openChat}
                className="inline-flex items-center gap-1.5 rounded-full bg-ocean px-5 py-2 text-sm font-medium text-white hover:bg-[#0f2e2c] transition shadow-sm"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                AI Chatbot
              </button>
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-sand-200 bg-white px-5 py-2 text-sm font-medium hover:border-ocean transition"
              >
                Kontak
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-charcoal">Koleksi</h4>
            <ul className="mt-4 space-y-3 text-sm text-stone-600">
              <li>
                <Link href="/collections/shop-all" className="hover:text-ocean transition">
                  Semua Koleksi
                </Link>
              </li>
              <li>
                <Link href="/collections/beach-bags" className="hover:text-ocean transition">
                  Tas Pantai
                </Link>
              </li>
              <li>
                <Link href="/collections/sun-hats" className="hover:text-ocean transition">
                  Topi Pantai
                </Link>
              </li>
              <li>
                <Link href="/collections/footwear" className="hover:text-ocean transition">
                  Sandal Pantai
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-charcoal">Navigasi</h4>
            <ul className="mt-4 space-y-3 text-sm text-stone-600">
              <li>
                <Link href="/pages/lookbook" className="hover:text-ocean transition">
                  Lookbook Cerita
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ocean transition">
                  Kontak & Lokasi
                </Link>
              </li>
              <li>
                <button onClick={openChat} className="hover:text-ocean transition text-left">
                  Konsultasi AI Chatbot
                </button>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${siteConfig.brand.instagram}`}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-ocean transition"
                >
                  Instagram @{siteConfig.brand.instagram}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-charcoal">Kabar Koleksi</h4>
            <p className="mt-4 text-sm text-stone-600">
              Dapatkan kabar koleksi terbaru & cerita katalog langsung ke email Anda.
            </p>
            <div className="mt-4">
              <NewsletterForm placeholder={siteConfig.newsletter.placeholder} />
            </div>
            <p className="mt-3 text-xs text-stone-500">Layanan konsultasi AI aktif 24 jam.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-sand-200 pt-6 text-xs text-stone-500 md:flex-row">
          <p>© 2026 {siteConfig.brand.name}. Seluruh hak cipta dilindungi.</p>
          <div className="flex gap-4">
            <span>Katalog Kerajinan Pantai Bali</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
