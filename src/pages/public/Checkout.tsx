import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/store/cart";
import { usePageTitle } from "@/hooks/usePageMeta";
import { formatINR } from "@/lib/format";
import { PAYMENT_METHODS } from "@/services/paymentProvider";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";

const FIELDS = [
  { name: "name", label: "Full name", auto: "name", span: 2 },
  { name: "email", label: "Email", auto: "email", type: "email", span: 1 },
  { name: "phone", label: "Phone", auto: "tel", type: "tel", span: 1 },
  { name: "line1", label: "Address", auto: "address-line1", span: 2 },
  { name: "city", label: "City", auto: "address-level2", span: 1 },
  { name: "state", label: "State", auto: "address-level1", span: 1 },
  { name: "pincode", label: "PIN code", auto: "postal-code", span: 1 },
];

export default function Checkout() {
  usePageTitle("Checkout");
  const { lines, subtotal, hasUnavailable } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  if (lines.length === 0 && !done)
    return <div className="wrap py-24"><EmptyState title="Your cart is empty." action={<Button to="/shop">SHOP NOW</Button>} /></div>;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    FIELDS.forEach((f) => { if (!String(data.get(f.name) ?? "").trim()) next[f.name] = "Required"; });
    const email = String(data.get("email") ?? "");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email";
    setErrors(next);
    if (!Object.keys(next).length) setDone(true);
  };

  if (done)
    return (
      <div className="wrap py-24">
        <div className="mx-auto max-w-xl border hairline p-10 text-center">
          <h1 className="t-display text-4xl">Checkout preview complete</h1>
          <p className="mt-5 text-[0.9375rem] leading-[1.8] text-espresso/75">This is a placeholder. No order has been placed and nothing has been charged. Razorpay, UPI and cash on delivery will be connected here.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3"><Button to="/cart" variant="outline">BACK TO CART</Button><Button to="/shop">CONTINUE SHOPPING</Button></div>
        </div>
      </div>
    );

  return (
    <div className="wrap pb-24 pt-14 md:pt-20">
      <h1 className="t-display mb-6 text-[clamp(2.75rem,6vw,5rem)]">Checkout</h1>
      <p role="note" className="mb-12 max-w-2xl border-l-2 border-champagne pl-4 text-[0.875rem] text-espresso/75">Checkout preview — payments and order placement are not live yet.</p>

      <form onSubmit={submit} noValidate className="grid gap-12 lg:grid-cols-[1fr_24rem] lg:gap-20">
        <div className="space-y-12">
          <section>
            <h2 className="font-display text-2xl">Contact &amp; delivery</h2>
            <div className="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <div key={f.name} className={f.span === 2 ? "sm:col-span-2" : ""}>
                  <label htmlFor={f.name} className="t-label mb-2 block text-[0.625rem]">{f.label}</label>
                  <input id={f.name} name={f.name} type={f.type ?? "text"} autoComplete={f.auto} aria-invalid={!!errors[f.name]} className={`field ${errors[f.name] ? "!border-burgundy" : ""}`} />
                  {errors[f.name] && <p className="mt-1.5 text-xs text-burgundy">{errors[f.name]}</p>}
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="font-display text-2xl">Payment</h2>
            <div className="mt-6 space-y-3">
              {PAYMENT_METHODS.map((m) => (
                <label key={m.id} className="flex items-center justify-between gap-4 border hairline p-4 opacity-60">
                  <span className="flex items-center gap-4"><input type="radio" name="payment" disabled className="accent-espresso" /><span><span className="block text-[0.9375rem]">{m.label}</span><span className="block text-xs text-espresso/60">{m.description}</span></span></span>
                  <span className="t-label text-[0.625rem]">COMING SOON</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit border hairline p-7 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">Order</h2>
          <ul className="mt-5 divide-y divide-espresso/15 text-[0.875rem]">
            {lines.map((l) => (
              <li key={l.product.id} className="flex justify-between gap-4 py-3"><span>{l.product.name} <span className="text-espresso/55">× {l.quantity}</span></span><span>{l.soldOut ? "Sold out" : formatINR(l.lineTotal)}</span></li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t hairline pt-5"><span className="t-label">Total</span><span className="text-lg font-medium">{formatINR(subtotal)}</span></div>
          {hasUnavailable && <p role="alert" className="mt-4 text-sm text-burgundy">Remove sold-out items from your <Link to="/cart" className="underline">cart</Link> first.</p>}
          <div className="mt-7"><Button type="submit" block disabled={hasUnavailable}>PLACE ORDER</Button></div>
        </aside>
      </form>
    </div>
  );
}
