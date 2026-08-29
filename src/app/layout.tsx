import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { BottomNav } from "@/components/layout/BottomNav";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Coastal Aesthetic — Sun-Bleached Beach Essentials",
    template: "%s | Coastal Aesthetic",
  },
  description:
    "Handcrafted straw bags, suede sandals & woven sun hats for slow, sun-filled escapes. Eco-friendly, breathable, boutique-coastal.",
  metadataBase: new URL("https://coastal-aesthetic.vercel.app"),
  openGraph: {
    title: "Coastal Aesthetic — Sun-Bleached Beach Essentials",
    description: "Straw bags, suede sandals & woven hats — handcrafted for the coast.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <BottomNav />
          {/* padding for bottom nav on mobile */}
          <div className="h-[64px] md:hidden" aria-hidden />
        </CartProvider>
      </body>
    </html>
  );
}
