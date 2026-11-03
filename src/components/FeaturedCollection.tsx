import React from 'react';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from './ProductCard';

export const FeaturedCollection: React.FC = () => {
  const featuredProducts: Product[] = PRODUCTS.filter(p => p.isFeatured).slice(0, 8);

  return (
    <section id="featured-collection" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F5EFE3] text-[#2C211B] border-b border-[#2C211B]/10">
      <div className="max-w-7xl mx-auto">
        {/* Clean, Uncluttered Editorial Section Header */}
        <div className="pb-8 border-b border-[#2C211B]/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono-tech tracking-widest text-[#6B7055] uppercase mb-2">
              <span className="hanko-stamp text-[9px] px-1 py-0 border-[#861F3A] text-[#861F3A]">空</span>
              <span className="font-bold">CURATED ATELIER ARCHIVE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#2C211B] uppercase">
              FEATURED EDITIONS
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6B7055] font-normal max-w-xl">
              Precision-crafted in Sabae from Grade 4 Japanese titanium and Italian Mazzucchelli cellulose propionate. Every piece includes certified 100% UV400 high-definition polarized optics.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono-tech text-[#6B7055]">
            <span className="text-[#861F3A] font-bold">08 SILHOUETTES</span>
            <span>// AUTUMN / WINTER 2026</span>
          </div>
        </div>

        {/* Curated Product Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} editorialMode={true} />
          ))}
        </div>
      </div>
    </section>
  );
};
