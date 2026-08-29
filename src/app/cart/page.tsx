"use client";

import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { lines, subtotal, updateQuantity, removeLine } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-[600px] px-4 py-20 text-center">
        <h1 className="font-display text-3xl">Your Cart</h1>
        <p className="mt-2 text-stone-500">Your cart is empty. The coast is waiting.</p>
        <Link href="/collections/shop-all" className="mt-6 inline-flex rounded-full bg-ocean px-8 py-3 text-sm font-medium text-white">Shop The Collection</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[900px] px-4 md:px-6 py-8">
      <h1 className="font-display text-3xl">Your Cart</h1>
      <div className="mt-8 space-y-4">
        {lines.map((line) => (
          <div key={line.id} className="flex gap-4 rounded-2xl border border-sand-200 bg-white p-4">
            <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-sand-50">
              <Image src={line.merchandise.product.featuredImage.url} alt={line.merchandise.product.featuredImage.altText} fill className="object-cover" sizes="80px" />
            </div>
            <div className="flex-1">
              <Link href={`/products/${line.merchandise.product.handle}`} className="font-medium hover:text-ocean">{line.merchandise.product.title}</Link>
              <p className="text-xs text-stone-500">{line.merchandise.selectedOptions.map((o) => o.value).join(" • ")}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full border border-sand-200">
                  <button onClick={() => updateQuantity(line.id, line.quantity - 1)} className="h-8 w-8 rounded-full hover:bg-sand-50">−</button>
                  <span className="w-6 text-center text-sm">{line.quantity}</span>
                  <button onClick={() => updateQuantity(line.id, line.quantity + 1)} className="h-8 w-8 rounded-full hover:bg-sand-50">+</button>
                </div>
                <span className="font-semibold">{formatPrice(line.cost.totalAmount.amount)}</span>
              </div>
            </div>
            <button onClick={() => removeLine(line.id)} className="text-xs text-stone-400 hover:text-clay">Remove</button>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-sand-200 bg-white p-6">
        <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-lg">{formatPrice(subtotal)}</span></div>
        <Button className="mt-4 w-full" size="lg">Proceed to Checkout</Button>
      </div>
    </div>
  );
}
