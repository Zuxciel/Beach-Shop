/**
 * Aesthetic of Indonesia — Site Config
 * Konfigurasi identitas toko, kontak, lokasi, Firebase, & AI Chatbot.
 */

export const siteConfig = {
  brand: {
    name: "Aesthetic of Indonesia",
    shortName: "Aesthetic of Indonesia",
    tagline: "Katalog Koleksi Bertema Pantai",
    url: "https://www.easthtic.my.id",
    apexUrl: "https://easthtic.my.id",
    email: "hello@easthtic.my.id",
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
      notes: "Layanan asisten chat aktif untuk konsultasi katalog",
    },
  },

  currency: "IDR" as const,
  currencyCode: "IDR" as const,

  firebase: {
    databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "",
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  },

  chatbot: {
    botName: "Asisten Toko",
    welcomeMessage:
      "Halo! Selamat datang di katalog Aesthetic of Indonesia. Ada yang bisa kami bantu terkait informasi produk tas, topi, atau sandal?",
    quickSuggestions: [
      "Koleksi Tas Pantai",
      "Koleksi Topi",
      "Koleksi Sandal",
      "Info Lokasi & Jam Buka",
      "Kirim Pesan ke Toko",
    ],
  },

  announcement: {
    enabled: true,
    dismissible: true,
    intervalMs: 5000,
    messages: [
      "Aesthetic of Indonesia — Katalog Koleksi Tas, Topi & Sandal Bertema Pantai",
      "Konsultasi produk dan ketersediaan stok dapat dilakukan melalui chat",
    ],
  },

  shipping: {
    freeThreshold: 500000,
    flatRate: 25000,
    expressRate: 50000,
    giftWrap: 15000,
    note: "Katalog produk — hubungi kami untuk informasi ketersediaan",
    noteWithCode: "Info ketersediaan via kontak",
    shortNote: "Koleksi Bertema Pantai",
    unlockedText: "Katalog produk",
    unlockedSubtext: "Detail produk dapat ditanyakan ke tim toko.",
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
    subtext: "Katalog produk.",
  },

  valueProps: [
    { icon: "•", label: "Anyaman\nMaterial Pilihan" },
    { icon: "•", label: "Desain\nTema Pesisir" },
    { icon: "•", label: "Katalog\nReferensi Gaya" },
  ] as const,

  ui: {
    explore: "Lihat Detail",
    contact: "Hubungi Kami",
    chat: "Tanya Asisten",
    whatsapp: "Chat",
    madeIn: "Produk bertema pesisir tropis",
    saleBadge: "Katalog",
    verifiedBadge: "Koleksi",
    inStock: "Tanya ketersediaan",
    secureCheckout: "Konsultasi",
    paymentMethods: "Info via kontak",
    freeReturns: "Ketentuan toko berlaku",
  },

  newsletter: {
    title: "Kabar Koleksi Terbaru",
    subtitle: "Dapatkan pembaruan katalog produk dan info koleksi berkala.",
    placeholder: "Masukkan email Anda",
    discountBadge: "Katalog",
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
