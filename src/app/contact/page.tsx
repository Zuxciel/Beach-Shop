import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: `Kontak | ${siteConfig.brand.name}`,
  description: `Hubungi ${siteConfig.brand.name} — alamat ${siteConfig.brand.address}, email ${siteConfig.brand.email}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Kontak | ${siteConfig.brand.name}`,
    description: `Alamat ${siteConfig.brand.address}, email ${siteConfig.brand.email}, Instagram @${siteConfig.brand.instagram}`,
    url: `${siteConfig.brand.url}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  const hours = siteConfig.brand.operationalHours;

  return (
    <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
          Informasi & Bantuan
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal">
          Kontak Toko
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Silakan hubungi kami melalui formulir pesan di bawah ini atau kunjungi lokasi kami untuk informasi katalog produk.
        </p>
      </div>

      {/* Grid: Contact Info & Form */}
      <div className="mt-12 grid gap-8 lg:grid-cols-12">
        {/* Left Column: Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-sand-200 bg-white p-6 shadow-xs">
            <h2 className="font-display text-xl text-charcoal">
              Lokasi & Alamat
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              {siteConfig.brand.address}
            </p>

            <div className="mt-6 pt-6 border-t border-sand-100 space-y-3 text-sm text-stone-600">
              <div>
                <span className="block text-xs font-medium text-stone-400 uppercase tracking-wider">Email</span>
                <a href={`mailto:${siteConfig.brand.email}`} className="text-charcoal hover:text-ocean transition-colors font-medium">
                  {siteConfig.brand.email}
                </a>
              </div>

              <div>
                <span className="block text-xs font-medium text-stone-400 uppercase tracking-wider">Instagram</span>
                <a
                  href={`https://instagram.com/${siteConfig.brand.instagram}`}
                  target="_blank"
                  rel="noopener"
                  className="text-charcoal hover:text-ocean transition-colors font-medium"
                >
                  @{siteConfig.brand.instagram}
                </a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-sand-100">
              <span className="block text-xs font-medium text-stone-400 uppercase tracking-wider">Jam Operasional</span>
              <div className="mt-2 space-y-1 text-sm text-stone-600">
                <p>{hours.weekdays}</p>
                <p>{hours.weekend}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-sand-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-display text-xl text-charcoal">
              Kirim Pesan
            </h2>
            <p className="mt-1 text-xs text-stone-500">
              Tuliskan pertanyaan Anda mengenai ketersediaan stok atau informasi katalog.
            </p>

            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="mt-12 rounded-xl overflow-hidden border border-sand-200 bg-white shadow-xs">
        <div className="px-6 py-3.5 bg-sand-50 border-b border-sand-200 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-charcoal">
            Peta Lokasi
          </span>
          <span className="text-xs text-stone-500">{siteConfig.brand.address}</span>
        </div>
        <div className="relative h-64 sm:h-80 w-full">
          <iframe
            src={siteConfig.brand.mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Peta Lokasi ${siteConfig.brand.name}`}
          />
        </div>
      </div>
    </div>
  );
}
