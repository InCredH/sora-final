import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Menu, X, ArrowRight, Search } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    setIsCartOpen,
    setIsSearchOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  const OFFERS = [
    {
      title: 'SPECIAL LAUNCH OFFER: GET FLAT 10% OFF ON ALL ORDERS',
      code: 'SORA10',
      tag: 'USE CODE'
    },
    {
      title: 'LIMITED DROP: INSTANT ₹500 OFF ON PURCHASES OVER ₹2,499',
      code: 'FLAGSHIP',
      tag: 'USE CODE'
    },
    {
      title: 'FREE EXPRESS INSURED DISPATCH & 30-DAY IN-STUDIO TRIAL ACROSS INDIA',
      code: null,
      tag: 'NO CODE NEEDED'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % OFFERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [OFFERS.length]);

  const handleNavClick = (view: 'home' | 'shop' | 'story' | 'privacy' | 'terms') => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Announcement Bar: Luxury Live Offers Strip */}
      <div className="bg-[#2C211B] text-[#C8A96B] border-b border-[#C8A96B]/20 py-2 px-3 sm:px-4 text-center text-[10px] sm:text-[11px] font-mono-tech tracking-widest uppercase flex items-center justify-center gap-2 sm:gap-3 transition-all duration-500 overflow-hidden min-h-[34px]">
        <span className="hanko-stamp text-[9px] py-0 px-1 border-[#C8A96B] text-[#C8A96B] bg-[#C8A96B]/10 shrink-0">空</span>
        
        <div key={currentOfferIndex} className="flex items-center gap-2 animate-in fade-in duration-500 overflow-hidden">
          <span className="font-medium text-[#F5EFE3] truncate max-w-[280px] sm:max-w-none">
            {OFFERS[currentOfferIndex].title}
          </span>
          {OFFERS[currentOfferIndex].code ? (
            <span className="inline-flex items-center gap-1.5 shrink-0">
              <span className="text-[#C8A96B]/60 hidden sm:inline">//</span>
              <span className="bg-[#861F3A] text-white px-2 py-0.5 rounded font-mono font-bold tracking-wider text-[9px] sm:text-[10px] shadow-sm">
                {OFFERS[currentOfferIndex].code}
              </span>
            </span>
          ) : (
            <span className="text-[#C8A96B] hidden sm:inline text-[9px] border border-[#C8A96B]/30 px-1.5 py-0.2 rounded shrink-0">
              {OFFERS[currentOfferIndex].tag}
            </span>
          )}
        </div>
      </div>

      {/* Main Sticky Navigation — Perfectly Centered 3-Column Layout */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5EFE3]/95 backdrop-blur-xl border-b border-[#2C211B]/10 shadow-sm py-3'
            : 'bg-[#F5EFE3] border-b border-[#2C211B]/8 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-[1fr_auto_1fr] items-center">
          
          {/* Left Column (1fr): Navigation Links */}
          <div className="flex items-center gap-6 xl:gap-8 justify-start">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-[#2C211B] hover:text-[#861F3A] p-1 -ml-1 transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu size={22} />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-mono-tech tracking-widest uppercase">
              <button
                type="button"
                onClick={() => handleNavClick('shop')}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentView === 'shop'
                    ? 'text-[#2C211B] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#861F3A]'
                    : 'text-[#2C211B]/70 hover:text-[#861F3A]'
                }`}
              >
                Collection
              </button>

              <button
                type="button"
                onClick={() => {
                  if (currentView !== 'home') {
                    setCurrentView('home');
                    setTimeout(() => {
                      document.getElementById('seen-in-sora')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    document.getElementById('seen-in-sora')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="transition-colors py-1 relative text-[#2C211B]/70 hover:text-[#861F3A] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Seen in SORA</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#861F3A]" />
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('story')}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentView === 'story'
                    ? 'text-[#2C211B] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#861F3A]'
                    : 'text-[#2C211B]/70 hover:text-[#861F3A]'
                }`}
              >
                The Manifesto
              </button>
            </nav>
          </div>

          {/* Center Column: Exactly Centered Luxury SORA Wordmark */}
          <div className="flex flex-col items-center justify-center px-4">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="group flex flex-col items-center focus:outline-none cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-[0.24em] text-[#2C211B] transition-all duration-300 group-hover:text-[#861F3A]">
                  SORA
                </span>
                <span className="hanko-stamp text-xs px-1.5 py-0.5">空</span>
              </div>
              <span className="text-[8px] font-mono-tech tracking-[0.35em] text-[#6B7055] uppercase font-semibold -mt-0.5">
                TOKYO // S/S 2026
              </span>
            </button>
          </div>

          {/* Right Column (1fr): Search & Shopping Bag Triggers */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-4">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-[#2C211B]/80 hover:text-[#861F3A] hover:bg-black/5 rounded-lg text-xs font-mono-tech transition-colors cursor-pointer border border-[#2C211B]/15 bg-white/70 shadow-2xs"
              aria-label="Search Collection"
            >
              <Search size={14} className="text-[#6B7055]" />
              <span className="hidden xl:inline text-[11px] font-bold tracking-wider">SEARCH</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-[#FAF7F0] border border-[#2C211B]/15 rounded text-[#6B7055]">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] px-3.5 sm:px-4 py-2 transition-all duration-300 rounded cursor-pointer shadow-sm hover:shadow-md"
              aria-label="Open Bag"
            >
              <ShoppingBag size={15} className="text-[#C8A96B]" />
              <span className="text-xs font-mono-tech font-bold tracking-wider">
                BAG ({cartCount})
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#2C211B]/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-full max-w-xs bg-[#F5EFE3] border-r border-[#2C211B]/15 p-6 flex flex-col justify-between z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#2C211B]/10">
                <div className="flex items-center gap-2">
                  <span className="font-display text-xl font-black tracking-[0.22em] text-[#2C211B]">
                    SORA
                  </span>
                  <span className="hanko-stamp text-[10px] px-1 py-0.2">空</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#2C211B] hover:text-[#861F3A] p-1 cursor-pointer"
                  aria-label="Close Navigation"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Navigation links */}
              <div className="py-6 flex flex-col gap-4 text-sm font-mono-tech tracking-wider uppercase">
                {/* Mobile Search Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="flex items-center gap-3 p-3 bg-white border border-[#2C211B]/15 rounded-xl text-xs font-mono-tech text-[#6B7055] hover:text-[#861F3A] hover:border-[#861F3A] transition-all cursor-pointer mb-2"
                >
                  <Search size={16} className="text-[#861F3A]" />
                  <span>Search Silhouettes...</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('home')}
                  className="text-left text-[#2C211B] hover:text-[#861F3A] py-1 flex items-center justify-between cursor-pointer"
                >
                  <span>Home</span>
                  <ArrowRight size={14} className="text-[#6B7055]" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('shop')}
                  className="text-left text-[#2C211B] hover:text-[#861F3A] py-1 flex items-center justify-between cursor-pointer"
                >
                  <span>Collection</span>
                  <ArrowRight size={14} className="text-[#6B7055]" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (currentView !== 'home') {
                      setCurrentView('home');
                      setTimeout(() => {
                        document.getElementById('seen-in-sora')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      document.getElementById('seen-in-sora')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-left text-[#2C211B] hover:text-[#861F3A] py-1 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>Seen in SORA</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#861F3A]" />
                  </span>
                  <ArrowRight size={14} className="text-[#6B7055]" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('story')}
                  className="text-left text-[#2C211B] hover:text-[#861F3A] py-1 flex items-center justify-between cursor-pointer"
                >
                  <span>The Manifesto</span>
                  <ArrowRight size={14} className="text-[#6B7055]" />
                </button>

                <div className="pt-2 border-t border-[#2C211B]/10 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => handleNavClick('privacy')}
                    className="text-left text-xs text-[#6B7055] hover:text-[#861F3A] py-1 flex items-center justify-between cursor-pointer font-semibold"
                  >
                    <span>Privacy Policy</span>
                    <ArrowRight size={12} className="text-[#6B7055]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavClick('terms')}
                    className="text-left text-xs text-[#6B7055] hover:text-[#861F3A] py-1 flex items-center justify-between cursor-pointer font-semibold"
                  >
                    <span>Terms & Conditions</span>
                    <ArrowRight size={12} className="text-[#6B7055]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Footer information */}
            <div className="pt-8 border-t border-[#2C211B]/10 text-[11px] font-mono-tech text-[#6B7055] flex flex-col gap-1">
              <span className="text-[#2C211B] font-semibold">SORA ATELIER // 空 TOKYO</span>
              <span>SABAE CRAFTED • ZERO-DISTORTION OPTICS</span>
              <span className="text-[#861F3A] font-bold mt-2">ALL PRICES IN INR (₹)</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
