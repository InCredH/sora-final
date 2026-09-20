import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Product } from "@/types/product";
import { useProducts } from "@/hooks/useProducts";
import { usePageTitle } from "@/hooks/usePageMeta";
import { productStore } from "@/store/productStore";
import { useToast } from "@/store/toast";
import { CATEGORIES, emptyProduct } from "@/lib/product";
import { formatINR } from "@/lib/format";
import { getDiscountPercent, isSaleActive } from "@/lib/pricing";
import { StockLabel } from "@/components/ui/StockLabel";
import { AButton, Field, Panel, Toggle } from "@/components/admin/ui";
import { ImageManager } from "@/components/admin/ImageManager";

const num = (v: string) => (v === "" ? 0 : Math.max(0, Number(v)));

export default function ProductForm() {
  const { id } = useParams();
  const { all, status } = useProducts();
  const existing = id ? all.find((p) => p.id === id) : undefined;
  if (id && status === "ready" && !existing)
    return <div className="mx-auto max-w-xl border hairline p-10 text-center"><p className="font-display text-2xl">Product not found</p><Link to="/admin/products" className="t-label mt-6 inline-block border-b border-champagne pb-1">BACK TO PRODUCTS</Link></div>;
  return <Form key={existing?.id ?? "new"} initial={existing ?? emptyProduct()} isNew={!existing} />;
}

