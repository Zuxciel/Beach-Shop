import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const categories = [
  {
    handle: "beach-bags",
    title: "Tas Anyaman Pantai",
    subtitle: "5 Koleksi Rotan & Pandan",
    image: "/img/RBag.jpg",
    alt: `Koleksi Tas Pantai ${siteConfig.brand.name}`,
    tag: "Koleksi Utama",
  },
  {
    handle: "footwear",
    title: "Sandal Pesisir Tropis",
    subtitle: "2 Koleksi Nyaman & Empuk",
    image: "/img/Foot1.jpeg",
    alt: `Koleksi Sandal Pantai ${siteConfig.brand.name}`,
    tag: "Alas Kaki",
  },
  {
    handle: "sun-hats",
    title: "Topi Pelindung Surya",
    subtitle: "Serat Jerami Teduh UV",
    image: "/img/OBHat.jpeg",
    alt: `Koleksi Topi Pantai ${siteConfig.brand.name}`,
    tag: "Aksesori",
  },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12 py-16 sm:py-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-sand-200 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta-dark">
            Katalog Kategori
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal">
            Jelajahi Koleksi Anyaman
          </h2>
        </div>
        <Link
          href="/collections/shop-all"
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium uppercase tracking-wider text-charcoal hover:text-ocean transition-colors"
        >
          <span>Lihat Semua Koleksi</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Category Cards Grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
        {categories.map((cat, idx) => (
          <Link
            key={cat.handle}
            href={`/collections/${cat.handle}`}
            className="group relative flex flex-col overflow-hidden rounded-xl bg-sand-50 border border-sand-200/80 shadow-xs transition-all duration-300 hover:shadow-md hover:border-ocean/30"
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand-100">
              <Image
                src={cat.image}
                alt={cat.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading={idx === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/15 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Category Tag */}
              <div className="absolute top-4 left-4">
                <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-charcoal backdrop-blur-sm shadow-xs">
                  {cat.tag}
                </span>
              </div>

              {/* Bottom Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-sand-200">
                  {cat.subtitle}
                </p>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl text-white font-normal leading-tight">
                  {cat.title}
                </h3>
                
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-sand-100 opacity-90 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  <span>Buka Koleksi</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
