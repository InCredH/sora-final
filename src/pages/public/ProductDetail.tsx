import { Link, useParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { usePageTitle } from "@/hooks/usePageMeta";
import { getRelated } from "@/lib/product";
import { Gallery } from "@/components/product/Gallery";
import { PurchaseControls } from "@/components/product/PurchaseControls";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductBadges } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { StockLabel } from "@/components/ui/StockLabel";
import { AccordionItem } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { EmptyState, ErrorState } from "@/components/ui/States";
import type { Product } from "@/types/product";

const Spec = ({ label, value }: { label: string; value: string }) =>
  value ? (
    <div className="grid grid-cols-[8.5rem_1fr] gap-4 border-b hairline py-3 first:pt-0 last:border-0">
      <dt className="t-label text-[0.625rem] leading-[1.9] text-espresso/60">{label}</dt>
      <dd>{value}</dd>
    </div>
  ) : null;

function Details({ p }: { p: Product }) {
  return (
    <div className="mt-12 border-t hairline">
      <AccordionItem title="Description" defaultOpen><p>{p.description || p.shortDescription}</p></AccordionItem>
      <AccordionItem title="Specifications">
        <dl>
          <Spec label="SKU" value={p.sku} />
          <Spec label="Material" value={p.material} />
          <Spec label="Color" value={p.color} />
          <Spec label="Dimensions" value={p.dimensions} />
          <Spec label="UV protection" value={p.uvProtection} />
        </dl>
        {p.specifications.filter(Boolean).length > 0 && (
          <ul className="mt-5 space-y-1.5">{p.specifications.filter(Boolean).map((s, i) => <li key={i} className="flex gap-3"><span className="mt-[0.7em] h-px w-3 shrink-0 bg-champagne" />{s}</li>)}</ul>
        )}
      </AccordionItem>
      {p.careInstructions && <AccordionItem title="Care"><p>{p.careInstructions}</p></AccordionItem>}
      {p.shippingInformation && <AccordionItem title="Shipping"><p>{p.shippingInformation}</p></AccordionItem>}
      {p.returnInformation && <AccordionItem title="Returns"><p>{p.returnInformation}</p></AccordionItem>}
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const { status, all, visible, error, retry } = useProducts();
  const product = visible.find((p) => p.slug === slug);
  usePageTitle(product?.name ?? "Product");

  if (status === "error") return <div className="wrap py-24"><ErrorState message={error ?? ""} onRetry={retry} /></div>;
  if (status === "loading") return <div className="wrap py-24"><div className="skeleton aspect-[16/9]" /></div>;
  if (!product)
    return (
      <div className="wrap py-24">
        <EmptyState title="This product isn't available." body="It may have been removed or is no longer on sale." action={<Button to="/shop">BACK TO SHOP</Button>} />
      </div>
    );

  const related = getRelated(product, all);
  return (
    <>
      <div className="wrap pb-10 pt-8 md:pb-16 md:pt-12">
        <nav aria-label="Breadcrumb" className="t-label mb-8 flex flex-wrap gap-2 text-[0.625rem] text-espresso/55">
          <Link to="/" className="hover:text-espresso">Home</Link>/<Link to="/shop" className="hover:text-espresso">Shop</Link>/<span className="text-espresso">{product.name}</span>
        </nav>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20">
          <Gallery media={product.images} name={product.name} />
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductBadges product={product} showFeatured />
            <h1 className="t-display mt-4 text-[clamp(2.6rem,5vw,4.2rem)]">{product.name}</h1>
            <p className="t-label mt-3 text-[0.625rem] text-espresso/55">SKU {product.sku} · {product.category}</p>
            <div className="mt-6"><Price product={product} size="lg" /></div>
            <div className="mt-4"><StockLabel product={product} showCount /></div>
            <p className="mt-7 text-[0.9375rem] leading-[1.85] text-espresso/80">{product.shortDescription}</p>
            <div className="mt-9"><PurchaseControls product={product} /></div>
            <Details p={product} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t hairline">
          <div className="wrap py-20 md:py-28">
            <h2 className="t-display mb-10 text-[clamp(2rem,4vw,3.25rem)] md:mb-14">YOU MAY ALSO LIKE</h2>
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </>
  );
}
