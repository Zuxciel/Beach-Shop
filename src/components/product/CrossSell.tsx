import { products } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";

export function CrossSell({ currentHandle }: { currentHandle: string }) {
  const items = products.filter((p) => p.handle !== currentHandle).slice(0, 4);
  return (
    <section className="py-10">
      <h3 className="font-display text-2xl">Complete Your Beach Look</h3>
      <div className="mt-6 flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
        {items.map((p) => (
          <div key={p.id} className="min-w-[220px] snap-start md:min-w-0 md:flex-1">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
