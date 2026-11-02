import React, { useState, useEffect } from 'react';
import { Shield, Cookie, X, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CookieConsentBanner: React.FC = () => {
  const { setCurrentView } = useShop();
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('sora_cookie_consent');
      if (!consent) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  const saveConsent = (type: 'all' | 'essential' | 'custom') => {
    try {
      const payload = {
        type,
        essential: true,
        analytics: type === 'all' ? true : type === 'custom' ? analyticsEnabled : false,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('sora_cookie_consent', JSON.stringify(payload));
    } catch (e) {
      console.warn('Cookie consent localStorage error:', e);
    }
    setIsVisible(false);
  };

  const handleOpenPrivacy = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentView('privacy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Privacy and Cookie Notice"
      className="fixed bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-500"
    >
      <div className="bg-[#2C211B] text-[#F5EFE3] border border-[#C8A96B]/40 rounded-2xl p-5 shadow-2xl backdrop-blur-xl flex flex-col gap-4">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C8A96B]/15 border border-[#C8A96B]/30 flex items-center justify-center text-[#C8A96B] shrink-0">
              <Cookie size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold tracking-wide uppercase text-[#F5EFE3]">
                  Patron Privacy
                </span>
                <span className="hanko-stamp text-[8px] py-0 px-1 border-[#C8A96B] text-[#C8A96B] bg-[#C8A96B]/10">空</span>
              </div>
              <span className="text-[10px] font-mono-tech tracking-wider text-[#C8A96B] uppercase block">
                SORA ATELIER // GDPR & PRIVACY NOTICE
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => saveConsent('essential')}
            className="text-[#F5EFE3]/60 hover:text-[#F5EFE3] p-1 -mr-1 transition-colors cursor-pointer"
            aria-label="Dismiss cookie notice with essential cookies only"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <p className="text-xs text-[#F5EFE3]/80 leading-relaxed font-light">
          We respect your digital sovereignty. SORA uses essential session cookies for checkout and cart preservation, alongside anonymous performance analytics to refine frame ergonomics. We never sell your personal data.
        </p>

        {/* Customization Drawer */}
        {isCustomizing && (
          <div className="bg-black/30 p-3.5 rounded-xl border border-[#C8A96B]/20 flex flex-col gap-2.5 text-xs font-mono-tech">
            <div className="flex items-center justify-between text-[#F5EFE3]">
              <span className="flex items-center gap-1.5 font-semibold">
                <Shield size={12} className="text-[#C8A96B]" />
                Essential Session (Required)
              </span>
              <span className="text-[10px] text-[#C8A96B] uppercase font-bold">Always Active</span>
            </div>
            <label className="flex items-center justify-between text-[#F5EFE3]/80 cursor-pointer pt-1 border-t border-white/5">
              <span>Anonymous Craft Analytics</span>
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                className="accent-[#861F3A] w-4 h-4 cursor-pointer"
              />
            </label>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
          {!isCustomizing ? (
            <>
              <button
                type="button"
                onClick={() => saveConsent('all')}
                className="flex-1 bg-[#861F3A] hover:bg-[#6b182e] text-[#F5EFE3] py-2 px-3 text-xs font-mono-tech font-bold uppercase rounded-lg tracking-wider transition-colors shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check size={14} className="text-[#C8A96B]" />
                <span>Accept All</span>
              </button>

              <button
                type="button"
                onClick={() => saveConsent('essential')}
                className="bg-transparent hover:bg-white/10 text-[#F5EFE3]/90 border border-white/20 py-2 px-3 text-xs font-mono-tech uppercase rounded-lg tracking-wider transition-colors cursor-pointer"
              >
                Essential Only
              </button>

              <button
                type="button"
                onClick={() => setIsCustomizing(true)}
                className="text-[11px] font-mono-tech text-[#C8A96B] hover:underline px-2 py-1 text-center cursor-pointer"
              >
                Preferences
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 w-full">
              <button
                type="button"
                onClick={() => saveConsent('custom')}
                className="flex-1 bg-[#861F3A] hover:bg-[#6b182e] text-[#F5EFE3] py-2 px-3 text-xs font-mono-tech font-bold uppercase rounded-lg tracking-wider transition-colors shadow-md cursor-pointer"
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={() => setIsCustomizing(false)}
                className="text-xs font-mono-tech text-[#F5EFE3]/70 hover:text-white px-3 py-2 cursor-pointer"
              >
                Back
              </button>
            </div>
          )}
        </div>

        {/* Footer Policy Link */}
        <div className="text-[10px] font-mono-tech text-[#F5EFE3]/50 flex items-center justify-between border-t border-white/10 pt-2">
          <button
            type="button"
            onClick={handleOpenPrivacy}
            className="hover:text-[#C8A96B] transition-colors underline cursor-pointer"
          >
            Review SORA Privacy Policy
          </button>
          <span>256-BIT TLS SECURED</span>
        </div>
      </div>
    </aside>
  );
};

