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
    <div className="mx-auto max-w-[1000px] px-3 max-[360px]:px-2.5 sm:px-6 py-6 sm:py-8 md:py-12 pb-24 sm:pb-12 overflow-hidden">
      {/* Page Header */}
      <div className="text-center sm:text-left">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
          Kontak & Informasi Toko
        </p>
        <h1 className="mt-1.5 font-display text-2xl sm:text-3xl md:text-4xl text-charcoal">{siteConfig.brand.name}</h1>
        <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
          Katalog koleksi kerajinan tas, topi, dan sandal bertema pantai. Hubungi kami melalui formulir di bawah atau konsultasi langsung dengan asisten chat kami.
        </p>
      </div>

      {/* Info Cards Grid */}
      <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2">
        {/* Alamat & Kontak */}
        <div className="rounded-2xl border border-sand-200 bg-white p-4 max-[360px]:p-3.5 sm:p-6 card-elevated flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sand-100 text-ocean text-xs font-bold shrink-0">
                📍
              </span>
              <h2 className="font-semibold text-xs sm:text-sm text-charcoal">Alamat Galeri & Workshop</h2>
            </div>
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-stone-600">
              {siteConfig.brand.address}
            </p>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-sand-100">
              <h3 className="font-semibold text-[11px] sm:text-xs uppercase tracking-wider text-stone-500">Saluran Komunikasi</h3>
              <div className="mt-2 space-y-1.5 text-xs sm:text-sm text-stone-600">
                <p className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] sm:text-xs font-medium text-stone-400">Email:</span>
                  <a href={`mailto:${siteConfig.brand.email}`} className="text-ocean hover:underline font-medium break-all">
                    {siteConfig.brand.email}
                  </a>
                </p>
                <p className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] sm:text-xs font-medium text-stone-400">Instagram:</span>
                  <a
                    href={`https://instagram.com/${siteConfig.brand.instagram}`}
                    target="_blank"
                    rel="noopener"
                    className="text-ocean hover:underline font-medium"
                  >
                    @{siteConfig.brand.instagram}
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-sand-100">
              <h3 className="font-semibold text-[11px] sm:text-xs uppercase tracking-wider text-stone-500">Jam Operasional</h3>
              <div className="mt-2 text-xs sm:text-sm text-stone-600 space-y-1">
                <p>• {hours.weekdays}</p>
                <p>• {hours.weekend}</p>
                <p className="text-xs text-ocean font-medium mt-1">✓ {hours.notes}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 pt-4 border-t border-sand-100">
            <a
              href={`mailto:${siteConfig.brand.email}`}
              className="inline-flex items-center justify-center rounded-full border border-sand-200 bg-sand-50 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-medium hover:border-ocean transition text-charcoal flex-1 sm:flex-initial text-center"
            >
              Kirim Email
            </a>
            <Link
              href="/collections/shop-all"
              className="inline-flex items-center justify-center rounded-full btn-premium px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-medium text-white shadow-sm flex-1 sm:flex-initial text-center"
            >
              Lihat Koleksi
            </Link>
          </div>
        </div>

        {/* AI Chatbot Info */}
        <div className="rounded-2xl border border-sand-200 bg-sand-50 p-4 max-[360px]:p-3.5 sm:p-6 card-elevated flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ocean text-xs font-bold shadow-xs shrink-0">
                💬
              </span>
              <h2 className="font-semibold text-xs sm:text-sm text-charcoal">Layanan Asisten Virtual</h2>
            </div>
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-stone-600">
              Butuh informasi cepat mengenai bahan produk, saran perawatan anyaman rotan, atau rekomendasi padu-padan tas pantai? Asisten kami siap membantu.
            </p>

            <div className="mt-4 sm:mt-5">
              <h3 className="font-semibold text-[11px] sm:text-xs uppercase tracking-wider text-stone-500">Topik yang Bisa Ditanyakan</h3>
              <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="text-ocean mt-0.5 font-bold shrink-0">✓</span>
                  <span>Rekomendasi tas, topi, dan sandal pantai</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ocean mt-0.5 font-bold shrink-0">✓</span>
                  <span>Detail bahan (rotan, pandan, jerami) & perawatan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ocean mt-0.5 font-bold shrink-0">✓</span>
                  <span>Estimasi harga & info ketersediaan katalog</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ocean mt-0.5 font-bold shrink-0">✓</span>
                  <span>Alamat lengkap dan rute galeri fisik di Bali</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-5 sm:mt-6 rounded-xl bg-white p-3.5 sm:p-4 border border-sand-200">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-500">Pemberitahuan</p>
            <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-stone-600">
              Layanan nomor telepon sementara dialihkan. Anda dapat mengirimkan pesan melalui formulir atau konsultasi langsung melalui tombol chat di pojok kanan bawah.
            </p>
          </div>
        </div>
      </div>

      {/* Form & Newsletter */}
      <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-sand-200 bg-white p-4 max-[360px]:p-3.5 sm:p-6 card-elevated">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sand-100 text-ocean text-xs font-bold shrink-0">
              ✉️
            </span>
            <h2 className="font-semibold text-xs sm:text-sm text-charcoal">Kirim Pesan ke Tim Kami</h2>
          </div>
          <p className="mt-1.5 text-xs text-stone-500 leading-relaxed">
            Formulir pesan ini akan langsung terhubung ke database dan ditindaklanjuti oleh tim kami.
          </p>
          <div className="mt-3.5">
            <ContactForm />
          </div>
        </div>

        <div className="rounded-2xl border border-sand-200 bg-sand-50 p-4 max-[360px]:p-3.5 sm:p-6 card-elevated flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ocean text-xs font-bold shadow-xs shrink-0">
                📬
              </span>
              <h2 className="font-semibold text-xs sm:text-sm text-charcoal">Daftar Kabar Koleksi</h2>
            </div>
            <p className="mt-1.5 text-xs text-stone-500 leading-relaxed">
              Dapatkan informasi kurasi produk baru dan cerita budaya pesisir Bali.
            </p>
            <div className="mt-3.5">
              <NewsletterForm placeholder="Email Anda" />
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-white/80 p-3.5 sm:p-4 border border-sand-200 text-xs text-stone-500">
            <p className="font-medium text-charcoal text-xs sm:text-sm">Privasi Terjaga</p>
            <p className="mt-0.5 text-[11px] sm:text-xs">Email Anda hanya akan digunakan untuk pengiriman kabar katalog koleksi Aesthetic of Indonesia.</p>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="mt-6 sm:mt-8 rounded-2xl overflow-hidden border border-sand-200 bg-white card-elevated">
        <div className="px-4 sm:px-5 py-3 sm:py-3.5 bg-sand-50 border-b border-sand-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-charcoal">
            Peta Lokasi Galeri
          </p>
          <span className="text-[11px] sm:text-xs text-stone-500 break-words">{siteConfig.brand.address}</span>
        </div>
        <div className="relative h-56 sm:h-80 w-full">
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
