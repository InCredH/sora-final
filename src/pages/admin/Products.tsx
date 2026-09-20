import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Archive, ArchiveRestore, Pencil, Plus, Search, Trash2 } from "lucide-react";
import type { Product } from "@/types/product";
import { useProducts } from "@/hooks/useProducts";
import { usePageTitle } from "@/hooks/usePageMeta";
import { productStore } from "@/store/productStore";
import { useToast } from "@/store/toast";
import { getPrimaryImageSrc, matchesQuery } from "@/lib/product";
import { formatDate, formatINR } from "@/lib/format";
import { getStockStatus, STOCK_LABEL } from "@/lib/inventory";
import { isSaleActive } from "@/lib/pricing";
import { Modal } from "@/components/ui/Modal";
import { AButton, Pill, Toggle } from "@/components/admin/ui";

function InlineNumber({ value, onCommit }: { value: number; onCommit: (n: number) => void }) {
  const [v, setV] = useState(String(value));
  useEffect(() => setV(String(value)), [value]);
  const commit = () => { const n = Math.max(0, Math.floor(Number(v))); if (Number.isFinite(n) && n !== value) onCommit(n); else setV(String(value)); };
  return <input type="number" min={0} aria-label="Stock quantity" value={v} onChange={(e) => setV(e.target.value)} onBlur={commit} onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()} className="field !w-[4.5rem] !px-2 !py-1.5 text-center tabular-nums" />;
}

const statusOf = (p: Product) => (p.isArchived ? "archived" : p.isDraft ? "draft" : p.isActive ? "active" : "inactive");
const STATUS_PILL = { active: ["olive", "ACTIVE"], inactive: ["muted", "INACTIVE"], draft: ["champagne", "DRAFT"], archived: ["muted", "ARCHIVED"] } as const;

