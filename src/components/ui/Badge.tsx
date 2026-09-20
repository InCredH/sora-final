import type { Product } from "@/types/product";
import { isSaleActive } from "@/lib/pricing";
import { isSoldOut } from "@/lib/inventory";

const styles = {
  NEW: "bg-ivory text-espresso border-espresso/70",
  SALE: "bg-burgundy text-ivory border-burgundy",
  "SOLD OUT": "bg-espresso text-ivory border-espresso",
  FEATURED: "bg-ivory text-espresso border-champagne",
} as const;

export function Badge({ kind }: { kind: keyof typeof styles }) {
  return <span className={`t-label border px-2.5 py-1 text-[0.625rem] leading-none tracking-[0.18em] ${styles[kind]}`}>{kind}</span>;
}

/** Badges are derived from product data only — nothing is hard-coded per page. */
export function ProductBadges({ product, showFeatured = false }: { product: Product; showFeatured?: boolean }) {
  const kinds: Array<keyof typeof styles> = [];
  if (isSoldOut(product)) kinds.push("SOLD OUT");
  if (isSaleActive(product)) kinds.push("SALE");
  if (product.isNew) kinds.push("NEW");
  if (showFeatured && product.isFeatured) kinds.push("FEATURED");
  if (!kinds.length) return null;
  return <div className="flex flex-wrap gap-1.5">{kinds.map((k) => <Badge key={k} kind={k} />)}</div>;
}
