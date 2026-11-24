import React from 'react';
import { useShop } from '../context/ShopContext';
import { BUNDLE_OFFER } from '../data/products';

interface NewsletterAndFooterProps {
  onOpenPolicy: (key: string) => void;
}

export const NewsletterAndFooter: React.FC<NewsletterAndFooterProps> = ({ onOpenPolicy }) => {
  const { setCurrentView, setSelectedCategoryFilter } = useShop();

  return (
    <footer className="w-full bg-[#2C211B] text-[#F5EFE3] border-t border-[#C8A96B]/20">
      {/* Main Sitemap & Info Grid */}
      <div className="max-w-7xl mx-auto py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo-transparent.png"
                alt="SORA Emblem"
                className="h-7 w-auto object-contain brightness-110"
              />
              <span className="font-display text-2xl font-black tracking-[0.22em] text-[#F5EFE3]">
                SORA
              </span>
            </div>
            <p className="mt-4 text-xs text-[#F5EFE3]/75 font-normal leading-relaxed max-w-sm">
              Sunglasses inspired by the sky. Distinctive shapes, UV400-protected lenses, and free shipping in every price.
            </p>
            <div className="mt-6 text-xs font-mono-tech text-[#C8A96B]">
              SUPPORT: <a href="mailto:hello@yoursora.shop" className="text-[#F5EFE3] hover:underline font-semibold">hello@yoursora.shop</a>
            </div>
          </div>

          {/* Nav Column 1: Collections */}
          <div>
            <h4 className="text-xs font-mono-tech uppercase font-bold text-[#C8A96B] tracking-widest mb-4">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tech text-[#F5EFE3]/80">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategoryFilter('All');
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#C8A96B] transition-colors cursor-pointer"
                >
                  All Eyewear
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategoryFilter(BUNDLE_OFFER.label);
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#C8A96B] transition-colors cursor-pointer"
                >
                  Bundle: {BUNDLE_OFFER.label}
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Column 2: Maison */}
          <div>
            <h4 className="text-xs font-mono-tech uppercase font-bold text-[#C8A96B] tracking-widest mb-4">
              THE BRAND
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tech text-[#F5EFE3]/80">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('story');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#C8A96B] transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Column 3: Client Care & Policies */}
          <div>
            <h4 className="text-xs font-mono-tech uppercase font-bold text-[#C8A96B] tracking-widest mb-4">
              CLIENT SERVICES
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tech text-[#F5EFE3]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('shipping')}
                  className="hover:text-[#C8A96B] transition-colors text-left cursor-pointer"
                >
                  Free Shipping
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('returns')}
                  className="hover:text-[#C8A96B] transition-colors text-left cursor-pointer"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('cancellation')}
                  className="hover:text-[#C8A96B] transition-colors text-left cursor-pointer"
                >
                  Cancellations
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('privacy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#C8A96B] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('terms');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#C8A96B] transition-colors text-left cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Legal & Credits (Strictly INR, no currency switcher) */}
        <div className="mt-8 sm:mt-16 pt-6 sm:pt-8 border-t border-[#C8A96B]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-[#F5EFE3]/70">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#C8A96B] font-semibold">ALL PRICES IN INDIAN RUPEE (₹)</span>
            <span>•</span>
            <span>TAXES INCLUDED</span>
          </div>

          <div className="flex items-center gap-6">
            <span>© 2026 SORA EYEWEAR. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
