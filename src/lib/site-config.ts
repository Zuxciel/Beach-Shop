/**
 * Easthtic of Indonesia — Site Config (simple, identitas toko)
 * Edit file ini untuk ubah nama toko, kontak, pesan, kategori, koleksi, dll.
 * Tidak ada fitur jual-beli — hanya katalog identitas.
 * Semua teks & kontak terpusat di sini biar mudah diubah.
 */

export const siteConfig = {
  // === Brand (identitas) — hindari klaim absolut ===
  brand: {
    name: "Easthtic of Indonesia",
    shortName: "EASTHTIC",
    tagline: "Koleksi Kerajinan Pantai — Terinspirasi dari Bali",
    url: "https://easthtic-of-indonesia.vercel.app",
    email: "hello@easthtic.id",
    phone: "+62 812-3456-7890",
    whatsapp: "6282130873525",
    instagram: "easthtic.id",
    address: "Jl. Pantai Kuta No. 88, Bali, Indonesia",
  },

  currency: "IDR" as const,
  currencyCode: "IDR" as const,

  // === Announcement Bar — hindari klaim absolut ===
  announcement: {
    enabled: true,
    dismissible: true,
    intervalMs: 4000,
    messages: [
      "Easthtic of Indonesia — Katalog Koleksi Bertema Pantai",
      "Koleksi Tas, Topi & Sandal — Ilustrasi katalog, tanya stok via WhatsApp",
      "Hubungi WhatsApp untuk info detail produk & ketersediaan",
    ],
  },

  // === Info Toko (soft, tidak menjamin) ===
  shipping: {
    freeThreshold: 50,
    flatRate: 8,
    expressRate: 12,
    giftWrap: 4,
    note: "Katalog identitas — hubungi WhatsApp untuk cek ketersediaan",
    noteWithCode: "Hubungi WhatsApp untuk info ketersediaan",
    shortNote: "Koleksi Bertema Pantai",
    unlockedText: "Katalog identitas",
    unlockedSubtext: "Ketersediaan & detail dapat bervariasi, konfirmasi via WhatsApp.",
  },
  tax: { rate: 0.08, label: "Tax (8%)" },
  promos: [] as const,
  defaultPromoHint: "EASTHTIC",

  bundle: {
    enabled: false,
    name: "Paket Pantai",
    handles: ["round-beach-bag", "oval-beach-hat", "flip-flop-beach-sandals"] as const,
    originalTotal: 0,
    bundlePrice: 0,
    get saving() { return 0; },
    get discountLabel() { return ""; },
    subtext: "Katalog identitas — hubungi WhatsApp.",
  },

  valueProps: [
    { icon: "🌿", label: "Nuansa Alami\nTerinspirasi Rotan" },
    { icon: "✋", label: "Pengerjaan\nDetail Per Produk" },
    { icon: "🌊", label: "Tema Pantai\nIlustrasi Katalog" },
  ] as const,

  ui: {
    explore: "Lihat Detail",
    contact: "Hubungi Kami",
    whatsapp: "Chat WhatsApp",
    madeIn: "Terinspirasi Bali — variasi tiap produk mungkin berbeda",
    saleBadge: "Promo",
    verifiedBadge: "Info",
    inStock: "Tanya ketersediaan",
    secureCheckout: "Hubungi WhatsApp",
    paymentMethods: "Info transaksi via WhatsApp",
    freeReturns: "Syarat dapat berbeda",
  },

  newsletter: {
    title: "Tetap terhubung dengan Easthtic",
    subtitle: "Dapatkan kabar koleksi & cerita katalog — ilustrasi dapat berbeda dengan produk aktual.",
    placeholder: "Email Anda",
    discountBadge: "Kabar",
  },
};

// helpers (tetap ada biar file lama tidak error, tapi tidak dipakai untuk identitas)
export function getPromoByCode(code: string) {
  return null;
}
export function calcDiscount(subtotal: number, code: string) { return 0; }
export function getShippingCost(subtotal: number) { return 0; }
export function getTax(subtotalAfterDiscount: number) { return 0; }
