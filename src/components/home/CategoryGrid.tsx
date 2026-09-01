import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const categories = [
  {
    handle: "beach-bags",
    title: "Tas Pantai",
    subtitle: "5 Koleksi Anyaman",
    image: "/img/RBag.jpg",
    alt: `Tas Pantai Anyaman — ${siteConfig.brand.name}`,
  },
  {
    handle: "footwear",
    title: "Sandal Pantai",
    subtitle: "2 Koleksi Nyaman",
    image: "/img/Foot1.jpeg",
    alt: `Sandal Pantai Kasual — ${siteConfig.brand.name}`,
  },
  {
    handle: "sun-hats",
    title: "Topi Pantai",
    subtitle: "Koleksi Pelindung UV",
    image: "/img/OBHat.jpeg",
    alt: `Topi Pantai Pelindung Sinar — ${siteConfig.brand.name}`,
  },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-3.5 max-[360px]:px-2.5 sm:px-6 lg:px-8 py-10 max-[360px]:py-8 md:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
        <div>
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
            Kategori Aesthetic
          </p>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl md:text-4xl text-charcoal">Jelajahi Koleksi</h2>
        </div>
        <Link
          href="/collections/shop-all"
          className="text-xs font-medium text-charcoal hover:text-ocean transition-colors link-underline-grow inline-block self-start sm:self-auto"
        >
          Lihat semua katalog →
        </Link>
      </div>

      <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.handle}
            href={`/collections/${cat.handle}`}
            className="group relative overflow-hidden rounded-2xl bg-sand-100 aspect-[16/10] sm:aspect-[4/5] card-elevated"
          >
            <Image
              src={cat.image}
              alt={cat.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-108"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity group-hover:opacity-90" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-white/80">{cat.subtitle}</p>
              <h3 className="font-display text-xl sm:text-2xl text-white mt-0.5">{cat.title}</h3>
              <span className="mt-2 inline-flex items-center text-xs font-medium text-white/90 gap-1 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                Eksplorasi <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
