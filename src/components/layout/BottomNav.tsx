"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";

const items = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/collections/shop-all", label: "Shop", icon: "shop" },
  { href: "/pages/lookbook", label: "Lookbook", icon: "look" },
  { href: "/account", label: "Account", icon: "account" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { totalQuantity, openDrawer } = useCart();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex h-[64px] items-center justify-around border-t border-sand-200 bg-cream/95 backdrop-blur-md px-2 pb-safe md:hidden">
      {items.map((it) => {
        const active = pathname === it.href;
        return (
          <Link key={it.href} href={it.href} className={`flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-1.5 ${active ? "text-ocean" : "text-stone-500"}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4}>
              {it.icon === "home" && <path d="M3 10 12 3l9 7v10H3V10Z" />}
              {it.icon === "shop" && <><path d="M6 7h14l-1 10H7L6 7Z" /><path d="M9 7V5a3 3 0 0 1 6 0v2" /></>}
              {it.icon === "look" && <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 12h8M12 8v8" /></>}
              {it.icon === "account" && <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></>}
            </svg>
            <span className="text-[11px] font-medium tracking-wide">{it.label}</span>
          </Link>
        );
      })}
      <button onClick={openDrawer} className="relative flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-1.5 text-stone-500">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6 7h14l-1 10H7L6 7Z" /><path d="M9 7V5a3 3 0 0 1 6 0v2" /></svg>
        <span className="text-[11px] font-medium">Cart</span>
        {totalQuantity > 0 && <span className="absolute right-1 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-ocean px-1 text-[10px] font-bold text-white">{totalQuantity}</span>}
      </button>
    </nav>
  );
}
