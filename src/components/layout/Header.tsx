"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { useWishlist } from "@/lib/wishlist-context";

const navLinks = siteConfig.navigation.main as unknown as { href: string; label: string }[];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useWishlist();

  const openChat = () => {
    window.dispatchEvent(new CustomEvent("open-aesthetic-chat"));
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-sand-200/80 glass-effect">
        <div className="mx-auto flex h-[60px] max-[400px]:h-[56px] sm:h-[64px] max-w-[1400px] items-center justify-between px-3 max-[400px]:px-2.5 sm:px-6 lg:px-8">
          {/* Mobile hamburger (visible only on < lg) */}
          <div className="flex items-center lg:hidden">
            <button
              aria-label="Buka menu navigasi"
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 max-[400px]:h-8 max-[400px]:w-8 items-center justify-center rounded-full hover:bg-sand-100 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="max-[400px]:w-[18px] max-[400px]:h-[18px]">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>

          {/* Brand Logo — left on desktop, centered on mobile */}
          <Link href="/" className="flex items-center gap-2 lg:gap-2.5 select-none group">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-sand-100 border border-sand-200/80 text-ocean shadow-2xs group-hover:border-ocean/40 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sm:w-5 sm:h-5">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeDasharray="1 2" />
                <path d="M12 7c-2.5 0-4.5 2-4.5 5s2 5 4.5 5 4.5-2 4.5-5-2-5-4.5-5Z" />
                <path d="M7.5 12h9M12 3v3M12 18v3" />
              </svg>
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="font-display text-[16px] max-[400px]:text-[15px] sm:text-[19px] font-normal tracking-[0.14em] text-charcoal leading-none group-hover:text-ocean transition-colors">
                {siteConfig.brand.shortName}
              </span>
              <span className="block text-[7px] max-[400px]:text-[6.5px] sm:text-[8.5px] tracking-[0.3em] text-stone-500 font-sans font-medium uppercase mt-0.5">
                OF INDONESIA
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links — centered in flow, never overlapping */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="link-underline-grow text-xs xl:text-sm font-medium tracking-wide text-charcoal/80 hover:text-ocean transition-colors uppercase whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions — Wishlist lokal (AI hanya di floating pojok) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/wishlist"
              className="hidden sm:inline-flex h-10 items-center justify-center gap-2 rounded-full border border-sand-200 bg-white px-4 text-xs xl:text-sm font-medium text-charcoal hover:border-ocean hover:text-ocean transition-all hover:shadow-sm"
              title="Wishlist tersimpan lokal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={count > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className={count > 0 ? "text-clay" : "text-stone-500"}>
                <path d="M12 21s-6.5-4.5-8.4-8.7A4.2 4.2 0 0 1 12 5a4.2 4.2 0 0 1 8.4 7.3C18.5 16.5 12 21 12 21Z" />
              </svg>
              Wishlist
              {count > 0 && <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1.5 text-[11px] font-bold text-white">{count}</span>}
            </Link>

            <Link
              href="/contact"
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand-200 bg-white hover:border-ocean hover:shadow-sm transition-all text-stone-700"
              title="Halaman Kontak & Lokasi"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6h16v12H4z" />
                <path d="M4 6l8 7 8-7" />
              </svg>
            </Link>

            {/* Mobile wishlist button */}
            <Link
              href="/wishlist"
              className="flex sm:hidden relative h-8 w-8 max-[400px]:h-7 max-[400px]:w-7 items-center justify-center rounded-full border border-sand-200 bg-white text-stone-700 shadow-sm"
              aria-label="Wishlist"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={count > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className={`max-[400px]:w-[13px] max-[400px]:h-[13px] ${count > 0 ? "text-clay" : ""}`}>
                <path d="M12 21s-6.5-4.5-8.4-8.7A4.2 4.2 0 0 1 12 5a4.2 4.2 0 0 1 8.4 7.3C18.5 16.5 12 21 12 21Z" />
              </svg>
              {count > 0 && <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-clay text-[9px] font-bold text-white">{count}</span>}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-[84%] max-w-[360px] flex-col bg-cream p-6 max-[400px]:p-4 shadow-2xl animate-slide-left">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-display text-lg tracking-widest">{siteConfig.brand.shortName}</span>
                <span className="block text-[9px] tracking-widest text-stone-500 uppercase">OF INDONESIA</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-100 text-stone-700 hover:bg-sand-200 transition-colors"
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
                  className="rounded-xl px-4 py-3 text-base max-[400px]:text-sm font-medium hover:bg-sand-100 transition active:bg-sand-200"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-sand-200 pt-6 space-y-3">
              <Link
                href="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-sand-200 bg-white py-3 text-sm font-medium text-charcoal hover:border-ocean transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={count > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className={count > 0 ? "text-clay" : ""}>
                  <path d="M12 21s-6.5-4.5-8.4-8.7A4.2 4.2 0 0 1 12 5a4.2 4.2 0 0 1 8.4 7.3C18.5 16.5 12 21 12 21Z" />
                </svg>
                Wishlist {count > 0 && `• ${count}`}
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-sand-200 bg-white py-3 text-sm font-medium hover:border-ocean transition-all"
              >
                Kontak & Lokasi
              </Link>
              <p className="text-center text-xs text-stone-500">{siteConfig.brand.address}</p>
              <p className="text-center text-[11px] text-stone-400">AI Asisten ada di tombol pojok kanan bawah</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
