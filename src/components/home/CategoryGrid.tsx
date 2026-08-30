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
    <section className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
            Kategori Aesthetic
          </p>
          <h2 className="mt-1 font-display text-3xl md:text-4xl text-charcoal">Jelajahi Koleksi</h2>
        </div>
        <Link
          href="/collections/shop-all"
          className="text-xs font-medium text-charcoal hover:text-ocean underline underline-offset-4"
        >
          Lihat semua katalog →
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.handle}
            href={`/collections/${cat.handle}`}
            className="group relative overflow-hidden rounded-2xl bg-sand-100 aspect-[4/5] shadow-sm"
          >
            <Image
              src={cat.image}
              alt={cat.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-xs font-medium uppercase tracking-wider text-white/80">{cat.subtitle}</p>
              <h3 className="font-display text-2xl text-white">{cat.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
