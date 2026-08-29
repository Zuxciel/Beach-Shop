"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-sand-200 bg-sand-50">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-xl tracking-[0.2em]">COASTAL</p>
            <p className="text-sm tracking-[0.3em] text-stone-500">AESTHETIC</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-stone-600">
              Warm, sun-bleached essentials for beach-living. Straw bags, suede sandals & woven hats — handcrafted, eco-conscious.
            </p>
            <div className="mt-6 flex gap-3">
              {["instagram", "tiktok", "pinterest"].map((s) => (
                <a key={s} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-200 bg-white text-xs uppercase tracking-wide hover:border-ocean hover:text-ocean transition-colors">
                  {s.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest">Shop</h4>
            <ul className="mt-4 space-y-3 text-sm text-stone-600">
              <li><Link href="/collections/shop-all" className="hover:text-ocean">Shop All</Link></li>
              <li><Link href="/collections/beach-bags" className="hover:text-ocean">Beach Bags</Link></li>
              <li><Link href="/collections/footwear" className="hover:text-ocean">Footwear</Link></li>
              <li><Link href="/collections/sun-hats" className="hover:text-ocean">Sun Hats</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest">Help</h4>
            <ul className="mt-4 space-y-3 text-sm text-stone-600">
              <li><a href="#" className="hover:text-ocean">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-ocean">Sizing Guide</a></li>
              <li><a href="#" className="hover:text-ocean">Care Instructions</a></li>
              <li><a href="#" className="hover:text-ocean">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest">Stay sun-kissed</h4>
            <p className="mt-4 text-sm text-stone-600">Get 10% off your first order + early access to drops.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Your email" type="email" className="flex-1 rounded-full border border-sand-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-ocean" />
              <button type="submit" className="rounded-full bg-ocean px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0f2e2c]">Join</button>
            </form>
            <p className="mt-3 text-xs text-stone-500">By subscribing you agree to our Privacy Policy.</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-sand-200 pt-6 text-xs text-stone-500 md:flex-row">
          <p>© 2026 Coastal Aesthetic. All rights reserved. • Handcrafted with sun.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-charcoal">Privacy</a>
            <a href="#" className="hover:text-charcoal">Terms</a>
            <a href="#" className="hover:text-charcoal">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
