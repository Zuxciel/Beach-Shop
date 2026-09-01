"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  sort: string;
  onSort: (v: string) => void;
  category: string;
};

export function Filters({ sort, onSort }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h4 className="text-xs sm:text-sm font-semibold text-charcoal">Urutkan</h4>
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          className="mt-2 w-full rounded-full border border-sand-200 bg-white px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-ocean transition cursor-pointer"
        >
          <option value="featured">Unggulan</option>
          <option value="name-asc">Nama A → Z</option>
          <option value="name-desc">Nama Z → A</option>
        </select>
      </div>
      <div className="rounded-xl bg-sand-50 p-3.5 sm:p-4 border border-sand-200">
        <p className="text-xs sm:text-sm font-medium text-charcoal">Katalog Identitas</p>
        <p className="mt-1 text-[11px] sm:text-xs leading-4 sm:leading-5 text-stone-600">
          Bukan toko online — katalog untuk mengenal koleksi. Gunakan AI Chatbot atau form kontak untuk tanya ketersediaan & detail.
        </p>
      </div>
      <div>
        <h4 className="text-xs sm:text-sm font-semibold text-charcoal">Kategori</h4>
        <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-stone-600">
          <li><a href="/collections/beach-bags" className="hover:text-ocean transition link-underline-grow inline-block">Tas Pantai (5)</a></li>
          <li><a href="/collections/sun-hats" className="hover:text-ocean transition link-underline-grow inline-block">Topi Pantai (1)</a></li>
          <li><a href="/collections/footwear" className="hover:text-ocean transition link-underline-grow inline-block">Sandal Pantai (2)</a></li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-[260px] flex-shrink-0 lg:block">
        <div className="sticky top-[80px] rounded-2xl border border-sand-200 bg-white p-6 card-elevated">{content}</div>
      </aside>

      {/* Mobile / tablet triggers — no horizontal scroll */}
      <div className="flex items-center gap-2 lg:hidden min-w-0 w-full">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-1 min-w-0 items-center justify-center gap-1.5 rounded-full border border-sand-200 bg-white px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium shadow-2xs hover:border-ocean transition cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
            <path d="M3 6h18M7 12h10M10 18h4" />
          </svg>
          Info & Filter
        </button>
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          className="rounded-full border border-sand-200 bg-white px-3 py-2 sm:py-2.5 text-xs sm:text-sm min-w-0 flex-1 max-w-[48%] shadow-2xs outline-none focus:border-ocean transition cursor-pointer"
        >
          <option value="featured">Unggulan</option>
          <option value="name-asc">A → Z</option>
          <option value="name-desc">Z → A</option>
        </select>
      </div>

      {/* Mobile drawer slide-up */}
      <div className={cn("fixed inset-0 z-50 transition-all md:hidden", mobileOpen ? "visible" : "invisible")}>
        <div className={cn("absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity", mobileOpen ? "opacity-100" : "opacity-0")} onClick={() => setMobileOpen(false)} />
        <div className={cn("absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-cream p-5 shadow-2xl transition-transform duration-300", mobileOpen ? "translate-y-0" : "translate-y-full")}>
          <div className="mx-auto h-1.5 w-8 sm:w-10 rounded-full bg-sand-200" />
          <div className="mt-4 flex items-center justify-between gap-2">
            <h3 className="font-display text-lg text-charcoal">Info & Kategori</h3>
            <button onClick={() => setMobileOpen(false)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand-100 hover:bg-sand-200 transition text-stone-700">✕</button>
          </div>
          <div className="mt-4">{content}</div>
          <button onClick={() => setMobileOpen(false)} className="mt-5 w-full rounded-full btn-premium py-2.5 text-xs sm:text-sm font-medium text-white shadow-sm">Tutup</button>
        </div>
      </div>

      {/* Tablet slide-over */}
      <div className={cn("fixed inset-0 z-50 hidden md:block lg:hidden", mobileOpen ? "visible" : "invisible")}>
        <div className={cn("absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity", mobileOpen ? "opacity-100" : "opacity-0")} onClick={() => setMobileOpen(false)} />
        <div className={cn("absolute right-0 top-0 h-full w-[380px] overflow-y-auto bg-cream p-6 shadow-2xl transition-transform duration-300", mobileOpen ? "translate-x-0" : "translate-x-full")}>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl text-charcoal">Info & Urutkan</h3>
            <button onClick={() => setMobileOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-100 hover:bg-sand-200 transition text-stone-700">✕</button>
          </div>
          <div className="mt-6">{content}</div>
          <button onClick={() => setMobileOpen(false)} className="mt-6 w-full rounded-full btn-premium py-3 text-sm font-medium text-white shadow-sm">Tutup</button>
        </div>
      </div>
    </>
  );
}
