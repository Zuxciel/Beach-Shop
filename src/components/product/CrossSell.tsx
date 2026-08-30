import { products } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";

export function CrossSell({ currentHandle }: { currentHandle: string }) {
  const items = products.filter((p) => p.handle !== currentHandle).slice(0, 4);
  return (
    <section className="py-8 md:py-10 border-t border-sand-200 mt-8">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
            Rekomendasi Padu-Padan
          </p>
          <h3 className="mt-1 font-display text-2xl md:text-3xl text-charcoal">
            Lengkapi Gaya Pantai Anda
          </h3>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
