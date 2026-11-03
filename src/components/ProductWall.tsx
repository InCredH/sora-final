import React from 'react';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Eye, ShoppingBag, Sparkles } from 'lucide-react';

export const ProductWall: React.FC = () => {
  const { openProductDetail, addToCart, formatPrice } = useShop();

  const heroItem = PRODUCTS[1]; // AERO-01
  const secondaryItem1 = PRODUCTS[2]; // TERRA
  const secondaryItem2 = PRODUCTS[4]; // SOLSTICE SHIELD

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0d] border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono-tech tracking-widest text-zinc-400 uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400" />
              <span>THE EDITORIAL WALL</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
              STUDIO ASYMMETRY
            </h2>
          </div>
          <span className="text-xs font-mono-tech text-zinc-400 tracking-wider">
            SCALE & REFLECTION // EDITION 2026
          </span>
        </div>

        {/* Asymmetrical Composition Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Oversized Focal Frame (7 cols) */}
          <div className="lg:col-span-7 bg-[#111116] border border-white/10 flex flex-col justify-between p-6 sm:p-10 group relative overflow-hidden">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-mono-tech tracking-widest bg-white text-black px-2.5 py-1 uppercase font-semibold">
                FLAGSHIP SPOTLIGHT
              </span>
              <span className="text-xs font-mono-tech text-zinc-400">
                17G PURE TITANIUM
              </span>
            </div>

            <div className="my-8 relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
              <img
                src={heroItem.images[0]}
                alt={heroItem.name}
                loading="lazy"
                className="w-full h-full object-cover filter contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            <div className="z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase">
                  {heroItem.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm">
                  {heroItem.shortDescription}
                </p>
                <div className="mt-2 text-sm font-mono-tech text-zinc-200">
                  {formatPrice(heroItem.price)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openProductDetail(heroItem)}
                  className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
                  title="Try On Virtually"
                  aria-label="Try On Virtually"
                >
                  <Sparkles size={16} className="text-amber-300" />
                </button>

                <button
                  type="button"
                  onClick={() => addToCart(heroItem, heroItem.variants[0], 1)}
                  className="bg-white hover:bg-zinc-200 text-black px-5 py-3 text-xs font-mono-tech tracking-wider uppercase font-semibold flex items-center gap-2 transition-colors"
                >
                  <ShoppingBag size={14} />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  type="button"
                  onClick={() => openProductDetail(heroItem)}
                  className="p-3 bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Inspect specifications"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Staggered Frames (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Top Secondary Card */}
            <div className="bg-[#111116] border border-white/10 p-6 flex flex-col justify-between group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-tech tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 uppercase">
                  SPECIAL OFFER
                </span>
                <span className="text-xs font-mono-tech text-zinc-400">
                  CELLULOSE PROPIONATE
                </span>
              </div>

              <div className="my-4 aspect-[16/9] overflow-hidden bg-black/40">
                <img
                  src={secondaryItem1.images[0]}
                  alt={secondaryItem1.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div>
                  <h4 className="font-display text-lg font-bold text-white uppercase">
                    {secondaryItem1.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-mono-tech text-rose-400">
                      {formatPrice(secondaryItem1.salePrice ?? secondaryItem1.price)}
                    </span>
                    <span className="text-xs font-mono-tech text-zinc-500 line-through">
                      {formatPrice(secondaryItem1.price)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openProductDetail(secondaryItem1)}
                  className="p-2.5 bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
                  aria-label="Inspect Terra Frame"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Bottom Secondary Card */}
            <div className="bg-[#111116] border border-white/10 p-6 flex flex-col justify-between group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-tech tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 uppercase">
                  LIMITED EDITION
                </span>
                <span className="text-xs font-mono-tech text-zinc-400">
                  FRAMELESS VISOR
                </span>
              </div>

              <div className="my-4 aspect-[16/9] overflow-hidden bg-black/40">
                <img
                  src={secondaryItem2.images[0]}
                  alt={secondaryItem2.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div>
                  <h4 className="font-display text-lg font-bold text-white uppercase">
                    {secondaryItem2.name}
                  </h4>
                  <div className="mt-0.5 text-xs font-mono-tech text-zinc-300">
                    {formatPrice(secondaryItem2.price)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openProductDetail(secondaryItem2)}
                  className="p-2.5 bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
                  aria-label="Inspect Solstice Shield"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
