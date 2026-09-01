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

  // Helper acak biar output bervariasi tapi tetap simulasi (bukan AI beneran)
  const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const vary = (templates: string[]) => pick(templates);

  // Helper untuk mengambil kartu produk acak/variatif
  const mapProductToCard = (p: (typeof products)[0]): ProductCardData => ({
    handle: p.handle,
    title: p.title,
    price: formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode),
    currency: p.priceRange.minVariantPrice.currencyCode,
    material: p.material,
    imageUrl: p.featuredImage.url,
    category: p.category,
  });
  const shuffle = <T,>(a: T[]) => [...a].sort(() => 0.5 - Math.random()).slice(0, 3);

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

  // 2. Sapaan / Greeting — bervariasi
  if (
    cleanInput.match(
      /^(halo|hai|hi|hey|helo|pagi|selamat pagi|siang|selamat siang|sore|selamat sore|malam|selamat malam|assalamu|permisi|tes|ping)\b/i
    ) ||
    cleanInput === "halo" ||
    cleanInput === "hai"
  ) {
    const greetings = [
      `Halo! Selamat datang di **${brand}** 🌊.\n\nSaya **${siteConfig.chatbot.botName}**, asisten katalog. Mau cari tas, topi, atau sandal untuk liburan?`,
      `Hai! Senang Anda mampir ke **${brand}** 🌴\n\nSaya siap bantu rekomendasikan koleksi pantai yang pas — atau jelaskan bahan & perawatan anyaman.`,
      `Selamat datang di **${brand}**! 🌊\n\nTanya saja seputar koleksi 8 produk kami, stok, atau lokasi toko — saya jawab cepat (simulasi).`,
    ];
    const sugSets = [
      ["👜 Rekomendasi Tas Pantai", "👒 Koleksi Topi Anyaman", "🩴 Sandal Pantai Nyaman", "📍 Alamat & Jam Buka"],
      ["✨ Koleksi Terlaris", "🌿 Bahan Rotan & Pandan", "📍 Lokasi Kuta", "🛒 Cara Pesan"],
      ["👜 Lihat Tas Bulat", "👒 Topi Oval", "🩴 Flip Flop Nyaman", "💬 Tanya Stok"],
    ];
    return {
      text: vary(greetings),
      suggestions: pick(sugSets),
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
    const descs = [
      `Berikut **${directProductMatch.title}** untuk Anda:\n\n• **Kategori**: ${directProductMatch.productType}\n• **Material**: ${directProductMatch.material}\n• **Estimasi Harga**: ${formatPrice(directProductMatch.priceRange.minVariantPrice.amount, directProductMatch.priceRange.minVariantPrice.currencyCode)}\n\n*${directProductMatch.description}*\n\nFoto & harga ilustrasi katalog — detail aktual konfirmasi via chat.`,
      `**${directProductMatch.title}** — pilihan bertema pantai:\n\n• **Bahan**: ${directProductMatch.material}\n• **Tipe**: ${directProductMatch.productType}\n• **Harga**: ${formatPrice(directProductMatch.priceRange.minVariantPrice.amount, directProductMatch.priceRange.minVariantPrice.currencyCode)}\n\n*${directProductMatch.description}*`,
      `Info **${directProductMatch.title}** 🌴\n\n**Kategori** ${directProductMatch.productType} — **Bahan** ${directProductMatch.material}\n**Harga** ${formatPrice(directProductMatch.priceRange.minVariantPrice.amount, directProductMatch.priceRange.minVariantPrice.currencyCode)}\n\n_${directProductMatch.description}_`,
    ];
    return {
      text: vary(descs),
      suggestions: pick([
        [`📝 Pesan ${directProductMatch.title}`, "🌿 Info Bahan & Perawatan", "👜 Lihat Koleksi Lainnya"],
        [`💬 Tanya Stok ${directProductMatch.title}`, "✨ Rekomendasi Serupa", "📍 Lokasi Toko"],
        ["👜 Koleksi Tas", "👒 Topi", "🩴 Sandal"],
      ]),
      productCards: [mapProductToCard(directProductMatch), ...shuffle(products.filter((p) => p.handle !== directProductMatch.handle)).slice(0, 1).map(mapProductToCard)].slice(0, 2),
      actionLinks: [{ label: `Halaman ${directProductMatch.title}`, url: `/products/${directProductMatch.handle}` }],
    };
  }

  // 4. Kategori: Tas Pantai (Bags) — variasi
  if (
    cleanInput.includes("tas") ||
    cleanInput.includes("bag") ||
    cleanInput.includes("tote") ||
    cleanInput.includes("basket") ||
    cleanInput.includes("rotan")
  ) {
    const bagCards = shuffle(products.filter((p) => p.category === "bags")).map(mapProductToCard);
    const texts = [
      `👜 **Tas Pantai ${brand}** — 5 pilihan:\n\n• **Round Beach Bag** — bulat ikonik\n• **Shoulder** — tote bahu luas\n• **Retro / Simple Retro** — motif vintage\n• **Straw Basket** — keranjang piknik\n\nSemua ilustrasi katalog, cek detail via chat.`,
      `Tas pantai anyaman Bali 🌴 — **Round**, **Shoulder**, **Retro**, **Basket**.\n\nPilih yang paling pas untuk gaya liburan Anda. Mau yang bulat statement atau tote harian?`,
      `👜 **Rekomendasi Tas** — dari rotan bulat hingga keranjang jerami. Setiap tas bawa nuansa pantai Bali. Lihat kartu produk di bawah untuk detail.`,
    ];
    return {
      text: vary(texts),
      suggestions: pick([
        ["👜 Buka Katalog Tas", "👒 Lihat Topi Pantai", "🌿 Cara Merawat Anyaman"],
        ["✨ Tas Terlaris", "💬 Tanya Stok Tas", "📍 Lokasi"],
        ["👜 Round Beach Bag", "👜 Retro Beach Bag", "👜 Straw Basket"],
      ]),
      productCards: bagCards,
      actionLinks: [{ label: "Jelajahi Semua Tas", url: "/collections/beach-bags" }],
    };
  }

  // 5. Kategori: Topi Pantai (Hats) — variasi
  if (
    cleanInput.includes("topi") ||
    cleanInput.includes("hat") ||
    cleanInput.includes("oval") ||
    cleanInput.includes("sun hat") ||
    cleanInput.includes("pelindung matahari")
  ) {
    const hatCards = products.filter((p) => p.category === "hats").map(mapProductToCard);
    const texts = [
      `👒 **Oval Beach Hat** — anyaman jerami alami, teduh & sejuk. Cocok untuk foto pantai & jalan santai di Kuta.`,
      `Topi pantai oval 🌞 — serat jerami, sirkulasi udara, gaya tropis. Lihat koleksi topi di bawah.`,
      `👒 **Rekomendasi Topi** — Oval Beach Hat, brim lebar, nuansa Bali. Ilustrasi katalog, cek stok via chat.`,
    ];
    return {
      text: vary(texts),
      suggestions: pick([
        ["👒 Buka Koleksi Topi", "👜 Lihat Tas Pantai", "🩴 Lihat Sandal Pantai"],
        ["✨ Detail Oval Hat", "💬 Tanya Stok Topi", "📸 Lookbook"],
      ]),
      productCards: hatCards,
      actionLinks: [{ label: "Koleksi Topi Pantai", url: "/collections/sun-hats" }],
    };
  }

  // 6. Kategori: Sandal Pantai (Footwear) — variasi
  if (
    cleanInput.includes("sandal") ||
    cleanInput.includes("alas kaki") ||
    cleanInput.includes("flip flop") ||
    cleanInput.includes("slip on")
  ) {
    const shoeCards = shuffle(products.filter((p) => p.category === "footwear")).map(mapProductToCard);
    const texts = [
      `🩴 **Sandal Pantai** — *Flip Flop* empuk & *Slip On* selop anyaman, sol anti-selip, nyaman di pasir.`,
      `Langkah pantai Bali 🌊 — pilih **Flip Flop** santai atau **Slip On** praktis tanpa tali.`,
      `🩴 **Rekomendasi Sandal** — 2 pilihan: jepit fleksibel & selop anyaman. Lihat kartu di bawah.`,
    ];
    return {
      text: vary(texts),
      suggestions: pick([
        ["🩴 Buka Koleksi Sandal", "👜 Lihat Tas Pantai", "📍 Lokasi Toko"],
        ["✨ Sandal Terlaris", "💬 Tanya Stok Sandal", "👒 Topi Pantai"],
      ]),
      productCards: shoeCards,
      actionLinks: [{ label: "Jelajahi Sandal Pantai", url: "/collections/footwear" }],
    };
  }

  // 7. Alamat / Lokasi / Jam Operasional — variasi
  if (
    cleanInput.includes("alamat") ||
    cleanInput.includes("lokasi") ||
    cleanInput.includes("dimana") ||
    cleanInput.includes("buka jam") ||
    cleanInput.includes("jam buka") ||
    cleanInput.includes("jam operasional") ||
    cleanInput.includes("bali")
  ) {
    const texts = [
      `📍 **Lokasi & Jam ${brand}**\n\n• **Alamat**: ${address}\n• **Jam**: ${hours.weekdays} / ${hours.weekend}\n• ${hours.notes}`,
      `Galeri kami di **${address}** 🌴\nBuka **${hours.weekdays}**, **${hours.weekend}**. Chat AI 24 jam siap bantu.`,
      `📍 **${brand} — Kuta, Bali**\n${address}\n\n**Jam**: ${hours.weekdays}\n${hours.weekend}\n*${hours.notes}*`,
    ];
    return {
      text: vary(texts),
      suggestions: pick([
        ["🗺️ Buka Halaman Kontak", "👜 Jelajahi Katalog", "✉️ Form Pemesanan"],
        ["📍 Lihat Peta", "🕐 Jam Buka", "💬 Tanya Stok"],
      ]),
      actionLinks: [{ label: "Lihat Peta & Kontak", url: "/contact" }],
    };
  }

  // 8. Bahan & Perawatan — variasi
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
    const texts = [
      `🌿 **Bahan**: Rotan, pandan, jerami alami Bali.\n\n**Perawatan**: kuas debu, lap lembab jika kena air laut, angin-anginkan teduh, simpan kering berventilasi.`,
      `Anyaman alami 🌴 — rotan kuat, pandan lentur, jerami ringan.\nTips: jangan jemur langsung, simpan di tempat sejuk kering.`,
      `🌿 **Material**: serat alami pilihan.\nPerawatan: lap kering, hindari air berlebihan, simpan di rak berventilasi.`,
    ];
    return {
      text: vary(texts),
      suggestions: pick([
        ["👜 Lihat Koleksi Anyaman", "📸 Lihat Lookbook", "✉️ Form Pesanan"],
        ["🌿 Tips Merawat", "👒 Topi Jerami", "👜 Tas Rotan"],
      ]),
      actionLinks: [{ label: "Buka Lookbook", url: "/pages/lookbook" }],
    };
  }

  // 9. Harga, Beli, Order, Pemesanan — variasi
  if (
    cleanInput.includes("harga") ||
    cleanInput.includes("beli") ||
    cleanInput.includes("order") ||
    cleanInput.includes("pesan") ||
    cleanInput.includes("checkout") ||
    cleanInput.includes("promo") ||
    cleanInput.includes("diskon")
  ) {
    const texts = [
      `🛍️ **Harga**: mulai **Rp 75.000** (Sandal Slip On) s/d **Rp 250.000** (Tas Bulat) — estimasi katalog, cek stok via form.\nDiskon referensi 25% (umum) & 35% (tas bulat/bahu).`,
      `💰 **Estimasi**: 75k–250k. Silakan isi form pemesanan — tim cek ketersediaan & total akhir via chat.`,
      `🛍️ **Info Pesan**: harga katalog, bukan final. Klik *Form Pemesanan* di bawah, isi nama & email, tim proses cepat.`,
    ];
    return {
      text: vary(texts),
      suggestions: pick([
        ["📝 Buka Form Pemesanan", "👜 Semua Koleksi", "📍 Lokasi Toko"],
        ["💬 Tanya Harga Tas", "💬 Tanya Harga Sandal", "✉️ Kirim Pesan"],
      ]),
      showInquiryForm: true,
      actionLinks: [{ label: "Lihat Semua Koleksi", url: "/collections/shop-all" }],
    };
  }

  // 10. Saluran Kontak Resmi — variasi
  if (
    cleanInput.includes("kontak") ||
    cleanInput.includes("hubungi") ||
    cleanInput.includes("email") ||
    cleanInput.includes("instagram") ||
    cleanInput.includes("ig")
  ) {
    const texts = [
      `📞 **Kontak ${brand}**\n• **Email**: ${siteConfig.brand.email}\n• **IG**: @${siteConfig.brand.instagram}\n• **Alamat**: ${address}\n• **Chat AI**: 24 jam`,
      `Hubungi kami 💬\n**Email** ${siteConfig.brand.email}\n**IG** @${siteConfig.brand.instagram}\n**Alamat** ${address}`,
      `📧 **${brand}** — Email ${siteConfig.brand.email} | IG @${siteConfig.brand.instagram} | ${address}`,
    ];
    return {
      text: vary(texts),
      suggestions: pick([
        ["📝 Form Pemesanan", "🗺️ Halaman Kontak", "📸 Instagram @aesthetic.id"],
        ["✉️ Kirim Pesan", "📍 Lokasi", "👜 Koleksi"],
      ]),
      actionLinks: [{ label: "Halaman Kontak", url: "/contact" }],
    };
  }

  // 11. Lookbook — variasi
  if (
    cleanInput.includes("lookbook") ||
    cleanInput.includes("inspirasi") ||
    cleanInput.includes("gaya") ||
    cleanInput.includes("ootd")
  ) {
    const texts = [
      `✨ **Lookbook ${brand}** — 4 cerita visual *golden hour* Bali: Bulat & Matahari, Teduh Oval, Langkah Pantai, Retro.`,
      `📸 **Inspirasi Gaya Pantai** — lihat Lookbook untuk padu-padan tas, topi, sandal di pasir & ombak.`,
      `Lookbook 🌊 — kurasi foto pantai Bali untuk ide OOTD liburan. Klik buka Lookbook.`,
    ];
    return {
      text: vary(texts),
      suggestions: pick([
        ["📸 Buka Lookbook", "👜 Lihat Koleksi Tas", "👒 Topi Pantai"],
        ["✨ Cerita 01", "✨ Cerita 03", "👜 Semua Koleksi"],
      ]),
      actionLinks: [{ label: "Buka Halaman Lookbook", url: "/pages/lookbook" }],
    };
  }

  // 12. Terima Kasih / Penutup — variasi
  if (
    cleanInput.includes("terima kasih") ||
    cleanInput.includes("makasih") ||
    cleanInput.includes("thanks") ||
    cleanInput.includes("oke") ||
    cleanInput.includes("siap")
  ) {
    const texts = [
      `Sama-sama! Senang bantu di **${brand}** 🌊. Mau lihat tas, topi, atau sandal lagi?`,
      `Terima kasih kembali 🙏 — kapan pun butuh rekomendasi pantai, chat saja!`,
      `Siap! 🌴 Tim ${brand} siap bantu lagi. Pilih koleksi atau tanya stok.`,
    ];
    return {
      text: vary(texts),
      suggestions: pick([
        ["👜 Rekomendasi Tas", "👒 Koleksi Topi", "🩴 Koleksi Sandal"],
        ["✨ Koleksi Terlaris", "📍 Alamat Toko", "💬 Tanya Stok"],
      ]),
      actionLinks: [{ label: "Buka Semua Koleksi", url: "/collections/shop-all" }],
    };
  }

  // 13. Fallback — variasi
  const fallbacks = [
    {
      text: `Saya **${siteConfig.chatbot.botName}** — asisten katalog **${brand}** 🌊\n\nPilih topik di bawah atau ketik bebas (mis. "tas bulat 115k" atau "bahan rotan").`,
      suggestions: ["👜 Rekomendasi Tas Pantai", "👒 Koleksi Topi Anyaman", "🩴 Sandal Pantai Nyaman", "📝 Form Pemesanan / Konsultasi", "🌿 Bahan & Cara Perawatan", "📍 Alamat & Jam Buka"],
    },
    {
      text: `Hai! Saya bantu jelajahi **8 koleksi ${brand}** 🌴\n\nCoba ketik: "Topi oval", "sandal 75k", atau "alamat toko".`,
      suggestions: ["✨ Koleksi 115k", "👜 Tas 250k Diskon 35%", "🩴 Sandal 75k", "📸 Lookbook", "✉️ Kirim Pesan"],
    },
    {
      text: `Butuh rekomendasi? 🌊\n\nSaya simulasi AI katalog — jawab cepat seputar tas, topi, sandal, bahan, harga, atau lokasi. Pilih chip di bawah.`,
      suggestions: ["👜 Tas Pantai", "👒 Topi", "🩴 Sandal", "💬 Tanya Stok", "📍 Lokasi", "🌿 Perawatan"],
    },
  ];
  const picked = pick(fallbacks);
  return {
    text: picked.text,
    suggestions: picked.suggestions,
    actionLinks: [
      { label: "Buka Semua Koleksi", url: "/collections/shop-all" },
      { label: "Halaman Kontak", url: "/contact" },
    ],
  };
}
