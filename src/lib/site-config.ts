/**
 * Aesthetic of Indonesia — Site Config
 * Pusat konfigurasi identitas toko, kontak, lokasi, jam operasional, Firebase, & AI Chatbot.
 */

export const siteConfig = {
  // === Brand (Identitas Utama) ===
  brand: {
    name: "Aesthetic of Indonesia",
    shortName: "AESTHETIC",
    tagline: "Koleksi Kerajinan Pantai — Terinspirasi dari Bali",
    url: "https://www.easthtic.my.id",
    apexUrl: "https://easthtic.my.id",
    email: "hello@easthtic.my.id",
    // Nomor telepon & WA sementara dikosongkan sesuai permintaan
    phone: "",
    whatsapp: "",
    instagram: "aesthetic.id",
    address: "Jl. Pantai Kuta No. 88, Bali, Indonesia",
    coordinates: {
      lat: -8.7185,
      lng: 115.1686,
    },
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.8647717462035!2d115.1664113!3d-8.7185123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd246b97893a77d%3A0x6b9d885a539a2b5e!2sPantai%20Kuta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
    operationalHours: {
      weekdays: "Senin — Sabtu: 09:00 – 18:00 WITA",
      weekend: "Minggu: 10:00 – 16:00 WITA",
      notes: "Layanan konsultasi AI Chatbot aktif 24 jam setiap hari",
    },
  },

  currency: "IDR" as const,
  currencyCode: "IDR" as const,

  // === Firebase Realtime Database Config ===
  firebase: {
    databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "",
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  },

  // === AI Chatbot Config (Algoritma Simulasi) ===
  chatbot: {
    botName: "Aesthetic Assistant",
    welcomeMessage:
      "Halo! Selamat datang di Aesthetic of Indonesia. Saya asisten virtual Anda. Ada yang bisa saya bantu terkait koleksi tas, topi, sandal pantai, info bahan, atau lokasi toko kami?",
    quickSuggestions: [
      "Rekomendasi Tas Pantai",
      "Koleksi Topi Anyaman",
      "Sandal Pantai Nyaman",
      "Alamat & Jam Buka",
      "Bahan & Cara Perawatan",
      "Kirim Pesan ke Toko",
    ],
  },

  // === Announcement Bar ===
  announcement: {
    enabled: true,
    dismissible: true,
    intervalMs: 4000,
    messages: [
      "Aesthetic of Indonesia — Katalog Koleksi Bertema Pantai",
      "Koleksi Tas, Topi & Sandal Anyaman — Konsultasi via AI Chatbot",
      "Tanyakan info produk & inspirasi gaya pantai langsung ke asisten kami",
    ],
  },

  // === Info Toko ===
  shipping: {
    freeThreshold: 500000,
    flatRate: 25000,
    expressRate: 50000,
    giftWrap: 15000,
    note: "Katalog identitas — tanyakan detail via AI Chatbot atau form kontak",
    noteWithCode: "Tanyakan info ketersediaan via chat",
    shortNote: "Koleksi Bertema Pantai",
    unlockedText: "Katalog identitas",
    unlockedSubtext: "Ketersediaan & detail dapat bervariasi, tanyakan ke asisten toko.",
  },
  tax: { rate: 0.11, label: "PPN (11%)" },
  promos: [] as const,
  defaultPromoHint: "AESTHETIC",

  bundle: {
    enabled: false,
    name: "Paket Pantai",
    handles: ["round-beach-bag", "oval-beach-hat", "flip-flop-beach-sandals"] as const,
    originalTotal: 0,
    bundlePrice: 0,
    get saving() {
      return 0;
    },
    get discountLabel() {
      return "";
    },
    subtext: "Katalog identitas — konsultasi via AI Chatbot.",
  },

  valueProps: [
    { icon: "🌿", label: "Nuansa Alami\nTerinspirasi Rotan" },
    { icon: "✋", label: "Pengerjaan\nDetail Per Produk" },
    { icon: "🌊", label: "Tema Pantai\nIlustrasi Katalog" },
  ] as const,

  ui: {
    explore: "Lihat Detail",
    contact: "Hubungi Kami",
    chat: "Tanya AI Chatbot",
    whatsapp: "Chat Asisten",
    madeIn: "Terinspirasi Bali — variasi tiap produk mungkin berbeda",
    saleBadge: "Pilihan",
    verifiedBadge: "Katalog",
    inStock: "Tanya asisten toko",
    secureCheckout: "Konsultasi Chat",
    paymentMethods: "Info transaksi via kontak",
    freeReturns: "Syarat dapat berbeda",
  },

  newsletter: {
    title: "Tetap terhubung dengan Aesthetic of Indonesia",
    subtitle:
      "Dapatkan kabar koleksi & cerita katalog bernuansa pantai khas Bali langsung ke email Anda.",
    placeholder: "Email Anda",
    discountBadge: "Kabar Koleksi",
  },

  // === Navigasi & Footer — terpusat agar mudah diubah ===
  navigation: {
    main: [
      { href: "/collections/shop-all", label: "Koleksi" },
      { href: "/collections/beach-bags", label: "Tas Pantai" },
      { href: "/collections/sun-hats", label: "Topi" },
      { href: "/collections/footwear", label: "Sandal" },
      { href: "/pages/lookbook", label: "Lookbook" },
      { href: "/contact", label: "Kontak" },
    ] as const,
    footer: {
      collections: [
        { href: "/collections/shop-all", label: "Semua Koleksi" },
        { href: "/collections/beach-bags", label: "Tas Pantai" },
        { href: "/collections/sun-hats", label: "Topi Pantai" },
        { href: "/collections/footwear", label: "Sandal Pantai" },
      ],
      pages: [
        { href: "/pages/lookbook", label: "Lookbook Cerita" },
        { href: "/contact", label: "Kontak & Lokasi" },
        { href: "/wishlist", label: "Wishlist" },
      ],
    },
    socials: {
      instagram: "https://instagram.com/aesthetic.id",
      tiktok: "https://tiktok.com/@aesthetic.id",
      pinterest: "https://pinterest.com/aestheticid",
    },
  },

  // === SEO & Legal — info penting terpusat ===
  legal: {
    copyrightYear: 2026,
    description: "Katalog identitas ilustratif — foto & harga referensi, bukan penawaran mengikat.",
  },
};

export function getPromoByCode(code: string) {
  return null;
}
export function calcDiscount(subtotal: number, code: string) {
  return 0;
}
export function getShippingCost(subtotal: number) {
  return 0;
}
export function getTax(subtotalAfterDiscount: number) {
  return 0;
}
