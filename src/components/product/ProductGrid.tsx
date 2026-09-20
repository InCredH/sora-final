import type { ReactNode } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, trailing, className = "" }: { products: Product[]; trailing?: ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14 xl:grid-cols-4 ${className}`}>
      {products.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 4} />)}
      {trailing}
    </div>
  );
}
