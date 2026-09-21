import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { NAV, SITE } from "@/data/siteContent";
import { useCart } from "@/store/cart";
import { Logo } from "@/components/ui/Logo";
import { SearchPanel } from "./SearchPanel";

const MOBILE_LINKS = [...NAV, { label: "FAQ", to: "/faq" }, { label: "Shipping & Returns", to: "/shipping-returns" }];

export function Header() {
  const { count } = useCart();
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => { setMenu(false); setSearch(false); }, [pathname]);
  useEffect(() => {
    if (!menu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [menu]);

  const icon = "grid h-11 w-11 place-items-center transition-opacity hover:opacity-60";

  return (
    <>
      <header className="sticky top-[env(safe-area-inset-top,0px)] z-50 border-b hairline bg-ivory/[.93] backdrop-blur-md">
        <div className="wrap grid h-[4.5rem] grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center">
            <button className={`${icon} -ml-3 md:hidden`} aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => { setMenu((m) => !m); setSearch(false); }}>
              {menu ? <X strokeWidth={1.2} className="h-6 w-6" /> : <Menu strokeWidth={1.2} className="h-6 w-6" />}
            </button>
            <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) => `t-label border-b pb-1 transition-colors ${isActive ? "border-champagne" : "border-transparent hover:border-espresso/40"}`}
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <Link to="/" aria-label="SORA — home" className="justify-self-center py-2"><Logo className="h-[1.55rem] md:h-[1.75rem]" /></Link>

          <div className="flex items-center justify-end">
            <button className={icon} aria-label="Search" aria-expanded={search} onClick={() => { setSearch((s) => !s); setMenu(false); }}>
              <Search strokeWidth={1.2} className="h-[1.3rem] w-[1.3rem]" />
            </button>
            <Link to="/cart" className={`${icon} relative -mr-2.5`} aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}>
              <ShoppingBag strokeWidth={1.2} className="h-[1.3rem] w-[1.3rem]" />
              {count > 0 && (
                <span className="absolute right-1 top-1.5 grid h-[1.05rem] min-w-[1.05rem] place-items-center rounded-full bg-espresso px-1 text-[0.625rem] font-medium leading-none text-ivory">{count}</span>
              )}
            </Link>
          </div>
        </div>

        {search && <SearchPanel onClose={() => setSearch(false)} />}
      </header>

      {menu && (
        <nav
          className="anim-drawer fixed inset-x-0 bottom-0 top-[calc(4.5rem+1px+env(safe-area-inset-top,0px))] z-40 flex flex-col justify-between overflow-y-auto bg-ivory px-6 pb-10 pt-8 md:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-1">
            {MOBILE_LINKS.map((n) => (
              <li key={n.to} className="border-b hairline">
                <Link to={n.to} className="t-display block py-4 text-[2.1rem]">{n.label}</Link>
              </li>
            ))}
          </ul>
          <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="t-label mt-10 self-start border-b border-champagne pb-1">INSTAGRAM</a>
        </nav>
      )}
    </>
  );
}