"use client";

import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function VariantSelector({
  product,
  selected,
  onSelect,
}: {
  product: Product;
  selected: Record<string, string>;
  onSelect: (name: string, value: string) => void;
}) {
  return (
    <div className="space-y-5">
      {product.options.map((opt) => (
        <div key={opt.name}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{opt.name}: <span className="font-normal text-stone-600">{selected[opt.name]}</span></p>
            {opt.name === "Size" && <button className="text-xs underline decoration-dotted underline-offset-2 text-stone-500 hover:text-ocean">Size guide</button>}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {opt.values.map((v) => {
              const isSelected = selected[opt.name] === v;
              // Check if variant with this option exists and is available
              const variantForValue = product.variants.find((vr) => vr.selectedOptions.some((o) => o.name === opt.name && o.value === v));
              const isAvailable = variantForValue ? variantForValue.availableForSale : true;
              return (
                <button
                  key={v}
                  onClick={() => isAvailable && onSelect(opt.name, v)}
                  disabled={!isAvailable}
                  className={cn(
                    "min-w-[48px] rounded-full border px-4 py-2 text-sm font-medium transition",
                    isSelected ? "border-ocean bg-ocean text-white" : "border-sand-200 bg-white hover:border-ocean hover:text-ocean",
                    !isAvailable && "opacity-40 cursor-not-allowed line-through bg-sand-50"
                  )}
                  aria-pressed={isSelected}
                  title={!isAvailable ? "Out of stock" : undefined}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
