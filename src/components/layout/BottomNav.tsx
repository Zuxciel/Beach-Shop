"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/collections/shop-all", label: "Koleksi", icon: "shop" },
  { href: "/pages/lookbook", label: "Lookbook", icon: "look" },
  { href: "/contact", label: "Kontak", icon: "contact" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around border-t border-sand-200 bg-cream/95 backdrop-blur-lg px-2 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {items.map((it) => {
        const active =
          it.href === "/"
            ? pathname === "/"
            : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`flex flex-col items-center justify-center gap-0.5 rounded-xl px-4 py-1.5 transition-colors ${
              active ? "text-ocean" : "text-stone-400 active:text-stone-600"
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={active ? 2 : 1.5}
              className="transition-all"
            >
              {it.icon === "home" && <path d="M3 10 12 3l9 7v10H3V10Z" />}
              {it.icon === "shop" && (
                <>
                  <path d="M6 7h14l-1 10H7L6 7Z" />
                  <path d="M9 7V5a3 3 0 0 1 6 0v2" />
                </>
              )}
              {it.icon === "look" && (
                <>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M8 12h8M12 8v8" />
                </>
              )}
              {it.icon === "contact" && (
                <>
                  <path d="M4 6h16v12H4z" />
                  <path d="M4 6l8 7 8-7" />
                </>
              )}
            </svg>
            <span className={`text-[10px] font-medium ${active ? "font-semibold" : ""}`}>
              {it.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
