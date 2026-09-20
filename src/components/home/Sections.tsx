import { Link } from "react-router-dom";
import { Leaf, Shield, Sparkle, Sun } from "lucide-react";
import { BRAND_STATEMENT, CAMPAIGN, INSTAGRAM_TILES, SITE, VALUES } from "@/data/siteContent";
import { asset } from "@/data/assets";
import { useProducts } from "@/hooks/useProducts";
import { ProductGrid } from "@/components/product/ProductGrid";
import { BrandTile } from "@/components/product/FillerTiles";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { EmptyState, ErrorState, GridSkeleton } from "@/components/ui/States";
import { SectionHeading } from "./SectionHeading";

export function FeaturedSection() {
  const { status, visible, error, retry } = useProducts();
  const featured = visible.filter((p) => p.isFeatured);
  const list = (featured.length ? featured : visible).slice(0, 4);
  return (
    <section className="wrap py-20 md:py-32">
      <SectionHeading title="Featured" cta={{ label: "SHOP ALL", to: "/shop" }} />
      {status === "loading" ? <GridSkeleton /> : status === "error" ? <ErrorState message={error ?? ""} onRetry={retry} /> : list.length === 0 ? (
        <EmptyState title="No products available right now." body="New pieces are on their way." />
      ) : (
        <ProductGrid products={list} trailing={list.length === 3 ? <BrandTile kind="burgundy" className="md:hidden lg:flex" /> : undefined} />
      )}
    </section>
  );
}

export function BrandSection() {
  return (
    <section className="bg-olive text-ivory">
      <div className="wrap grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:mx-0">
            <div className="absolute -bottom-4 -left-4 h-full w-full border border-champagne/70" aria-hidden />
            <img src={asset("woman-2")} alt="Woman in sunglasses, face turned to the light" loading="lazy" className="relative aspect-[4/5] w-full object-cover" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <h2 className="t-display text-[clamp(2.5rem,6vw,5.5rem)] tracking-[0.02em]">{BRAND_STATEMENT.title}</h2>
          <div className="t-editorial mt-8 space-y-1 text-[clamp(1.6rem,2.6vw,2.4rem)] text-ivory/90">
            {BRAND_STATEMENT.body.map((l) => <p key={l}>{l}</p>)}
          </div>
          <div className="mt-10 flex items-center gap-4"><span className="h-px w-12 bg-champagne" /><p className="t-label text-[0.625rem] tracking-[0.3em] text-ivory/75">{BRAND_STATEMENT.note}</p></div>
          <div className="mt-10"><Button to={BRAND_STATEMENT.cta.to} variant="light">{BRAND_STATEMENT.cta.label}</Button></div>
        </div>
      </div>
    </section>
  );
}

export function NewArrivalsSection() {
  const { visible } = useProducts();
  const items = visible.filter((p) => p.isNew).slice(0, 3);
  if (!items.length) return null;
  return (
    <section className="wrap py-20 md:py-32">
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14 xl:grid-cols-4">
        <div className="col-span-2 flex flex-col justify-between md:col-span-3 xl:col-span-1 xl:pr-6">
          <div>
            <h2 className="t-display text-[clamp(2.25rem,4.6vw,3.75rem)]">NEW<br className="hidden xl:block" /> ARRIVALS</h2>
            <p className="mt-5 max-w-xs text-[0.9375rem] text-espresso/70">The latest pieces, straight from the studio.</p>
          </div>
          <div className="mt-8"><Button to="/shop" variant="outline">SHOP ALL</Button></div>
        </div>
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
        {items.length < 3 && <BrandTile kind="image" className="hidden xl:flex" />}
      </div>
    </section>
  );
}

export function CampaignSection() {
  return (
    <section className="grid bg-burgundy text-ivory lg:grid-cols-12">
      <div className="flex flex-col justify-between px-6 py-16 md:px-14 md:py-24 lg:col-span-5 lg:px-16">
        <div>
          <p className="t-label text-[0.625rem] tracking-[0.4em] text-ivory/80">{CAMPAIGN.label}</p>
          <span className="mt-4 block h-px w-24 bg-champagne" />
          <h2 className="t-editorial mt-12 text-[clamp(3.2rem,7vw,6rem)] leading-[0.98]">{CAMPAIGN.title}</h2>
          <ul className="t-label mt-10 space-y-3 text-[0.75rem] tracking-[0.3em] text-ivory/85">
            {CAMPAIGN.lines.map((l) => <li key={l}>{l.toUpperCase()}</li>)}
          </ul>
          <div className="mt-12"><Button to={CAMPAIGN.cta.to} variant="light">{CAMPAIGN.cta.label}</Button></div>
        </div>
        <Logo className="mt-16 h-6 text-ivory/90" />
      </div>
      <div className="relative min-h-[22rem] lg:col-span-7">
        <img src={asset(CAMPAIGN.image)} alt={CAMPAIGN.imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </section>
  );
}

const ICONS = [Sun, Shield, Leaf, Sparkle];
export function ValuesSection() {
  return (
    <section className="wrap py-20 md:py-28">
      <ul className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
        {VALUES.map((v, i) => {
          const Icon = ICONS[i];
          return (
            <li key={v} className="flex flex-col items-center text-center">
              <span className="grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border border-espresso/40"><Icon strokeWidth={1} className="h-7 w-7" /></span>
              <span className="t-label mt-5 max-w-[9rem] text-[0.6875rem] leading-[1.7]">{v}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function InstagramSection() {
  return (
    <section className="border-t hairline">
      <div className="wrap py-20 md:py-28">
        <SectionHeading title="On Instagram" />
        <div className="grid grid-cols-3 gap-2 md:gap-3 lg:grid-cols-6">
          {INSTAGRAM_TILES.map((t, i) => (
            <a key={i} href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Open Instagram" className="group relative block aspect-square overflow-hidden">
              {t.kind === "image" ? (
                <img src={asset(t.asset!)} alt={t.alt ?? ""} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              ) : (
                <div className={`grid h-full w-full place-items-center ${t.kind === "burgundy" ? "bg-burgundy" : "bg-olive"} text-ivory`}>
                  <Logo className="h-[clamp(1rem,2.4vw,1.75rem)]" />
                </div>
              )}
            </a>
          ))}
        </div>
        <div className="mt-10 flex justify-center"><Button href={SITE.instagramUrl} variant="outline">FOLLOW ON INSTAGRAM</Button></div>
      </div>
    </section>
  );
}
