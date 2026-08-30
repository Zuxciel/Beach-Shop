"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ui/ProductCard";
import { Filters } from "@/components/collection/Filters";

export function CollectionClient({ products }: { products: Product[] }) {
  const [sort, setSort] = useState("featured");

  const sorted = useMemo(() => {
    const copy = [...products];
    if (sort === "name-asc") copy.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "name-desc") copy.sort((a, b) => b.title.localeCompare(a.title));
    return copy;
  }, [products, sort]);

  return (
    <>
      <Filters sort={sort} onSort={setSort} category="all" />
      <div className="flex-1 min-w-0">
        <div className="mb-3 sm:mb-4 flex items-center justify-between text-xs sm:text-sm gap-2">
          <p className="text-stone-600 whitespace-nowrap">{sorted.length} referensi</p>
          <p className="hidden text-stone-500 lg:block truncate">Katalog ilustrasi — foto dapat berbeda</p>
        </div>
        {/* Exact spec: 2 mobile (<768), 3 tablet (768-1024), 4 desktop (>1024) — no horizontal scroll */}
        <div className="grid grid-cols-2 gap-2 max-[400px]:gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {sorted.length === 0 && <p className="py-20 text-center text-sm text-stone-500">Tidak ada koleksi.</p>}
      </div>
    </>
  );
}
