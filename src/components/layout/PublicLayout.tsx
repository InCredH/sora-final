import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export function PublicLayout() {
  return (
    <>
      <a href="#main" className="t-label sr-only z-[90] bg-espresso px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to content</a>
      <ScrollToTop />
      <Header />
      <main id="main" className="min-h-[70svh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
