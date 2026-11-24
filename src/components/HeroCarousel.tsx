import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Tag, Truck, ShieldCheck, BadgeIndianRupee } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, BUNDLE_TIERS, isBundleEligible } from '../data/products';

/* ------------------------------------------------------------------ */
/* Data derived from the catalogue, so prices/names never go stale.   */
/* ------------------------------------------------------------------ */
const hoshi = PRODUCTS.find((p) => p.id === 'prod_hoshi');
const arashi = PRODUCTS.find((p) => p.id === 'prod_arashi');
const hoshiBlack =
  hoshi?.variants.find((v) => /black/i.test(v.colorName)) ?? hoshi?.variants[0];

const eligible = PRODUCTS.filter(isBundleEligible);
const lowestPrice = Math.min(...PRODUCTS.map((p) => p.price));
// Biggest saving from a single bundle of the priciest eligible frames.
const maxBundleSaving = Math.max(
  ...BUNDLE_TIERS.map((t) => {
    const top = [...eligible].sort((a, b) => b.price - a.price).slice(0, t.size);
    return top.length === t.size ? top.reduce((s, p) => s + p.price, 0) - t.price : 0;
  })
);

const AUTOPLAY_MS = 3500;

type SlideImage = { src: string; srcSm: string; alt: string; position?: string };

interface Slide {
  id: string;
  /** Panel colour on desktop (text side). */
  panel: string;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  priceLine?: React.ReactNode;
  primary: { label: string; onClick: () => void };
  secondary?: { label: string; onClick: () => void };
  images: SlideImage[];
  badge?: string;
}

