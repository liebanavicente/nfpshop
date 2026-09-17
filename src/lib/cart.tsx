"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getDesign, getVariant } from "@/lib/products";

export interface CartLine {
  designSlug: string;
  variantId: string;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  addItem: (designSlug: string, variantId: string, quantity?: number) => void;
  removeItem: (designSlug: string, variantId: string) => void;
  setQuantity: (designSlug: string, variantId: string, quantity: number) => void;
  clear: () => void;
  totalCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "nfp-cart";

function sameLine(a: CartLine, designSlug: string, variantId: string) {
  return a.designSlug === designSlug && a.variantId === variantId;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setLines(JSON.parse(stored));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore
    }
  }, [lines, hydrated]);

  function addItem(designSlug: string, variantId: string, quantity = 1) {
    setLines((prev) => {
      const existing = prev.find((l) => sameLine(l, designSlug, variantId));
      if (existing) {
        return prev.map((l) =>
          sameLine(l, designSlug, variantId)
            ? { ...l, quantity: l.quantity + quantity }
            : l,
        );
      }
      return [...prev, { designSlug, variantId, quantity }];
    });
  }

  function removeItem(designSlug: string, variantId: string) {
    setLines((prev) => prev.filter((l) => !sameLine(l, designSlug, variantId)));
  }

  function setQuantity(designSlug: string, variantId: string, quantity: number) {
    if (quantity < 1) {
      removeItem(designSlug, variantId);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (sameLine(l, designSlug, variantId) ? { ...l, quantity } : l)),
    );
  }

  function clear() {
    setLines([]);
  }

  const totalCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <CartContext.Provider
      value={{ lines, addItem, removeItem, setQuantity, clear, totalCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/** Resolves cart lines into full design/variant records, dropping any that no longer exist. */
export function resolveCartLines(lines: CartLine[]) {
  return lines
    .map((line) => {
      const design = getDesign(line.designSlug);
      const variant = design && getVariant(design, line.variantId);
      if (!design || !variant) return null;
      return { line, design, variant };
    })
    .filter((x): x is { line: CartLine; design: NonNullable<ReturnType<typeof getDesign>>; variant: NonNullable<ReturnType<typeof getVariant>> } => x !== null);
}
