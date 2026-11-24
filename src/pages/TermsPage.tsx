import React, { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, Scale, Truck, Mail, RefreshCcw, XCircle } from 'lucide-react';
import { ENQUIRY_WHATSAPP_NUMBER } from '../utils/whatsappEnquiry';

export const TermsPage: React.FC = () => {
  const { setCurrentView } = useShop();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Terms & Conditions | SORA (空)';
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F5EFE3] text-[#2C211B] py-6 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="pb-5 sm:pb-8 border-b border-[#2C211B]/10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs font-mono-tech tracking-wider text-[#6B7055] hover:text-[#861F3A] uppercase transition-colors cursor-pointer font-bold"
          >
            <ArrowLeft size={16} />
            <span>Back to shop</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[11px] font-mono-tech text-[#6B7055] uppercase font-semibold">
              Terms & Conditions
            </span>
            <span className="hanko-stamp text-[9px] px-1.5 py-0.5 border-[#861F3A] text-[#861F3A]">空</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="mt-6 sm:mt-10 pb-6 sm:pb-10 border-b border-[#2C211B]/10">
          <div className="flex items-center gap-2 text-[11px] font-mono-tech tracking-widest text-[#6B7055] uppercase mb-2">
            <Scale size={14} className="text-[#861F3A]" />
            <span>Terms of sale</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#2C211B]">
            TERMS & CONDITIONS
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#6B7055] font-normal leading-relaxed max-w-2xl">
            Welcome to SORA (空). These terms govern the purchase and dispatch of all eyewear ordered through this platform.
          </p>
        </div>

        {/* Policy Body */}
        <div className="mt-6 sm:mt-12 space-y-8 sm:space-y-12">
          
          {/* Section 1: Our Products */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#861F3A]/10 text-[#861F3A] flex items-center justify-center font-bold">
                01
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                Our Products
              </h2>
            </div>
            <p className="text-sm text-[#2C211B]/80 leading-relaxed font-normal">
              SORA frame names and designs are inspired by Japanese words for the sky. Every pair has UV400-protected lenses. Product photos are for reference; colours may look slightly different depending on your screen.
            </p>
          </section>

          {/* Section 2: Pricing & Currency */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#861F3A]/10 text-[#861F3A] flex items-center justify-center font-bold">
                02
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                Pricing in Indian Rupee (₹) & Inclusive Taxes
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#2C211B]/80 leading-relaxed">
              <p>
                All prices displayed across the SORA platform are denominated exclusively in <strong>Indian Rupee (INR ₹)</strong> and are inclusive of applicable Goods and Services Tax (GST).
              </p>
              <p>
                The total price presented in your final bag summary is complete and final. There are no extra checkout fees or delivery charges.
              </p>
            </div>
          </section>

          {/* Section 3: Shipping */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#C8A96B]/20 text-[#2C211B] flex items-center justify-center font-bold">
                <Truck size={18} className="text-[#861F3A]" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                Shipping
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#2C211B]/80 leading-relaxed">
              <p>
                Shipping is included in every price, so no delivery charges are added at checkout. Once your order is confirmed on WhatsApp, we&rsquo;ll share the expected delivery time and tracking details with you.
              </p>
            </div>
          </section>

          {/* Section 4: Returns & Exchanges */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#C8A96B]/20 text-[#2C211B] flex items-center justify-center font-bold">
                <RefreshCcw size={18} className="text-[#861F3A]" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                Returns & Exchanges
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#2C211B]/80 leading-relaxed">
              <p>
                All purchases are final. We do not offer exchanges or returns for reasons such as a change of mind, incorrect fit, or styling preference. Please review your selection carefully before ordering.
              </p>
              <p>
                The only exception is a frame that arrives damaged or defective. Shoot an unedited, continuous unboxing video from the moment the sealed package is opened, and share it with us at <a href="mailto:hello@yoursora.shop" className="font-semibold hover:text-[#861F3A]">hello@yoursora.shop</a> within 48 hours of delivery. This is required so we can assess the damage. Claims without an unboxing video cannot be processed.
              </p>
              <p>
                Once the damage is verified, we&rsquo;ll replace the item with the same frame and variant. If that exact item is out of stock at the time of replacement, we&rsquo;ll issue a full refund instead.
              </p>
            </div>
          </section>

          {/* Section 5: Cancellations */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#C8A96B]/20 text-[#2C211B] flex items-center justify-center font-bold">
                <XCircle size={18} className="text-[#861F3A]" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                Cancellations
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#2C211B]/80 leading-relaxed">
              <p>
                You can cancel anytime before your order is dispatched. Just{' '}
                <a href={`https://wa.me/${ENQUIRY_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-[#861F3A]">message us on WhatsApp</a>{' '}
                and we&rsquo;ll refund you in full to your original payment method within 5 to 7 working days.
              </p>
              <p>Once your order has shipped, it can&rsquo;t be cancelled.</p>
              <p>
                Orders using a bundle offer (Any 2 for ₹2,499) can be cancelled before dispatch, but only as a whole order, not individual frames. If you&rsquo;d like to keep some frames, we&rsquo;ll recalculate the price for what you keep (full price, or the bundle price that still applies) and refund the difference.
              </p>
            </div>
          </section>

          {/* Section 6: Support & Dispute Resolution */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#861F3A]/10 text-[#861F3A] flex items-center justify-center font-bold">
                06
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                Support & Governing Law
              </h2>
            </div>
            <p className="text-sm text-[#2C211B]/80 leading-relaxed mb-6">
              These terms are governed by the laws of India. For any question about your order, please contact us and we'll get back to you personally.
            </p>

            <div className="p-4 rounded-xl bg-[#2C211B] text-[#F5EFE3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono-tech text-[#C8A96B] tracking-wider uppercase block font-bold">
                  CUSTOMER SUPPORT
                </span>
                <span className="text-sm font-semibold">hello@yoursora.shop</span>
              </div>
              <a
                href="mailto:hello@yoursora.shop?subject=SORA%20Terms%20Inquiry"
                className="bg-[#861F3A] hover:bg-[#6b182e] text-[#F5EFE3] px-4 py-2 text-xs font-mono-tech font-bold uppercase rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Mail size={13} />
                <span>Contact Support</span>
              </a>
            </div>
          </section>

        </div>

        {/* Back to top footer */}
        <div className="mt-8 sm:mt-16 pt-6 sm:pt-8 border-t border-[#2C211B]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-[#6B7055]">
          <span>SORA (空) // SUNGLASSES INSPIRED BY THE SKY</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[#2C211B] hover:text-[#861F3A] font-bold uppercase cursor-pointer"
          >
            ↑ Return to Top
          </button>
        </div>

      </div>
    </div>
  );
};

