import React, { useEffect, useMemo, useState } from 'react';
import { Lock, LogOut, ExternalLink, Minus, Plus, ChevronDown, Loader2, CheckCircle2, AlertTriangle, KeyRound } from 'lucide-react';
import {
  BASE_PRODUCTS,
  applyOverrides,
  withVariant,
  type CatalogFile,
  type Product,
  type ProductOverride,
} from '../data/products';
import bundledKey from '../data/admin-key.json';
import { decryptToken, encryptToken, isKeySetUp, type AdminKeyFile } from './crypto';
import { ADMIN_KEY_PATH, CATALOG_PATH, GitHubError, checkAccess, deployState, readFile, writeFile } from './github';

const SESSION_KEY = 'sora_admin_session';

const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;

// ---------------------------------------------------------------------------
// Form model
// ---------------------------------------------------------------------------

interface VariantForm {
  id: string;
  label: string;
  image: string;
  stock: number;
  soldOut: boolean;
}

interface ProductForm {
  id: string;
  name: string;
  image: string;
  price: number;
  isFeatured: boolean;
  unisex: boolean;
  weightGrams: string;
  tagline: string;
  shortDescription: string;
  description: string;
  shape: string;
  frame: string;
  lens: string;
  variants: VariantForm[];
}

const variantState = (product: Product, variantId: string) => {
  const v = product.variants.find((x) => x.id === variantId)!;
  const view = withVariant(product, v);
  return { stock: view.stockQuantity, soldOut: !view.inStock && view.stockQuantity > 0 };
};

const toForm = (p: Product): ProductForm => ({
  id: p.id,
  name: p.name,
  image: p.variants[0]?.image ?? p.images[0],
  price: p.price,
  isFeatured: Boolean(p.isFeatured),
  unisex: Boolean(p.unisex),
  weightGrams: p.weightGrams !== undefined ? String(p.weightGrams) : '',
  tagline: p.tagline,
  shortDescription: p.shortDescription,
  description: p.description,
  shape: p.shape ?? '',
  frame: p.frame ?? '',
  lens: p.lens ?? '',
  variants: p.variants.map((v) => ({
    id: v.id,
    label: v.colorName,
    image: v.image,
    ...variantState(p, v.id),
  })),
});

/** Only what differs from products.ts is saved, so the file stays small and readable. */
const toOverride = (form: ProductForm, base: Product): ProductOverride | undefined => {
  const o: ProductOverride = {};
  if (form.price !== base.price) o.price = form.price;
  if (form.isFeatured !== Boolean(base.isFeatured)) o.isFeatured = form.isFeatured;
  if (form.unisex !== Boolean(base.unisex)) o.unisex = form.unisex;
  const weight = form.weightGrams.trim() === '' ? undefined : Number(form.weightGrams);
  if (weight !== undefined && !Number.isNaN(weight) && weight !== base.weightGrams) o.weightGrams = weight;
  const text = ['tagline', 'shortDescription', 'description', 'shape', 'frame', 'lens'] as const;
  for (const key of text) {
    if (form[key].trim() !== (base[key] ?? '').trim()) o[key] = form[key].trim();
  }
  const variants: NonNullable<ProductOverride['variants']> = {};
  for (const v of form.variants) {
    const was = variantState(base, v.id);
    const vo: { stockQuantity?: number; soldOut?: boolean } = {};
    if (v.stock !== was.stock) vo.stockQuantity = v.stock;
    if (v.soldOut !== was.soldOut) vo.soldOut = v.soldOut;
    if (Object.keys(vo).length) variants[v.id] = vo;
  }
  if (Object.keys(variants).length) o.variants = variants;
  return Object.keys(o).length ? o : undefined;
};

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-[#F5EFE3] text-[#2C211B]">{children}</div>
);

const inputCls =
  'w-full bg-white border border-[#2C211B]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#861F3A] focus:ring-2 focus:ring-[#861F3A]/15';

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="block text-[10px] font-mono-tech font-bold uppercase tracking-wider text-[#6B7055] mb-1">{children}</span>
);

const errorText = (e: unknown) => {
  if (e instanceof GitHubError) {
    if (e.status === 401) return 'GitHub rejected the key. It may have expired. Set up the admin again with a new key.';
    if (e.status === 403 || e.status === 404) return 'This key cannot reach the SORA repo. Check it has Contents: Read and write on sora-final.';
    if (e.status === 409) return 'Someone else saved changes at the same time. Reload the page and try again.';
    return e.message;
  }
  return 'Could not reach GitHub. Check your internet connection.';
};

