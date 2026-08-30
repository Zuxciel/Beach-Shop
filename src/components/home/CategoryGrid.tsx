import Image from "next/image";
import Link from "next/link";

const tiles = [
  { handle: "beach-bags", title: "Tas Pantai", subtitle: "Ilustrasi 5 Koleksi", image: "/img/RBag.jpg", alt: "Ilustrasi tas pantai Easthtic — foto katalog" },
  { handle: "footwear", title: "Sandal Pantai", subtitle: "Ilustrasi 2 Koleksi", image: "/img/Foot1.jpeg", alt: "Ilustrasi sandal pantai Easthtic — foto katalog" },
  { handle: "sun-hats", title: "Topi Pantai", subtitle: "Ilustrasi 1 Koleksi", image: "/img/OBHat.jpeg", alt: "Ilustrasi topi pantai oval Easthtic — foto katalog" },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-6 lg:px-8 md:py-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">Kategori Easthtic</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">Jelajahi Koleksi</h2>
        </div>
        <Link href="/collections/shop-all" className="hidden text-sm font-medium underline decoration-sand-300 underline-offset-4 hover:decoration-ocean md:block">Lihat semua →</Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {tiles.map((t) => (
          <Link key={t.handle} href={`/collections/${t.handle}`} className="group relative overflow-hidden rounded-2xl bg-sand-100 aspect-[4/5] md:aspect-[3/4]">
            <Image src={t.image} alt={t.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/80">{t.subtitle}</p>
              <h3 className="font-display text-2xl text-white">{t.title}</h3>
              <span className="mt-3 inline-flex h-9 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-charcoal opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">Lihat →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
