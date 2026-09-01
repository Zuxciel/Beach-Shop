/**
 * Algoritma AI Chatbot Cerdas & Akurat — Aesthetic of Indonesia
 * Dilengkapi Pemahaman Kontekstual Produk, Bahan Anyaman, Rekomendasi Gaya, & Form Pemesanan
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

// Data detail pengetahuan produk untuk respon mendalam & akurat
const productKnowledge: Record<
  string,
  {
    characteristics: string;
    stylingTips: string;
    careTips: string;
    capacity: string;
  }
> = {
  "round-beach-bag": {
    characteristics:
      "Anyaman rotan alami Bali pilihan dengan struktur melingkar kokoh, finishing natural pelindung serat, dan tali selempang kulit sintetis premium.",
    stylingTips:
      "Sangat cocok dipadukan dengan gaun pantai linen putih, sun hat jerami oval, atau outfit resort santai saat brunch di kafe tepi pantai Seminyak & Canggu.",
    careTips:
      "Cukup bersihkan debu dengan kuas halus atau lap microfiber kering. Hindari terendam air dan simpan di tempat berventilasi baik.",
    capacity:
      "Ideal membawa smartphone, dompet kecil, kacamata hitam, sunscreen, dan perlengkapan esensial liburan.",
  },
  "beach-bag-shoulder": {
    characteristics:
      "Anyaman serat daun pandan yang lentur, ringan, dan ramah lingkungan, dipadukan dengan tali bahu kulit yang kuat dan nyaman dipakai berlama-lama.",
    stylingTips:
      "Sempurna untuk tote harian saat berjalan di tepi pantai Kuta atau Sanur, serasi dengan kimono pantai motif tropis atau swimwear.",
    careTips:
      "Hindari lipatan keras. Jika terkena percikan air laut, lap dengan kain lembap lalu angin-anginkan di tempat teduh.",
    capacity:
      "Kapasitas luas (tote size), muat handuk pantai kecil, tumbler air, buku bacaan, botol tabir surya, dan pouch kosmetik.",
  },
  "oval-beach-hat": {
    characteristics:
      "Terbuat dari serat jerami alami (natural straw) dengan brim melingkar oval yang elegan untuk perlindungan maksimal dari sinar UV matahari.",
    stylingTips:
      "Cocok dipadukan dengan Round Beach Bag atau Simple Retro Bag, sangat fotogenik untuk sesi foto liburan pantai saat golden hour.",
    careTips:
      "Simpan dengan menyangga bagian mahkota topi agar bentuk oval tetap presisi. Jangan ditindih beban berat.",
    capacity:
      "Ukuran All-size nyaman dengan lingkar kepala fleksibel dan tali pengikat dalam.",
  },
  "flip-flop-beach-sandals": {
    characteristics:
      "Kombinasi sol karet anti-slip bertekstur empuk dengan strap suede lembut yang tidak membuat sela jari lecet saat berjalan di atas pasir pantai.",
    stylingTips:
      "Wajib dibawa untuk berjalan santai di tepi ombak, dipadukan dengan celana pendek linen atau maxi dress santai.",
    careTips:
      "Bilas pasir dengan air tawar mengalir, lalu keringkan di tempat teduh (jangan dijemur langsung di bawah terik matahari ekstrem).",
    capacity: "Tersedia varian ukuran 37 hingga 42 standar kaki Indonesia.",
  },
  "beach-sandals-slip-on": {
    characteristics:
      "Insole anatomis berbahan cork (gabus alami) yang mengikuti kontur telapak kaki, dilapisi strap suede premium dengan gesper bernuansa klasik.",
    stylingTips:
      "Sangat fleksibel dari pantai hingga jalan-jalan santai sore di resort atau pusat perbelanjaan Bali.",
    careTips:
      "Gunakan sikat suede khusus untuk membersihkan debu strap, dan hindari rendaman air berlebih pada insole cork.",
    capacity: "Tersedia varian ukuran 38 hingga 43.",
  },
  "retro-beach-bag": {
    characteristics:
      "Perpaduan anyaman rotan klasik dengan aksen rajutan katun berpola retro yang memberikan sentuhan vintage estetik khas era bohemian.",
    stylingTips:
      "Cocok untuk gaya vintage coastal chic, berpadu manis dengan dress renda katun atau celana kulot bermotif floral lembut.",
    careTips:
      "Bersihkan bagian rajutan katun dengan lap lembut yang sedikit dibasahi busa sabun lembut, lalu keringkan secara alami.",
    capacity:
      "Muat perlengkapan berlibur sedang seperti dompet, kamera saku, smartphone, dan sunglasses.",
  },
  "simple-retro-beach-bag": {
    characteristics:
      "Anyaman rotan halus bertema minimalis retro dengan pola anyam rapat dan bobot super ringan yang nyaman dijinjing.",
    stylingTips:
      "Pilihan tepat bagi penggemar estetika clean minimalis Jepang-Bali, serasi dengan outfit monokrom atau warna-warna earth tone (sand/cream).",
    careTips: "Simpan dengan ganjalan kertas di dalamnya agar bentuk tas tetap kokoh dan terjaga.",
    capacity: "Cocok untuk kebutuhan santai harian.",
  },
  "straw-basket-bag": {
    characteristics:
      "Anyaman serat jerami gandum tebal berpola keranjang piknik dengan pegangan ganda kulit asli yang kokoh dan berkesan natural mewah.",
    stylingTips:
      "Sangat estetik untuk piknik tepi pantai Uluwatu, hunting foto lookbook, ataupun berbelanja santai di pasar seni Ubud.",
    careTips:
      "Hindari beban berlebih yang melebihi kapasitas keranjang untuk menjaga kerapatan anyaman jerami.",
    capacity: "Kapasitas besar, muat perlengkapan piknik pantai, kain pantai, dan berbagai aksesori.",
  },
};

export function processChatbotMessage(input: string, history: ChatMessage[] = []): IntentResponse {
  const rawInput = input.trim();
  const cleanInput = rawInput.toLowerCase();
  const brand = siteConfig.brand.name;
  const address = siteConfig.brand.address;
  const hours = siteConfig.brand.operationalHours;

  const mapProductToCard = (p: (typeof products)[0]): ProductCardData => ({
    handle: p.handle,
    title: p.title,
    price: formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode),
    currency: p.priceRange.minVariantPrice.currencyCode,
    material: p.material,
    imageUrl: p.featuredImage.url,
    category: p.category,
  });

  const allCards = products.map(mapProductToCard);

  // Helper pencari produk spesifik berdasarkan input
  const findMentionedProduct = () => {
    return products.find((p) => {
      const handleClean = p.handle.toLowerCase();
      const titleClean = p.title.toLowerCase();
      const handleWords = handleClean.split("-");

      if (cleanInput.includes(titleClean)) return true;
      if (cleanInput.includes(handleClean)) return true;
      if (cleanInput.includes(p.handle.replace(/-/g, " "))) return true;

      // Cek variasi kata kunci khas
      if (p.handle === "round-beach-bag" && (cleanInput.includes("round") || cleanInput.includes("tas bulat") || cleanInput.includes("tas rotan bulat"))) return true;
      if (p.handle === "beach-bag-shoulder" && (cleanInput.includes("shoulder") || cleanInput.includes("tas bahu") || cleanInput.includes("tote bahu"))) return true;
      if (p.handle === "oval-beach-hat" && (cleanInput.includes("oval") || cleanInput.includes("topi pantai") || cleanInput.includes("topi jerami") || cleanInput.includes("beach hat"))) return true;
      if (p.handle === "flip-flop-beach-sandals" && (cleanInput.includes("flip flop") || cleanInput.includes("sandal jepit") || cleanInput.includes("jepit"))) return true;
      if (p.handle === "beach-sandals-slip-on" && (cleanInput.includes("slip on") || cleanInput.includes("sandal selop") || cleanInput.includes("selop") || cleanInput.includes("cork"))) return true;
      if (p.handle === "retro-beach-bag" && (cleanInput.includes("retro bag") || cleanInput.includes("tas retro") || cleanInput.includes("retro beach"))) return true;
      if (p.handle === "simple-retro-beach-bag" && (cleanInput.includes("simple retro") || cleanInput.includes("retro sederhana"))) return true;
      if (p.handle === "straw-basket-bag" && (cleanInput.includes("straw basket") || cleanInput.includes("keranjang jerami") || cleanInput.includes("basket bag"))) return true;

      return false;
    });
  };

  const mentionedProduct = findMentionedProduct();

  // 1. Trigger Pemesanan / Order Form Langsung
  if (
    cleanInput.startsWith("pesan ") ||
    cleanInput.startsWith("order ") ||
    cleanInput.includes("form pemesanan") ||
    cleanInput.includes("mau pesan") ||
    cleanInput.includes("mau order") ||
    cleanInput.includes("cara beli") ||
    cleanInput.includes("cara pesan")
  ) {
    return {
      text: mentionedProduct
        ? `Tentu! Berikut formulir pesanan/konsultasi untuk **${mentionedProduct.title}** (${formatPrice(mentionedProduct.priceRange.minVariantPrice.amount)}).\n\nSilakan lengkapi nama dan kontak WhatsApp Anda di bawah agar tim admin kami langsung menindaklanjuti ketersediaan dan detail pengirimannya.`
        : `Silakan isi formulir pemesanan & konsultasi di bawah ini. Tim **${brand}** akan segera menghubungi Anda melalui kontak yang dicantumkan:`,
      suggestions: [
        mentionedProduct ? `🌿 Info Bahan ${mentionedProduct.title}` : "👜 Rekomendasi Tas",
        "📍 Alamat & Jam Buka",
        "👜 Lihat Semua Koleksi",
      ],
      showInquiryForm: true,
      inquiryProduct: mentionedProduct
        ? {
            handle: mentionedProduct.handle,
            title: mentionedProduct.title,
            price: formatPrice(
              mentionedProduct.priceRange.minVariantPrice.amount,
              mentionedProduct.priceRange.minVariantPrice.currencyCode
            ),
          }
        : undefined,
    };
  }

  // 2. Pertanyaan / Ketertarikan tentang Produk Spesifik (Bahan, Cocok, Ukuran, Detail)
  if (mentionedProduct) {
    const detail = productKnowledge[mentionedProduct.handle] || {
      characteristics: `Dibuat dari bahan ${mentionedProduct.material} dengan keahlian perajin lokal Bali.`,
      stylingTips: "Cocok untuk berbagai suasana liburan pantai dan resort kasual.",
      careTips: "Bersihkan dengan lap lembut dan simpan di tempat kering.",
      capacity: "Sesuai untuk perlengkapan esensial liburan Anda.",
    };

    const isAskingMaterial =
      cleanInput.includes("bahan") ||
      cleanInput.includes("material") ||
      cleanInput.includes("terbuat dari") ||
      cleanInput.includes("awet") ||
      cleanInput.includes("kualitas");

    const isAskingStyling =
      cleanInput.includes("cocok") ||
      cleanInput.includes("kecocokan") ||
      cleanInput.includes("padu") ||
      cleanInput.includes("gaya") ||
      cleanInput.includes("outfit") ||
      cleanInput.includes("pakai");

    const isAskingPrice =
      cleanInput.includes("harga") ||
      cleanInput.includes("berapa") ||
      cleanInput.includes("biaya") ||
      cleanInput.includes("diskon");

    let responseText = `Senang Anda tertarik dengan **${mentionedProduct.title}**! 🌴\n\n`;

    responseText += `• **Kategori & Tipe**: ${mentionedProduct.productType}\n`;
    responseText += `• **Bahan Utama**: ${mentionedProduct.material}\n`;
    responseText += `• **Estimasi Harga Katalog**: ${formatPrice(mentionedProduct.priceRange.minVariantPrice.amount, mentionedProduct.priceRange.minVariantPrice.currencyCode)}\n\n`;

    responseText += `**Karakteristik & Keunggulan Bahan:**\n${detail.characteristics}\n\n`;
    responseText += `**Saran Padu-Padan & Gaya (Styling):**\n${detail.stylingTips}\n\n`;
    responseText += `**Tips Perawatan:**\n${detail.careTips}`;

    return {
      text: responseText,
      suggestions: [
        `Pesan ${mentionedProduct.title}`,
        "👜 Koleksi Tas Lainnya",
        "👒 Topi Pantai",
        "📍 Lokasi Galeri Bali",
      ],
      productCards: [mapProductToCard(mentionedProduct)],
      actionLinks: [
        { label: `Lihat Detail ${mentionedProduct.title}`, url: `/products/${mentionedProduct.handle}` },
        { label: "Buka Semua Katalog", url: "/collections/shop-all" },
      ],
    };
  }

  // 3. Kategori: Topi Pantai
  if (
    cleanInput.includes("topi") ||
    cleanInput.includes("hat") ||
    cleanInput.includes("sun hat") ||
    cleanInput.includes("panas") ||
    cleanInput.includes("pelindung")
  ) {
    const hatCards = products.filter((p) => p.category === "hats").map(mapProductToCard);
    return {
      text: `👒 **Koleksi Topi Pantai ${brand}**:\n\nKami menghadirkan **Oval Beach Hat** yang dianyam dari serat jerami alami (*natural straw*).\n\n• **Fungsi**: Melindungi wajah dan leher dari paparan sinar UV matahari tropis dengan ventilasi udara yang sejuk.\n• **Gaya**: Bentuk oval melengkung anggun, sangat serasi dipadukan dengan tas anyaman rotan bulat dan dress pantai.`,
      suggestions: ["Pesan Oval Beach Hat", "👜 Tas Anyaman Cocok", "🌿 Cara Merawat Topi Jerami"],
      productCards: hatCards,
      actionLinks: [{ label: "Katalog Topi Pantai", url: "/collections/sun-hats" }],
    };
  }

  // 4. Kategori: Sandal Pantai
  if (
    cleanInput.includes("sandal") ||
    cleanInput.includes("footwear") ||
    cleanInput.includes("alas kaki") ||
    cleanInput.includes("sepatu") ||
    cleanInput.includes("jepit") ||
    cleanInput.includes("selop")
  ) {
    const shoeCards = products.filter((p) => p.category === "footwear").map(mapProductToCard);
    return {
      text: `🩴 **Koleksi Sandal Pantai ${brand}**:\n\n1. **Flip Flop Beach Sandals** (${formatPrice("180000")}) — Sandal jepit bersol karet empuk anti-slip dengan strap suede lembut yang tidak bikin lecet di sela jari.\n2. **Beach Sandals Slip On** (${formatPrice("210000")}) — Sandal selop dengan insole cork (gabus alami anatomis) yang nyaman mengikuti bentuk telapak kaki.\n\nKeduanya dirancang khusus untuk kenyamanan melangkah di pesisir pasir maupun jalan santai resort.`,
      suggestions: ["Pesan Flip Flop Beach Sandals", "Pesan Beach Sandals Slip On", "👜 Rekomendasi Tas Pantai"],
      productCards: shoeCards,
      actionLinks: [{ label: "Katalog Sandal Pantai", url: "/collections/footwear" }],
    };
  }

  // 5. Kategori: Tas Pantai Umum
  if (
    cleanInput.includes("tas") ||
    cleanInput.includes("bag") ||
    cleanInput.includes("tote") ||
    cleanInput.includes("anyaman") ||
    cleanInput.includes("rotan") ||
    cleanInput.includes("pandan")
  ) {
    const bagCards = products.filter((p) => p.category === "bags").slice(0, 4).map(mapProductToCard);
    return {
      text: `👜 **Koleksi Tas Pantai Anyaman ${brand}**:\n\nKami memiliki 5 varian tas anyaman khas Bali:\n\n• **Round Beach Bag** — Ikonik bulat dari rotan alami\n• **Beach Bag Shoulder** — Tote bahu luas dari anyaman daun pandan\n• **Retro Beach Bag** — Rotan dengan rajutan katun vintage\n• **Simple Retro Beach Bag** — Anyaman rotan minimalis rapi\n• **Straw Basket Bag** — Keranjang jerami gandum elegan\n\nSemua koleksi dibuat dengan serat alami ramah lingkungan oleh perajin lokal Bali.`,
      suggestions: ["Round Beach Bag", "Beach Bag Shoulder", "Straw Basket Bag", "👒 Topi Pantai"],
      productCards: bagCards,
      actionLinks: [{ label: "Katalog Tas Pantai", url: "/collections/beach-bags" }],
    };
  }

  // 6. Pertanyaan Bahan, Tahan Air, dan Perawatan
  if (
    cleanInput.includes("tahan air") ||
    cleanInput.includes("hujan") ||
    cleanInput.includes("basah") ||
    cleanInput.includes("perawatan") ||
    cleanInput.includes("merawat") ||
    cleanInput.includes("jamur") ||
    cleanInput.includes("kotor") ||
    cleanInput.includes("membersihkan")
  ) {
    return {
      text: `🌿 **Panduan Bahan & Perawatan Anyaman Alami ${brand}**:\n\n• **Ketahanan Air**: Bahan rotan, pandan, dan jerami tahan terhadap percikan air pantai biasa, namun **tidak disarankan direndam** atau dibiarkan basah kuyup karena merupakan serat alami.\n• **Jika Terkena Air**: Cukup lap dengan kain kering yang lembut, lalu angin-anginkan di tempat teduh dengan sirkulasi udara baik.\n• **Pembersihan Rutin**: Bersihkan sela-sela anyaman menggunakan kuas lembut atau lap microfiber kering.\n• **Penyimpanan**: Simpan di tempat yang tidak lembap dan gunakan silica gel / ganjalan kain agar bentuk tas tidak berubah.`,
      suggestions: ["👜 Lihat Koleksi Tas", "👒 Topi Pantai", "📍 Lokasi Toko di Bali"],
      actionLinks: [{ label: "Buka Semua Koleksi", url: "/collections/shop-all" }],
    };
  }

  // 7. Lokasi Toko, Jam Buka, Alamat, Kunjungan
  if (
    cleanInput.includes("lokasi") ||
    cleanInput.includes("alamat") ||
    cleanInput.includes("toko") ||
    cleanInput.includes("galeri") ||
    cleanInput.includes("workshop") ||
    cleanInput.includes("jam buka") ||
    cleanInput.includes("operasional") ||
    cleanInput.includes("bali") ||
    cleanInput.includes("kuta") ||
    cleanInput.includes("peta")
  ) {
    return {
      text: `📍 **Lokasi Galeri & Workshop ${brand}**:\n\n• **Alamat**: ${address}\n• **Jam Operasional**:\n  - ${hours.weekdays}\n  - ${hours.weekend}\n• **Layanan Online**: AI Assistant aktif 24 jam setiap hari.\n\nAnda dapat melihat peta lokasi interaktif Google Maps di halaman Kontak kami.`,
      suggestions: ["📍 Buka Halaman Kontak & Peta", "👜 Lihat Koleksi", "✉️ Kirim Pesan ke Toko"],
      actionLinks: [
        { label: "Halaman Kontak & Lokasi", url: "/contact" },
        { label: "Semua Katalog Koleksi", url: "/collections/shop-all" },
      ],
    };
  }

  // 8. Pengiriman, Ongkir, dan Wilayah Kirim
  if (
    cleanInput.includes("kirim") ||
    cleanInput.includes("ongkir") ||
    cleanInput.includes("ekspedisi") ||
    cleanInput.includes("luar kota") ||
    cleanInput.includes("jakarta") ||
    cleanInput.includes("surabaya")
  ) {
    return {
      text: `📦 **Informasi Pengiriman & Pemesanan ${brand}**:\n\n• Pengiriman dilakukan langsung dari workshop kami di Bali ke seluruh wilayah Indonesia.\n• Kami menggunakan ekspedisi terpercaya dengan pengemasan aman berlapis kardus & bubble wrap agar bentuk anyaman tidak rusak saat pengiriman.\n• Estimasi waktu sampai berkisar antara 2–4 hari kerja untuk kota-kota besar di Jawa & sekitarnya.`,
      suggestions: ["🛒 Pesan Produk Sekarang", "👜 Katalog Produk", "📍 Info Toko"],
      showInquiryForm: true,
    };
  }

  // 9. Sapaan Murni (Greeting)
  if (
    cleanInput === "halo" ||
    cleanInput === "hai" ||
    cleanInput === "hi" ||
    cleanInput === "hey" ||
    cleanInput === "pagi" ||
    cleanInput === "selamat pagi" ||
    cleanInput === "siang" ||
    cleanInput === "selamat siang" ||
    cleanInput === "sore" ||
    cleanInput === "selamat sore" ||
    cleanInput === "malam" ||
    cleanInput === "selamat malam" ||
    cleanInput === "tes" ||
    cleanInput === "ping"
  ) {
    return {
      text: `Halo! Selamat datang di **${brand}** 🌊.\n\nSaya **${siteConfig.chatbot.botName}**, siap membantu Anda menemukan tas anyaman rotan, topi pelindung UV, dan sandal pantai yang pas untuk gaya liburan Anda di Bali.\n\nAda produk atau informasi yang ingin Anda tanyakan hari ini?`,
      suggestions: [
        "👜 Rekomendasi Tas Pantai",
        "👒 Koleksi Topi Anyaman",
        "🩴 Sandal Pantai Nyaman",
        "📍 Alamat Galeri di Bali",
      ],
      actionLinks: [{ label: "Jelajahi Semua Koleksi", url: "/collections/shop-all" }],
    };
  }

  // 10. Fallback Cerdas: Rekomendasi & Bantuan Umum
  return {
    text: `Terima kasih atas pesan Anda! Terkait pertanyaan seputar **${brand}**, saya dapat membantu menjelaskan:\n\n• Detail 8 koleksi anyaman (Tas Pantai, Topi Jerami, Sandal Nyaman)\n• Karakteristik bahan alami (Rotan, Daun Pandan, Jerami)\n• Rekomendasi gaya liburan pantai Bali\n• Formulir pencatatan pemesanan & konsultasi\n• Alamat toko fisik di Jl. Pantai Kuta, Bali\n\nSilakan pilih salah satu topik di bawah atau ketik nama produk yang ingin Anda ketahui:`,
    suggestions: [
      "👜 Rekomendasi Tas Anyaman",
      "👒 Topi Pantai Oval",
      "🩴 Sandal Pantai",
      "📍 Alamat & Jam Buka",
    ],
    productCards: allCards.slice(0, 3),
    actionLinks: [
      { label: "Buka Semua Katalog", url: "/collections/shop-all" },
      { label: "Halaman Kontak & Lokasi", url: "/contact" },
    ],
  };
}
