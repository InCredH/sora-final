/**
 * ⚠️  PLACEHOLDER admin gate.
 * A static front-end cannot keep a password secret — anyone who can load the site
 * can read this code. It keeps the admin out of casual reach and out of navigation,
 * but before real customers/real data: move products + auth to a backend
 * (Supabase Auth, Firebase Auth, Clerk, or your own API) and implement `AuthService` there.
 *
 * Demo passcode: "sora-admin". Replace it by building with
 *   VITE_ADMIN_PASSCODE_HASH=<sha256 hex of your passcode>
 */
const DEFAULT_HASH = "892ef7c4c5eff58f5d25726b7fe53ad6657bb86a530bceebc9c3a1f751bd2710";
const EXPECTED = (import.meta.env.VITE_ADMIN_PASSCODE_HASH as string | undefined) || DEFAULT_HASH;
const SESSION_KEY = "sora:admin-session";
const SESSION_MS = 8 * 60 * 60 * 1000;

export interface AuthService {
  verify(passcode: string): Promise<boolean>;
  isSessionActive(): boolean;
  startSession(): void;
  endSession(): void;
}

async function sha256(input: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const authService: AuthService = {
  async verify(passcode) {
    if (!crypto?.subtle) throw new Error("A secure (https) connection is required to sign in.");
    return (await sha256(passcode.trim())) === EXPECTED;
  },
  isSessionActive() {
    try {
      const t = Number(sessionStorage.getItem(SESSION_KEY));
      return Boolean(t) && Date.now() - t < SESSION_MS;
    } catch { return false; }
  },
  startSession() {
    try { sessionStorage.setItem(SESSION_KEY, String(Date.now())); } catch { /* ignore */ }
  },
  endSession() {
    try { sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
  },
};
