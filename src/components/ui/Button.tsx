import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "solid" | "outline" | "light" | "burgundy" | "quiet";

const base =
  "t-label inline-flex items-center justify-center gap-2 whitespace-nowrap border px-8 py-[1.05rem] transition-colors duration-300 disabled:opacity-40 disabled:pointer-events-none";
const variants: Record<Variant, string> = {
  solid: "border-espresso bg-espresso text-ivory hover:bg-olive hover:border-olive",
  outline: "border-espresso text-espresso hover:bg-espresso hover:text-ivory",
  light: "border-ivory/70 text-ivory hover:bg-ivory hover:text-espresso",
  burgundy: "border-burgundy bg-burgundy text-ivory hover:bg-espresso hover:border-espresso",
  quiet: "border-transparent px-0 underline decoration-champagne decoration-1 underline-offset-[7px] hover:decoration-espresso",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  to?: string;
  href?: string;
  block?: boolean;
  children: ReactNode;
}

export function Button({ variant = "solid", to, href, block, className = "", children, ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${block ? "w-full" : ""} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
  return <button className={cls} {...rest}>{children}</button>;
}
