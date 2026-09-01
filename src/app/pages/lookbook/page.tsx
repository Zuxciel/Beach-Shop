import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { lookbookItems } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: `Lookbook | ${siteConfig.brand.name}`,
  description: `Lookbook ${siteConfig.brand.name} — kurasi cerita visual kerajinan anyaman tas, topi, dan sandal bertema pantai Bali.`,
  alternates: { canonical: "/pages/lookbook" },
  openGraph: {
    title: `Lookbook | ${siteConfig.brand.name}`,
    description: `Lookbook ${siteConfig.brand.name} — editorial cerita visual kerajinan pantai khas Bali.`,
    url: `${siteConfig.brand.url}/pages/lookbook`,
    type: "article",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 800,
        alt: `Lookbook ${siteConfig.brand.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Lookbook | ${siteConfig.brand.name}`,
    description: `Lookbook ${siteConfig.brand.name} — editorial cerita visual kerajinan pantai khas Bali.`,
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"],
  },
};

export default function LookbookPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-3 max-[360px]:px-2.5 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 pb-24 sm:pb-12 overflow-hidden">
      <div className="text-center">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
          Editorial • Katalog Visual
        </p>
        <h1 className="mt-1.5 font-display text-3xl sm:text-4xl md:text-5xl text-charcoal">Lookbook Pantai</h1>
        <p className="mx-auto mt-2.5 max-w-2xl text-xs sm:text-sm leading-5 sm:leading-6 text-stone-600">
          {siteConfig.brand.name} — Kurasi 4 cerita visual bertema pesisir pantai tropis yang menonjolkan keaslian serat anyaman rotan, pandan, dan jerami.
        </p>
        <div className="mt-4 sm:mt-5 flex flex-wrap justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-stone-600">
          <span className="rounded-full bg-sand-100 px-3 py-1 font-medium">4 Cerita Visual</span>
          <span className="rounded-full bg-sand-100 px-3 py-1">Instagram @{siteConfig.brand.instagram}</span>
          <span className="rounded-full bg-sand-100 px-3 py-1">Bali Inspired</span>
        </div>
      </div>

      {/* Story quick navigation pills */}
      <div className="mt-6 sm:mt-8 flex justify-center gap-1.5 sm:gap-2 flex-wrap">
        {lookbookItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-full border border-sand-200 bg-white px-3 max-[360px]:px-2.5 py-1.5 text-[11px] sm:text-xs font-medium hover:border-ocean hover:text-ocean transition shadow-2xs"
          >
            {item.title}
          </a>
        ))}
      </div>

      <div className="mt-6 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 auto-rows-fr">
        {lookbookItems.map((item, idx) => (
          <article
            key={item.id}
            id={item.id}
            className="group relative overflow-hidden rounded-2xl bg-sand-100 scroll-mt-28 card-elevated flex flex-col"
          >
            <div className="relative h-64 max-[360px]:h-56 sm:h-80 md:h-[420px] w-full overflow-hidden bg-sand-100">
              <Image
                src={item.imageUrl}
                alt={item.altText}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
                sizes="(max-width:768px) 100vw, 50vw"
                loading={idx < 2 ? "eager" : "lazy"}
                unoptimized={item.imageUrl.startsWith("/img/") || item.imageUrl.includes("unsplash")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-6">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/80">
                  Cerita 0{idx + 1}
                </p>
                <h2 className="font-display text-lg sm:text-2xl text-white mt-0.5">{item.title}</h2>
                {item.description && (
                  <p className="mt-1 text-xs sm:text-sm text-white/90 line-clamp-2">{item.description}</p>
                )}
                {item.products && (
                  <div className="mt-2.5 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                    {item.products.map((h) => (
                      <Link
                        key={h}
                        href={`/products/${h}`}
                        className="rounded-full bg-white/95 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-charcoal hover:bg-white shadow-sm transition"
                      >
                        Lihat {h.replace(/-/g, " ")} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-100 card-elevated">
          <Image
            src="https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=1200&auto=format&fit=crop"
            alt="Suasana bertema pantai dan anyaman — Aesthetic of Indonesia"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
        <div className="md:pl-6 lg:pl-8">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
            Filosofi Desain
          </p>
          <h2 className="mt-1.5 font-display text-2xl sm:text-3xl leading-tight text-charcoal">
            Sentuhan Alami <span className="italic text-terracotta-dark">Anyaman Pesisir</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-5 sm:leading-6 text-stone-600">
            Setiap serat rotan, jerami, dan daun pandan dipilih secara teliti untuk menghasilkan produk berkarakter kuat, fleksibel, dan memiliki nilai seni tinggi. Kami bangga mempersembahkan kerajinan lokal Indonesia ke panggung internasional.
          </p>
          <blockquote className="mt-4 sm:mt-5 border-l-2 border-terracotta pl-3.5 sm:pl-4 text-xs sm:text-sm italic text-stone-700">
            “Menyatu dengan hangatnya mentari, deburan ombak, dan hembusan angin pesisir.” — {siteConfig.brand.name}
          </blockquote>
          <Link
            href="/collections/beach-bags"
            className="mt-5 sm:mt-6 inline-flex rounded-full btn-premium px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white shadow-sm"
          >
            Lihat Koleksi Tas Pantai
          </Link>
        </div>
      </section>

      <div className="mt-10 sm:mt-14 rounded-2xl btn-premium p-6 sm:p-8 text-center text-white md:p-12 shadow-md">
        <p className="font-display text-xl sm:text-2xl md:text-3xl leading-tight">
          “Garam, matahari, dan karya yang menyatu dengan alam.”
        </p>
        <p className="mt-2.5 text-xs sm:text-sm text-white/80">— {siteConfig.brand.name} Journal</p>
      </div>

      <div className="mt-6 sm:mt-8 rounded-2xl border border-sand-200 bg-white p-5 sm:p-8 text-center md:p-10 card-elevated">
        <h3 className="font-display text-xl sm:text-2xl text-charcoal">Ingin Berkonsultasi atau Melihat Koleksi?</h3>
        <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-stone-600 leading-relaxed">
          Kunjungi galeri kami di {siteConfig.brand.address} atau gunakan AI Chatbot kami untuk panduan belanja dan info produk.
        </p>
        <div className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-2.5 sm:gap-3">
          <Link
            href="/collections/shop-all"
            className="rounded-full btn-premium px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white shadow-sm flex-1 sm:flex-initial text-center min-w-[140px]"
          >
            Buka Katalog Koleksi
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-sand-200 bg-sand-50 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:border-ocean hover:text-ocean transition flex-1 sm:flex-initial text-center min-w-[140px]"
          >
            Info Kontak & Lokasi
          </Link>
        </div>
        <div className="mx-auto mt-5 sm:mt-6 max-w-md w-full">
          <NewsletterForm placeholder="Email untuk kabar koleksi" />
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
