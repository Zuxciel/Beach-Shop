import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function BrandStory() {
  return (
    <section className="bg-sand-50/40 border-b border-sand-200 py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Visual Composition with bespoke framing */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-sand-100 shadow-sm">
              <Image
                src="/img/Beach1.jpg"
                alt="Suasana pantai Bali — Aesthetic of Indonesia"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
            </div>

            {/* Editorial Floating Accent Card */}
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:right-6 max-w-[240px] sm:max-w-[280px] rounded-xl border border-sand-300/80 bg-sand-50/95 p-5 shadow-lg backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
                Filosofi Kerajinan
              </p>
              <p className="mt-1.5 font-display text-lg sm:text-xl text-charcoal leading-snug">
                “Karya anyaman tangan yang memuliakan serat alam Indonesia.”
              </p>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:pl-8 pt-6 sm:pt-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-sand-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
              Warisan & Tradisi
            </div>

            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-[1.05]">
              Terinspirasi dari Kehangatan <br />
              <span className="italic text-terracotta-dark font-light">Pesisir Pulau Dewata</span>
            </h2>

            <p className="mt-6 text-sm sm:text-base leading-relaxed text-stone-600">
              {siteConfig.brand.name} lahir dari apresiasi terhadap kearifan lokal perajin anyaman tradisional Bali. Setiap helai serat rotan alami, daun pandan hutan, dan jerami pesisir dirajut dengan ketelitian tinggi—menghasilkan karya yang ringan, tahan lama, dan berkarakter abadi.
            </p>

            {/* Material pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-sand-200 py-6">
              <div>
                <p className="font-display text-xl text-charcoal">Rotan Alami</p>
                <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                  Kekuatan serat alami Bali dengan fleksibilitas struktur anyaman bulat khas.
                </p>
              </div>
              <div>
                <p className="font-display text-xl text-charcoal">Daun Pandan</p>
                <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                  Tekstur halus, wangi alami, dan daya tahan istimewa untuk tas tote bahu.
                </p>
              </div>
              <div>
                <p className="font-display text-xl text-charcoal">Serat Jerami</p>
                <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                  Perlindungan teduh maksimal dari sinar surya dengan sirkulasi sejuk.
                </p>
              </div>
            </div>

            {/* Action Links */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/pages/lookbook"
                className="inline-flex h-11 items-center justify-center rounded-full bg-ocean px-7 text-xs sm:text-sm font-medium text-white shadow-xs hover:bg-[#0f2422] transition-colors"
              >
                Lihat Lookbook Editorial
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-full border border-sand-300 bg-white px-7 text-xs sm:text-sm font-medium text-charcoal hover:border-ocean transition-colors"
              >
                Lokasi Galeri & Workshop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
