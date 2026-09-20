import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useCart } from "@/store/cart";
import { usePageTitle } from "@/hooks/usePageMeta";
import { formatINR } from "@/lib/format";
import { resolveSrc } from "@/lib/product";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Price } from "@/components/ui/Price";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { EmptyState } from "@/components/ui/States";

export default function Cart() {
  usePageTitle("Cart");
  const { lines, subtotal, hasUnavailable, setQuantity, remove } = useCart();

  return (
    <div className="wrap pb-24 pt-14 md:pt-20">
      <h1 className="t-display mb-10 text-[clamp(2.75rem,6vw,5rem)] md:mb-14">Cart</h1>
      {lines.length === 0 ? (
        <EmptyState title="Your cart is empty." body="Find something you'd like to see the world in." action={<Button to="/shop">SHOP NOW</Button>} />
      ) : (
        <div className="grid gap-12 lg:grid-cols-[1fr_24rem] lg:gap-20">
          <ul className="border-t hairline">
            {lines.map((l) => {
              const img = l.product.images.find((m) => m.type === "image") ?? l.product.images[0];
              return (
                <li key={l.product.id} className="grid grid-cols-[5.5rem_1fr] gap-5 border-b hairline py-6 md:grid-cols-[7.5rem_1fr] md:gap-8">
                  <Link to={`/product/${l.product.slug}`}><Img src={img ? resolveSrc(img.src) : ""} alt="" wrapperClassName="aspect-[10/11] border hairline" /></Link>
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link to={`/product/${l.product.slug}`} className="font-display text-xl md:text-2xl">{l.product.name}</Link>
                        <p className="t-label mt-1 text-[0.625rem] text-espresso/55">{l.product.sku}</p>
                      </div>
                      <button onClick={() => remove(l.product.id)} aria-label={`Remove ${l.product.name}`} className="-mr-2 grid h-9 w-9 place-items-center hover:opacity-60"><X strokeWidth={1.2} className="h-5 w-5" /></button>
                    </div>
                    <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
                      {l.soldOut ? (
                        <p className="t-label text-burgundy">SOLD OUT — REMOVE TO CONTINUE</p>
                      ) : (
                        <div>
                          <QuantityStepper value={l.quantity} onChange={(n) => setQuantity(l.product.id, n)} max={l.product.inventoryQuantity} />
                          {l.clamped && <p className="mt-2 text-xs text-espresso/60">Quantity adjusted to what's in stock.</p>}
                        </div>
                      )}
                      <div className="text-right">
                        <Price product={l.product} />
                        {!l.soldOut && l.quantity > 1 && <p className="mt-0.5 text-xs text-espresso/55">Line total {formatINR(l.lineTotal)}</p>}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="h-fit border hairline p-7 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl">Summary</h2>
            <dl className="mt-6 space-y-3 text-[0.9375rem]">
              <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-medium">{formatINR(subtotal)}</dd></div>
              <div className="flex justify-between text-espresso/60"><dt>Shipping</dt><dd>Calculated at checkout</dd></div>
            </dl>
            <div className="mt-6 flex justify-between border-t hairline pt-5"><span className="t-label">Total</span><span className="text-lg font-medium">{formatINR(subtotal)}</span></div>
            {hasUnavailable && <p role="alert" className="mt-5 text-sm text-burgundy">Remove sold-out items to continue.</p>}
            <div className="mt-7"><Button block to={hasUnavailable ? undefined : "/checkout"} disabled={hasUnavailable}>CHECKOUT</Button></div>
            <Link to="/shop" className="t-label mt-5 block text-center text-espresso/70 hover:text-espresso">CONTINUE SHOPPING</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
