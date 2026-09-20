import { Link } from "react-router-dom";

export function SectionHeading({ title, cta }: { title: string; cta?: { label: string; to: string } }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
      <h2 className="t-display text-[clamp(2.25rem,4.6vw,3.75rem)]">{title}</h2>
      {cta && <Link to={cta.to} className="t-label shrink-0 border-b border-champagne pb-1.5 transition-colors hover:border-espresso">{cta.label}</Link>}
    </div>
  );
}
