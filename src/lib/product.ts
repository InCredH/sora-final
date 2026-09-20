import type { Product, ProductMedia } from "@/types/product";
import { resolveAsset } from "@/data/assets";
import { slugify, uid } from "./format";

/** Public site only shows products the admin has published. */
export const isPubliclyVisible = (p: Product) => p.isActive && !p.isDraft && !p.isArchived;

export const getPrimaryMedia = (p: Product): ProductMedia | undefined => p.images.find((m) => m.type === "image") ?? p.images[0];

/** Turns "asset:key" references into real URLs; uploaded/remote sources pass through. */
export const resolveSrc = (src: string) => (src.startsWith("asset:") ? resolveAsset(src.slice(6)) : src);

export const getPrimaryImageSrc = (p: Product) => {
  const m = getPrimaryMedia(p);
  return m ? resolveSrc(m.src) : "";
};

export const matchesQuery = (p: Product, q: string) => {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return [p.name, p.sku, p.category].some((v) => v.toLowerCase().includes(s));
};

/** Same-category products first, then anything else, never the product itself. */
export const getRelated = (product: Product, all: Product[], limit = 4) => {
  const others = all.filter((p) => p.id !== product.id && isPubliclyVisible(p));
  const same = others.filter((p) => p.category === product.category);
  const rest = others.filter((p) => p.category !== product.category);
  return [...same, ...rest].slice(0, limit);
};

export const uniqueSlug = (name: string, all: Product[], selfId?: string) => {
  const base = slugify(name);
  let slug = base;
  let n = 2;
  while (all.some((p) => p.slug === slug && p.id !== selfId)) slug = `${base}-${n++}`;
  return slug;
};

export const emptyProduct = (): Product => {
  const now = new Date().toISOString();
  return {
    id: uid("prod"),
    name: "",
    slug: "",
    sku: "",
    category: "Sunglasses",
    price: 0,
    salePrice: null,
    inventoryQuantity: 0,
    lowStockThreshold: 5,
    forceSoldOut: false,
    images: [],
    shortDescription: "",
    description: "",
    specifications: [],
    material: "",
    color: "",
    dimensions: "",
    uvProtection: "",
    careInstructions: "",
    shippingInformation: "",
    returnInformation: "",
    isNew: false,
    isOnSale: false,
    isFeatured: false,
    isActive: true,
    isDraft: false,
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  };
};

export const CATEGORIES = ["Sunglasses", "Accessories"];
