import type { Product, StockStatus } from "@/types/product";

export const getStockStatus = (p: Product): StockStatus => {
  if (p.forceSoldOut || p.inventoryQuantity <= 0) return "sold-out";
  if (p.inventoryQuantity <= p.lowStockThreshold) return "low-stock";
  return "in-stock";
};

export const isSoldOut = (p: Product) => getStockStatus(p) === "sold-out";
export const isPurchasable = (p: Product) => !isSoldOut(p);

export const STOCK_LABEL: Record<StockStatus, string> = {
  "in-stock": "IN STOCK",
  "low-stock": "LOW STOCK",
  "sold-out": "SOLD OUT",
};
