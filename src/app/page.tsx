import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStory } from "@/components/home/BrandStory";
import { UgcGrid } from "@/components/home/UgcGrid";
import { siteConfig } from "@/lib/site-config";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { Metadata } from "next";

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
      <BrandStory />
      <UgcGrid />

      {/* Luxury Minimalist Newsletter Strip */}
      <section className="border-t border-sand-200 bg-[#f7f3eb] py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta-dark">
            Warta Katalog
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl text-charcoal">
            {siteConfig.newsletter.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            {siteConfig.newsletter.subtitle}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-md">
              <NewsletterForm placeholder={siteConfig.newsletter.placeholder} />
            </div>
          </div>
          <p className="mt-4 text-[11px] text-stone-400">
            Dapatkan pembaruan kurasi koleksi terbaru langsung ke email Anda.
          </p>
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
