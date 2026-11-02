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
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0e0e13] border border-white/20 shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-[10px] font-mono-tech tracking-widest text-amber-400 uppercase mb-2">
            <Sparkles size={12} />
            <span>THE PATRON RUNWAY // COMMUNITY INITIATIVE</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
            BECOME THE FACE OF SORA
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            We don't believe in studio mannequins. Real patrons wearing SORA in their daily lives define our aesthetic. Tag us on Instagram or submit your look below to be featured on our global flagship.
          </p>
        </div>

        {!isSubmitted ? (
          <div>
            {/* 3 Step Protocol Banner */}
            <div className="py-5 border-b border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono-tech">
              <div className="p-3 bg-white/[0.02] border border-white/5">
                <span className="text-zinc-500 block text-[10px]">01 / WEAR & CAPTURE</span>
                <span className="text-zinc-200 mt-0.5 block">Photograph in daylight wearing your SORA frames.</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5">
                <span className="text-zinc-500 block text-[10px]">02 / TAG ON INSTAGRAM</span>
                <span className="text-zinc-200 mt-0.5 block">Tag @yoursora.shop & #SeenInSORA on your story or post.</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5">
                <span className="text-zinc-500 block text-[10px]">03 / GET FEATURED</span>
                <span className="text-zinc-200 mt-0.5 block">Selected looks replace model shoots + ₹1,000 credit.</span>
              </div>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleSubmit} className="pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono-tech text-zinc-400 uppercase mb-1">
                    Instagram Handle (Required)
                  </label>
                  <div className="flex items-center border border-white/20 bg-black/50 focus-within:border-white">
                    <span className="pl-3 text-zinc-500 text-xs font-mono-tech">@</span>
                    <input
                      type="text"
                      required
                      value={handle}
                      onChange={(e) => setHandle(e.target.value.replace('@', ''))}
                      placeholder="username"
                      className="w-full bg-transparent p-2.5 text-xs font-mono-tech text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono-tech text-zinc-400 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kabir Varma"
                    className="w-full bg-black/50 border border-white/20 p-2.5 text-xs font-mono-tech text-white focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono-tech text-zinc-400 uppercase mb-1">
                    City & Country
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, India"
                    className="w-full bg-black/50 border border-white/20 p-2.5 text-xs font-mono-tech text-white focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono-tech text-zinc-400 uppercase mb-1">
                    SORA Frame Owned
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full bg-[#121218] border border-white/20 p-2.5 text-xs font-mono-tech text-white focus:border-white focus:outline-none"
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
                <label className="block text-[10px] font-mono-tech text-zinc-400 uppercase mb-1.5">
                  Select Look Portrait (or pick demo portrait)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {sampleImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedPreviewImage(img)}
                      className={`relative aspect-square overflow-hidden border transition-all ${
                        selectedPreviewImage === img
                          ? 'border-white ring-2 ring-white scale-102'
                          : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Sample look" className="w-full h-full object-cover" />
                      {selectedPreviewImage === img && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Check size={16} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono-tech text-zinc-400 uppercase mb-1">
                  A Short Quote / Experience with SORA (Optional)
                </label>
                <textarea
                  rows={2}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="e.g. The weightlessness and clarity are unlike anything else..."
                  className="w-full bg-black/50 border border-white/20 p-2.5 text-xs font-mono-tech text-white focus:border-white focus:outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-[11px] font-mono-tech text-zinc-400">
                  <InstagramIcon size={14} className="text-pink-400" />
                  <span>Tag <strong>@yoursora.shop</strong> • <strong>#SeenInSORA</strong></span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-black px-6 py-3 text-xs font-mono-tech uppercase font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors shadow-2xl"
                >
                  <span>SUBMIT LOOK FOR VERIFICATION</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="py-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <Check size={32} />
            </div>

            <div>
              <span className="text-[10px] font-mono-tech tracking-widest text-emerald-400 uppercase block mb-1">
                SUBMISSION RECEIVED // VERIFICATION QUEUE
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                THANK YOU, {name.toUpperCase() || 'PATRON'}
              </h3>
              <p className="text-xs text-zinc-400 mt-2 font-light max-w-md mx-auto leading-relaxed">
                Your photograph wearing SORA has entered our atelier editorial curation. Once verified against <strong>@{handle || 'yourhandle'}</strong>, your look will be published in the flagship community runway.
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 max-w-sm mx-auto text-left space-y-2 text-xs font-mono-tech">
              <div className="flex justify-between">
                <span className="text-zinc-500">Instagram Handle:</span>
                <span className="text-white font-bold">@{handle || 'patron'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Editorial Perk:</span>
                <span className="text-amber-400 font-semibold">₹1,000 Atelier Credit upon Feature</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Curator Review:</span>
                <span className="text-zinc-300">Within 24-48 Hours</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="bg-white hover:bg-zinc-200 text-black px-8 py-3 text-xs font-mono-tech font-semibold uppercase tracking-wider transition-colors"
            >
              RETURN TO ATELIER
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
