import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { lookbookItems } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Lookbook | ${siteConfig.brand.name}`,
  description: `Inspirasi gaya dan padu-padan koleksi tas, topi, dan sandal bertema pantai ${siteConfig.brand.name}.`,
  alternates: { canonical: "/pages/lookbook" },
  openGraph: {
    title: `Lookbook | ${siteConfig.brand.name}`,
    description: `Inspirasi padu-padan gaya bertema pantai ${siteConfig.brand.name}.`,
    url: `${siteConfig.brand.url}/pages/lookbook`,
    type: "article",
    images: [
      {
        url: `${siteConfig.brand.url}/img/Beach1.jpg`,
        width: 1200,
        height: 800,
        alt: `Lookbook ${siteConfig.brand.name}`,
      },
    ],
  },
};

export default function LookbookPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
          Inspirasi Gaya
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal">
          Lookbook Pesisir
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Kurasi visual padu-padan tas anyaman, topi, dan aksesori bertema pantai untuk referensi gaya santai dan liburan Anda.
        </p>
      </div>

      {/* Lookbook Gallery Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {lookbookItems.map((item, idx) => (
          <article
            key={item.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-sand-200 bg-white shadow-xs"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-100">
              <Image
                src={item.imageUrl}
                alt={item.altText}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading={idx < 2 ? "eager" : "lazy"}
              />
            </div>

            {/* Content Below Image (No weird text covering photos) */}
            <div className="p-6 flex flex-col flex-1 justify-between bg-white">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-terracotta-dark">
                  Koleksi 0{idx + 1}
                </span>
                <h2 className="mt-1 font-display text-2xl text-charcoal">
                  {item.title}
                </h2>
                {item.description && (
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {item.description}
                  </p>
                )}
              </div>

              {item.products && item.products.length > 0 && (
                <div className="mt-5 pt-4 border-t border-sand-100 flex flex-wrap gap-2">
                  {item.products.map((handle) => (
                    <Link
                      key={handle}
                      href={`/products/${handle}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-sand-200 bg-sand-50 px-3.5 py-1.5 text-xs font-medium text-charcoal hover:border-ocean hover:text-ocean transition-colors"
                    >
                      <span>Lihat {handle.replace(/-/g, " ")}</span>
                      <span>→</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Clean Bottom Navigation Card */}
      <div className="mt-16 rounded-2xl border border-sand-200 bg-sand-50/60 p-8 text-center max-w-xl mx-auto">
        <h3 className="font-display text-2xl text-charcoal">
          Jelajahi Katalog Lengkap
        </h3>
        <p className="mt-2 text-sm text-stone-600">
          Temukan seluruh pilihan tas pantai, topi, dan sandal di katalog utama kami.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/collections/shop-all"
            className="w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-lg bg-ocean px-6 text-xs font-medium uppercase tracking-wider text-white shadow-xs hover:bg-[#0f2422] transition-colors"
          >
            Lihat Semua Koleksi
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-lg border border-sand-300 bg-white px-6 text-xs font-medium uppercase tracking-wider text-charcoal hover:border-ocean transition-colors"
          >
            Info Kontak & Lokasi
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.brand.url}/` },
              { "@type": "ListItem", position: 2, name: "Lookbook", item: `${siteConfig.brand.url}/pages/lookbook` },
            ],
          }),
        }}
      />
    </div>
  );
}
