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

      <div className="relative mx-auto flex min-h-[480px] max-[400px]:min-h-[420px] max-w-[1400px] items-center px-4 max-[400px]:px-3 py-12 max-[400px]:py-10 md:min-h-[640px] md:px-6 lg:px-8 md:py-20">
        <div className="max-w-[600px]">
          <p className="animate-fade-in-up inline-flex items-center gap-2 rounded-full bg-white/90 px-3 max-[400px]:px-2.5 py-1 text-[10px] max-[400px]:text-[9px] sm:text-xs font-semibold uppercase tracking-widest text-ocean shadow-sm backdrop-blur">
            Katalog Koleksi • Bali Inspired
          </p>
          <h1 className="animate-fade-in-up delay-100 mt-4 max-[400px]:mt-3 font-display text-fluid-hero font-light tracking-[-0.03em] text-charcoal">
            Aesthetic
            <span className="block font-normal italic text-terracotta-dark">of Indonesia</span>
          </h1>
          <p className="animate-fade-in-up delay-200 mt-3 max-[400px]:mt-2 font-medium text-xs max-[400px]:text-[11px] sm:text-sm tracking-wide text-stone-700">
            {siteConfig.brand.tagline}
          </p>
          <p className="animate-fade-in-up delay-300 mt-3 max-[400px]:mt-2 max-w-[500px] text-[13px] max-[400px]:text-xs sm:text-[15px] leading-5 sm:leading-6 text-stone-700/90">
            Kurasi karya anyaman tas pantai, topi, dan sandal bernuansa alami yang memadukan tradisi perajin lokal Bali dengan estetika liburan modern.
          </p>
          <div className="animate-fade-in-up delay-400 mt-6 max-[400px]:mt-5 flex flex-wrap max-[400px]:flex-col gap-3 max-[400px]:gap-2.5">
            <Link href="/collections/shop-all">
              <Button size="lg" className="btn-premium px-8 shadow-sm max-[400px]:w-full max-[400px]:text-sm">
                Lihat Koleksi
              </Button>
            </Link>
            <button
              onClick={openChat}
              className="inline-flex h-12 max-[400px]:h-11 items-center justify-center gap-2 rounded-full border border-charcoal/15 bg-white/85 px-8 max-[400px]:px-6 text-sm max-[400px]:text-xs font-medium backdrop-blur hover:bg-white transition-colors shadow-sm text-charcoal max-[400px]:w-full"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Tanya AI Asisten
            </button>
          </div>
          <div className="animate-fade-in-up delay-500 mt-6 max-[400px]:mt-4 flex flex-wrap items-center gap-3 max-[400px]:gap-2 text-[11px] max-[400px]:text-[10px] sm:text-xs text-stone-600">
            <span className="flex items-center gap-1.5 max-[400px]:gap-1">
              <span className="h-2 w-2 max-[400px]:h-1.5 max-[400px]:w-1.5 rounded-full bg-terracotta" /> 8 Koleksi Pilihan
            </span>
            <span className="flex items-center gap-1.5 max-[400px]:gap-1">
              <span className="h-2 w-2 max-[400px]:h-1.5 max-[400px]:w-1.5 rounded-full bg-ocean" /> AI Chatbot Aktif
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-stone-400" /> Pengrajin Bali
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
