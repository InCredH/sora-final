import type { Product } from "@/types/product";
import { localStorageRepository, type ProductRepository } from "@/services/productRepository";
import { uniqueSlug } from "@/lib/product";

/**
 * Centralised product store. Every public page and every admin screen reads
 * from — and writes to — this one place, so an admin edit shows up everywhere
 * (and in other open tabs) immediately.
 */
export interface StoreState {
  status: "loading" | "ready" | "error";
  products: Product[];
  error?: string;
}
export type SaveResult = { ok: true } | { ok: false; error: string };

const repo: ProductRepository = localStorageRepository;
const listeners = new Set<() => void>();
let state: StoreState = { status: "loading", products: [] };

const emit = (next: StoreState) => {
  state = next;
  listeners.forEach((l) => l());
};

export const load = () => {
  try {
    emit({ status: "ready", products: repo.load() });
  } catch {
    emit({ status: "error", products: [], error: "We couldn't load the products." });
  }
};

const isQuota = (e: unknown) =>
  e instanceof DOMException && (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED");

const commit = (products: Product[]): SaveResult => {
  try {
    repo.save(products);
    emit({ status: "ready", products });
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: isQuota(e)
        ? "Browser storage is full. Remove a few images or products, then try again."
        : "Changes could not be saved.",
    };
  }
};

export const productStore = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  getSnapshot: () => state,

  save(product: Product): SaveResult {
    const now = new Date().toISOString();
    const exists = state.products.some((p) => p.id === product.id);
    const next: Product = {
      ...product,
      slug: uniqueSlug(product.name, state.products, product.id),
      updatedAt: now,
      createdAt: exists ? product.createdAt : now,
    };
    return commit(exists ? state.products.map((p) => (p.id === next.id ? next : p)) : [next, ...state.products]);
  },
  remove(id: string): SaveResult {
    return commit(state.products.filter((p) => p.id !== id));
  },
  setArchived(id: string, archived: boolean): SaveResult {
    return commit(state.products.map((p) => (p.id === id ? { ...p, isArchived: archived, updatedAt: new Date().toISOString() } : p)));
  },
  patch(id: string, changes: Partial<Product>): SaveResult {
    return commit(state.products.map((p) => (p.id === id ? { ...p, ...changes, updatedAt: new Date().toISOString() } : p)));
  },
  setInventory(id: string, quantity: number): SaveResult {
    const q = Math.max(0, Math.floor(quantity) || 0);
    return commit(state.products.map((p) => (p.id === id ? { ...p, inventoryQuantity: q, updatedAt: new Date().toISOString() } : p)));
  },
  resetDemoData(): SaveResult {
    try {
      emit({ status: "ready", products: repo.reset() });
      return { ok: true };
    } catch {
      return { ok: false, error: "Could not reset the demo data." };
    }
  },
};

// initial load + sync with other tabs
load();
repo.onExternalChange?.(load);
