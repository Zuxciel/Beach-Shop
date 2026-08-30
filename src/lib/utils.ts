import { clsx, type ClassValue } from "clsx";
import { siteConfig } from "./site-config";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(amount: string | number, currency = "IDR") {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (currency === "IDR") {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(num);
}

export function getDiscountPercent(price: string | number, compareAt?: string | number | null): number | null {
  if (!compareAt) return null;
  const p = typeof price === "string" ? parseFloat(price) : price;
  const c = typeof compareAt === "string" ? parseFloat(compareAt) : compareAt;
  if (!c || c <= p) return null;
  return Math.round(((c - p) / c) * 100);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/\b(the|a|an)\b-?/g, "") // remove stopwords
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateProductSeoTitle(productName: string, materialOrCategory: string, brand?: string) {
  const b = brand ?? siteConfig.brand.name;
  return `${productName} - ${materialOrCategory} | ${b}`;
}

export function generateMetaDescription(
  product: { title: string; material?: string; category: string },
  shippingNote?: string
): string {
  const note = shippingNote ?? `Katalog ilustrasi — hubungi WhatsApp untuk cek ketersediaan.`;
  const mat = product.material ? `${product.material} ` : "";
  const desc = `${product.title} — ilustrasi ${mat}${product.category} untuk referensi katalog Easthtic. Foto ilustrasi, detail dapat bervariasi. ${note}`;
  return desc.slice(0, 155);
}

export function getAltText(product: { title: string; material?: string; category: string; color?: string }): string {
  const color = product.color ? `${product.color} ` : "";
  const material = product.material ? `${product.material} ` : "";
  return `Model wearing ${color}${material}${product.title} on a sunlit beach`;
}
