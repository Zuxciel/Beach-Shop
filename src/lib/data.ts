import type { Product, Collection, UGCPost, LookbookItem, BundleHotspot } from "./types";

function img(seed: string, w = 800, h = 1000) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}
function localImg(file: string) {
  return `/img/${file}`;
}
function idr(amount: string) {
  return { amount, currencyCode: "IDR" as const };
}

// === 8 produk Easthtic — katalog identitas (ilustratif, bukan jaminan) ===
// Semua deskripsi dibuat tidak mengklaim absolut agar aman dari komplain.
// Harga estimasi & dapat berubah, diskon tertera sebagai referensi katalog.
export const products: Product[] = [
  {
    id: "prod_round-bag",
    handle: "round-beach-bag",
    title: "Round Beach Bag",
    description: "Tas Pantai Bulat — ilustrasi tas bulat anyaman untuk referensi katalog. Desain terinspirasi rotan, detail aktual dapat bervariasi.",
    descriptionHtml: "<p>Tas Pantai Bulat (Round Beach Bag) — ilustrasi katalog untuk referensi. Desain bulat terinspirasi anyaman. Foto hanya ilustrasi; ukuran, warna, dan material aktual dapat bervariasi. Hubungi WhatsApp untuk cek ketersediaan & detail terbaru.</p>",
    vendor: "Easthtic of Indonesia",
    productType: "Tas Pantai",
    tags: ["tas", "bulat", "rotan", "pantai"],
    category: "bags",
    material: "Ilustrasi Rotan",
    priceRange: { minVariantPrice: idr("420000") },
    compareAtPriceRange: { minVariantPrice: idr("550000") },
    featuredImage: { url: localImg("RBag.jpg"), altText: "Round Beach Bag — Tas Pantai Bulat Easthtic", width: 800, height: 1000 },
    images: [
      { url: localImg("RBag.jpg"), altText: "Round Beach Bag — Tas Pantai Bulat Easthtic", width: 800, height: 1000 },
      { url: localImg("RBag2.jpg"), altText: "Round Beach Bag — detail Tas Pantai Bulat Easthtic", width: 800, height: 1000 },
    ],
    variants: [{ id: "var_round", title: "One Size", price: "420000", compareAtPrice: "550000", availableForSale: true, selectedOptions: [{ name: "Model", value: "Round" }] }],
    options: [{ name: "Model", values: ["Round"] }],
    availableForSale: true,
  },
  {
    id: "prod_shoulder-bag",
    handle: "beach-bag-shoulder",
    title: "Beach Bag Shoulder",
    description: "Tas Bahu Pantai — ilustrasi tote bahu untuk referensi katalog.",
    descriptionHtml: "<p>Beach Bag Shoulder (Tas Bahu Pantai) — ilustrasi tote bahu untuk referensi katalog. Ilustrasi dapat berbeda dengan produk aktual. Konfirmasi stok & detail via WhatsApp.</p>",
    vendor: "Easthtic of Indonesia",
    productType: "Tas Pantai",
    tags: ["tas", "bahu", "tote"],
    category: "bags",
    material: "Ilustrasi Anyaman",
    priceRange: { minVariantPrice: idr("380000") },
    featuredImage: { url: localImg("SBag.jpg"), altText: "Beach Bag Shoulder — Tas Bahu Pantai Easthtic", width: 800, height: 1000 },
    images: [
      { url: localImg("SBag.jpg"), altText: "Beach Bag Shoulder — Tas Bahu Pantai Easthtic", width: 800, height: 1000 },
      { url: localImg("Sbag2.jpg"), altText: "Beach Bag Shoulder — detail Tas Bahu Pantai Easthtic", width: 800, height: 1000 },
    ],
    variants: [{ id: "var_shoulder", title: "One Size", price: "380000", availableForSale: true, selectedOptions: [{ name: "Model", value: "Shoulder" }] }],
    options: [{ name: "Model", values: ["Shoulder"] }],
    availableForSale: true,
  },
  {
    id: "prod_oval-hat",
    handle: "oval-beach-hat",
    title: "Oval Beach Hat",
    description: "Topi Pantai Oval — ilustrasi topi oval untuk referensi katalog.",
    descriptionHtml: "<p>Oval Beach Hat (Topi Pantai Oval) — ilustrasi topi oval untuk referensi katalog. Bentuk & warna ilustratif, dapat bervariasi. Hubungi WhatsApp untuk info terbaru.</p>",
    vendor: "Easthtic of Indonesia",
    productType: "Topi Pantai",
    tags: ["topi", "oval", "anyaman"],
    category: "hats",
    material: "Ilustrasi Anyaman",
    priceRange: { minVariantPrice: idr("250000") },
    compareAtPriceRange: { minVariantPrice: idr("300000") },
    featuredImage: { url: localImg("OBHat.jpeg"), altText: "Oval Beach Hat — Topi Pantai Oval Easthtic", width: 800, height: 1000 },
    images: [{ url: localImg("OBHat.jpeg"), altText: "Oval Beach Hat — Topi Pantai Oval Easthtic", width: 800, height: 1000 }],
    variants: [{ id: "var_oval", title: "One Size", price: "250000", compareAtPrice: "300000", availableForSale: true, selectedOptions: [{ name: "Model", value: "Oval" }] }],
    options: [{ name: "Model", values: ["Oval"] }],
    availableForSale: true,
  },
  {
    id: "prod_flipflop",
    handle: "flip-flop-beach-sandals",
    title: "Flip Flop Beach Sandals",
    description: "Sandal Jepit Pantai — ilustrasi sandal jepit untuk referensi katalog.",
    descriptionHtml: "<p>Flip Flop Beach Sandals (Sandal Jepit Pantai) — ilustrasi sandal jepit untuk referensi katalog. Kenyamanan & ukuran dapat bervariasi per orang. Konfirmasi detail via WhatsApp.</p>",
    vendor: "Easthtic of Indonesia",
    productType: "Sandal Pantai",
    tags: ["sandal", "jepit", "pantai"],
    category: "footwear",
    material: "Ilustrasi Anyaman",
    priceRange: { minVariantPrice: idr("180000") },
    featuredImage: { url: localImg("FFS.jpg"), altText: "Flip Flop Beach Sandals — Sandal Jepit Pantai Easthtic", width: 800, height: 1000 },
    images: [{ url: localImg("FFS.jpg"), altText: "Flip Flop Beach Sandals — Sandal Jepit Pantai Easthtic", width: 800, height: 1000 }],
    variants: [{ id: "var_flip", title: "All Size", price: "180000", availableForSale: true, selectedOptions: [{ name: "Model", value: "Flip Flop" }] }],
    options: [{ name: "Model", values: ["Flip Flop"] }],
    availableForSale: true,
  },
  {
    id: "prod_slipon",
    handle: "beach-sandals-slip-on",
    title: "Beach Sandals Slip On",
    description: "Sandal Selop Pantai — ilustrasi selop untuk referensi katalog.",
    descriptionHtml: "<p>Beach Sandals Slip On (Sandal Selop Pantai) — ilustrasi selop tanpa tali untuk referensi katalog. Ilustrasi dapat berbeda dengan produk aktual. Tanya ketersediaan via WhatsApp.</p>",
    vendor: "Easthtic of Indonesia",
    productType: "Sandal Pantai",
    tags: ["sandal", "selop", "slip on"],
    category: "footwear",
    material: "Ilustrasi Kanvas",
    priceRange: { minVariantPrice: idr("220000") },
    compareAtPriceRange: { minVariantPrice: idr("260000") },
    featuredImage: { url: localImg("BSSO.jpg"), altText: "Beach Sandals Slip On — Sandal Selop Pantai Easthtic", width: 800, height: 1000 },
    images: [{ url: localImg("BSSO.jpg"), altText: "Beach Sandals Slip On — Sandal Selop Pantai Easthtic", width: 800, height: 1000 }],
    variants: [{ id: "var_slipon", title: "All Size", price: "220000", compareAtPrice: "260000", availableForSale: true, selectedOptions: [{ name: "Model", value: "Slip On" }] }],
    options: [{ name: "Model", values: ["Slip On"] }],
    availableForSale: true,
  },
  {
    id: "prod_retro",
    handle: "retro-beach-bag",
    title: "Retro Beach Bag",
    description: "Tas Pantai Retro — ilustrasi tas motif retro untuk referensi katalog.",
    descriptionHtml: "<p>Retro Beach Bag (Tas Pantai Retro) — ilustrasi tas motif retro untuk referensi katalog. Motif & aksen dapat bervariasi. Hubungi WhatsApp untuk foto terbaru.</p>",
    vendor: "Easthtic of Indonesia",
    productType: "Tas Pantai",
    tags: ["tas", "retro", "anyaman"],
    category: "bags",
    material: "Ilustrasi Retro",
    priceRange: { minVariantPrice: idr("420000") },
    compareAtPriceRange: { minVariantPrice: idr("520000") },
    featuredImage: { url: localImg("RBBag.jpg"), altText: "Retro Beach Bag — Tas Pantai Retro Easthtic", width: 800, height: 1000 },
    images: [{ url: localImg("RBBag.jpg"), altText: "Retro Beach Bag — Tas Pantai Retro Easthtic", width: 800, height: 1000 }],
    variants: [{ id: "var_retro", title: "One Size", price: "420000", compareAtPrice: "520000", availableForSale: true, selectedOptions: [{ name: "Model", value: "Retro" }] }],
    options: [{ name: "Model", values: ["Retro"] }],
    availableForSale: true,
  },
  {
    id: "prod_simple-retro",
    handle: "simple-retro-beach-bag",
    title: "Simple Retro Beach Bag",
    description: "Tas Pantai Retro Simpel — ilustrasi versi minimalis untuk referensi katalog.",
    descriptionHtml: "<p>Simple Retro Beach Bag (Tas Pantai Retro Simpel) — ilustrasi versi minimalis untuk referensi katalog. Ilustrasi dapat berbeda dengan stok aktual. Konfirmasi via WhatsApp.</p>",
    vendor: "Easthtic of Indonesia",
    productType: "Tas Pantai",
    tags: ["tas", "retro", "simple"],
    category: "bags",
    material: "Ilustrasi Minimal",
    priceRange: { minVariantPrice: idr("350000") },
    featuredImage: { url: localImg("SRBBag.jpg"), altText: "Simple Retro Beach Bag — Tas Pantai Retro Simpel Easthtic", width: 800, height: 1000 },
    images: [
      { url: localImg("SRBBag.jpg"), altText: "Simple Retro Beach Bag — Tas Pantai Retro Simpel Easthtic", width: 800, height: 1000 },
      { url: localImg("SRBBag2.jpg"), altText: "Simple Retro Beach Bag — detail Tas Pantai Retro Simpel Easthtic", width: 800, height: 1000 },
    ],
    variants: [{ id: "var_sretro", title: "One Size", price: "350000", availableForSale: true, selectedOptions: [{ name: "Model", value: "Simple Retro" }] }],
    options: [{ name: "Model", values: ["Simple Retro"] }],
    availableForSale: true,
  },
  {
    id: "prod_basket",
    handle: "straw-basket-bag",
    title: "Straw Basket Bag",
    description: "Tas Keranjang Jerami — ilustrasi keranjang untuk referensi katalog.",
    descriptionHtml: "<p>Straw Basket Bag (Tas Keranjang Jerami) — ilustrasi keranjang untuk referensi katalog. Ukuran & kapasitas ilustratif, dapat bervariasi. Tanya detail via WhatsApp.</p>",
    vendor: "Easthtic of Indonesia",
    productType: "Tas Pantai",
    tags: ["tas", "keranjang", "jerami"],
    category: "bags",
    material: "Ilustrasi Jerami",
    priceRange: { minVariantPrice: idr("300000") },
    compareAtPriceRange: { minVariantPrice: idr("350000") },
    featuredImage: { url: localImg("SBBag.jpg"), altText: "Straw Basket Bag — Tas Keranjang Jerami Easthtic", width: 800, height: 1000 },
    images: [{ url: localImg("SBBag.jpg"), altText: "Straw Basket Bag — Tas Keranjang Jerami Easthtic", width: 800, height: 1000 }],
    variants: [{ id: "var_basket", title: "One Size", price: "300000", compareAtPrice: "350000", availableForSale: true, selectedOptions: [{ name: "Model", value: "Basket" }] }],
    options: [{ name: "Model", values: ["Basket"] }],
    availableForSale: true,
  },
];

