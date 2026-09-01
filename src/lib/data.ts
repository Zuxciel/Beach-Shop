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

// === 8 produk Aesthetic of Indonesia — katalog identitas (ilustratif) ===
export const products: Product[] = [
  {
    id: "prod_round-bag",
    handle: "round-beach-bag",
    title: "Round Beach Bag",
    description:
      "Tas Pantai Bulat — ilustrasi tas bulat anyaman untuk referensi katalog. Desain terinspirasi rotan khas Bali.",
    descriptionHtml:
      "<p>Tas Pantai Bulat (Round Beach Bag) — ilustrasi katalog untuk referensi. Desain bulat terinspirasi anyaman rotan alami Bali. Ringan, estetik, dan cocok untuk suasana liburan pantai.</p>",
    vendor: "Aesthetic of Indonesia",
    productType: "Tas Pantai",
    tags: ["tas", "bulat", "rotan", "pantai"],
    category: "bags",
    material: "Anyaman Rotan Alami",
    priceRange: { minVariantPrice: idr("250000") },
    compareAtPriceRange: { minVariantPrice: idr("385000") },
    featuredImage: {
      url: localImg("RBag.jpg"),
      altText: "Round Beach Bag — Tas Pantai Bulat Aesthetic of Indonesia",
      width: 800,
      height: 1000,
    },
    images: [
      {
        url: localImg("RBag.jpg"),
        altText: "Round Beach Bag — Tas Pantai Bulat Aesthetic of Indonesia",
        width: 800,
        height: 1000,
      },
      {
        url: localImg("RBag2.jpg"),
        altText: "Round Beach Bag — Detail Tas Pantai Bulat Aesthetic of Indonesia",
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      {
        id: "var_round",
        title: "One Size",
        price: "250000",
        compareAtPrice: "385000",
        availableForSale: true,
        selectedOptions: [{ name: "Model", value: "Round" }],
      },
    ],
    options: [{ name: "Model", values: ["Round"] }],
    availableForSale: true,
  },
  {
    id: "prod_shoulder-bag",
    handle: "beach-bag-shoulder",
    title: "Beach Bag Shoulder",
    description: "Tas Bahu Pantai — tote bahu anyaman elegan berkapasitas luas untuk kebutuhan pantai.",
    descriptionHtml:
      "<p>Beach Bag Shoulder (Tas Bahu Pantai) — tote bahu elegan dengan tali bahu nyaman. Cocok membawa handuk, kacamata hitam, dan perlengkapan santai di tepi pantai.</p>",
    vendor: "Aesthetic of Indonesia",
    productType: "Tas Pantai",
    tags: ["tas", "bahu", "tote"],
    category: "bags",
    material: "Anyaman Daun Pandan & Kulit",
    priceRange: { minVariantPrice: idr("250000") },
    compareAtPriceRange: { minVariantPrice: idr("385000") },
    featuredImage: {
      url: localImg("SBag.jpg"),
      altText: "Beach Bag Shoulder — Tas Bahu Pantai Aesthetic of Indonesia",
      width: 800,
      height: 1000,
    },
    images: [
      {
        url: localImg("SBag.jpg"),
        altText: "Beach Bag Shoulder — Tas Bahu Pantai Aesthetic of Indonesia",
        width: 800,
        height: 1000,
      },
      {
        url: localImg("Sbag2.jpg"),
        altText: "Beach Bag Shoulder — Detail Tas Bahu Pantai Aesthetic of Indonesia",
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      {
        id: "var_shoulder",
        title: "One Size",
        price: "250000",
        compareAtPrice: "385000",
        availableForSale: true,
        selectedOptions: [{ name: "Model", value: "Shoulder" }],
      },
    ],
    options: [{ name: "Model", values: ["Shoulder"] }],
    availableForSale: true,
  },
  {
    id: "prod_oval-hat",
    handle: "oval-beach-hat",
    title: "Oval Beach Hat",
    description: "Topi Pantai Oval — pelindung matahari berbahan serat jerami alami dengan sirkulasi udara sejuk.",
    descriptionHtml:
      "<p>Oval Beach Hat (Topi Pantai Oval) — pelindung sinar UV berbahan serat jerami alami. Memberikan keteduhan maksimal dengan gaya tropis yang memikat.</p>",
    vendor: "Aesthetic of Indonesia",
    productType: "Topi Pantai",
    tags: ["topi", "oval", "anyaman"],
    category: "hats",
    material: "Serat Jerami Alami",
    priceRange: { minVariantPrice: idr("150000") },
    compareAtPriceRange: { minVariantPrice: idr("200000") },
    featuredImage: {
      url: localImg("OBHat.jpeg"),
      altText: "Oval Beach Hat — Topi Pantai Oval Aesthetic of Indonesia",
      width: 800,
      height: 1000,
    },
    images: [
      {
        url: localImg("OBHat.jpeg"),
        altText: "Oval Beach Hat — Topi Pantai Oval Aesthetic of Indonesia",
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      {
        id: "var_oval",
        title: "One Size",
        price: "150000",
        compareAtPrice: "200000",
        availableForSale: true,
        selectedOptions: [{ name: "Model", value: "Oval" }],
      },
    ],
    options: [{ name: "Model", values: ["Oval"] }],
    availableForSale: true,
  },
  {
    id: "prod_flipflop",
    handle: "flip-flop-beach-sandals",
    title: "Flip Flop Beach Sandals",
    description: "Sandal Jepit Pantai — sandal santai bertema alam yang fleksibel dan empuk saat melangkah di pasir.",
    descriptionHtml:
      "<p>Flip Flop Beach Sandals (Sandal Jepit Pantai) — dirancang untuk kenyamanan berjalan di sepanjang garis pantai dengan sol empuk dan tali strap halus.</p>",
    vendor: "Aesthetic of Indonesia",
    productType: "Sandal Pantai",
    tags: ["sandal", "jepit", "pantai"],
    category: "footwear",
    material: "Anyaman Tali Alami & Rubber Sole",
    priceRange: { minVariantPrice: idr("125000") },
    compareAtPriceRange: { minVariantPrice: idr("167000") },
    featuredImage: {
      url: localImg("FFS.jpg"),
      altText: "Flip Flop Beach Sandals — Sandal Jepit Pantai Aesthetic of Indonesia",
      width: 800,
      height: 1000,
    },
    images: [
      {
        url: localImg("FFS.jpg"),
        altText: "Flip Flop Beach Sandals — Sandal Jepit Pantai Aesthetic of Indonesia",
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      {
        id: "var_flip",
        title: "All Size",
        price: "125000",
        compareAtPrice: "167000",
        availableForSale: true,
        selectedOptions: [{ name: "Model", value: "Flip Flop" }],
      },
    ],
    options: [{ name: "Model", values: ["Flip Flop"] }],
    availableForSale: true,
  },
  {
    id: "prod_slipon",
    handle: "beach-sandals-slip-on",
    title: "Beach Sandals Slip On",
    description: "Sandal Selop Pantai — kepraktisan selop santai bertekstur alami dengan sol anti-licin.",
    descriptionHtml:
      "<p>Beach Sandals Slip On (Sandal Selop Pantai) — sandal selop kasual dengan aksen anyaman natural. Mudah dikenakan dan nyaman untuk aktivitas santai sepanjang hari.</p>",
    vendor: "Aesthetic of Indonesia",
    productType: "Sandal Pantai",
    tags: ["sandal", "selop", "slip on"],
    category: "footwear",
    material: "Anyaman Serat & Sol Anti Slip",
    priceRange: { minVariantPrice: idr("75000") },
    compareAtPriceRange: { minVariantPrice: idr("100000") },
    featuredImage: {
      url: localImg("BSSO.jpg"),
      altText: "Beach Sandals Slip On — Sandal Selop Pantai Aesthetic of Indonesia",
      width: 800,
      height: 1000,
    },
    images: [
      {
        url: localImg("BSSO.jpg"),
        altText: "Beach Sandals Slip On — Sandal Selop Pantai Aesthetic of Indonesia",
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      {
        id: "var_slipon",
        title: "All Size",
        price: "75000",
        compareAtPrice: "100000",
        availableForSale: true,
        selectedOptions: [{ name: "Model", value: "Slip On" }],
      },
    ],
    options: [{ name: "Model", values: ["Slip On"] }],
    availableForSale: true,
  },
  {
    id: "prod_retro",
    handle: "retro-beach-bag",
    title: "Retro Beach Bag",
    description: "Tas Pantai Retro — sentuhan klasik anyaman pola geometris untuk gaya pantai vintage.",
    descriptionHtml:
      "<p>Retro Beach Bag (Tas Pantai Retro) — tas anyaman berpola klasik retro. Menonjolkan perpaduan estetika tradisional Bali dan tren mode masa kini.</p>",
    vendor: "Aesthetic of Indonesia",
    productType: "Tas Pantai",
    tags: ["tas", "retro", "anyaman"],
    category: "bags",
    material: "Rotan Retro Halus",
    priceRange: { minVariantPrice: idr("115000") },
    compareAtPriceRange: { minVariantPrice: idr("154000") },
    featuredImage: {
      url: localImg("RBBag.jpg"),
      altText: "Retro Beach Bag — Tas Pantai Retro Aesthetic of Indonesia",
      width: 800,
      height: 1000,
    },
    images: [
      {
        url: localImg("RBBag.jpg"),
        altText: "Retro Beach Bag — Tas Pantai Retro Aesthetic of Indonesia",
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      {
        id: "var_retro",
        title: "One Size",
        price: "115000",
        compareAtPrice: "154000",
        availableForSale: true,
        selectedOptions: [{ name: "Model", value: "Retro" }],
      },
    ],
    options: [{ name: "Model", values: ["Retro"] }],
    availableForSale: true,
  },
  {
    id: "prod_simple-retro",
    handle: "simple-retro-beach-bag",
    title: "Simple Retro Beach Bag",
    description: "Tas Pantai Retro Simpel — desain ringkas, bersih, dan berbobot ringan untuk jalan-jalan santai.",
    descriptionHtml:
      "<p>Simple Retro Beach Bag (Tas Pantai Retro Simpel) — model minimalis yang fungsional. Pas untuk membawa esensial harian saat menikmati kopi atau suasana pantai.</p>",
    vendor: "Aesthetic of Indonesia",
    productType: "Tas Pantai",
    tags: ["tas", "retro", "simple"],
    category: "bags",
    material: "Anyaman Pandan Minimalis",
    priceRange: { minVariantPrice: idr("115000") },
    compareAtPriceRange: { minVariantPrice: idr("154000") },
    featuredImage: {
      url: localImg("SRBBag.jpg"),
      altText: "Simple Retro Beach Bag — Tas Pantai Retro Simpel Aesthetic of Indonesia",
      width: 800,
      height: 1000,
    },
    images: [
      {
        url: localImg("SRBBag.jpg"),
        altText: "Simple Retro Beach Bag — Tas Pantai Retro Simpel Aesthetic of Indonesia",
        width: 800,
        height: 1000,
      },
      {
        url: localImg("SRBBag2.jpg"),
        altText: "Simple Retro Beach Bag — Detail Tas Pantai Retro Simpel Aesthetic of Indonesia",
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      {
        id: "var_sretro",
        title: "One Size",
        price: "115000",
        compareAtPrice: "154000",
        availableForSale: true,
        selectedOptions: [{ name: "Model", value: "Simple Retro" }],
      },
    ],
    options: [{ name: "Model", values: ["Simple Retro"] }],
    availableForSale: true,
  },
  {
    id: "prod_basket",
    handle: "straw-basket-bag",
    title: "Straw Basket Bag",
    description: "Tas Keranjang Jerami — anyaman keranjang anyam klasik berstruktur kokoh dan berkapasitas lega.",
    descriptionHtml:
      "<p>Straw Basket Bag (Tas Keranjang Jerami) — tas keranjang bertema piknik pantai. Kuat, berventilasi baik, dan memberikan nuansa alami yang otentik.</p>",
    vendor: "Aesthetic of Indonesia",
    productType: "Tas Pantai",
    tags: ["tas", "keranjang", "jerami"],
    category: "bags",
    material: "Serat Jerami Kokoh",
    priceRange: { minVariantPrice: idr("150000") },
    compareAtPriceRange: { minVariantPrice: idr("200000") },
    featuredImage: {
      url: localImg("SBBag.jpg"),
      altText: "Straw Basket Bag — Tas Keranjang Jerami Aesthetic of Indonesia",
      width: 800,
      height: 1000,
    },
    images: [
      {
        url: localImg("SBBag.jpg"),
        altText: "Straw Basket Bag — Tas Keranjang Jerami Aesthetic of Indonesia",
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      {
        id: "var_basket",
        title: "One Size",
        price: "150000",
        compareAtPrice: "200000",
        availableForSale: true,
        selectedOptions: [{ name: "Model", value: "Basket" }],
      },
    ],
    options: [{ name: "Model", values: ["Basket"] }],
    availableForSale: true,
  },
];

export const collections: Collection[] = [
  {
    id: "col_all",
    handle: "shop-all",
    title: "Semua Koleksi",
    description:
      "Katalog Aesthetic of Indonesia — 8 referensi koleksi kerajinan tas, topi, dan sandal bertema pantai.",
    descriptionHtml:
      "<p>Katalog Aesthetic of Indonesia — kurasi 8 referensi produk bertema pantai khas Bali untuk referensi visual dan inspirasi gaya.</p>",
    image: {
      url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
      altText: "Koleksi Aesthetic of Indonesia — foto katalog pantai Bali",
      width: 1200,
      height: 800,
    },
    products,
  },
  {
    id: "col_bags",
    handle: "beach-bags",
    title: "Tas Pantai",
    description: "Katalog tas pantai anyaman rotan, pandan, dan jerami khas Bali.",
    descriptionHtml:
      "<p>Koleksi tas pantai yang memadukan keindahan anyaman alami Bali dengan ketahanan material untuk berbagai suasana pantai.</p>",
    image: {
      url: localImg("RBag.jpg"),
      altText: "Tas Pantai Aesthetic of Indonesia",
      width: 1200,
      height: 800,
    },
    products: products.filter((p) => p.category === "bags"),
  },
  {
    id: "col_hats",
    handle: "sun-hats",
    title: "Topi Pantai",
    description: "Koleksi topi pantai anyaman pelindung sinar UV dengan sirkulasi sejuk.",
    descriptionHtml:
      "<p>Topi pantai anyaman serat alami untuk kenyamanan dan perlindungan teduh di bawah terik matahari pantai.</p>",
    image: {
      url: localImg("OBHat.jpeg"),
      altText: "Topi Pantai Aesthetic of Indonesia",
      width: 1200,
      height: 800,
    },
    products: products.filter((p) => p.category === "hats"),
  },
  {
    id: "col_footwear",
    handle: "footwear",
    title: "Sandal Pantai",
    description: "Sandal pantai empuk dan santai untuk melangkah di tepi laut.",
    descriptionHtml:
      "<p>Sandal jepit dan selop pantai bernuansa anyaman natural dengan bantalan empuk dan sol anti-licin.</p>",
    image: {
      url: localImg("Foot1.jpeg"),
      altText: "Sandal Pantai Aesthetic of Indonesia",
      width: 1200,
      height: 800,
    },
    products: products.filter((p) => p.category === "footwear"),
  },
];

export const ugcPosts: UGCPost[] = [
  {
    id: "ugc_1",
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
    altText: "Koleksi Aesthetic of Indonesia di Pantai Bali",
    author: "@aesthetic.id",
    caption: "Golden hour di pantai Bali bersama koleksi anyaman Aesthetic of Indonesia 🌊✨ #AestheticOfIndonesia",
  },
  {
    id: "ugc_2",
    imageUrl: localImg("RBag.jpg"),
    altText: "Round Beach Bag di tepi pantai",
    author: "@aesthetic.id",
    caption: "Sentuhan rotan alami yang selalu pas untuk menemani santai di pantai. #BeachBag #BaliVibes",
  },
  {
    id: "ugc_3",
    imageUrl: localImg("OBHat.jpeg"),
    altText: "Oval Beach Hat anyaman jerami",
    author: "@aesthetic.id",
    caption: "Keteduhan sempurna di bawah hangatnya mentari tropis. #SunHat #TropicalAesthetic",
  },
  {
    id: "ugc_4",
    imageUrl: localImg("Foot1.jpeg"),
    altText: "Sandal pantai Aesthetic of Indonesia",
    author: "@aesthetic.id",
    caption: "Melangkah ringan di atas lembutnya pasir pantai Bali. #CoastalFootwear",
  },
  {
    id: "ugc_5",
    imageUrl: localImg("SBag.jpg"),
    altText: "Beach Bag Shoulder tote anyaman",
    author: "@aesthetic.id",
    caption: "Kapasitas luas dengan estetika anyaman natural yang timeless. #AestheticOfIndonesia",
  },
  {
    id: "ugc_6",
    imageUrl: localImg("FFS.jpg"),
    altText: "Flip Flop Beach Sandals",
    author: "@aesthetic.id",
    caption: "Kesederhanaan dan kenyamanan terbaik untuk liburan pantai. #BeachSandals",
  },
  {
    id: "ugc_7",
    imageUrl: localImg("SRBBag.jpg"),
    altText: "Simple Retro Beach Bag",
    author: "@aesthetic.id",
    caption: "Desain minimalis berpadu serat pandan alami. #AestheticOfIndonesia",
  },
  {
    id: "ugc_8",
    imageUrl: localImg("SBBag.jpg"),
    altText: "Straw Basket Bag anyaman kokoh",
    author: "@aesthetic.id",
    caption: "Keranjang jerami klasik untuk piknik dan suasana pantai tropis. #StrawBag",
  },
];

export const lookbookItems: LookbookItem[] = [
  {
    id: "lb1",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    altText: "Lookbook Round Beach Bag — Aesthetic of Indonesia",
    title: "Bulat & Matahari",
    description: "Harmoni tas anyaman rotan bulat dengan hangatnya cahaya sore pantai Bali.",
    products: ["round-beach-bag"],
  },
  {
    id: "lb2",
    imageUrl: localImg("OBHat.jpeg"),
    altText: "Lookbook Oval Beach Hat — Aesthetic of Indonesia",
    title: "Teduh Oval",
    description: "Keteduhan alami anyaman jerami di tepi ombak pantai Kuta.",
    products: ["oval-beach-hat"],
  },
  {
    id: "lb3",
    imageUrl: localImg("Foot1.jpeg"),
    altText: "Lookbook Sandal Pantai — Aesthetic of Indonesia",
    title: "Langkah Pantai",
    description: "Kenyamanan langkah santai menyusuri garis pantai pulau dewata.",
    products: ["flip-flop-beach-sandals", "beach-sandals-slip-on"],
  },
  {
    id: "lb4",
    imageUrl: localImg("RBBag.jpg"),
    altText: "Lookbook Retro & Keranjang — Aesthetic of Indonesia",
    title: "Retro & Keranjang",
    description: "Estetika anyaman vintage yang abadi untuk gaya liburan tepi laut.",
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
