import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ShopTheLook } from "@/components/home/ShopTheLook";
import { UgcGrid } from "@/components/home/UgcGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coastal Aesthetic — Sun-Bleached Beach Essentials",
  description:
    "Handcrafted straw bags, suede sandals & woven sun hats for slow, sun-filled escapes. Eco-friendly, breathable & lightweight. Free shipping over $50.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <ShopTheLook />
      <UgcGrid />

      {/* Newsletter / editorial strip */}
      <section className="border-y border-sand-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 lg:px-8 flex flex-col items-center text-center">
          <p className="font-display text-2xl">The sun doesn’t wait.</p>
          <p className="mt-2 text-sm text-stone-600 max-w-xl">Join our community for first access to limited drops, beach guides, and 10% off your first order.</p>
        </div>
      </section>

      {/* JSON-LD for organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Coastal Aesthetic",
            url: "https://coastal-aesthetic.vercel.app",
            logo: "https://coastal-aesthetic.vercel.app/logo.png",
            sameAs: ["https://instagram.com/coastal.aesthetic"],
          }),
        }}
      />
    </>
  );
}
