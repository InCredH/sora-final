import type { Product } from "@/types/product";
import { getStockStatus, STOCK_LABEL } from "@/lib/inventory";

const dot = { "in-stock": "bg-olive", "low-stock": "bg-champagne", "sold-out": "bg-burgundy" } as const;

export function StockLabel({ product, showCount = false }: { product: Product; showCount?: boolean }) {
  const s = getStockStatus(product);
  return (
    <span className="t-label inline-flex items-center gap-2 text-[0.6875rem]">
      <span className={`h-1.5 w-1.5 rounded-full ${dot[s]}`} aria-hidden />
      {STOCK_LABEL[s]}
      {showCount && s === "low-stock" && <span className="normal-case tracking-normal text-espresso/60">· only {product.inventoryQuantity} left</span>}
    </span>
  );
}
