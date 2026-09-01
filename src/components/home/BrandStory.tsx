import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function BrandStory() {
  return (
    <section className="bg-white border-y border-sand-200">
      <div className="mx-auto max-w-[1400px] px-3.5 max-[360px]:px-2.5 sm:px-6 lg:px-8 py-10 max-[360px]:py-8 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-100 card-elevated">
            <Image
              src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop"
              alt="Kerajinan anyaman alami — Aesthetic of Indonesia"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
          <div className="md:pl-6 lg:pl-8">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">Cerita & Identitas</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl leading-tight text-charcoal">
              Terinspirasi Keindahan <br className="hidden sm:inline" />
              <span className="italic text-terracotta-dark">Pantai & Tradisi Bali</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-5 sm:leading-6 text-stone-600">
              {siteConfig.brand.name} lahir dari apresiasi mendalam terhadap keindahan alam pesisir dan kepiawaian perajin anyaman tradisional. Kami menghadirkan katalog visual tas pantai rotan, topi pelindung surya, dan sandal kasual yang mengutamakan bahan alami serta kenyamanan.
            </p>
            <ul className="mt-5 space-y-2.5 text-xs sm:text-sm text-stone-700">
              <li className="flex gap-2.5 items-start">
                <span className="h-5 w-5 rounded-full bg-sand-100 text-ocean flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                <span>Anyaman rotan alami, serat daun pandan, dan jerami ramah lingkungan</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="h-5 w-5 rounded-full bg-sand-100 text-ocean flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                <span>Desain tropis estetik yang fleksibel untuk berbagai momen liburan</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="h-5 w-5 rounded-full bg-sand-100 text-ocean flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                <span>Konsultasi produk dan rekomendasi gaya langsung via AI Chatbot</span>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
              <Link
                href="/pages/lookbook"
                className="inline-flex h-10 sm:h-11 items-center justify-center rounded-full btn-premium px-5 sm:px-6 text-xs sm:text-sm font-medium text-white shadow-sm"
              >
                Lihat Lookbook
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-10 sm:h-11 items-center justify-center rounded-full border border-sand-200 bg-white px-5 sm:px-6 text-xs sm:text-sm font-medium hover:border-ocean hover:text-ocean transition"
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
