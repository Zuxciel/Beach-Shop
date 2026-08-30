import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[600px] px-4 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">404 — Lost at sea</p>
      <h1 className="mt-3 font-display text-4xl leading-tight">This beach<br />doesn’t exist</h1>
      <p className="mt-4 text-sm leading-6 text-stone-600">The page you’re looking for drifted away. Let’s get you back to the coast.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="inline-flex h-11 items-center justify-center rounded-full bg-ocean px-8 text-sm font-medium text-white hover:bg-[#0f2e2c]">Back to home</Link>
        <Link href="/collections/shop-all" className="inline-flex h-11 items-center justify-center rounded-full border border-sand-200 bg-white px-8 text-sm font-medium hover:border-ocean">Shop collection</Link>
      </div>
      <div className="mt-10 rounded-2xl bg-sand-50 p-6 text-left">
        <p className="text-sm font-medium">Try these</p>
        <ul className="mt-3 space-y-2 text-sm">
          <li><Link href="/collections/beach-bags" className="hover:text-ocean underline">Beach Bags →</Link></li>
          <li><Link href="/collections/footwear" className="hover:text-ocean underline">Footwear →</Link></li>
          <li><Link href="/collections/sun-hats" className="hover:text-ocean underline">Sun Hats →</Link></li>
          <li><Link href="/pages/lookbook" className="hover:text-ocean underline">Lookbook →</Link></li>
        </ul>
      </div>
    </div>
  );
}
