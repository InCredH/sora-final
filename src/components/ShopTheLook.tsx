import React from 'react';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export const ShopTheLook: React.FC = () => {
  const { openProductDetail, addToCart, formatPrice } = useShop();

  const looks = [
    {
      id: 'look-1',
      title: 'LOOK 01 // NOIR MONOCHROME',
      location: 'Ginza District, Tokyo',
      modelText: 'Worn with tailored oversized wool overcoat and raw silk turtleneck.',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=85',
      product: PRODUCTS[3] // SORREL
    },
    {
      id: 'look-2',
      title: 'LOOK 02 // MINERAL WARMTH',
      location: 'Kamakura Coastline',
      modelText: 'Paired with unbleached heavy linen shirt and woven raffia.',
      image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85',
      product: PRODUCTS[2] // TERRA
    }
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#08080a] border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono-tech tracking-widest text-zinc-400 uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>STYLING & PROPORTIONS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
              SHOP THE LOOK
            </h2>
          </div>
          <span className="text-xs font-mono-tech text-zinc-400 tracking-wider">
            LIFESTYLE CURATIONS // SS-26
          </span>
        </div>

        {/* Dual Lookbook Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {looks.map((look) => (
            <div key={look.id} className="bg-[#111116] border border-white/10 overflow-hidden flex flex-col group">
              {/* Large Lifestyle Photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={look.image}
                  alt={look.title}
                  loading="lazy"
                  className="w-full h-full object-cover filter contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10 text-[10px] font-mono-tech tracking-wider text-zinc-300 uppercase">
                  {look.location}
                </div>
              </div>

              {/* Look Info & Featured Frame Card */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase">
                    {look.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed">
                    {look.modelText}
                  </p>
                </div>

                {/* Featured Product Pill Bar */}
                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <div
                    onClick={() => openProductDetail(look.product)}
                    className="flex items-center gap-3 cursor-pointer group/prod"
                  >
                    <img
                      src={look.product.images[0]}
                      alt={look.product.name}
                      className="w-12 h-12 object-cover bg-black border border-white/10"
                    />
                    <div>
                      <h4 className="font-display text-sm font-bold text-white group-hover/prod:text-zinc-300 transition-colors uppercase">
                        {look.product.name}
                      </h4>
                      <span className="text-xs font-mono-tech text-zinc-400">
                        {formatPrice(look.product.salePrice ?? look.product.price)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addToCart(look.product, look.product.variants[0], 1)}
                      className="p-2.5 bg-white hover:bg-zinc-200 text-black text-xs font-mono-tech font-semibold uppercase transition-colors"
                      title="Add to Bag"
                      aria-label="Add to Bag"
                    >
                      <ShoppingBag size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => openProductDetail(look.product)}
                      className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono-tech font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5"
                    >
                      <span>INSPECT</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