// ---------------------------------------------------------------------------
// Lock and setup screens
// ---------------------------------------------------------------------------

const LockScreen: React.FC<{ keyFile: AdminKeyFile; onUnlock: (token: string) => void; onSetup: () => void }> = ({ keyFile, onUnlock, onSetup }) => {
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const token = await decryptToken(keyFile, password);
    setBusy(false);
    if (!token) {
      setError('Wrong password.');
      return;
    }
    onUnlock(token);
  };

  return (
    <Shell>
      <div className="min-h-screen flex items-center justify-center px-4">
        <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-2xl border border-[#2C211B]/10 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-1">
            <Lock size={16} className="text-[#861F3A]" />
            <h1 className="font-display text-xl font-black uppercase">SORA Admin</h1>
          </div>
          <p className="text-xs text-[#6B7055] mb-5">Private. For the SORA team only.</p>
          <Label>Password</Label>
          <input
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
          />
          {error && <p className="mt-2 text-xs text-[#861F3A] font-semibold">{error}</p>}
          <button
            type="submit"
            disabled={busy || !password}
            className="mt-4 w-full bg-[#861F3A] hover:bg-[#6b182e] disabled:opacity-50 text-[#F5EFE3] py-2.5 rounded-lg text-xs font-mono-tech font-bold uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            {busy && <Loader2 size={14} className="animate-spin" />}
            {busy ? 'Unlocking' : 'Unlock'}
          </button>
          <button type="button" onClick={onSetup} className="mt-4 w-full text-[11px] text-[#6B7055] underline cursor-pointer">
            Forgot password or key expired? Set up again
          </button>
        </form>
      </div>
    </Shell>
  );
};

const SetupScreen: React.FC<{ onDone: (token: string) => void; onCancel?: () => void }> = ({ onDone, onCancel }) => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 12) return setError('Use at least 12 characters for the password.');
    if (password !== confirm) return setError('The two passwords do not match.');
    setBusy(true);
    try {
      const key = token.trim();
      if (!(await checkAccess(key))) {
        setBusy(false);
        return setError('This GitHub key can read the repo but cannot save to it. Give it Contents: Read and write.');
      }
      const file = await encryptToken(key, password);
      const existing = await readFile(key, ADMIN_KEY_PATH);
      await writeFile(key, ADMIN_KEY_PATH, JSON.stringify(file, null, 2) + '\n', 'Admin: set admin password', existing?.sha);
      onDone(key);
    } catch (err) {
      setError(errorText(err));
    }
    setBusy(false);
  };

  return (
    <Shell>
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <form onSubmit={submit} className="w-full max-w-md bg-white rounded-2xl border border-[#2C211B]/10 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-1">
            <KeyRound size={16} className="text-[#861F3A]" />
            <h1 className="font-display text-xl font-black uppercase">Set up SORA Admin</h1>
          </div>
          <p className="text-xs text-[#6B7055] mb-5 leading-relaxed">
            Paste your GitHub key and choose a password. The key is locked with your password and saved to the
            repo, so after the next update goes live (about 2 minutes) the password works on any device.
          </p>

          <Label>GitHub key (personal access token)</Label>
          <input type="password" value={token} onChange={(e) => setToken(e.target.value)} className={inputCls} placeholder="github_pat_..." autoComplete="off" />

          <div className="mt-4">
            <Label>Choose a password (12+ characters)</Label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} autoComplete="new-password" />
          </div>
          <div className="mt-4">
            <Label>Type it again</Label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} autoComplete="new-password" />
          </div>

          {error && <p className="mt-3 text-xs text-[#861F3A] font-semibold">{error}</p>}

          <button
            type="submit"
            disabled={busy || !token || !password}
            className="mt-5 w-full bg-[#861F3A] hover:bg-[#6b182e] disabled:opacity-50 text-[#F5EFE3] py-2.5 rounded-lg text-xs font-mono-tech font-bold uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            {busy && <Loader2 size={14} className="animate-spin" />}
            {busy ? 'Saving' : 'Save and unlock'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="mt-3 w-full text-[11px] text-[#6B7055] underline cursor-pointer">
              Back to password
            </button>
          )}
        </form>
      </div>
    </Shell>
  );
};

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

