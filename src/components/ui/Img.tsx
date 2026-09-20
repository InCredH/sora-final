import { useState, type ImgHTMLAttributes } from "react";

/** Image with a quiet skeleton until it has loaded. */
export function Img({ className = "", wrapperClassName = "", eager, alt, ...rest }: ImgHTMLAttributes<HTMLImageElement> & { wrapperClassName?: string; eager?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-ivory-deep ${wrapperClassName}`}>
      {!loaded && <div className="skeleton absolute inset-0" aria-hidden />}
      <img
        ref={(el) => { if (el?.complete && el.naturalWidth > 0 && !loaded) setLoaded(true); }}
        alt={alt ?? ""}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        {...rest}
      />
    </div>
  );
}
