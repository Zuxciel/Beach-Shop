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
        url: `${siteConfig.brand.url}/img/Beach1.jpg`,
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
    images: [`${siteConfig.brand.url}/img/Beach1.jpg`],
  },
};

export default function LookbookPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
          Editorial • Katalog Visual
        </p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl text-charcoal">Lookbook Pantai</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          {siteConfig.brand.name} — Kurasi 4 cerita visual bertema golden hour di pesisir pantai Bali yang menonjolkan keaslian serat anyaman rotan, pandan, dan jerami.
        </p>
        <div className="mt-6 flex justify-center gap-2 text-xs text-stone-600">
          <span className="rounded-full bg-sand-100 px-3 py-1 font-medium">4 Cerita Visual</span>
          <span className="rounded-full bg-sand-100 px-3 py-1">Instagram @{siteConfig.brand.instagram}</span>
          <span className="rounded-full bg-sand-100 px-3 py-1">Bali Inspired</span>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2 overflow-x-auto scrollbar-hide">
        {lookbookItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="whitespace-nowrap rounded-full border border-sand-200 bg-white px-4 py-2 text-xs font-medium hover:border-ocean hover:text-ocean transition"
          >
            {item.title}
          </a>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {lookbookItems.map((item, idx) => (
          <article
            key={item.id}
            id={item.id}
            className={`group relative overflow-hidden rounded-2xl bg-sand-100 scroll-mt-28 ${
              idx === 0 ? "md:row-span-2" : ""
            }`}
          >
            <div className={`relative ${idx === 0 ? "aspect-[3/4] md:aspect-[3/4]" : "aspect-[4/3]"}`}>
              <Image
                src={item.imageUrl}
                alt={item.altText}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 50vw"
                loading={idx < 2 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                  Cerita 0{idx + 1}
                </p>
                <h2 className="font-display text-2xl text-white">{item.title}</h2>
                {item.description && (
                  <p className="mt-1 text-sm text-white/90">{item.description}</p>
                )}
                {item.products && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.products.map((h) => (
                      <Link
                        key={h}
                        href={`/products/${h}`}
                        className="rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-charcoal hover:bg-white shadow-sm transition"
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

      <section className="mt-14 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-100">
          <Image
            src="/img/Beach1.jpg"
            alt="Suasana bertema pantai — Aesthetic of Indonesia"
            fill
            className="object-cover"
            sizes="(max-width:768px)100vw,50vw"
            loading="lazy"
          />
        </div>
        <div className="md:pl-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
            Filosofi Desain
          </p>
          <h2 className="mt-2 font-display text-3xl leading-tight">
            Sentuhan Alami <span className="italic text-terracotta-dark">Anyaman Pesisir</span>
          </h2>
          <p className="mt-4 text-sm leading-6 text-stone-600">
            Setiap serat rotan, jerami, dan daun pandan dipilih secara teliti untuk menghasilkan produk berkarakter kuat, fleksibel, dan memiliki nilai seni tinggi. Kami bangga mempersembahkan kerajinan lokal Indonesia ke panggung internasional.
          </p>
          <blockquote className="mt-6 border-l-2 border-terracotta pl-4 text-sm italic text-stone-700">
            “Menyatu dengan hangatnya mentari, deburan ombak, dan hembusan angin pesisir.” — {siteConfig.brand.name}
          </blockquote>
          <Link
            href="/collections/beach-bags"
            className="mt-6 inline-flex rounded-full bg-ocean px-6 py-3 text-sm font-medium text-white hover:bg-[#0f2e2c] transition shadow-sm"
          >
            Lihat Koleksi Tas Pantai
          </Link>
        </div>
      </section>

      <div className="mt-14 rounded-2xl bg-ocean p-8 text-center text-white md:p-12 shadow-sm">
        <p className="font-display text-2xl md:text-3xl leading-tight">
          “Garam, matahari, dan karya yang menyatu dengan alam.”
        </p>
        <p className="mt-3 text-sm text-white/80">— {siteConfig.brand.name} Journal</p>
      </div>

      <div className="mt-8 rounded-2xl border border-sand-200 bg-white p-8 text-center md:p-10 shadow-sm">
        <h3 className="font-display text-2xl text-charcoal">Ingin Berkonsultasi atau Melihat Koleksi?</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-stone-600">
          Kunjungi galeri kami di {siteConfig.brand.address} atau gunakan AI Chatbot kami untuk panduan belanja dan info produk.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/collections/shop-all"
            className="rounded-full bg-ocean px-6 py-3 text-sm font-medium text-white hover:bg-[#0f2e2c] transition shadow-sm"
          >
            Buka Katalog Koleksi
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-sand-200 bg-sand-50 px-6 py-3 text-sm font-medium hover:border-ocean transition"
          >
            Info Kontak & Lokasi
          </Link>
        </div>
        <div className="mx-auto mt-6 max-w-md">
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
