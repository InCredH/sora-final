import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { X, Check, Sparkles, Upload, ArrowRight, ShieldCheck, Camera } from 'lucide-react';

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface SubmitLookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted?: (data: any) => void;
}

export const SubmitLookModal: React.FC<SubmitLookModalProps> = ({ isOpen, onClose, onSubmitted }) => {
  const [handle, setHandle] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].id);
  const [quote, setQuote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onSubmitted?.({ handle, name, city, selectedProduct, quote, selectedPreviewImage });
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const sampleImages = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2C211B]/60 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog — Warm SORA Atelier Luxury Palette */}
      <div className="relative w-full max-w-2xl bg-[#F5EFE3] text-[#2C211B] border border-[#2C211B]/15 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-6 right-6 text-[#6B7055] hover:text-[#861F3A] transition-colors cursor-pointer p-1 rounded-full hover:bg-black/5"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="pb-6 border-b border-[#2C211B]/10">
          <div className="flex items-center gap-2 text-[10px] font-mono-tech tracking-widest text-[#6B7055] uppercase mb-2 font-bold">
            <span className="hanko-stamp text-[9px] px-1 py-0 border-[#861F3A] text-[#861F3A]">空</span>
            <span>THE PATRON RUNWAY // COMMUNITY INITIATIVE</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#2C211B] tracking-tight">
            BECOME THE FACE OF SORA
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#2C211B]/75 font-normal leading-relaxed">
            We don't believe in studio mannequins. Real patrons wearing SORA in their daily lives define our aesthetic. Tag us on Instagram or submit your look below to be featured on our global flagship.
          </p>
        </div>

        {!isSubmitted ? (
          <div>
            {/* 3 Step Protocol Banner */}
            <div className="py-5 border-b border-[#2C211B]/10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs font-mono-tech">
              <div className="p-3 bg-[#FAF7F0] border border-[#2C211B]/10 rounded-xl shadow-xs">
                <span className="text-[#6B7055] block text-[10px] font-bold">01 / WEAR & CAPTURE</span>
                <span className="text-[#2C211B] mt-0.5 block leading-snug">Photograph in natural light wearing your SORA frames.</span>
              </div>
              <div className="p-3 bg-[#FAF7F0] border border-[#2C211B]/10 rounded-xl shadow-xs">
                <span className="text-[#6B7055] block text-[10px] font-bold">02 / TAG ON INSTAGRAM</span>
                <span className="text-[#2C211B] mt-0.5 block leading-snug">Tag @yoursora.shop & #SeenInSORA on your story or post.</span>
              </div>
              <div className="p-3 bg-[#FAF7F0] border border-[#2C211B]/10 rounded-xl shadow-xs">
                <span className="text-[#861F3A] block text-[10px] font-bold">03 / GET FEATURED</span>
                <span className="text-[#2C211B] mt-0.5 block leading-snug">Selected looks replace model shoots + ₹1,000 credit.</span>
              </div>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleSubmit} className="pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono-tech text-[#6B7055] uppercase font-bold mb-1">
                    Instagram Handle (Required)
                  </label>
                  <div className="flex items-center border border-[#2C211B]/20 bg-white rounded-lg focus-within:border-[#861F3A] focus-within:ring-1 focus-within:ring-[#861F3A] shadow-xs">
                    <span className="pl-3 text-[#6B7055] text-xs font-mono-tech">@</span>
                    <input
                      type="text"
                      required
                      value={handle}
                      onChange={(e) => setHandle(e.target.value.replace('@', ''))}
                      placeholder="username"
                      className="w-full bg-transparent p-2.5 text-xs font-mono-tech text-[#2C211B] placeholder-[#6B7055]/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono-tech text-[#6B7055] uppercase font-bold mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kabir Varma"
                    className="w-full bg-white border border-[#2C211B]/20 rounded-lg p-2.5 text-xs font-mono-tech text-[#2C211B] placeholder-[#6B7055]/50 focus:border-[#861F3A] focus:ring-1 focus:ring-[#861F3A] focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono-tech text-[#6B7055] uppercase font-bold mb-1">
                    City & Country
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, India"
                    className="w-full bg-white border border-[#2C211B]/20 rounded-lg p-2.5 text-xs font-mono-tech text-[#2C211B] placeholder-[#6B7055]/50 focus:border-[#861F3A] focus:ring-1 focus:ring-[#861F3A] focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono-tech text-[#6B7055] uppercase font-bold mb-1">
                    SORA Frame Owned
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full bg-white border border-[#2C211B]/20 rounded-lg p-2.5 text-xs font-mono-tech text-[#2C211B] focus:border-[#861F3A] focus:ring-1 focus:ring-[#861F3A] focus:outline-none shadow-xs cursor-pointer"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sample Photo Selector / Upload */}
              <div>
                <label className="block text-[10px] font-mono-tech text-[#6B7055] uppercase font-bold mb-1.5">
                  Select Look Portrait (or pick demo portrait)
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {sampleImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedPreviewImage(img)}
                      className={`relative aspect-square overflow-hidden rounded-xl border transition-all cursor-pointer ${
                        selectedPreviewImage === img
                          ? 'border-[#861F3A] ring-2 ring-[#861F3A] scale-102 shadow-md'
                          : 'border-[#2C211B]/15 opacity-70 hover:opacity-100 hover:border-[#861F3A]'
                      }`}
                    >
                      <img src={img} alt="Sample look" className="w-full h-full object-cover" />
                      {selectedPreviewImage === img && (
                        <div className="absolute inset-0 bg-[#861F3A]/25 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-[#861F3A] text-white flex items-center justify-center shadow-md">
                            <Check size={14} />
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono-tech text-[#6B7055] uppercase font-bold mb-1">
                  A Short Quote / Experience with SORA (Optional)
                </label>
                <textarea
                  rows={2}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="e.g. The weightlessness and clarity are unlike anything else..."
                  className="w-full bg-white border border-[#2C211B]/20 rounded-lg p-2.5 text-xs font-mono-tech text-[#2C211B] placeholder-[#6B7055]/50 focus:border-[#861F3A] focus:ring-1 focus:ring-[#861F3A] focus:outline-none resize-none shadow-xs"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#2C211B]/10">
                <div className="flex items-center gap-2 text-[11px] font-mono-tech text-[#6B7055]">
                  <InstagramIcon size={14} className="text-[#861F3A]" />
                  <span>Tag <strong className="text-[#2C211B]">@yoursora.shop</strong> • <strong className="text-[#861F3A]">#SeenInSORA</strong></span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] px-6 py-3 text-xs font-mono-tech uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all rounded-lg shadow-md cursor-pointer"
                >
                  <span>SUBMIT LOOK FOR VERIFICATION</span>
                  <ArrowRight size={14} className="text-[#C8A96B]" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="py-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#861F3A]/10 border border-[#861F3A]/30 text-[#861F3A] mx-auto flex items-center justify-center">
              <Check size={32} />
            </div>

            <div>
              <span className="text-[10px] font-mono-tech tracking-widest text-[#861F3A] uppercase font-bold block mb-1">
                SUBMISSION RECEIVED // VERIFICATION QUEUE
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#2C211B]">
                THANK YOU, {name.toUpperCase() || 'PATRON'}
              </h3>
              <p className="text-xs text-[#6B7055] mt-2 font-normal max-w-md mx-auto leading-relaxed">
                Your photograph wearing SORA has entered our atelier editorial curation. Once verified against <strong className="text-[#2C211B]">@{handle || 'yourhandle'}</strong>, your look will be published in the flagship community runway.
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F0] border border-[#2C211B]/10 rounded-xl max-w-sm mx-auto text-left space-y-2 text-xs font-mono-tech shadow-xs">
              <div className="flex justify-between">
                <span className="text-[#6B7055]">Instagram Handle:</span>
                <span className="text-[#2C211B] font-bold">@{handle || 'patron'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7055]">Editorial Perk:</span>
                <span className="text-[#861F3A] font-bold">₹1,000 Atelier Credit upon Feature</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7055]">Curator Review:</span>
                <span className="text-[#2C211B]">Within 24-48 Hours</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] px-8 py-3 text-xs font-mono-tech font-bold uppercase tracking-wider transition-all rounded-lg shadow-md cursor-pointer"
            >
              RETURN TO ATELIER
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
