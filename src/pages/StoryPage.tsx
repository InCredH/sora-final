import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Compass, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { BrandStatement } from '../components/BrandStatement';

export const StoryPage: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <div className="w-full min-h-screen bg-[#F5EFE3] text-[#2C211B] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Top Tag & Title */}
        <div className="pb-12 border-b border-[#2C211B]/10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 border border-[#2C211B]/15 text-[10px] font-mono-tech tracking-widest text-[#6B7055] uppercase mb-4 rounded">
            <Compass size={12} className="text-[#861F3A]" />
            <span>MAISON HERITAGE & METALLURGY</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-[#2C211B] tracking-tight leading-[1.05]">
            THE PURITY OF THE THRESHOLD.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#6B7055] font-normal max-w-2xl leading-relaxed">
            SORA was conceived in opposition to transient seasonal spectacle. We create monolithic eyewear designed to endure for decades through Japanese titanium metallurgy and Italian organic cellulose.
          </p>
        </div>

        {/* Integrated Brand Manifesto Statement Section */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-xl border border-[#2C211B]/10">
          <BrandStatement />
        </div>

        {/* Chapter 01: Sabae Metallurgy */}
        <div className="py-16 sm:py-20 border-b border-[#2C211B]/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-[11px] font-mono-tech text-[#861F3A] uppercase tracking-widest block font-bold">
              CHAPTER 01 // SABAE, FUKUI PREFECTURE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#2C211B]">
              TITANIUM MACHINED TO THE MICRON
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7055] font-normal leading-relaxed">
              Nestled between snow-capped mountains and the Sea of Japan, the artisans of Sabae have refined cold-forged metallurgy across two centuries. Sabae represents the summit of titanium manipulation.
            </p>
            <p className="text-xs sm:text-sm text-[#6B7055] font-normal leading-relaxed">
              Our titanium frames undergo more than 180 individual operations: high-pressure electric spark erosion, CNC precision milling, and continuous manual polishing against Japanese wax wheels until every chamfer reflects light with pristine clarity.
            </p>
          </div>

          <div className="md:col-span-6 relative aspect-[4/3] bg-white border border-[#2C211B]/15 rounded-xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=85"
              alt="Cold-forged Grade 4 Japanese titanium wireframe in Sabae workshop"
              className="w-full h-full object-cover filter contrast-[1.05]"
            />
            <div className="absolute bottom-3 left-3 bg-[#2C211B]/80 text-[#F5EFE3] px-2.5 py-1 text-[9px] font-mono-tech uppercase rounded backdrop-blur-md">
              GRADE 4 BETA-TITANIUM // 17G NET WEIGHT
            </div>
          </div>
        </div>

        {/* Chapter 02: Italian Bio-Cellulose */}
        <div className="py-16 sm:py-20 border-b border-[#2C211B]/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 order-2 md:order-1 relative aspect-[4/3] bg-white border border-[#2C211B]/15 rounded-xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85"
              alt="Hand-cured Italian Mazzucchelli bio-acetate frame polished with bamboo chips"
              className="w-full h-full object-cover filter contrast-[1.05]"
            />
            <div className="absolute bottom-3 left-3 bg-[#2C211B]/80 text-[#F5EFE3] px-2.5 py-1 text-[9px] font-mono-tech uppercase rounded backdrop-blur-md">
              MAZZUCCHELLI M49 BIO-CELLULOSE
            </div>
          </div>

          <div className="md:col-span-6 order-1 md:order-2 space-y-4">
            <span className="text-[11px] font-mono-tech text-[#861F3A] uppercase tracking-widest block font-bold">
              CHAPTER 02 // CASTIGLIONE OLONA, ITALY
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#2C211B]">
              BIO-ACETATE FROM LIVING FOREST FIBRES
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7055] font-normal leading-relaxed">
              Standard commercial sunglasses use crude petroleum plasticizers that discolor and embrittle over time. SORA sources exclusively from Mazzucchelli 1849, utilizing cotton linters and wood pulp polymerized with vegetable esters.
            </p>
            <p className="text-xs sm:text-sm text-[#6B7055] font-normal leading-relaxed">
              The outcome is a frame of remarkable tactile warmth and optical depth: translucent tones like deep Mediterranean olive, smoked espresso, and desert amber that respond dynamically to changes in sunlight.
            </p>
          </div>
        </div>

        {/* Chapter 03: Precision Optics */}
        <div className="py-16 sm:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-[11px] font-mono-tech text-[#861F3A] uppercase tracking-widest block font-bold">
              CHAPTER 03 // OPTICAL PRECISION
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#2C211B]">
              HIGH-DEFINITION POLARIZED PHOTOPROTECTION
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7055] font-normal leading-relaxed">
              An architectural frame is futile if the lenses induce visual strain. SORA integrates high-definition polyamide and CR-39 polarized lenses with 100% UV400 blocking.
            </p>
            <p className="text-xs sm:text-sm text-[#6B7055] font-normal leading-relaxed">
              Every lens features hydrophobic and oleophobic anti-smudge coatings, coupled with vacuum-deposited anti-reflective backside layers to eliminate internal ocular bounce-back glare.
            </p>
          </div>

          <div className="md:col-span-6 relative aspect-[4/3] bg-white border border-[#2C211B]/15 rounded-xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85"
              alt="Certified UV400 polarized optical clarity test with anti-reflective coating"
              className="w-full h-full object-cover filter contrast-[1.05]"
            />
            <div className="absolute bottom-3 left-3 bg-[#2C211B]/80 text-[#F5EFE3] px-2.5 py-1 text-[9px] font-mono-tech uppercase rounded backdrop-blur-md">
              ANTI-REFLECTIVE HD COATINGS
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 p-8 sm:p-12 bg-white border border-[#2C211B]/15 rounded-2xl text-center space-y-4 shadow-lg">
          <h3 className="font-display text-2xl sm:text-3xl font-black text-[#2C211B] uppercase">
            EXPERIENCE SORA IN PERSON
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7055] font-normal max-w-md mx-auto">
            Order online with complimentary insured delivery and our 30-day in-studio home trial guarantee.
          </p>
          <button
            type="button"
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] px-8 py-3.5 text-xs font-mono-tech font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-colors rounded shadow-md cursor-pointer"
          >
            <span>DISCOVER THE ARCHIVE</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
