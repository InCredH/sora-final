import { useMemo, useSyncExternalStore } from "react";
import { productStore, load } from "@/store/productStore";
import { isPubliclyVisible } from "@/lib/product";

export function useProducts() {
  const s = useSyncExternalStore(productStore.subscribe, productStore.getSnapshot);
  const visible = useMemo(() => s.products.filter(isPubliclyVisible), [s.products]);
  return { status: s.status, error: s.error, all: s.products, visible, retry: load };
}
