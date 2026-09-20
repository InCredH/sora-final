import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/store/cart";
import { useToast } from "@/store/toast";
import { isSoldOut } from "@/lib/inventory";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

export function PurchaseControls({ product, onAdded }: { product: Product; onAdded?: () => void }) {
  const cart = useCart();
  const toast = useToast();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const soldOut = isSoldOut(product);

  const addToCart = () => {
    const r = cart.add(product, qty);
    if (!r.ok) return toast.show(r.message ?? "Could not add to cart.");
    toast.show(r.message ?? `${product.name} added to cart`, { label: "VIEW CART", to: "/cart" });
    onAdded?.();
  };
  const buyNow = () => {
    const r = cart.add(product, qty);
    if (!r.ok) return toast.show(r.message ?? "Could not start checkout.");
    onAdded?.();
    navigate("/checkout"); // placeholder checkout — see services/paymentProvider.ts
  };

  return (
    <div className="space-y-3">
      {!soldOut && (
        <div className="mb-5 flex items-center gap-5">
          <span className="t-label text-espresso/70">Quantity</span>
          <QuantityStepper value={qty} onChange={setQty} max={Math.max(1, product.inventoryQuantity)} />
        </div>
      )}
      <Button block onClick={addToCart} disabled={soldOut}>ADD TO CART</Button>
      <Button block variant="outline" onClick={buyNow} disabled={soldOut}>BUY NOW</Button>
      {soldOut && (
        <Button block variant="outline" onClick={() => toast.show("Back-in-stock alerts are coming soon.")}>NOTIFY ME</Button>
      )}
      <button
        type="button"
        onClick={() => toast.show("Wishlist is coming soon.")}
        className="t-label mx-auto flex items-center gap-2 pt-3 text-espresso/70 transition-colors hover:text-espresso"
      >
        <Heart strokeWidth={1.2} className="h-4 w-4" /> ADD TO WISHLIST
      </button>
    </div>
  );
}
