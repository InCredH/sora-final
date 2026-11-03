import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowUpRight } from 'lucide-react';

export const CollectionTiles: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter } = useShop();

  const collections = [
    {
      id: 'titanium',
      title: 'AEROSPACE TITANIUM',
      subtitle: 'Milled from pure Grade 4 Japanese titanium in Sabae. Unmatched strength-to-weight ratio.',
      tag: 'TECH MATTE & CHROME',
      count: '8 Silhouettes',
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=85',
      category: 'Titanium'
    },
    {
      id: 'cellulose propionate',
      title: 'ORGANIC CELLULOSE PROPIONATE',
      subtitle: 'Sculpted from Italian Mazzucchelli block cellulose. Warm translucent finishes and deep tactile depth.',
      tag: 'TIMELESS SUBSTANCE',
      count: '9 Silhouettes',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85',
      category: 'Cellulose Propionate'
    },
    {
      id: 'shield',
      title: 'MONOLITHIC VISORS & RIMLESS',
      subtitle: 'Toroidal continuous lenses and frameless silhouettes engineered for extreme peripheral clarity.',
      tag: 'FUTURISTIC HORIZONS',
      count: '3 Silhouettes',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85',
      category: 'Shield & Rimless'
    },
    {
      id: 'limited',
      title: 'RUNWAY ARCHIVE (LIMITED)',
      subtitle: 'Hand-numbered batch releases featuring custom stepped bevels and rare vintage tints.',
      tag: 'NUMBERED COLLECTIBLES',
      count: 'Numbered Editions',
      image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85',
      category: 'Limited Edition'
    }
  ];

  const handleTileClick = (category: string) => {
    setSelectedCategoryFilter(category);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F5EFE3] text-[#2C211B] border-b border-[#2C211B]/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-[#2C211B]/10">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono-tech tracking-widest text-[#6B7055] uppercase mb-2">
              <span className="hanko-stamp text-[9px] px-1 py-0 border-[#861F3A] text-[#861F3A]">空</span>
              <span className="font-bold">STRUCTURAL CATEGORIES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#2C211B] uppercase">
              EXPLORE THE ARCHITECTURE
            </h2>
          </div>
          <span className="text-xs font-mono-tech text-[#6B7055] tracking-wider font-semibold">
            SORA MAISON TAXONOMY // 04 PILLARS
          </span>
        </div>

        {/* Bento Collection Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => handleTileClick(col.category)}
              className="group relative h-[380px] sm:h-[420px] overflow-hidden rounded-xl bg-[#2C211B] border-2 border-[#C8A96B]/30 cursor-pointer transition-all duration-500 hover:border-[#861F3A] shadow-md hover:shadow-2xl hover-lift"
            >
              {/* Background Image */}
              <img
                src={col.image}
                alt={`SORA ${col.title} — ${col.subtitle}`}
                loading="lazy"
                className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-90 transition-transform duration-1000 ease-out group-hover:scale-105"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C211B] via-[#2C211B]/40 to-black/20 transition-opacity duration-300" />

              {/* Top Tag & Count */}
              <div className="absolute top-6 inset-x-6 z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono-tech tracking-widest text-[#2C211B] bg-[#F5EFE3]/95 backdrop-blur-md px-3 py-1 border border-[#C8A96B]/40 uppercase font-bold rounded">
                  {col.tag}
                </span>
                <span className="text-[11px] font-mono-tech tracking-wider text-[#C8A96B] font-semibold bg-[#2C211B]/80 px-2.5 py-0.5 rounded border border-[#C8A96B]/20">
                  {col.count}
                </span>
              </div>

              {/* Bottom Content & Arrow */}
              <div className="absolute bottom-6 inset-x-6 z-10 flex items-end justify-between gap-4">
                <div className="max-w-md">
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F5EFE3] tracking-wide uppercase group-hover:text-[#C8A96B] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#F5EFE3]/80 mt-2 font-light leading-relaxed line-clamp-2">
                    {col.subtitle}
                  </p>
                </div>

                <div className="w-11 h-11 bg-[#F5EFE3] text-[#2C211B] group-hover:bg-[#861F3A] group-hover:text-white rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shadow-lg">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
