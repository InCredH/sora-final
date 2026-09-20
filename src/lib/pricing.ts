import type { Product } from "@/types/product";

/** A sale is live only when the admin has switched it on AND the sale price is a real discount. */
export const isSaleActive = (p: Product) =>
  p.isOnSale && p.salePrice != null && p.salePrice > 0 && p.salePrice < p.price;

export const getCurrentPrice = (p: Product) => (isSaleActive(p) ? (p.salePrice as number) : p.price);

/** Rounded percentage off, e.g. ₹1,999 → ₹1,499 = 25 */
export const getDiscountPercent = (p: Product) =>
  isSaleActive(p) ? Math.round(((p.price - (p.salePrice as number)) / p.price) * 100) : 0;
