import { usePageTitle } from "@/hooks/usePageMeta";
import { asset } from "@/data/assets";
import { Button } from "@/components/ui/Button";

const BLOCKS = [
  { h: "Aesthetic", p: "Warm tones, quiet shapes and nothing that shouts. Every detail is edited until only the essential remains." },
  { h: "Lifestyle", p: "Made for long afternoons, coastlines, city light and everything in between — the moments you'd rather see clearly." },
  { h: "Point of view", p: "SORA is a way of looking first. The pieces follow." },
];

export default function About() {
  usePageTitle("About");
  return (
    <>
      <section className="wrap pb-16 pt-16 md:pb-24 md:pt-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <h1 className="t-display text-[clamp(3rem,8vw,7.5rem)] lg:col-span-8">A quiet<br />point of view.</h1>
          <p className="t-editorial self-end text-balance text-[clamp(1.5rem,2.2vw,2rem)] text-espresso/85 lg:col-span-4">Everyone sees the world a little differently. That is worth designing for.</p>
        </div>
      </section>

      <div className="wrap">
        <img src={asset("sun-sand")} alt="SORA frame resting on warm stone among olive leaves" className="aspect-[4/3] w-full object-cover md:aspect-[16/9]" />
      </div>

      <section className="wrap grid gap-14 py-20 md:py-32 lg:grid-cols-3 lg:gap-16">
        {BLOCKS.map((b) => (
          <div key={b.h} className="border-t border-champagne pt-6">
            <h2 className="font-display text-3xl">{b.h}</h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.9] text-espresso/80">{b.p}</p>
          </div>
        ))}
      </section>

      <section className="bg-olive text-ivory">
        <div className="wrap grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-24">
          <img src={asset("woman-1")} alt="Woman in sunglasses in warm light" loading="lazy" className="mx-auto aspect-[4/5] w-full max-w-md object-cover object-[50%_25%] lg:mx-0" />
          <div>
            <p className="t-editorial text-[clamp(2.4rem,5vw,4.5rem)]">Confidence looks good on you.</p>
            <span className="mt-8 block h-px w-16 bg-champagne" />
            <p className="mt-8 max-w-md text-[0.9375rem] leading-[1.9] text-ivory/85">A person's style is not just what they wear. It is how they choose to see the world.</p>
            <div className="mt-10"><Button to="/shop" variant="light">SHOP NOW</Button></div>
          </div>
        </div>
      </section>
    </>
  );
}
