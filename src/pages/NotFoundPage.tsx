import React, { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, Compass, ShoppingBag, BookOpen } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const NotFoundPage: React.FC = () => {
  const { setCurrentView } = useShop();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Page Not Found | SORA (空)';
  }, []);

  const recommendedProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="w-full min-h-screen bg-[#F5EFE3] text-[#2C211B] py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Hanko Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#861F3A]/10 border border-[#861F3A]/20 text-[11px] font-mono-tech tracking-widest text-[#861F3A] uppercase mb-6">
          <span className="hanko-stamp text-[9px] py-0 px-1 border-[#861F3A] text-[#861F3A]">空</span>
          <span>Error 404</span>
        </div>

        {/* 404 Headline */}
        <h1 className="font-display text-7xl sm:text-9xl font-black tracking-tight text-[#2C211B] select-none">
          4<span className="text-[#861F3A]">0</span>4
        </h1>

        <div className="w-16 h-0.5 bg-[#C8A96B] mx-auto my-6" />

        <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-[#2C211B]">
          PAGE NOT FOUND
        </h2>

        <p className="mt-4 text-sm sm:text-base text-[#6B7055] font-normal max-w-lg mx-auto leading-relaxed">
          We couldn&rsquo;t find that page. It may have moved, or the link may be wrong.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3.5 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] text-xs font-mono-tech font-bold uppercase rounded-xl tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag size={14} className="text-[#C8A96B]" />
            <span>Shop All Frames</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3.5 bg-white hover:bg-[#FAF7F0] text-[#2C211B] border border-[#2C211B]/15 text-xs font-mono-tech font-bold uppercase rounded-xl tracking-wider transition-all duration-300 shadow-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <Compass size={14} className="text-[#861F3A]" />
            <span>Go to Home</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentView('story');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3.5 bg-transparent hover:bg-[#2C211B]/5 text-[#6B7055] hover:text-[#2C211B] text-xs font-mono-tech font-semibold uppercase rounded-xl tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <BookOpen size={14} />
            <span>Read Our Story</span>
          </button>
        </div>

        {/* Suggested Silhouettes */}
        <div className="mt-20 pt-12 border-t border-[#2C211B]/10 text-left">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] font-mono-tech tracking-widest text-[#6B7055] uppercase block mb-1 font-bold">
                YOU MAY LIKE
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                EXPLORE ALL FRAMES
              </h3>
            </div>
            <button
              type="button"
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-mono-tech text-[#861F3A] hover:underline font-bold uppercase"
            >
              View Full Collection →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendedProducts.map(p => (
              <ProductCard key={p.id} product={p} editorialMode />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

