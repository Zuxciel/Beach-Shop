import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStory } from "@/components/home/BrandStory";
import { UgcGrid } from "@/components/home/UgcGrid";
import { siteConfig } from "@/lib/site-config";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
  description:
    "Aesthetic of Indonesia — katalog koleksi tas, topi, dan sandal pantai berbahan anyaman alami yang terinspirasi dari keindahan Bali. Tanyakan info produk via AI Chatbot.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    description:
      "Katalog koleksi kerajinan tas, topi, dan sandal pantai Aesthetic of Indonesia. Konsultasi langsung via asisten AI.",
    url: siteConfig.brand.url,
    type: "website",
    images: [
      {
        url: `${siteConfig.brand.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Aesthetic of Indonesia — Katalog Kerajinan Pantai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    description: "Katalog koleksi kerajinan pantai Aesthetic of Indonesia khas Bali.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />

      {/* Identitas Brand & Interaksi Chatbot */}
      <section className="bg-white border-y border-sand-200">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
                Identitas & Kurasi
              </p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl leading-tight">
                Aesthetic <span className="italic text-terracotta-dark">of Indonesia</span>
              </h2>
              <p className="mt-4 text-sm leading-6 text-stone-600">
                Situs ini menghadirkan kurasi 8 karya kerajinan bertema pantai sebagai representasi keahlian perajin lokal Bali. Mulai dari tas anyaman rotan bulat, tote bahu pandan, topi pelindung surya, hingga sandal empuk tepi laut.
              </p>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                Gunakan asisten virtual kami untuk mencari rekomendasi produk yang cocok dengan gaya liburan Anda atau tanyakan informasi bahan dan lokasi toko.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/collections/shop-all"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-ocean px-7 text-sm font-medium text-white hover:bg-[#0f2e2c] transition shadow-sm"
                >
                  Jelajahi Koleksi
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-sand-200 bg-white px-7 text-sm font-medium hover:border-ocean transition"
                >
                  Lokasi & Kontak
                </Link>
              </div>
              <div className="mt-6 flex gap-6 text-xs text-stone-500">
                <span>8 Koleksi Unggulan</span>
                <span>•</span>
                <span>Kerajinan Tradisional Bali</span>
                <span>•</span>
                <span>AI Chatbot 24 Jam</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="h-32 rounded-2xl bg-sand-100 flex items-center justify-center text-sm font-medium text-stone-600 border border-sand-200">
                  Rotan Alami
                </div>
                <div className="h-40 rounded-2xl bg-ocean text-white flex flex-col items-center justify-center p-4 text-center shadow-sm">
                  <p className="font-display text-3xl font-light">8</p>
                  <p className="text-xs tracking-wider uppercase mt-1">
                    Koleksi
                    <br />
                    Katalog
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-40 rounded-2xl bg-sand-200 flex items-center justify-center text-sm font-medium text-stone-700 border border-sand-300">
                  Daun Pandan
                </div>
                <div className="h-32 rounded-2xl bg-sand-100 flex items-center justify-center text-sm font-medium text-stone-600 border border-sand-200">
                  Serat Jerami
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrandStory />
      <UgcGrid />

      {/* Newsletter */}
      <section className="border-y border-sand-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 lg:px-8 flex flex-col items-center text-center">
          <p className="font-display text-2xl md:text-3xl">{siteConfig.newsletter.title}</p>
          <p className="mt-2 text-sm text-stone-600 max-w-xl">{siteConfig.newsletter.subtitle}</p>
          <div className="mt-6 w-full max-w-md">
            <NewsletterForm placeholder={siteConfig.newsletter.placeholder} />
          </div>
          <p className="mt-2 text-xs text-stone-500">Dapatkan kabar koleksi dan cerita terbaru dari Bali.</p>
        </div>
      </section>

      {/* JSON-LD ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${siteConfig.brand.name} — Katalog Koleksi Pantai`,
            itemListElement: [
              { "@type": "ListItem", position: 1, url: `${siteConfig.brand.url}/products/round-beach-bag`, name: "Round Beach Bag" },
              { "@type": "ListItem", position: 2, url: `${siteConfig.brand.url}/products/beach-bag-shoulder`, name: "Beach Bag Shoulder" },
              { "@type": "ListItem", position: 3, url: `${siteConfig.brand.url}/products/oval-beach-hat`, name: "Oval Beach Hat" },
              { "@type": "ListItem", position: 4, url: `${siteConfig.brand.url}/products/flip-flop-beach-sandals`, name: "Flip Flop Beach Sandals" },
              { "@type": "ListItem", position: 5, url: `${siteConfig.brand.url}/products/beach-sandals-slip-on`, name: "Beach Sandals Slip On" },
              { "@type": "ListItem", position: 6, url: `${siteConfig.brand.url}/products/retro-beach-bag`, name: "Retro Beach Bag" },
              { "@type": "ListItem", position: 7, url: `${siteConfig.brand.url}/products/simple-retro-beach-bag`, name: "Simple Retro Beach Bag" },
              { "@type": "ListItem", position: 8, url: `${siteConfig.brand.url}/products/straw-basket-bag`, name: "Straw Basket Bag" },
            ],
          }),
        }}
      />
    </>
  );
}