function Form({ initial, isNew }: { initial: Product; isNew: boolean }) {
  usePageTitle(isNew ? "Add product — Admin" : "Edit product — Admin");
  const navigate = useNavigate();
  const toast = useToast();
  const { all } = useProducts();
  const [p, setP] = useState<Product>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveError, setSaveError] = useState("");
  const [newCat, setNewCat] = useState(false);

  const categories = useMemo(() => Array.from(new Set([...CATEGORIES, ...all.map((x) => x.category).filter(Boolean)])), [all]);
  const set = <K extends keyof Product>(k: K, v: Product[K]) => setP((prev) => ({ ...prev, [k]: v }));
  const visibility = p.isDraft ? "draft" : p.isActive ? "active" : "inactive";
  const setVisibility = (v: string) => setP((prev) => ({ ...prev, isDraft: v === "draft", isActive: v === "active" }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!p.name.trim()) e.name = "Give the product a name.";
    if (!p.sku.trim()) e.sku = "Add a SKU.";
    else if (all.some((x) => x.id !== p.id && x.sku.trim().toLowerCase() === p.sku.trim().toLowerCase())) e.sku = "Another product already uses this SKU.";
    if (!p.category.trim()) e.category = "Choose or add a category.";
    if (!(p.price > 0)) e.price = "Enter a price above 0.";
    if (p.isOnSale && !(p.salePrice && p.salePrice > 0 && p.salePrice < p.price)) e.salePrice = "Enter a sale price lower than the regular price, or switch Sale off.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = () => {
    setSaveError("");
    if (!validate()) { setSaveError("Please fix the highlighted fields."); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const clean: Product = {
      ...p,
      name: p.name.trim(),
      sku: p.sku.trim(),
      category: p.category.trim(),
      inventoryQuantity: Math.floor(p.inventoryQuantity),
      specifications: p.specifications.map((s) => s.trim()).filter(Boolean),
      images: p.images.map((m) => ({ ...m, alt: m.alt || p.name.trim() })),
    };
    const r = productStore.save(clean);
    if (!r.ok) return setSaveError(r.error);
    toast.show(isNew ? "Product added." : "Changes saved.");
    navigate("/admin/products");
  };

  const err = (k: string) => errors[k];
  const cls = (k: string) => `field ${errors[k] ? "!border-burgundy" : ""}`;

  return (
    <div className="mx-auto max-w-4xl pb-28">
      <Link to="/admin/products" className="t-label text-[0.625rem] text-espresso/60 hover:text-espresso">← PRODUCTS</Link>
      <h1 className="t-display mb-8 mt-3 text-4xl md:text-5xl">{isNew ? "Add product" : p.name || "Edit product"}</h1>
      {saveError && <p role="alert" className="mb-6 border border-burgundy/40 bg-burgundy/5 p-4 text-sm text-burgundy">{saveError}</p>}

      <div className="space-y-6">
        <Panel title="Basic information">
          <Field label="Product name" htmlFor="name" error={err("name")}><input id="name" value={p.name} onChange={(e) => set("name", e.target.value)} className={cls("name")} /></Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="SKU" htmlFor="sku" error={err("sku")} hint="A unique code, e.g. SORA-SG-004."><input id="sku" value={p.sku} onChange={(e) => set("sku", e.target.value)} className={cls("sku")} /></Field>
            <Field label="Category" htmlFor="cat" error={err("category")}>
              {newCat ? (
                <div className="flex gap-2"><input id="cat" autoFocus placeholder="New category name" value={p.category} onChange={(e) => set("category", e.target.value)} className={cls("category")} /><AButton type="button" tone="outline" onClick={() => { setNewCat(false); set("category", categories[0]); }}>CANCEL</AButton></div>
              ) : (
                <select id="cat" value={p.category} onChange={(e) => e.target.value === "__new" ? (setNewCat(true), set("category", "")) : set("category", e.target.value)} className={cls("category")}>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                  <option value="__new">+ Add new category…</option>
                </select>
              )}
            </Field>
          </div>
          <Field label="Short description" htmlFor="short" hint="One or two lines shown on cards and near the price."><textarea id="short" rows={2} value={p.shortDescription} onChange={(e) => set("shortDescription", e.target.value)} className="field resize-y" /></Field>
          <Field label="Full description" htmlFor="desc"><textarea id="desc" rows={6} value={p.description} onChange={(e) => set("description", e.target.value)} className="field resize-y" /></Field>
        </Panel>

        <Panel title="Pricing" hint="Prices are in Indian rupees (₹).">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Regular price (₹)" htmlFor="price" error={err("price")}><input id="price" type="number" min={0} inputMode="numeric" value={p.price || ""} onChange={(e) => set("price", num(e.target.value))} className={cls("price")} /></Field>
            <Field label="Sale price (₹)" htmlFor="sale" error={err("salePrice")} hint="Leave empty if there is no sale.">
              <input id="sale" type="number" min={0} inputMode="numeric" value={p.salePrice ?? ""} onChange={(e) => { const v = e.target.value === "" ? null : num(e.target.value); setP((prev) => ({ ...prev, salePrice: v, isOnSale: v === null ? false : prev.salePrice === null ? true : prev.isOnSale })); }} className={cls("salePrice")} />
            </Field>
          </div>
          <div className="border-t hairline pt-5 text-sm">
            <span className="t-label mr-3 text-[0.625rem] text-espresso/55">Customers will see</span>
            {isSaleActive(p) ? <><b className="font-medium text-burgundy">{formatINR(p.salePrice!)}</b> <s className="mx-1 text-espresso/50">{formatINR(p.price)}</s> <span className="t-label text-[0.625rem] text-burgundy">{getDiscountPercent(p)}% OFF</span></> : <b className="font-medium">{p.price ? formatINR(p.price) : "—"}</b>}
          </div>
        </Panel>

        <Panel title="Inventory">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Stock quantity" htmlFor="qty" hint="At 0 the product shows SOLD OUT automatically."><input id="qty" type="number" min={0} inputMode="numeric" value={p.inventoryQuantity} onChange={(e) => set("inventoryQuantity", num(e.target.value))} className="field" /></Field>
            <Field label="Low-stock threshold" htmlFor="low" hint="Shows LOW STOCK at or below this number."><input id="low" type="number" min={0} inputMode="numeric" value={p.lowStockThreshold} onChange={(e) => set("lowStockThreshold", num(e.target.value))} className="field" /></Field>
          </div>
          <Toggle checked={p.forceSoldOut} onChange={(v) => set("forceSoldOut", v)} label="Mark as sold out" hint="Shows SOLD OUT and disables buying, even if stock remains." />
          <div className="border-t hairline pt-5 text-sm"><span className="t-label mr-3 text-[0.625rem] text-espresso/55">Status on website</span><StockLabel product={p} showCount /></div>
        </Panel>

        <Panel title="Images" hint="Upload photos, choose the cover and set the order.">
          <ImageManager images={p.images} name={p.name} onChange={(imgs) => set("images", imgs)} />
        </Panel>

        <Panel title="Product details">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Material" htmlFor="mat"><input id="mat" value={p.material} onChange={(e) => set("material", e.target.value)} className="field" /></Field>
            <Field label="Color" htmlFor="color"><input id="color" value={p.color} onChange={(e) => set("color", e.target.value)} className="field" /></Field>
            <Field label="Dimensions" htmlFor="dim"><input id="dim" value={p.dimensions} onChange={(e) => set("dimensions", e.target.value)} className="field" /></Field>
            <Field label="UV protection" htmlFor="uv"><input id="uv" value={p.uvProtection} onChange={(e) => set("uvProtection", e.target.value)} className="field" /></Field>
          </div>
          <Field label="Specifications" htmlFor="specs" hint="One per line."><textarea id="specs" rows={4} value={p.specifications.join("\n")} onChange={(e) => set("specifications", e.target.value.split("\n"))} className="field resize-y" /></Field>
          <Field label="Care instructions" htmlFor="care"><textarea id="care" rows={2} value={p.careInstructions} onChange={(e) => set("careInstructions", e.target.value)} className="field resize-y" /></Field>
          <Field label="Shipping information" htmlFor="ship"><textarea id="ship" rows={2} value={p.shippingInformation} onChange={(e) => set("shippingInformation", e.target.value)} className="field resize-y" /></Field>
          <Field label="Return information" htmlFor="ret"><textarea id="ret" rows={2} value={p.returnInformation} onChange={(e) => set("returnInformation", e.target.value)} className="field resize-y" /></Field>
        </Panel>

        <Panel title="Product status">
          <fieldset>
            <legend className="mb-2 text-[0.8125rem] font-medium">Visibility</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {[["active", "Active", "Live on the website"], ["inactive", "Inactive", "Hidden from the website"], ["draft", "Draft", "Hidden — still being written"]].map(([v, l, h]) => (
                <label key={v} className={`cursor-pointer border p-3.5 ${visibility === v ? "border-espresso bg-espresso/5" : "hairline hover:border-espresso/50"}`}>
                  <input type="radio" name="visibility" className="sr-only" checked={visibility === v} onChange={() => setVisibility(v)} />
                  <span className="block text-sm font-medium">{l}</span><span className="block text-xs text-espresso/60">{h}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid gap-5 border-t hairline pt-5 sm:grid-cols-3">
            <Toggle checked={p.isNew} onChange={(v) => set("isNew", v)} label="New" hint="Adds the NEW badge and lists it in New Arrivals." />
            <Toggle checked={p.isOnSale} onChange={(v) => set("isOnSale", v)} label="On sale" hint="Shows the sale price and SALE badge." />
            <Toggle checked={p.isFeatured} onChange={(v) => set("isFeatured", v)} label="Featured" hint="Shows it in Featured on the home page." />
          </div>
        </Panel>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t hairline bg-ivory/95 backdrop-blur lg:left-[15.5rem]" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <div className="mx-auto flex max-w-4xl items-center justify-end gap-3 px-4 py-3 md:px-10">
          <AButton tone="outline" type="button" onClick={() => navigate("/admin/products")}>CANCEL</AButton>
          <AButton type="button" onClick={save}>{isNew ? "SAVE PRODUCT" : "SAVE CHANGES"}</AButton>
        </div>
      </div>
    </div>
  );
}
