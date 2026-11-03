import React, { useState } from 'react';
import { PATRON_POSTS, PatronPost } from '../data/patrons';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { SubmitLookModal } from './SubmitLookModal';
import { Sparkles, Check, ArrowRight, Eye, ShoppingBag, Copy } from 'lucide-react';

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const SeenInSora: React.FC = () => {
  const { openProductDetail, addToCart, formatPrice, showToast } = useShop();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [copiedTag, setCopiedTag] = useState(false);
  const [patrons, setPatrons] = useState<PatronPost[]>(PATRON_POSTS);

  const handleCopyTag = () => {
    navigator.clipboard.writeText('@yoursora.shop #SeenInSORA');
    setCopiedTag(true);
    showToast('Copied: @yoursora.shop #SeenInSORA');
    setTimeout(() => setCopiedTag(false), 2500);
  };

  const handleNewSubmission = (data: any) => {
    const matchedProd = PRODUCTS.find((p) => p.id === data.selectedProduct) || PRODUCTS[0];
    const newPatron: PatronPost = {
      id: `patron-${Date.now()}`,
      instagramHandle: `@${data.handle}`,
      name: data.name,
      city: data.city || 'Flagship Community',
      image: data.selectedPreviewImage,
      productId: matchedProd.id,
      productName: matchedProd.name,
      productCategory: matchedProd.category,
      productPrice: matchedProd.price,
      productImage: matchedProd.images[0],
      quote: data.quote || 'Living in architectural optics.',
      verifiedBadge: true,
      featuredStory: 'Verified Patron • Recent Feature'
    };
    setPatrons([newPatron, ...patrons]);
    showToast(`Welcome to the Runway, @${data.handle}!`);
  };

  return (
    <section id="seen-in-sora" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF7F0] text-[#2C211B] border-b border-[#2C211B]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#2C211B]/10">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono-tech tracking-widest text-[#861F3A] uppercase mb-2">
              <img src="/logo-transparent.png" alt="SORA" className="h-4 w-auto object-contain" />
              <span className="font-bold">SEEN IN SORA // COMMUNITY RUNWAY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#2C211B] tracking-tight leading-[1.05]">
              OUR PATRONS <br />
              <span className="font-serif-editorial italic font-normal text-[#861F3A] capitalize">
                Are our only models.
              </span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#6B7055] font-normal max-w-2xl leading-relaxed">
            Our frames, your individuality. Discover how the SORA community wears its own style.            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopyTag}
              className="px-4 py-2.5 bg-white hover:bg-[#F5EFE3] border border-[#2C211B]/15 text-[#2C211B] text-xs font-mono-tech tracking-wider uppercase flex items-center gap-2 transition-colors rounded shadow-sm cursor-pointer"
            >
              <InstagramIcon size={14} className="text-[#861F3A]" />
              <span>{copiedTag ? 'COPIED TAG!' : '#SeenInSORA'}</span>
              {copiedTag ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} className="text-[#6B7055]" />}
            </button>

            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-6 py-2.5 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] text-xs font-mono-tech font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md rounded cursor-pointer"
            >
              <span>SUBMIT YOUR LOOK</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Patron Editorial Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Submission Callout Card */}
          <div className="bg-[#2C211B] text-[#F5EFE3] border border-[#C8A96B]/30 rounded-xl p-6 sm:p-8 flex flex-col justify-between group shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono-tech text-[#C8A96B] uppercase tracking-widest mb-3">
                <Sparkles size={12} />
                <span>COMMUNITY DIRECTIVE</span>
              </div>
              <h3 className="font-display text-2xl font-black uppercase text-[#F5EFE3] leading-tight">
                CLAIM YOUR SPOT ON THE RUNWAY
              </h3>
              <p className="text-xs text-[#F5EFE3]/70 mt-3 font-light leading-relaxed">
                Wearing SORA? Snap a candid photograph in natural sunlight and tag us on your Instagram story.
              </p>

              <div className="mt-6 space-y-2.5 text-xs font-mono-tech text-[#F5EFE3]/80">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
                  <span>Authentic community stories</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
                  <span>Curated & Updated Weekly</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
                  <span>₹1,000 Atelier Credit upon Feature</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="mt-8 w-full bg-[#F5EFE3] text-[#2C211B] py-3 px-4 text-xs font-mono-tech uppercase font-bold flex items-center justify-center gap-2 hover:bg-[#C8A96B] transition-colors shadow-lg rounded cursor-pointer"
            >
              <span>BECOME THE NEXT FACE</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Patron Cards */}
          {patrons.slice(0, 3).map((patron) => {
            const product = PRODUCTS.find((p) => p.id === patron.productId) || PRODUCTS[0];
            return (
              <div
                key={patron.id}
                className="group relative bg-white border border-[#2C211B]/10 rounded-xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover-lift transition-all duration-400"
              >
                {/* Photo Viewport */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#2C211B]">
                  <img
                    src={patron.image}
                    alt={`${patron.name} wearing SORA ${patron.productName} in ${patron.city}`}
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C211B] via-transparent to-black/30 opacity-90" />

                  {/* Top Instagram Handle & Verified Badge */}
                  <div className="absolute top-4 inset-x-4 z-10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono-tech text-white rounded">
                      <InstagramIcon size={12} className="text-[#C8A96B]" />
                      <span>{patron.instagramHandle}</span>
                    </div>

                    <span className="text-[10px] font-mono-tech tracking-wider text-white bg-[#861F3A] px-2 py-0.5 uppercase font-bold rounded">
                      VERIFIED
                    </span>
                  </div>

                  {/* Bottom Patron Quote & City */}
                  <div className="absolute bottom-4 inset-x-4 z-10">
                    <p className="font-serif-editorial text-sm text-[#F5EFE3] italic line-clamp-2">
                      "{patron.quote}"
                    </p>
                    <span className="text-[10px] font-mono-tech text-[#C8A96B] uppercase mt-1 block">
                      {patron.name} • {patron.city}
                    </span>
                  </div>
                </div>

                {/* Bottom Frame Strip with Direct Shoppable Link */}
                <div className="p-3.5 bg-white border-t border-[#2C211B]/10 flex items-center justify-between gap-3">
                  <div
                    onClick={() => openProductDetail(product)}
                    className="flex items-center gap-2.5 cursor-pointer group/link flex-1 min-w-0"
                  >
                    <img
                      src={patron.productImage}
                      alt={`SORA ${patron.productName} silhouette`}
                      className="w-10 h-10 object-contain bg-[#FAF7F0] p-1 border border-[#2C211B]/10 rounded-lg shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[9px] font-mono-tech text-[#6B7055] uppercase block truncate font-bold">
                        WEARING {patron.productName}
                      </span>
                      <span className="text-xs font-mono-tech text-[#2C211B] font-bold">
                        {formatPrice(patron.productPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => addToCart(product, product.variants[0], 1)}
                      className="p-2 bg-[#2C211B] hover:bg-[#861F3A] text-white rounded transition-colors cursor-pointer"
                      title={`Add ${patron.productName} to Bag`}
                      aria-label={`Add ${patron.productName} to Bag`}
                    >
                      <ShoppingBag size={13} className="text-[#C8A96B]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openProductDetail(product)}
                      className="p-2 bg-[#FAF7F0] hover:bg-[#F5EFE3] text-[#2C211B] border border-[#2C211B]/15 rounded transition-colors cursor-pointer"
                      title="Inspect Frame"
                      aria-label="Inspect Frame"
                    >
                      <Eye size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submission Modal */}
      <SubmitLookModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitted={handleNewSubmission}
      />
    </section>
  );
};
