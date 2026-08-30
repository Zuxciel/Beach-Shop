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

      <div className="relative mx-auto flex min-h-[480px] max-[400px]:min-h-[440px] max-w-[1400px] items-center px-3 max-[400px]:px-3 sm:px-4 py-10 max-[400px]:py-8 sm:py-16 md:min-h-[640px] md:px-6 lg:px-8 md:py-20">
        <div className="max-w-[600px] min-w-0 w-full">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/90 px-2.5 max-[400px]:px-2 py-1 text-[10px] max-[400px]:text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-ocean shadow-sm backdrop-blur max-w-full">
            <span className="truncate">Katalog Koleksi • Bali Inspired</span>
          </p>
          <h1 className="mt-3 sm:mt-4 font-display font-light leading-[0.9] tracking-[-0.03em] text-charcoal text-[32px] max-[400px]:text-[28px] sm:text-[42px] md:text-[64px] break-words">
            Aesthetic
            <span className="block font-normal italic text-terracotta-dark">of Indonesia</span>
          </h1>
          <p className="mt-2 sm:mt-3 font-medium text-xs max-[400px]:text-xs sm:text-sm tracking-wide text-stone-700 break-words">
            {siteConfig.brand.tagline}
          </p>
          <p className="mt-2 sm:mt-3 max-w-[500px] text-sm max-[400px]:text-[13px] leading-5 sm:leading-6 text-stone-700/90 break-words">
            Kurasi karya anyaman tas pantai, topi, dan sandal bernuansa alami yang memadukan tradisi perajin lokal Bali dengan estetika liburan modern.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col max-[400px]:flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3">
            <Link href="/collections/shop-all" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto px-6 sm:px-8 shadow-sm text-sm sm:text-base">
                Lihat Koleksi
              </Button>
            </Link>
            <button
              onClick={openChat}
              className="inline-flex h-11 sm:h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-charcoal/15 bg-white/85 px-6 sm:px-8 text-sm font-medium backdrop-blur hover:bg-white transition-colors shadow-sm text-charcoal"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
              Tanya AI Asisten
            </button>
          </div>
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-stone-600">
            <span className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-terracotta shrink-0" /> 8 Koleksi Pilihan
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-ocean shrink-0" /> AI Chatbot Aktif
            </span>
            <span className="hidden md:flex items-center gap-2 whitespace-nowrap">
              <span className="h-2 w-2 rounded-full bg-stone-400" /> Pengrajin Bali
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
