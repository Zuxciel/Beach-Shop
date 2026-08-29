import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { lookbookItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Lookbook — Editorial Coastal Stories | Coastal Aesthetic",
  description: "Editorial lookbook: sun-bleached linen, straw & suede styled for golden hour. Discover the coastal aesthetic.",
  alternates: { canonical: "/pages/lookbook" },
};

export default function LookbookPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">Editorial</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Lookbook</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          Slow mornings, salty air, linen shadows — a visual diary of our coastal essentials. Each story links to the pieces that inspired it.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {lookbookItems.map((item, idx) => (
          <article key={item.id} className={`group relative overflow-hidden rounded-2xl bg-sand-100 ${idx === 0 ? "md:row-span-2" : ""}`}>
            <div className={`relative ${idx === 0 ? "aspect-[3/4] md:aspect-[3/4]" : "aspect-[4/3]"}`}>
              <Image src={item.imageUrl} alt={item.altText} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 50vw" loading={idx < 2 ? "eager" : "lazy"} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h2 className="font-display text-2xl text-white">{item.title}</h2>
                {item.description && <p className="mt-1 text-sm text-white/80">{item.description}</p>}
                {item.products && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.products.map((h) => (
                      <Link key={h} href={`/products/${h}`} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-charcoal hover:bg-sand-50">
                        Shop {h.replace(/-/g, " ")} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-ocean p-8 text-center text-white md:p-12">
        <h3 className="font-display text-2xl">Want the full story?</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/80">Sign up for our journal — monthly dispatches from the coast, styling notes, and early access to small-batch drops.</p>
        <form className="mx-auto mt-6 flex max-w-md gap-2" action="#">
          <input placeholder="Your email" type="email" className="flex-1 rounded-full px-5 py-3 text-sm text-charcoal outline-none" />
          <button className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white hover:bg-terracotta-dark">Join</button>
        </form>
      </div>
    </div>
  );
}
