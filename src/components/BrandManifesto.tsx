import React from 'react';
import { BRAND_VALUES } from '../data/products';
import { ShieldCheck, Compass, Sparkles, RefreshCw } from 'lucide-react';

export const BrandManifesto: React.FC = () => {
  const icons = [Compass, Sparkles, ShieldCheck, RefreshCw];

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#09090c] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Tag & Title */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-[11px] font-mono-tech tracking-widest text-zinc-400 uppercase mb-4">
            <span className="w-6 h-px bg-white/40" />
            <span>SORA MANIFESTO // 04 PILLARS OF CRAFT</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.08]">
            ENGINEERED WITHOUT COMPROMISE. <br />
            <span className="text-chrome">HONORED BY TOUCH.</span>
          </h2>
          <p className="mt-6 text-base text-zinc-300 font-light leading-relaxed">
            Our atelier works at the confluence of Japanese precision metallurgy and Italian organic cellulose craftsmanship. No synthetic filler resins, no generic catalog hinges.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BRAND_VALUES.map((val, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={val.number}
                className="bg-[#111116] border border-white/10 p-8 flex flex-col justify-between group hover:border-white/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <span className="font-mono-tech text-xs text-zinc-400 tracking-widest">
                      {val.number}
                    </span>
                    <Icon size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="font-display text-base font-bold text-white tracking-wide uppercase mt-6">
                    {val.title}
                  </h3>

                  <p className="text-xs text-zinc-400 font-light leading-relaxed mt-3">
                    {val.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 text-[10px] font-mono-tech text-zinc-400 uppercase tracking-widest">
                  VERIFIED PROTOCOL
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