type PublishState =
  | { kind: 'idle' }
  | { kind: 'saving' }
  | { kind: 'deploying'; startedAt: number; commitSha: string }
  | { kind: 'live' }
  | { kind: 'unsure' }
  | { kind: 'failed'; message: string };

const ProductEditor: React.FC<{ form: ProductForm; changed: boolean; onChange: (f: ProductForm) => void }> = ({ form, changed, onChange }) => {
  const [open, setOpen] = useState(false);
  const set = <K extends keyof ProductForm>(key: K, value: ProductForm[K]) => onChange({ ...form, [key]: value });
  const setVariant = (id: string, patch: Partial<VariantForm>) =>
    onChange({ ...form, variants: form.variants.map((v) => (v.id === id ? { ...v, ...patch } : v)) });

  return (
    <section className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${changed ? 'border-[#C8A96B]' : 'border-[#2C211B]/10'}`}>
      <div className="p-4 sm:p-5 flex items-start gap-4">
        <img src={form.image} alt="" className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover bg-[#F5EFE3] shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-display text-lg sm:text-xl font-black uppercase">{form.name}</h2>
            {changed && <span className="text-[9px] font-mono-tech font-bold uppercase bg-[#C8A96B]/25 text-[#2C211B] px-1.5 py-0.5 rounded">Unsaved</span>}
          </div>
          <div className="mt-2 flex flex-wrap items-end gap-4">
            <label className="block">
              <Label>Price (₹)</Label>
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={form.price}
                onChange={(e) => set('price', Math.max(0, Number(e.target.value) || 0))}
                className={`${inputCls} w-28`}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Stock per colour */}
      <div className="border-t border-[#2C211B]/10 divide-y divide-[#2C211B]/5">
        {form.variants.map((v) => {
          const sold = v.soldOut || v.stock === 0;
          return (
            <div key={v.id} className="px-4 sm:px-5 py-3 flex items-center gap-3 flex-wrap">
              <img src={v.image} alt="" className="w-10 h-10 rounded-md object-cover bg-[#F5EFE3]" />
              <div className="flex-1 min-w-[120px]">
                <div className="text-sm font-semibold">{v.label}</div>
                <div className={`text-[11px] font-mono-tech ${sold ? 'text-[#861F3A]' : 'text-[#6B7055]'}`}>
                  {sold ? 'Shows as SOLD OUT' : v.stock <= 2 ? `Shows "Only ${v.stock} left"` : 'In stock'}
                </div>
              </div>
              <div className="flex items-center border border-[#2C211B]/15 rounded-lg overflow-hidden">
                <button type="button" onClick={() => setVariant(v.id, { stock: Math.max(0, v.stock - 1) })} className="w-9 h-9 flex items-center justify-center hover:bg-[#F5EFE3] cursor-pointer" aria-label="One less">
                  <Minus size={14} />
                </button>
                <input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={v.stock}
                  onChange={(e) => setVariant(v.id, { stock: Math.max(0, Math.floor(Number(e.target.value) || 0)) })}
                  className="w-14 h-9 text-center text-sm font-bold border-x border-[#2C211B]/15 focus:outline-none"
                  aria-label={`${v.label} stock`}
                />
                <button type="button" onClick={() => setVariant(v.id, { stock: v.stock + 1 })} className="w-9 h-9 flex items-center justify-center hover:bg-[#F5EFE3] cursor-pointer" aria-label="One more">
                  <Plus size={14} />
                </button>
              </div>
              <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                <input type="checkbox" checked={v.soldOut} onChange={(e) => setVariant(v.id, { soldOut: e.target.checked })} className="accent-[#861F3A] w-4 h-4" />
                Mark sold out
              </label>
            </div>
          );
        })}
      </div>

      {/* Details and text */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border-t border-[#2C211B]/10 px-4 sm:px-5 py-3 flex items-center justify-between text-xs font-mono-tech font-bold uppercase text-[#6B7055] hover:bg-[#FAF7F0] cursor-pointer"
      >
        Details and description
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 sm:px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block sm:col-span-2">
            <Label>Tagline</Label>
            <input value={form.tagline} onChange={(e) => set('tagline', e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <Label>Shape</Label>
            <input value={form.shape} onChange={(e) => set('shape', e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <Label>Frame</Label>
            <input value={form.frame} onChange={(e) => set('frame', e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <Label>Lens</Label>
            <input value={form.lens} onChange={(e) => set('lens', e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <Label>Weight (grams)</Label>
            <input type="number" min={0} inputMode="numeric" value={form.weightGrams} onChange={(e) => set('weightGrams', e.target.value)} className={inputCls} />
          </label>
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input type="checkbox" checked={form.unisex} onChange={(e) => set('unisex', e.target.checked)} className="accent-[#861F3A] w-4 h-4" />
            Show "Unisex"
          </label>
          <label className="block sm:col-span-2">
            <Label>Short description</Label>
            <textarea rows={3} value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} className={inputCls} />
          </label>
          <label className="block sm:col-span-2">
            <Label>Full description (leave an empty line between paragraphs)</Label>
            <textarea rows={9} value={form.description} onChange={(e) => set('description', e.target.value)} className={inputCls} />
          </label>
        </div>
      )}
    </section>
  );
};

const Dashboard: React.FC<{ token: string; onLock: () => void }> = ({ token, onLock }) => {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [sha, setSha] = useState<string | undefined>();
  const [saved, setSaved] = useState<ProductForm[]>([]);
  const [forms, setForms] = useState<ProductForm[]>([]);
  const [publish, setPublish] = useState<PublishState>({ kind: 'idle' });

  // Load the latest saved catalog straight from GitHub (not the possibly older copy in this page).
  useEffect(() => {
    (async () => {
      try {
        const file = await readFile(token, CATALOG_PATH);
        const catalog: CatalogFile = file ? JSON.parse(file.text) : { updatedAt: null, products: {} };
        const initial = BASE_PRODUCTS.map((p) => toForm(applyOverrides(p, catalog.products[p.id])));
        setSha(file?.sha);
        setSaved(initial);
        setForms(initial);
      } catch (e) {
        setLoadError(errorText(e));
      }
      setLoading(false);
    })();
  }, [token]);

  const changedIds = useMemo(
    () => new Set(forms.filter((f, i) => JSON.stringify(f) !== JSON.stringify(saved[i])).map((f) => f.id)),
    [forms, saved]
  );

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!changedIds.size) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [changedIds.size]);

  // Follow the Vercel build after saving.
  useEffect(() => {
    if (publish.kind !== 'deploying') return;
    const timer = setInterval(async () => {
      try {
        const state = await deployState(token, publish.commitSha);
        if (state === 'success') setPublish({ kind: 'live' });
        else if (state === 'failure' || state === 'error') setPublish({ kind: 'failed', message: 'The website update failed on Vercel. Your changes are saved in GitHub; check the Vercel dashboard.' });
        else if (Date.now() - publish.startedAt > 5 * 60_000) setPublish({ kind: 'unsure' });
      } catch {
        // try again next tick
      }
    }, 10_000);
    return () => clearInterval(timer);
  }, [publish, token]);

  const save = async () => {
    setPublish({ kind: 'saving' });
    try {
      const products: CatalogFile['products'] = {};
      forms.forEach((f) => {
        const base = BASE_PRODUCTS.find((p) => p.id === f.id)!;
        const o = toOverride(f, base);
        if (o) products[f.id] = o;
      });
      const catalog: CatalogFile = { updatedAt: new Date().toISOString(), products };
      const names = forms.filter((f) => changedIds.has(f.id)).map((f) => f.name).join(', ');
      const out = await writeFile(token, CATALOG_PATH, JSON.stringify(catalog, null, 2) + '\n', `Admin: update ${names}`, sha);
      setSha(out.fileSha);
      setSaved(forms);
      setPublish({ kind: 'deploying', startedAt: Date.now(), commitSha: out.commitSha });
    } catch (e) {
      setPublish({ kind: 'failed', message: errorText(e) });
    }
  };

  const totalUnits = forms.reduce((sum, f) => sum + f.variants.reduce((s, v) => s + (v.soldOut ? 0 : v.stock), 0), 0);

  return (
    <Shell>
      <header className="sticky top-0 z-20 bg-[#2C211B] text-[#F5EFE3]">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-lg">SORA</span>
            <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#C8A96B]">Admin</span>
          </div>
          <div className="flex items-center gap-1">
            <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-mono-tech uppercase px-3 py-2 rounded-lg hover:bg-white/10">
              <ExternalLink size={13} /> <span className="hidden sm:inline">View site</span>
            </a>
            <button type="button" onClick={onLock} className="flex items-center gap-1.5 text-[11px] font-mono-tech uppercase px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer">
              <LogOut size={13} /> Lock
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6 pb-32">
        <h1 className="font-display text-2xl sm:text-3xl font-black uppercase">Products and stock</h1>
        <p className="mt-1 text-xs text-[#6B7055] leading-relaxed max-w-2xl">
          Change anything below, then press Save and publish. The live website updates for everyone in about 1 to 2 minutes.
          Remember to lower the stock here when an order comes in on WhatsApp.
        </p>

        {loading && (
          <div className="mt-10 flex items-center gap-2 text-sm text-[#6B7055]">
            <Loader2 size={16} className="animate-spin" /> Loading the latest data
          </div>
        )}
        {loadError && (
          <div className="mt-6 p-4 rounded-xl bg-[#861F3A]/10 text-[#861F3A] text-sm font-semibold flex gap-2">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" /> {loadError}
          </div>
        )}

        {!loading && !loadError && (
          <>
            <p className="mt-4 text-[11px] font-mono-tech uppercase text-[#6B7055]">
              {forms.length} frames · {totalUnits} units available
            </p>
            <div className="mt-3 space-y-4">
              {forms.map((f, i) => (
                <ProductEditor
                  key={f.id}
                  form={f}
                  changed={changedIds.has(f.id)}
                  onChange={(next) => setForms((all) => all.map((x, j) => (j === i ? next : x)))}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Save bar */}
      {!loading && !loadError && (
        <div className="fixed bottom-0 inset-x-0 z-20 bg-white/95 backdrop-blur border-t border-[#2C211B]/10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="flex-1 text-xs leading-snug">
              {publish.kind === 'saving' && <span className="flex items-center gap-1.5"><Loader2 size={13} className="animate-spin" /> Saving</span>}
              {publish.kind === 'deploying' && (
                <span className="flex items-center gap-1.5 text-[#6B7055]"><Loader2 size={13} className="animate-spin" /> Saved. Updating the live website, about 1 to 2 minutes.</span>
              )}
              {publish.kind === 'live' && <span className="flex items-center gap-1.5 text-[#3F6B3A] font-semibold"><CheckCircle2 size={14} /> Live on the website now.</span>}
              {publish.kind === 'unsure' && <span className="text-[#6B7055]">Saved. Open the website to check it has updated.</span>}
              {publish.kind === 'failed' && <span className="text-[#861F3A] font-semibold">{publish.message}</span>}
              {publish.kind === 'idle' && (
                <span className="text-[#6B7055]">{changedIds.size ? `${changedIds.size} frame${changedIds.size > 1 ? 's' : ''} changed` : 'No changes'}</span>
              )}
              {publish.kind !== 'idle' && publish.kind !== 'saving' && changedIds.size > 0 && (
                <span className="block text-[#6B7055]">{changedIds.size} more unsaved</span>
              )}
            </div>
            {changedIds.size > 0 && (
              <button type="button" onClick={() => setForms(saved)} className="text-[11px] font-mono-tech uppercase text-[#6B7055] underline px-2 cursor-pointer">
                Undo
              </button>
            )}
            <button
              type="button"
              onClick={save}
              disabled={!changedIds.size || publish.kind === 'saving'}
              className="bg-[#861F3A] hover:bg-[#6b182e] disabled:opacity-40 text-[#F5EFE3] px-4 py-2.5 rounded-lg text-xs font-mono-tech font-bold uppercase cursor-pointer whitespace-nowrap"
            >
              Save and publish
            </button>
          </div>
        </div>
      )}
    </Shell>
  );
};

// ---------------------------------------------------------------------------
// Entry
// ---------------------------------------------------------------------------

const AdminApp: React.FC = () => {
  const keyFile = bundledKey as AdminKeyFile;
  const [token, setToken] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY);
    } catch {
      return null;
    }
  });
  const [setup, setSetup] = useState(!isKeySetUp(keyFile));

  useEffect(() => {
    document.title = 'Admin | SORA';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const unlock = (t: string) => {
    try {
      sessionStorage.setItem(SESSION_KEY, t);
    } catch {
      // stays unlocked until the tab closes
    }
    setSetup(false);
    setToken(t);
  };

  const lock = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
    setToken(null);
  };

  if (token) return <Dashboard token={token} onLock={lock} />;
  if (setup) return <SetupScreen onDone={unlock} onCancel={isKeySetUp(keyFile) ? () => setSetup(false) : undefined} />;
  return <LockScreen keyFile={keyFile} onUnlock={unlock} onSetup={() => setSetup(true)} />;
};

export default AdminApp;
