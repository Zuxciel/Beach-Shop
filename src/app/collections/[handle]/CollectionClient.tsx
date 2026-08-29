"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ui/ProductCard";
import { Filters } from "@/components/collection/Filters";

export function CollectionClient({ products }: { products: Product[] }) {
  const [sort, setSort] = useState("featured");

  const sorted = useMemo(() => {
    const copy = [...products];
    if (sort === "price-asc") copy.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
    if (sort === "price-desc") copy.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
    return copy;
  }, [products, sort]);

  return (
    <>
      <Filters sort={sort} onSort={setSort} category="all" />
      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between text-sm">
          <p className="text-stone-600">{sorted.length} products</p>
          <p className="hidden text-stone-500 lg:block">Showing handcrafted coastal essentials</p>
        </div>
        {/* Responsive grid: 2 cols mobile (<768), 3 cols tablet (768-1024), 4 cols desktop (>1024) */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {sorted.length === 0 && <p className="py-20 text-center text-stone-500">No products found.</p>}
      </div>
    </>
  );
}
