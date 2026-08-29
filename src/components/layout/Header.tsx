"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/collections/shop-all", label: "Shop All" },
  { href: "/collections/beach-bags", label: "Bags" },
  { href: "/collections/footwear", label: "Footwear" },
  { href: "/collections/sun-hats", label: "Sun Hats" },
  { href: "/pages/lookbook", label: "Lookbook" },
];

export function Header() {
  const { totalQuantity, openDrawer, wishlist } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-sand-200 bg-cream/80 backdrop-blur-md">
        <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between px-4 md:px-6 lg:px-8">
          {/* Left: mobile hamburger + desktop nav */}
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
            <span className="font-display text-[22px] font-normal tracking-[0.18em] text-charcoal">COASTAL</span>
            <span className="block -mt-1 text-[10px] tracking-[0.35em] text-stone-500 font-sans">AESTHETIC</span>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <button aria-label="Search" onClick={() => setSearchOpen((v) => !v)} className="hidden h-10 w-10 items-center justify-center rounded-full hover:bg-sand-100 md:flex">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <Link href="/account" aria-label="Account" className="hidden h-10 w-10 items-center justify-center rounded-full hover:bg-sand-100 md:flex">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </Link>
            <Link href="/account" aria-label="Wishlist" className="relative hidden h-10 w-10 items-center justify-center rounded-full hover:bg-sand-100 md:flex">
              <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.length ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className={wishlist.length ? "text-clay" : ""}>
                <path d="M12 21s-6.5-4.2-8.5-8.2A4.5 4.5 0 0 1 12 5a4.5 4.5 0 0 1 8.5 7.8C18.5 16.8 12 21 12 21Z" />
              </svg>
              {wishlist.length > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay px-1 text-[10px] font-bold text-white">{wishlist.length}</span>}
            </Link>
            <button aria-label="Cart" onClick={openDrawer} className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-sand-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 7h14l-1 10H7L6 7Z" />
                <path d="M9 7V5a3 3 0 0 1 6 0v2" />
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-ocean px-1 text-xs font-bold text-white">{totalQuantity}</span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <div className="border-t border-sand-200 bg-white px-4 py-3">
            <div className="mx-auto flex max-w-2xl items-center gap-3">
              <input placeholder="Search straw bags, sandals, hats…" className="flex-1 rounded-full border border-sand-200 bg-sand-50 px-5 py-2.5 text-sm outline-none focus:border-ocean focus:bg-white" autoFocus />
              <button onClick={() => setSearchOpen(false)} className="text-sm text-stone-500 hover:text-charcoal">Cancel</button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-[84%] max-w-[360px] flex-col bg-cream p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-display text-xl tracking-widest">COASTAL</span>
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
            <div className="mt-auto flex gap-3 border-t border-sand-200 pt-6">
              <Link href="/account" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-sand-200 py-3 text-sm font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
                Account
              </Link>
              <button onClick={() => setSearchOpen(true)} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-sand-200 py-3 text-sm font-medium">
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
