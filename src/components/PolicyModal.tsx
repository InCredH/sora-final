import React from 'react';
import { X, ShieldCheck, Truck, RefreshCcw, Lock, Leaf, Compass } from 'lucide-react';

interface PolicyModalProps {
  policyKey: string | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyKey, onClose }) => {
  if (!policyKey) return null;

  const policies: Record<string, { title: string; subtitle: string; icon: any; content: React.ReactNode }> = {
    shipping: {
      title: 'COMPLIMENTARY INSURED COURIER',
      subtitle: 'White-glove global dispatch protocols',
      icon: Truck,
      content: (
        <div className="space-y-4 text-xs font-mono-tech text-[#F5EFE3]/80 leading-relaxed font-light">
          <p>
            All SORA eyewear orders exceeding ₹3,000 qualify for complimentary insured courier dispatch. Every package is dispatched in our tamper-proof, custom-milled rigid presentation cassette.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#C8A96B]/90">
            <li><strong>Domestic Dispatch (India):</strong> 2 to 4 business days via Blue Dart Apex Air with real-time OTP signature hand-off.</li>
            <li><strong>Global International:</strong> 4 to 6 business days via DHL Express worldwide with complete customs pre-clearance.</li>
            <li><strong>Transit Insurance:</strong> 100% replacement guarantee if damaged or lost during transit prior to physical handoff.</li>
          </ul>
        </div>
      )
    },
    trial: {
      title: '30-DAY IN-STUDIO TRIAL',
      subtitle: 'Experience your frames in authentic daylight',
      icon: RefreshCcw,
      content: (
        <div className="space-y-4 text-xs font-mono-tech text-[#F5EFE3]/80 leading-relaxed font-light">
          <p>
            True eyewear harmony requires living with a frame. Examine how our Japanese titanium and Italian bio-cellulose rest against your temples throughout regular daily routines.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#C8A96B]/90">
            <li>30 calendar days from the date of recorded carrier delivery.</li>
            <li>Frames must be returned in their original undamaged presentation cassette with all microfibre pouches included.</li>
            <li>Pre-printed insured return waybills are included in every delivery box. No fees deducted for size or style exchanges.</li>
          </ul>
        </div>
      )
    },
    warranty: {
      title: '2-YEAR ATELIER WARRANTY',
      subtitle: 'Comprehensive structural and optical coverage',
      icon: ShieldCheck,
      content: (
        <div className="space-y-4 text-xs font-mono-tech text-[#F5EFE3]/80 leading-relaxed font-light">
          <p>
            Every SORA frame is protected by our two-year international artisan warranty against material defects, hinge fatigue, and optical delamination.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#C8A96B]/90">
            <li>Covers OBE German 5-barrel hinge tension and solder joints.</li>
            <li>Covers precision optical coating integrity against bubbling or spontaneous peeling under regular care.</li>
            <li>Complimentary annual ultrasonic frame cleaning and screw-tightening concierge service at our flagship locations.</li>
          </ul>
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
    },
    craft: {
      title: 'SABAE METALLURGY',
      subtitle: 'Centuries of Fukui Prefecture optical mastery',
      icon: Compass,
      content: (
        <div className="space-y-4 text-xs font-mono-tech text-[#F5EFE3]/80 leading-relaxed font-light">
          <p>
            Sabae, in Fukui Prefecture, produces over 95% of Japan's premium eyewear. The artisans who forge SORA frames possess multi-generational expertise in cold-forging Grade 4 pure titanium.
          </p>
          <p>
            By utilizing electric-discharge wire cutting and hand-buffing with vegetable wax buffing wheels, each titanium bevel reflects ambient light with razor precision while eliminating 40% of standard frame weight.
          </p>
        </div>
      )
    },
    sustainability: {
      title: 'ORGANIC BIO-CELLULOSE',
      subtitle: 'Mazzucchelli 1849 circular materials',
      icon: Leaf,
      content: (
        <div className="space-y-4 text-xs font-mono-tech text-[#F5EFE3]/80 leading-relaxed font-light">
          <p>
            Our bio-acetate frames originate in Castiglione Olona, Italy. Formulated from FSC-certified cotton seed fibres and conifer wood pulp, plasticized using biodegradable plant esters instead of crude petroleum phthalates.
          </p>
          <p>
            The material is 100% biodegradable in industrial composting conditions, hypoallergenic, and provides an organic warmth against the skin that petroleum synthetics cannot emulate.
          </p>
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
