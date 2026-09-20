import { LOGO_RATIO, LOGO_URL } from "@/data/assets";

/**
 * The SORA wordmark — the supplied logo file, never redrawn or retyped.
 * The file is used as a mask so it takes the surrounding text colour
 * (Espresso on Ivory, Ivory on Olive / Burgundy / Espresso, as in the mood board).
 */
export function Logo({ className = "h-6", label = "SORA" }: { className?: string; label?: string }) {
  const url = `url("${LOGO_URL}")`;
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-block bg-current align-middle ${className}`}
      style={{
        aspectRatio: String(LOGO_RATIO),
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
