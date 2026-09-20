import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { authService } from "@/services/authService";

interface AuthApi {
  isAuthed: boolean;
  login: (passcode: string) => Promise<boolean>;
  logout: () => void;
}
const Ctx = createContext<AuthApi | null>(null);
export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside <AuthProvider>");
  return c;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setAuthed] = useState(() => authService.isSessionActive());
  const login = useCallback(async (passcode: string) => {
    const ok = await authService.verify(passcode);
    if (ok) { authService.startSession(); setAuthed(true); }
    return ok;
  }, []);
  const logout = useCallback(() => { authService.endSession(); setAuthed(false); }, []);
  const value = useMemo(() => ({ isAuthed, login, logout }), [isAuthed, login, logout]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
