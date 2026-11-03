export interface ProductVariant {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  image: string;
}

export interface ProductSpec {
  frameWidth: string;
  lensWidth: string;
  bridgeWidth: string;
  templeLength: string;
  weight: string;
  lensMaterial: string;
  frameMaterial: string;
  uvProtection: string;
  hingeType: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  slug: string;
  sku: string;
  price: number;
  salePrice: number | null;
  category: 'Titanium' | 'Cellulose Propionate' | 'Shield & Rimless' | 'Limited Edition';
  collection: 'Chroma Noir' | 'Tokyo Minimal' | 'Sculptural Runway' | 'Core Studio';
  shape: 'Rectangular' | 'Square' | 'Aviator' | 'Geometric' | 'Cat-Eye' | 'Shield' | 'Round' | 'Oval';
  badge?: 'NEW ARRIVAL' | 'BESTSELLER' | 'LIMITED RUN' | 'SALE';
  rating: number;
  reviewCount: number;
  images: string[];
  variants: ProductVariant[];
  shortDescription: string;
  description: string;
  specifications: ProductSpec;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isEditorialHero?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "prod_kaizo",
    name: "KAIZŌ",
    subtitle: "Striated Horn Cellulose Propionate with Champagne Polarized Optics",
    slug: "kaizo",
    sku: "SORA-KZ-001",
    price: 3499,
    salePrice: 2499,
    category: "Cellulose Propionate",
    collection: "Sculptural Runway",
    shape: "Square",
    badge: "BESTSELLER",
    rating: 4.9,
    reviewCount: 48,
    images: [
      "/images/kaizo/model-1.jpg",
      "/images/kaizo/frame-front.jpg",
      "/images/kaizo/model-2.jpg",
      "/images/kaizo/frame-angle.jpg",
      "/images/kaizo/frame-sky.jpg"
    ],
    variants: [
      {
        id: "v_kaizo_smoke",
        name: "Striated Smoked Olive",
        colorName: "Smoked Olive & Amber",
        colorHex: "#5A5443",
        image: "/images/kaizo/model-1.jpg"
      },
      {
        id: "v_kaizo_sky",
        name: "Golden Hour Glow",
        colorName: "Twilight Amber Tint",
        colorHex: "#C8A96B",
        image: "/images/kaizo/frame-sky.jpg"
      },
      {
        id: "v_kaizo_studio",
        name: "Display Studio",
        colorName: "Deep Tortoise Noir",
        colorHex: "#2C211B",
        image: "/images/kaizo/frame-front.jpg"
      }
    ],
    shortDescription: "Signature sculptural square frame crafted from hand-buffed Italian Mazzucchelli striated cellulose propionate with double front rivets and custom light amber polarized optics.",
    description: "KAIZŌ is SORA's definitive signature silhouette. Carved from block Italian Mazzucchelli cellulose propionate featuring natural horn striations in smoked olive and warm taupe. Engineered with robust double-pin silver rivets, sculpted beveled browlines, and custom 7-barrel wire-core hinges. Fitted with high-definition polarized Light Amber CR-39 lenses that offer 100% UV400 clarity while accentuating sunset and golden hour hues.",
    specifications: {
      frameWidth: "144 mm",
      lensWidth: "52 mm",
      bridgeWidth: "20 mm",
      templeLength: "148 mm",
      weight: "31 g",
      lensMaterial: "HD Polarized CR-39 (Light Amber)",
      frameMaterial: "Mazzucchelli Striated Cellulose Propionate",
      uvProtection: "100% UV400 Category 2 Polarized",
      hingeType: "Custom 7-Barrel Reinforced Wire-Core"
    },
    inStock: true,
    stockCount: 3,
    isFeatured: true,
    isEditorialHero: true
  },
  {
    id: "prod_hikari",
    name: "HIKARI",
    subtitle: "Architectural Hexagonal Titanium in 18K Champagne Gold",
    slug: "hikari",
    sku: "SORA-HK-002",
    price: 3999,
    salePrice: 2999,
    category: "Titanium",
    collection: "Tokyo Minimal",
    shape: "Geometric",
    badge: "BESTSELLER",
    rating: 5.0,
    reviewCount: 36,
    images: [
      "/images/hikari/model-1.jpg",
      "/images/hikari/frame-angle.jpg",
      "/images/hikari/model-smile.jpg",
      "/images/hikari/frame-front.jpg",
      "/images/hikari/model-profile.jpg"
    ],
    variants: [
      {
        id: "v_hikari_gold",
        name: "Champagne Gold & Amber",
        colorName: "18K Champagne Gold",
        colorHex: "#C8A96B",
        image: "/images/hikari/model-1.jpg"
      },
      {
        id: "v_hikari_angle",
        name: "Studio Angle",
        colorName: "Polished Wireframe",
        colorHex: "#D4AF37",
        image: "/images/hikari/frame-angle.jpg"
      },
      {
        id: "v_hikari_sun",
        name: "Golden Hour Smile",
        colorName: "Dusk Amber Gradient",
        colorHex: "#8B5A2B",
        image: "/images/hikari/model-smile.jpg"
      }
    ],
    shortDescription: "Featherlight 16g hexagonal geometric frame forged from Grade 4 Japanese titanium with warm amber gradient polarized lenses.",
    description: "HIKARI (光 - Radiance) is an ultra-fine geometric micro-frame forged in Sabae, Japan. Sculpted from premium Grade 4 Japanese titanium dipped in 18K champagne gold. The distinctive hexagonal eye-rim balances sharp avant-garde editorial lines with effortless everyday wearability. Fitted with Category 3 warm amber gradient polarized lenses and hand-finished tortoiseshell acetate temple tips.",
    specifications: {
      frameWidth: "138 mm",
      lensWidth: "51 mm",
      bridgeWidth: "18 mm",
      templeLength: "142 mm",
      weight: "16 g",
      lensMaterial: "Warm Amber Gradient Polarized CR-39",
      frameMaterial: "Grade 4 Pure Japanese Titanium (18K Gold Plated)",
      uvProtection: "100% UV400 Category 3 Polarized",
      hingeType: "Screwless Micro-Flex Tension Joint"
    },
    inStock: true,
    stockCount: 2,
    isFeatured: true,
    isEditorialHero: true
  },
  {
    id: "prod_terra",
    name: "TERRA",
    subtitle: "Sun-Drenched Mineral Tortoise",
    slug: "terra",
    sku: "SORA-SG-002",
    price: 2999,
    salePrice: 2199,
    category: "Cellulose Propionate",
    collection: "Core Studio",
    shape: "Rectangular",
    badge: "SALE",
    rating: 4.8,
    reviewCount: 38,
    images: [
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_terra_sand",
        name: "Desert Sand",
        colorName: "Ochre Havana",
        colorHex: "#a3703c",
        image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85"
      },
      {
        id: "v_terra_noir",
        name: "Smoked Espresso",
        colorName: "Dark Havana",
        colorHex: "#2b1e17",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "A low-profile rectangular frame capturing warm organic earth tones.",
    description: "Compact proportions make Terra universally flattering. Hand-bevelled edges reflect soft ambient light, while warm bronze polarized lenses reduce harsh glare.",
    specifications: {
      frameWidth: "140 mm",
      lensWidth: "49 mm",
      bridgeWidth: "20 mm",
      templeLength: "142 mm",
      weight: "25 g",
      lensMaterial: "Warm Bronze Tint CR-39",
      frameMaterial: "Organic Cellulose Propionate",
      uvProtection: "100% UV400 Filter",
      hingeType: "Custom Triple-Pin Rivet"
    },
    inStock: true,
    stockCount: 4,
    isFeatured: true
  },
  {
    id: "prod_sorrel",
    name: "SORREL",
    subtitle: "Bold Runway Sculpted Silhouette",
    slug: "sorrel",
    sku: "SORA-SG-003",
    price: 3699,
    salePrice: 2899,
    category: "Cellulose Propionate",
    collection: "Chroma Noir",
    shape: "Square",
    badge: "LIMITED RUN",
    rating: 4.9,
    reviewCount: 31,
    images: [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_sorrel_ink",
        name: "Ink Noir",
        colorName: "Deep Black",
        colorHex: "#0c0d0e",
        image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85"
      },
      {
        id: "v_sorrel_smoke",
        name: "Translucent Smoke",
        colorName: "Ash Grey",
        colorHex: "#4b5563",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "A deeper, bolder statement frame with a quiet matte finish.",
    description: "Sorrel anchors any look with quiet architectural confidence. Cut from 8mm Italian block cellulose propionate with anti-reflective high-definition polarized lenses.",
    specifications: {
      frameWidth: "146 mm",
      lensWidth: "54 mm",
      bridgeWidth: "19 mm",
      templeLength: "146 mm",
      weight: "30 g",
      lensMaterial: "Deep Pitch Black Polarized CR-39",
      frameMaterial: "8mm Block Cellulose Propionate",
      uvProtection: "100% UV400 Protection",
      hingeType: "7-Barrel Reinforced Hinge"
    },
    inStock: true,
    stockCount: 5,
    isFeatured: true
  },
  {
    id: "prod_solstice_shield",
    name: "SOLSTICE",
    subtitle: "Frameless Monolithic Visor",
    slug: "solstice",
    sku: "SORA-SH-005",
    price: 4499,
    salePrice: 3499,
    category: "Shield & Rimless",
    collection: "Sculptural Runway",
    shape: "Shield",
    badge: "LIMITED RUN",
    rating: 5.0,
    reviewCount: 17,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_solstice_chrome",
        name: "Mirrored Silver",
        colorName: "Chrome Gradient",
        colorHex: "#cbd5e1",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85"
      },
      {
        id: "v_solstice_obsidian",
        name: "Dark Eclipse",
        colorName: "Solid Noir",
        colorHex: "#171717",
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "A continuous toroidal lens shield offering panoramic peripheral vision.",
    description: "Engineered without an exterior rim, Solstice rests comfortably with zero visual obstruction. Finished with anti-scratch hydrophobic mirror coatings.",
    specifications: {
      frameWidth: "148 mm",
      lensWidth: "142 mm",
      bridgeWidth: "16 mm",
      templeLength: "138 mm",
      weight: "22 g",
      lensMaterial: "High-Definition Polycarbonate Shield",
      frameMaterial: "Rimless Titanium Bridge",
      uvProtection: "100% UV400 Protection",
      hingeType: "Direct Lens Screwless Mount"
    },
    inStock: true,
    stockCount: 3,
    isFeatured: true
  },
  {
    id: "prod_kassia_cat",
    name: "KASSIA",
    subtitle: "Upturned Architectural Silhouette",
    slug: "kassia",
    sku: "SORA-SG-006",
    price: 3299,
    salePrice: null,
    category: "Cellulose Propionate",
    collection: "Tokyo Minimal",
    shape: "Cat-Eye",
    badge: "NEW ARRIVAL",
    rating: 4.9,
    reviewCount: 22,
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_kassia_noir",
        name: "Midnight Black",
        colorName: "Solid Jet",
        colorHex: "#111111",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
      },
      {
        id: "v_kassia_burgundy",
        name: "Deep Burgundy",
        colorName: "Wine Acetate",
        colorHex: "#861f3a",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "A sharp, modern cat-eye with subtly bevelled cheek contours.",
    description: "Kassia reimagines vintage glamour through contemporary Japanese minimalism. Features polished bevels along the browline for an instantly lifted look.",
    specifications: {
      frameWidth: "143 mm",
      lensWidth: "52 mm",
      bridgeWidth: "18 mm",
      templeLength: "144 mm",
      weight: "27 g",
      lensMaterial: "High-Definition CR-39 Gradient",
      frameMaterial: "Mazzucchelli Cellulose Propionate",
      uvProtection: "100% UV400 Protection",
      hingeType: "5-Barrel OBE German Hinges"
    },
    inStock: true,
    stockCount: 6,
    isFeatured: true
  },
  {
    id: "prod_vapor_oval",
    name: "VAPOR",
    subtitle: "Weightless Oval Minimalist Frame",
    slug: "vapor",
    sku: "SORA-TI-007",
    price: 4199,
    salePrice: 3199,
    category: "Titanium",
    collection: "Tokyo Minimal",
    shape: "Oval",
    badge: "SALE",
    rating: 4.8,
    reviewCount: 19,
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_vapor_gold",
        name: "Champagne Gold",
        colorName: "Brushed Champagne",
        colorHex: "#c8a96b",
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "An effortless 90s-inspired slim oval frame in warm champagne titanium.",
    description: "Clean oval lines crafted from cold-forged Japanese titanium wire. Perfectly balanced for all face shapes with zero temple pinch.",
    specifications: {
      frameWidth: "138 mm",
      lensWidth: "48 mm",
      bridgeWidth: "21 mm",
      templeLength: "145 mm",
      weight: "16 g",
      lensMaterial: "Polarized Green G-15",
      frameMaterial: "Pure Japanese Titanium",
      uvProtection: "100% UV400 Protection",
      hingeType: "Monoblock Hinge"
    },
    inStock: true,
    stockCount: 4,
    isFeatured: false
  },
  {
    id: "prod_obsidian_pilot",
    name: "OBSIDIAN PILOT",
    subtitle: "Modern Architectural Aviator",
    slug: "obsidian-pilot",
    sku: "SORA-TI-008",
    price: 4599,
    salePrice: 3499,
    category: "Titanium",
    collection: "Sculptural Runway",
    shape: "Aviator",
    badge: "BESTSELLER",
    rating: 4.9,
    reviewCount: 34,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_pilot_black",
        name: "Matte Black",
        colorName: "Satin Noir",
        colorHex: "#1c1c1e",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "A sharp teardrop aviator frame with a double titanium brow bar.",
    description: "The classic aviator re-engineered with clean Japanese lines. Features lightweight titanium temples and dark grey polarized lenses.",
    specifications: {
      frameWidth: "144 mm",
      lensWidth: "55 mm",
      bridgeWidth: "17 mm",
      templeLength: "145 mm",
      weight: "19 g",
      lensMaterial: "Polarized Grey CR-39",
      frameMaterial: "Grade 4 Titanium",
      uvProtection: "100% UV400 Protection",
      hingeType: "Reinforced 3-Pin Hinge"
    },
    inStock: true,
    stockCount: 2,
    isFeatured: true
  },
  {
    id: "prod_kairo",
    name: "KAIRO",
    subtitle: "Geometric Octagonal Wireframe",
    slug: "kairo",
    sku: "SORA-TI-009",
    price: 3999,
    salePrice: 2999,
    category: "Titanium",
    collection: "Tokyo Minimal",
    shape: "Geometric",
    badge: "NEW ARRIVAL",
    rating: 4.8,
    reviewCount: 15,
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_kairo_gold",
        name: "Brushed Champagne",
        colorName: "Warm Gold",
        colorHex: "#c8a96b",
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "Sharp 8-sided geometry in flexible beta-titanium.",
    description: "Distinct octagonal rims designed to highlight cheekbone contours. Fitted with ultra-clear amber polarized lenses.",
    specifications: {
      frameWidth: "141 mm",
      lensWidth: "51 mm",
      bridgeWidth: "20 mm",
      templeLength: "144 mm",
      weight: "18 g",
      lensMaterial: "Amber Polarized CR-39",
      frameMaterial: "Beta-Titanium",
      uvProtection: "100% UV400 Protection",
      hingeType: "Precision Barrel Hinge"
    },
    inStock: true,
    stockCount: 3,
    isFeatured: false
  },
  {
    id: "prod_nagano",
    name: "NAGANO",
    subtitle: "Chunky Havana Square Silhouette",
    slug: "nagano",
    sku: "SORA-SG-010",
    price: 2899,
    salePrice: null,
    category: "Cellulose Propionate",
    collection: "Core Studio",
    shape: "Square",
    badge: "BESTSELLER",
    rating: 4.9,
    reviewCount: 36,
    images: [
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_nagano_havana",
        name: "Classic Havana",
        colorName: "Tortoise Shell",
        colorHex: "#8d5b2d",
        image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "Substantial bold square frame in warm mottled tortoise acetate.",
    description: "Nagano delivers confident street presence with bevelled temples and deep olive polarized lenses that enhance contrast.",
    specifications: {
      frameWidth: "145 mm",
      lensWidth: "52 mm",
      bridgeWidth: "21 mm",
      templeLength: "145 mm",
      weight: "31 g",
      lensMaterial: "HD CR-39 Polarized",
      frameMaterial: "Mazzucchelli Cellulose Propionate",
      uvProtection: "100% UV400 Protection",
      hingeType: "German 5-Barrel Hinge"
    },
    inStock: true,
    stockCount: 8,
    isFeatured: false
  },
  {
    id: "prod_shinto",
    name: "SHINTO",
    subtitle: "Slim Architectural Low-Profile",
    slug: "shinto",
    sku: "SORA-SG-011",
    price: 2799,
    salePrice: 1999,
    category: "Cellulose Propionate",
    collection: "Tokyo Minimal",
    shape: "Rectangular",
    badge: "SALE",
    rating: 4.7,
    reviewCount: 28,
    images: [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_shinto_black",
        name: "Smoked Jet",
        colorName: "Gloss Black",
        colorHex: "#000000",
        image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "A narrow, elongated rectangular frame with effortless 90s cool.",
    description: "Low-profile silhouette engineered for understated everyday wear. Features scratch-resistant dark grey polarized lenses.",
    specifications: {
      frameWidth: "140 mm",
      lensWidth: "51 mm",
      bridgeWidth: "18 mm",
      templeLength: "142 mm",
      weight: "24 g",
      lensMaterial: "High-Definition Polarized CR-39",
      frameMaterial: "Organic Cellulose Propionate",
      uvProtection: "100% UV400 Protection",
      hingeType: "Custom Triple-Pin Hinge"
    },
    inStock: true,
    stockCount: 4,
    isFeatured: false
  },
  {
    id: "prod_sendai",
    name: "SENDAI",
    subtitle: "Brushed Gold Titanium Round",
    slug: "sendai",
    sku: "SORA-TI-012",
    price: 4399,
    salePrice: 3299,
    category: "Titanium",
    collection: "Tokyo Minimal",
    shape: "Round",
    badge: "BESTSELLER",
    rating: 5.0,
    reviewCount: 41,
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_sendai_gold",
        name: "Vintage Gold",
        colorName: "Warm Champagne",
        colorHex: "#c8a96b",
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "A perfectly proportioned round frame with filigreed bridge detailing.",
    description: "Sendai combines classic intellectual appeal with Sabae titanium engineering. Features silicone nosepads and bottle green polarized lenses.",
    specifications: {
      frameWidth: "139 mm",
      lensWidth: "48 mm",
      bridgeWidth: "21 mm",
      templeLength: "145 mm",
      weight: "16 g",
      lensMaterial: "Bottle Green Polarized CR-39",
      frameMaterial: "Pure Japanese Titanium",
      uvProtection: "100% UV400 Protection",
      hingeType: "Screwless Tension Joint"
    },
    inStock: true,
    stockCount: 2,
    isFeatured: true
  },
  {
    id: "prod_asahi",
    name: "ASAHI",
    subtitle: "Amber Gradient Browline",
    slug: "asahi",
    sku: "SORA-SG-013",
    price: 3499,
    salePrice: 2699,
    category: "Cellulose Propionate",
    collection: "Core Studio",
    shape: "Square",
    badge: "SALE",
    rating: 4.8,
    reviewCount: 24,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_asahi_amber",
        name: "Honey Amber",
        colorName: "Warm Ochre",
        colorHex: "#b47a3e",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "Rich honey gradient browline with softened lower rim chamfers.",
    description: "Asahi brings warm morning light to your daily wardrobe. Handcrafted from cellulose propionate with amber UV400 polarized lenses.",
    specifications: {
      frameWidth: "142 mm",
      lensWidth: "50 mm",
      bridgeWidth: "20 mm",
      templeLength: "145 mm",
      weight: "27 g",
      lensMaterial: "Amber Gradient CR-39",
      frameMaterial: "Mazzucchelli Cellulose Propionate",
      uvProtection: "100% UV400 Protection",
      hingeType: "German 5-Barrel Hinge"
    },
    inStock: true,
    stockCount: 5,
    isFeatured: false
  },
  {
    id: "prod_takumi",
    name: "TAKUMI",
    subtitle: "Rimless Hexagonal Wireframe",
    slug: "takumi",
    sku: "SORA-SH-014",
    price: 4699,
    salePrice: 3699,
    category: "Shield & Rimless",
    collection: "Sculptural Runway",
    shape: "Geometric",
    badge: "LIMITED RUN",
    rating: 5.0,
    reviewCount: 16,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_takumi_silver",
        name: "Silver Mirror",
        colorName: "Polished Silver",
        colorHex: "#e2e8f0",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "Architectural 6-point rimless lens mounted directly to titanium temples.",
    description: "Takumi represents minimal elegance without structural compromise. Lightweight rimless construction with laser-chamfered lens perimeters.",
    specifications: {
      frameWidth: "143 mm",
      lensWidth: "52 mm",
      bridgeWidth: "18 mm",
      templeLength: "142 mm",
      weight: "15 g",
      lensMaterial: "High-Definition Polyamide Mirrored",
      frameMaterial: "Rimless Titanium Bridge",
      uvProtection: "100% UV400 Protection",
      hingeType: "Direct Mount Tension Joint"
    },
    inStock: true,
    stockCount: 3,
    isFeatured: false
  },
  {
    id: "prod_yoru_noir",
    name: "YORU NOIR",
    subtitle: "Monolithic Pitch-Black Mask",
    slug: "yoru-noir",
    sku: "SORA-SH-015",
    price: 4299,
    salePrice: 3299,
    category: "Shield & Rimless",
    collection: "Chroma Noir",
    shape: "Shield",
    badge: "NEW ARRIVAL",
    rating: 4.9,
    reviewCount: 21,
    images: [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_yoru_black",
        name: "Solid Pitch",
        colorName: "Jet Black",
        colorHex: "#0a0a0a",
        image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "Single-lens continuous visor for total coverage and zero glare.",
    description: "Yoru Noir delivers total panoramic light shielding in a bold midnight aesthetic. Hydrophobic anti-smudge coated panoramic dark lens.",
    specifications: {
      frameWidth: "147 mm",
      lensWidth: "140 mm",
      bridgeWidth: "16 mm",
      templeLength: "140 mm",
      weight: "23 g",
      lensMaterial: "High-Definition Shield Dark Tint",
      frameMaterial: "Titanium Sub-Frame",
      uvProtection: "100% UV400 Protection",
      hingeType: "Screwless Tension Hinge"
    },
    inStock: true,
    stockCount: 3,
    isFeatured: false
  },
  {
    id: "prod_kumano",
    name: "KUMANO",
    subtitle: "Translucent Honey Aviator",
    slug: "kumano",
    sku: "SORA-SG-016",
    price: 3199,
    salePrice: 2499,
    category: "Cellulose Propionate",
    collection: "Core Studio",
    shape: "Aviator",
    badge: "SALE",
    rating: 4.8,
    reviewCount: 27,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_kumano_honey",
        name: "Honey Blonde",
        colorName: "Translucent Amber",
        colorHex: "#c8a96b",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "A soft cellulose propionate interpretation of the pilot silhouette in warm amber.",
    description: "Kumano rethinks the aviator with translucent organic acetate. Comfortable keyhole bridge and warm polarized lenses.",
    specifications: {
      frameWidth: "144 mm",
      lensWidth: "53 mm",
      bridgeWidth: "19 mm",
      templeLength: "145 mm",
      weight: "28 g",
      lensMaterial: "HD CR-39 Polarized",
      frameMaterial: "Organic Cellulose Propionate",
      uvProtection: "100% UV400 Protection",
      hingeType: "5-Barrel OBE Hinge"
    },
    inStock: true,
    stockCount: 6,
    isFeatured: false
  },
  {
    id: "prod_sora_one",
    name: "SORA-ONE",
    subtitle: "Flagship Aviator in Polished Silver",
    slug: "sora-one",
    sku: "SORA-TI-017",
    price: 4799,
    salePrice: 3799,
    category: "Titanium",
    collection: "Sculptural Runway",
    shape: "Aviator",
    badge: "BESTSELLER",
    rating: 5.0,
    reviewCount: 48,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_sora_silver",
        name: "Liquid Silver",
        colorName: "Polished Chrome",
        colorHex: "#e2e8f0",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "Our signature double-bridge titanium aviator with ultra-sharp polarized lenses.",
    description: "The definitive SORA flagship frame. Featherlight Japanese titanium frame with teardrop contouring and polarized G-15 optics.",
    specifications: {
      frameWidth: "145 mm",
      lensWidth: "56 mm",
      bridgeWidth: "16 mm",
      templeLength: "146 mm",
      weight: "18 g",
      lensMaterial: "Polarized G-15 CR-39",
      frameMaterial: "Pure Grade 4 Titanium",
      uvProtection: "100% UV400 Protection",
      hingeType: "Precision Monoblock Hinge"
    },
    inStock: true,
    stockCount: 2,
    isFeatured: true
  },
  {
    id: "prod_miyazaki",
    name: "MIYAZAKI",
    subtitle: "Retro Oval Tortoise Shell",
    slug: "miyazaki",
    sku: "SORA-SG-018",
    price: 2999,
    salePrice: 2299,
    category: "Cellulose Propionate",
    collection: "Core Studio",
    shape: "Oval",
    badge: "SALE",
    rating: 4.8,
    reviewCount: 33,
    images: [
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_miyazaki_tortoise",
        name: "Vintage Tortoise",
        colorName: "Warm Havana",
        colorHex: "#8d5b2d",
        image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "Timeless mid-century oval frame with gently flared temple hinges.",
    description: "Miyazaki brings warm nostalgia into the modern age with tactile Mazzucchelli acetate and brown gradient polarized optics.",
    specifications: {
      frameWidth: "141 mm",
      lensWidth: "49 mm",
      bridgeWidth: "20 mm",
      templeLength: "144 mm",
      weight: "26 g",
      lensMaterial: "Brown Gradient Polarized CR-39",
      frameMaterial: "Mazzucchelli Cellulose Propionate",
      uvProtection: "100% UV400 Protection",
      hingeType: "Custom Triple-Pin Hinge"
    },
    inStock: true,
    stockCount: 4,
    isFeatured: false
  },
  {
    id: "prod_atelier_04",
    name: "ATELIER 04",
    subtitle: "Limited Edition Matte Gunmetal Round",
    slug: "atelier-04",
    sku: "SORA-LE-019",
    price: 4999,
    salePrice: null,
    category: "Limited Edition",
    collection: "Sculptural Runway",
    shape: "Round",
    badge: "LIMITED RUN",
    rating: 5.0,
    reviewCount: 14,
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_atelier_gunmetal",
        name: "Matte Gunmetal",
        colorName: "Dark Titanium",
        colorHex: "#334155",
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "Hand-numbered batch of 150 pieces with laser-knurled browline accents.",
    description: "A rare collector piece forged from cold-rolled Japanese titanium. Each unit is laser-engraved with its unique batch number.",
    specifications: {
      frameWidth: "140 mm",
      lensWidth: "49 mm",
      bridgeWidth: "21 mm",
      templeLength: "146 mm",
      weight: "17 g",
      lensMaterial: "Dark Grey Polarized CR-39",
      frameMaterial: "Cold-Rolled Grade 4 Titanium",
      uvProtection: "100% UV400 Protection",
      hingeType: "Screwless Tension Joint"
    },
    inStock: true,
    stockCount: 2,
    isFeatured: false
  },
  {
    id: "prod_kyoto_dawn",
    name: "KYOTO DAWN",
    subtitle: "Rosé Champagne Minimalist Titanium",
    slug: "kyoto-dawn",
    sku: "SORA-TI-020",
    price: 4299,
    salePrice: 3399,
    category: "Titanium",
    collection: "Tokyo Minimal",
    shape: "Geometric",
    badge: "NEW ARRIVAL",
    rating: 4.9,
    reviewCount: 25,
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_kyoto_rose",
        name: "Rosé Champagne",
        colorName: "Warm Rosé Gold",
        colorHex: "#e2cca0",
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    shortDescription: "Delicate hexagonal titanium rim in subtle rosé champagne tones.",
    description: "Crafted in Sabae, Kyoto Dawn balances soft metallic luster with crisp geometric angles. Ultra-clear high-definition polarized lenses.",
    specifications: {
      frameWidth: "139 mm",
      lensWidth: "50 mm",
      bridgeWidth: "20 mm",
      templeLength: "143 mm",
      weight: "16 g",
      lensMaterial: "Rosé Gradient Polarized CR-39",
      frameMaterial: "Grade 4 Titanium",
      uvProtection: "100% UV400 Protection",
      hingeType: "Monoblock Tension Joint"
    },
    inStock: true,
    stockCount: 3,
    isFeatured: false
  }
];

export const REVIEWS = [
  {
    id: "rev-1",
    author: "Arjun M.",
    city: "Mumbai",
    rating: 5,
    date: "14 October 2026",
    product: "MAREA — Translucent Olive",
    title: "Unmatched weight balance and finish",
    comment: "The translucent olive acetate has a depth you only appreciate in natural sunlight. Feels significantly more bespoke and durable than mainstream luxury designer frames."
  },
  {
    id: "rev-2",
    author: "Zoya K.",
    city: "Bengaluru",
    rating: 5,
    date: "28 September 2026",
    product: "AERO-01",
    title: "17 grams of pure architectural mastery",
    comment: "I wear these for 10 hours straight without nosepad fatigue. The mirror finish is pristine, and the optical sharpness is remarkable. Truly international grade."
  },
  {
    id: "rev-3",
    author: "Devansh R.",
    city: "New Delhi",
    rating: 5,
    date: "03 October 2026",
    product: "TERRA — Desert Sand",
    title: "The proportions are immaculate",
    comment: "A quietly confident frame that elevates everyday tailoring. Packaging alone felt like unboxing a rare art piece."
  }
];

export const BRAND_VALUES = [
  {
    number: "01",
    title: "JAPANESE TITANIUM & CELLULOSE PROPIONATE",
    description: "Every frame is sculpted from sustainably sourced cellulose cellulose propionate or aerospace Grade 4 titanium in Sabae, Japan."
  },
  {
    number: "02",
    title: "HIGH-DEFINITION OPTICAL CLARITY",
    description: "Certified UV400 lenses featuring anti-reflective backside vacuum coatings and hydrophobic protection against glare and moisture."
  },
  {
    number: "03",
    title: "COMPLIMENTARY INSURED COURIER",
    description: "Insured carbon-neutral door-to-door delivery with custom tracking and signature verification."
  },
  {
    number: "04",
    title: "30-DAY IN-STUDIO HOME TRIAL",
    description: "Experience SORA frames in your natural daylight. Hassle-free returns and complimentary exchange concierge."
  }
];
