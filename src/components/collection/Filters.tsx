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
  const [price, setPrice] = useState<[number, number]>([0, 150]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const content = (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold">Sort</h4>
        <select value={sort} onChange={(e) => onSort(e.target.value)} className="mt-2 w-full rounded-full border border-sand-200 bg-white px-4 py-2.5 text-sm">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      <div>
        <h4 className="text-sm font-semibold">Material</h4>
        <div className="mt-3 space-y-2">
          {["Straw", "Suede", "Linen", "Jute", "Canvas"].map((m) => (
            <label key={m} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedMaterials.includes(m)}
                onChange={(e) => setSelectedMaterials((prev) => (e.target.checked ? [...prev, m] : prev.filter((x) => x !== m)))}
                className="rounded border-sand-200 text-ocean focus:ring-ocean"
              />
              {m}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold">Price</h4>
        <div className="mt-3 px-1">
          <input type="range" min={0} max={150} value={price[1]} onChange={(e) => setPrice([price[0], parseInt(e.target.value)])} className="w-full accent-ocean" />
          <div className="flex justify-between text-xs text-stone-500">
            <span>${price[0]}</span>
            <span>${price[1]}</span>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold">Availability</h4>
        <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> In stock only</label>
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
          Filters
        </button>
        <button onClick={() => setMobileOpen(true)} className="hidden items-center gap-2 rounded-full border border-sand-200 bg-white px-4 py-2.5 text-sm font-medium md:flex">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h18M7 12h10M10 18h4" /></svg>
          Filter & Sort
        </button>
        <select value={sort} onChange={(e) => onSort(e.target.value)} className="rounded-full border border-sand-200 bg-white px-4 py-2.5 text-sm md:hidden">
          <option value="featured">Featured</option>
          <option value="price-asc">Low to High</option>
          <option value="price-desc">High to Low</option>
        </select>
      </div>

      {/* Mobile drawer slide-up from bottom */}
      <div className={cn("fixed inset-0 z-40 transition md:hidden", mobileOpen ? "visible" : "invisible")}>
        <div className={cn("absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity", mobileOpen ? "opacity-100" : "opacity-0")} onClick={() => setMobileOpen(false)} />
        <div className={cn("absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-cream p-6 shadow-2xl transition-transform", mobileOpen ? "translate-y-0" : "translate-y-full")}>
          <div className="mx-auto h-1.5 w-10 rounded-full bg-sand-200" />
          <div className="mt-6 flex items-center justify-between">
            <h3 className="font-display text-xl">Filters</h3>
            <button onClick={() => setMobileOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-100">✕</button>
          </div>
          <div className="mt-6">{content}</div>
          <button onClick={() => setMobileOpen(false)} className="mt-6 w-full rounded-full bg-ocean py-3 text-sm font-medium text-white">Apply Filters</button>
        </div>
      </div>

      {/* Tablet slide-over from side */}
      <div className={cn("fixed inset-0 z-40 hidden md:block lg:hidden", mobileOpen ? "visible" : "invisible")}>
        <div className={cn("absolute inset-0 bg-black/30 transition-opacity", mobileOpen ? "opacity-100" : "opacity-0")} onClick={() => setMobileOpen(false)} />
        <div className={cn("absolute right-0 top-0 h-full w-[380px] overflow-y-auto bg-cream p-6 shadow-2xl transition-transform", mobileOpen ? "translate-x-0" : "translate-x-full")}>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl">Filters & Sorting</h3>
            <button onClick={() => setMobileOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-100">✕</button>
          </div>
          <div className="mt-6">{content}</div>
          <button onClick={() => setMobileOpen(false)} className="mt-6 w-full rounded-full bg-ocean py-3 text-sm font-medium text-white">Apply</button>
        </div>
      </div>
    </>
  );
}
