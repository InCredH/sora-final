import type { CartItem } from '../context/ShopContext';
import { BUNDLE_OFFER, isBundleEligible } from '../data/products';

// Business WhatsApp number in international format (country code + number, no "+" or spaces).
export const ENQUIRY_WHATSAPP_NUMBER = '917021240047';

interface EnquiryDetails {
  cart: CartItem[];
  subtotal: number;
  discountAmount: number;
  appliedPromo: string | null;
  bundleCount: number;
  bundleDiscount: number;
  total: number;
  formatPrice: (amount: number) => string;
  customerName?: string;
}

export const buildEnquiryMessage = ({
  cart,
  subtotal,
  discountAmount,
  appliedPromo,
  bundleCount,
  bundleDiscount,
  total,
  formatPrice,
  customerName,
}: EnquiryDetails): string => {
  const totalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);

  const itemLines = cart.map((item, index) => {
    const unitPrice = item.product.price;
    return [
      `${index + 1}. *${item.product.name}*`,
      `   SKU: ${item.product.sku}`,
      `   Colour: ${item.variant.colorName}`,
      `   Bundle offer: ${isBundleEligible(item.product) ? 'Eligible' : 'Not eligible'}`,
      `   Quantity: ${item.quantity}`,
      `   Price: ${formatPrice(unitPrice)} x ${item.quantity} = ${formatPrice(unitPrice * item.quantity)}`,
    ].join('\n');
  });

  const lines = [
    'Hello SORA, I would like to place an enquiry for the following:',
    '',
    ...(customerName?.trim() ? [`Name: ${customerName.trim()}`, ''] : []),
    ...itemLines.flatMap((block) => [block, '']),
    `Total items: ${totalUnits}`,
    `Subtotal: ${formatPrice(subtotal)}`,
    ...(bundleDiscount > 0
      ? [`Bundle offer (${bundleCount} x 2 for ${formatPrice(BUNDLE_OFFER.price)}): -${formatPrice(bundleDiscount)}`]
      : []),
    ...(discountAmount > 0
      ? [`Discount${appliedPromo ? ` (${appliedPromo})` : ''}: -${formatPrice(discountAmount)}`]
      : []),
    `*Total (incl. shipping): ${formatPrice(total)}*`,
    '',
    'Please confirm availability and next steps. Thank you!',
  ];

  return lines.join('\n');
};

export const buildWhatsAppUrl = (message: string): string =>
  `https://wa.me/${ENQUIRY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/** Opens WhatsApp (app on mobile, WhatsApp Web on desktop) with the message pre-filled. */
export const openWhatsAppEnquiry = (message: string): void => {
  const url = buildWhatsAppUrl(message);
  // Note: passing "noopener" makes window.open always return null, so detach the opener manually instead.
  const popup = window.open(url, '_blank');
  if (popup) {
    popup.opener = null;
  } else {
    // Popup blocked — navigate in the same tab instead.
    window.location.href = url;
  }
};
