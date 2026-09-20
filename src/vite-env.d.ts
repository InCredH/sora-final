/// <reference types="vite/client" />
interface ImportMetaEnv {
  /** SHA-256 hex of the admin passcode. Replace before going live (see README). */
  readonly VITE_ADMIN_PASSCODE_HASH?: string;
}
