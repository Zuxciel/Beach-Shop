"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent("open-aesthetic-chat"));
  };

  return (
    <footer className="border-t border-sand-200 bg-sand-50 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-3 max-[400px]:px-3 sm:px-4 py-8 max-[400px]:py-6 sm:py-10 md:px-6 lg:px-8 md:py-12">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <p className="font-display text-xl tracking-[0.2em]">{siteConfig.brand.shortName}</p>
            <p className="text-[10px] tracking-[0.3em] text-stone-500 uppercase">OF INDONESIA</p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-stone-600">
              Koleksi kerajinan anyaman tas, topi, dan sandal bertema pantai yang terinspirasi dari keindahan alam Bali.
            </p>
            <div className="mt-3 text-xs text-stone-500 space-y-0.5">
              <p>{siteConfig.brand.address}</p>
              <p>{siteConfig.brand.email}</p>
              <p>IG: @{siteConfig.brand.instagram}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={openChat}
                className="inline-flex items-center gap-1.5 rounded-full bg-ocean px-4 py-2 text-xs font-medium text-white hover:bg-[#0f2e2c] transition shadow-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                AI Chatbot
              </button>
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-sand-200 bg-white px-4 py-2 text-xs font-medium hover:border-ocean transition"
              >
                Kontak
              </Link>
            </div>
          </div>

          {/* Koleksi column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal">Koleksi</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-stone-600">
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

          {/* Navigasi column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal">Navigasi</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-stone-600">
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

          {/* Newsletter column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal">Kabar Koleksi</h4>
            <p className="mt-3 text-sm text-stone-600">
              Dapatkan kabar koleksi terbaru & cerita katalog langsung ke email Anda.
            </p>
            <div className="mt-3">
              <NewsletterForm placeholder={siteConfig.newsletter.placeholder} />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-sand-200 pt-6 text-xs text-stone-400 sm:flex-row">
          <p>© 2026 {siteConfig.brand.name}. Seluruh hak cipta dilindungi.</p>
          <p>Katalog Kerajinan Pantai Bali</p>
        </div>
      </div>
    </footer>
  );
}
