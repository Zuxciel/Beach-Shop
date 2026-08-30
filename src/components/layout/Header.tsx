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
      <header className="sticky top-0 z-40 border-b border-sand-200 bg-cream/80 backdrop-blur-md">
        <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between px-4 md:px-6 lg:px-8">
          {/* Left: hamburger + desktop nav */}
          <div className="flex items-center gap-6">
            <button
              aria-label="Buka menu navigasi"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-sand-100 lg:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium tracking-wide text-charcoal/80 hover:text-ocean transition-colors uppercase"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center">
            <span className="font-display text-[18px] font-normal tracking-[0.14em] text-charcoal md:text-[20px]">
              {siteConfig.brand.shortName}
            </span>
            <span className="block -mt-1 text-[9px] tracking-[0.3em] text-stone-500 font-sans font-medium">
              OF INDONESIA
            </span>
          </Link>

          {/* Right: AI Chatbot Trigger & Contact */}
          <div className="flex items-center gap-2">
            <button
              onClick={openChat}
              className="hidden md:inline-flex h-10 items-center justify-center gap-2 rounded-full bg-ocean px-5 text-sm font-medium text-white shadow-sm hover:bg-[#0f2e2c] transition"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              Tanya AI Asisten
            </button>
            <Link
              href="/contact"
              className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand-200 bg-white hover:border-ocean transition"
              title="Halaman Kontak & Lokasi"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6h16v12H4z" />
                <path d="M4 6l8 7 8-7" />
              </svg>
            </Link>
            {/* Mobile AI Chat launcher */}
            <button
              onClick={openChat}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-full bg-ocean text-white shadow-sm"
              aria-label="Tanya AI Asisten"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          <div className="absolute left-0 top-0 flex h-full w-[84%] max-w-[360px] flex-col bg-cream p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-display text-lg tracking-widest">{siteConfig.brand.shortName}</span>
                <span className="block text-[9px] tracking-widest text-stone-500">OF INDONESIA</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-100"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-lg font-medium hover:bg-sand-100 transition"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-sand-200 pt-6 space-y-3">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openChat();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-ocean py-3 text-sm font-medium text-white shadow"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                Tanya AI Chatbot
              </button>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-sand-200 bg-white py-3 text-sm font-medium"
              >
                Kontak & Lokasi
              </Link>
              <p className="text-center text-xs text-stone-500">{siteConfig.brand.address}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
