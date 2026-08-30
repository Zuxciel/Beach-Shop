"use client";

import { createContext, useContext, ReactNode } from "react";

// Stub untuk identitas toko — tidak ada keranjang belanja.
// File ini sengaja dipertahankan agar komponen lama (ShopTheLook/CartDrawer) yang masih import tidak error saat build.
// Untuk situs identitas Easthtic, CartProvider hanya passthrough dan useCart mengembalikan data kosong.

type CartContextType = {
  lines: any[];
  totalQuantity: number;
  subtotal: string;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (...args: any[]) => void;
  addBundleToCart: (...args: any[]) => void;
  updateQuantity: (...args: any[]) => void;
  removeLine: (...args: any[]) => void;
  wishlist: string[];
  toggleWishlist: (...args: any[]) => void;
};

const CartContext = createContext<CartContextType>({
  lines: [],
  totalQuantity: 0,
  subtotal: "0",
  isDrawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  addToCart: () => {},
  addBundleToCart: () => {},
  updateQuantity: () => {},
  removeLine: () => {},
  wishlist: [],
  toggleWishlist: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  return <CartContext.Provider value={CartContext as unknown as CartContextType}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
