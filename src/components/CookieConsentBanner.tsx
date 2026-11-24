import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

// Slim privacy notice. SORA has no analytics or tracking cookies, so there is
// nothing to opt in or out of: the bar just says what is stored and links to the policy.
export const CookieConsentBanner: React.FC = () => {
  const { setCurrentView } = useShop();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('sora_cookie_consent')) {
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Local storage unavailable: don't show the bar.
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(
        'sora_cookie_consent',
        JSON.stringify({ type: 'essential', essential: true, timestamp: new Date().toISOString() })
      );
    } catch {
      // Ignore: the bar simply shows again next visit.
    }
    setIsVisible(false);
  };

  const openPrivacy = () => {
    setCurrentView('privacy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Privacy notice"
      className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <div className="bg-[#2C211B] text-[#F5EFE3] border border-[#C8A96B]/30 rounded-xl pl-3.5 pr-2 py-2.5 shadow-xl flex items-center gap-3">
        <p className="flex-1 text-[11px] leading-snug text-[#F5EFE3]/85">
          We only save your bag on this device. No tracking.{' '}
          <button type="button" onClick={openPrivacy} className="underline text-[#C8A96B] hover:text-[#F5EFE3] cursor-pointer">
            Privacy
          </button>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 bg-[#861F3A] hover:bg-[#6b182e] text-[#F5EFE3] px-3.5 py-1.5 text-[11px] font-mono-tech font-bold uppercase rounded-lg cursor-pointer"
        >
          OK
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 p-1 text-[#F5EFE3]/50 hover:text-[#F5EFE3] cursor-pointer"
          aria-label="Close privacy notice"
        >
          <X size={14} />
        </button>
      </div>
    </aside>
  );
};
