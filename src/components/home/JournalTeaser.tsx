import Image from "next/image";
import Link from "next/link";

const posts = [
  { slug: "packing-for-a-week-in-linen", title: "Packing for a Week in Linen", excerpt: "How to live from a straw tote for 7 sun-filled days.", image: "https://picsum.photos/seed/journal-1/600/400", tag: "Journal" },
  { slug: "why-palm-straw-breathes", title: "Why Palm Straw Breathes", excerpt: "The botany behind the weave — and why it matters.", image: "https://picsum.photos/seed/journal-2/600/400", tag: "Materials" },
  { slug: "sandals-that-mold-to-you", title: "Sandals That Mold to You", excerpt: "Suede, cork and 2000 steps to your perfect fit.", image: "https://picsum.photos/seed/journal-3/600/400", tag: "Craft" },
];

export function JournalTeaser() {
  return (
    <section className="bg-sand-50 border-b border-sand-200">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-14 md:py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">Coastal Journal</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Slow Living Notes</h2>
          </div>
          <Link href="/pages/lookbook" className="hidden md:inline-flex text-sm font-medium underline decoration-sand-300 underline-offset-4 hover:decoration-ocean">View all stories →</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href="/pages/lookbook" className="group rounded-2xl overflow-hidden bg-white border border-sand-200">
              <div className="relative aspect-[3/2] overflow-hidden bg-sand-100">
                <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px)100vw,33vw" loading="lazy" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-terracotta-dark">{post.tag}</p>
                <h3 className="mt-1 font-display text-lg leading-tight group-hover:text-ocean transition-colors">{post.title}</h3>
                <p className="mt-1 text-sm text-stone-600 line-clamp-2">{post.excerpt}</p>
                <span className="mt-3 inline-block text-xs font-semibold text-ocean">Read story →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
