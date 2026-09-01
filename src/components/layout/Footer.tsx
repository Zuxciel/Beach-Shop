"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent("open-aesthetic-chat"));
  };

  return (
    <footer className="border-t border-sand-200 bg-sand-50">
      <div className="mx-auto max-w-[1400px] px-3.5 max-[360px]:px-2.5 sm:px-6 lg:px-8 py-10 max-[360px]:py-8 md:py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="min-w-0">
            <p className="font-display text-xl max-[360px]:text-lg tracking-[0.2em]">{siteConfig.brand.shortName}</p>
            <p className="text-[9px] max-[360px]:text-[8px] tracking-[0.3em] text-stone-500 uppercase">OF INDONESIA</p>
            <p className="mt-3 max-w-xs text-xs sm:text-sm leading-5 sm:leading-6 text-stone-600">
              Koleksi kerajinan anyaman tas, topi, dan sandal bertema pantai yang terinspirasi dari keindahan alam Bali.
            </p>
            <div className="mt-3 text-xs text-stone-500 space-y-1">
              <p className="break-words">{siteConfig.brand.address}</p>
              <p className="break-all">{siteConfig.brand.email}</p>
              <p>IG: @{siteConfig.brand.instagram}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={openChat}
                className="inline-flex items-center gap-1.5 rounded-full btn-premium px-4 py-2 text-xs font-medium text-white shadow-sm"
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
          <div className="min-w-0">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal">Koleksi</h4>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-stone-600">
              {siteConfig.navigation.footer.collections.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-ocean transition link-underline-grow inline-block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigasi column */}
          <div className="min-w-0">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal">Navigasi</h4>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-stone-600">
              {siteConfig.navigation.footer.pages.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-ocean transition link-underline-grow inline-block">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button onClick={openChat} className="hover:text-ocean transition text-left cursor-pointer link-underline-grow inline-block">
                  Konsultasi AI Chatbot
                </button>
              </li>
              <li>
                <a
                  href={siteConfig.navigation.socials.instagram}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-ocean transition link-underline-grow inline-block"
                >
                  Instagram @{siteConfig.brand.instagram}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter column */}
          <div className="min-w-0">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal">Kabar Koleksi</h4>
            <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
              Dapatkan kabar koleksi terbaru & cerita katalog langsung ke email Anda.
            </p>
            <div className="mt-3 w-full max-w-full">
              <NewsletterForm placeholder={siteConfig.newsletter.placeholder} />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-sand-200 pt-6 text-[11px] sm:text-xs text-stone-400 sm:flex-row text-center sm:text-left">
          <p>© 2026 {siteConfig.brand.name}. Seluruh hak cipta dilindungi.</p>
          <p>Katalog Kerajinan Pantai Bali</p>
        </div>
      </div>
    </footer>
  );
}
