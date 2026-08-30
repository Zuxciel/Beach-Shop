"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/collections/shop-all", label: "Semua Koleksi" },
  { href: "/collections/beach-bags", label: "Tas Pantai" },
  { href: "/collections/sun-hats", label: "Topi Anyaman" },
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
      <header className="sticky top-0 z-40 border-b border-sand-200/80 bg-[#faf7f2]/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-12">
          {/* Left: Mobile menu button & Desktop Nav */}
          <div className="flex items-center gap-6">
            <button
              aria-label="Buka menu navigasi"
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal hover:bg-sand-200/60 lg:hidden transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.slice(0, 4).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs font-medium uppercase tracking-[0.14em] text-charcoal/80 hover:text-ocean transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center Logo */}
          <Link href="/" className="flex flex-col items-center justify-center py-1 group">
            <span className="font-display text-[18px] sm:text-[21px] font-normal tracking-[0.18em] text-charcoal leading-none group-hover:text-ocean transition-colors">
              {siteConfig.brand.shortName}
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-stone-500 font-sans font-medium uppercase mt-0.5">
              OF INDONESIA
            </span>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <nav className="hidden lg:flex items-center gap-6 mr-2">
              {navLinks.slice(4).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs font-medium uppercase tracking-[0.14em] text-charcoal/80 hover:text-ocean transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <button
              onClick={openChat}
              className="hidden sm:inline-flex h-9 items-center justify-center gap-2 rounded-full border border-sand-300 bg-sand-50 px-4 text-xs font-medium text-charcoal shadow-xs hover:border-ocean hover:bg-white transition-all"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>AI Asisten</span>
            </button>

            <Link
              href="/contact"
              className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-sand-300 bg-sand-50 text-charcoal hover:border-ocean hover:bg-white transition-colors"
              title="Kontak & Lokasi Galeri"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6h16v12H4z" />
                <path d="M4 6l8 7 8-7" />
              </svg>
            </Link>

            {/* Mobile Chat Icon */}
            <button
              onClick={openChat}
              className="flex sm:hidden h-9 w-9 items-center justify-center rounded-full bg-ocean text-white shadow-xs"
              aria-label="Tanya AI Asisten"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[85%] max-w-[320px] flex-col bg-[#faf7f2] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-sand-200 pb-4">
              <div>
                <span className="font-display text-lg tracking-[0.2em] text-charcoal">{siteConfig.brand.shortName}</span>
                <span className="block text-[8px] tracking-[0.3em] text-stone-500 uppercase">OF INDONESIA</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-sand-200/60 text-charcoal"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-sand-200/50 transition-colors"
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
                className="flex w-full items-center justify-center gap-2 rounded-full bg-ocean py-3 text-xs font-medium text-white shadow-xs"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Tanya AI Chatbot
              </button>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center rounded-full border border-sand-300 bg-white py-2.5 text-xs font-medium text-charcoal"
              >
                Kontak & Lokasi Galeri
              </Link>
              <p className="text-center text-[10px] text-stone-400">{siteConfig.brand.address}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
