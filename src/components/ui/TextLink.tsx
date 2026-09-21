// src/components/ui/TextLink.tsx
import { Link } from "react-router-dom"; // use your router's Link if different

type Props = {
  to: string;
  children: React.ReactNode;
  tone?: "dark" | "light"; // "light" for olive/espresso backgrounds
  className?: string;
};

export function TextLink({ to, children, tone = "dark", className = "" }: Props) {
  const text = tone === "light" ? "text-ivory" : "text-espresso";
  const line = tone === "light" ? "bg-ivory" : "bg-espresso";
  return (
    <Link
      to={to}
      className={`group relative inline-block pb-2 text-[0.8125rem] uppercase tracking-[0.25em] ${text} ${className}`}
    >
      {children}
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 ${line} transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none`}
      />
    </Link>
  );
}