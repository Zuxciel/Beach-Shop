import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollectionByHandle, collections } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { CollectionClient } from "./CollectionClient";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ handle: string }> };

export async function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const col = getCollectionByHandle(handle);
  if (!col) return {};
  const title = `${col.title} | ${siteConfig.brand.name}`;
  const description = `${col.description} Handcrafted, eco-friendly, ${siteConfig.shipping.note}.`;
  return {
    title,
    description: description.slice(0, 155),
    alternates: { canonical: `/collections/${handle}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.brand.url}/collections/${handle}`,
      type: "website",
      images: col.image ? [{ url: col.image.url, width: 1200, height: 800, alt: col.image.altText }] : [],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const collection = getCollectionByHandle(handle);
  if (!collection) notFound();

  // Sorting would be client-side; server renders featured order
  const products = collection.products;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.brand.url}/` },
      { "@type": "ListItem", position: 2, name: collection.title, item: `${siteConfig.brand.url}/collections/${handle}` },
    ],
  };

  return (
    <div className="mx-auto max-w-[1400px] px-3 max-[400px]:px-2.5 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 overflow-hidden">
      {/* Breadcrumb UI matching JSON-LD — wrap on <400px */}
      <nav aria-label="Breadcrumb" className="text-[11px] sm:text-xs text-stone-500 overflow-hidden">
        <ol className="flex flex-wrap gap-1.5 break-words">
          <li><Link href="/" className="hover:text-ocean">Home</Link></li>
          <li>/</li>
          <li className="font-medium text-charcoal break-words">{collection.title}</li>
        </ol>
      </nav>

      {/* Hero — single col mobile, 2 col tablet/desktop */}
      <div className="mt-3 sm:mt-4 overflow-hidden rounded-xl sm:rounded-2xl bg-sand-50">
        <div className="grid md:grid-cols-2">
          <div className="p-5 max-[400px]:p-4 sm:p-8 md:p-10 flex flex-col justify-center min-w-0">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">Collection</p>
            <h1 className="mt-1.5 sm:mt-2 font-display text-2xl max-[400px]:text-xl sm:text-3xl md:text-4xl break-words">{collection.title}</h1>
            <div className="mt-2 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-stone-600 [&_p]:m-0 break-words" dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }} />
            <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs text-stone-500 break-words">{products.length} produk • {siteConfig.shipping.note}</p>
          </div>
          {collection.image && (
            <div className="relative h-48 max-[400px]:h-44 sm:h-64 md:h-auto min-h-[180px] max-[400px]:min-h-[180px] sm:min-h-[280px]">
              <Image src={collection.image.url} alt={collection.image.altText} fill className="object-cover" sizes="(max-width:768px)100vw,50vw" priority />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-6 lg:flex-row min-w-0">
        <CollectionClient products={products} />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </div>
  );
}
