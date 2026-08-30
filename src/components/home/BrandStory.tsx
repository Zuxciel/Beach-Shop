import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function BrandStory() {
  return (
    <section className="bg-sand-50/50 border-b border-sand-200 py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          {/* Left: Image (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden rounded-xl bg-sand-100 border border-sand-200 shadow-xs">
              <Image
                src="/img/Beach1.jpg"
                alt="Suasana bertema pantai — Aesthetic of Indonesia"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Text (7 cols) */}
          <div className="lg:col-span-7 lg:pl-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
              Tentang Koleksi
            </span>

            <h2 className="mt-2 font-display text-3xl sm:text-4xl text-charcoal leading-tight">
              Karakter & Bahan Anyaman Pesisir
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-stone-600">
              {siteConfig.brand.name} menghadirkan katalog pilihan tas anyaman, topi pantai, dan sandal yang dirancang untuk melengkapi suasana santai di tepi pantai. Koleksi kami menggunakan ragam material seperti serat rotan, daun pandan, dan jerami.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-sand-200 pt-6">
              <div>
                <p className="font-display text-lg text-charcoal">Rotan</p>
                <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                  Struktur anyaman kokoh dengan bentuk bulat yang khas untuk gaya pantai.
                </p>
              </div>
              <div>
                <p className="font-display text-lg text-charcoal">Pandan</p>
                <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                  Serat lemas dan ringan, cocok untuk tas jinjing dan tote bahu sehari-hari.
                </p>
              </div>
              <div>
                <p className="font-display text-lg text-charcoal">Jerami</p>
                <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                  Material topi pelindung surya dengan sirkulasi udara yang nyaman.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/collections/shop-all"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-ocean px-6 text-xs font-medium uppercase tracking-wider text-white shadow-xs hover:bg-[#0f2422] transition-colors"
              >
                Lihat Semua Koleksi
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-sand-300 bg-white px-6 text-xs font-medium uppercase tracking-wider text-charcoal hover:border-ocean transition-colors"
              >
                Kontak Kami
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
