import { products } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

export function FeaturedProducts() {
  const featured = products.slice(0, 8);
  return (
    <section className="bg-sand-50/60 border-y border-sand-200 py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-sand-200 pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta-dark">
              Kurasi Pilihan
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              8 Karya Anyaman Pesisir
            </h2>
          </div>
          <Link
            href="/collections/shop-all"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium uppercase tracking-wider text-charcoal hover:text-ocean transition-colors"
          >
            <span>Lihat Semua Katalog ({products.length})</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Bottom Mobile Action */}
        <div className="mt-12 flex justify-center sm:hidden">
          <Link
            href="/collections/shop-all"
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-sand-300 bg-white px-6 text-xs font-medium uppercase tracking-wider text-charcoal shadow-xs hover:border-ocean transition-colors"
          >
            Jelajahi Semua 8 Koleksi
          </Link>
        </div>
      </div>
    </section>
  );
}
