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
    "Easthtic of Indonesia — katalog identitas bertema pantai: ilustrasi 8 koleksi untuk referensi visual. Foto ilustrasi, hubungi WhatsApp untuk cek ketersediaan aktual.",
};

export default function HomePage() {
  const wa = `https://wa.me/${siteConfig.brand.whatsapp}?text=Halo%20Easthtic%20saya%20ingin%20tanya%20koleksi`;

  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />

      {/* Identitas — bukan Shop The Look */}
      <section className="bg-white border-y border-sand-200">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">Identitas Toko</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl leading-tight">Easthtic <span className="italic text-terracotta-dark">of Indonesia</span></h2>
              <p className="mt-4 text-sm leading-6 text-stone-600">
                Situs ini hanya katalog identitas untuk pengenalan — bukan toko online dan bukan janji ketersediaan. 8 referensi koleksi ditampilkan sebagai ilustrasi bertema pantai.
              </p>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                Lihat halaman detail sebagai referensi visual, lalu hubungi WhatsApp untuk konfirmasi ketersediaan, detail bahan, dan estimasi terbaru.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={wa} target="_blank" rel="noopener" className="inline-flex h-11 items-center justify-center rounded-full bg-ocean px-7 text-sm font-medium text-white hover:bg-[#0f2e2c]">Chat WhatsApp</a>
                <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-full border border-sand-200 bg-white px-7 text-sm font-medium hover:border-ocean">Lihat Kontak & Alamat</Link>
              </div>
              <div className="mt-6 flex gap-6 text-xs text-stone-500">
                <span>8 referensi</span><span>•</span><span>Ilustrasi katalog</span><span>•</span><span>Konfirmasi via WA</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="h-32 rounded-2xl bg-sand-100 flex items-center justify-center text-sm text-stone-500">Ilustrasi Anyaman</div>
                <div className="h-40 rounded-2xl bg-ocean text-white flex flex-col items-center justify-center p-4 text-center">
                  <p className="font-display text-2xl">8</p>
                  <p className="text-xs">Referensi<br />Katalog</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-40 rounded-2xl bg-sand-200 flex items-center justify-center text-sm text-stone-600">Ilustrasi Pandan</div>
                <div className="h-32 rounded-2xl bg-sand-100 flex items-center justify-center text-sm text-stone-500">Ilustrasi Bahan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrandStory />
      <UgcGrid />

      {/* Newsletter — bekerja via /api/newsletter */}
      <section className="border-y border-sand-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 lg:px-8 flex flex-col items-center text-center">
          <p className="font-display text-2xl">{siteConfig.newsletter.title}</p>
          <p className="mt-2 text-sm text-stone-600 max-w-xl">{siteConfig.newsletter.subtitle}</p>
          <div className="mt-6 w-full max-w-md">
            <NewsletterForm placeholder={siteConfig.newsletter.placeholder} />
          </div>
          <p className="mt-2 text-xs text-stone-500">Katalog identitas — bukan newsletter promo belanja.</p>
        </div>
      </section>

      {/* JSON-LD for organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: siteConfig.brand.name,
            url: siteConfig.brand.url,
            logo: `${siteConfig.brand.url}/logo.png`,
            sameAs: [`https://instagram.com/${siteConfig.brand.instagram}`],
            address: siteConfig.brand.address,
          }),
        }}
      />
    </>
  );
}
