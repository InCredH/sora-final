import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "@/types/product";
import { resolveSrc } from "@/lib/product";
import { isSoldOut } from "@/lib/inventory";
import { Img } from "@/components/ui/Img";
import { ProductBadges } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { QuickView } from "./QuickView";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [quick, setQuick] = useState(false);
  const images = product.images.filter((m) => m.type === "image");
  const first = images[0] ?? product.images[0];
  const second = images[1];
  const soldOut = isSoldOut(product);
  const href = `/product/${product.slug}`;

  return (
    <article className="group">
      <div className="relative">
        <Link to={href} tabIndex={-1} aria-hidden className="block">
          <div className="relative aspect-[10/11] overflow-hidden border hairline bg-ivory-deep">
            {first ? (
              <div className="absolute inset-0">
                <Img
                  src={resolveSrc(first.src)}
                  alt=""
                  eager={priority}
                  wrapperClassName="h-full"
                  className={`transition-transform duration-[1400ms] ease-[var(--ease-soft)] group-hover:scale-[1.035] ${soldOut ? "opacity-70 saturate-[.6]" : ""}`}
                />
              </div>
            ) : (
              <div className="t-label grid h-full place-items-center text-espresso/40">No image</div>
            )}
            {second && (
              <img
                src={resolveSrc(second.src)}
                alt=""
                loading="lazy"
                className="absolute inset-0 hidden h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:block"
              />
            )}
          </div>
        </Link>
        <div className="pointer-events-none absolute left-3 top-3"><ProductBadges product={product} /></div>
        <button
          type="button"
          onClick={() => setQuick(true)}
          className="t-label absolute inset-x-3 bottom-3 hidden translate-y-2 border border-espresso bg-ivory/95 py-3 text-center opacity-0 backdrop-blur transition-all duration-500 hover:bg-espresso hover:text-ivory focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:block"
        >
          QUICK VIEW
        </button>
      </div>
      <Link to={href} className="mt-4 block space-y-1.5">
        <h3 className="font-display text-[1.3rem] leading-tight">{product.name}</h3>
        <Price product={product} />
      </Link>
      <QuickView product={quick ? product : null} onClose={() => setQuick(false)} />
    </article>
  );
}
