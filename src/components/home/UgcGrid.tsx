import Image from "next/image";
import { ugcPosts } from "@/lib/data";

export function UgcGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-6 lg:px-8 md:py-20">
      <div className="flex flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">#CoastalAesthetic</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">Worn in the Wild</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
          Tag us on Instagram for a chance to be featured. Real customers, real sun — our community in linen, straw & suede.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {ugcPosts.map((post) => (
          <a key={post.id} href="#" className="group relative overflow-hidden rounded-2xl bg-sand-100 aspect-square">
            <Image src={post.imageUrl} alt={post.altText} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 50vw, 25vw" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 group-hover:translate-y-0 transition-transform">
              <p className="text-xs font-semibold text-white">{post.author}</p>
              <p className="text-[11px] text-white/80 line-clamp-2">{post.caption}</p>
            </div>
            <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-xs">♡</span>
          </a>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <a href="#" className="inline-flex h-11 items-center justify-center rounded-full border border-sand-200 bg-white px-6 text-sm font-medium hover:border-ocean hover:text-ocean">Follow @coastal.aesthetic</a>
      </div>

      {/* Typed interface note for future API */}
      <p className="mt-4 text-center text-xs text-stone-400">UGC data implements the <code className="rounded bg-sand-100 px-1 py-0.5">UGCPost[]</code> interface — wire to Instagram/UGC API when ready.</p>
    </section>
  );
}
