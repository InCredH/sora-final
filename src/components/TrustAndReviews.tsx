import React from 'react';
import { REVIEWS } from '../data/products';
import { Star, CheckCircle, ShieldCheck, Truck, RefreshCcw, Lock } from 'lucide-react';

interface TrustAndReviewsProps {
  onOpenPolicy?: (policyKey: string) => void;
}

export const TrustAndReviews: React.FC<TrustAndReviewsProps> = ({ onOpenPolicy }) => {
  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF7F0] text-[#2C211B] border-b border-[#2C211B]/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-[#2C211B]/10">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono-tech tracking-widest text-[#6B7055] uppercase mb-2">
              <span className="hanko-stamp text-[9px] px-1 py-0 border-[#861F3A] text-[#861F3A]">空</span>
              <span className="font-bold">PATRON PERSPECTIVES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#2C211B] uppercase">
              AUTHENTIC APPRAISALS
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#6B7055]">
            <span className="text-[#861F3A] font-bold">4.92 / 5.0</span>
            <span>OVERALL MAISON SATISFACTION</span>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#2C211B]/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 text-[#C8A96B] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>

                <h3 className="font-display text-base font-bold text-[#2C211B] uppercase mb-2">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-[#6B7055] font-normal leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#2C211B]/10 flex items-center justify-between text-[11px] font-mono-tech">
                <div>
                  <div className="text-[#2C211B] font-bold flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    <span className="text-[#6B7055] font-normal">• {rev.city}</span>
                  </div>
                  <div className="text-[10px] text-[#6B7055] mt-0.5">
                    Frame: <strong className="text-[#2C211B]">{rev.product}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#861F3A] text-[10px] uppercase font-bold bg-[#861F3A]/10 px-2 py-0.5 rounded">
                  <CheckCircle size={12} />
                  <span>VERIFIED</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-[#2C211B]/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div
            onClick={() => onOpenPolicy?.('shipping')}
            className="p-5 bg-white border border-[#2C211B]/10 hover:border-[#861F3A] rounded-xl cursor-pointer transition-all shadow-sm hover:shadow-md"
          >
            <Truck size={22} className="text-[#861F3A] mb-2.5" />
            <h4 className="text-xs font-mono-tech uppercase font-bold text-[#2C211B] tracking-wider">
              INSURED COURIER
            </h4>
            <p className="text-[11px] text-[#6B7055] mt-1 font-normal">
              Complimentary on all orders over ₹3,000.
            </p>
          </div>

          <div
            onClick={() => onOpenPolicy?.('trial')}
            className="p-5 bg-white border border-[#2C211B]/10 hover:border-[#861F3A] rounded-xl cursor-pointer transition-all shadow-sm hover:shadow-md"
          >
            <RefreshCcw size={22} className="text-[#861F3A] mb-2.5" />
            <h4 className="text-xs font-mono-tech uppercase font-bold text-[#2C211B] tracking-wider">
              30-DAY TRIAL
            </h4>
            <p className="text-[11px] text-[#6B7055] mt-1 font-normal">
              Experience frames at home with zero risk.
            </p>
          </div>

          <div
            onClick={() => onOpenPolicy?.('warranty')}
            className="p-5 bg-white border border-[#2C211B]/10 hover:border-[#861F3A] rounded-xl cursor-pointer transition-all shadow-sm hover:shadow-md"
          >
            <ShieldCheck size={22} className="text-[#861F3A] mb-2.5" />
            <h4 className="text-xs font-mono-tech uppercase font-bold text-[#2C211B] tracking-wider">
              2-YEAR WARRANTY
            </h4>
            <p className="text-[11px] text-[#6B7055] mt-1 font-normal">
              Covers manufacturing & structural integrity.
            </p>
          </div>

          <div
            onClick={() => onOpenPolicy?.('privacy')}
            className="p-5 bg-white border border-[#2C211B]/10 hover:border-[#861F3A] rounded-xl cursor-pointer transition-all shadow-sm hover:shadow-md"
          >
            <Lock size={22} className="text-[#861F3A] mb-2.5" />
            <h4 className="text-xs font-mono-tech uppercase font-bold text-[#2C211B] tracking-wider">
              SECURE ENCRYPTION
            </h4>
            <p className="text-[11px] text-[#6B7055] mt-1 font-normal">
              256-bit TLS commerce transactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
