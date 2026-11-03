import React from 'react';
import { useShop } from '../context/ShopContext';

interface NewsletterAndFooterProps {
  onOpenPolicy: (key: string) => void;
}

export const NewsletterAndFooter: React.FC<NewsletterAndFooterProps> = ({ onOpenPolicy }) => {
  const { setCurrentView } = useShop();

  return (
    <footer className="w-full bg-[#2C211B] text-[#F5EFE3] border-t border-[#C8A96B]/20">
      {/* Main Sitemap & Info Grid */}
      <div className="max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-black tracking-[0.22em] text-[#F5EFE3]">
                SORA
              </span>
              <span className="hanko-stamp text-xs px-1.5 py-0.5 border-[#C8A96B] text-[#C8A96B] bg-[#C8A96B]/10">空</span>
            </div>
            <p className="mt-4 text-xs text-[#F5EFE3]/75 font-normal leading-relaxed max-w-sm">
              Contemporary luxury eyewear brand crafted in Sabae, Japan. Optical precision, certified 100% UV400 polarized lenses, and architectural silhouettes sculpted for personal expression.
            </p>
            <div className="mt-6 text-xs font-mono-tech text-[#C8A96B]">
              CONCIERGE: <a href="mailto:concierge@yoursora.shop" className="text-[#F5EFE3] hover:underline font-semibold">concierge@yoursora.shop</a>
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
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#C8A96B] transition-colors cursor-pointer"
                >
                  Japanese Titanium
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#C8A96B] transition-colors cursor-pointer"
                >
                  Bio-Acetate Frames
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#C8A96B] transition-colors cursor-pointer"
                >
                  Shield & Rimless
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
                  The Manifesto
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('craft')}
                  className="hover:text-[#C8A96B] transition-colors text-left cursor-pointer"
                >
                  Sabae Metallurgy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('sustainability')}
                  className="hover:text-[#C8A96B] transition-colors text-left cursor-pointer"
                >
                  Cellulose Sustainability
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
                  Complimentary Shipping
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('trial')}
                  className="hover:text-[#C8A96B] transition-colors text-left cursor-pointer"
                >
                  30-Day In-Studio Trial
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('warranty')}
                  className="hover:text-[#C8A96B] transition-colors text-left cursor-pointer"
                >
                  2-Year Lens Warranty
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
        <div className="mt-16 pt-8 border-t border-[#C8A96B]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-[#F5EFE3]/70">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#C8A96B] font-semibold">ALL PRICES IN INDIAN RUPEE (₹)</span>
            <span>•</span>
            <span>TAXES INCLUDED</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setCurrentView('privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#C8A96B] underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setCurrentView('terms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#C8A96B] underline cursor-pointer"
            >
              Terms of Service
            </button>
          </div>

          <div className="flex items-center gap-6">
            <span>© 2026 SORA EYEWEAR. ALL RIGHTS RESERVED.</span>
            <span className="hidden md:inline text-[#C8A96B]">FLAGSHIP TOKYO // BENGALURU</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
