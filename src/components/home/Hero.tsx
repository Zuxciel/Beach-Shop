import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-sand-100">
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/hero-beach/1920/1080"
          alt="Sun-kissed beach at golden hour with linen textures and straw accessories in warm terracotta tones"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdfbf7]/90 via-[#fdfbf7]/60 to-transparent md:from-[#fdfbf7]/80 md:via-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[520px] max-w-[1400px] items-center px-4 py-16 md:min-h-[640px] md:px-6 lg:px-8 md:py-20">
        <div className="max-w-[560px]">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-ocean shadow-sm backdrop-blur">New • Summer ’26</p>
          <h1 className="mt-4 font-display text-[42px] font-light leading-[0.9] tracking-[-0.03em] text-charcoal md:text-[64px]">
            Embrace the
            <span className="block font-normal italic text-terracotta-dark">Sun-Kissed</span>
            Season
          </h1>
          <p className="mt-4 max-w-[460px] text-[15px] leading-6 text-stone-700 md:text-base">
            Straw totes, suede sandals & woven hats — handcrafted for slow mornings, salty air, and golden hour escapes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/collections/shop-all">
              <Button size="lg" className="px-8">Shop The Collection</Button>
            </Link>
            <Link href="/pages/lookbook" className="inline-flex h-12 items-center justify-center rounded-full border border-charcoal/15 bg-white/70 px-8 text-sm font-medium backdrop-blur hover:bg-white transition-colors">
              View Lookbook
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-6 text-xs">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-600" /> Eco-friendly materials</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-terracotta" /> Handcrafted</span>
            <span className="hidden md:flex items-center gap-2">Free shipping $50+</span>
          </div>
        </div>
      </div>
    </section>
  );
}
