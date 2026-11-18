import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, PRODUCTS } from '../data/products';
import { calculateBundle } from '../utils/pricing';

export interface CartItem {
  id: string; // unique item key: productId + variantId
  product: Product;
  variant: ProductVariant;
  quantity: number;
  addedAt: number;
}

export type Currency = 'INR';

export type AppView = 'home' | 'shop' | 'story' | 'pdp' | 'privacy' | 'terms' | '404';

interface ShopContextType {
  // Navigation & Views
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  appliedPromo: string | null;
  /** Promo-code discount (applies only to frames not already in a bundle). */
  discountAmount: number;
  /** Saving from the "any 2 for ₹2,499" bundle offer. */
  bundleDiscount: number;
  bundleCount: number;
  /** Bundle-eligible frames in the cart that still need a partner (0 or 1). */
  unpairedEligibleUnits: number;
  /** Final amount payable (shipping is included in product prices). */
  cartTotal: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Wishlist stubs
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Search stubs
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Category filter synchronization across pages
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (category: string) => void;

  // Currency (Strictly INR)
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amountInINR: number) => string;

  // Toast feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Views
  const [currentView, _setCurrentView] = useState<AppView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const setCurrentView = (view: AppView) => {
    _setCurrentView(view);
    try {
      if (view === 'home') {
        setSelectedProduct(null);
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        document.title = 'SORA (空) — Sunglasses Inspired by the Sky';
      } else if (view === 'shop') {
        window.history.replaceState(null, '', '#collection');
        document.title = 'The Collection — SORA (空) Sunglasses';
      } else if (view === 'story') {
        window.history.replaceState(null, '', '#manifesto');
        document.title = 'Our Story — SORA (空)';
      } else if (view === 'privacy') {
        window.history.replaceState(null, '', '#privacy');
        document.title = 'Privacy Policy — SORA (空)';
      } else if (view === 'terms') {
        window.history.replaceState(null, '', '#terms');
        document.title = 'Terms & Conditions — SORA (空)';
      } else if (view === '404') {
        window.history.replaceState(null, '', '#404');
        document.title = '404 — Silhouette Not Found | SORA (空)';
      }
    } catch {}
  };

  // Sync with URL Hash for seamless back/forward navigation, deep links, and 404 routing
  useEffect(() => {
    const handleHashRoute = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
      if (!hash || hash === 'home') {
        try {
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        } catch {}
        _setCurrentView('home');
        document.title = 'SORA (空) — Sunglasses Inspired by the Sky';
      } else if (hash === 'shop' || hash === 'collection' || hash === 'frames') {
        _setCurrentView('shop');
        document.title = 'The Collection — SORA (空) Sunglasses';
      } else if (hash === 'story' || hash === 'manifesto') {
        _setCurrentView('story');
        document.title = 'Our Story — SORA (空)';
      } else if (hash === 'privacy' || hash === 'privacy-policy') {
        _setCurrentView('privacy');
        document.title = 'Privacy Policy — SORA (空)';
      } else if (hash === 'terms' || hash === 'terms-and-conditions') {
        _setCurrentView('terms');
        document.title = 'Terms & Conditions — SORA (空)';
      } else if (hash.startsWith('product/')) {
        // Automatically clear any leftover #product/... hash from URL so reload goes cleanly to Home
        try {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        } catch {}
        _setCurrentView('home');
        document.title = 'SORA (空) — Sunglasses Inspired by the Sky';
      } else if (hash === '404') {
        _setCurrentView('404');
        document.title = '404 — Silhouette Not Found | SORA (空)';
      } else if (hash) {
        // Unrecognized route -> 404 page
        _setCurrentView('404');
        document.title = '404 — Silhouette Not Found | SORA (空)';
      }
    };

    handleHashRoute();
    window.addEventListener('hashchange', handleHashRoute);
    return () => window.removeEventListener('hashchange', handleHashRoute);
  }, []);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sora_cart');
      if (!saved) return [];
      // Re-link saved items to the current catalogue so prices and details are never stale.
      return (JSON.parse(saved) as CartItem[]).flatMap((item) => {
        const product = PRODUCTS.find((p) => p.id === item.product?.id);
        if (!product) return [];
        const variant = product.variants.find((v) => v.id === item.variant?.id) ?? product.variants[0];
        return [{ ...item, id: `${product.id}_${variant.id}`, product, variant }];
      });
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('sora_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [cart]);

  // A promo code never carries over: once the bag is emptied, the code is dropped
  // and the customer must re-enter it after adding frames again.
  useEffect(() => {
    if (cart.length === 0) setAppliedPromo(null);
  }, [cart.length]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3200);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    _setCurrentView('pdp');
    document.title = `${product.name} — SORA (空) Eyewear`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProductDetail = () => {
    setCurrentView('shop');
  };

  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    // Only accept a variant that actually belongs to this product.
    const selectedVariant =
      (variant && product.variants.find((v) => v.id === variant.id)) || product.variants[0];
    const itemId = `${product.id}_${selectedVariant.id}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          variant: selectedVariant,
          quantity,
          addedAt: Date.now()
        }
      ];
    });

    showToast(`Added ${product.name} to Bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast('Item removed from Bag');
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const { bundleCount, bundleDiscount, bundledValue, unpairedEligibleUnits } = calculateBundle(cart);

  const applyPromoCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'SORA10') {
      setAppliedPromo('SORA10');
      return { success: true, message: 'VIP 10% Maison Privilège applied' };
    }
    if (trimmed === 'SORA15') {
      setAppliedPromo('SORA15');
      return { success: true, message: 'Exclusive 15% discount applied' };
    }
    if (trimmed === 'FLAGSHIP') {
      setAppliedPromo('FLAGSHIP');
      return { success: true, message: '₹500 Flagship Debut discount applied' };
    }
    return { success: false, message: 'Invalid promo code. Try "SORA10" or "FLAGSHIP"' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Promo codes don't stack with the bundle offer: they only apply to frames not in a bundle.
  const promoEligibleAmount = cartSubtotal - bundledValue;
  let discountAmount = 0;
  if (appliedPromo === 'SORA10') {
    discountAmount = Math.round(promoEligibleAmount * 0.1);
  } else if (appliedPromo === 'SORA15') {
    discountAmount = Math.round(promoEligibleAmount * 0.15);
  } else if (appliedPromo === 'FLAGSHIP') {
    discountAmount = Math.min(promoEligibleAmount, 500);
  }

  const cartTotal = Math.max(0, cartSubtotal - bundleDiscount - discountAmount);

  // Strictly formatted in Indian Rupee (INR)
  const formatPrice = (amountInINR: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amountInINR);
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartSubtotal,
        appliedPromo,
        discountAmount,
        bundleDiscount,
        bundleCount,
        unpairedEligibleUnits,
        cartTotal,
        applyPromoCode,
        removePromoCode,
        // Wishlist stubs
        wishlist: [],
        toggleWishlist: () => {},
        isInWishlist: () => false,
        // Search
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        // Category Filter
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        // Currency strictly INR
        currency: 'INR',
        setCurrency: () => {},
        formatPrice,
        toastMessage,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
