import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { FOOTER_NAV, SITE } from "@/data/siteContent";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const col = "t-label text-[0.625rem] text-ivory/50";
  const link = "block py-1.5 text-[0.875rem] text-ivory/85 transition-colors hover:text-champagne";
  return (
    <footer className="bg-espresso text-ivory">
      <div className="wrap grid gap-14 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <Logo className="h-14 md:h-[4.25rem]" />
          <p className="t-label mt-6 text-[0.625rem] tracking-[0.45em] text-ivory/70">{SITE.tagline}</p>
        </div>
        <nav className="md:col-span-3 md:col-start-7" aria-label="Footer">
          <p className={col}>Navigate</p>
          <ul className="mt-4">
            {FOOTER_NAV.map((n) => <li key={n.label}><Link to={n.to} className={link}>{n.label}</Link></li>)}
          </ul>
        </nav>
        <div className="grid grid-cols-2 gap-10 md:col-span-3 md:grid-cols-1 md:gap-8">
          <div>
            <p className={col}>Social</p>
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className={`${link} mt-4 flex items-center gap-2.5`}>
              <Instagram strokeWidth={1.2} className="h-4 w-4" /> Instagram
            </a>
          </div>
          <div>
            <p className={col}>Legal</p>
            <ul className="mt-4">
              <li><Link to="/privacy" className={link}>Privacy Policy</Link></li>
              <li><Link to="/terms" className={link}>Terms &amp; Conditions</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-ivory/15">
        <div className="wrap py-6 text-[0.75rem] tracking-wide text-ivory/55">© {new Date().getFullYear()} SORA. All rights reserved.</div>
      </div>
    </footer>
  );
}
