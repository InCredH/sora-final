import React, { useState } from 'react';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedCollection: React.FC = () => {
  const { setCurrentView } = useShop();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Bio-Acetate', 'Titanium', 'Shield & Rimless'];

  const filteredProducts: Product[] = PRODUCTS.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  }).slice(0, 8);

  return (
    <section id="featured-collection" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F5EFE3] text-[#2C211B] border-b border-[#2C211B]/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with genuine e-commerce feel */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2C211B]/10">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono-tech tracking-widest text-[#6B7055] uppercase mb-2">
              <span className="hanko-stamp text-[9px] px-1 py-0 border-[#861F3A] text-[#861F3A]">空</span>
              <span className="font-bold">CURATED ATELIER ARCHIVE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#2C211B] uppercase">
              FEATURED EDITIONS
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6B7055] font-normal max-w-xl">
              Precision-crafted in Sabae from Grade 4 Japanese titanium and Italian Mazzucchelli bio-acetate. Every piece includes certified 100% UV400 high-definition polarized optics.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-mono-tech tracking-wider uppercase transition-all duration-200 border rounded-lg cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#2C211B] text-[#F5EFE3] border-[#2C211B] font-bold shadow-md'
                    : 'bg-white/80 hover:bg-white text-[#2C211B] border-[#2C211B]/15 hover:border-[#861F3A]'
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              type="button"
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hidden lg:flex items-center gap-2 text-xs font-mono-tech tracking-wider text-[#2C211B] hover:text-[#861F3A] px-3.5 py-2 border border-[#2C211B]/15 hover:border-[#861F3A] rounded-lg transition-colors ml-2 cursor-pointer font-bold bg-white"
            >
              <span>VIEW ALL</span>
              <ArrowRight size={14} className="text-[#861F3A]" />
            </button>
          </div>
        </div>

        {/* Curated Product Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} editorialMode={true} />
          ))}
        </div>

        {/* View All Mobile Trigger */}
        <div className="mt-10 text-center lg:hidden">
          <button
            type="button"
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#2C211B] text-[#F5EFE3] text-xs font-mono-tech tracking-widest uppercase font-bold inline-flex items-center justify-center gap-3 transition-colors hover:bg-[#861F3A] rounded-lg shadow-md cursor-pointer"
          >
            <span>EXPLORE ALL SILHOUETTES</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};
