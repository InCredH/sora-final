# SORA — Luxury Eyewear Maison

> **"See Beyond Ordinary."** — A world-class contemporary luxury eyewear e-commerce flagship built from scratch for **SORA**.

An avant-garde digital storefront blending futuristic Japanese titanium metallurgy and Italian bio-acetate craftsmanship with high-contrast fashion editorial aesthetics.

---

## ✦ Creative Vision & Design Signature

- **Art Direction**: Deep Obsidian (`#08080a`), Graphite (`#121216`), Liquid Chrome & Metallic Silver gradients, Warm Ivory/Flax accents.
- **Typography**: 
  - **Syne** — Avant-garde sculptural luxury display typography.
  - **Plus Jakarta Sans** — Crisp, modern geometric body typography.
  - **Cormorant Garamond** — Editorial haute-couture quotes & italics.
  - **Space Mono** — Technical frame specifications, coordinates, and telemetry metadata.
- **Atmosphere**: Glassmorphic elevated panels (`backdrop-blur-xl`), subtle radial glow effects, precision chamfers, and smooth transitions.

---

## ✦ Core Implemented Architecture & Features

### 1. Cinematic Hero Opening
- Full-viewport opening with high-contrast campaign imagery.
- SORA architectural wordmark with `MAISON OPTIQUE` subscript.
- Editorial telemetry stamps: `SORA ARCHIVE // EDITORIAL SS-26` & `LAT 35.6762° N // SABAE JAPAN`.
- Oversized headline: **"SEE BEYOND ORDINARY."** with liquid chrome gradient reflection.
- Interactive floating runway frame plaque with quick-inspection and virtual try-on trigger.
- Dual CTAs: `SHOP EYEWEAR` and `EXPLORE COLLECTION`.

### 2. Immersive Scroll Narrative
- **Brand Statement**: Oversized typographic manifesto expressing SORA's philosophy of form and facial asymmetry.
- **Featured Collection**: Responsive product grid with category filters (Bio-Acetate, Titanium, Shields) and instant finish swatches.
- **The Campaign ("Chroma Noir")**: Full-width runway lookbook featuring **interactive shoppable hotspots** on fashion models with instant quick-add.
- **Explore The Architecture**: Bento collection tiles for Aerospace Titanium, Organic Bio-Acetate, Monolithic Visors, and Numbered Collectibles.
- **The Product Wall**: Asymmetric magazine layout with large hero spotlight and staggered frames.
- **Shop The Look**: Curated lifestyle curations (Tokyo Street vs. Mediterranean Sun) with direct shoppable frame panels.
- **Brand Manifesto**: The 4 pillars of SORA craft (Sabae Metallurgy, Mazzucchelli Bio-Cellulose, Monoblock Hinges, Carl Zeiss Optics).
- **Patron Appraisals & Trust**: Verified customer reviews with city tags, purchase badges, and clickable policy guarantees.
- **Newsletter & Footer**: Privé VIP subscription with instant feedback, full sitemap, legal links, and currency toggle.

### 3. Complete Product Catalogue (`ShopPage`)
- Responsive multi-facet filtering:
  - **Category**: Titanium, Bio-Acetate, Shield & Rimless, Limited Edition, Accessories.
  - **Shape**: Rectangular, Square, Aviator, Geometric, Cat-Eye, Shield.
  - **In-Stock Only** filter.
- Dynamic sorting: Featured, Price Low-High, Price High-Low, Highest Rated.
- Layout Density Switcher: Editorial 2/3-Column vs. High-Density 4-Column view.
- Active filter pills with one-click reset and live silhouette count.
- Mobile filter drawer with slide-over backdrop.

### 4. High-End Product Detail Experience (`ProductDetailPage`)
- Multi-angle high-resolution gallery with thumbnail switcher and zoom viewport.
- Colorway variant switcher that updates the preview photo dynamically.
- Live batch inventory indicator (e.g. *"Only 4 frames remaining in batch"*).
- Quantity stepper + Add to Bag button with instant toast feedback.
- Technical dimension tabs: Frame Width, Lens Width, Bridge Gap, Temple Length, Total Weight, and Hinge Structure.
- Materials breakdown: Carl Zeiss CR-39 / Polyamide, 100% UV400, Grade 4 Pure Titanium.
- Unboxing overview: Natural flax linen pouch & rigid olive presentation monolith.
- Complementary silhouettes recommendation carousel.

### 5. Interactive Concierge Shopping Functionality
- **Persistent Cart Drawer**:
  - Live item count badge in navbar.
  - Quantity steppers and instant item removal.
  - Free insured shipping progress indicator (Threshold: ₹3,000).
  - Promo code validation system (Supports `SORA10` for 10% privilege discount and `FLAGSHIP` for ₹500 discount).
  - Multi-currency conversion: **INR (₹)**, **USD ($)**, and **EUR (€)**.
  - Persistent in `localStorage` across refreshes.
- **Concierge Checkout Modal**:
  - Multi-step client acquisition flow (Client Details -> Logistics -> Payment Mode).
  - Step-by-step progress tracking with real-time order review summary.
  - Honest demonstration disclosure banner.
  - Order confirmation receipt with custom reference ID (e.g. `SORA-MAISON-857710`).
- **Instant Search Modal**:
  - Global `⌘K` or `Ctrl+K` keyboard shortcut listener.
  - Real-time autocomplete searching names, categories, shapes, and descriptions.
  - Quick trending search tags.
- **Virtual Fit & Proportions Simulator**:
  - Interactive face silhouette simulator (Oval, Angular, Round face architecture).
  - Frame scale slider (85% to 115%) and vertical bridge offset adjustments.
  - Frame switcher and instant Add to Bag trigger.
- **Artisan Policy Modals**:
  - Complimentary Courier, 30-Day In-Studio Trial, 2-Year Atelier Warranty, Sabae Metallurgy, and Mazzucchelli Bio-Cellulose sustainability.

---

## ✦ Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8.3
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **Typography**: Google Fonts (`Syne`, `Plus Jakarta Sans`, `Cormorant Garamond`, `Space Mono`)

---

## ✦ Setup & Local Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will be live at `http://localhost:5173/`.

### 3. Production Build
```bash
npm run build
```
Creates an optimized production bundle in `dist/`.

---

## ✦ Backend & Production Readiness Roadmap

| Domain | Current Implementation (Frontend Flagship) | Production Backend Integration Path |
|---|---|---|
| **Catalogue & Inventory** | Type-safe dataset (`src/data/products.ts`) with real SORA models | Headless Shopify Storefront API / MedusaJS / Commerce Layer |
| **Cart & Persistence** | Reactive `ShopContext` with `localStorage` persistence | Server-synchronized cart session with customer accounts |
| **Checkout & Payments** | Simulated concierge checkout with order reference generation | Razorpay Payments API (India) / Stripe Elements (Global) |
| **Courier & Logistics** | Automated shipping threshold calculations | Blue Dart Apex API / DHL Express Worldwide Webhooks |
| **Order Management** | Receipt docket display with tracking estimates | Webhook events dispatching transactional emails via Resend / SendGrid |
| **Customer Reviews** | Verified patron testimonials model | Yotpo / Okendo / Custom reviews API |

---

© 2026 SORA EYEWEAR. Crafted with architectural discipline.
