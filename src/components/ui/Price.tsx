import type { Product } from "@/types/product";
import { formatINR } from "@/lib/format";
import { getCurrentPrice, getDiscountPercent, isSaleActive } from "@/lib/pricing";

export function Price({ product, size = "md" }: { product: Product; size?: "md" | "lg" }) {
  const sale = isSaleActive(product);
  const main = size === "lg" ? "text-xl" : "text-[0.9375rem]";
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
      <span className={`${main} font-medium tracking-wide ${sale ? "text-burgundy" : ""}`}>{formatINR(getCurrentPrice(product))}</span>
      {sale && (
        <>
          <span className="text-[0.8125rem] text-espresso/55 line-through decoration-espresso/40">{formatINR(product.price)}</span>
          <span className="t-label text-[0.625rem] text-burgundy">{getDiscountPercent(product)}% OFF</span>
        </>
      )}
    </div>
  );
}
