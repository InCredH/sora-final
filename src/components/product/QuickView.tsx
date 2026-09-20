import { Link } from "react-router-dom";
import type { Product } from "@/types/product";
import { getPrimaryImageSrc } from "@/lib/product";
import { Modal } from "@/components/ui/Modal";
import { Img } from "@/components/ui/Img";
import { ProductBadges } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { StockLabel } from "@/components/ui/StockLabel";
import { PurchaseControls } from "./PurchaseControls";

export function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  return (
    <Modal open={!!product} onClose={onClose} label={product ? `Quick view: ${product.name}` : "Quick view"} wide>
      {product && (
        <div className="grid md:grid-cols-2">
          <div className="relative">
            <Img src={getPrimaryImageSrc(product)} alt={product.images[0]?.alt || product.name} wrapperClassName="aspect-[10/11] md:h-full md:aspect-auto" />
            <div className="absolute left-3 top-3"><ProductBadges product={product} /></div>
          </div>
          <div className="flex flex-col p-6 pt-8 md:p-10">
            <p className="t-label text-espresso/60">{product.category}</p>
            <h2 className="t-display mt-3 text-4xl">{product.name}</h2>
            <div className="mt-4"><Price product={product} size="lg" /></div>
            <p className="mt-5 text-[0.9375rem] leading-[1.8] text-espresso/80">{product.shortDescription}</p>
            <div className="mt-5"><StockLabel product={product} showCount /></div>
            <div className="mt-8"><PurchaseControls product={product} onAdded={onClose} /></div>
            <Link to={`/product/${product.slug}`} onClick={onClose} className="t-label mt-8 self-start border-b border-champagne pb-1">VIEW FULL DETAILS</Link>
          </div>
        </div>
      )}
    </Modal>
  );
}
