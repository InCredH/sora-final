# SORA — storefront + admin

React · TypeScript · Tailwind CSS v4 · Vite

```bash
npm install
npm run dev            # http://localhost:5173  (admin at /admin)
npm run build          # production build → dist/ (clean URLs; needs SPA fallback, see public/_redirects)
npm run build:preview  # single self-contained HTML file with hash URLs (#/admin)
```

## Admin
- URL: `/admin` (never linked from the public site, `noindex`, listed as `Disallow` in robots.txt)
- Demo passcode: `sora-admin`
- Change it: `VITE_ADMIN_PASSCODE_HASH=$(printf 'your-passcode' | shasum -a 256 | cut -d' ' -f1) npm run build`

> ⚠️ The passcode gate is a **placeholder**. A static front-end cannot keep a secret. Before real launch, move
> products + auth to a backend (Supabase / Firebase / your API) and implement `AuthService` and `ProductRepository`.

## Where things live
```
src/
  types/product.ts            ← the one Product shape
  data/seedProducts.ts        ← demo catalogue (placeholders)
  data/siteContent.ts         ← editable public copy: hero, campaign block, FAQ, shipping, contact…
  data/assets.ts              ← bundled placeholder imagery (cropped from the mood board) + logo
  services/productRepository  ← persistence boundary (localStorage today → swap for an API)
  services/authService        ← admin gate (placeholder)
  services/paymentProvider    ← Razorpay / UPI / COD placeholders
  store/productStore          ← centralised product store (public + admin both use it)
  lib/pricing.ts inventory.ts ← sale + stock rules in one place
  pages/public/*  pages/admin/*  components/*
```

## Business rules (all derived from product data)
- Sold out: `inventoryQuantity = 0` **or** "Mark as sold out" → SOLD OUT badge, Add to cart / Buy now disabled
- Low stock: `inventoryQuantity <= lowStockThreshold`
- Sale: shown when **On sale** is on and `salePrice < price`; discount % is calculated automatically
- Cover image = first image; reorder by drag or arrows

## Before launch
- Replace placeholder imagery (`src/assets/img`) and demo products with real ones
- Fill `SITE.contact`, `SITE.instagramUrl`, FAQ, Shipping & Returns, Privacy, Terms in `siteContent.ts`
- Connect a database (products/orders) and real auth; add a payment provider
