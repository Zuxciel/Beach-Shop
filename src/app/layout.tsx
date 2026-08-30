import type { Metadata, Viewport } from "next";
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

const baseUrl = siteConfig.brand.url;
const siteName = siteConfig.brand.name;
const siteDescription =
  "Easthtic of Indonesia — katalog identitas ilustratif bertema pantai: 8 referensi koleksi tas, topi & sandal untuk gambaran umum. Foto & deskripsi ilustrasi, konfirmasi via WhatsApp.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a4d4a",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteName} — ${siteConfig.brand.tagline}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Easthtic",
    "Easthtic of Indonesia",
    "tas pantai",
    "topi pantai",
    "sandal pantai",
    "kerajinan pantai Bali",
    "anyaman rotan",
    "katalog koleksi Bali",
    "tas anyaman",
    "easthtic.my.id",
  ],
  authors: [{ name: siteName, url: baseUrl }],
  creator: siteName,
  publisher: siteName,
  category: "Shopping",
  classification: "Katalog Koleksi Bertema Pantai",
  applicationName: siteName,
  referrer: "origin-when-cross-origin",
  formatDetection: { email: true, address: true, telephone: true },
  alternates: {
    canonical: "/",
    languages: { "id-ID": baseUrl },
  },
  verification: {
    google: "_8GsHZWfa6fVT7DMhQIseWJytDjUKCb20psN",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: baseUrl,
    siteName,
    title: `${siteName} — ${siteConfig.brand.tagline}`,
    description: siteDescription,
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteName} — Koleksi Kerajinan Pantai`,
      },
      {
        url: `${baseUrl}/img/Beach1.jpg`,
        width: 1200,
        height: 800,
        alt: `Koleksi Easthtic — foto katalog pantai Bali`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — ${siteConfig.brand.tagline}`,
    description: siteDescription,
    images: [`${baseUrl}/og-image.jpg`],
    creator: `@${siteConfig.brand.instagram}`,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: siteConfig.brand.name,
    alternateName: siteConfig.brand.shortName,
    url: siteConfig.brand.url,
    logo: `${siteConfig.brand.url}/icon.png`,
    image: `${siteConfig.brand.url}/og-image.jpg`,
    description: siteDescription,
    email: siteConfig.brand.email,
    telephone: siteConfig.brand.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.brand.address,
      addressLocality: "Kuta",
      addressRegion: "Bali",
      addressCountry: "ID",
    },
    sameAs: [`https://instagram.com/${siteConfig.brand.instagram}`],
    openingHours: "Mo-Sa 09:00-18:00",
    priceRange: "IDR 180000 - IDR 550000",
    currenciesAccepted: "IDR",
    paymentAccepted: "Cash, WhatsApp",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brand.name,
    url: siteConfig.brand.url,
    inLanguage: "id-ID",
    publisher: { "@type": "Organization", name: siteConfig.brand.name, logo: `${siteConfig.brand.url}/icon.png` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.brand.url}/collections/shop-all?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="id" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://picsum.photos" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
      </head>
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </body>
    </html>
  );
}
