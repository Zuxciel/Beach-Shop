import { products } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

export function FeaturedProducts() {
  const featured = products.slice(0, 8);
  return (
    <section className="bg-white border-y border-sand-200 py-12 md:py-16">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
              Kurasi Pilihan • {siteConfig.brand.shortName}
            </p>
            <h2 className="mt-1 font-display text-3xl md:text-4xl text-charcoal">
              8 Karya Anyaman Pantai
            </h2>
          </div>
          <Link
            href="/collections/shop-all"
            className="text-xs font-medium text-charcoal hover:text-ocean underline underline-offset-4"
          >
            Lihat semua referensi ({products.length}) →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
