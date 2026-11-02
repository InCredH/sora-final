import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, Product } from '../data/products';
import { ArrowRight, Sparkles, Sun, Moon, Flame, Wind } from 'lucide-react';

interface PerspectiveMood {
  id: string;
  name: string;
  subtext: string;
  feeling: string;
  icon: React.ReactNode;
  heroProduct: Product;
  quote: string;
  image: string;
  accentColor: string;
  tag: string;
}

export const HeroSection: React.FC = () => {
  const { setCurrentView, openProductDetail, formatPrice } = useShop();

  // Subtle Japanese-inspired perspectives on light & individuality (100% in English for global luxury audience)
  const perspectives: PerspectiveMood[] = [
    {
      id: 'daydream',
      name: 'DAYDREAM',
      subtext: 'Azure Horizon',
      feeling: 'Soft sunlight, golden warmth and wandering thoughts',
      icon: <Sun size={13} />,
      heroProduct: PRODUCTS[0], // KAIZŌ
      quote: 'Striated Italian bio-acetate capturing the golden hour glow.',
      image: '/images/kaizo/model-1.jpg',
      accentColor: '#6B7055', // Muted Olive
      tag: 'KAIZŌ // SMOKED OLIVE'
    },
    {
      id: 'unfiltered',
      name: 'UNFILTERED',
      subtext: 'Dawn Radiance',
      feeling: 'Hexagonal gold titanium architecture and sunlit radiance',
      icon: <Flame size={13} />,
      heroProduct: PRODUCTS[1], // HIKARI
      quote: '16 grams of pure Sabae titanium dipped in 18K champagne gold.',
      image: '/images/hikari/model-1.jpg',
      accentColor: '#C8A96B', // Champagne
      tag: 'HIKARI // GOLD TITANIUM'
    },
    {
      id: 'nocturnal',
      name: 'NOCTURNAL',
      subtext: 'Twilight Calm',
      feeling: 'Deep espresso shadows, city lights and quiet poise',
      icon: <Moon size={13} />,
      heroProduct: PRODUCTS[3] || PRODUCTS[0], // SORREL
      quote: 'Midnight polarized Carl Zeiss optics framing the night.',
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1600&q=90',
      accentColor: '#C8A96B', // Champagne
      tag: 'DEEP OBSIDIAN'
    },
    {
      id: 'komorebi',
      name: 'KOMOREBI',
      subtext: 'Dappled Sun',
      feeling: 'Sunlight filtering through trees, celebrating organic warmth',
      icon: <Wind size={13} />,
      heroProduct: PRODUCTS[2], // TERRA
      quote: 'Mottled warm bio-cellulose honoring the beauty of natural daylight.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=90',
      accentColor: '#2C211B', // Espresso
      tag: 'ORGANIC BIO-ACETATE'
    }
  ];

  const [activeMoodIndex, setActiveMoodIndex] = useState(0);
  const activeMood = perspectives[activeMoodIndex];
  const activeProduct = activeMood.heroProduct;

  const scrollToCollection = () => {
    const el = document.getElementById('featured-collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentView('shop');
    }
  };

  const marqueeItems = [
    'SORA MAISON // 空',
    'HANDCRAFTED IN SABAE, JAPAN',
    'CARL ZEISS POLARIZED OPTICS',
    'GRADE 4 JAPANESE TITANIUM',
    'MAZZUCCHELLI BIO-ACETATE',
    '30-DAY IN-STUDIO TRIAL',
    'COMPLIMENTARY INSURED DISPATCH'
  ];

  return (
    <section className="relative w-full h-[calc(100vh-105px)] lg:h-[calc(100vh-112px)] min-h-[560px] max-h-[820px] flex flex-col justify-between bg-[#F5EFE3] text-[#2C211B] overflow-hidden px-4 sm:px-8 lg:px-12 pt-2 sm:pt-3 pb-0 select-none">
      
      {/* 1. Subtle Japanese Aesthetics: Animated Zen Circle & Pulsing Warm Mist */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Golden Mist Glow with gentle pulse animation */}
        <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-[#C8A96B]/15 blur-[140px] rounded-full animate-glow-pulse" />
        <div className="absolute bottom-1/4 left-10 w-[550px] h-[550px] bg-[#861F3A]/08 blur-[150px] rounded-full animate-float-slow" />
        
        {/* Rotating Zen Ensō Circle Accent */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[34vw] h-[34vw] max-w-[480px] max-h-[480px] rounded-full border border-dashed border-[#C8A96B]/30 pointer-events-none opacity-40 animate-enso" />

        {/* Faint SORA Kanji Calligraphy Watermark (Airy, Japanese Minimalist Background) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 font-japanese text-[28vw] text-[#2C211B]/[0.025] select-none pointer-events-none leading-none animate-float-slow">
          空
        </div>
      </div>

      {/* 2. Main Split Stage: Bold English Typography & Fashion Editorial Visual */}
      <div className="relative z-10 my-auto py-1 sm:py-2 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center max-w-7xl mx-auto w-full flex-1">
        
        {/* Left Column: Bold Editorial Narrative & Expressive Perspectives */}
        <div className="lg:col-span-7 flex flex-col justify-center animate-fade-up">
          
          {/* Eyebrow Label with Subtle Japanese Touch */}
          <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
            <span className="hanko-stamp text-[9px] px-1.5 py-0 border-[#861F3A]">空</span>
            <span className="text-[10px] sm:text-[11px] font-mono-tech tracking-[0.25em] text-[#6B7055] uppercase font-bold">
              SORA // THE ART OF PERSPECTIVE
            </span>
            <span className="w-8 h-px bg-[#C8A96B]" />
            <span className="text-[10px] font-mono-tech tracking-widest text-[#861F3A] uppercase font-bold">
              SS-26
            </span>
          </div>

          {/* Master Headline: Bold Modern Sans + Italian Editorial Serif */}
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-[#2C211B] tracking-tight leading-[0.98]">
            SHAPED BY LIGHT. <br />
            <span className="font-serif-editorial italic font-normal text-[#861F3A] capitalize transition-colors duration-500">
              Defined by who you are.
            </span>
          </h1>

          {/* Warm, Welcoming Gen-Z Brand Philosophy */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#2C211B]/80 font-normal leading-relaxed max-w-xl">
            In Japanese, <strong className="text-[#2C211B] font-bold">SORA (空)</strong> translates to the open sky — boundless, ever-changing, and completely free. We craft eyewear in Sabae, Japan as a medium of self-expression. Sunglasses are only the beginning of your frame; your individuality is the art.
          </p>

          {/* Interactive Perspective / Mood Selector with Smooth Transitions */}
          <div className="mt-4 pt-3.5 border-t border-[#2C211B]/10 max-w-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono-tech tracking-[0.2em] text-[#6B7055] uppercase font-bold flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#C8A96B]" />
                <span>CHOOSE YOUR PERSPECTIVE TODAY</span>
              </span>
              <span className="text-[11px] font-mono-tech text-[#861F3A] font-bold transition-all duration-300">
                {activeMood.tag}
              </span>
            </div>

            {/* Perspective Pill Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {perspectives.map((m, idx) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveMoodIndex(idx)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono-tech tracking-wider uppercase transition-all duration-300 cursor-pointer shrink-0 border ${
                    activeMoodIndex === idx
                      ? 'bg-[#2C211B] text-[#F5EFE3] border-[#2C211B] shadow-lg scale-105 font-bold'
                      : 'bg-white/80 text-[#2C211B] border-[#2C211B]/15 hover:bg-white hover:border-[#861F3A] hover:scale-102'
                  }`}
                >
                  <span className={`transition-transform duration-300 ${activeMoodIndex === idx ? 'scale-110 text-[#C8A96B]' : 'text-[#6B7055]'}`}>
                    {m.icon}
                  </span>
                  <span>{m.name}</span>
                </button>
              ))}
            </div>

            <p className="text-xs font-serif-editorial italic text-[#6B7055] mt-2 transition-all duration-500">
              "{activeMood.feeling}"
            </p>
          </div>

          {/* Action Button: Smooth Spring Micro-Interaction */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={scrollToCollection}
              className="group px-7 sm:px-9 py-3 sm:py-3.5 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] text-xs sm:text-sm font-mono-tech font-bold uppercase tracking-widest flex items-center gap-2.5 transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer rounded"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Warm Fashion Editorial Spread with Smooth Dynamic Cross-Fade */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          
          {/* Subtle Vertical Editorial Line */}
          <div className="hidden sm:flex flex-col items-center gap-4 mr-3 vertical-rl font-mono-tech text-[10px] text-[#6B7055] tracking-[0.25em] uppercase select-none opacity-80">
            <span className="font-semibold text-[#2C211B]">SORA ARCHIVE // SS-26</span>
            <span className="w-px h-10 bg-[#C8A96B]" />
            <span className="text-[#861F3A]">SABAE CRAFT</span>
          </div>

          {/* Main Visual Image Card with Smooth Hover Lift & Dynamic Cross-fade */}
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[370px] xl:max-w-[390px] aspect-[4/5] rounded-xl overflow-hidden bg-[#2C211B] border-2 border-[#C8A96B]/40 shadow-xl hover-lift group">
            
            {/* High-Fashion Editorial Model Photograph with Smooth Image Morph */}
            <img
              key={activeMood.id}
              src={activeMood.image}
              alt={`${activeProduct.name} SORA Runway Editorial`}
              className="w-full h-full object-cover object-center filter contrast-[1.04] transition-all duration-1000 ease-out group-hover:scale-105 animate-in fade-in zoom-in-95 duration-500"
            />

            {/* Warm Sunset/Champagne Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C211B]/90 via-transparent to-black/20 pointer-events-none" />

            {/* Top Minimal Hanko Stamp */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="hanko-stamp text-[10px] px-2 py-0.5 bg-[#F5EFE3]/95 backdrop-blur-md shadow-sm">
                空 SORA 2026
              </span>
              <span className="text-[9px] font-mono-tech text-[#C8A96B] bg-[#2C211B]/80 px-2 py-0.5 rounded border border-[#C8A96B]/30 uppercase font-semibold backdrop-blur-sm">
                Sabae Handcrafted
              </span>
            </div>

            {/* Bottom Floating Frame Card: Warm Washi Glass Plaque with Smooth Transitions */}
            <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 z-20 p-2.5 sm:p-3 rounded-lg bg-[#F5EFE3]/95 backdrop-blur-xl border border-[#C8A96B]/50 shadow-xl text-[#2C211B] transition-transform duration-300 group-hover:-translate-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  {/* Miniature Silhouette Preview */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded bg-white border border-[#2C211B]/10 p-1 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                    <img
                      src={activeProduct.variants[0]?.image || activeProduct.images[0]}
                      alt={`SORA ${activeProduct.name} miniature frame preview`}
                      className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <span className="text-[8px] sm:text-[9px] font-mono-tech tracking-widest text-[#6B7055] uppercase block font-bold">
                      FEATURED FRAME
                    </span>
                    <h4 className="font-display text-sm sm:text-base font-bold text-[#2C211B] tracking-wide uppercase">
                      {activeProduct.name}
                    </h4>
                    <span className="text-[11px] sm:text-xs font-mono-tech text-[#861F3A] font-bold">
                      {formatPrice(activeProduct.price)} • {activeProduct.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => openProductDetail(activeProduct)}
                    className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded bg-[#2C211B] text-[#F5EFE3] hover:bg-[#861F3A] text-[11px] sm:text-xs font-mono-tech font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-md cursor-pointer"
                  >
                    INSPECT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Buttery-Smooth Infinite Luxury Marquee Ribbon — Fixed and 100% visible inside viewport */}
      <div className="relative z-10 w-full overflow-hidden border-t border-[#2C211B]/10 py-2.5 sm:py-3 bg-[#FAF7F0] -mx-4 sm:-mx-8 lg:-mx-12 px-0 shrink-0 mt-auto">
        <div className="animate-marquee items-center gap-8 text-[11px] font-mono-tech tracking-[0.2em] uppercase text-[#6B7055] whitespace-nowrap">
          {marqueeItems.concat(marqueeItems).map((text, idx) => (
            <span key={idx} className="flex items-center gap-8">
              <span className="hover:text-[#861F3A] transition-colors">{text}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
