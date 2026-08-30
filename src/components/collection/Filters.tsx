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
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold">Urutkan</h4>
        <select value={sort} onChange={(e) => onSort(e.target.value)} className="mt-2 w-full rounded-full border border-sand-200 bg-white px-4 py-2.5 text-sm">
          <option value="featured">Unggulan</option>
          <option value="name-asc">Nama A → Z</option>
          <option value="name-desc">Nama Z → A</option>
        </select>
      </div>
      <div className="rounded-xl bg-sand-50 p-4">
        <p className="text-sm font-medium">Katalog Identitas</p>
        <p className="mt-1 text-xs leading-5 text-stone-600">Bukan toko online — katalog untuk mengenal koleksi. Hubungi WhatsApp untuk tanya stok & pemesanan.</p>
      </div>
      <div>
        <h4 className="text-sm font-semibold">Kategori</h4>
        <ul className="mt-2 space-y-1 text-sm text-stone-600">
          <li><a href="/collections/beach-bags" className="hover:text-ocean">Tas Pantai (5)</a></li>
          <li><a href="/collections/sun-hats" className="hover:text-ocean">Topi Pantai (1)</a></li>
          <li><a href="/collections/footwear" className="hover:text-ocean">Sandal Pantai (2)</a></li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-[260px] flex-shrink-0 lg:block">
        <div className="sticky top-[80px] rounded-2xl border border-sand-200 bg-white p-6">{content}</div>
      </aside>

      {/* Mobile / tablet triggers */}
      <div className="flex items-center gap-2 lg:hidden">
        <button onClick={() => setMobileOpen(true)} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-sand-200 bg-white px-4 py-2.5 text-sm font-medium md:hidden">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h18M7 12h10M10 18h4" /></svg>
          Info
        </button>
        <button onClick={() => setMobileOpen(true)} className="hidden items-center gap-2 rounded-full border border-sand-200 bg-white px-4 py-2.5 text-sm font-medium md:flex">
          Info & Urutkan
        </button>
        <select value={sort} onChange={(e) => onSort(e.target.value)} className="rounded-full border border-sand-200 bg-white px-4 py-2.5 text-sm md:hidden">
          <option value="featured">Unggulan</option>
          <option value="name-asc">A → Z</option>
          <option value="name-desc">Z → A</option>
        </select>
      </div>

      {/* Mobile drawer slide-up */}
      <div className={cn("fixed inset-0 z-40 transition md:hidden", mobileOpen ? "visible" : "invisible")}>
        <div className={cn("absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity", mobileOpen ? "opacity-100" : "opacity-0")} onClick={() => setMobileOpen(false)} />
        <div className={cn("absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-cream p-6 shadow-2xl transition-transform", mobileOpen ? "translate-y-0" : "translate-y-full")}>
          <div className="mx-auto h-1.5 w-10 rounded-full bg-sand-200" />
          <div className="mt-6 flex items-center justify-between">
            <h3 className="font-display text-xl">Info</h3>
            <button onClick={() => setMobileOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-100">✕</button>
          </div>
          <div className="mt-6">{content}</div>
          <button onClick={() => setMobileOpen(false)} className="mt-6 w-full rounded-full bg-ocean py-3 text-sm font-medium text-white">Tutup</button>
        </div>
      </div>

      {/* Tablet slide-over */}
      <div className={cn("fixed inset-0 z-40 hidden md:block lg:hidden", mobileOpen ? "visible" : "invisible")}>
        <div className={cn("absolute inset-0 bg-black/30 transition-opacity", mobileOpen ? "opacity-100" : "opacity-0")} onClick={() => setMobileOpen(false)} />
        <div className={cn("absolute right-0 top-0 h-full w-[380px] overflow-y-auto bg-cream p-6 shadow-2xl transition-transform", mobileOpen ? "translate-x-0" : "translate-x-full")}>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl">Info & Urutkan</h3>
            <button onClick={() => setMobileOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-100">✕</button>
          </div>
          <div className="mt-6">{content}</div>
          <button onClick={() => setMobileOpen(false)} className="mt-6 w-full rounded-full bg-ocean py-3 text-sm font-medium text-white">Tutup</button>
        </div>
      </div>
    </>
  );
}
