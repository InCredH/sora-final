import React, { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, Shield, Lock, EyeOff, Server, FileText, CheckCircle, Mail } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { setCurrentView } = useShop();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Privacy Policy — SORA (空) Atelier Tokyo';
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F5EFE3] text-[#2C211B] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="pb-8 border-b border-[#2C211B]/10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs font-mono-tech tracking-wider text-[#6B7055] hover:text-[#861F3A] uppercase transition-colors cursor-pointer font-bold"
          >
            <ArrowLeft size={16} />
            <span>Return to Collection</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono-tech text-[#6B7055] uppercase font-semibold">
              Legal Document // Version 2.6
            </span>
            <span className="hanko-stamp text-[9px] px-1.5 py-0.5 border-[#861F3A] text-[#861F3A]">空</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="mt-10 pb-10 border-b border-[#2C211B]/10">
          <div className="flex items-center gap-2 text-[11px] font-mono-tech tracking-widest text-[#6B7055] uppercase mb-2">
            <Shield size={14} className="text-[#861F3A]" />
            <span>Patron Confidentiality Protocol</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#2C211B]">
            PRIVACY POLICY
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#6B7055] font-normal leading-relaxed max-w-2xl">
            SORA Atelier is committed to uncompromising digital sovereignty and institutional-grade data confidentiality. We honor your personal perspective and protect your identity with zero-compromise security protocols.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] font-mono-tech text-[#2C211B]/70">
            <span className="bg-[#FAF7F0] px-3 py-1 rounded-md border border-[#2C211B]/10">
              EFFECTIVE DATE: S/S 2026
            </span>
            <span className="bg-[#FAF7F0] px-3 py-1 rounded-md border border-[#2C211B]/10">
              JURISDICTION: JAPAN & INDIA (DPDP ACT 2023 / GDPR)
            </span>
          </div>
        </div>

        {/* Policy Body */}
        <div className="mt-12 space-y-12">
          
          {/* Section 1 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#861F3A]/10 text-[#861F3A] flex items-center justify-center font-bold">
                01
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                Philosophy & Digital Sovereignty
              </h2>
            </div>
            <p className="text-sm text-[#2C211B]/80 leading-relaxed font-normal">
              At SORA, we believe luxury extends beyond Japanese titanium metallurgy to encompass digital dignity. We explicitly reject data monetization. We do not sell, rent, license, or exchange patron identities, sizing measurements, optical specifications, or browsing behaviors with third-party ad networks, telemetry brokers, or data syndicates.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#861F3A]/10 text-[#861F3A] flex items-center justify-center font-bold">
                02
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                Information Collected & Purpose
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#2C211B]/80 leading-relaxed">
              <p>We collect only the bare essential information required to fulfill physical couture dispatches and honor our 2-Year Atelier Warranty:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <li className="p-3.5 bg-[#FAF7F0] rounded-xl border border-[#2C211B]/10">
                  <strong className="block text-xs font-mono-tech uppercase text-[#861F3A] mb-1">Dispatch Logistics</strong>
                  Recipient name, physical delivery address, email for tracking dispatches, and contact phone number for secure courier OTP handover.
                </li>
                <li className="p-3.5 bg-[#FAF7F0] rounded-xl border border-[#2C211B]/10">
                  <strong className="block text-xs font-mono-tech uppercase text-[#861F3A] mb-1">Order Records</strong>
                  Selected frame models, customized acetate colorways, Zeiss lens specifications, and transaction timestamps for warranty validation.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Secrets & Payment Security */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#C8A96B]/20 text-[#2C211B] flex items-center justify-center font-bold">
                <Lock size={18} className="text-[#861F3A]" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                Zero Secrets on Frontend & Payment Vaulting
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#2C211B]/80 leading-relaxed">
              <p>
                In alignment with PCI-DSS Level 1 compliance and industry security standards, zero financial secrets, card credentials, private keys, or API tokens are stored or processed on the client application frontend.
              </p>
              <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#2C211B]/10 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-[#861F3A]">
                  <CheckCircle size={15} />
                  <span>256-BIT END-TO-END TLS ENCRYPTION & TOKENIZATION</span>
                </div>
                <p className="text-xs text-[#6B7055]">
                  Payment flows utilize direct, bank-grade encrypted tokens. Your full credit/debit card numbers, CVVs, and banking PINs never touch our web application or client storage.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#861F3A]/10 text-[#861F3A] flex items-center justify-center font-bold">
                04
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                Cookie Governance & Anonymous Telemetry
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#2C211B]/80 leading-relaxed">
              <p>
                SORA uses strictly necessary session storage for maintaining your shopping bag state across browsing sessions. Anonymous performance metrics are aggregated solely to optimize responsive display speeds on mobile devices and reduce battery drain.
              </p>
              <p>
                You may revoke or update your cookie consent at any time via the Cookie Preferences link in our footer.
              </p>
            </div>
          </section>

          {/* Section 5: Patron Rights */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C211B]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#861F3A]/10 text-[#861F3A] flex items-center justify-center font-bold">
                05
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2C211B]">
                Your Rights & Erasure Requests
              </h2>
            </div>
            <p className="text-sm text-[#2C211B]/80 leading-relaxed">
              Under international privacy frameworks, you retain full rights to inspect, rectify, export, or permanently erase your personal records from our databases.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-[#2C211B] text-[#F5EFE3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono-tech text-[#C8A96B] tracking-wider uppercase block font-bold">
                  DEDICATED PRIVACY CONCIERGE
                </span>
                <span className="text-sm font-semibold">concierge@yoursora.shop</span>
              </div>
              <a
                href="mailto:concierge@yoursora.shop?subject=SORA%20Data%20Privacy%20Request"
                className="bg-[#861F3A] hover:bg-[#6b182e] text-[#F5EFE3] px-4 py-2 text-xs font-mono-tech font-bold uppercase rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Mail size={13} />
                <span>Submit Erasure Request</span>
              </a>
            </div>
          </section>

        </div>

        {/* Back to top footer */}
        <div className="mt-16 pt-8 border-t border-[#2C211B]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-[#6B7055]">
          <span>SORA (空) ATELIER TOKYO // S/S 2026 ARCHIVE</span>
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

