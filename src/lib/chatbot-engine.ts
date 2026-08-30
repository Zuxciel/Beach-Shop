/**
 * Algoritma Simulasi AI Chatbot — Aesthetic of Indonesia
 * Menggunakan Natural Language Intent Matching & Rule-Based Heuristics
 * Menghasilkan respon cerdas, ramah, dan interaktif dengan action links & quick reply chips.
 */

import { siteConfig } from "./site-config";
import { products, collections } from "./data";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: number;
  suggestions?: string[];
  actionLinks?: { label: string; url: string }[];
}

interface IntentResponse {
  text: string;
  suggestions: string[];
  actionLinks?: { label: string; url: string }[];
}

export function processChatbotMessage(input: string, history: ChatMessage[] = []): IntentResponse {
  const cleanInput = input.trim().toLowerCase();
  const brand = siteConfig.brand.name;
  const address = siteConfig.brand.address;
  const hours = siteConfig.brand.operationalHours;

  // 1. Sapaan / Greeting
  if (
    cleanInput.match(
      /^(halo|hai|hi|hey|helo|pagi|selamat pagi|siang|selamat siang|sore|selamat sore|malam|selamat malam|assalamu|permisi|tes|ping)\b/i
    ) ||
    cleanInput === "halo" ||
    cleanInput === "hai"
  ) {
    return {
      text: `Halo! Selamat datang di **${brand}** 🌊.\n\nSaya **${siteConfig.chatbot.botName}**. Saya siap membantu Anda menemukan referensi tas pantai, topi anyaman, sandal pantai bertema Bali, info bahan, hingga lokasi toko kami. Ada yang ingin Anda tanyakan?`,
      suggestions: [
        "👜 Lihat Rekomendasi Tas",
        "👒 Koleksi Topi Pantai",
        "🩴 Rekomendasi Sandal",
        "📍 Alamat & Jam Buka",
      ],
      actionLinks: [{ label: "Buka Semua Koleksi", url: "/collections/shop-all" }],
    };
  }

  // 2. Pertanyaan Lokasi / Alamat / Jam Buka / Kunjungan
  if (
    cleanInput.includes("alamat") ||
    cleanInput.includes("lokasi") ||
    cleanInput.includes("dimana") ||
    cleanInput.includes("buka jam") ||
    cleanInput.includes("jam buka") ||
    cleanInput.includes("jam operasional") ||
    cleanInput.includes("kapan buka") ||
    cleanInput.includes("toko fisik") ||
    cleanInput.includes("offline") ||
    cleanInput.includes("bali")
  ) {
    return {
      text: `📍 **Lokasi Toko & Jam Operasional ${brand}**:\n\n• **Alamat**: ${address}\n• **Jam Operasional**:\n  - ${hours.weekdays}\n  - ${hours.weekend}\n• **Layanan Online**: ${hours.notes}\n\nAnda dapat melihat peta lokasi di halaman kontak kami.`,
      suggestions: ["🗺️ Buka Halaman Kontak", "👜 Lihat Koleksi Katalog", "✉️ Kirim Pesan"],
      actionLinks: [
        { label: "Lihat Peta & Kontak", url: "/contact" },
        { label: "Katalog Koleksi", url: "/collections/shop-all" },
      ],
    };
  }

  // 3. Pertanyaan Kategori: Tas Pantai (Bags)
  if (
    cleanInput.includes("tas") ||
    cleanInput.includes("bag") ||
    cleanInput.includes("tote") ||
    cleanInput.includes("basket") ||
    cleanInput.includes("round beach") ||
    cleanInput.includes("shoulder bag")
  ) {
    const bagProducts = products.filter((p) => p.category === "bags");
    const bagNames = bagProducts.map((p) => `• **${p.title}** (${p.material})`).join("\n");

    return {
      text: `👜 **Koleksi Tas Pantai ${brand}**:\n\nKami memiliki berbagai referensi tas pantai yang dianyam dengan material alami khas Bali (rotan, pandan, dan jerami):\n\n${bagNames}\n\nSetiap tas dirancang ringan, tahan pasir, dan sangat estetik untuk liburan pantai maupun outfit kasual.`,
      suggestions: [
        "👜 Buka Katalog Tas Pantai",
        "🌿 Info Bahan & Perawatan",
        "👒 Lihat Topi Pantai",
      ],
      actionLinks: [
        { label: "Jelajahi Tas Pantai", url: "/collections/beach-bags" },
        { label: "Lihat Lookbook", url: "/pages/lookbook" },
      ],
    };
  }

  // 4. Pertanyaan Kategori: Topi Pantai (Hats)
  if (
    cleanInput.includes("topi") ||
    cleanInput.includes("hat") ||
    cleanInput.includes("oval") ||
    cleanInput.includes("sun hat") ||
    cleanInput.includes("pelindung matahari")
  ) {
    return {
      text: `👒 **Koleksi Topi Pantai ${brand}**:\n\nKoleksi **Oval Beach Hat** kami dianyam dari serat jerami alami yang memberikan perlindungan maksimal dari sinar UV dengan sirkulasi udara yang sejuk dan bobot yang sangat ringan. Cocok dipadukan dengan gaun pantai atau santai di tepi laut.`,
      suggestions: ["👒 Buka Koleksi Topi", "👜 Lihat Tas Pantai", "🩴 Lihat Sandal Pantai"],
      actionLinks: [
        { label: "Lihat Koleksi Topi", url: "/collections/sun-hats" },
        { label: "Lihat Produk Oval Beach Hat", url: "/products/oval-beach-hat" },
      ],
    };
  }

  // 5. Pertanyaan Kategori: Sandal Pantai (Footwear)
  if (
    cleanInput.includes("sandal") ||
    cleanInput.includes("alas kaki") ||
    cleanInput.includes("flip flop") ||
    cleanInput.includes("slip on") ||
    cleanInput.includes("sepatu")
  ) {
    return {
      text: `🩴 **Koleksi Sandal Pantai ${brand}**:\n\nKami menghadirkan:\n• **Flip Flop Beach Sandals** — Ringan, fleksibel, dengan bantalan empuk yang nyaman menyusuri pasir pantai.\n• **Beach Sandals Slip On** — Desain strap anyaman alami elegan dengan sol anti-selip.`,
      suggestions: ["🩴 Buka Koleksi Sandal", "👜 Buka Koleksi Tas", "📍 Alamat Toko"],
      actionLinks: [{ label: "Jelajahi Sandal Pantai", url: "/collections/footwear" }],
    };
  }

  // 6. Pertanyaan Bahan & Cara Perawatan (Materials & Care)
  if (
    cleanInput.includes("bahan") ||
    cleanInput.includes("material") ||
    cleanInput.includes("rotan") ||
    cleanInput.includes("pandan") ||
    cleanInput.includes("jerami") ||
    cleanInput.includes("rawat") ||
    cleanInput.includes("perawatan") ||
    cleanInput.includes("cuci") ||
    cleanInput.includes("kena air") ||
    cleanInput.includes("tahan air")
  ) {
    return {
      text: `🌿 **Bahan & Panduan Perawatan Anyaman Alami**:\n\n• **Material Utama**: Rotan alami Bali, daun pandan pilihan, dan serat jerami ramah lingkungan yang dianyam oleh perajin lokal.\n• **Tips Perawatan**:\n  1. Jika terkena pasir/debu, bersihkan dengan kuas lembut atau lap kering.\n  2. Jika terkena percikan air laut/hujan, cukup lap dengan kain lembab lalu angin-anginkan di tempat teduh (jangan dijemur langsung di bawah terik matahari ekstrem).\n  3. Simpan di tempat yang kering dan berventilasi baik.`,
      suggestions: ["👜 Lihat Koleksi Anyaman", "📸 Lihat Inspirasi Lookbook", "✉️ Tanya Hal Lain"],
      actionLinks: [
        { label: "Buka Lookbook", url: "/pages/lookbook" },
        { label: "Lihat Semua Koleksi", url: "/collections/shop-all" },
      ],
    };
  }

  // 7. Pertanyaan Harga, Diskon, Promo & Pembelian
  if (
    cleanInput.includes("harga") ||
    cleanInput.includes("beli") ||
    cleanInput.includes("order") ||
    cleanInput.includes("pesan") ||
    cleanInput.includes("checkout") ||
    cleanInput.includes("promo") ||
    cleanInput.includes("diskon") ||
    cleanInput.includes("cara beli") ||
    cleanInput.includes("cara pesan")
  ) {
    return {
      text: `🛍️ **Informasi Pemesanan & Harga**:\n\nWebsite ini adalah **katalog identitas resmi ${brand}**.\n\n• Seluruh koleksi tas, topi, dan sandal memiliki estimasi harga referensi mulai dari Rp 180.000 hingga Rp 550.000.\n• Untuk konsultasi ketersediaan stok, custom order, atau kerjasama kemitraan, Anda dapat mengisi formulir pesan di menu **Kontak** atau terus berkonsultasi dengan asisten kami di sini.`,
      suggestions: ["✉️ Buka Form Kontak", "👜 Lihat Semua Koleksi", "📍 Alamat Toko"],
      actionLinks: [
        { label: "Form Kontak Toko", url: "/contact" },
        { label: "Semua Koleksi", url: "/collections/shop-all" },
      ],
    };
  }

  // 8. Pertanyaan Kontak / Nomor Telepon / Email / IG
  if (
    cleanInput.includes("kontak") ||
    cleanInput.includes("hubungi") ||
    cleanInput.includes("nomor") ||
    cleanInput.includes("telepon") ||
    cleanInput.includes("wa") ||
    cleanInput.includes("whatsapp") ||
    cleanInput.includes("email") ||
    cleanInput.includes("instagram") ||
    cleanInput.includes("ig")
  ) {
    return {
      text: `📞 **Saluran Kontak Resmi ${brand}**:\n\n• **Email**: ${siteConfig.brand.email}\n• **Instagram**: @${siteConfig.brand.instagram}\n• **Alamat**: ${address}\n• **Catatan**: Layanan nomor telepon saat ini sedang diperbarui. Anda dapat mengirim pesan langsung via formulir di halaman Kontak atau berkonsultasi 24 jam dengan AI Chatbot ini.`,
      suggestions: ["✉️ Form Kontak", "📸 Instagram @aesthetic.id", "📍 Lokasi Toko"],
      actionLinks: [
        { label: "Halaman Kontak", url: "/contact" },
        { label: "Katalog Koleksi", url: "/collections/shop-all" },
      ],
    };
  }

  // 9. Pertanyaan Lookbook / Inspirasi Gaya
  if (
    cleanInput.includes("lookbook") ||
    cleanInput.includes("inspirasi") ||
    cleanInput.includes("gaya") ||
    cleanInput.includes("foto") ||
    cleanInput.includes("cerita") ||
    cleanInput.includes("ootd")
  ) {
    return {
      text: `✨ **Lookbook & Cerita Pantai ${brand}**:\n\nKunjungi halaman **Lookbook** kami untuk melihat kurasi 4 cerita visual bertema *golden hour* di pantai Bali dengan paduan tas anyaman, topi lebar, dan sandal santai.`,
      suggestions: ["📸 Buka Lookbook", "👜 Lihat Koleksi Tas", "👒 Lihat Topi Pantai"],
      actionLinks: [{ label: "Buka Halaman Lookbook", url: "/pages/lookbook" }],
    };
  }

  // 10. Pertanyaan Terima Kasih / Penutup
  if (
    cleanInput.includes("terima kasih") ||
    cleanInput.includes("makasih") ||
    cleanInput.includes("thanks") ||
    cleanInput.includes("thank you") ||
    cleanInput.includes("oke") ||
    cleanInput.includes("ok") ||
    cleanInput.includes("siap")
  ) {
    return {
      text: `Sama-sama! Senang bisa membantu Anda di **${brand}** 🌊. Jangan ragu bertanya lagi jika butuh rekomendasi koleksi atau info lainnya. Selamat menikmati harimu!`,
      suggestions: [
        "👜 Lihat Rekomendasi Tas",
        "👒 Koleksi Topi",
        "🩴 Koleksi Sandal",
        "📍 Info Toko",
      ],
      actionLinks: [{ label: "Jelajahi Semua Koleksi", url: "/collections/shop-all" }],
    };
  }

  // 11. Fallback Cerdas (Ketika kata kunci tidak spesifik)
  return {
    text: `Terima kasih atas pesan Anda! Saya adalah **${siteConfig.chatbot.botName}** untuk **${brand}** 🌊.\n\nBerikut topik populer yang bisa langsung Anda tanyakan atau pilih melalui menu di bawah:`,
    suggestions: [
      "👜 Rekomendasi Tas Pantai",
      "👒 Koleksi Topi Anyaman",
      "🩴 Sandal Pantai Nyaman",
      "🌿 Bahan & Cara Perawatan",
      "📍 Alamat & Jam Buka",
      "✉️ Kirim Pesan ke Toko",
    ],
    actionLinks: [
      { label: "Buka Semua Koleksi", url: "/collections/shop-all" },
      { label: "Halaman Kontak", url: "/contact" },
    ],
  };
}
