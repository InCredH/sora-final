import React, { useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, Product } from '../data/products';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, openProductDetail, formatPrice } = useShop();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const query = searchQuery.toLowerCase().trim();
  const searchResults: Product[] = query
    ? PRODUCTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.collection.toLowerCase().includes(query) ||
          p.shape.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.specifications.frameMaterial.toLowerCase().includes(query) ||
          p.variants.some((v) => v.name.toLowerCase().includes(query) || v.colorName.toLowerCase().includes(query))
        );
      })
    : [];

  const quickTags = ['Titanium', 'Bio-Acetate', 'Square', 'Shield', 'Bestseller'];

  const handleSelectProduct = (p: Product) => {
    setIsSearchOpen(false);
    openProductDetail(p);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2C211B]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Search Container */}
      <div className="relative w-full max-w-2xl bg-[#F5EFE3] text-[#2C211B] border border-[#2C211B]/20 rounded-xl shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#2C211B]/10 flex items-center gap-3">
          <Search size={20} className="text-[#6B7055]" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search silhouettes, materials (Titanium, Acetate), or collections..."
            className="w-full bg-transparent text-sm sm:text-base font-mono-tech text-[#2C211B] placeholder-[#6B7055] focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[#6B7055] hover:text-[#861F3A] p-1 text-xs font-mono-tech cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-[#2C211B]/60 hover:text-[#861F3A] cursor-pointer"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="px-5 py-3 bg-[#FAF7F0] border-b border-[#2C211B]/10 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono-tech text-[#6B7055] uppercase mr-1 font-bold">
            TRENDING:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchQuery(tag)}
              className="px-2.5 py-1 text-[11px] font-mono-tech text-[#2C211B] hover:text-[#861F3A] bg-white hover:bg-[#F5EFE3] border border-[#2C211B]/15 transition-colors uppercase rounded cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {query && searchResults.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono-tech text-[#6B7055]">
              NO SILHOUETTES MATCHING "{searchQuery.toUpperCase()}".
            </div>
          ) : query && searchResults.length > 0 ? (
            <div className="space-y-3">
              <span className="text-[10px] font-mono-tech text-[#6B7055] uppercase tracking-widest block mb-2 font-bold">
                FOUND {searchResults.length} FRAME{searchResults.length > 1 ? 'S' : ''}
              </span>
              {searchResults.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelectProduct(p)}
                  className="p-3 bg-white hover:bg-[#FAF7F0] border border-[#2C211B]/10 hover:border-[#861F3A] rounded-lg flex items-center justify-between gap-4 cursor-pointer transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-14 h-14 object-contain p-1 bg-[#FAF7F0] border border-[#2C211B]/10 rounded-lg shadow-2xs"
                    />
                    <div>
                      <h4 className="font-display text-sm font-bold text-[#2C211B] uppercase group-hover:text-[#861F3A]">
                        {p.name}
                      </h4>
                      <p className="text-[11px] text-[#6B7055] font-mono-tech">
                        {p.category} • {p.shape}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs font-mono-tech font-bold text-[#2C211B] block">
                        {formatPrice(p.salePrice ?? p.price)}
                      </span>
                      {p.salePrice && (
                        <span className="text-[10px] font-mono-tech text-[#6B7055] line-through block">
                          {formatPrice(p.price)}
                        </span>
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#2C211B]/5 group-hover:bg-[#861F3A] group-hover:text-white flex items-center justify-center transition-colors text-[#2C211B]">
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Sparkles size={20} className="mx-auto text-[#C8A96B] mb-2" />
              <p className="text-xs font-mono-tech text-[#6B7055] uppercase tracking-wider font-semibold">
                TYPE TO DISCOVER SORA SILHOUETTES
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
