import React from 'react';

export const BrandStatement: React.FC = () => {
  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#2C211B] text-[#F5EFE3] border-b border-[#C8A96B]/20 overflow-hidden">
      {/* Background Japanese Watermark */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 font-japanese text-[22vw] text-white/[0.025] select-none pointer-events-none leading-none">
        空
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Subtle section header */}
        <div className="flex items-center gap-3 text-[11px] font-mono-tech tracking-widest uppercase mb-8 sm:mb-12">
          <span className="hanko-stamp text-xs px-1.5 py-0.5 border-[#C8A96B] text-[#C8A96B] bg-[#C8A96B]/10">空</span>
          <span className="text-[#C8A96B]">THE SORA MANIFESTO // PHILOSOPHY OF PERSPECTIVE</span>
        </div>

        {/* Oversized Rhythmic Typography */}
        <div className="max-w-5xl">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5EFE3] uppercase leading-[1.12]">
            SUNGLASSES ARE JUST OUR FIRST CHAPTER. <br />
            <span className="font-serif-editorial italic font-normal text-[#C8A96B]">
              SORA (空) is the infinite canvas
            </span> <br />
            <span className="text-white">FOR HOW YOU CHOOSE TO FEEL AND BE SEEN.</span>
          </h2>
        </div>

        {/* Sub-narrative split layout with technical note */}
        <div className="mt-12 sm:mt-16 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <span className="text-xs font-mono-tech tracking-widest text-[#C8A96B] uppercase block mb-2 font-bold">
              INDIVIDUALITY AS ART
            </span>
            <p className="font-serif-editorial text-2xl sm:text-3xl text-[#F5EFE3] italic leading-snug">
              "We reject the uniform gaze. Style is not about blending in — it is about honoring the quiet power of your own perspective."
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-[#F5EFE3]/80 leading-relaxed font-light">
            <p>
              In Japanese, <strong className="text-white font-medium">SORA (空)</strong> signifies the open sky — boundless, ever-shifting in color, and completely free. We craft each frame in Sabae, Japan, using aerospace Grade 4 titanium and organic Italian Mazzucchelli bio-acetate.
            </p>
            <p>
              Fitted with custom Carl Zeiss polarized optics, our silhouettes are designed to evoke an emotional response. Eyewear is simply the physical catalyst; the true medium is your identity, confidence, and self-expression.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
