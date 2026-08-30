"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/collections/shop-all", label: "Koleksi" },
  { href: "/collections/beach-bags", label: "Tas Pantai" },
  { href: "/collections/sun-hats", label: "Topi" },
  { href: "/collections/footwear", label: "Sandal" },
  { href: "/pages/lookbook", label: "Lookbook" },
  { href: "/contact", label: "Kontak" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const openChat = () => {
    window.dispatchEvent(new CustomEvent("open-aesthetic-chat"));
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-sand-200 bg-cream/85 backdrop-blur-md overflow-hidden">
        <div className="mx-auto flex h-[56px] max-[400px]:h-[52px] sm:h-[64px] max-w-[1400px] items-center justify-between px-2 max-[400px]:px-2 sm:px-6 lg:px-8 gap-1 sm:gap-2">
          {/* Left: hamburger + desktop nav */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 min-w-0">
            <button
              aria-label="Buka menu navigasi"
              onClick={() => setMobileOpen(true)}
              className="flex h-8 w-8 max-[400px]:h-7 max-[400px]:w-7 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full hover:bg-sand-100 lg:hidden"
            >
              <svg className="w-[18px] h-[18px] sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs lg:text-sm font-medium tracking-wide text-charcoal/80 hover:text-ocean transition-colors uppercase"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center logo — shrink on <400px to avoid overlap */}
          <Link href="/" className="text-center select-none py-1 min-w-0 flex-1 max-[400px]:flex-none mx-1 sm:mx-2">
            <span className="block font-display text-[14px] max-[400px]:text-[13px] sm:text-[18px] md:text-[20px] font-normal tracking-[0.12em] max-[400px]:tracking-[0.08em] sm:tracking-[0.14em] text-charcoal leading-none truncate">
              {siteConfig.brand.shortName}
            </span>
            <span className="block text-[7px] max-[400px]:text-[7px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] text-stone-500 font-sans font-medium uppercase mt-0.5 truncate">
              OF INDONESIA
            </span>
          </Link>

          {/* Right: AI Chatbot Trigger & Contact — shrink on <400px */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
            <button
              onClick={openChat}
              className="hidden md:inline-flex h-9 sm:h-10 items-center justify-center gap-2 rounded-full bg-ocean px-4 sm:px-5 text-xs sm:text-sm font-medium text-white shadow-sm hover:bg-[#0f2e2c] transition whitespace-nowrap"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              Tanya AI Asisten
            </button>
            <Link
              href="/contact"
              className="hidden md:inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-sand-200 bg-white hover:border-ocean transition text-stone-700"
              title="Halaman Kontak & Lokasi"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6h16v12H4z" />
                <path d="M4 6l8 7 8-7" />
              </svg>
            </Link>
            {/* Mobile AI Chat launcher in header — smaller on <400px */}
            <button
              onClick={openChat}
              className="flex md:hidden h-7 w-7 max-[400px]:h-7 max-[400px]:w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-ocean text-white shadow-sm"
              aria-label="Tanya AI Asisten"
            >
              <svg className="w-[14px] h-[14px] sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-[84%] max-w-[340px] flex-col bg-cream p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-display text-lg tracking-widest text-charcoal">{siteConfig.brand.shortName}</span>
                <span className="block text-[9px] tracking-widest text-stone-500 uppercase">OF INDONESIA</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-100 text-stone-700"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3.5 py-2.5 text-base font-medium text-charcoal hover:bg-sand-100 transition"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-sand-200 pt-5 space-y-2.5">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openChat();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-ocean py-2.5 text-xs sm:text-sm font-medium text-white shadow"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                Tanya AI Chatbot
              </button>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-sand-200 bg-white py-2.5 text-xs sm:text-sm font-medium text-stone-700"
              >
                Kontak & Lokasi
              </Link>
              <p className="text-center text-[11px] text-stone-400">{siteConfig.brand.address}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
