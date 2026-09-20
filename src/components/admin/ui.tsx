import type { ReactNode } from "react";

export const Panel = ({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) => (
  <section className="border hairline bg-white/50 p-5 md:p-8">
    <h2 className="font-display text-2xl">{title}</h2>
    {hint && <p className="mt-1 text-[0.8125rem] text-espresso/60">{hint}</p>}
    <div className="mt-6 space-y-5">{children}</div>
  </section>
);

export const Field = ({ label, hint, error, htmlFor, children }: { label: string; hint?: string; error?: string; htmlFor?: string; children: ReactNode }) => (
  <div>
    <label htmlFor={htmlFor} className="mb-1.5 block text-[0.8125rem] font-medium">{label}</label>
    {children}
    {hint && !error && <p className="mt-1.5 text-xs text-espresso/55">{hint}</p>}
    {error && <p role="alert" className="mt-1.5 text-xs text-burgundy">{error}</p>}
  </div>
);

export const Toggle = ({ checked, onChange, label, hint, disabled, compact }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string; disabled?: boolean; compact?: boolean }) => (
  <label className={`flex cursor-pointer items-start gap-4 ${disabled ? "opacity-50" : ""}`}>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-olive" : "bg-espresso/25"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-ivory transition-all ${checked ? "left-[1.375rem]" : "left-0.5"}`} />
    </button>
    {!compact && (
      <span>
        <span className="block text-[0.875rem] font-medium">{label}</span>
        {hint && <span className="block text-xs text-espresso/55">{hint}</span>}
      </span>
    )}
  </label>
);

export const AButton = ({ children, tone = "solid", className = "", ...rest }: { tone?: "solid" | "outline" | "danger" } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const tones = {
    solid: "border-espresso bg-espresso text-ivory hover:bg-olive hover:border-olive",
    outline: "border-espresso/40 hover:border-espresso hover:bg-espresso hover:text-ivory",
    danger: "border-burgundy bg-burgundy text-ivory hover:bg-espresso hover:border-espresso",
  };
  return (
    <button {...rest} className={`t-label inline-flex items-center justify-center gap-2 whitespace-nowrap border px-5 py-3 transition-colors disabled:pointer-events-none disabled:opacity-40 ${tones[tone]} ${className}`}>
      {children}
    </button>
  );
};

export const Pill = ({ tone, children }: { tone: "olive" | "champagne" | "burgundy" | "muted" | "espresso"; children: ReactNode }) => {
  const t = {
    olive: "bg-olive/15 text-olive border-olive/40",
    champagne: "bg-champagne/20 text-[#7a6230] border-champagne/60",
    burgundy: "bg-burgundy/10 text-burgundy border-burgundy/40",
    muted: "bg-espresso/5 text-espresso/60 border-espresso/20",
    espresso: "bg-espresso text-ivory border-espresso",
  }[tone];
  return <span className={`t-label inline-block border px-2 py-1 text-[0.5625rem] leading-none tracking-[0.14em] ${t}`}>{children}</span>;
};
