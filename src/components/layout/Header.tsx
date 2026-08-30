"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/collections/shop-all", label: "Koleksi" },
  { href: "/collections/beach-bags", label: "Tas Pantai" },
  { href: "/collections/footwear", label: "Sandal" },
  { href: "/collections/sun-hats", label: "Topi" },
  { href: "/pages/lookbook", label: "Lookbook" },
  { href: "/contact", label: "Kontak" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const wa = `https://wa.me/${siteConfig.brand.whatsapp}?text=Halo%20Easthtic%20of%20Indonesia%20saya%20ingin%20tanya%20koleksi`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-sand-200 bg-cream/80 backdrop-blur-md">
        <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between px-4 md:px-6 lg:px-8">
          {/* Left: hamburger + desktop nav */}
          <div className="flex items-center gap-6">
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-sand-100 lg:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm font-medium tracking-wide text-charcoal/80 hover:text-ocean transition-colors uppercase">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center">
            <span className="font-display text-[18px] font-normal tracking-[0.12em] text-charcoal md:text-[20px]">EASTHTIC</span>
            <span className="block -mt-1 text-[9px] tracking-[0.28em] text-stone-500 font-sans">OF INDONESIA</span>
          </Link>

          {/* Right: contact only (simple) */}
          <div className="flex items-center gap-2">
            <a href={wa} target="_blank" rel="noopener" className="hidden md:inline-flex h-10 items-center justify-center rounded-full bg-ocean px-5 text-sm font-medium text-white hover:bg-[#0f2e2c]">
              WhatsApp
            </a>
            <a href="/contact" className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand-200 bg-white hover:border-ocean">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16v12H4z" /><path d="M4 6l8 7 8-7" /></svg>
            </a>
            {/* mobile whatsapp */}
            <a href={wa} target="_blank" rel="noopener" className="flex md:hidden h-10 w-10 items-center justify-center rounded-full bg-ocean text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01M15 9h.01" /><circle cx="12" cy="12" r="10" /></svg>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-[84%] max-w-[360px] flex-col bg-cream p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg tracking-widest">EASTHTIC</span>
              <button onClick={() => setMobileOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-lg font-medium hover:bg-sand-100">
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-sand-200 pt-6 space-y-3">
              <a href={wa} target="_blank" rel="noopener" className="flex w-full items-center justify-center gap-2 rounded-full bg-ocean py-3 text-sm font-medium text-white">
                Chat WhatsApp
              </a>
              <a href={`mailto:${siteConfig.brand.email}`} className="flex w-full items-center justify-center gap-2 rounded-full border border-sand-200 py-3 text-sm font-medium">
                {siteConfig.brand.email}
              </a>
              <p className="text-center text-xs text-stone-500">{siteConfig.brand.address}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
