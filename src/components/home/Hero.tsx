"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  const openChat = () => {
    window.dispatchEvent(
      new CustomEvent("open-aesthetic-chat", {
        detail: { message: "Halo! Saya ingin tahu lebih banyak tentang koleksi tas dan topi pantai Aesthetic of Indonesia." },
      })
    );
  };

  return (
    <section className="relative overflow-hidden bg-sand-100">
      <div className="absolute inset-0">
        <Image
          src="/img/Beach1.jpg"
          alt="Pantai Bali dengan tas anyaman Aesthetic of Indonesia dan topi pantai"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdfbf7]/95 via-[#fdfbf7]/75 to-transparent md:from-[#fdfbf7]/85 md:via-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[520px] max-w-[1400px] items-center px-4 py-16 md:min-h-[640px] md:px-6 lg:px-8 md:py-20">
        <div className="max-w-[600px]">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-ocean shadow-sm backdrop-blur">
            Katalog Koleksi • Bali Inspired
          </p>
          <h1 className="mt-4 font-display text-[42px] font-light leading-[0.9] tracking-[-0.03em] text-charcoal md:text-[64px]">
            Aesthetic
            <span className="block font-normal italic text-terracotta-dark">of Indonesia</span>
          </h1>
          <p className="mt-3 font-medium text-sm tracking-wide text-stone-700">
            {siteConfig.brand.tagline}
          </p>
          <p className="mt-3 max-w-[500px] text-[15px] leading-6 text-stone-700/90">
            Kurasi karya anyaman tas pantai, topi, dan sandal bernuansa alami yang memadukan tradisi perajin lokal Bali dengan estetika liburan modern.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/collections/shop-all">
              <Button size="lg" className="px-8 shadow-sm">
                Lihat Koleksi
              </Button>
            </Link>
            <button
              onClick={openChat}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-charcoal/15 bg-white/85 px-8 text-sm font-medium backdrop-blur hover:bg-white transition-colors shadow-sm text-charcoal"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Tanya AI Asisten
            </button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-stone-600">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-terracotta" /> 8 Koleksi Pilihan
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-ocean" /> AI Chatbot Aktif
            </span>
            <span className="hidden md:flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-stone-400" /> Pengrajin Bali
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
