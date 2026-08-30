import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: `Kontak & Lokasi | ${siteConfig.brand.name}`,
  description: `Hubungi ${siteConfig.brand.name} — alamat ${siteConfig.brand.address}, email ${siteConfig.brand.email}. Konsultasi koleksi pantai khas Bali via AI Chatbot.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Kontak & Lokasi | ${siteConfig.brand.name}`,
    description: `Alamat ${siteConfig.brand.address}, email ${siteConfig.brand.email}, Instagram @${siteConfig.brand.instagram}`,
    url: `${siteConfig.brand.url}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  const hours = siteConfig.brand.operationalHours;

  return (
    <div className="mx-auto max-w-[1000px] px-4 md:px-6 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
        Kontak & Informasi Toko
      </p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">{siteConfig.brand.name}</h1>
      <p className="mt-2 text-sm text-stone-600">
        Katalog koleksi kerajinan tas, topi, dan sandal bertema pantai. Hubungi kami melalui formulir di bawah atau konsultasi langsung dengan AI Chatbot 24 jam.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Detail Alamat & Kontak */}
        <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-medium text-base text-charcoal">Alamat Toko & Workshop</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              {siteConfig.brand.address}
              <br />
              Bali, Indonesia
            </p>

            <h3 className="mt-6 font-medium text-base text-charcoal">Saluran Komunikasi</h3>
            <p className="mt-2 text-sm text-stone-600">
              Email:{" "}
              <a href={`mailto:${siteConfig.brand.email}`} className="text-ocean underline font-medium">
                {siteConfig.brand.email}
              </a>
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Instagram:{" "}
              <a
                href={`https://instagram.com/${siteConfig.brand.instagram}`}
                target="_blank"
                rel="noopener"
                className="text-ocean underline font-medium"
              >
                @{siteConfig.brand.instagram}
              </a>
            </p>

            <h3 className="mt-6 font-medium text-base text-charcoal">Jam Operasional</h3>
            <div className="mt-2 text-sm text-stone-600 space-y-1">
              <p>• {hours.weekdays}</p>
              <p>• {hours.weekend}</p>
              <p className="text-xs text-ocean font-medium mt-1">✓ {hours.notes}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-sand-100">
            <a
              href={`mailto:${siteConfig.brand.email}`}
              className="inline-flex rounded-full border border-sand-200 bg-sand-50 px-6 py-2.5 text-sm font-medium hover:border-ocean transition"
            >
              Kirim Email
            </a>
            <Link
              href="/collections/shop-all"
              className="inline-flex rounded-full bg-ocean px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0f2e2c] transition shadow-sm"
            >
              Lihat Koleksi
            </Link>
          </div>
        </div>

        {/* Informasi Bantuan & AI Chatbot */}
        <div className="rounded-2xl border border-sand-200 bg-sand-50 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-medium text-base text-charcoal">Layanan Asisten Virtual</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Butuh info cepat mengenai bahan produk, saran perawatan anyaman rotan, atau rekomendasi padu-padan tas pantai? Asisten AI kami siap menjawab pertanyaan Anda secara instan.
            </p>

            <h3 className="mt-6 font-medium text-base text-charcoal">Topik yang Bisa Ditanyakan:</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-stone-600">
              <li className="flex items-center gap-2">
                <span className="text-ocean">▸</span> Rekomendasi tas, topi, dan sandal pantai
              </li>
              <li className="flex items-center gap-2">
                <span className="text-ocean">▸</span> Detail bahan (rotan, pandan, jerami) & cara merawat
              </li>
              <li className="flex items-center gap-2">
                <span className="text-ocean">▸</span> Estimasi harga & info ketersediaan katalog
              </li>
              <li className="flex items-center gap-2">
                <span className="text-ocean">▸</span> Alamat lengkap dan rute toko fisik di Bali
              </li>
            </ul>
          </div>

          <div className="mt-6 rounded-xl bg-white p-4 border border-sand-200">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">Pemberitahuan</p>
            <p className="mt-1 text-xs leading-5 text-stone-600">
              Layanan nomor telepon sementara sedang dialihkan. Anda dapat mengirimkan pertanyaan melalui formulir di bawah ini atau berkonsultasi langsung melalui tombol chat di pojok kanan bawah.
            </p>
          </div>
        </div>
      </div>

      {/* Form Kirim Pesan & Newsletter */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
          <h2 className="font-medium text-base text-charcoal">Kirim Pesan ke Tim Kami</h2>
          <p className="mt-1 text-xs text-stone-500">
            Formulir pesan ini akan langsung terhubung ke database dan ditindaklanjuti oleh tim kami.
          </p>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>

        <div className="rounded-2xl border border-sand-200 bg-sand-50 p-6 shadow-sm">
          <h2 className="font-medium text-base text-charcoal">Daftar Kabar Koleksi</h2>
          <p className="mt-1 text-xs text-stone-500">
            Dapatkan informasi kurasi produk baru dan cerita budaya Bali.
          </p>
          <div className="mt-4">
            <NewsletterForm placeholder="Email Anda" />
          </div>
        </div>
      </div>

      {/* Peta Lokasi Google Maps Real Embed */}
      <div className="mt-8 rounded-2xl overflow-hidden border border-sand-200 bg-white shadow-sm">
        <div className="p-4 bg-sand-50 border-b border-sand-200 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-charcoal">
            📍 Peta Lokasi — {siteConfig.brand.address}
          </p>
          <span className="text-xs text-stone-500">Bali, Indonesia</span>
        </div>
        <div className="relative h-72 w-full">
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
