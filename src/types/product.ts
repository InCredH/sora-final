/**
 * The single source of truth for everything the shop sells.
 * Public pages and the admin dashboard both read/write this shape.
 * Adding a field later = add it here, in `emptyProduct()`, and in the admin form.
 */
export type MediaType = "image" | "video";

export interface ProductMedia {
  id: string;
  type: MediaType; // "video" is supported by the gallery; admin upload is images-only for now
  /** data URL, https URL, or "asset:<key>" for bundled demo imagery */
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;

  /** Regular price in INR (whole rupees) */
  price: number;
  /** Sale price in INR. Only applied while isOnSale is true and it is lower than price. */
  salePrice: number | null;

  inventoryQuantity: number;
  lowStockThreshold: number;
  /** Manual override: show SOLD OUT even if stock remains */
  forceSoldOut: boolean;

  /** First item is the primary/cover image and the thumbnail used everywhere */
  images: ProductMedia[];

  shortDescription: string;
  description: string;
  /** One specification per entry */
  specifications: string[];
  material: string;
  color: string;
  dimensions: string;
  uvProtection: string;
  careInstructions: string;
  shippingInformation: string;
  returnInformation: string;

  isNew: boolean;
  isOnSale: boolean;
  isFeatured: boolean;
  isActive: boolean; // visible on the public site
  isDraft: boolean; // unfinished — hidden from the public site
  isArchived: boolean; // removed from view but kept in the admin

  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export type StockStatus = "in-stock" | "low-stock" | "sold-out";

export interface CartItem {
  productId: string;
  quantity: number;
}
