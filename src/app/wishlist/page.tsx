import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { WishlistClient } from "./WishlistClient";

export const metadata: Metadata = {
  title: `Wishlist | ${siteConfig.brand.name}`,
  description: `Koleksi wishlist Anda di ${siteConfig.brand.name} — tersimpan lokal di browser.`,
  alternates: { canonical: "/wishlist" },
  openGraph: {
    title: `Wishlist | ${siteConfig.brand.name}`,
    description: `Wishlist tersimpan lokal — ${siteConfig.brand.name}`,
    url: `${siteConfig.brand.url}/wishlist`,
    type: "website",
  },
};

export default function WishlistPage() {
  return <WishlistClient />;
}
