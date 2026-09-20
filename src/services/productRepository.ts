import type { Product } from "@/types/product";
import { seedProducts } from "@/data/seedProducts";
import { emptyProduct } from "@/lib/product";

/**
 * Persistence boundary for product data.
 * Today: browser localStorage (fine for a demo / single-editor preview).
 * Later: implement this same interface against a real API or database
 * (Supabase, Firebase, Postgres…) and pass it to the store — no page code changes.
 */
export interface ProductRepository {
  load(): Product[];
  save(products: Product[]): void; // throws if it cannot persist
  reset(): Product[];
  /** Notified when another tab/window changes the data */
  onExternalChange?(cb: () => void): () => void;
}

const KEY = "sora:products:v1";

const normalise = (raw: unknown): Product[] =>
  (Array.isArray(raw) ? raw : []).map((p) => ({ ...emptyProduct(), ...(p as Partial<Product>) }));

let storageBlocked = false; // e.g. private mode / sandboxed frames — fall back to memory for this session
let memory: Product[] | null = null;

const read = (): string | null => {
  try { return localStorage.getItem(KEY); } catch { storageBlocked = true; return null; }
};
const write = (products: Product[]) => {
  memory = products;
  if (storageBlocked) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(products));
  } catch (e) {
    const quota = e instanceof DOMException && (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED");
    if (quota) throw e;
    storageBlocked = true;
  }
};

export const localStorageRepository: ProductRepository = {
  load() {
    const stored = read();
    if (stored === null) {
      const seeded = memory ?? seedProducts();
      try { write(seeded); } catch { /* keep in memory */ }
      return seeded;
    }
    try {
      return normalise(JSON.parse(stored));
    } catch {
      return seedProducts();
    }
  },
  save(products) {
    write(products);
  },
  reset() {
    const seeded = seedProducts();
    write(seeded);
    return seeded;
  },
  onExternalChange(cb) {
    const handler = (e: StorageEvent) => { if (e.key === KEY) cb(); };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  },
};
