"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  const openChat = () => {
    window.dispatchEvent(
      new CustomEvent("open-aesthetic-chat", {
        detail: { message: "Halo! Saya ingin konsultasi rekomendasi koleksi tas dan aksesori pantai Aesthetic of Indonesia." },
      })
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#faf7f2]">
      {/* Background Image with bespoke editorial gradient */}
      <div className="absolute inset-0 select-none">
        <Image
          src="/img/Beach1.jpg"
          alt="Pantai Bali dengan tas anyaman Aesthetic of Indonesia"
          fill
          priority
          className="object-cover object-center scale-[1.02]"
          sizes="100vw"
        />
        {/* Multilayered cinematic gradient: clear text legibility while keeping sea vibrancy */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f2] via-[#faf7f2]/70 to-[#faf7f2]/30 md:bg-gradient-to-r md:from-[#faf7f2] md:via-[#faf7f2]/85 md:to-transparent" />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      <div className="relative mx-auto flex min-h-[560px] max-w-[1400px] items-center px-4 sm:px-6 lg:px-12 py-16 sm:py-24 md:min-h-[640px]">
        <div className="max-w-xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-300/80 bg-sand-50/90 px-3.5 py-1 backdrop-blur-sm shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal/80">
              Koleksi Pesisir Bali • 2026
            </span>
          </div>

          {/* Hero Typography */}
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[68px] font-normal leading-[0.95] tracking-tight text-charcoal">
            Aesthetic
            <span className="block italic text-terracotta-dark font-light mt-1">
              of Indonesia
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base font-normal leading-relaxed text-stone-700 max-w-lg">
            Kurasi karya anyaman tas pantai, topi jerami, dan sandal pesisir berbahan rotan alami yang memadukan tradisi perajin lokal Bali dengan keanggunan gaya liburan tropis.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/collections/shop-all"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ocean px-8 text-sm font-medium text-white shadow-md shadow-ocean/20 transition-all duration-200 hover:bg-[#0f2422] hover:shadow-lg"
            >
              <span>Jelajahi Koleksi</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <button
              onClick={openChat}
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-sand-300 bg-sand-50/90 px-7 text-sm font-medium text-charcoal shadow-xs backdrop-blur-sm transition-all duration-200 hover:bg-white hover:border-ocean/40"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Tanya AI Asisten</span>
            </button>
          </div>

          {/* Key Trust & Highlight Badges */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-sand-300/60 pt-5 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-semibold text-charcoal">08</span>
              <span className="tracking-wide">Koleksi Pilihan</span>
            </div>
            <div className="hidden sm:block text-sand-300">•</div>
            <div className="flex items-center gap-2">
              <span className="text-terracotta">✦</span>
              <span className="tracking-wide">100% Serat Alami Bali</span>
            </div>
            <div className="hidden sm:block text-sand-300">•</div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600">●</span>
              <span className="tracking-wide">Layanan Chat 24 Jam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
