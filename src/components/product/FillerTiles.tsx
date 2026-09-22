import { Link } from "react-router-dom";
import { Sparkle } from "lucide-react";
import { asset } from "@/data/assets";
import { Logo } from "@/components/ui/Logo";

/**
 * Brand tiles (straight from the mood board's language) that keep the shop grid
 * feeling complete while the catalogue is small. They are hidden on filtered views
 * and once there are enough products to fill the grid on their own.
 */
export type TileKind = "olive" | "burgundy" | "image" | "fabric";

export function BrandTile({ kind, className = "" }: { kind: TileKind; className?: string }) {
  const shell = `relative flex min-h-[18rem] flex-col items-center justify-center overflow-hidden px-6 text-center ${className}`;
  if (kind === "olive")
    return (
      <div className={`${shell} bg-olive text-ivory`} aria-hidden>
        <Logo className="h-9" />
        <span className="mt-6 h-8 w-px bg-ivory/50" />
        <p className="t-label mt-6 text-[0.625rem] tracking-[0.42em]">SEE YOUR WAY.</p>
      </div>
    );
  if (kind === "burgundy")
    return (
      <div className={`${shell} bg-burgundy text-ivory`} aria-hidden>
        <p className="t-editorial text-[1.9rem] leading-[1.15]">Designed<br />for your next<br />chapter.</p>
        <Sparkle strokeWidth={1} className="mt-6 h-4 w-4 text-champagne" />
      </div>
    );
  if (kind === "fabric")
    return (
      <div className={`${shell} bg-burgundy`} aria-hidden>
        <img src={asset("fabric")} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      </div>
    );
  return (
    <Link to="/about" className={`${shell} group`} tabIndex={-1} aria-hidden>
      <img src={asset("coast")} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" loading="lazy" />
    </Link>
  );
}

export const FILL_ORDER: TileKind[] = ["olive", "burgundy", "image", "fabric"];
