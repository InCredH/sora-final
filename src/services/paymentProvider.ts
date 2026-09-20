import type { CartItem } from "@/types/product";

/**
 * Placeholder payment/order architecture — nothing here charges a card.
 * When you're ready, add an implementation per gateway (Razorpay, UPI intent, COD)
 * and have Checkout call `createOrder` → `pay` → confirmation.
 */
export type PaymentMethodId = "razorpay" | "upi" | "cod";

export interface OrderDraft {
  items: CartItem[];
  customer: { name: string; email: string; phone: string };
  shippingAddress: { line1: string; line2?: string; city: string; state: string; pincode: string };
  paymentMethod: PaymentMethodId;
}

export interface PaymentProvider {
  id: PaymentMethodId;
  label: string;
  description: string;
  available: boolean;
  createOrder?(order: OrderDraft): Promise<{ orderId: string }>;
}

export const PAYMENT_METHODS: PaymentProvider[] = [
  { id: "razorpay", label: "Card / Netbanking", description: "Powered by Razorpay", available: false },
  { id: "upi", label: "UPI", description: "Pay with any UPI app", available: false },
  { id: "cod", label: "Cash on delivery", description: "Pay when it arrives", available: false },
];
