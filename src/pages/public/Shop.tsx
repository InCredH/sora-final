import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { usePageTitle } from "@/hooks/usePageMeta";
import { CATEGORIES, matchesQuery } from "@/lib/product";
import { getCurrentPrice, isSaleActive } from "@/lib/pricing";
import { isSoldOut } from "@/lib/inventory";
import { ProductGrid } from "@/components/product/ProductGrid";
import { BrandTile, FILL_ORDER } from "@/components/product/FillerTiles";
import { Button } from "@/components/ui/Button";
import { EmptyState, ErrorState, GridSkeleton } from "@/components/ui/States";

const SORTS = [
  { v: "featured", l: "Featured" },
  { v: "newest", l: "Newest" },
  { v: "price-asc", l: "Price: Low to High" },
  { v: "price-desc", l: "Price: High to Low" },
];

export default function Shop() {
  usePageTitle("Shop");
  const { status, visible, error, retry } = useProducts();
  const [params, setParams] = useSearchParams();
  const [panel, setPanel] = useState(false);

  const q = params.get("q") ?? "";
  const cat = params.get("cat") ?? "";
  const min = params.get("min") ?? "";
  const max = params.get("max") ?? "";
  const avail = params.get("avail") ?? "";
  const onlyNew = params.get("new") === "1";
  const onlySale = params.get("sale") === "1";
  const sort = params.get("sort") ?? "featured";

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next, { replace: true });
  };

  const categories = useMemo(() => Array.from(new Set([...CATEGORIES, ...visible.map((p) => p.category)])).filter((c) => visible.some((p) => p.category === c)), [visible]);
  const activeCount = [cat, min, max, avail, onlyNew && "1", onlySale && "1", q].filter(Boolean).length;

  const results = useMemo(() => {
    const lo = min === "" ? null : Number(min);
    const hi = max === "" ? null : Number(max);
    const list = visible.filter((p) => {
      if (!matchesQuery(p, q)) return false;
      if (cat && p.category !== cat) return false;
      const price = getCurrentPrice(p);
      if (lo !== null && price < lo) return false;
      if (hi !== null && price > hi) return false;
      if (avail === "in" && isSoldOut(p)) return false;
      if (avail === "out" && !isSoldOut(p)) return false;
      if (onlyNew && !p.isNew) return false;
      if (onlySale && !isSaleActive(p)) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "newest") sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else if (sort === "price-asc") sorted.sort((a, b) => getCurrentPrice(a) - getCurrentPrice(b));
    else if (sort === "price-desc") sorted.sort((a, b) => getCurrentPrice(b) - getCurrentPrice(a));
    else sorted.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    return sorted;
  }, [visible, q, cat, min, max, avail, onlyNew, onlySale, sort]);

  // Keep the grid feeling full for small catalogues (unfiltered view only)
  const fill = activeCount === 0 && results.length > 0 && results.length < 12 ? (4 - (results.length % 4)) % 4 : 0;
  const tiles = Array.from({ length: fill }, (_, i) => <BrandTile key={i} kind={FILL_ORDER[i % FILL_ORDER.length]} className={i === fill - 1 && fill === 3 ? "md:hidden xl:flex" : ""} />);

  const chip = (label: string, value: string) => (
    <button
      key={label}
      onClick={() => set("cat", value)}
      aria-pressed={cat === value}
      className={`t-label border px-4 py-2.5 transition-colors ${cat === value ? "border-espresso bg-espresso text-ivory" : "border-espresso/25 hover:border-espresso"}`}
    >
      {label}
    </button>
  );

  return (
    <div className="wrap pb-24 lg:pt-14 pt-4 md:pt-20">
      <header className="lg:mb-10 md:mb-14 mb-3">
        <h1 className="t-display text-[clamp(2.75rem,6vw,5rem)]">Shop</h1>
        <p className="mt-3 text-[0.9375rem] text-espresso/65" aria-live="polite">
          {status === "ready" ? `${results.length} ${results.length === 1 ? "piece" : "pieces"}` : "\u00a0"}
        </p>
      </header>

      <div className="mb-10 space-y-5 border-y hairline py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {chip("All", "")}
            {categories.map((c) => chip(c, c))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setPanel((p) => !p)} aria-expanded={panel} className="t-label flex items-center gap-2 border border-espresso/25 px-4 py-2.5 hover:border-espresso">
              <SlidersHorizontal strokeWidth={1.2} className="h-4 w-4" /> FILTERS{activeCount > 0 && ` (${activeCount})`}
            </button>
            <label className="sr-only" htmlFor="sort">Sort</label>
            <select id="sort" value={sort} onChange={(e) => set("sort", e.target.value === "featured" ? "" : e.target.value)} className="field !w-auto !py-[0.6rem] text-[0.8125rem]">
              {SORTS.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
            </select>
          </div>
        </div>

        {panel && (
          <div className="anim-drawer grid gap-6 border-t hairline pt-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="t-label mb-2 block text-[0.625rem]" htmlFor="q">Search</label>
              <div className="relative">
                <Search strokeWidth={1.2} className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso/50" />
                <input id="q" value={q} onChange={(e) => set("q", e.target.value)} placeholder="Name, SKU or category" className="field !pl-9" />
              </div>
            </div>
            <div>
              <span className="t-label mb-2 block text-[0.625rem]">Price (₹)</span>
              <div className="flex items-center gap-2">
                <input inputMode="numeric" type="number" min={0} value={min} onChange={(e) => set("min", e.target.value)} placeholder="Min" aria-label="Minimum price" className="field" />
                <span className="text-espresso/40">–</span>
                <input inputMode="numeric" type="number" min={0} value={max} onChange={(e) => set("max", e.target.value)} placeholder="Max" aria-label="Maximum price" className="field" />
              </div>
            </div>
            <div>
              <label className="t-label mb-2 block text-[0.625rem]" htmlFor="avail">Availability</label>
              <select id="avail" value={avail} onChange={(e) => set("avail", e.target.value)} className="field">
                <option value="">All</option>
                <option value="in">In stock</option>
                <option value="out">Sold out</option>
              </select>
            </div>
            <fieldset>
              <legend className="t-label mb-2 text-[0.625rem]">Show only</legend>
              <div className="flex flex-col gap-2.5 pt-1 text-[0.875rem]">
                <label className="flex cursor-pointer items-center gap-3"><input type="checkbox" checked={onlyNew} onChange={(e) => set("new", e.target.checked ? "1" : "")} className="h-4 w-4 accent-espresso" /> New arrivals</label>
                <label className="flex cursor-pointer items-center gap-3"><input type="checkbox" checked={onlySale} onChange={(e) => set("sale", e.target.checked ? "1" : "")} className="h-4 w-4 accent-espresso" /> Sale</label>
              </div>
            </fieldset>
            {activeCount > 0 && (
              <div className="md:col-span-2 lg:col-span-4">
                <button onClick={() => setParams({}, { replace: true })} className="t-label border-b border-champagne pb-1">CLEAR ALL FILTERS</button>
              </div>
            )}
          </div>
        )}
      </div>

      {status === "loading" ? (
        <GridSkeleton count={8} />
      ) : status === "error" ? (
        <ErrorState message={error ?? "Please try again."} onRetry={retry} />
      ) : visible.length === 0 ? (
        <EmptyState title="No products available right now." body="Please check back soon." />
      ) : results.length === 0 ? (
        <EmptyState title="No products found." body="Try a different search or clear a filter." action={<Button variant="outline" onClick={() => setParams({}, { replace: true })}>CLEAR FILTERS</Button>} />
      ) : (
        <ProductGrid products={results} trailing={tiles} />
      )}
    </div>
  );
}
