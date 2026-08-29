"use client";

import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from "react";
import type { CartLine, Product } from "./types";
import { products as mockProducts } from "./data";

type CartContextType = {
  lines: CartLine[];
  totalQuantity: number;
  subtotal: string;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (productHandle: string, variantId: string, quantity?: number) => void;
  addBundleToCart: (handles: string[]) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  wishlist: string[];
  toggleWishlist: (handle: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const addToCart = useCallback((productHandle: string, variantId: string, quantity = 1) => {
    const product = mockProducts.find((p) => p.handle === productHandle);
    if (!product) return;
    const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
    if (!variant) return;

    setLines((prev) => {
      const existing = prev.find((l) => l.merchandiseId === variant.id);
      if (existing) {
        return prev.map((l) =>
          l.merchandiseId === variant.id
            ? {
                ...l,
                quantity: l.quantity + quantity,
                cost: {
                  totalAmount: {
                    amount: (parseFloat(variant.price) * (l.quantity + quantity)).toFixed(2),
                    currencyCode: "USD",
                  },
                },
              }
            : l
        );
      }
      const newLine: CartLine = {
        id: `line_${Date.now()}_${variant.id}`,
        merchandiseId: variant.id,
        quantity,
        merchandise: {
          product: { id: product.id, handle: product.handle, title: product.title, featuredImage: product.featuredImage },
          title: `${product.title} - ${variant.title}`,
          price: { amount: variant.price, currencyCode: "USD" },
          selectedOptions: variant.selectedOptions,
        },
        cost: {
          totalAmount: {
            amount: (parseFloat(variant.price) * quantity).toFixed(2),
            currencyCode: "USD",
          },
        },
      };
      return [...prev, newLine];
    });
    setIsDrawerOpen(true);
  }, []);

  const addBundleToCart = useCallback((handles: string[]) => {
    handles.forEach((h) => {
      const p = mockProducts.find((pr) => pr.handle === h);
      if (p) addToCart(h, p.variants[0].id, 1);
    });
  }, [addToCart]);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    if (quantity <= 0) {
      setLines((prev) => prev.filter((l) => l.id !== lineId));
      return;
    }
    setLines((prev) =>
      prev.map((l) =>
        l.id === lineId
          ? {
              ...l,
              quantity,
              cost: {
                totalAmount: {
                  amount: (parseFloat(l.merchandise.price.amount) * quantity).toFixed(2),
                  currencyCode: "USD",
                },
              },
            }
          : l
      )
    );
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.id !== lineId));
  }, []);

  const toggleWishlist = useCallback((handle: string) => {
    setWishlist((prev) => (prev.includes(handle) ? prev.filter((h) => h !== handle) : [...prev, handle]));
  }, []);

  const totalQuantity = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + parseFloat(l.cost.totalAmount.amount), 0).toFixed(2), [lines]);

  return (
    <CartContext.Provider value={{ lines, totalQuantity, subtotal, isDrawerOpen, openDrawer, closeDrawer, addToCart, addBundleToCart, updateQuantity, removeLine, wishlist, toggleWishlist }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
