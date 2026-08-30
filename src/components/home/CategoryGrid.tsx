import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const tiles = [
  {
    handle: "beach-bags",
    title: "Tas Pantai",
    subtitle: "5 Koleksi Anyaman",
    image: "/img/RBag.jpg",
    alt: `Tas Pantai ${siteConfig.brand.name}`,
  },
  {
    handle: "footwear",
    title: "Sandal Pantai",
    subtitle: "2 Koleksi Nyaman",
    image: "/img/Foot1.jpeg",
    alt: `Sandal Pantai ${siteConfig.brand.name}`,
  },
  {
    handle: "sun-hats",
    title: "Topi Pantai",
    subtitle: "Koleksi Pelindung UV",
    image: "/img/OBHat.jpeg",
    alt: `Topi Pantai ${siteConfig.brand.name}`,
  },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-3 max-[400px]:px-3 sm:px-4 py-10 max-[400px]:py-8 sm:py-14 md:px-6 lg:px-8 md:py-20 overflow-hidden">
      <div className="flex items-end justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark truncate">
            Kategori {siteConfig.brand.shortName}
          </p>
          <h2 className="mt-1.5 sm:mt-2 font-display text-2xl max-[400px]:text-xl sm:text-3xl md:text-4xl text-charcoal break-words">Jelajahi Koleksi</h2>
        </div>
        <Link
          href="/collections/shop-all"
          className="hidden shrink-0 text-sm font-medium underline decoration-sand-300 underline-offset-4 hover:decoration-ocean md:block"
        >
          Lihat semua katalog →
        </Link>
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
        {tiles.map((t) => (
          <Link
            key={t.handle}
            href={`/collections/${t.handle}`}
            className="group relative overflow-hidden rounded-2xl bg-sand-100 aspect-[4/5] max-[400px]:aspect-[3/4] md:aspect-[3/4] shadow-sm min-w-0"
          >
            <Image
              src={t.image}
              alt={t.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/80 truncate">
                {t.subtitle}
              </p>
              <h3 className="font-display text-xl sm:text-2xl text-white break-words">{t.title}</h3>
              <span className="mt-2 sm:mt-3 inline-flex h-8 sm:h-9 items-center justify-center rounded-full bg-white px-4 sm:px-5 text-xs sm:text-sm font-medium text-charcoal opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow">
                Lihat Koleksi →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