export default function Products() {
  usePageTitle("Products — Admin");
  const { all } = useProducts();
  const toast = useToast();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"all" | "active" | "draft" | "archived">("all");
  const [toDelete, setToDelete] = useState<Product | null>(null);

  const report = (r: { ok: boolean; error?: string }, okMsg: string) => toast.show(r.ok ? okMsg : (r as { error: string }).error);
  const list = all.filter((p) => matchesQuery(p, q) && (tab === "all" ? !p.isArchived : tab === "active" ? statusOf(p) === "active" : tab === "draft" ? p.isDraft && !p.isArchived : p.isArchived));

  const toggleSale = (p: Product, on: boolean) => {
    if (on && !(p.salePrice && p.salePrice < p.price)) return toast.show("Add a sale price in Edit first.");
    report(productStore.patch(p.id, { isOnSale: on }), on ? "Sale switched on." : "Sale switched off.");
  };

  const tabs = [["all", "All"], ["active", "Active"], ["draft", "Drafts"], ["archived", "Archived"]] as const;

  return (
    <div className="mx-auto max-w-[80rem]">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h1 className="t-display text-4xl md:text-5xl">Products</h1>
        <Link to="/admin/products/new" className="t-label inline-flex items-center gap-2 border border-espresso bg-espresso px-6 py-4 text-ivory hover:bg-olive hover:border-olive"><Plus strokeWidth={1.5} className="h-4 w-4" /> ADD PRODUCT</Link>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search strokeWidth={1.3} className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, SKU or category" aria-label="Search products" className="field !pl-10" />
        </div>
        <div className="flex gap-1.5" role="tablist">
          {tabs.map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`t-label border px-3.5 py-2.5 text-[0.625rem] ${tab === k ? "border-espresso bg-espresso text-ivory" : "border-espresso/25 hover:border-espresso"}`}>{l}</button>)}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="border border-dashed border-espresso/30 px-6 py-16 text-center text-espresso/70">{all.length === 0 ? "No products yet. Click ADD PRODUCT to create the first one." : "No products found."}</div>
      ) : (
        <>
          {/* desktop table */}
          <div className="hidden overflow-x-auto border hairline bg-white/50 lg:block">
            <table className="w-full min-w-[64rem] text-left text-[0.8125rem]">
              <thead className="t-label border-b hairline text-[0.5625rem] text-espresso/60">
                <tr>{["", "Product", "SKU", "Price", "Stock", "Status", "New", "Sale", "Featured", "Updated", ""].map((h, i) => <th key={i} className="px-3 py-3.5 font-medium">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-espresso/15">
                {list.map((p) => {
                  const st = getStockStatus(p);
                  const [tone, label] = STATUS_PILL[statusOf(p)];
                  return (
                    <tr key={p.id} className={p.isArchived ? "opacity-60" : ""}>
                      <td className="px-3 py-3"><div className="h-16 w-12 bg-ivory-deep"><img src={getPrimaryImageSrc(p)} alt="" className="h-full w-full object-cover" /></div></td>
                      <td className="px-3 py-3"><Link to={`/admin/products/${p.id}`} className="font-medium hover:underline">{p.name}</Link><div className="text-xs text-espresso/55">{p.category}</div></td>
                      <td className="whitespace-nowrap px-3 py-3 tabular-nums">{p.sku}</td>
                      <td className="px-3 py-3 tabular-nums">{isSaleActive(p) ? <><span className="text-burgundy">{formatINR(p.salePrice!)}</span><br /><s className="text-xs text-espresso/50">{formatINR(p.price)}</s></> : formatINR(p.price)}</td>
                      <td className="px-3 py-3"><InlineNumber value={p.inventoryQuantity} onCommit={(n) => report(productStore.setInventory(p.id, n), "Stock updated.")} /><div className="mt-1"><Pill tone={st === "in-stock" ? "olive" : st === "low-stock" ? "champagne" : "burgundy"}>{STOCK_LABEL[st]}</Pill></div></td>
                      <td className="px-3 py-3"><Pill tone={tone}>{label}</Pill></td>
                      <td className="px-3 py-3"><Toggle compact checked={p.isNew} label={`${p.name}: new`} onChange={(v) => report(productStore.patch(p.id, { isNew: v }), v ? "Marked as new." : "No longer new.")} /></td>
                      <td className="px-3 py-3"><Toggle compact checked={isSaleActive(p)} label={`${p.name}: on sale`} onChange={(v) => toggleSale(p, v)} /></td>
                      <td className="px-3 py-3"><Toggle compact checked={p.isFeatured} label={`${p.name}: featured`} onChange={(v) => report(productStore.patch(p.id, { isFeatured: v }), v ? "Now featured." : "Removed from featured.")} /></td>
                      <td className="whitespace-nowrap px-3 py-3 text-xs text-espresso/65">{formatDate(p.updatedAt)}</td>
                      <td className="px-3 py-3"><Actions p={p} onDelete={() => setToDelete(p)} report={report} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* mobile cards */}
          <ul className="space-y-3 lg:hidden">
            {list.map((p) => {
              const st = getStockStatus(p);
              const [tone, label] = STATUS_PILL[statusOf(p)];
              return (
                <li key={p.id} className={`border hairline bg-white/50 p-4 ${p.isArchived ? "opacity-60" : ""}`}>
                  <div className="flex gap-4">
                    <img src={getPrimaryImageSrc(p)} alt="" className="h-24 w-[4.75rem] shrink-0 object-cover" />
                    <div className="min-w-0 flex-1">
                      <Link to={`/admin/products/${p.id}`} className="block truncate font-display text-xl">{p.name}</Link>
                      <p className="text-xs text-espresso/55">{p.sku} · {p.category}</p>
                      <p className="mt-1 text-sm">{isSaleActive(p) ? <><span className="text-burgundy">{formatINR(p.salePrice!)}</span> <s className="text-xs text-espresso/50">{formatINR(p.price)}</s></> : formatINR(p.price)}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5"><Pill tone={tone}>{label}</Pill><Pill tone={st === "in-stock" ? "olive" : st === "low-stock" ? "champagne" : "burgundy"}>{STOCK_LABEL[st]}</Pill>{p.isNew && <Pill tone="espresso">NEW</Pill>}{isSaleActive(p) && <Pill tone="burgundy">SALE</Pill>}{p.isFeatured && <Pill tone="champagne">FEATURED</Pill>}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t hairline pt-3">
                    <label className="flex items-center gap-2 text-xs">Stock <InlineNumber value={p.inventoryQuantity} onCommit={(n) => report(productStore.setInventory(p.id, n), "Stock updated.")} /></label>
                    <Actions p={p} onDelete={() => setToDelete(p)} report={report} />
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} label="Delete product">
        {toDelete && (
          <div className="p-8">
            <h2 className="font-display text-2xl">Delete {toDelete.name}?</h2>
            <p className="mt-3 text-[0.9375rem] text-espresso/75">This permanently removes the product and can't be undone. To just hide it from the website, use Archive instead.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AButton tone="danger" onClick={() => { report(productStore.remove(toDelete.id), "Product deleted."); setToDelete(null); }}>DELETE</AButton>
              <AButton tone="outline" onClick={() => { report(productStore.setArchived(toDelete.id, true), "Product archived."); setToDelete(null); }}>ARCHIVE INSTEAD</AButton>
              <AButton tone="outline" onClick={() => setToDelete(null)}>CANCEL</AButton>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Actions({ p, onDelete, report }: { p: Product; onDelete: () => void; report: (r: { ok: boolean; error?: string }, m: string) => void }) {
  const b = "inline-flex items-center gap-1.5 px-2.5 py-2 text-xs hover:bg-espresso/10";
  return (
    <div className="flex flex-wrap justify-end gap-0.5">
      <Link to={`/admin/products/${p.id}`} className={b}><Pencil strokeWidth={1.4} className="h-3.5 w-3.5" /> Edit</Link>
      <button className={b} onClick={() => report(productStore.setArchived(p.id, !p.isArchived), p.isArchived ? "Product restored." : "Product archived.")}>
        {p.isArchived ? <ArchiveRestore strokeWidth={1.4} className="h-3.5 w-3.5" /> : <Archive strokeWidth={1.4} className="h-3.5 w-3.5" />} {p.isArchived ? "Restore" : "Archive"}
      </button>
      <button className={`${b} text-burgundy`} onClick={onDelete}><Trash2 strokeWidth={1.4} className="h-3.5 w-3.5" /> Delete</button>
    </div>
  );
}
