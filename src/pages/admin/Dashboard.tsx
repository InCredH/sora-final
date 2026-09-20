import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { usePageTitle } from "@/hooks/usePageMeta";
import { getStockStatus } from "@/lib/inventory";
import { matchesQuery, getPrimaryImageSrc } from "@/lib/product";
import { isSaleActive } from "@/lib/pricing";
import { productStore } from "@/store/productStore";
import { useToast } from "@/store/toast";
import { AButton, Panel } from "@/components/admin/ui";

export default function Dashboard() {
  usePageTitle("Admin");
  const { all } = useProducts();
  const toast = useToast();
  const [q, setQ] = useState("");
  const live = all.filter((p) => !p.isArchived);

  const stats = [
    ["Total products", live.length],
    ["In stock", live.filter((p) => getStockStatus(p) === "in-stock").length],
    ["Low stock", live.filter((p) => getStockStatus(p) === "low-stock").length],
    ["Sold out", live.filter((p) => getStockStatus(p) === "sold-out").length],
    ["On sale", live.filter(isSaleActive).length],
    ["New products", live.filter((p) => p.isNew).length],
    ["Total inventory", live.reduce((n, p) => n + p.inventoryQuantity, 0)],
  ] as const;
  const results = q.trim() ? all.filter((p) => matchesQuery(p, q)).slice(0, 6) : [];

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="t-display text-4xl md:text-5xl">Overview</h1><p className="mt-2 text-[0.9375rem] text-espresso/65">A quick look at your catalogue.</p></div>
        <Link to="/admin/products/new" className="t-label inline-flex items-center gap-2 border border-espresso bg-espresso px-6 py-4 text-ivory hover:bg-olive hover:border-olive"><Plus strokeWidth={1.5} className="h-4 w-4" /> ADD PRODUCT</Link>
      </div>

      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map(([k, v], i) => (
          <div key={k} className={`border hairline bg-white/50 p-5 ${i === 6 ? "col-span-2 md:col-span-1" : ""}`}>
            <dt className="t-label text-[0.625rem] text-espresso/60">{k}</dt>
            <dd className="mt-2 font-display text-4xl tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>

      <Panel title="Find a product" hint="Search by name, SKU or category.">
        <div className="relative max-w-xl">
          <Search strokeWidth={1.3} className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Start typing…" aria-label="Search products" className="field !pl-10" />
        </div>
        {q.trim() && (results.length === 0 ? <p className="text-sm text-espresso/65">No products found.</p> : (
          <ul className="divide-y divide-espresso/15 border hairline">
            {results.map((p) => (
              <li key={p.id} className="flex items-center gap-4 p-3">
                <img src={getPrimaryImageSrc(p)} alt="" className="h-14 w-11 object-cover" />
                <div className="min-w-0 flex-1"><p className="truncate font-medium">{p.name}</p><p className="text-xs text-espresso/55">{p.sku} · {p.category}</p></div>
                <Link to={`/admin/products/${p.id}`} className="t-label border-b border-champagne pb-0.5 text-[0.625rem]">EDIT</Link>
              </li>
            ))}
          </ul>
        ))}
      </Panel>

      <Panel title="How it works">
        <ol className="grid gap-4 text-[0.875rem] md:grid-cols-3">
          <li><b className="font-medium">1. Add or edit</b><br /><span className="text-espresso/65">Use ADD PRODUCT, or EDIT on any product in Products.</span></li>
          <li><b className="font-medium">2. Photos, price, stock</b><br /><span className="text-espresso/65">Upload images, set the price, sale price and stock quantity. Switch on Sold out, New or Sale any time.</span></li>
          <li><b className="font-medium">3. Save</b><br /><span className="text-espresso/65">SAVE PRODUCT and the website updates straight away.</span></li>
        </ol>
      </Panel>

      <div className="border border-dashed border-espresso/30 p-5 text-[0.8125rem] text-espresso/70">
        <p><b className="font-medium">Demo mode.</b> Products are currently stored in this browser only, so changes appear on the website in this browser. Connecting a database makes them live for every visitor.</p>
        <div className="mt-4">
          <AButton tone="outline" onClick={() => { if (confirm("Reset all products back to the demo catalogue? Your changes will be lost.")) { const r = productStore.resetDemoData(); toast.show(r.ok ? "Demo catalogue restored." : r.error); } }}>RESET DEMO DATA</AButton>
        </div>
      </div>
    </div>
  );
}
