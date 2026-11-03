import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2, Tag, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    appliedPromo,
    discountAmount,
    applyPromoCode,
    removePromoCode,
    formatPrice,
    setCurrentView
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 3000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const shippingCharge = remainingForFreeShipping === 0 ? 0 : 250;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCharge);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput.trim());
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };

  const handleResetAndClose = () => {
    setOrderConfirmed(false);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2C211B]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => {
          setIsCartOpen(false);
          setOrderConfirmed(false);
        }}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#F5EFE3] text-[#2C211B] border-l border-[#2C211B]/15 shadow-2xl flex flex-col justify-between z-10 h-full overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#2C211B]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#861F3A]" />
            <h3 className="font-display text-lg font-bold uppercase tracking-wider text-[#2C211B]">
              YOUR SELECTIONS ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsCartOpen(false);
              setOrderConfirmed(false);
            }}
            className="p-1 text-[#2C211B]/70 hover:text-[#861F3A] transition-colors cursor-pointer"
            aria-label="Close Bag"
          >
            <X size={20} />
          </button>
        </div>

        {orderConfirmed ? (
          /* Clean Order Confirmation View (Replaces Multi-step Checkout) */
          <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between text-center">
            <div className="py-8 my-auto">
              <div className="w-16 h-16 rounded-full bg-[#861F3A]/10 border border-[#861F3A]/30 text-[#861F3A] flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={32} />
              </div>
              
              <span className="text-[10px] font-mono-tech tracking-widest text-[#861F3A] uppercase font-bold block mb-1">
                ORDER RESERVATION CONFIRMED
              </span>
              <h4 className="font-display text-2xl font-black text-[#2C211B] uppercase tracking-tight">
                THANK YOU FOR CHOOSING SORA
              </h4>
              <p className="text-xs sm:text-sm text-[#6B7055] mt-3 max-w-sm mx-auto leading-relaxed">
                Your reservation for <strong>{cart.length} signature frame{cart.length > 1 ? 's' : ''}</strong> has been logged. Our concierge will dispatch your insured package within 24 hours.
              </p>

              <div className="mt-6 p-4 bg-white border border-[#2C211B]/10 rounded-lg text-left text-xs font-mono-tech space-y-2">
                <div className="flex justify-between text-[#6B7055]">
                  <span>Total Amount (COD / Online):</span>
                  <span className="text-[#2C211B] font-bold">{formatPrice(finalTotal)}</span>
                </div>
                <div className="flex justify-between text-[#6B7055]">
                  <span>Packaging:</span>
                  <span className="text-[#2C211B]">Handcrafted Leather Case & Cloth</span>
                </div>
                <div className="flex justify-between text-[#6B7055]">
                  <span>Trial Period:</span>
                  <span className="text-[#861F3A] font-bold">30-Day In-Home Guarantee</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#2C211B]/10">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] py-3.5 px-6 text-xs font-mono-tech uppercase font-bold tracking-wider rounded transition-colors shadow-md cursor-pointer"
              >
                CONTINUE EXPLORING
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress Indicator */}
            <div className="px-6 py-3 bg-[#FAF7F0] border-b border-[#2C211B]/10">
              <div className="flex items-center justify-between text-[11px] font-mono-tech mb-1.5">
                <span className="text-[#6B7055]">
                  {remainingForFreeShipping > 0
                    ? `Add ${formatPrice(remainingForFreeShipping)} more for Complimentary Shipping`
                    : 'Complimentary Insured Courier Unlocked'}
                </span>
                <span className="text-[#861F3A] font-bold">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#2C211B]/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#861F3A] transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#2C211B]/5 border border-[#2C211B]/10 flex items-center justify-center mb-4 text-[#6B7055]">
                    <ShoppingBag size={24} />
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#2C211B] uppercase tracking-wider">
                    YOUR BAG IS CURRENTLY EMPTY
                  </h4>
                  <p className="text-xs text-[#6B7055] mt-2 max-w-xs font-normal">
                    Explore our Japanese titanium and cellulose propionate silhouettes.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentView('shop');
                    }}
                    className="mt-6 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] px-6 py-3 text-xs font-mono-tech uppercase font-bold tracking-wider transition-colors rounded shadow-md cursor-pointer"
                  >
                    DISCOVER THE COLLECTION
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const unitPrice = item.product.salePrice ?? item.product.price;
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-6 border-b border-[#2C211B]/10 group relative"
                    >
                      {/* Thumbnail */}
                      <img
                        src={item.variant.image || item.product.images[0]}
                        alt={`SORA ${item.product.name} in ${item.variant.colorName}`}
                        className="w-20 h-24 object-cover bg-white border border-[#2C211B]/10 rounded flex-shrink-0"
                      />

                      {/* Item info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-display text-base font-bold text-[#2C211B] uppercase tracking-wide">
                              {item.product.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#6B7055] hover:text-[#861F3A] p-1 transition-colors cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="text-[11px] font-mono-tech text-[#6B7055] mt-0.5 flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                              style={{ backgroundColor: item.variant.colorHex }}
                            />
                            <span>{item.variant.colorName}</span>
                            <span>• {item.product.category}</span>
                          </div>

                          {/* Stock urgency indicator */}
                          <div className="mt-1">
                            <span className="text-[10px] font-mono-tech font-bold text-[#861F3A]">
                              {item.product.stockCount <= 5
                                ? `Only ${item.product.stockCount} left in stock`
                                : 'In Stock • Ships in 24 hrs'}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Stepper & Price */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#2C211B]/20 bg-white rounded">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1.5 text-[#2C211B] hover:text-[#861F3A] transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs font-mono-tech font-bold text-[#2C211B]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1.5 text-[#2C211B] hover:text-[#861F3A] transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-mono-tech font-bold text-[#2C211B]">
                              {formatPrice(unitPrice * item.quantity)}
                            </span>
                            {item.quantity > 1 && (
                              <div className="text-[10px] font-mono-tech text-[#6B7055]">
                                {formatPrice(unitPrice)} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer with Promo Code & Direct Order Reservation */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#2C211B]/10 bg-[#FAF7F0] space-y-4">
                {/* Promo Code Form */}
                <div>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-2.5 bg-[#861F3A]/10 border border-[#861F3A]/30 text-[#861F3A] text-xs font-mono-tech rounded">
                      <div className="flex items-center gap-1.5 font-bold">
                        <Tag size={13} />
                        <span>CODE {appliedPromo} ACTIVE (-{formatPrice(discountAmount)})</span>
                      </div>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        className="text-[#6B7055] hover:text-[#861F3A] underline text-[10px] ml-2 cursor-pointer font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo Code (e.g. SORA10)"
                        className="flex-1 bg-white border border-[#2C211B]/20 px-3 py-2 text-xs font-mono-tech text-[#2C211B] uppercase placeholder-[#6B7055] rounded focus:outline-none focus:border-[#861F3A]"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] text-xs font-mono-tech uppercase font-bold transition-colors rounded cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoMessage && (
                    <p
                      className={`text-[10px] font-mono-tech mt-1.5 ${
                        promoMessage.isError ? 'text-[#861F3A]' : 'text-emerald-700 font-bold'
                      }`}
                    >
                      {promoMessage.text}
                    </p>
                  )}
                </div>

                {/* Calculations Breakdown */}
                <div className="space-y-1.5 text-xs font-mono-tech text-[#6B7055] border-t border-[#2C211B]/10 pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#2C211B] font-bold">{formatPrice(cartSubtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#861F3A] font-bold">
                      <span>Maison Privilege</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Insured White-Glove Courier</span>
                    <span className="text-[#2C211B] font-medium">
                      {remainingForFreeShipping === 0 ? 'COMPLIMENTARY' : formatPrice(250)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#2C211B] pt-2 border-t border-[#2C211B]/15">
                    <span>Estimated Total</span>
                    <span className="text-[#861F3A] font-extrabold text-base">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Direct Order Confirmation Form */}
                <form onSubmit={handleOrderSubmit} className="space-y-2">
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Enter Phone Number for 24-hr Delivery"
                    className="w-full bg-white border border-[#2C211B]/20 px-3.5 py-2.5 text-xs font-mono-tech text-[#2C211B] placeholder-[#6B7055] rounded focus:outline-none focus:border-[#861F3A]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] py-3.5 px-6 text-xs font-mono-tech tracking-widest uppercase font-bold flex items-center justify-center gap-2 transition-all shadow-md rounded cursor-pointer"
                  >
                    <span>CONFIRM ORDER RESERVATION</span>
                    <ArrowRight size={15} />
                  </button>
                </form>

                {/* Security Guarantee Notice */}
                <div className="flex items-center justify-center gap-2 text-[10px] font-mono-tech text-[#6B7055]">
                  <ShieldCheck size={13} className="text-[#861F3A]" />
                  <span>DIRECT FROM SORA ATELIER // 30-DAY TRIAL</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
