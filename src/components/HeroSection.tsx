
import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ArrowRight, Sparkles, Sun, Moon, Wind, CloudLightning } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentView, openProductDetail, formatPrice } = useShop();

  // Keep the order consistent with PRODUCTS in products.ts
  const frameIcons = [
    <Sparkles size={13} />,
    <Sun size={13} />,
    <Wind size={13} />,
    <CloudLightning size={13} />
  ];

  const frameProducts = PRODUCTS.slice(0, 4);

  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  const activeProduct = frameProducts[activeFrameIndex];

  // Always use the selected product's own image.
  const activeImage =
    activeProduct?.variants?.[0]?.image ||
    activeProduct?.images?.[0] ||
    '';

  const scrollToCollection = () => {
    const el = document.getElementById('featured-collection');

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentView('shop');
    }
  };

  const marqueeItems = [
    'SORA — SEE YOUR WAY',
    'UV400 PROTECTED',
    'COMPLIMENTARY DELIVERY',
    'METAL & CELLULOSE PROPIONATE',
    'MADE FOR EVERY MOOD',
    'SORA ON YOU'
  ];

  if (!activeProduct) return null;

  return (
    <section className="relative w-full min-h-[calc(100vh-105px)] lg:min-h-[calc(100vh-112px)] flex flex-col justify-between bg-[#F5EFE3] text-[#2C211B] px-4 sm:px-8 lg:px-12 pt-4 sm:pt-6 pb-0 select-none">

      {/* Background Details */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-[#C8A96B]/15 blur-[140px] rounded-full animate-glow-pulse" />

        <div className="absolute bottom-1/4 left-10 w-[550px] h-[550px] bg-[#861F3A]/[0.08] blur-[150px] rounded-full animate-float-slow" />

        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[34vw] h-[34vw] max-w-[480px] max-h-[480px] rounded-full border border-dashed border-[#C8A96B]/30 opacity-40 animate-enso" />

        <div className="absolute right-8 top-1/2 -translate-y-1/2 font-japanese text-[28vw] text-[#2C211B]/[0.025] leading-none animate-float-slow">
          空
        </div>
      </div>

      {/* Main Hero */}
      <div className="relative z-10 my-auto py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto w-full flex-1">

        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col justify-center animate-fade-up">

          {/* Brand Label */}
          <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
            <img
              src="/logo-transparent.png"
              alt="SORA"
              className="h-4 sm:h-5 w-auto object-contain"
            />

            <span className="text-[10px] sm:text-[11px] font-mono-tech tracking-[0.25em] text-[#6B7055] uppercase font-bold">
              SORA — SEE YOUR WAY
            </span>

            <span className="w-8 h-px bg-[#C8A96B]" />

            <span className="text-[10px] font-mono-tech tracking-widest text-[#861F3A] uppercase font-bold">
              SS-26
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl xl:text-[80px] font-black uppercase text-[#2C211B] tracking-tight leading-[0.95]">
            WEAR YOUR MOOD.

            <br />

            <span className="font-serif-editorial italic font-normal text-[#861F3A] capitalize transition-colors duration-500">
              See the world your way.
            </span>
          </h1>

          {/* Brand Description */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#2C211B]/80 font-normal leading-relaxed max-w-xl">
            More than what you wear. A little expression of who you are.
            Discover pieces that feel like you.
          </p>

          {/* Frame Selector */}
          <div className="mt-6 pt-5 border-t border-[#2C211B]/10 max-w-xl">

            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono-tech tracking-[0.2em] text-[#6B7055] uppercase font-bold flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#C8A96B]" />
                CHOOSE YOUR FRAME
              </span>

              <span className="text-[10px] font-mono-tech text-[#861F3A] font-bold">
                0{activeFrameIndex + 1} / 04
              </span>
            </div>

            {/* Frame Name Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {frameProducts.map((product, idx) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setActiveFrameIndex(idx)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono-tech tracking-wider uppercase transition-all duration-300 cursor-pointer shrink-0 border ${
                    activeFrameIndex === idx
                      ? 'bg-[#2C211B] text-[#F5EFE3] border-[#2C211B] shadow-lg scale-105 font-bold'
                      : 'bg-white/80 text-[#2C211B] border-[#2C211B]/15 hover:bg-white hover:border-[#861F3A]'
                  }`}
                >
                  <span className={`transition-transform duration-300 ${
                    activeFrameIndex === idx
                      ? 'scale-110 text-[#C8A96B]'
                      : 'text-[#6B7055]'
                  }`}>
                    {frameIcons[idx]}
                  </span>

                  <span>{product.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Frame Description */}
            <p className="text-xs font-serif-editorial italic text-[#6B7055] mt-3 transition-all duration-500">
              {activeProduct.shortDescription}
            </p>
          </div>

          {/* Explore Button */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={scrollToCollection}
              className="group px-8 sm:px-10 py-3.5 sm:py-4 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] text-xs sm:text-sm font-mono-tech font-bold uppercase tracking-widest flex items-center gap-2.5 transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer rounded"
            >
              <span>EXPLORE COLLECTION</span>

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </button>
          </div>
        </div>

        {/* Right Column — Selected Product */}
        <div className="lg:col-span-5 relative flex items-center justify-center">

          {/* Editorial Side Label */}
          <div className="hidden sm:flex flex-col items-center gap-4 mr-3 vertical-rl font-mono-tech text-[10px] text-[#6B7055] tracking-[0.25em] uppercase select-none opacity-80">
            <span className="font-semibold text-[#2C211B]">
              SORA ARCHIVE // SS-26
            </span>

            <span className="w-px h-10 bg-[#C8A96B]" />

            <span className="text-[#861F3A]">
              {activeProduct.name}
            </span>
          </div>

          {/* Product Image Card */}
          <div
            key={activeProduct.id}
            className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF7F0] border border-[#C8A96B]/40 shadow-2xl group animate-in fade-in duration-500"
          >

            {/* Actual Selected Product Image */}
            <img
              key={activeImage}
              src={activeImage}
              alt={`SORA ${activeProduct.name} — ${activeProduct.subtitle}`}
              className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C211B]/70 via-transparent to-black/10 pointer-events-none" />

            {/* Top Branding */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-mono-tech px-2 py-1 bg-[#F5EFE3]/95 shadow-sm rounded border border-[#2C211B]/15">
                <img
                  src="/logo-transparent.png"
                  alt="SORA"
                  className="h-3.5 w-auto object-contain"
                />

                <span className="font-bold text-[#2C211B]">
                  SORA
                </span>
              </span>

              <span className="text-[9px] font-mono-tech text-[#C8A96B] bg-[#2C211B]/80 px-2 py-1 rounded border border-[#C8A96B]/30 uppercase font-semibold">
                {activeProduct.subtitle}
              </span>
            </div>

            {/* Bottom Product Information Panel */}
            <div className="absolute bottom-4 inset-x-4 z-20 p-3.5 sm:p-4 rounded-xl bg-[#F5EFE3]/95 backdrop-blur-xl border border-[#C8A96B]/50 shadow-xl text-[#2C211B] transition-transform duration-300 group-hover:-translate-y-1">

              <div className="flex items-center justify-between gap-2">

                <div className="flex items-center gap-3 min-w-0">

                  {/* Product Thumbnail */}
                  <div className="w-12 h-12 rounded bg-white border border-[#2C211B]/10 p-1 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                    <img
                      src={activeImage}
                      alt={`${activeProduct.name} frame`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono-tech tracking-widest text-[#6B7055] uppercase block font-bold">
                      FEATURED FRAME
                    </span>

                    <h4 className="font-display text-base font-bold text-[#2C211B] tracking-wide uppercase">
                      {activeProduct.name}
                    </h4>

                    <span className="text-xs font-mono-tech text-[#861F3A] font-bold">
                      {formatPrice(activeProduct.salePrice || activeProduct.price)}
                      {' '}•{' '}
                      {activeProduct.category}
                    </span>
                  </div>
                </div>

                {/* Inspect Button */}
                <button
                  type="button"
                  onClick={() => openProductDetail(activeProduct)}
                  className="px-4 py-2 rounded bg-[#2C211B] text-[#F5EFE3] hover:bg-[#861F3A] text-xs font-mono-tech font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-md cursor-pointer shrink-0"
                >
                  INSPECT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="relative z-10 w-full overflow-hidden border-t border-[#2C211B]/10 py-3 sm:py-3.5 bg-[#FAF7F0] -mx-4 sm:-mx-8 lg:-mx-12 px-0 shrink-0 mt-auto">
        <div className="animate-marquee items-center gap-8 text-[11px] font-mono-tech tracking-[0.2em] uppercase text-[#6B7055] whitespace-nowrap">
          {marqueeItems.concat(marqueeItems).map((text, idx) => (
            <span key={idx} className="flex items-center gap-8">
              <span className="hover:text-[#861F3A] transition-colors">
                {text}
              </span>

              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
