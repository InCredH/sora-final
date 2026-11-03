import React, { useState, useMemo } from 'react';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { SlidersHorizontal, X, Grid, LayoutGrid, Check, Sparkles } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { selectedCategoryFilter, setSelectedCategoryFilter } = useShop();
  const [selectedShape, setSelectedShape] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [gridColumns, setGridColumns] = useState<'editorial' | 'dense'>('editorial');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const categories = ['All', 'Cellulose Propionate', 'Titanium', 'Shield & Rimless', 'Limited Edition'];
  const shapes = ['All', 'Rectangular', 'Square', 'Aviator', 'Geometric', 'Cat-Eye', 'Round', 'Shield'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategoryFilter !== 'All' && p.category !== selectedCategoryFilter) return false;
      if (selectedShape !== 'All' && p.shape !== selectedShape) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice ?? a.price;
      const priceB = b.salePrice ?? b.price;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured maintains default order
    });
  }, [selectedCategoryFilter, selectedShape, sortBy, inStockOnly]);

  const activeFiltersCount =
    (selectedCategoryFilter !== 'All' ? 1 : 0) +
    (selectedShape !== 'All' ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategoryFilter('All');
    setSelectedShape('All');
    setInStockOnly(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#F5EFE3] text-[#2C211B] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title & Breadcrumbs in warm Espresso brown */}
        <div className="pb-8 border-b border-[#2C211B]/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono-tech tracking-widest text-[#6B7055] uppercase mb-2">
              <img src="/logo-transparent.png" alt="SORA" className="h-4 w-auto object-contain" />
              <span>SORA ARCHIVE</span>
              <span>/</span>
              <span className="text-[#2C211B] font-bold">ALL SILHOUETTES</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#2C211B] tracking-tight">
              THE FULL COLLECTION
            </h1>
            {/* <p className="mt-2 text-xs sm:text-sm text-[#6B7055] font-normal max-w-xl">
              Sculptural eyewear handcrafted from Grade 4 Japanese titanium and Italian Mazzucchelli cellulose propionate. Each frame is fitted with certified 100% UV400 high-definition polarized optics.
            </p> */}
          </div>

          <div className="flex items-center gap-4">
            {/* Grid Density Switcher */}
            <div className="hidden sm:flex items-center border border-[#2C211B]/15 bg-white p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setGridColumns('editorial')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  gridColumns === 'editorial' ? 'bg-[#2C211B] text-[#F5EFE3]' : 'text-[#6B7055] hover:text-[#2C211B]'
                }`}
                title="Editorial Large Grid"
                aria-label="Editorial Large Grid"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                type="button"
                onClick={() => setGridColumns('dense')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  gridColumns === 'dense' ? 'bg-[#2C211B] text-[#F5EFE3]' : 'text-[#6B7055] hover:text-[#2C211B]'
                }`}
                title="High Density Grid"
                aria-label="High Density Grid"
              >
                <Grid size={16} />
              </button>
            </div>

            {/* Mobile Filter Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] text-xs font-mono-tech uppercase font-bold rounded shadow-sm cursor-pointer"
            >
              <SlidersHorizontal size={14} />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div className="py-6 border-b border-[#2C211B]/10 flex flex-wrap items-center justify-between gap-4">
          {/* Category Chips (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-4 py-2 text-xs font-mono-tech tracking-wider uppercase border rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategoryFilter === cat
                    ? 'border-[#2C211B] bg-[#2C211B] text-[#F5EFE3] font-bold shadow-md'
                    : 'border-[#2C211B]/15 text-[#2C211B] hover:border-[#861F3A] bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Controls: Sort & In-stock */}
          <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            <label className="flex items-center gap-2 text-xs font-mono-tech text-[#6B7055] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#861F3A] w-4 h-4 rounded"
              />
              <span className="text-[#2C211B] font-medium">In-Stock Only</span>
            </label>

            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#6B7055]">
              <span className="hidden sm:inline font-bold">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#2C211B]/20 text-[#2C211B] text-xs font-mono-tech py-2 px-3 rounded focus:outline-none focus:border-[#861F3A] cursor-pointer"
              >
                <option value="featured">Featured Sequence</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shape Filter Pills & Active Filter Tags */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[#6B7055] uppercase text-[10px] tracking-wider mr-1 font-bold">
              FRAME SHAPE:
            </span>
            {shapes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedShape(s)}
                className={`px-3 py-1 text-[11px] rounded border transition-colors cursor-pointer ${
                  selectedShape === s
                    ? 'border-[#861F3A] bg-[#861F3A] text-white font-bold'
                    : 'border-[#2C211B]/15 text-[#6B7055] hover:text-[#2C211B] bg-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#6B7055]">
              Showing <strong className="text-[#2C211B]">{filteredProducts.length}</strong> silhouettes
            </span>

            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-[#861F3A] hover:underline text-[11px] flex items-center gap-1 font-bold cursor-pointer"
              >
                <X size={12} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Product Grid */}
        <div className="mt-8">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-[#2C211B]/20 bg-white/60 rounded-xl">
              <Sparkles size={24} className="mx-auto text-[#6B7055] mb-3" />
              <h3 className="font-display text-xl font-bold text-[#2C211B] uppercase">
                NO SILHOUETTES MATCH YOUR SPECIFICATIONS
              </h3>
              <p className="text-xs text-[#6B7055] font-mono-tech mt-2">
                Try widening your category or shape selections.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-6 px-6 py-2.5 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] text-xs font-mono-tech uppercase font-bold transition-colors rounded shadow-md cursor-pointer"
              >
                CLEAR ALL FILTERS
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-5 sm:gap-6 ${
                gridColumns === 'editorial'
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} editorialMode />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-Over Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div
            className="fixed inset-0 bg-[#2C211B]/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="relative w-full max-w-xs bg-[#F5EFE3] border-l border-[#2C211B]/15 p-6 z-10 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#2C211B]/10">
                <h3 className="font-display text-lg font-bold uppercase text-[#2C211B]">
                  FILTER COLLECTION
                </h3>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-[#6B7055] hover:text-[#861F3A] cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Categories */}
              <div className="py-6 border-b border-[#2C211B]/10">
                <span className="text-[10px] font-mono-tech text-[#6B7055] uppercase tracking-widest block mb-3 font-bold">
                  MATERIAL CATEGORY
                </span>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategoryFilter(cat)}
                      className={`w-full text-left px-3 py-2 text-xs font-mono-tech flex items-center justify-between rounded cursor-pointer ${
                        selectedCategoryFilter === cat
                          ? 'bg-[#2C211B] text-[#F5EFE3] font-bold'
                          : 'text-[#2C211B] hover:bg-white'
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategoryFilter === cat && <Check size={14} className="text-[#C8A96B]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shapes */}
              <div className="py-6 border-b border-[#2C211B]/10">
                <span className="text-[10px] font-mono-tech text-[#6B7055] uppercase tracking-widest block mb-3 font-bold">
                  FRAME SHAPE
                </span>
                <div className="space-y-2">
                  {shapes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedShape(s)}
                      className={`w-full text-left px-3 py-2 text-xs font-mono-tech flex items-center justify-between rounded cursor-pointer ${
                        selectedShape === s
                          ? 'bg-[#2C211B] text-[#F5EFE3] font-bold'
                          : 'text-[#2C211B] hover:bg-white'
                      }`}
                    >
                      <span>{s}</span>
                      {selectedShape === s && <Check size={14} className="text-[#C8A96B]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#2C211B]/10 flex gap-3">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 py-3 border border-[#2C211B]/20 text-xs font-mono-tech text-[#2C211B] hover:bg-white uppercase rounded cursor-pointer font-bold"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] text-xs font-mono-tech font-bold uppercase rounded shadow-md cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
