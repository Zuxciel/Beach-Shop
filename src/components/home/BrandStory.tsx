import Image from "next/image";
import Link from "next/link";

export function BrandStory() {
  return (
    <section className="bg-white border-y border-sand-200">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-100">
            <Image
              src="https://picsum.photos/seed/easthtic-story/1000/800"
              alt="Ilustrasi workshop bertema pantai — foto katalog"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
          <div className="md:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">Tentang Katalog</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl leading-tight">
              Terinspirasi <br />
              <span className="italic text-terracotta-dark">nuansa pantai</span>
            </h2>
            <p className="mt-4 text-sm leading-6 text-stone-600">
              Easthtic of Indonesia adalah katalog identitas bertema pantai. Foto & cerita di situs ini bersifat ilustratif untuk gambaran umum koleksi. Kami menampilkan referensi visual 8 koleksi bertema tas, topi, dan sandal — detail aktual seperti bahan, ukuran, dan ketersediaan dapat berbeda dan perlu dikonfirmasi.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-3"><span className="h-6 w-6 rounded-full bg-sand-100 flex items-center justify-center text-xs">✓</span> 8 referensi koleksi — foto ilustrasi katalog</li>
              <li className="flex gap-3"><span className="h-6 w-6 rounded-full bg-sand-100 flex items-center justify-center text-xs">✓</span> Nuansa rotan, pandan, jerami — ilustrasi dapat bervariasi</li>
              <li className="flex gap-3"><span className="h-6 w-6 rounded-full bg-sand-100 flex items-center justify-center text-xs">✓</span> Identitas toko — hubungi WhatsApp untuk info terbaru</li>
            </ul>
            <p className="mt-4 text-xs text-stone-500">*Ilustrasi tidak menjamin kesamaan 100% dengan produk aktual.</p>
            <div className="mt-8 flex gap-3">
              <Link href="/pages/lookbook" className="inline-flex h-11 items-center justify-center rounded-full bg-ocean px-6 text-sm font-medium text-white hover:bg-[#0f2e2c]">Lihat Lookbook</Link>
              <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-full border border-sand-200 bg-white px-6 text-sm font-medium hover:border-ocean">Hubungi Kami</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
