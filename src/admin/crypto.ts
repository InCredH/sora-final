// The GitHub key is stored in the repo only in encrypted form. It can only be
// unlocked with the admin password, which is never stored anywhere.

export interface AdminKeyFile {
  v: number;
  salt: string;
  iv: string;
  data: string;
}

const ITERATIONS = 600_000;

const b64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));
const unb64 = (text: string) => Uint8Array.from(atob(text), (c) => c.charCodeAt(0));

const deriveKey = async (password: string, salt: Uint8Array) => {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: salt as BufferSource, iterations: ITERATIONS, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
};

export const isKeySetUp = (file: AdminKeyFile) => Boolean(file.data && file.salt && file.iv);

export const encryptToken = async (token: string, password: string): Promise<AdminKeyFile> => {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const data = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(token)));
  return { v: 1, salt: b64(salt), iv: b64(iv), data: b64(data) };
};

/** Returns the GitHub key, or null if the password is wrong. */
export const decryptToken = async (file: AdminKeyFile, password: string): Promise<string | null> => {
  try {
    const key = await deriveKey(password, unb64(file.salt));
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(file.iv) as BufferSource }, key, unb64(file.data) as BufferSource);
    return new TextDecoder().decode(plain);
  } catch {
    return null;
  }
};
