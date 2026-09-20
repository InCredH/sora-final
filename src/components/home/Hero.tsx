import { HERO, SITE } from "@/data/siteContent";
import { asset } from "@/data/assets";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="wrap grid items-center gap-12 py-12 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:gap-8 lg:py-1">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <h1 className="hero-rise" style={{ animationDelay: "0.55s" }}>
            <Logo className="h-[clamp(4rem,10vw,8.5rem)]" />
          </h1>
          <p className="hero-rise t-label mt-7 tracking-[0.55em]" style={{ animationDelay: "0.75s" }}>{SITE.tagline}</p>
          <p className="hero-rise t-editorial mt-12 max-w-sm text-[2rem] text-espresso/85 md:text-[2.4rem]" style={{ animationDelay: "0.95s" }}>{HERO.line}</p>
          <div className="hero-rise mt-10" style={{ animationDelay: "1.1s" }}>
            <Button to={HERO.cta.to}>{HERO.cta.label}</Button>
          </div>
        </div>

        <div className="relative order-1 mx-auto mb-8 w-full max-w-[34rem] lg:mb-0 lg:order-2 lg:col-span-6 lg:mx-0 lg:ml-auto">
          <div className="hero-fade pointer-events-none absolute -right-4 top-4 h-full w-[82%] rounded-t-[999px] border border-champagne/70 lg:-right-6" style={{ animationDelay: "1.2s" }} aria-hidden />
          <div className="hero-arch relative ml-auto aspect-[3/4] w-[82%] overflow-hidden rounded-t-[999px] bg-ivory-deep">
            <img src={asset("woman-1")} alt="Woman in sunglasses looking into the light" className="h-full w-full object-cover object-[50%_22%]" />
          </div>
          <div className="hero-rise absolute -bottom-5 left-0 w-[46%] border-[6px] border-ivory bg-ivory shadow-[0_18px_40px_-24px_rgba(44,33,27,.55)]" style={{ animationDelay: "1.35s" }}>
            <img src={asset("sun-sand")} alt="Frame resting on sunlit stone" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
