import React from 'react';
import { X, Truck, Lock } from 'lucide-react';

interface PolicyModalProps {
  policyKey: string | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyKey, onClose }) => {
  if (!policyKey) return null;

  const policies: Record<string, { title: string; subtitle: string; icon: any; content: React.ReactNode }> = {
    shipping: {
      title: 'SHIPPING INCLUDED',
      subtitle: 'No extra charges at checkout',
      icon: Truck,
      content: (
        <div className="space-y-4 text-xs font-mono-tech text-[#F5EFE3]/80 leading-relaxed font-light">
          <p>
            Shipping is included in every SORA price — there are no extra delivery charges on any order.
          </p>
          <p>
            Once your order is confirmed on WhatsApp, we'll share the expected delivery time and tracking details with you.
          </p>
        </div>
      )
    },
    privacy: {
      title: 'CONFIDENTIALITY & SECURITY',
      subtitle: 'Institutional-grade data protection',
      icon: Lock,
      content: (
        <div className="space-y-4 text-xs font-mono-tech text-[#F5EFE3]/80 leading-relaxed font-light">
          <p>
            We hold patron privacy to the highest standard. We do not sell, rent, or trade your contact or sizing data with third-party advertising networks.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#C8A96B]/90">
            <li>End-to-end 256-bit TLS encryption across all browsing and checkout channels.</li>
            <li>Tokenized payment gateway integrations ensuring zero payment card numbers are stored on our servers.</li>
            <li>Right to erasure: Request immediate deletion of your digital purchasing history at concierge@yoursora.shop.</li>
          </ul>
        </div>
      )
    }
  };

  const active = policies[policyKey] || policies.shipping;
  const Icon = active.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#2C211B] text-[#F5EFE3] border border-[#C8A96B]/30 p-6 sm:p-8 z-10 shadow-2xl rounded-2xl my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-[#F5EFE3]/60 hover:text-[#F5EFE3] transition-colors cursor-pointer"
          aria-label="Close policy"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-[#C8A96B]/20">
          <div className="w-10 h-10 rounded-xl bg-[#C8A96B]/15 border border-[#C8A96B]/30 flex items-center justify-center text-[#C8A96B]">
            <Icon size={18} />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-[#F5EFE3] uppercase tracking-wide">
              {active.title}
            </h3>
            <span className="text-[10px] font-mono-tech text-[#C8A96B] uppercase tracking-widest block">
              {active.subtitle}
            </span>
          </div>
        </div>

        <div className="py-6 text-[#F5EFE3]/85">
          {active.content}
        </div>

        <div className="pt-4 border-t border-[#C8A96B]/20 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#861F3A] hover:bg-[#6b182e] text-[#F5EFE3] px-6 py-2.5 text-xs font-mono-tech font-semibold uppercase tracking-wider transition-colors rounded-lg cursor-pointer shadow-md"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