export const collections: Collection[] = [
  {
    id: "col_all",
    handle: "shop-all",
    title: "Semua Koleksi",
    description: "Katalog ilustrasi Easthtic — 8 koleksi bertema pantai untuk referensi visual. Foto ilustrasi, hubungi WhatsApp untuk cek ketersediaan.",
    descriptionHtml: "<p>Katalog ilustrasi Easthtic — 8 koleksi bertema pantai untuk referensi visual. Semua foto adalah ilustrasi katalog dan dapat berbeda dengan produk aktual. Hubungi WhatsApp untuk cek ketersediaan terbaru.</p>",
    image: { url: localImg("Beach1.jpg"), altText: "Ilustrasi koleksi Easthtic — foto katalog", width: 1200, height: 800 },
    products,
  },
  {
    id: "col_bags",
    handle: "beach-bags",
    title: "Tas Pantai",
    description: "Katalog ilustrasi tas pantai — 5 pilihan bertema pantai.",
    descriptionHtml: "<p>Katalog ilustrasi tas pantai — 5 pilihan bertema pantai. Foto ilustrasi, ketersediaan dapat berubah. Konfirmasi via WhatsApp.</p>",
    image: { url: localImg("RBag.jpg"), altText: "Ilustrasi tas pantai Easthtic — foto katalog", width: 1200, height: 800 },
    products: products.filter((p) => p.category === "bags"),
  },
  {
    id: "col_hats",
    handle: "sun-hats",
    title: "Topi Pantai",
    description: "Katalog ilustrasi topi pantai.",
    descriptionHtml: "<p>Katalog ilustrasi topi pantai. Foto ilustrasi, tanya stok via WhatsApp.</p>",
    image: { url: localImg("OBHat.jpeg"), altText: "Ilustrasi topi pantai Easthtic — foto katalog", width: 1200, height: 800 },
    products: products.filter((p) => p.category === "hats"),
  },
  {
    id: "col_footwear",
    handle: "footwear",
    title: "Sandal Pantai",
    description: "Katalog ilustrasi sandal pantai.",
    descriptionHtml: "<p>Katalog ilustrasi sandal pantai — jepit & selop. Foto ilustrasi, kenyamanan dapat bervariasi per pengguna.</p>",
    image: { url: localImg("Foot1.jpeg"), altText: "Ilustrasi sandal pantai Easthtic — foto katalog", width: 1200, height: 800 },
    products: products.filter((p) => p.category === "footwear"),
  },
];

