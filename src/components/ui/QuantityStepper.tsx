import { Minus, Plus } from "lucide-react";

export function QuantityStepper({ value, onChange, min = 1, max = 99, label = "Quantity" }: { value: number; onChange: (n: number) => void; min?: number; max?: number; label?: string }) {
  const btn = "grid h-11 w-11 place-items-center transition-colors hover:bg-espresso hover:text-ivory disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-espresso";
  return (
    <div className="inline-flex items-center border border-espresso/30" role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Decrease quantity">
        <Minus strokeWidth={1.3} className="h-4 w-4" />
      </button>
      <span className="w-10 text-center text-sm font-medium tabular-nums" aria-live="polite">{value}</span>
      <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Increase quantity">
        <Plus strokeWidth={1.3} className="h-4 w-4" />
      </button>
    </div>
  );
}