export const HeroCarousel: React.FC = () => {
  const { openProductDetail, setCurrentView, formatPrice } = useShop();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const goShop = () => {
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const slides: Slide[] = [
    // 1 — The offer (first: most visitors only see slide 1)
    {
      id: 'bundle',
      panel: 'bg-[#861F3A]',
      eyebrow: 'Limited offer · No code needed',
      title: (
        <>
          Any 2 frames
          <br />
          <span className="font-serif-editorial italic font-normal normal-case text-[#F5D9A8]">
            for {formatPrice(BUNDLE_TIERS[0].price)}*
          </span>
        </>
      ),
      body: `One for you, one for whoever borrows yours. Mix any two of ${eligible
        .map((p) => p.name)
        .join(', ')
        .replace(/, ([^,]*)$/, ' & $1')}.`,
      priceLine: (
        <>
          <span className="text-[#F5EFE3] font-extrabold">Save up to {formatPrice(maxBundleSaving)}</span>
          <span className="text-[#F5D9A8]"> · *Except HOSHI</span>
          <span className="hidden sm:inline text-[#F5EFE3]/60"> · Applied automatically in your bag</span>
        </>
      ),
      primary: { label: 'Build Your Pair', onClick: goShop },
      secondary: { label: 'All Frames', onClick: goShop },
      badge: `Frames from ${formatPrice(lowestPrice)}`,
      images: [
        {
          src: '/images/hero/nagi-model-1.jpg',
          srcSm: '/images/hero/nagi-model-1-sm.jpg',
          alt: 'Model wearing SORA NAGI sunglasses',
          position: 'center 25%'
        },
        {
          src: '/images/hero/yuhi-model-1.jpg',
          srcSm: '/images/hero/yuhi-model-1-sm.jpg',
          alt: 'Model wearing SORA YUHI sunglasses',
          position: 'center 25%'
        }
      ]
    },

    // 2 — Signature / premium: HOSHI, new in Gold & Black
    ...(hoshi
      ? [
          {
            id: 'hoshi',
            panel: 'bg-[#2C211B]',
            eyebrow: `New colour · ${hoshi.japaneseMeaning} ${hoshi.subtitle}`,
            title: (
              <>
                HOSHI,
                <br />
                <span className="font-serif-editorial italic font-normal normal-case text-[#C8A96B]">
                  now in Gold &amp; Black.
                </span>
              </>
            ),
            body: 'Our signature geometric frame. Fine gold-toned metal and deep black lenses. Sharp, polished, quietly luxurious.',
            priceLine: (
              <>
                <span className="text-[#F5EFE3] font-extrabold">{formatPrice(hoshi.price)}</span>
                <span className="text-[#F5EFE3]/60"> · Signature frame</span>
              </>
            ),
            primary: {
              label: 'Shop HOSHI Black',
              onClick: () => openProductDetail(hoshi, hoshiBlack?.id)
            },
            secondary: {
              label: 'See Gold & Brown',
              onClick: () => openProductDetail(hoshi, hoshi.variants[0]?.id)
            },
            badge: 'Just In',
            images: [
              {
                src: '/images/hero/hoshi-black-model-1.jpg',
                srcSm: '/images/hero/hoshi-black-model-1-sm.jpg',
                alt: 'Model wearing SORA HOSHI sunglasses in gold and black',
                position: 'center 30%'
              }
            ]
          } as Slide
        ]
      : []),

    // 3 — Value hero: ARASHI
    ...(arashi
      ? [
          {
            id: 'arashi',
            panel: 'bg-[#26302A]',
            eyebrow: `Best value · ${arashi.japaneseMeaning} ${arashi.subtitle}`,
            title: (
              <>
                Bold build.
                <br />
                <span className="font-serif-editorial italic font-normal normal-case text-[#C9D7B8]">
                  Easy price.
                </span>
              </>
            ),
            body: 'ARASHI is a thick square frame in deep sage green with matching green lenses, made to be worn every single day.',
            priceLine: (
              <>
                <span className="text-[#F5EFE3] font-extrabold">{formatPrice(arashi.price)}</span>
                <span className="text-[#F5EFE3]/60"> · or pair it: 2 for {formatPrice(BUNDLE_TIERS[0].price)}</span>
              </>
            ),
            primary: { label: 'Shop ARASHI', onClick: () => openProductDetail(arashi) },
            secondary: { label: 'All Frames', onClick: goShop },
            images: [
              {
                src: '/images/hero/arashi-model-3.jpg',
                srcSm: '/images/hero/arashi-model-3-sm.jpg',
                alt: 'Model wearing SORA ARASHI sage green square sunglasses',
                position: 'center 20%'
              }
            ]
          } as Slide
        ]
      : [])
  ];

  const count = slides.length;
  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Autoplay — pauses on hover/touch/focus, when the tab is hidden, and for reduced-motion users.
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduced || count < 2) return;
    const t = setTimeout(() => {
      if (document.visibilityState === 'visible') next();
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, next, count]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    }
    touchX.current = null;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured offers and frames"
      className="relative w-full bg-[#F5EFE3] px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="relative h-[min(72svh,600px)] min-h-[440px] sm:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden shadow-xl bg-[#2C211B] select-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
          }}
        >
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <div
                key={s.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!active}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Desktop text panel colour */}
                <div className={`hidden lg:block absolute inset-y-0 left-0 w-[46%] ${s.panel}`} />

                {/* Imagery: full-bleed on mobile, right side on desktop */}
                <div
                  className={`absolute inset-0 lg:left-auto lg:w-[54%] grid ${
                    s.images.length > 1 ? 'grid-cols-2 gap-0.5' : 'grid-cols-1'
                  }`}
                >
                  {s.images.map((img) => (
                    <picture key={img.src} className="relative block h-full w-full overflow-hidden">
                      <source media="(min-width: 640px)" srcSet={img.src} />
                      <img
                        src={img.srcSm}
                        alt={img.alt}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        fetchPriority={i === 0 ? 'high' : 'auto'}
                        draggable={false}
                        style={{ objectPosition: img.position ?? 'center' }}
                        className={`h-full w-full object-cover transition-transform duration-[7000ms] ease-out ${
                          active ? 'scale-105' : 'scale-100'
                        }`}
                      />
                    </picture>
                  ))}
                </div>

                {/* Mobile legibility gradient */}
                <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-[#1a1310]/95 via-[#1a1310]/45 to-transparent pointer-events-none" />

                {/* Badge */}
                {s.badge && (
                  <span className="absolute top-3 right-3 lg:top-5 lg:right-5 z-20 inline-flex items-center gap-1 rounded-full bg-[#F5EFE3]/95 px-2.5 py-1 text-[10px] font-mono-tech font-bold uppercase tracking-wider text-[#861F3A] shadow-md">
                    <Sparkles size={11} />
                    {s.badge}
                  </span>
                )}

                {/* Copy */}
                <div
                  className={`absolute inset-x-0 bottom-0 z-20 p-5 pb-12 sm:p-8 sm:pb-14 lg:inset-y-0 lg:right-auto lg:w-[46%] lg:flex lg:flex-col lg:justify-center lg:p-12 xl:p-14 text-[#F5EFE3] transition-all duration-700 ${
                    active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-[0.2em] font-bold text-[#C8A96B]">
                    <Tag size={11} />
                    {s.eyebrow}
                  </span>

                  <h2 className="mt-2 font-display text-[30px] leading-[1.02] sm:text-5xl xl:text-[56px] font-black uppercase tracking-tight">
                    {s.title}
                  </h2>

                  <p className="mt-3 max-w-md text-[13px] sm:text-sm leading-relaxed text-[#F5EFE3]/85">
                    {s.body}
                  </p>

                  {s.priceLine && (
                    <p className="mt-2.5 text-xs sm:text-sm font-mono-tech">{s.priceLine}</p>
                  )}

                  <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5">
                    <button
                      type="button"
                      tabIndex={active ? 0 : -1}
                      onClick={s.primary.onClick}
                      className="group inline-flex items-center gap-1.5 sm:gap-2 rounded bg-[#F5EFE3] px-3.5 sm:px-6 py-2.5 sm:py-3 text-[10.5px] sm:text-xs font-mono-tech font-bold uppercase tracking-wider sm:tracking-widest whitespace-nowrap text-[#2C211B] shadow-lg transition-all hover:bg-[#C8A96B] active:scale-[0.98] cursor-pointer"
                    >
                      {s.primary.label}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </button>
                    {s.secondary && (
                      <button
                        type="button"
                        tabIndex={active ? 0 : -1}
                        onClick={s.secondary.onClick}
                        className="inline-flex items-center rounded border border-[#F5EFE3]/40 px-3 sm:px-4 py-2.5 sm:py-3 text-[10.5px] sm:text-xs font-mono-tech font-bold uppercase tracking-wider sm:tracking-widest whitespace-nowrap text-[#F5EFE3] transition-colors hover:border-[#F5EFE3] hover:bg-white/10 cursor-pointer"
                      >
                        {s.secondary.label}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Arrows (tablet/desktop) */}
          {count > 1 && (
            <div className="hidden sm:flex absolute bottom-4 right-4 z-30 items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EFE3]/90 text-[#2C211B] shadow-lg hover:bg-white cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EFE3]/90 text-[#2C211B] shadow-lg hover:bg-white cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Dots with progress */}
          <div className="absolute bottom-4 left-5 sm:left-8 lg:left-12 xl:left-14 z-30 flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-300 cursor-pointer ${
                  i === index ? 'w-10 bg-[#F5EFE3]/30' : 'w-4 bg-[#F5EFE3]/40 hover:bg-[#F5EFE3]/70'
                }`}
              >
                {i === index && (
                  <span
                    key={`${index}-${paused}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-[#F5EFE3]"
                    style={{
                      width: paused ? '100%' : undefined,
                      animation: paused ? undefined : `soraProgress ${AUTOPLAY_MS}ms linear forwards`
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Value strip — the key reasons to buy, always visible without swiping */}
        <ul className="mt-2.5 sm:mt-3 grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 text-[10.5px] sm:text-[11px] font-mono-tech uppercase tracking-wide text-[#2C211B]">
          {[
            { icon: <BadgeIndianRupee size={14} />, text: <>Frames from <b>{formatPrice(lowestPrice)}</b></> },
            { icon: <Tag size={14} />, text: <>Any 2 for <b>{formatPrice(BUNDLE_TIERS[0].price)}</b>*</> },
            { icon: <Truck size={14} />, text: <>Free shipping</> },
            { icon: <ShieldCheck size={14} />, text: <>UV400 protected</> }
          ].map((v, i) => (
            <li
              key={i}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-[#2C211B]/10 bg-white/70 px-2 py-2"
            >
              <span className="text-[#861F3A] shrink-0">{v.icon}</span>
              <span className="truncate">{v.text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-1.5 text-center text-[10px] font-mono-tech uppercase tracking-wide text-[#6B7055]">
          *Bundle offer valid on all frames except HOSHI
        </p>
      </div>
    </section>
  );
};
