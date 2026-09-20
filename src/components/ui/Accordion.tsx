import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";

export function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-b hairline">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-6 py-5 text-left"
        >
          <span className="font-display text-[1.2rem] leading-snug md:text-[1.35rem]">{title}</span>
          <Plus strokeWidth={1.2} className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
        </button>
      </h3>
      <div id={id} role="region" className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="pb-6 pr-10 text-[0.9375rem] leading-[1.8] text-espresso/80">{children}</div>
        </div>
      </div>
    </div>
  );
}