export const ugcPosts: UGCPost[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `ugc_${i}`,
  imageUrl: img(`easthtic-ugc-${i}`, 600, 600),
  altText: `Ilustrasi UGC koleksi Easthtic — foto katalog ${i + 1}`,
  author: `@easthtic_muse_${i + 1}`,
  caption: "Ilustrasi gaya pantai — foto katalog, bukan testimoni. #EasthticOfIndonesia",
}));

export const lookbookItems: LookbookItem[] = [
  {
    id: "lb1",
    imageUrl: img("easthtic-look-1", 1200, 1500),
    altText: "Ilustrasi lookbook Round Beach Bag — foto katalog Easthtic",
    title: "Bulat & Matahari",
    description: "Ilustrasi Round Beach Bag untuk referensi visual.",
    products: ["round-beach-bag"],
  },
  {
    id: "lb2",
    imageUrl: img("easthtic-look-2", 1200, 1500),
    altText: "Ilustrasi lookbook Oval Beach Hat — foto katalog Easthtic",
    title: "Teduh Oval",
    description: "Ilustrasi topi oval — foto katalog.",
    products: ["oval-beach-hat"],
  },
  {
    id: "lb3",
    imageUrl: img("easthtic-look-3", 1200, 1500),
    altText: "Ilustrasi lookbook sandal pantai — foto katalog Easthtic",
    title: "Langkah Pantai",
    description: "Ilustrasi jepit & selop — foto katalog.",
    products: ["flip-flop-beach-sandals", "beach-sandals-slip-on"],
  },
  {
    id: "lb4",
    imageUrl: img("easthtic-look-4", 1200, 1500),
    altText: "Ilustrasi lookbook Retro & Keranjang — foto katalog Easthtic",
    title: "Retro & Keranjang",
    description: "Ilustrasi gaya vintage — foto katalog.",
    products: ["retro-beach-bag", "simple-retro-beach-bag", "straw-basket-bag"],
  },
];

export const shopTheLookHotspots: BundleHotspot[] = [
  { id: "hs1", x: 35, y: 45, productHandle: "round-beach-bag", label: "Round Beach Bag" },
  { id: "hs2", x: 52, y: 82, productHandle: "flip-flop-beach-sandals", label: "Flip Flop" },
  { id: "hs3", x: 62, y: 22, productHandle: "oval-beach-hat", label: "Oval Beach Hat" },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}
export function getCollectionByHandle(handle: string): Collection | undefined {
  return collections.find((c) => c.handle === handle);
}
