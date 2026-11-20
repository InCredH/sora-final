import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight } from 'lucide-react';
import { BrandStatement } from '../components/BrandStatement';

export const StoryPage: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <div className="w-full min-h-screen bg-[#F5EFE3] text-[#2C211B] py-6 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Top Tag & Title */}
        <div className="pb-6 sm:pb-12 border-b border-[#2C211B]/10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 border border-[#2C211B]/15 text-[10px] font-mono-tech tracking-widest text-[#6B7055] uppercase mb-4 rounded">
            <img src="/logo-transparent.png" alt="SORA" className="h-4 w-auto object-contain" />
            <span>OUR STORY</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-[#2C211B] tracking-tight leading-[1.05]">
            INSPIRED BY THE SKY.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#6B7055] font-normal max-w-2xl leading-relaxed">
            SORA (空) means &ldquo;sky&rdquo; in Japanese. We took that idea of something open, changing and full of light, and turned it into sunglasses for every mood, at prices that make sense.
          </p>
        </div>

        {/* Origin Story: The People Behind SORA */}
        <div className="py-8 sm:py-24 border-b border-[#2C211B]/10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          <div className="md:col-span-7">
            <span className="text-[11px] font-mono-tech text-[#861F3A] uppercase tracking-widest block font-bold mb-4">
              THE BEGINNING
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase text-[#2C211B] mb-6 leading-tight">
              TWO PEOPLE. ONE SHARED IDEA.
            </h2>

            <p className="font-serif-editorial text-lg sm:text-2xl text-[#2C211B] italic leading-relaxed">
              Hi, we&rsquo;re the two people behind SORA. We&rsquo;ve been together for nine years, and somewhere along the way we found ourselves sharing more than life&rsquo;s little moments: a love for fashion, styling, travelling, and the itch to build something of our own.
            </p>

            <div className="mt-8 space-y-5 text-sm sm:text-base text-[#6B7055] leading-relaxed">
              <p>
                The idea came to us on a trip. As we got dressed to go explore, we realised something simple: we didn&rsquo;t have sunglasses that actually went with what we were wearing.
              </p>
              <p>
                Why do we keep reaching for the same one or two pairs in almost every picture? Not because we don&rsquo;t want variety, but because finding the right pair isn&rsquo;t easy.
              </p>
              <p>
                So we started looking around, and noticed the gap. Great designs with so-so quality. Good quality with so-so designs. Or prices too high to own more than one pair. It felt like we had to choose between style, quality and affordability.
              </p>
              <p className="font-semibold text-[#2C211B]">
                We didn&rsquo;t think we should have to.
              </p>
              <p>
                Sunglasses are more than eye protection. They&rsquo;re part of your style, sometimes the one detail that pulls a whole look together. If we&rsquo;re wearing them anyway, why not love how they look too?
              </p>
              <p>
                So we decided to build SORA: good design, real UV protection, and prices that make it easy to own more than just one favourite pair. Because your style changes, your outfits change, and your sunglasses should have room to change with them.
              </p>
              <p>
                This is just the beginning, and we&rsquo;re glad you&rsquo;re here for it.
              </p>
            </div>

            <p className="mt-10 font-display text-xs sm:text-sm uppercase tracking-wide text-[#2C211B] font-bold">
              With love,<br />
              The two behind SORA.
            </p>
          </div>

          <div className="md:col-span-5 md:sticky md:top-24">
            <div className="relative aspect-[4/5] bg-white border border-[#2C211B]/15 rounded-xl overflow-hidden shadow-md">
              <img
                src="/images/story/founders.jpg"
                alt="The two people behind SORA, on the trip that inspired it"
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
              <div className="absolute bottom-3 left-3 bg-[#2C211B]/80 text-[#F5EFE3] px-2.5 py-1 text-[9px] font-mono-tech uppercase rounded backdrop-blur-md">
                THE TWO BEHIND SORA
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Brand Manifesto Statement Section */}
        {/* <div className="my-6 sm:my-12 rounded-2xl overflow-hidden shadow-xl border border-[#2C211B]/10">
          <BrandStatement />
        </div> */}

        {/* Chapter 01: The Names */}
        <div className="py-8 sm:py-20 border-b border-[#2C211B]/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-[11px] font-mono-tech text-[#861F3A] uppercase tracking-widest block font-bold">
              CHAPTER 01 // THE NAMES
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#2C211B]">
              EVERY FRAME IS A PIECE OF THE SKY
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7055] font-normal leading-relaxed">
              Each SORA frame takes its name from a Japanese word for something you&rsquo;d find overhead: <strong className="text-[#2C211B]">Hoshi</strong> (the star), <strong className="text-[#2C211B]">Nagi</strong> (the calm), <strong className="text-[#2C211B]">Aozora</strong> (the blue sky), <strong className="text-[#2C211B]">Arashi</strong> (the storm) and <strong className="text-[#2C211B]">Yuhi</strong> (the sunset).
            </p>
            <p className="text-xs sm:text-sm text-[#6B7055] font-normal leading-relaxed">
              The words are our inspiration. Each one sets the mood for a frame: its shape, its colour and the kind of day it&rsquo;s made for.
            </p>
          </div>

          <div className="md:col-span-6 relative aspect-[4/3] bg-white border border-[#2C211B]/15 rounded-xl overflow-hidden shadow-md">
            <img
              src="/images/hoshi/hoshi-black-model-1.jpeg"
              alt="Model wearing SORA HOSHI sunglasses"
              className="w-full h-full object-cover filter contrast-[1.05]"
            />
            <div className="absolute bottom-3 left-3 bg-[#2C211B]/80 text-[#F5EFE3] px-2.5 py-1 text-[9px] font-mono-tech uppercase rounded backdrop-blur-md">
              HOSHI // 星 // THE STAR
            </div>
          </div>
        </div>

        {/* Chapter 02: The Design */}
        <div className="py-8 sm:py-20 border-b border-[#2C211B]/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
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
        <div className="py-8 sm:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
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
        <div className="mt-6 sm:mt-12 p-6 sm:p-12 bg-white border border-[#2C211B]/15 rounded-2xl text-center space-y-4 shadow-lg">
          <h3 className="font-display text-2xl sm:text-3xl font-black text-[#2C211B] uppercase">
            FIND YOUR PAIR
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7055] font-normal max-w-md mx-auto">
            Order online. Shipping is included on every order.
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
