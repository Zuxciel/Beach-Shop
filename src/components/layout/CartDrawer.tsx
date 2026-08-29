"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { lines, subtotal, isDrawerOpen, closeDrawer, updateQuantity, removeLine } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity ${isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={closeDrawer}
        aria-hidden
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-cream shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-sand-200 px-6 py-5">
          <h2 className="font-display text-xl">Your Cart</h2>
          <button onClick={closeDrawer} aria-label="Close cart" className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-100 hover:bg-sand-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sand-100">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M6 7h14l-1 10H7L6 7Z" /><path d="M9 7V5a3 3 0 0 1 6 0v2" /></svg>
            </div>
            <p className="mt-4 font-display text-xl">Your cart is empty</p>
            <p className="mt-2 text-sm text-stone-500">Add a little sun — explore the collection.</p>
            <Link href="/collections/shop-all" onClick={closeDrawer} className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ocean px-8 text-sm font-medium text-white hover:bg-[#0f2e2c]">Shop The Collection</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="space-y-6">
                {lines.map((line) => (
                  <li key={line.id} className="flex gap-4">
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-sand-100">
                      <Image src={line.merchandise.product.featuredImage.url} alt={line.merchandise.product.featuredImage.altText} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <Link href={`/products/${line.merchandise.product.handle}`} onClick={closeDrawer} className="line-clamp-2 text-sm font-medium leading-tight hover:text-ocean">
                        {line.merchandise.product.title}
                      </Link>
                      <p className="mt-0.5 text-xs text-stone-500">{line.merchandise.selectedOptions.map((o) => o.value).join(" • ")}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-sand-200 bg-white">
                          <button onClick={() => updateQuantity(line.id, line.quantity - 1)} className="flex h-8 w-8 items-center justify-center text-sm hover:bg-sand-50 rounded-full">−</button>
                          <span className="min-w-6 text-center text-sm font-medium">{line.quantity}</span>
                          <button onClick={() => updateQuantity(line.id, line.quantity + 1)} className="flex h-8 w-8 items-center justify-center text-sm hover:bg-sand-50 rounded-full">+</button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{formatPrice(line.cost.totalAmount.amount)}</p>
                          <button onClick={() => removeLine(line.id)} className="text-xs text-stone-400 hover:text-clay underline">Remove</button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl bg-sand-100 p-4">
                <p className="text-sm font-medium">Add a note or gifting?</p>
                <p className="mt-1 text-xs text-stone-500">Eco gift wrap available at checkout.</p>
              </div>
            </div>

            <div className="border-t border-sand-200 bg-white px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-600">Subtotal</span>
                <span className="text-lg font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-stone-500">Shipping calculated at checkout. Free shipping over $50.</p>
              <Button className="mt-4 w-full" size="lg">Checkout</Button>
              <button onClick={closeDrawer} className="mt-3 w-full text-sm font-medium text-stone-600 hover:text-charcoal">Continue Shopping</button>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-stone-400">
                <span>Secure checkout</span>
                <span>•</span>
                <span>Shop Pay, PayPal, Card</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
