/**
 * Algoritma Simulasi AI Chatbot — Aesthetic of Indonesia
 * Dilengkapi Rich Text UI Output, Product Cards, & In-Chat Inquiry Form Triggers
 * Menjamin pemrosesan cepat tanpa membebani database.
 */

import { siteConfig } from "./site-config";
import { products, collections } from "./data";
import { formatPrice } from "./utils";

export interface ProductCardData {
  handle: string;
  title: string;
  price: string;
  currency: string;
  material?: string;
  imageUrl: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: number;
  suggestions?: string[];
  actionLinks?: { label: string; url: string }[];
  productCards?: ProductCardData[];
  showInquiryForm?: boolean;
  inquiryProduct?: { handle: string; title: string; price: string };
}

interface IntentResponse {
  text: string;
  suggestions: string[];
  actionLinks?: { label: string; url: string }[];
  productCards?: ProductCardData[];
  showInquiryForm?: boolean;
  inquiryProduct?: { handle: string; title: string; price: string };
}

export function processChatbotMessage(input: string, history: ChatMessage[] = []): IntentResponse {
  const cleanInput = input.trim().toLowerCase();
  const brand = siteConfig.brand.name;
  const address = siteConfig.brand.address;
  const hours = siteConfig.brand.operationalHours;

  // Helper untuk mengambil kartu produk
  const mapProductToCard = (p: (typeof products)[0]): ProductCardData => ({
    handle: p.handle,
    title: p.title,
    price: formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode),
    currency: p.priceRange.minVariantPrice.currencyCode,
    material: p.material,
    imageUrl: p.featuredImage.url,
    category: p.category,
  });

  // 1. Trigger Form Pemesanan / Tanya Stok Khusus
  if (
    cleanInput.startsWith("pesan ") ||
    cleanInput.startsWith("order ") ||
    cleanInput.includes("form pemesanan") ||
    cleanInput.includes("mau pesan") ||
    cleanInput.includes("mau order") ||
    cleanInput.includes("beli sekarang") ||
    cleanInput.includes("tanya stok untuk")
  ) {
    // Cari apakah ada nama produk yang disebutkan
    const matchedProduct = products.find(
      (p) => cleanInput.includes(p.title.toLowerCase()) || cleanInput.includes(p.handle.toLowerCase())
    );

    return {
      text: matchedProduct
        ? `Silakan isi data pemesanan/konsultasi untuk **${matchedProduct.title}** di formulir bawah ini. Tim kami akan mencatat data Anda ke panel pesanan resmi.`
        : `Silakan isi formulir pesanan/konsultasi berikut agar tim kami dapat memproses kebutuhan Anda:`,
      suggestions: ["👜 Lihat Koleksi Tas", "👒 Topi Anyaman", "📍 Lokasi Toko"],
      showInquiryForm: true,
      inquiryProduct: matchedProduct
        ? {
            handle: matchedProduct.handle,
            title: matchedProduct.title,
            price: formatPrice(
              matchedProduct.priceRange.minVariantPrice.amount,
              matchedProduct.priceRange.minVariantPrice.currencyCode
            ),
          }
        : undefined,
    };
  }

  // 2. Sapaan / Greeting
  if (
    cleanInput.match(
      /^(halo|hai|hi|hey|helo|pagi|selamat pagi|siang|selamat siang|sore|selamat sore|malam|selamat malam|assalamu|permisi|tes|ping)\b/i
    ) ||
    cleanInput === "halo" ||
    cleanInput === "hai"
  ) {
    return {
      text: `Halo! Selamat datang di **${brand}** 🌊.\n\nSaya **${siteConfig.chatbot.botName}**. Ada yang bisa saya bantu terkait koleksi tas pantai, topi anyaman, sandal, atau info toko kami?`,
      suggestions: [
        "👜 Rekomendasi Tas Pantai",
        "👒 Koleksi Topi Anyaman",
        "🩴 Sandal Pantai Nyaman",
        "📍 Alamat & Jam Buka",
      ],
      actionLinks: [{ label: "Buka Semua Koleksi", url: "/collections/shop-all" }],
    };
  }

  // 3. Pertanyaan Spesifik Produk Tertentu
  const directProductMatch = products.find(
    (p) =>
      cleanInput.includes(p.title.toLowerCase()) ||
      cleanInput.includes(p.handle.toLowerCase()) ||
      cleanInput.includes(p.handle.replace(/-/g, " "))
  );

  if (directProductMatch) {
    return {
      text: `Berikut informasi produk **${directProductMatch.title}**:\n\n• **Kategori**: ${directProductMatch.productType}\n• **Material**: ${directProductMatch.material}\n• **Estimasi Harga**: ${formatPrice(
        directProductMatch.priceRange.minVariantPrice.amount,
        directProductMatch.priceRange.minVariantPrice.currencyCode
      )}\n\n*${directProductMatch.description}*`,
      suggestions: [
        `📝 Pesan ${directProductMatch.title}`,
        "🌿 Info Bahan & Perawatan",
        "👜 Lihat Koleksi Lainnya",
      ],
      productCards: [mapProductToCard(directProductMatch)],
      actionLinks: [
        { label: `Halaman ${directProductMatch.title}`, url: `/products/${directProductMatch.handle}` },
      ],
    };
  }

  // 4. Kategori: Tas Pantai (Bags)
  if (
    cleanInput.includes("tas") ||
    cleanInput.includes("bag") ||
    cleanInput.includes("tote") ||
    cleanInput.includes("basket") ||
    cleanInput.includes("rotan")
  ) {
    const bagCards = products.filter((p) => p.category === "bags").slice(0, 3).map(mapProductToCard);

    return {
      text: `👜 **Koleksi Tas Pantai Pilihan ${brand}**\n\nDianyam dengan material alami khas Bali (rotan alami, serat daun pandan, dan jerami kokoh):\n\n• **Round Beach Bag** — Tas bulat rotan ikonik pantai.\n• **Beach Bag Shoulder** — Tote bahu luas & elegan.\n• **Straw Basket Bag** — Keranjang anyaman gaya vintage.`,
      suggestions: ["👜 Buka Katalog Tas", "👒 Lihat Topi Pantai", "🌿 Cara Merawat Anyaman"],
      productCards: bagCards,
      actionLinks: [{ label: "Jelajahi Semua Tas", url: "/collections/beach-bags" }],
    };
  }

  // 5. Kategori: Topi Pantai (Hats)
  if (
    cleanInput.includes("topi") ||
    cleanInput.includes("hat") ||
    cleanInput.includes("oval") ||
    cleanInput.includes("sun hat") ||
    cleanInput.includes("pelindung matahari")
  ) {
    const hatCards = products.filter((p) => p.category === "hats").map(mapProductToCard);

    return {
      text: `👒 **Koleksi Topi Pantai ${brand}**\n\n**Oval Beach Hat** dianyam dari serat jerami alami yang memberikan perlindungan teduh maksimal dari sinar UV dengan sirkulasi udara yang sejuk dan ringan.`,
      suggestions: ["👒 Buka Koleksi Topi", "👜 Lihat Tas Pantai", "🩴 Lihat Sandal Pantai"],
      productCards: hatCards,
      actionLinks: [{ label: "Koleksi Topi Pantai", url: "/collections/sun-hats" }],
    };
  }

  // 6. Kategori: Sandal Pantai (Footwear)
  if (
    cleanInput.includes("sandal") ||
    cleanInput.includes("alas kaki") ||
    cleanInput.includes("flip flop") ||
    cleanInput.includes("slip on")
  ) {
    const shoeCards = products.filter((p) => p.category === "footwear").map(mapProductToCard);

    return {
      text: `🩴 **Koleksi Sandal Pantai ${brand}**\n\nKenyamanan melangkah santai di tepi pantai:\n• **Flip Flop Beach Sandals** — Sandal jepit empuk dan fleksibel.\n• **Beach Sandals Slip On** — Sandal selop aksen anyaman dengan sol anti-selip.`,
      suggestions: ["🩴 Buka Koleksi Sandal", "👜 Lihat Tas Pantai", "📍 Lokasi Toko"],
      productCards: shoeCards,
      actionLinks: [{ label: "Jelajahi Sandal Pantai", url: "/collections/footwear" }],
    };
  }

  // 7. Alamat / Lokasi / Jam Operasional
  if (
    cleanInput.includes("alamat") ||
    cleanInput.includes("lokasi") ||
    cleanInput.includes("dimana") ||
    cleanInput.includes("buka jam") ||
    cleanInput.includes("jam buka") ||
    cleanInput.includes("jam operasional") ||
    cleanInput.includes("bali")
  ) {
    return {
      text: `📍 **Lokasi Galeri & Jam Operasional ${brand}**\n\n• **Alamat**: ${address}\n• **Jam Buka**:\n  - ${hours.weekdays}\n  - ${hours.weekend}\n• **Layanan Online**: ${hours.notes}`,
      suggestions: ["🗺️ Buka Halaman Kontak", "👜 Jelajahi Katalog", "✉️ Form Pemesanan"],
      actionLinks: [{ label: "Lihat Peta & Kontak", url: "/contact" }],
    };
  }

  // 8. Bahan & Perawatan (Materials & Care)
  if (
    cleanInput.includes("bahan") ||
    cleanInput.includes("material") ||
    cleanInput.includes("pandan") ||
    cleanInput.includes("jerami") ||
    cleanInput.includes("rawat") ||
    cleanInput.includes("perawatan") ||
    cleanInput.includes("cuci") ||
    cleanInput.includes("tahan air")
  ) {
    return {
      text: `🌿 **Material & Panduan Perawatan Anyaman Alami**\n\n• **Bahan Utama**: Rotan alami Bali, daun pandan pilihan, dan serat jerami ramah lingkungan.\n• **Tips Perawatan**:\n  1. Bersihkan pasir/debu dengan kuas halus atau lap kering.\n  2. Jika terkena cipratan air laut, lap dengan kain lembab lalu angin-anginkan di tempat teduh.\n  3. Simpan di tempat kering dan berventilasi baik.`,
      suggestions: ["👜 Lihat Koleksi Anyaman", "📸 Lihat Lookbook", "✉️ Form Pesanan"],
      actionLinks: [{ label: "Buka Lookbook", url: "/pages/lookbook" }],
    };
  }

  // 9. Harga, Beli, Order, Pemesanan
  if (
    cleanInput.includes("harga") ||
    cleanInput.includes("beli") ||
    cleanInput.includes("order") ||
    cleanInput.includes("pesan") ||
    cleanInput.includes("checkout") ||
    cleanInput.includes("promo") ||
    cleanInput.includes("diskon")
  ) {
    return {
      text: `🛍️ **Informasi Pemesanan & Harga**\n\n• Seluruh koleksi memiliki estimasi harga mulai dari **Rp 180.000** hingga **Rp 550.000**.\n• Anda dapat mengajukan pemesanan atau konsultasi ketersediaan langsung melalui formulir di chat ini!`,
      suggestions: ["📝 Buka Form Pemesanan", "👜 Semua Koleksi", "📍 Lokasi Toko"],
      showInquiryForm: true,
      actionLinks: [{ label: "Lihat Semua Koleksi", url: "/collections/shop-all" }],
    };
  }

  // 10. Saluran Kontak Resmi
  if (
    cleanInput.includes("kontak") ||
    cleanInput.includes("hubungi") ||
    cleanInput.includes("email") ||
    cleanInput.includes("instagram") ||
    cleanInput.includes("ig")
  ) {
    return {
      text: `📞 **Saluran Kontak Resmi ${brand}**\n\n• **Email**: ${siteConfig.brand.email}\n• **Instagram**: @${siteConfig.brand.instagram}\n• **Alamat**: ${address}\n• **Layanan Chat**: AI Assistant aktif 24 jam untuk konsultasi dan pencatatan pesanan.`,
      suggestions: ["📝 Form Pemesanan", "🗺️ Halaman Kontak", "📸 Instagram @aesthetic.id"],
      actionLinks: [{ label: "Halaman Kontak", url: "/contact" }],
    };
  }

  // 11. Lookbook
  if (
    cleanInput.includes("lookbook") ||
    cleanInput.includes("inspirasi") ||
    cleanInput.includes("gaya") ||
    cleanInput.includes("ootd")
  ) {
    return {
      text: `✨ **Lookbook Pantai ${brand}**\n\nKunjungi halaman **Lookbook** untuk melihat 4 kurasi cerita visual bernuansa *golden hour* di pesisir pantai Bali.`,
      suggestions: ["📸 Buka Lookbook", "👜 Lihat Koleksi Tas", "👒 Topi Pantai"],
      actionLinks: [{ label: "Buka Halaman Lookbook", url: "/pages/lookbook" }],
    };
  }

  // 12. Terima Kasih / Penutup
  if (
    cleanInput.includes("terima kasih") ||
    cleanInput.includes("makasih") ||
    cleanInput.includes("thanks") ||
    cleanInput.includes("oke") ||
    cleanInput.includes("siap")
  ) {
    return {
      text: `Sama-sama! Senang bisa membantu Anda di **${brand}** 🌊. Jangan ragu bertanya lagi jika butuh rekomendasi koleksi pantai lainnya.`,
      suggestions: ["👜 Rekomendasi Tas", "👒 Koleksi Topi", "🩴 Koleksi Sandal"],
      actionLinks: [{ label: "Buka Semua Koleksi", url: "/collections/shop-all" }],
    };
  }

  // 13. Fallback
  return {
    text: `Saya adalah **${siteConfig.chatbot.botName}** untuk **${brand}** 🌊.\n\nBerikut menu dan topik populer yang dapat Anda pilih:`,
    suggestions: [
      "👜 Rekomendasi Tas Pantai",
      "👒 Koleksi Topi Anyaman",
      "🩴 Sandal Pantai Nyaman",
      "📝 Form Pemesanan / Konsultasi",
      "🌿 Bahan & Cara Perawatan",
      "📍 Alamat & Jam Buka",
    ],
    actionLinks: [
      { label: "Buka Semua Koleksi", url: "/collections/shop-all" },
      { label: "Halaman Kontak", url: "/contact" },
    ],
  };
}
