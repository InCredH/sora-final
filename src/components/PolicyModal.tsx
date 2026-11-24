import React from 'react';
import { X, Truck, Lock, RefreshCcw, XCircle } from 'lucide-react';
import { ENQUIRY_WHATSAPP_NUMBER } from '../utils/whatsappEnquiry';

interface PolicyModalProps {
  policyKey: string | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyKey, onClose }) => {
  if (!policyKey) return null;

  const policies: Record<string, { title: string; subtitle: string; icon: any; content: React.ReactNode }> = {
    shipping: {
      title: 'FREE SHIPPING',
      subtitle: 'No extra charges at checkout',
      icon: Truck,
      content: (
        <div className="space-y-4 text-xs font-mono-tech text-[#F5EFE3]/80 leading-relaxed font-light">
          <p>
            Shipping is included in every SORA price. There are no extra delivery charges on any order.
          </p>
          <p>
            Once your order is confirmed on WhatsApp, we'll share the expected delivery time and tracking details with you.
          </p>
        </div>
      )
    },
    returns: {
      title: 'RETURNS & EXCHANGES',
      subtitle: 'No exchanges or returns, unless damaged',
      icon: RefreshCcw,
      content: (
        <div className="space-y-4 text-xs font-mono-tech text-[#F5EFE3]/80 leading-relaxed font-light">
          <p>
            All purchases are final. We do not offer exchanges or returns for reasons such as a change of mind, incorrect fit, or styling preference. Please review your selection carefully before ordering.
          </p>
          <p>
            The only exception is a frame that arrives damaged or defective. In that case:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#C8A96B]/90">
            <li>Film an unedited, continuous unboxing video from the moment the sealed package is opened. This is required to assess the damage, and claims without one cannot be processed.</li>
            <li>Share the video with us at <span className="text-white font-medium">hello@yoursora.shop</span> within 48 hours of delivery.</li>
            <li>Once the damage is verified, we'll replace the item with the same frame and variant.</li>
            <li>If that exact item is out of stock at the time of replacement, we'll issue a full refund instead.</li>
          </ul>
        </div>
      )
    },
    cancellation: {
      title: 'CANCELLATIONS',
      subtitle: 'Cancel anytime before dispatch',
      icon: XCircle,
      content: (
        <div className="space-y-4 text-xs font-mono-tech text-[#F5EFE3]/80 leading-relaxed font-light">
          <p>
            You can cancel anytime before your order is dispatched. Just{' '}
            <a href={`https://wa.me/${ENQUIRY_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-white font-medium underline">message us on WhatsApp</a>{' '}
            and we&rsquo;ll refund you in full to your original payment method within 5 to 7 working days.
          </p>
          <p>Once your order has shipped, it can&rsquo;t be cancelled.</p>
          <p>
            Orders using a bundle offer (Any 2 for ₹2,499) can be cancelled before dispatch, but only as a whole order, not individual frames. If you&rsquo;d like to keep some frames, we&rsquo;ll recalculate the price for what you keep (full price, or the bundle price that still applies) and refund the difference.
          </p>
        </div>
      )
    },
    privacy: {
      title: 'YOUR PRIVACY',
      subtitle: 'What we collect and why',
      icon: Lock,
      content: (
        <div className="space-y-4 text-xs font-mono-tech text-[#F5EFE3]/80 leading-relaxed font-light">
          <p>
            We only collect what we need to deliver your order: your name, address, city, pincode and WhatsApp number. We never sell, rent or trade it.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#C8A96B]/90">
            <li>Payments go through a secure Razorpay link. We never see your card or bank details.</li>
            <li>We share your delivery details only with our delivery partner.</li>
            <li>No advertising cookies, tracking or analytics.</li>
            <li>To see, correct or delete your information, email <span className="text-white font-medium">hello@yoursora.shop</span>.</li>
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
