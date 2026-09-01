"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type WishlistContextType = {
  wishlist: string[];
  count: number;
  isWishlisted: (handle: string) => boolean;
  toggle: (handle: string) => void;
  add: (handle: string) => void;
  remove: (handle: string) => void;
  clear: () => void;
};

const WishlistContext = createContext<WishlistContextType | null>(null);
const STORAGE_KEY = "aesthetic_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setWishlist(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const isWishlisted = (handle: string) => wishlist.includes(handle);
  const add = (handle: string) => setWishlist((prev) => (prev.includes(handle) ? prev : [...prev, handle]));
  const remove = (handle: string) => setWishlist((prev) => prev.filter((h) => h !== handle));
  const toggle = (handle: string) => setWishlist((prev) => (prev.includes(handle) ? prev.filter((h) => h !== handle) : [...prev, handle]));
  const clear = () => setWishlist([]);

  return (
    <WishlistContext.Provider value={{ wishlist, count: wishlist.length, isWishlisted, toggle, add, remove, clear }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be within WishlistProvider");
  return ctx;
}
