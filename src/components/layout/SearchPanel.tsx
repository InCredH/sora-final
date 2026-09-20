import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { getPrimaryImageSrc, matchesQuery } from "@/lib/product";
import { Price } from "@/components/ui/Price";

export function SearchPanel({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const { visible } = useProducts();
  const navigate = useNavigate();
  const input = useRef<HTMLInputElement>(null);
  const results = q.trim() ? visible.filter((p) => matchesQuery(p, q)) : [];

  useEffect(() => {
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(q.trim())}`);
    onClose();
  };

  return (
    <div className="anim-drawer absolute inset-x-0 top-full border-b hairline bg-ivory">
      <div className="wrap py-6 md:py-9">
        <form onSubmit={submit} className="flex items-center gap-4 border-b border-espresso pb-3" role="search">
          <Search strokeWidth={1.2} className="h-5 w-5 shrink-0" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, SKU or category"
            aria-label="Search products"
            className="min-w-0 flex-1 bg-transparent font-display text-xl outline-none placeholder:text-espresso/40 md:text-3xl"
          />
          <button type="button" onClick={onClose} aria-label="Close search"><X strokeWidth={1.2} className="h-5 w-5" /></button>
        </form>

        {q.trim() && (
          <div className="mt-6">
            {results.length === 0 ? (
              <p className="py-6 text-[0.9375rem] text-espresso/70">No products found.</p>
            ) : (
              <>
                <ul className="grid gap-x-8 gap-y-2 md:grid-cols-2">
                  {results.slice(0, 6).map((p) => (
                    <li key={p.id}>
                      <Link to={`/product/${p.slug}`} onClick={onClose} className="flex items-center gap-4 py-2 transition-colors hover:text-olive">
                        <img src={getPrimaryImageSrc(p)} alt="" className="h-16 w-14 border hairline object-cover" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display text-lg">{p.name}</span>
                          <span className="t-label block text-[0.625rem] text-espresso/55">{p.category} · {p.sku}</span>
                        </span>
                        <Price product={p} />
                      </Link>
                    </li>
                  ))}
                </ul>
                <button onClick={submit} className="t-label mt-5 border-b border-champagne pb-1">VIEW ALL {results.length} RESULT{results.length > 1 ? "S" : ""}</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
