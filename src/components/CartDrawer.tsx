import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2, Tag, CheckCircle2 } from 'lucide-react';
import { buildEnquiryMessage, openWhatsAppEnquiry } from '../utils/whatsappEnquiry';
import { BUNDLE_TIERS, isBundleEligible } from '../data/products';
import { describeBundles } from '../utils/pricing';

interface CartDrawerProps {
  onOpenPolicy: (key: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenPolicy }) => {
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
    bundleDiscount,
    bundles,
    unpairedEligibleUnits,
    cartTotal,
    applyPromoCode,
    removePromoCode,
    formatPrice,
    setCurrentView
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPincode, setCustomerPincode] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const pincodeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);

  // Field validity (Indian pincode: 6 digits, can't start with 0).
  const nameInvalid = !customerName.trim();
  const emailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(customerEmail.trim());
  const addressInvalid = customerAddress.trim().length < 8;
  const pincodeInvalid = !/^[1-9][0-9]{5}$/.test(customerPincode);
  const cityInvalid = customerCity.trim().length < 2;
  const [lastEnquiryMessage, setLastEnquiryMessage] = useState('');
  const [showPromo, setShowPromo] = useState(false);

  // Bag emptied → reset the promo input UI too, so nothing is pre-filled next time.
  useEffect(() => {
    if (cart.length === 0) {
      setPromoInput('');
      setPromoMessage(null);
      setShowPromo(false);
    }
  }, [cart.length]);

  if (!isCartOpen) return null;

  // Product prices are inclusive of shipping.
  const finalTotal = cartTotal;

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
    if (cart.length === 0) return;

    // All delivery details are required before we open WhatsApp.
    const firstInvalid =
      (nameInvalid && nameRef.current) ||
      (emailInvalid && emailRef.current) ||
      (addressInvalid && addressRef.current) ||
      (pincodeInvalid && pincodeRef.current) ||
      (cityInvalid && cityRef.current) ||
      null;
    if (firstInvalid) {
      setShowErrors(true);
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalid.focus({ preventScroll: true });
      return;
    }

    const message = buildEnquiryMessage({
      cart,
      subtotal: cartSubtotal,
      discountAmount,
      appliedPromo,
      bundles,
      bundleDiscount,
      total: finalTotal,
      formatPrice,
      customerName,
      customerEmail,
      customerAddress,
      customerCity,
      customerPincode,
    });
    setLastEnquiryMessage(message);
    openWhatsAppEnquiry(message);
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
      <div className="relative w-full max-w-md bg-[#F5EFE3] text-[#2C211B] border-l border-[#2C211B]/15 shadow-2xl flex flex-col z-10 h-full h-[100dvh] overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="px-4 sm:px-5 py-3.5 border-b border-[#2C211B]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#861F3A]" />
            <h3 className="font-display text-base sm:text-lg font-bold uppercase tracking-wider text-[#2C211B]">
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
                ENQUIRY READY ON WHATSAPP
              </span>
              <h4 className="font-display text-2xl font-black text-[#2C211B] uppercase tracking-tight">
                THANK YOU FOR CHOOSING SORA
              </h4>
              <p className="text-xs sm:text-sm text-[#6B7055] mt-3 max-w-sm mx-auto leading-relaxed">
                Your enquiry for <strong>{cart.reduce((s, i) => s + i.quantity, 0)} frame{cart.reduce((s, i) => s + i.quantity, 0) > 1 ? 's' : ''}</strong> has been prepared in WhatsApp. Tap <strong>Send</strong> there and our support team will confirm availability and delivery.
              </p>
              <button
                type="button"
                onClick={() => openWhatsAppEnquiry(lastEnquiryMessage)}
                className="mt-3 text-[11px] font-mono-tech font-bold text-[#861F3A] underline cursor-pointer"
              >
                WhatsApp didn't open? Tap here
              </button>

              <div className="mt-6 p-4 bg-white border border-[#2C211B]/10 rounded-lg text-left text-xs font-mono-tech space-y-2">
                <div className="flex justify-between text-[#6B7055]">
                  <span>Total Amount (COD / Online):</span>
                  <span className="text-[#2C211B] font-bold">{formatPrice(finalTotal)}</span>
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

            {/* Scrollable area: items + promo + name + breakdown */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {cart.length === 0 ? (
                <div className="py-16 px-5 text-center flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#2C211B]/5 border border-[#2C211B]/10 flex items-center justify-center mb-4 text-[#6B7055]">
                    <ShoppingBag size={22} />
                  </div>
                  <h4 className="font-display text-base font-bold text-[#2C211B] uppercase tracking-wider">
                    YOUR BAG IS CURRENTLY EMPTY
                  </h4>
                  <p className="text-xs text-[#6B7055] mt-2 max-w-xs font-normal">
                    Explore the collection. Any 2 for ₹2,499*. *Except HOSHI.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentView('shop');
                    }}
                    className="mt-5 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] px-6 py-3 text-xs font-mono-tech uppercase font-bold tracking-wider transition-colors rounded shadow-md cursor-pointer"
                  >
                    DISCOVER THE COLLECTION
                  </button>
                </div>
              ) : (
                <>
                  {/* Bundle nudge — slim banner at top */}
                  {unpairedEligibleUnits > 0 && (
                    <div className="mx-4 sm:mx-5 mt-3 px-3 py-2 bg-[#C8A96B]/15 border border-[#C8A96B]/40 text-[#2C211B] text-[10.5px] leading-snug font-mono-tech rounded">
                      Add 1 more frame (any except HOSHI) → 2 for {formatPrice(BUNDLE_TIERS[0].price)}
                    </div>
                  )}

                  {/* Compact item rows */}
                  <ul className="px-4 sm:px-5 divide-y divide-[#2C211B]/10">
                    {cart.map((item) => {
                      const unitPrice = item.product.price;
                      const eligible = isBundleEligible(item.product);
                      return (
                        <li key={item.id} className="flex gap-3 py-3">
                          <img
                            src={item.variant.image || item.product.images[0]}
                            alt={`SORA ${item.product.name} in ${item.variant.colorName}`}
                            className="w-16 h-16 object-cover bg-white border border-[#2C211B]/10 rounded-md flex-shrink-0"
                          />

                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h4 className="font-display text-sm font-bold text-[#2C211B] uppercase tracking-wide leading-tight truncate">
                                  {item.product.name}
                                </h4>
                                <div className="mt-0.5 text-[10.5px] font-mono-tech text-[#6B7055] flex items-center gap-1.5 min-w-0">
                                  <span
                                    className="w-2 h-2 rounded-full inline-block border border-black/10 shrink-0"
                                    style={{ backgroundColor: item.variant.colorHex }}
                                  />
                                  <span className="truncate">{item.variant.colorName}</span>
                                  {eligible && (
                                    <span className="shrink-0 px-1 rounded-sm bg-[#861F3A]/10 text-[#861F3A] text-[9px] font-bold uppercase">
                                      Bundle
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="text-xs font-mono-tech font-bold text-[#2C211B] whitespace-nowrap">
                                {formatPrice(unitPrice * item.quantity)}
                              </span>
                            </div>

                            <div className="flex items-center justify-between mt-1.5">
                              <div className="flex items-center border border-[#2C211B]/20 bg-white rounded h-7">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="px-2 h-full text-[#2C211B] hover:text-[#861F3A] transition-colors cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={11} />
                                </button>
                                <span className="w-6 text-center text-[11px] font-mono-tech font-bold text-[#2C211B]">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="px-2 h-full text-[#2C211B] hover:text-[#861F3A] transition-colors cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={11} />
                                </button>
                              </div>
                              {item.quantity > 1 && (
                                <span className="text-[10px] font-mono-tech text-[#6B7055] ml-2 mr-auto">
                                  {formatPrice(unitPrice)} each
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="flex items-center gap-1 text-[10px] font-mono-tech uppercase text-[#6B7055] hover:text-[#861F3A] p-1 transition-colors cursor-pointer"
                                aria-label="Remove item"
                              >
                                <Trash2 size={12} />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Extras — sit below the items so they never hide products */}
                  <div className="px-4 sm:px-5 pt-3 pb-4 border-t border-[#2C211B]/10 space-y-3">
                    {/* Promo Code — collapsed by default */}
                    {appliedPromo ? (
                      <div className="flex items-center justify-between px-2.5 py-2 bg-[#861F3A]/10 border border-[#861F3A]/30 text-[#861F3A] text-[11px] font-mono-tech rounded">
                        <div className="flex items-center gap-1.5 font-bold">
                          <Tag size={12} />
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
                    ) : showPromo ? (
                      <div>
                        <form onSubmit={handleApplyPromo} className="flex gap-2">
                          <input
                            type="text"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            placeholder="Promo Code"
                            autoFocus
                            className="flex-1 min-w-0 bg-white border border-[#2C211B]/20 px-3 py-2 text-xs font-mono-tech text-[#2C211B] uppercase placeholder-[#6B7055] rounded focus:outline-none focus:border-[#861F3A]"
                          />
                          <button
                            type="submit"
                            className="px-3.5 py-2 bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] text-xs font-mono-tech uppercase font-bold transition-colors rounded cursor-pointer"
                          >
                            Apply
                          </button>
                        </form>
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
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowPromo(true)}
                        className="flex items-center gap-1.5 text-[11px] font-mono-tech text-[#6B7055] hover:text-[#861F3A] underline underline-offset-2 cursor-pointer"
                      >
                        <Tag size={12} />
                        Have a promo code?
                      </button>
                    )}

                    {/* Delivery details — all required */}
                    <div className="space-y-2">
                      <span className="block text-[10px] font-mono-tech uppercase tracking-wider font-bold text-[#6B7055]">
                        Delivery details <span className="text-[#861F3A]">*</span>
                      </span>

                      <div>
                        <input
                          ref={nameRef}
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Full Name *"
                          autoComplete="name"
                          required
                          aria-invalid={showErrors && nameInvalid}
                          className={`w-full bg-white border px-3 py-2 text-xs font-mono-tech text-[#2C211B] placeholder-[#6B7055] rounded focus:outline-none focus:border-[#861F3A] ${
                            showErrors && nameInvalid ? 'border-[#861F3A] ring-1 ring-[#861F3A]' : 'border-[#2C211B]/20'
                          }`}
                        />
                        {showErrors && nameInvalid && (
                          <p className="mt-1 text-[10px] font-mono-tech text-[#861F3A]">Please enter your name.</p>
                        )}
                      </div>

                      <div>
                        <input
                          ref={emailRef}
                          type="email"
                          inputMode="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="Email *"
                          autoComplete="email"
                          required
                          aria-invalid={showErrors && emailInvalid}
                          className={`w-full bg-white border px-3 py-2 text-xs font-mono-tech text-[#2C211B] placeholder-[#6B7055] rounded focus:outline-none focus:border-[#861F3A] ${
                            showErrors && emailInvalid ? 'border-[#861F3A] ring-1 ring-[#861F3A]' : 'border-[#2C211B]/20'
                          }`}
                        />
                        {showErrors && emailInvalid && (
                          <p className="mt-1 text-[10px] font-mono-tech text-[#861F3A]">Please enter a valid email address.</p>
                        )}
                      </div>

                      <div>
                        <textarea
                          ref={addressRef}
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="House / Flat, Street, Area, Landmark *"
                          autoComplete="street-address"
                          rows={2}
                          required
                          aria-invalid={showErrors && addressInvalid}
                          className={`w-full resize-none bg-white border px-3 py-2 text-xs font-mono-tech text-[#2C211B] placeholder-[#6B7055] rounded focus:outline-none focus:border-[#861F3A] ${
                            showErrors && addressInvalid ? 'border-[#861F3A] ring-1 ring-[#861F3A]' : 'border-[#2C211B]/20'
                          }`}
                        />
                        {showErrors && addressInvalid && (
                          <p className="mt-1 text-[10px] font-mono-tech text-[#861F3A]">Please enter your house, street and area.</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <input
                            ref={pincodeRef}
                            type="text"
                            inputMode="numeric"
                            pattern="[1-9][0-9]{5}"
                            maxLength={6}
                            value={customerPincode}
                            onChange={(e) => setCustomerPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="Pincode *"
                            autoComplete="postal-code"
                            required
                            aria-invalid={showErrors && pincodeInvalid}
                            className={`w-full bg-white border px-3 py-2 text-xs font-mono-tech text-[#2C211B] placeholder-[#6B7055] rounded focus:outline-none focus:border-[#861F3A] ${
                            showErrors && pincodeInvalid ? 'border-[#861F3A] ring-1 ring-[#861F3A]' : 'border-[#2C211B]/20'
                          }`}
                          />
                          {showErrors && pincodeInvalid && (
                            <p className="mt-1 text-[10px] font-mono-tech text-[#861F3A]">Enter a valid 6-digit pincode.</p>
                          )}
                        </div>
                        <div>
                          <input
                            ref={cityRef}
                            type="text"
                            value={customerCity}
                            onChange={(e) => setCustomerCity(e.target.value)}
                            placeholder="City *"
                            autoComplete="address-level2"
                            required
                            aria-invalid={showErrors && cityInvalid}
                            className={`w-full bg-white border px-3 py-2 text-xs font-mono-tech text-[#2C211B] placeholder-[#6B7055] rounded focus:outline-none focus:border-[#861F3A] ${
                            showErrors && cityInvalid ? 'border-[#861F3A] ring-1 ring-[#861F3A]' : 'border-[#2C211B]/20'
                          }`}
                          />
                          {showErrors && cityInvalid && (
                            <p className="mt-1 text-[10px] font-mono-tech text-[#861F3A]">Please enter your city.</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Breakdown (only when there's something to break down) */}
                    {(bundleDiscount > 0 || discountAmount > 0) && (
                      <div className="space-y-1 text-[11px] font-mono-tech text-[#6B7055]">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="text-[#2C211B] font-bold">{formatPrice(cartSubtotal)}</span>
                        </div>
                        {bundleDiscount > 0 && (
                          <div className="flex justify-between text-[#861F3A] font-bold">
                            <span>Bundle ({describeBundles(bundles, formatPrice)})</span>
                            <span>-{formatPrice(bundleDiscount)}</span>
                          </div>
                        )}
                        {discountAmount > 0 && (
                          <div className="flex justify-between text-[#861F3A] font-bold">
                            <span>Coupon{appliedPromo ? ` (${appliedPromo})` : ''}</span>
                            <span>-{formatPrice(discountAmount)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Slim pinned footer: total + checkout only */}
            {cart.length > 0 && (
              <form
                onSubmit={handleOrderSubmit}
                className="px-4 sm:px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-[#2C211B]/15 bg-[#FAF7F0] shadow-[0_-6px_16px_-10px_rgba(44,33,27,0.25)] space-y-2"
              >
                <div className="flex items-baseline justify-between font-mono-tech">
                  <span className="text-sm font-bold text-[#2C211B]">
                    Total <span className="text-[10px] font-normal text-[#6B7055]">(Free shipping)</span>
                  </span>
                  <span className="text-right">
                    {bundleDiscount + discountAmount > 0 && (
                      <span className="text-[11px] text-[#6B7055] line-through mr-2">{formatPrice(cartSubtotal)}</span>
                    )}
                    <span className="text-[#861F3A] font-extrabold text-base">{formatPrice(finalTotal)}</span>
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#2C211B] hover:bg-[#861F3A] text-[#F5EFE3] py-3 px-6 text-xs font-mono-tech tracking-widest uppercase font-bold flex items-center justify-center gap-2 transition-all shadow-md rounded cursor-pointer"
                >
                  <span>Checkout on WhatsApp</span>
                  <ArrowRight size={15} />
                </button>
                <div className="flex flex-wrap items-center justify-center gap-x-1.5 text-[9.5px] font-mono-tech text-[#6B7055] text-center">
                  <span>You'll get a secure Razorpay payment link on WhatsApp  UPI, cards & netbanking</span>
                  <span>AVAILABLE FROM 10AM - 12 MIDNIGHT</span>
                  {/* <button
                    type="button"
                    onClick={() => onOpenPolicy('returns')}
                    className="underline underline-offset-2 hover:text-[#861F3A] cursor-pointer"
                  >
                    No returns unless damaged
                  </button> */}
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};
