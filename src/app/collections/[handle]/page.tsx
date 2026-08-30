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
    openGraph: { title, description, images: col.image ? [col.image.url] : [] },
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
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-6">
      {/* Breadcrumb UI matching JSON-LD */}
      <nav aria-label="Breadcrumb" className="text-xs text-stone-500">
        <ol className="flex gap-1.5">
          <li><Link href="/" className="hover:text-ocean">Home</Link></li>
          <li>/</li>
          <li className="font-medium text-charcoal">{collection.title}</li>
        </ol>
      </nav>

      {/* Hero */}
      <div className="mt-4 overflow-hidden rounded-2xl bg-sand-50">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">Collection</p>
            <h1 className="mt-2 font-display text-3xl md:text-4xl">{collection.title}</h1>
            <div className="mt-3 text-sm leading-6 text-stone-600 [&_p]:m-0" dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }} />
            <p className="mt-4 text-xs text-stone-500">{products.length} products • {siteConfig.shipping.note}</p>
          </div>
          {collection.image && (
            <div className="relative h-64 md:h-auto min-h-[280px]">
              <Image src={collection.image.url} alt={collection.image.altText} fill className="object-cover" sizes="(max-width:768px)100vw,50vw" priority />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-6 lg:flex-row">
        <CollectionClient products={products} />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </div>
  );
}
