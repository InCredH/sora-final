import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight } from 'lucide-react';
import { BrandStatement } from '../components/BrandStatement';

export const StoryPage: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <div className="w-full min-h-screen bg-[#F5EFE3] text-[#2C211B] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Top Tag & Title */}
        <div className="pb-12 border-b border-[#2C211B]/10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 border border-[#2C211B]/15 text-[10px] font-mono-tech tracking-widest text-[#6B7055] uppercase mb-4 rounded">
            <img src="/logo-transparent.png" alt="SORA" className="h-4 w-auto object-contain" />
            <span>OUR STORY</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-[#2C211B] tracking-tight leading-[1.05]">
            INSPIRED BY THE SKY.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#6B7055] font-normal max-w-2xl leading-relaxed">
            SORA (空) means &ldquo;sky&rdquo; in Japanese. We took that idea — open, changing, full of light — and turned it into sunglasses for every mood, at prices that make sense.
          </p>
        </div>

        {/* Integrated Brand Manifesto Statement Section */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-xl border border-[#2C211B]/10">
          <BrandStatement />
        </div>

        {/* Chapter 01: The Names */}
        <div className="py-16 sm:py-20 border-b border-[#2C211B]/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-[11px] font-mono-tech text-[#861F3A] uppercase tracking-widest block font-bold">
              CHAPTER 01 // THE NAMES
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#2C211B]">
              EVERY FRAME IS A PIECE OF THE SKY
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7055] font-normal leading-relaxed">
              Each SORA frame takes its name from a Japanese word for something you&rsquo;d find overhead: <strong className="text-[#2C211B]">Hoshi</strong> (the star), <strong className="text-[#2C211B]">Taiyo</strong> (the sun), <strong className="text-[#2C211B]">Aozora</strong> (the blue sky), <strong className="text-[#2C211B]">Arashi</strong> (the storm) and <strong className="text-[#2C211B]">Yuhi</strong> (the sunset).
            </p>
            <p className="text-xs sm:text-sm text-[#6B7055] font-normal leading-relaxed">
              The words are our inspiration. Each one sets the mood for a frame &mdash; its shape, its colour and the kind of day it&rsquo;s made for.
            </p>
          </div>

          <div className="md:col-span-6 relative aspect-[4/3] bg-white border border-[#2C211B]/15 rounded-xl overflow-hidden shadow-md">
            <img
              src="/images/hikari/model-1.jpg"
              alt="Model wearing SORA HOSHI sunglasses"
              className="w-full h-full object-cover filter contrast-[1.05]"
            />
            <div className="absolute bottom-3 left-3 bg-[#2C211B]/80 text-[#F5EFE3] px-2.5 py-1 text-[9px] font-mono-tech uppercase rounded backdrop-blur-md">
              HOSHI // 星 // THE STAR
            </div>
          </div>
        </div>

        {/* Chapter 02: The Design */}
        <div className="py-16 sm:py-20 border-b border-[#2C211B]/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 order-2 md:order-1 relative aspect-[4/3] bg-white border border-[#2C211B]/15 rounded-xl overflow-hidden shadow-md">
            <img
              src="/images/kaizo/model-1.jpg"
              alt="Model wearing SORA ARASHI sunglasses"
              className="w-full h-full object-cover filter contrast-[1.05]"
            />
            <div className="absolute bottom-3 left-3 bg-[#2C211B]/80 text-[#F5EFE3] px-2.5 py-1 text-[9px] font-mono-tech uppercase rounded backdrop-blur-md">
              ARASHI // 嵐 // THE STORM
            </div>
          </div>

          <div className="md:col-span-6 order-1 md:order-2 space-y-4">
            <span className="text-[11px] font-mono-tech text-[#861F3A] uppercase tracking-widest block font-bold">
              CHAPTER 02 // THE DESIGN
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#2C211B]">
              A SHAPE FOR EVERY MOOD
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7055] font-normal leading-relaxed">
              Sharp geometric gold, an oversized honey-amber statement, a silver cat-eye, a deep sage green, a classic tortoiseshell rectangle. The collection is small on purpose, so every frame has its own character.
            </p>
            <p className="text-xs sm:text-sm text-[#6B7055] font-normal leading-relaxed">
              Mix them up: any two frames (except HOSHI) are ₹2,499 together.
            </p>
          </div>
        </div>

        {/* Chapter 03: Protection */}
        <div className="py-16 sm:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-[11px] font-mono-tech text-[#861F3A] uppercase tracking-widest block font-bold">
              CHAPTER 03 // EVERYDAY PROTECTION
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#2C211B]">
              UV400 ON EVERY PAIR
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7055] font-normal leading-relaxed">
              Good-looking sunglasses should still do their job. Every SORA pair has UV400-protected lenses, so you can wear them from morning coffee runs to long afternoon drives.
            </p>
            <p className="text-xs sm:text-sm text-[#6B7055] font-normal leading-relaxed">
              Shipping is included in every price, with no extra charges at checkout.
            </p>
          </div>

          <div className="md:col-span-6 relative aspect-[4/3] bg-white border border-[#2C211B]/15 rounded-xl overflow-hidden shadow-md">
            <img
              src="/images/kaizo/frame-sky.jpg"
              alt="SORA ARASHI sunglasses held up against the sky"
              className="w-full h-full object-cover filter contrast-[1.05]"
            />
            <div className="absolute bottom-3 left-3 bg-[#2C211B]/80 text-[#F5EFE3] px-2.5 py-1 text-[9px] font-mono-tech uppercase rounded backdrop-blur-md">
              UV400 PROTECTED
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 p-8 sm:p-12 bg-white border border-[#2C211B]/15 rounded-2xl text-center space-y-4 shadow-lg">
          <h3 className="font-display text-2xl sm:text-3xl font-black text-[#2C211B] uppercase">
            FIND YOUR PAIR
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7055] font-normal max-w-md mx-auto">
            Order online — shipping is included on every order.
          </p>
          <button
            type="button"
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] px-8 py-3.5 text-xs font-mono-tech font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-colors rounded shadow-md cursor-pointer"
          >
            <span>SHOP THE COLLECTION</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
