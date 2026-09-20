import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface Toast { id: number; message: string; action?: { label: string; to: string } }
interface ToastApi { show: (message: string, action?: Toast["action"]) => void }

const Ctx = createContext<ToastApi>({ show: () => {} });
export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<number>();

  const show = useCallback((message: string, action?: Toast["action"]) => {
    window.clearTimeout(timer.current);
    setToast({ id: Date.now(), message, action });
    timer.current = window.setTimeout(() => setToast(null), 4200);
  }, []);

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] flex justify-center px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
        {toast && (
          <div key={toast.id} className="anim-pop pointer-events-auto flex items-center gap-5 bg-espresso px-5 py-3.5 text-ivory shadow-[0_10px_30px_-12px_rgba(44,33,27,.5)]">
            <span className="text-[0.8125rem] tracking-wide">{toast.message}</span>
            {toast.action && (
              <Link to={toast.action.to} onClick={() => setToast(null)} className="t-label border-b border-champagne pb-0.5 text-champagne">
                {toast.action.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </Ctx.Provider>
  );
}
