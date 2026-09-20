import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, Product } from "@/types/product";
import { useProducts } from "@/hooks/useProducts";
import { getCurrentPrice } from "@/lib/pricing";
import { isSoldOut } from "@/lib/inventory";

const KEY = "sora:cart:v1";

export interface CartLine {
  product: Product;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  soldOut: boolean;
  /** true when the requested quantity was reduced to what is in stock */
  clamped: boolean;
}

interface CartApi {
  lines: CartLine[];
  count: number;
  subtotal: number;
  hasUnavailable: boolean;
  add: (product: Product, qty?: number) => { ok: boolean; message?: string };
  setQuantity: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

const Ctx = createContext<CartApi | null>(null);
export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
};

const readItems = (): CartItem[] => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(raw) ? raw.filter((i) => i && typeof i.productId === "string" && i.quantity > 0) : [];
  } catch { return []; }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const { all } = useProducts();
  const [items, setItems] = useState<CartItem[]>(readItems);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }, [items]);

  // The cart only stores ids + quantities. Prices, names and stock are always read live from the product store.
  const lines = useMemo<CartLine[]>(() => {
    return items.flatMap((it) => {
      const product = all.find((p) => p.id === it.productId && !p.isArchived && p.isActive && !p.isDraft);
      if (!product) return [];
      const soldOut = isSoldOut(product);
      const max = soldOut ? 0 : product.inventoryQuantity;
      const quantity = soldOut ? it.quantity : Math.min(it.quantity, max);
      const unitPrice = getCurrentPrice(product);
      return [{ product, quantity, unitPrice, lineTotal: soldOut ? 0 : unitPrice * quantity, soldOut, clamped: quantity < it.quantity }];
    });
  }, [items, all]);

  const add = useCallback<CartApi["add"]>((product, qty = 1) => {
    if (isSoldOut(product)) return { ok: false, message: "This item is sold out." };
    const existing = items.find((i) => i.productId === product.id);
    const wanted = (existing?.quantity ?? 0) + qty;
    const next = Math.min(wanted, product.inventoryQuantity);
    setItems(existing
      ? items.map((i) => (i.productId === product.id ? { ...i, quantity: next } : i))
      : [...items, { productId: product.id, quantity: next }]);
    return { ok: true, message: next < wanted ? `Only ${product.inventoryQuantity} available.` : undefined };
  }, [items]);

  const setQuantity = useCallback((productId: string, qty: number) => {
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity: Math.max(1, qty) } : i)));
  }, []);
  const remove = useCallback((productId: string) => setItems((prev) => prev.filter((i) => i.productId !== productId)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartApi>(() => ({
    lines,
    count: lines.reduce((n, l) => n + (l.soldOut ? 0 : l.quantity), 0),
    subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
    hasUnavailable: lines.some((l) => l.soldOut),
    add, setQuantity, remove, clear,
  }), [lines, add, setQuantity, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
