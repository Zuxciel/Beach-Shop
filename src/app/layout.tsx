import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { siteConfig } from "@/lib/site-config";

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
    default: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    template: `%s | ${siteConfig.brand.name}`,
  },
  description:
    "Easthtic of Indonesia — katalog identitas ilustratif bertema pantai: 8 referensi koleksi untuk gambaran umum. Foto & deskripsi ilustrasi, konfirmasi via WhatsApp.",
  metadataBase: new URL(siteConfig.brand.url),
  openGraph: {
    title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    description: "Katalog identitas Easthtic — ilustrasi referensi koleksi bertema pantai. Foto dapat berbeda dengan ketersediaan aktual.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <div className="border-t border-sand-200 bg-sand-50 px-4 py-3 text-center text-[11px] leading-4 text-stone-500">
          <p>Disclaimer: Seluruh foto, deskripsi, harga & diskon di situs ini bersifat ilustrasi katalog identitas, bukan penawaran mengikat. Detail aktual (bahan, warna, ukuran, ketersediaan, harga) dapat bervariasi. Hubungi WhatsApp untuk konfirmasi terbaru sebelum melakukan pemesanan atau kerjasama.</p>
        </div>
        <Footer />
        <BottomNav />
        <div className="h-[64px] md:hidden" aria-hidden />
      </body>
    </html>
  );
}
