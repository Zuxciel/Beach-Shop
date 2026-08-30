import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  const wa = `https://wa.me/${siteConfig.brand.whatsapp}?text=Halo%20Easthtic%20saya%20ingin%20tanya%20koleksi`;
  return (
    <section className="relative overflow-hidden bg-sand-100">
      <div className="absolute inset-0">
        <Image
          src="/img/Beach1.jpg"
          alt="Pantai Bali dengan tas anyaman Easthtic dan topi oval di cahaya matahari"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdfbf7]/90 via-[#fdfbf7]/60 to-transparent md:from-[#fdfbf7]/80 md:via-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[520px] max-w-[1400px] items-center px-4 py-16 md:min-h-[640px] md:px-6 lg:px-8 md:py-20">
        <div className="max-w-[580px]">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-ocean shadow-sm backdrop-blur">Katalog Identitas • Ilustrasi</p>
          <h1 className="mt-4 font-display text-[40px] font-light leading-[0.9] tracking-[-0.03em] text-charcoal md:text-[60px]">
            Easthtic
            <span className="block font-normal italic text-terracotta-dark">of Indonesia</span>
          </h1>
          <p className="mt-3 font-medium text-sm tracking-wide text-stone-700">Katalog referensi bertema pantai — ilustrasi 8 koleksi untuk gambaran umum</p>
          <p className="mt-3 max-w-[500px] text-[15px] leading-6 text-stone-700/90">
            Situs ini hanya katalog identitas untuk pengenalan koleksi. Foto & deskripsi bersifat ilustratif dan dapat berbeda dengan ketersediaan aktual. Hubungi WhatsApp untuk info terbaru sebelum memutuskan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/collections/shop-all">
              <Button size="lg" className="px-8">Lihat Koleksi</Button>
            </Link>
            <a href={wa} target="_blank" rel="noopener" className="inline-flex h-12 items-center justify-center rounded-full border border-charcoal/15 bg-white/80 px-8 text-sm font-medium backdrop-blur hover:bg-white transition-colors">
              Chat WhatsApp
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-stone-400" /> Ilustrasi katalog</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-stone-400" /> Tanya stok via WA</span>
            <span className="hidden md:flex items-center gap-2">Foto dapat berbeda</span>
          </div>
        </div>
      </div>
    </section>
  );
}
