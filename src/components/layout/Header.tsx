"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/collections/shop-all", label: "Semua Koleksi" },
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
      <header className="sticky top-0 z-40 border-b border-sand-200 bg-[#faf7f2]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[60px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-12">
          {/* Left: Mobile Toggle & Brand Title */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Buka menu navigasi"
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-charcoal hover:bg-sand-200/60 lg:hidden transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            <Link href="/" className="flex flex-col py-1">
              <span className="font-display text-[17px] sm:text-[19px] font-medium tracking-[0.12em] text-charcoal leading-none">
                Aesthetic of Indonesia
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-medium uppercase tracking-[0.14em] text-stone-600 hover:text-ocean transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={openChat}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-sand-300 bg-white px-3.5 text-xs font-medium text-charcoal shadow-xs hover:border-ocean hover:text-ocean transition-all"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="hidden sm:inline">Tanya Asisten</span>
              <span className="sm:hidden">Chat</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[80%] max-w-[300px] flex-col bg-[#faf7f2] p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-sand-200 pb-3">
              <span className="font-display text-base tracking-wider text-charcoal">Aesthetic of Indonesia</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-sand-200/50 text-charcoal"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="mt-5 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-charcoal hover:bg-sand-200/60 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto border-t border-sand-200 pt-4 space-y-2">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openChat();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-ocean py-2.5 text-xs font-medium text-white shadow-xs"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Tanya Asisten Chat
              </button>
              <p className="text-center text-[10px] text-stone-400">{siteConfig.brand.address}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
