import React, { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, Shield, Mail } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { setCurrentView } = useShop();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Privacy Policy | SORA (空)';
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
              Privacy Policy
            </span>
            <span className="hanko-stamp text-[9px] px-1.5 py-0.5 border-[#861F3A] text-[#861F3A]">空</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="mt-6 sm:mt-10 pb-6 sm:pb-10 border-b border-[#2C211B]/10">
          <div className="flex items-center gap-2 text-[11px] font-mono-tech tracking-widest text-[#6B7055] uppercase mb-2">
            <Shield size={14} className="text-[#861F3A]" />
            <span>Your privacy</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#2C211B]">
            PRIVACY POLICY
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#6B7055] font-normal leading-relaxed max-w-2xl">
            This page explains, in plain words, what information SORA collects when you order from us, why we need it, and who sees it.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] font-mono-tech text-[#2C211B]/70">
            <span className="bg-[#FAF7F0] px-3 py-1 rounded-md border border-[#2C211B]/10">
              LAST UPDATED: NOVEMBER 2026
            </span>
            <span className="bg-[#FAF7F0] px-3 py-1 rounded-md border border-[#2C211B]/10">
              JURISDICTION: INDIA (DPDP ACT 2023)
            </span>
          </div>
        </div>

        {/* Policy Body */}
        <div className="mt-6 sm:mt-12 space-y-8 sm:space-y-12">

          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#861F3A]/10 text-[#861F3A] flex items-center justify-center font-bold">
                01
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                What we collect
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#2C211B]/80 leading-relaxed">
              <p>We only collect what we need to deliver your order:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Delivery details:</strong> your name, email address, delivery address, city and pincode. You type these in your bag and they are sent to us in your WhatsApp order message.</li>
                <li><strong>Your WhatsApp number and name:</strong> we see these when you message us.</li>
                <li><strong>Your order:</strong> the frames, colours, quantities and price.</li>
                <li><strong>Emails:</strong> if you email us, your message.</li>
              </ul>
              <p>This website never asks for your card or bank details. Once your order is confirmed, we send you a Razorpay payment link on WhatsApp. You pay on Razorpay&rsquo;s secure page (UPI, card or netbanking), and we never see your card or bank details.</p>
            </div>
          </section>

          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#861F3A]/10 text-[#861F3A] flex items-center justify-center font-bold">
                02
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                How we use it
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#2C211B]/80 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>To confirm your order, arrange payment and deliver it to you.</li>
                <li>To contact you about your order, including cancellations, refunds and damage claims.</li>
                <li>To keep basic records of sales, as required by Indian tax law.</li>
              </ul>
              <p>We don't send you marketing messages unless you ask us to.</p>
            </div>
          </section>

          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#861F3A]/10 text-[#861F3A] flex items-center justify-center font-bold">
                03
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                Who we share it with
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#2C211B]/80 leading-relaxed">
              <p>We never sell, rent or trade your information. We only share it where needed to complete your order:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Our delivery partner</strong> receives your name, address and phone number so they can deliver your parcel.</li>
                <li><strong>Razorpay</strong> processes your payment, under Razorpay&rsquo;s own privacy policy.</li>
                <li><strong>WhatsApp</strong> (owned by Meta) carries your order messages, under WhatsApp&rsquo;s own privacy policy.</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#861F3A]/10 text-[#861F3A] flex items-center justify-center font-bold">
                04
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                What this website stores on your device
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#2C211B]/80 leading-relaxed">
              <p>Your bag is saved in your browser&rsquo;s local storage, so it is still there if you close the page and come back. We also remember that you&rsquo;ve seen our privacy notice. This stays on your device and is not sent to us.</p>
              <p>We don&rsquo;t use advertising cookies, tracking pixels or analytics. Our fonts are loaded from Google Fonts, so your browser connects to Google&rsquo;s servers to download them.</p>
            </div>
          </section>

          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#861F3A]/10 text-[#861F3A] flex items-center justify-center font-bold">
                05
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                How long we keep it
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#2C211B]/80 leading-relaxed">
              <p>We keep your order details for as long as we need them to deliver and support your order, and after that only for as long as the law requires us to keep sales records.</p>
            </div>
          </section>

          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#861F3A]/10 text-[#861F3A] flex items-center justify-center font-bold">
                06
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                Your rights
              </h2>
            </div>
            <p className="text-sm text-[#2C211B]/80 leading-relaxed">
              Under India&rsquo;s Digital Personal Data Protection Act, 2023, you can ask us what information we hold about you, ask us to correct it, or ask us to delete it (except records we must keep by law). Just email us and we&rsquo;ll reply as soon as we can.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-[#2C211B] text-[#F5EFE3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono-tech text-[#C8A96B] tracking-wider uppercase block font-bold">
                  PRIVACY SUPPORT
                </span>
                <span className="text-sm font-semibold">hello@yoursora.shop</span>
              </div>
              <a
                href="mailto:hello@yoursora.shop?subject=SORA%20Privacy%20Request"
                className="bg-[#861F3A] hover:bg-[#6b182e] text-[#F5EFE3] px-4 py-2 text-xs font-mono-tech font-bold uppercase rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Mail size={13} />
                <span>Email Us</span>
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

