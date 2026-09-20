import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FAQ, LEGAL, SHIPPING_SECTIONS } from "@/data/siteContent";
import { usePageTitle } from "@/hooks/usePageMeta";
import { AccordionItem } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

const Shell = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="wrap max-w-5xl pb-28 pt-16 md:pt-24">
    <h1 className="t-display mb-12 text-[clamp(2.75rem,6.5vw,5.5rem)] md:mb-16">{title}</h1>
    {children}
  </div>
);

export function Faq() {
  usePageTitle("FAQ");
  return (
    <Shell title="FAQ">
      <div className="border-t hairline">{FAQ.map((f, i) => <AccordionItem key={f.q} title={f.q} defaultOpen={i === 0}><p>{f.a}</p></AccordionItem>)}</div>
      <p className="mt-12 text-[0.9375rem] text-espresso/70">Still wondering? <Link to="/contact" className="border-b border-champagne pb-0.5 text-espresso">Get in touch</Link>.</p>
    </Shell>
  );
}

export function ShippingReturns() {
  usePageTitle("Shipping & Returns");
  const [params] = useSearchParams();
  const section = params.get("section");
  useEffect(() => {
    if (section) document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [section]);
  return (
    <Shell title="Shipping & Returns">
      <div className="space-y-20">
        {SHIPPING_SECTIONS.map((s) => (
          <section key={s.id} id={s.id}>
            <h2 className="font-display text-3xl md:text-4xl">{s.title}</h2>
            <dl className="mt-8 grid gap-x-12 gap-y-8 border-t border-champagne pt-8 sm:grid-cols-2">
              {s.items.map((it) => (
                <div key={it.h}><dt className="t-label text-[0.6875rem]">{it.h}</dt><dd className="mt-2 text-[0.9375rem] italic text-espresso/60">{it.p}</dd></div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </Shell>
  );
}

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const c = LEGAL[kind];
  usePageTitle(c.title);
  return <Shell title={c.title}><p className="max-w-xl text-[0.9375rem] italic text-espresso/65">{c.body}</p></Shell>;
}

export function NotFound() {
  usePageTitle("Page not found");
  return (
    <Shell title="Page not found">
      <p className="max-w-md text-[0.9375rem] text-espresso/75">The page you're looking for isn't here.</p>
      <div className="mt-8"><Button to="/">BACK HOME</Button></div>
    </Shell>
  );
}
