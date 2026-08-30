import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="bg-[#faf7f2] border-b border-sand-200">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & Action (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta-dark">
              Katalog Produk
            </span>

            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-[1.02]">
              Aesthetic
              <span className="block italic text-terracotta-dark font-light mt-1">
                of Indonesia
              </span>
            </h1>

            <p className="mt-4 text-base font-medium text-stone-700">
              {siteConfig.brand.tagline}
            </p>

            <p className="mt-2 text-sm leading-relaxed text-stone-600 max-w-lg">
              Eksplorasi referensi desain kerajinan anyaman tas pantai, topi pelindung surya, dan sandal kasual bertema pesisir tropis.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/collections/shop-all"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-ocean px-8 text-xs font-medium uppercase tracking-wider text-white shadow-xs hover:bg-[#0f2422] transition-colors"
              >
                <span>Lihat Koleksi</span>
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/pages/lookbook"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-sand-300 bg-white px-7 text-xs font-medium uppercase tracking-wider text-charcoal hover:border-ocean transition-colors"
              >
                Lookbook
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame (6 cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden rounded-2xl bg-sand-100 border border-sand-200 shadow-sm">
              <Image
                src="/img/Beach1.jpg"
                alt="Koleksi Pantai Aesthetic of Indonesia"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
