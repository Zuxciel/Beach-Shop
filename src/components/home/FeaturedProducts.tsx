import { products } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

export function FeaturedProducts() {
  const featured = products.slice(0, 8);
  return (
    <section className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-14 md:py-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
            Kurasi Katalog
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-charcoal">
            8 Koleksi {siteConfig.brand.shortName}
          </h2>
        </div>
        <Link
          href="/collections/shop-all"
          className="hidden md:inline-flex text-sm font-medium underline decoration-sand-300 underline-offset-4 hover:decoration-ocean"
        >
          Lihat semua katalog →
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="mt-8 flex justify-center md:hidden">
        <Link
          href="/collections/shop-all"
          className="inline-flex h-11 items-center justify-center rounded-full border border-sand-200 bg-white px-6 text-sm font-medium hover:border-ocean transition"
        >
          Lihat Semua Koleksi
        </Link>
      </div>
    </section>
  );
}
