import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductByHandle, products } from "@/lib/data";
import { ProductClient } from "@/components/product/ProductClient";
import { generateProductSeoTitle, generateMetaDescription } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ handle: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) return {};
  const title = generateProductSeoTitle(product.title, product.material ?? product.productType);
  const description = generateMetaDescription({ title: product.title, material: product.material, category: product.productType });
  return {
    title,
    description,
    alternates: { canonical: `/products/${handle}` },
    openGraph: {
      title,
      description,
      images: [product.featuredImage.url],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();

  const price = product.priceRange.minVariantPrice.amount;
  const currency = product.priceRange.minVariantPrice.currencyCode;
  const availability = product.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images.map((i) => i.url),
    description: product.description,
    brand: { "@type": "Brand", name: siteConfig.brand.name },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability,
      url: `${siteConfig.brand.url}/products/${handle}`,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "0", currency },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
        deliveryTime: { "@type": "ShippingDeliveryTime", handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" } },
      },
    },
    ...(product.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating.value,
            reviewCount: product.rating.count,
          },
        }
      : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.brand.url}/` },
      { "@type": "ListItem", position: 2, name: product.category, item: `${siteConfig.brand.url}/collections/${product.category === "bags" ? "beach-bags" : product.category}` },
      { "@type": "ListItem", position: 3, name: product.title, item: `${siteConfig.brand.url}/products/${handle}` },
    ],
  };

  return (
    <>
      <ProductClient product={product} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
