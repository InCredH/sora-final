import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/store/auth";
import { Logo } from "@/components/ui/Logo";
import { AButton } from "@/components/admin/ui";

export default function AdminLogin() {
  const { login } = useAuth();
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [fails, setFails] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);
  const [, tick] = useState(0);

  useEffect(() => {
    if (!lockedUntil) return;
    const t = window.setInterval(() => { tick((n) => n + 1); if (Date.now() >= lockedUntil) { setLockedUntil(0); setFails(0); } }, 500);
    return () => window.clearInterval(t);
  }, [lockedUntil]);

  const locked = lockedUntil > Date.now();
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (locked || !pass) return;
    setBusy(true); setError("");
    try {
      const ok = await login(pass);
      if (!ok) {
        const n = fails + 1;
        setFails(n);
        setError("That passcode isn't right.");
        if (n >= 5) { setLockedUntil(Date.now() + 30_000); setError("Too many attempts. Try again in 30 seconds."); }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally { setBusy(false); }
  };

  return (
    <div className="grid min-h-[100svh] place-items-center bg-ivory px-5">
      <form onSubmit={submit} className="w-full max-w-sm border hairline bg-white/50 p-8 md:p-10">
        <Logo className="mx-auto block h-8" />
        <h1 className="mt-8 text-center font-display text-2xl">Admin sign in</h1>
        <label htmlFor="pass" className="mb-1.5 mt-8 block text-[0.8125rem] font-medium">Passcode</label>
        <input id="pass" type="password" autoComplete="current-password" autoFocus value={pass} onChange={(e) => setPass(e.target.value)} className="field" aria-invalid={!!error} />
        {error && <p role="alert" className="mt-2 text-xs text-burgundy">{error}</p>}
        <AButton type="submit" className="mt-6 w-full" disabled={busy || locked || !pass}>{busy ? "CHECKING…" : "SIGN IN"}</AButton>
        <Link to="/" className="t-label mt-6 block text-center text-[0.625rem] text-espresso/55 hover:text-espresso">BACK TO WEBSITE</Link>
      </form>
    </div>
  );
}
