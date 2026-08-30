import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function BrandStory() {
  return (
    <section className="bg-white border-y border-sand-200">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-100">
            <Image
              src="/img/Beach1.jpg"
              alt="Suasana pantai Bali — Aesthetic of Indonesia"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
          <div className="md:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">Cerita & Identitas</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl leading-tight">
              Terinspirasi Keindahan <br />
              <span className="italic text-terracotta-dark">Pantai & Tradisi Bali</span>
            </h2>
            <p className="mt-4 text-sm leading-6 text-stone-600">
              {siteConfig.brand.name} lahir dari apresiasi mendalam terhadap keindahan alam pesisir dan kepiawaian perajin anyaman tradisional. Kami menghadirkan katalog visual tas pantai rotan, topi pelindung surya, dan sandal kasual yang mengutamakan bahan alami serta kenyamanan.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-stone-700">
              <li className="flex gap-3">
                <span className="h-6 w-6 rounded-full bg-sand-100 text-ocean flex items-center justify-center text-xs font-bold">✓</span>
                Anyaman rotan alami, serat daun pandan, dan jerami ramah lingkungan
              </li>
              <li className="flex gap-3">
                <span className="h-6 w-6 rounded-full bg-sand-100 text-ocean flex items-center justify-center text-xs font-bold">✓</span>
                Desain tropis estetik yang fleksibel untuk berbagai momen liburan
              </li>
              <li className="flex gap-3">
                <span className="h-6 w-6 rounded-full bg-sand-100 text-ocean flex items-center justify-center text-xs font-bold">✓</span>
                Konsultasi produk dan rekomendasi gaya langsung via AI Chatbot
              </li>
            </ul>
            <div className="mt-8 flex gap-3">
              <Link
                href="/pages/lookbook"
                className="inline-flex h-11 items-center justify-center rounded-full bg-ocean px-6 text-sm font-medium text-white hover:bg-[#0f2e2c] transition"
              >
                Lihat Lookbook
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-full border border-sand-200 bg-white px-6 text-sm font-medium hover:border-ocean transition"
              >
                Kontak & Lokasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
