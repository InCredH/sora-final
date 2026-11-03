import React, { useState } from 'react';
import { Product, ProductVariant, PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft, Star, ShoppingBag, Truck, RefreshCcw, ShieldCheck, Sparkles, Check, ChevronLeft, ChevronRight, Eye, Sun, Layers } from 'lucide-react';

interface ProductDetailPageProps {
  onOpenPolicy: (key: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onOpenPolicy }) => {
  const {
    selectedProduct,
    closeProductDetail,
    addToCart,
    formatPrice
  } = useShop();

  const product = selectedProduct || PRODUCTS[0];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'materials' | 'packaging'>('specs');

  const discountPercent = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) 
    : null;

  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    const varIdx = product.images.findIndex((img) => img === variant.image);
    if (varIdx !== -1) {
      setActiveImageIndex(varIdx);
    }
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  // 4 Related Products from same or complementary collection with fallback to maintain 4 balanced compact cards
  const relatedProducts = (() => {
    const matched = PRODUCTS.filter(
      (p) => p.id !== product.id && (p.category === product.category || p.shape === product.shape)
    );
    const fallback = PRODUCTS.filter(
      (p) => p.id !== product.id && !matched.some((m) => m.id === p.id)
    );
    return [...matched, ...fallback].slice(0, 4);
  })();

  return (
    <div className="w-full min-h-screen bg-[#F5EFE3] text-[#2C211B] pt-3 sm:pt-4 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Back Navigation Bar — Clean & Compact */}
        <div className="pb-3 border-b border-[#2C211B]/10 flex items-center justify-between">
          <button
            type="button"
            onClick={closeProductDetail}
            className="flex items-center gap-2 text-xs font-mono-tech tracking-wider text-[#6B7055] hover:text-[#861F3A] uppercase transition-colors cursor-pointer font-bold"
          >
            <ArrowLeft size={16} />
            <span>BACK TO COLLECTION</span>
          </button>

          <div className="flex items-center gap-2">
            <img
              src="/logo-transparent.png"
              alt="SORA Emblem"
              className="h-5 w-auto object-contain"
            />
            <img
              src="/logo-transparent.png"
              alt="SORA Emblem"
              className="h-5 w-auto object-contain"
            />
          </div>
        </div>

        {/* Main PDP Top Stage: Image Gallery & Buy Box (Above the Fold) */}
        <div className="mt-3 sm:mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Interactive Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
            
            {/* Primary Hero Image Viewport - Extended downward to eliminate empty space and showcase frame details */}
            <div className="relative h-[360px] sm:h-[440px] lg:h-[490px] xl:h-[530px] w-full overflow-hidden bg-[#FAF7F0] border border-[#2C211B]/15 rounded-2xl shadow-sm group flex items-center justify-center">
              
              {/* Subtle ambient backdrop */}
              <img
                src={product.images[activeImageIndex] || selectedVariant.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-15 scale-110 pointer-events-none"
              />

              {/* Main Crisp Foreground Image - 100% Contained, Nothing Cut Off */}
              <img
                key={activeImageIndex}
                src={product.images[activeImageIndex] || selectedVariant.image}
                alt={`SORA ${product.name} luxury eyewear — View ${activeImageIndex + 1}`}
                className="relative z-10 max-h-full max-w-full object-contain filter contrast-[1.02] transition-all duration-500 ease-out animate-in fade-in zoom-in-95 duration-300 drop-shadow-sm"
              />

              {/* Badges on detail photo - Perfectly Inset & Aligned */}
              <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 items-start pointer-events-none">
                {discountPercent && (
                  <span className="text-[10px] font-mono-tech tracking-normal px-2.5 py-0.5 uppercase rounded-md bg-[#861F3A] text-white font-bold shadow-sm inline-flex items-center gap-1">
                    <span>SAVE</span>
                    <span>{discountPercent}%</span>
                  </span>
                )}
                {product.badge && !discountPercent && (
                  <span className="text-[10px] font-mono-tech tracking-normal px-2.5 py-0.5 uppercase rounded-md bg-[#2C211B] text-[#F5EFE3] font-bold shadow-sm">
                    {product.badge}
                  </span>
                )}
                <span className="text-[9px] font-mono-tech bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded uppercase font-semibold">
                  Photo {activeImageIndex + 1} of {product.images.length}
                </span>
              </div>

              {/* Prev / Next Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#2C211B] border border-[#2C211B]/15 shadow-lg flex items-center justify-center transition-all cursor-pointer opacity-80 hover:opacity-100 hover:scale-110 z-20"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#2C211B] border border-[#2C211B]/15 shadow-lg flex items-center justify-center transition-all cursor-pointer opacity-80 hover:opacity-100 hover:scale-110 z-20"
                    aria-label="Next image"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Ribbon — Extended & Balanced */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-14 sm:h-16 lg:h-18 overflow-hidden bg-[#FAF7F0] border rounded-xl transition-all cursor-pointer relative group flex items-center justify-center p-1.5 ${
                    activeImageIndex === idx
                      ? 'border-[#861F3A] ring-2 ring-[#861F3A] opacity-100 shadow-md scale-102 bg-white'
                      : 'border-[#2C211B]/15 opacity-70 hover:opacity-100 hover:border-[#861F3A]'
                  }`}
                >
                  <img
                    src={img}
                    alt={`SORA ${product.name} frame angle ${idx + 1}`}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute bottom-1 right-1.5 bg-black/60 text-[8px] font-mono-tech text-white px-1 rounded">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Specifications, Variants & Shopping Flow (5 cols) — Tight Spacing Above Fold */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-3">
            <div>
              {/* Category & Shape */}
              <div className="flex items-center justify-between text-[11px] font-mono-tech tracking-wider text-[#6B7055] uppercase">
                <span className="font-bold">{product.category} • {product.shape}</span>
                <div className="flex items-center gap-1 text-[#C8A96B]">
                  <Star size={13} fill="currentColor" />
                  <span className="text-[#2C211B] font-bold">{product.rating.toFixed(1)}</span>
                  <span className="text-[#6B7055]">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Price */}
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#2C211B] tracking-tight mt-1">
                {product.name}
              </h1>

              <div className="mt-1.5 flex items-baseline gap-2.5">
                {product.salePrice ? (
                  <>
                    <span className="font-mono-tech text-2xl sm:text-3xl text-[#861F3A] font-extrabold">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="font-mono-tech text-base text-[#6B7055] line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[11px] font-mono-tech bg-[#861F3A]/10 text-[#861F3A] font-bold px-2 py-0.5 rounded inline-flex items-center gap-1 border border-[#861F3A]/20">
                      <span>SAVE</span>
                      <span>{discountPercent}%</span>
                    </span>
                  </>
                ) : (
                  <span className="font-mono-tech text-2xl sm:text-3xl text-[#2C211B] font-extrabold">
                    {formatPrice(product.price)}
                  </span>
                )}
                <span className="text-[10px] font-mono-tech text-emerald-800 uppercase font-semibold">
                  Taxes Included
                </span>
              </div>

              {/* Subtitle & Clean Description */}
              <p className="mt-1.5 text-[11px] font-mono-tech text-[#6B7055] uppercase font-semibold tracking-wider">
                {product.subtitle}
              </p>
              <p className="mt-1 text-xs text-[#2C211B]/80 font-normal leading-relaxed line-clamp-3 sm:line-clamp-4">
                {product.description}
              </p>

              {/* Colorway Variant Selection */}
              <div className="mt-3 pt-2.5 border-t border-[#2C211B]/10">
                <div className="flex items-center justify-between text-[11px] font-mono-tech uppercase mb-2">
                  <span className="text-[#6B7055] font-semibold">FINISH SELECTION:</span>
                  <span className="text-[#2C211B] font-bold">{selectedVariant.colorName}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => handleVariantSelect(v)}
                      className={`group relative flex items-center gap-2 py-1.5 px-2.5 border rounded-lg transition-all cursor-pointer ${
                        selectedVariant.id === v.id
                          ? 'border-[#861F3A] bg-white ring-1 ring-[#861F3A] shadow-sm'
                          : 'border-[#2C211B]/15 bg-white/70 hover:border-[#861F3A]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: v.colorHex }}
                      />
                      <span className="text-[11px] font-mono-tech text-[#2C211B] uppercase pr-1 font-semibold">
                        {v.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Authentic Stock Status Urgency Indicator */}
              <div className="mt-2.5 p-2 rounded-lg bg-white border border-[#2C211B]/10 shadow-sm text-xs font-mono-tech">
                {product.inStock ? (
                  product.stockCount <= 5 ? (
                    <div className="flex items-center gap-2 text-[#861F3A] font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#861F3A] animate-pulse" />
                      <span>Few left in stock — Only {product.stockCount} frames remaining in this batch!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <Check size={14} className="text-emerald-700" />
                      <span>In Stock • Ready for dispatch from Sabae atelier</span>
                    </div>
                  )
                ) : (
                  <div className="flex items-center gap-2 text-rose-700 font-bold">
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                    <span>Batch Sold Out — Next artisanal run in production</span>
                  </div>
                )}
              </div>

              {/* Quantity Stepper & Add to Bag Button */}
              <div className="mt-3 pt-2.5 border-t border-[#2C211B]/10 flex items-center gap-2.5">
                <div className="flex items-center border border-[#2C211B]/20 bg-white rounded-lg">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-2 text-[#2C211B] hover:text-[#861F3A] transition-colors cursor-pointer font-bold"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono-tech font-bold text-[#2C211B]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-2 text-[#2C211B] hover:text-[#861F3A] transition-colors cursor-pointer font-bold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] py-3 px-5 text-xs font-mono-tech tracking-wider uppercase font-bold flex items-center justify-center gap-2 transition-all disabled:bg-[#6B7055] disabled:cursor-not-allowed shadow-xl rounded-lg cursor-pointer"
                >
                  <ShoppingBag size={14} className="text-[#C8A96B]" />
                  <span>
                    {product.inStock 
                      ? `ADD TO BAG • ${formatPrice((product.salePrice ?? product.price) * quantity)}` 
                      : 'RESERVE FOR NEXT DROP'}
                  </span>
                </button>
              </div>

              {/* Trust Badges on PDP — Compact Row */}
              <div className="mt-3.5 pt-3 border-t border-[#2C211B]/10 grid grid-cols-3 gap-2.5 text-center">
                <div
                  onClick={() => onOpenPolicy('shipping')}
                  className="p-2 bg-white border border-[#2C211B]/10 rounded-lg cursor-pointer hover:border-[#861F3A] transition-colors shadow-sm"
                >
                  <Truck size={14} className="mx-auto text-[#861F3A] mb-0.5" />
                  <span className="text-[9px] font-mono-tech text-[#2C211B] uppercase block font-bold">Free Delivery</span>
                  <span className="text-[8px] font-mono-tech text-[#6B7055]">On all orders</span>
                </div>

                <div
                  onClick={() => onOpenPolicy('trial')}
                  className="p-2 bg-white border border-[#2C211B]/10 rounded-lg cursor-pointer hover:border-[#861F3A] transition-colors shadow-sm"
                >
                  <RefreshCcw size={14} className="mx-auto text-[#861F3A] mb-0.5" />
                  <span className="text-[9px] font-mono-tech text-[#2C211B] uppercase block font-bold">No exchange/Returns</span>
                  <span className="text-[8px] font-mono-tech text-[#6B7055]">Unless damaged</span>
                </div>

                <div
                  onClick={() => onOpenPolicy('warranty')}
                  className="p-2 bg-white border border-[#2C211B]/10 rounded-lg cursor-pointer hover:border-[#861F3A] transition-colors shadow-sm"
                >
                  <ShieldCheck size={14} className="mx-auto text-[#861F3A] mb-0.5" />
                  <span className="text-[9px] font-mono-tech text-[#2C211B] uppercase block font-bold">UV400 Protected</span>
                  <span className="text-[8px] font-mono-tech text-[#6B7055]">All frames</span>
                </div>
              </div>
            </div>

            {/* Technical Specification Tabs */}
            <div className="mt-8 pt-6 border-t border-[#2C211B]/10">
              <div className="flex items-center gap-3 border-b border-[#2C211B]/10 pb-2 text-xs font-mono-tech uppercase">
                <button
                  type="button"
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'specs'
                      ? 'text-[#2C211B] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#861F3A]'
                      : 'text-[#6B7055] hover:text-[#2C211B]'
                  }`}
                >
                  Dimensions
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('materials')}
                  className={`pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'materials'
                      ? 'text-[#2C211B] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#861F3A]'
                      : 'text-[#6B7055] hover:text-[#2C211B]'
                  }`}
                >
                  Materials & Craft
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('packaging')}
                  className={`pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'packaging'
                      ? 'text-[#2C211B] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#861F3A]'
                      : 'text-[#6B7055] hover:text-[#2C211B]'
                  }`}
                >
                  Unboxing Packaging
                </button>
              </div>

              <div className="py-4 text-xs font-mono-tech">
                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 gap-3 text-[#6B7055]">
                    <div className="p-2.5 rounded bg-white border border-[#2C211B]/10">
                      <span className="text-[10px] text-[#6B7055] block font-semibold">FRAME WIDTH</span>
                      <strong className="text-[#2C211B]">{product.specifications.frameWidth}</strong>
                    </div>
                    <div className="p-2.5 rounded bg-white border border-[#2C211B]/10">
                      <span className="text-[10px] text-[#6B7055] block font-semibold">LENS WIDTH</span>
                      <strong className="text-[#2C211B]">{product.specifications.lensWidth}</strong>
                    </div>
                    <div className="p-2.5 rounded bg-white border border-[#2C211B]/10">
                      <span className="text-[10px] text-[#6B7055] block font-semibold">BRIDGE GAP</span>
                      <strong className="text-[#2C211B]">{product.specifications.bridgeWidth}</strong>
                    </div>
                    <div className="p-2.5 rounded bg-white border border-[#2C211B]/10">
                      <span className="text-[10px] text-[#6B7055] block font-semibold">TEMPLE LENGTH</span>
                      <strong className="text-[#2C211B]">{product.specifications.templeLength}</strong>
                    </div>
                    <div className="p-2.5 rounded bg-white border border-[#2C211B]/10">
                      <span className="text-[10px] text-[#6B7055] block font-semibold">TOTAL WEIGHT</span>
                      <strong className="text-[#2C211B]">{product.specifications.weight}</strong>
                    </div>
                    <div className="p-2.5 rounded bg-white border border-[#2C211B]/10">
                      <span className="text-[10px] text-[#6B7055] block font-semibold">HINGE TYPE</span>
                      <strong className="text-[#2C211B]">{product.specifications.hingeType}</strong>
                    </div>
                  </div>
                )}

                {activeTab === 'materials' && (
                  <div className="space-y-3 text-[#2C211B]/80 leading-relaxed font-normal p-3 rounded-lg bg-white border border-[#2C211B]/10">
                    <p>
                      <strong className="text-[#2C211B]">Frame Material:</strong> {product.specifications.frameMaterial}
                    </p>
                    <p>
                      <strong className="text-[#2C211B]">Optical Lenses:</strong> {product.specifications.lensMaterial}
                    </p>
                    <p>
                      <strong className="text-[#2C211B]">UV Protection:</strong> {product.specifications.uvProtection}
                    </p>
                  </div>
                )}

                {activeTab === 'packaging' && (
                  <div className="space-y-3 text-[#2C211B]/80 leading-relaxed font-normal p-3 rounded-lg bg-white border border-[#2C211B]/10">
                    <p>
                      Each {product.name} frame arrives in our signature protective hard case, accompanied by a microfiber lens-cleaning cloth, certified atelier warranty documentation, and our 30-day home trial guarantee.
                      Each {product.name} frame arrives in our signature protective hard case, accompanied by a microfiber lens-cleaning cloth, certified atelier warranty documentation, and our 30-day home trial guarantee.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* NEW EDITORIAL GALLERY & ARCHITECTURAL SPREAD BELOW BUY BOX   */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-20 pt-16 border-t border-[#2C211B]/15">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 border-b border-[#2C211B]/10">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono-tech tracking-widest text-[#861F3A] uppercase mb-2">
                <span className="hanko-stamp text-[9px] px-1 py-0 border-[#861F3A]">空</span>
                <span className="font-bold">IN THE FIELD & ON THE RUNWAY</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#2C211B] tracking-tight">
                VISUAL ARCHIVE // {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7055] mt-2 max-w-xl font-normal">
                Real-world editorial photography, natural lighting tests, and craftsmanship details.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono-tech text-[#6B7055]">
                {product.images.length} High-Resolution Photographic Plates
              </span>
            </div>
          </div>

          {/* Editorial Visual Story Grid */}
          <div className="mt-10 space-y-12">
            
            {/* Plate 1: Full-width Hero Editorial Model Shot */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#2C211B]/10 rounded-2xl p-6 sm:p-10 shadow-sm">
              <div className="lg:col-span-7 h-[340px] sm:h-[420px] overflow-hidden rounded-xl bg-[#FAF7F0] border border-[#2C211B]/10 p-3 sm:p-5 flex items-center justify-center relative">
                <img
                  src={product.images[0]}
                  alt={`Model styled in SORA ${product.name} ${product.category} sunglasses`}
                  className="max-h-full max-w-full object-contain drop-shadow-sm hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                <span className="text-[10px] font-mono-tech tracking-widest text-[#861F3A] uppercase font-bold">
                  PLATE 01 // PERSPECTIVE & PRESENCE
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#2C211B] leading-tight">
                  ENGINEERED FOR SELF-EXPRESSION
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7055] leading-relaxed font-normal">
                  Designed to look effortless in any ambient light. The beveled browline rests comfortably across the nose bridge while framing your facial contours with sculpted confidence.
                </p>
                <div className="pt-4 border-t border-[#2C211B]/10 grid grid-cols-2 gap-4 text-xs font-mono-tech">
                  <div>
                    <span className="text-[#6B7055] text-[10px] block">SILHOUETTE</span>
                    <strong className="text-[#2C211B] font-bold">{product.shape} Architectural</strong>
                  </div>
                  <div>
                    <span className="text-[#6B7055] text-[10px] block">FITTING</span>
                    <strong className="text-[#2C211B] font-bold">Universal Asian & Global Fit</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Plate 2 & 3: Side-by-Side Dual Detail Spread */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Detail Card */}
              {product.images[1] && (
                <div className="bg-white border border-[#2C211B]/10 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group">
                  <div className="h-64 sm:h-72 overflow-hidden bg-[#FAF7F0] p-4 flex items-center justify-center">
                    <img
                      src={product.images[1]}
                      alt={`SORA ${product.name} precision frame craftsmanship and hinge detail`}
                      className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-mono-tech text-[#6B7055] uppercase tracking-wider block mb-1 font-bold">
                      PLATE 02 // STUDIO DISPLAY
                    </span>
                    {/* <h4 className="font-display text-xl font-bold uppercase text-[#2C211B]">
                      {product.category === 'Titanium' 
                        ? 'PRECISION TITANIUM WIREFRAME' 
                        : 'SCULPTED CELLULOSE PROPIONATE GEOMETRY'}
                        : 'SCULPTED CELLULOSE PROPIONATE GEOMETRY'}
                    </h4>
                    <p className="text-xs text-[#6B7055] mt-2 leading-relaxed">
                      {product.category === 'Titanium'
                        ? 'Forged in Sabae, Japan from Grade 4 titanium with micro-flex tension joints. Ultralight 16-17g profile that balances effortlessly all day.'
                        : 'Hand-tumbled with Japanese bamboo chips for 72 continuous hours, imparting a smooth, silky tactile finish that feels weightless against skin.'}
                    </p> */}
                  </div>
                </div>
              )}

              {/* Right Detail Card (Sky / Optic Test) */}
              {product.images[4] || product.images[2] ? (
                <div className="bg-white border border-[#2C211B]/10 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group">
                  <div className="h-64 sm:h-72 overflow-hidden bg-[#FAF7F0] p-4 flex items-center justify-center">
                    <img
                      src={product.images[4] || product.images[2]}
                      alt={`SORA ${product.name} polarized lens daylight optical test`}
                      className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-mono-tech text-[#861F3A] uppercase tracking-wider block mb-1 font-bold">
                      PLATE 03 // SKYLIGHT & OPTICS
                    </span>
                    <h4 className="font-display text-xl font-bold uppercase text-[#2C211B]">
                      HIGH-DEFINITION LIGHT TRANSMISSION
                    </h4>
                    <p className="text-xs text-[#6B7055] mt-2 leading-relaxed">
                      Captured directly against the evening twilight. Zero optical aberration, enhanced warm contrast, and 100% certified UV400 radiation protection.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>


          </div>
        </div>

        {/* Related Products Recommendation Row — Compact, Sleek 4-Column Layout */}
        {relatedProducts.length > 0 && (
          <div className="mt-14 pt-8 border-t border-[#2C211B]/10">
            <div className="flex items-center justify-between pb-5">
              <div>
                <span className="text-[10px] font-mono-tech tracking-widest text-[#6B7055] uppercase block mb-1 font-bold">
                  MORE SILHOUETTES
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase text-[#2C211B]">
                  EXPLORE SIMILAR FRAMES
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} editorialMode />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
