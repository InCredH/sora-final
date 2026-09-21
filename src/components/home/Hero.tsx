import { HERO, SITE } from "@/data/siteContent";
import { asset } from "@/data/assets";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="wrap grid items-center gap-5 py-6 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:gap-8 lg:py-1">
        <div className="order-1 lg:col-span-6">
          {/* Logo: hidden on mobile (kept for screen readers), original size on desktop */}
          <h1 className="hero-rise max-lg:sr-only [animation-delay:0.55s]">
            <Logo className="h-[clamp(4rem,10vw,8.5rem)]" />
          </h1>

          <p className="hero-rise t-label mt-1 tracking-[0.4em] [animation-delay:0.35s] lg:mt-7 lg:tracking-[0.55em] lg:[animation-delay:0.75s]">
            {SITE.tagline}
          </p>

          <p className="hero-rise t-editorial mt-2 max-w-md text-[1.75rem] text-espresso/85 [animation-delay:0.5s] md:text-[2.2rem] lg:mt-12 lg:max-w-sm lg:text-[2.4rem] lg:[animation-delay:0.95s]">
            {HERO.line}
          </p>

          <div className="hero-rise mt-5 flex flex-wrap items-center gap-6 [animation-delay:0.7s] lg:mt-10 lg:[animation-delay:1.1s]">
            <Button to={HERO.cta.to}>{HERO.cta.label}</Button>
            <TextLink to={HERO.secondary.to} className="">{HERO.secondary.label}</TextLink>
          </div>
        </div>

        <div className="relative order-2 mx-auto mb-8 w-full max-w-[34rem] lg:mb-0 lg:col-span-6 lg:mx-0 lg:ml-auto">
          <div
            className="hero-fade pointer-events-none absolute -right-4 top-4 h-full w-[82%] rounded-t-[999px] border border-champagne/70 [animation-delay:0.6s] lg:-right-6 lg:[animation-delay:1.2s]"
            aria-hidden
          />
          <div className="hero-arch relative ml-auto aspect-[3/4] w-[82%] max-h-[55svh] overflow-hidden rounded-t-[999px] bg-ivory-deep lg:max-h-none">
            <img src={asset("woman-1")} alt="Woman in sunglasses looking into the light" className="h-full w-full object-cover object-[50%_22%]" />
          </div>
          <div className="hero-rise absolute -bottom-5 left-0 w-[46%] border-[6px] border-ivory bg-ivory shadow-[0_18px_40px_-24px_rgba(44,33,27,.55)] [animation-delay:0.8s] lg:[animation-delay:1.35s]">
            <img src={asset("sun-sand")} alt="Frame resting on sunlit stone" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}