import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { ChatbotWidget } from "@/components/chat/ChatbotWidget";
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
  "Aesthetic of Indonesia — katalog koleksi kerajinan tas, topi, dan sandal bertema pantai yang terinspirasi dari keindahan alam Bali. Konsultasi langsung via AI Chatbot.";

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
    "Aesthetic of Indonesia",
    "Aesthetic",
    "tas pantai Bali",
    "topi pantai",
    "sandal pantai",
    "kerajinan anyaman rotan",
    "katalog pantai Bali",
    "tas anyaman Bali",
    "easthtic.my.id",
  ],
  authors: [{ name: siteName, url: baseUrl }],
  creator: siteName,
  publisher: siteName,
  category: "Shopping",
  classification: "Katalog Koleksi Kerajinan Pantai",
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
        alt: `Koleksi ${siteName} — Foto Pantai Bali`,
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
    telephone: siteConfig.brand.phone || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.brand.address,
      addressLocality: "Kuta",
      addressRegion: "Bali",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.brand.coordinates.lat,
      longitude: siteConfig.brand.coordinates.lng,
    },
    sameAs: [`https://instagram.com/${siteConfig.brand.instagram}`],
    openingHours: "Mo-Sa 09:00-18:00",
    priceRange: "IDR 180000 - IDR 550000",
    currenciesAccepted: "IDR",
    paymentAccepted: "Transfer Bank, Cash",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brand.name,
    url: siteConfig.brand.url,
    inLanguage: "id-ID",
    publisher: {
      "@type": "Organization",
      name: siteConfig.brand.name,
      logo: `${siteConfig.brand.url}/icon.png`,
    },
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
        <Footer />
        {/* Bottom nav spacer — only on mobile, matches BottomNav height */}
        <div className="h-16 md:hidden" aria-hidden />
        <BottomNav />
        <ChatbotWidget />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
