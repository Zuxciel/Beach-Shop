export type ProductHandle = string;
export type CollectionHandle = string;

export interface ProductVariant {
  id: string;
  title: string;
  price: string; // e.g. "89.00"
  compareAtPrice?: string | null;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  image?: { url: string; altText: string };
  sku?: string;
}

export interface ProductImage {
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  handle: ProductHandle;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  compareAtPriceRange?: { minVariantPrice: { amount: string; currencyCode: string } };
  featuredImage: ProductImage;
  images: ProductImage[];
  variants: ProductVariant[];
  options: { name: string; values: string[] }[];
  availableForSale: boolean;
  totalInventory?: number;
  seo?: { title: string; description: string };
  // Convenience
  material?: string;
  category: "bags" | "footwear" | "hats" | "accessories";
  rating?: { value: number; count: number };
  videoUrl?: string;
}

export interface Collection {
  id: string;
  handle: CollectionHandle;
  title: string;
  description: string;
  descriptionHtml: string;
  image?: ProductImage;
  products: Product[];
  seo?: { title: string; description: string };
}

export interface CartLine {
  id: string;
  merchandiseId: string;
  quantity: number;
  merchandise: {
    product: Pick<Product, "id" | "handle" | "title" | "featuredImage">;
    title: string;
    price: { amount: string; currencyCode: string };
    selectedOptions: { name: string; value: string }[];
  };
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
}

export interface Cart {
  id: string;
  lines: CartLine[];
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  totalQuantity: number;
  checkoutUrl: string;
}

export interface UGCPost {
  id: string;
  imageUrl: string;
  altText: string;
  author: string;
  caption?: string;
  productHandles?: string[];
}

export interface BundleHotspot {
  id: string;
  x: number; // percent 0-100
  y: number;
  productHandle: string;
  label: string;
}

export interface LookbookItem {
  id: string;
  imageUrl: string;
  altText: string;
  title: string;
  description?: string;
  products?: string[]; // handles
}
