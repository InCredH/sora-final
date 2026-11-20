import React, { useState, useEffect } from 'react';
import { Product, ProductVariant, BUNDLE_OFFER, isBundleEligible, isLowStock, withVariant } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  editorialMode?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, editorialMode = false }) => {
  const { openProductDetail, addToCart, formatPrice } = useShop();
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverImageIndex, setHoverImageIndex] = useState(0);

  // Product as seen with the selected colour (its own images & stock).
  const view = withVariant(product, selectedVariant);
  const images = view.images;

  // Auto-cycle through product images with smooth continuous cross-fade on hover
  useEffect(() => {
    if (!isHovered || images.length <= 1) {
      setHoverImageIndex(0);
      return;
    }

    const timer = setInterval(() => {
      setHoverImageIndex((prev) => (prev + 1) % images.length);
    }, 1400); // changes smoothly every 1.4s with 700ms cross-dissolve

    return () => clearInterval(timer);
  }, [isHovered, images.length]);

  const handleVariantClick = (e: React.MouseEvent, variant: ProductVariant) => {
    e.stopPropagation();
    setSelectedVariant(variant);
    setHoverImageIndex(0);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!view.inStock) return;
    addToCart(product, selectedVariant, 1);
  };

  return (
    <div
      onClick={() => openProductDetail(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoverImageIndex(0);
      }}
      className={`group relative flex flex-col cursor-pointer transition-all duration-500 ease-out hover-lift rounded-2xl ${
        editorialMode ? 'bg-white p-2.5 sm:p-3 border border-[#2C211B]/10 hover:border-[#861F3A]/40 shadow-sm' : 'p-2'
      }`}
    >
      {/* Image Container with Balanced Proportions — Compact & Sleek */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF7F0] rounded-xl shadow-xs">
        
        {/* Badges & Discount Percentage — Perfectly Inset & Aligned */}
        <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1 items-start pointer-events-none">
          {isBundleEligible(product) && (
            <span className="text-[10px] font-mono-tech tracking-normal px-2 py-0.5 uppercase rounded-md bg-[#861F3A] text-white font-bold shadow-md">
              {BUNDLE_OFFER.label}
            </span>
          )}
          {!view.inStock && (
            <span className="text-[10px] font-mono-tech tracking-normal px-2 py-0.5 uppercase bg-[#2C211B]/85 text-[#F5EFE3] rounded-md font-semibold shadow-md">
              SOLD OUT
            </span>
          )}
          {isLowStock(view) && (
            <span className="text-[10px] font-mono-tech tracking-normal px-2 py-0.5 uppercase bg-[#861F3A] text-white rounded-md font-semibold shadow-md">
              ONLY {view.stockQuantity} LEFT
            </span>
          )}
        </div>

        {/* Stacked Images: Edge-to-edge for portraits, cleanly contained for wide flatlays */}
        <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
          {images.map((img, idx) => {
            const isCurrentlyActive = isHovered ? hoverImageIndex === idx : idx === 0;

            const isFrameAngle = img.includes('frame-angle');

            return (
              <img
                key={img}
                src={img}
                alt={`SORA ${product.name} sunglasses, angle ${idx + 1}`}
                loading={idx === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                  isFrameAngle ? 'object-contain p-2.5' : 'object-cover'
                } ${
                  isCurrentlyActive
                    ? 'opacity-100 scale-100 z-10 filter contrast-[1.03]'
                    : 'opacity-0 scale-105 pointer-events-none z-0'
                }`}
              />
            );
          })}
        </div>

        {/* Dynamic Image Progress Dots with smooth pulse (Visible when hovering over the card) */}
        {isHovered && images.length > 1 && (
          <div className="absolute bottom-14 inset-x-0 z-20 flex justify-center items-center gap-1.5 pointer-events-none">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ease-out ${
                  hoverImageIndex === i ? 'w-5 bg-[#861F3A] shadow-md' : 'w-1.5 bg-black/35 backdrop-blur-sm'
                }`}
              />
            ))}
          </div>
        )}

        {/* Subtle warm gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C211B]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

        {/* Floating Quick Action Bar on Hover — desktop only; mobile taps the card to open the product page */}
        <div className="hidden sm:flex absolute bottom-3 inset-x-3 z-20 items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
          <button
            type="button"
            disabled={!view.inStock}
            onClick={handleQuickAdd}
            className="flex-1 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] py-2.5 px-3 text-xs font-mono-tech tracking-wider uppercase font-semibold flex items-center justify-center gap-2 transition-colors disabled:bg-[#6B7055] disabled:cursor-not-allowed shadow-xl rounded cursor-pointer"
          >
            <ShoppingBag size={13} className="text-[#C8A96B]" />
            {view.inStock ? 'Add to Bag' : 'Sold Out'}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
            aria-label="View details"
            className="w-10 h-10 bg-white hover:bg-[#FAF7F0] text-[#2C211B] flex items-center justify-center border border-[#2C211B]/15 shadow-lg rounded transition-colors cursor-pointer"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-2.5 sm:mt-3 flex-1 flex flex-col gap-1 sm:gap-1.5 px-0.5 sm:px-1">
        {/* Meaning & Shape */}
        <div className="flex flex-col items-start gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2 text-[10px] sm:text-[11px] leading-tight font-mono-tech tracking-wide sm:tracking-wider text-[#6B7055] uppercase font-medium">
          <span className="min-w-0 truncate max-w-full">{product.japaneseMeaning} · {product.subtitle}</span>
          {product.shape && <span className="text-[#C8A96B] font-semibold whitespace-nowrap shrink-0">{product.shape}</span>}
        </div>

        {/* Product Title and Price with Discount */}
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="min-w-0 truncate font-display text-sm sm:text-base font-bold tracking-wide text-[#2C211B] group-hover:text-[#861F3A] transition-colors uppercase">
            {product.name}
          </h3>
          <span className="font-mono-tech text-[11px] sm:text-xs text-[#2C211B] font-bold whitespace-nowrap shrink-0">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-[11px] text-[#6B7055] italic mb-auto">{product.tagline}</p>

        {/* Colorway Variant Dots */}
        {product.variants.length > 0 && (
          <div className="flex items-center gap-1.5 mt-1 pt-1.5 border-t border-[#2C211B]/10">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={(e) => handleVariantClick(e, variant)}
                className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                  selectedVariant.id === variant.id
                    ? 'border-[#861F3A] scale-125 shadow-sm'
                    : 'border-black/20 hover:scale-110'
                }`}
                style={{ backgroundColor: variant.colorHex }}
                title={variant.colorName}
                aria-label={variant.colorName}
              />
            ))}
            <span className="text-[10px] font-mono-tech text-[#6B7055] ml-1.5 truncate">
              {selectedVariant.colorName}
            </span>
          </div>
        )}

        {/* Mobile-only Add to Bag (desktop uses the hover bar on the image) */}
        <button
          type="button"
          disabled={!view.inStock}
          onClick={handleQuickAdd}
          className="sm:hidden mt-1.5 w-full flex items-center justify-center gap-1.5 bg-[#2C211B] active:bg-[#861F3A] text-[#F5EFE3] py-2 px-2 text-[10.5px] font-mono-tech tracking-wider uppercase font-bold rounded-md transition-colors disabled:bg-[#6B7055]/60 disabled:cursor-not-allowed cursor-pointer"
        >
          <ShoppingBag size={12} className="text-[#C8A96B] shrink-0" />
          <span>{view.inStock ? 'Add to Bag' : 'Sold Out'}</span>
        </button>
      </div>
    </div>
  );
};
