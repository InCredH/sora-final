import React, { useState, useEffect } from 'react';
import { Product, ProductVariant } from '../data/products';
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

  // Auto-cycle through product images with smooth continuous cross-fade on hover
  useEffect(() => {
    if (!isHovered || product.images.length <= 1) {
      setHoverImageIndex(0);
      return;
    }

    const timer = setInterval(() => {
      setHoverImageIndex((prev) => (prev + 1) % product.images.length);
    }, 1400); // changes smoothly every 1.4s with 700ms cross-dissolve

    return () => clearInterval(timer);
  }, [isHovered, product.images.length]);

  const discountPercent = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) 
    : null;

  const handleVariantClick = (e: React.MouseEvent, variant: ProductVariant) => {
    e.stopPropagation();
    setSelectedVariant(variant);
    const varIdx = product.images.findIndex(img => img === variant.image);
    if (varIdx !== -1) {
      setHoverImageIndex(varIdx);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
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
          {discountPercent && (
            <span className="text-[10px] font-mono-tech tracking-normal px-2 py-0.5 uppercase rounded-md bg-[#861F3A] text-white font-bold shadow-md inline-flex items-center gap-1">
              <span>SAVE</span>
              <span>{discountPercent}%</span>
            </span>
          )}
          {product.badge && !discountPercent && (
            <span className={`text-[10px] font-mono-tech tracking-normal px-2 py-0.5 uppercase rounded-md font-bold shadow-md ${
              product.badge === 'LIMITED RUN'
                ? 'bg-[#C8A96B] text-[#2C211B]'
                : product.badge === 'SALE'
                ? 'bg-[#861F3A] text-white'
                : 'bg-[#2C211B] text-[#F5EFE3]'
            }`}>
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <span className="text-[10px] font-mono-tech tracking-normal px-2 py-0.5 uppercase bg-[#2C211B]/85 text-[#F5EFE3] rounded-md font-semibold shadow-md">
              SOLD OUT
            </span>
          )}
        </div>

        {/* Stacked Images: Edge-to-edge for portraits, cleanly contained for wide flatlays */}
        <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
          {product.images.map((img, idx) => {
            const isCurrentlyActive = isHovered
              ? hoverImageIndex === idx
              : (selectedVariant.image ? selectedVariant.image === img : idx === 0);

            const isFrameAngle = img.includes('frame-angle');

            return (
              <img
                key={img}
                src={img}
                alt={`SORA ${product.name} luxury eyewear — Angle ${idx + 1}`}
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
        {isHovered && product.images.length > 1 && (
          <div className="absolute bottom-14 inset-x-0 z-20 flex justify-center items-center gap-1.5 pointer-events-none">
            {product.images.map((_, i) => (
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

        {/* Floating Quick Action Bar on Hover */}
        <div className="absolute bottom-3 inset-x-3 z-20 flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
          <button
            type="button"
            disabled={!product.inStock}
            onClick={handleQuickAdd}
            className="flex-1 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] py-2.5 px-3 text-xs font-mono-tech tracking-wider uppercase font-semibold flex items-center justify-center gap-2 transition-colors disabled:bg-[#6B7055] disabled:cursor-not-allowed shadow-xl rounded cursor-pointer"
          >
            <ShoppingBag size={13} className="text-[#C8A96B]" />
            {product.inStock ? 'Add to Bag' : 'Archived'}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
            aria-label="Inspect specifications"
            className="w-10 h-10 bg-white hover:bg-[#FAF7F0] text-[#2C211B] flex items-center justify-center border border-[#2C211B]/15 shadow-lg rounded transition-colors cursor-pointer"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-3 flex flex-col gap-1.5 px-1">
        {/* Category & Shape */}
        <div className="flex items-center justify-between text-[11px] font-mono-tech tracking-wider text-[#6B7055] uppercase font-medium">
          <span>{product.category}</span>
          <span className="text-[#C8A96B] font-semibold">{product.shape}</span>
        </div>

        {/* Product Title and Price with Discount */}
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-base font-bold tracking-wide text-[#2C211B] group-hover:text-[#861F3A] transition-colors uppercase">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-1.5">
            {product.salePrice ? (
              <>
                <span className="font-mono-tech text-xs text-[#861F3A] font-bold">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="font-mono-tech text-[11px] text-[#6B7055] line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="font-mono-tech text-xs text-[#2C211B] font-bold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Authentic Stock Urgency Notification */}
        <div className="flex items-center justify-between text-[10px] font-mono-tech pt-1">
          <span className={`font-bold ${
            product.stockCount <= 5 ? 'text-[#861F3A]' : 'text-[#6B7055]'
          }`}>
            {product.stockCount <= 5
              ? `Few left in stock (Only ${product.stockCount} remaining)`
              : 'In Stock • Ships in 24 hrs'}
          </span>
          <span className="text-[#C8A96B] font-medium hidden sm:inline">
            SABAE CRAFT
          </span>
        </div>

        {/* Colorway Variant Dots */}
        {product.variants.length > 1 && (
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
      </div>
    </div>
  );
};
