import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, LogOut, Menu, Package, Plus, X, ExternalLink } from "lucide-react";
import { useAuth } from "@/store/auth";
import { useNoIndex } from "@/hooks/usePageMeta";
import { Logo } from "@/components/ui/Logo";
import AdminLogin from "./AdminLogin";

export default function AdminLayout() {
  useNoIndex();
  const { isAuthed, logout } = useAuth();
  const [open, setOpen] = useState(false);
  if (!isAuthed) return <AdminLogin />;

  const item = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 text-[0.875rem] transition-colors ${isActive ? "bg-espresso text-ivory" : "hover:bg-espresso/8"}`;

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 p-4" onClick={() => setOpen(false)}>
      <Link to="/admin/products/new" className="t-label mb-4 flex items-center justify-center gap-2 border border-olive bg-olive px-4 py-3.5 text-ivory hover:bg-espresso hover:border-espresso"><Plus strokeWidth={1.5} className="h-4 w-4" /> ADD PRODUCT</Link>
      <NavLink to="/admin" end className={item}><LayoutDashboard strokeWidth={1.3} className="h-[1.1rem] w-[1.1rem]" /> Overview</NavLink>
      <NavLink to="/admin/products" className={item}><Package strokeWidth={1.3} className="h-[1.1rem] w-[1.1rem]" /> Products</NavLink>
      <div className="mt-auto space-y-1 border-t hairline pt-4">
        <Link to="/" className="flex items-center gap-3 px-4 py-3 text-[0.875rem] hover:bg-espresso/8"><ExternalLink strokeWidth={1.3} className="h-[1.1rem] w-[1.1rem]" /> View website</Link>
        <button onClick={logout} className="flex w-full items-center gap-3 px-4 py-3 text-left text-[0.875rem] hover:bg-espresso/8"><LogOut strokeWidth={1.3} className="h-[1.1rem] w-[1.1rem]" /> Sign out</button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-[100svh] bg-ivory lg:grid lg:grid-cols-[15.5rem_1fr]">
      <aside className="sticky top-0 z-30 hidden h-[100svh] flex-col border-r hairline bg-ivory-deep/60 lg:flex">
        <div className="border-b hairline px-6 py-6"><Logo className="h-6" /><p className="t-label mt-2 text-[0.5625rem] text-espresso/55">ADMIN</p></div>
        {nav}
      </aside>

      <div className="sticky top-0 z-30 flex items-center justify-between border-b hairline bg-ivory px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3"><Logo className="h-5" /><span className="t-label text-[0.5625rem] text-espresso/55">ADMIN</span></div>
        <button onClick={() => setOpen((o) => !o)} aria-label="Menu" className="grid h-10 w-10 place-items-center">{open ? <X strokeWidth={1.3} className="h-6 w-6" /> : <Menu strokeWidth={1.3} className="h-6 w-6" />}</button>
      </div>
      {open && <div className="anim-drawer fixed inset-x-0 bottom-0 top-[3.5rem] z-20 flex flex-col bg-ivory lg:hidden">{nav}</div>}

      <main className="min-w-0 px-4 py-8 md:px-10 md:py-12"><Outlet /></main>
    </div>
  );
}
