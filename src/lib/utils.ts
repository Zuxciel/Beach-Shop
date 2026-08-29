import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(amount: string | number, currency = "USD") {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(num);
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

export function generateProductSeoTitle(productName: string, materialOrCategory: string, brand = "Coastal Aesthetic") {
  return `${productName} - ${materialOrCategory} | ${brand}`;
}

export function generateMetaDescription(
  product: { title: string; material?: string; category: string },
  shippingNote = "Free shipping over $50."
): string {
  const material = product.material ? `${product.material} ` : "";
  const desc = `Shop the ${product.title} — handcrafted ${material}${product.category} for sun-bleached days. Breathable, lightweight & eco-conscious. ${shippingNote}`;
  return desc.slice(0, 155);
}

export function getAltText(product: { title: string; material?: string; category: string; color?: string }): string {
  const color = product.color ? `${product.color} ` : "";
  const material = product.material ? `${product.material} ` : "";
  return `Model wearing ${color}${material}${product.title} on a sunlit beach`;
}
