
export interface ProductVariant {
  id: string; // must be unique within the product
  name: string;
  colorName: string;
  colorHex: string;
  /** Main (front) image for this colour — used in the cart and swatches. */
  image: string;

  // ---- Optional per-variant overrides. Anything left out falls back to the product's value. ----
  /** Gallery images shown when this colour is selected. */
  images?: string[];
  /** Units in stock for this colour. */
  stockQuantity?: number;
  /** Set false to mark just this colour sold out. Defaults to stockQuantity > 0. */
  inStock?: boolean;
  sku?: string;
  frame?: string;
  lens?: string;
  shortDescription?: string;
  description?: string;
  reelCaption?: string;
}

// --------------------------------------------------
// PRICING
// Entry ₹1,299 · Core ₹1,499 · Hero ₹1,799
// Bundle: any 2 Entry/Core frames for ₹2,499 (Hero is excluded).
// --------------------------------------------------

export type PriceTier = "Entry" | "Core" | "Hero";

export const TIER_PRICES: Record<PriceTier, number> = {
  Entry: 1299,
  Core: 1499,
  Hero: 1799
};

export const BUNDLE_OFFER = {
  size: 2,
  price: 2499,
  label: "Any 2 for ₹2,499"
} as const;

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  pronunciation: string;
  japaneseMeaning: string;
  tagline: string;
  slug: string;
  sku: string;

  tier: PriceTier;
  price: number;

  // Only filled in where the product description states it.
  shape?: string;
  frame?: string;
  lens?: string;

  images: string[];
  variants: ProductVariant[];

  shortDescription: string;
  description: string;
  reelCaption: string;

  inStock: boolean;
  // Edit this per product to reflect real inventory.
  stockQuantity: number;

  isFeatured?: boolean;
  isEditorialHero?: boolean;
}

export const isBundleEligible = (product: Product): boolean => product.tier !== "Hero";

// At or below this many units left, the UI shows a "Hurry! Only X left" message instead of "In Stock".
export const LOW_STOCK_THRESHOLD = 2;

export const isLowStock = (product: Product): boolean =>
  product.inStock && product.stockQuantity > 0 && product.stockQuantity <= LOW_STOCK_THRESHOLD;

/**
 * The product as it looks with a given colour selected: the variant's own images, stock,
 * description etc. override the product's, and anything the variant doesn't set falls back.
 */
export const withVariant = (product: Product, variant?: ProductVariant): Product => {
  const v = variant ?? product.variants[0];
  if (!v) return product;
  const stockQuantity = v.stockQuantity ?? product.stockQuantity;
  const inStock =
    v.inStock ?? (v.stockQuantity !== undefined ? v.stockQuantity > 0 : product.inStock);
  return {
    ...product,
    images: v.images && v.images.length > 0 ? v.images : v.image && !product.images.includes(v.image) ? [v.image, ...product.images] : product.images,
    stockQuantity,
    inStock,
    sku: v.sku ?? product.sku,
    frame: v.frame ?? product.frame,
    lens: v.lens ?? product.lens,
    shortDescription: v.shortDescription ?? product.shortDescription,
    description: v.description ?? product.description,
    reelCaption: v.reelCaption ?? product.reelCaption
  };
};

/** True if at least one colour of the product can be bought. */
export const isProductInStock = (product: Product): boolean =>
  product.variants.length > 0
    ? product.variants.some((v) => withVariant(product, v).inStock)
    : product.inStock;

export const PRODUCTS: Product[] = [

  // --------------------------------------------------
  // HERO — HOSHI (星) · THE STAR
  // --------------------------------------------------

  {
    id: "prod_hoshi",
    name: "HOSHI",
    subtitle: "The Star",
    pronunciation: "HOH-shee",
    japaneseMeaning: "星",
    tagline: "Catch the light.",

    slug: "hoshi",
    sku: "SORA-HS-001",

    tier: "Hero",
    price: TIER_PRICES.Hero,

    shape: "Geometric",
    frame: "Fine gold-toned metal",
    lens: "Warm brown",

    images: [
      "/images/hoshi/hoshi-front.png",
      "/images/hoshi/hoshi-side.png",
      "/images/hoshi/hoshi-cross.png",
      // "/images/hoshi/frame-front.png",
      "/images/hoshi/hoshi-model-2.jpeg",
      // "/images/hoshi/hoshi-model-1.jpeg"
    ],
    variants: [
      {
        id: "v_hoshi_goldBrown",
        name: "Gold Frame & Brown Lens",
        colorName: "Gold & Brown",
        colorHex: "#C8A96B",
        image: "/images/hoshi/hoshi-front.png",
        stockQuantity: 4
        // Uses the product's images, description and lens above.
      },
      {
        id: "v_hoshi_goldBlack",
        name: "Gold Frame & Black Lens",
        colorName: "Gold & Black",
        colorHex: "#000000",
        image: "/images/hoshi/hoshi-black-front.JPEG",
        // Add more angles here as you shoot them (side, cross, model…).
        images: [
          "/images/hoshi/hoshi-black-front.JPEG",
          "/images/hoshi/hoshi-black-side.JPEG",
          "/images/hoshi/hoshi-black-cross.JPEG",
          "/images/hoshi/hoshi-black-model-1.jpeg",

        ],
        stockQuantity: 5, // ← set the real count for the black variant
        sku: "SORA-HS-001-BLK",
        lens: "Black",
        shortDescription:
          "A gold geometric frame with deep black lenses — the same sharp star shape, turned up to midnight. Bold in contrast, calm in tone.",
        description:
          "Inspired by the sharp, steady light of a star, Hoshi brings a touch of gold to everyday dressing — this time set against deep black lenses.\n\nIt works from bright city afternoons to beach days and late golden-hour evenings.\n\nThe same sleek geometric frame with clean angles and fine gold-toned metal, paired with black lenses for a sharper, more graphic contrast. Polished, a little dramatic, and quietly luxurious.\n\nGold on black. A star against the night sky.",
        reelCaption:
          "Hoshi (星) in black. Gold frame. Black lens. A star against the night. ✦"
      }
    ],

    shortDescription:
      "A gold geometric frame with warm brown lenses, for the kind of shine that never needs to be loud. Sharp in shape, soft in glow.",

    description:
      "Inspired by the sharp, steady light of a star, Hoshi brings a touch of gold to everyday dressing.\n\nIt works from sunlit brunches to poolside afternoons, and from city streets to holiday evenings.\n\nA sleek geometric frame with clean angles, fine gold-toned metal and warm brown lenses come together in a silhouette that's polished, a little unexpected, and quietly luxurious. Precise in shape, soft in tone, Hoshi is made for the days you want to look put together and the moments you want to be noticed.\n\nSome things shine without trying. Hoshi is one of them.",

    reelCaption:
      "Hoshi (星) means star. Gold frame. Brown lens. Sharp angles, soft glow. ✦",

    inStock: true,
    stockQuantity: 4,

    isFeatured: true,
    isEditorialHero: true
  },

  // --------------------------------------------------
  // CORE — NAGI (凪) · THE CALM
  // --------------------------------------------------

  {
    id: "prod_nagi",
    name: "NAGI",
    subtitle: "The Calm",
    pronunciation: "NAH-gee",
    japaneseMeaning: "凪",
    tagline: "Find your calm.",

    slug: "nagi",
    sku: "SORA-NG-002",

    tier: "Core",
    price: TIER_PRICES.Core,

    shape: "Square",
    frame: "Crystal-clear transparent",
    lens: "Warm amber",

    images: [
      "/images/nagi/nagi-front.png",
      "/images/nagi/nagi-side.png",
      "/images/nagi/nagi-cross.png",
      "/images/nagi/nagi-model-1.jpeg",
      "/images/nagi/nagi-model-2.jpeg"


    ],
    variants: [
      {
        id: "v_nagi_amber",
        name: "Clear Frame & Amber Lens",
        colorName: "Clear & Amber",
        colorHex: "#C9A469",
        image: "/images/nagi/nagi-front.png"
      }
    ],

    shortDescription:
      "A crystal-clear frame with warm amber-tinted lenses, designed for effortless style from day to night. Bold in shape, warm in tone, and timeless in spirit. A little statement, without saying too much.",

    description:
      "Inspired by the peaceful stillness that follows the wind and waves, Nagi captures a sense of effortless calm, quiet confidence and understated style.\n\nMade for sunlit afternoons, casual city days, spontaneous road trips, relaxed evenings and nights that turn into memorable stories. From daytime adventures to late-night outings, Nagi fits right in without ever trying too hard.\n\nA crystal-clear transparent frame paired with warm amber-tinted lenses creates a distinctive yet understated look. Its bold, softly squared silhouette brings character without being overpowering, while the warm tones add a subtle vintage touch. Nagi is designed for those who appreciate simplicity but never compromise on personality.\n\nWhether it's a bright afternoon or a night out, Nagi brings the same effortless energy. Some of the best moments are found in stillness. Nagi is one of them.",

    reelCaption:
      "Nagi (凪) means calm. Crystal-clear frame. Warm amber lenses. Effortless style, quiet confidence. ✦",

    inStock: true,
    stockQuantity: 2,

    isFeatured: true
  },

  // --------------------------------------------------
  // CORE — AOZORA (青空) · THE BLUE SKY
  // --------------------------------------------------

  {
    id: "prod_aozora",
    name: "AOZORA",
    subtitle: "The Blue Sky",
    pronunciation: "ah-oh-ZOH-rah",
    japaneseMeaning: "青空",
    tagline: "Nothing but blue ahead.",

    slug: "aozora",
    sku: "SORA-AZ-003",

    tier: "Core",
    price: TIER_PRICES.Core,

    shape: "Cat-Eye",
    frame: "Sleek silver-toned metal",
    lens: "Cool blue tint",

    images: [
      "/images/aozora/aozora-front.png",
      "/images/aozora/aozora-side.png",
      "/images/aozora/aozora-cross.png",
      "/images/aozora/aozora-model-2.jpeg",
      "/images/aozora/aozora-model-1.jpeg"


    ],
    variants: [
      {
        id: "v_aozora_blue",
        name: "Silver Frame & Blue Lens",
        colorName: "Silver & Blue",
        colorHex: "#7299C4",
        image: "/images/aozora/aozora-front.png"
      }
    ],

    shortDescription:
      "A silver cat-eye with cool blue lenses, made for days that feel light and endless. Delicate in detail, edgy and bold in attitude.",

    description:
      "Inspired by the endless blue of a clear sky, Aozora brings a fresh, effortless energy to everyday dressing.\n\nIt works from sunny afternoon strolls to weekend getaways, and from coffee runs to long drives under open skies.\n\nA sleek silver-toned metal frame, softly sculpted cat-eye edges and cool blue-tinted lenses come together in a silhouette that's elegant, playful and quietly striking. Delicate in its construction, expressive in its shape, Aozora is made for the days you want to feel a little different without trying too hard.\n\nSome days just call for blue skies. Aozora is one of them.",

    reelCaption:
      "Aozora (青空) means blue sky. Silver frame. Blue lenses. A little piece of endless summer. ✦",

    inStock: true,
    stockQuantity: 4,

    isFeatured: true
  },

  // --------------------------------------------------
  // CORE — ARASHI (嵐) · THE STORM
  // --------------------------------------------------

  {
    id: "prod_arashi",
    name: "ARASHI",
    subtitle: "The Storm",
    pronunciation: "ah-RAH-shee",
    japaneseMeaning: "嵐",
    tagline: "Own the storm.",

    slug: "arashi",
    sku: "SORA-AR-004",

    tier: "Core",
    price: TIER_PRICES.Core,

    shape: "Square",
    frame: "Deep sage-green acetate-style",
    lens: "Matching green tint",

    images: [
      "/images/arashi/arashi-front.png",
      "/images/arashi/arashi-side.jpg",
      "/images/arashi/arashi-cross.jpg",
      "/images/arashi/arashi-model-1.jpeg",
      "/images/arashi/arashi-model-2.jpeg"


    ],
    variants: [
      {
        id: "v_arashi_sage",
        name: "Sage-Green Frame & Green Lens",
        colorName: "Sage Green",
        colorHex: "#6B7055",
        image: "/images/arashi/arashi-front.png"
      }
    ],

    shortDescription:
      "A deep sage-green frame with matching tinted lenses, made for a little attitude and a lot of character. Bold in colour, effortless in spirit.",

    description:
      "Inspired by the untamed energy of a storm, Arashi brings a bold, grounded attitude to everyday dressing.\n\nIt works from casual city days to spontaneous road trips, and from slow mornings to nights that turn into stories.\n\nA deep sage-green acetate-style frame with matching green-tinted lenses comes together in a silhouette that's confident, distinctive and effortlessly cool. Rich in colour, strong in character, Arashi is made for the days you want to stand out and the moments you don't feel like following the crowd.\n\nNot every storm needs to be loud. Arashi is one of them.",

    reelCaption:
      "Arashi (嵐) means storm. Sage-green frame. Matching green lenses. Calm colour, storm-like attitude. ✦",

    inStock: true,
    stockQuantity: 7,

    isFeatured: true
  },

  // --------------------------------------------------
  // ENTRY — YUHI (夕日) · THE SUNSET
  // --------------------------------------------------

  {
    id: "prod_yuhi",
    name: "YUHI",
    subtitle: "The Sunset",
    pronunciation: "YOO-hee",
    japaneseMeaning: "夕日",
    tagline: "A little warmth, wherever you go.",

    slug: "yuhi",
    sku: "SORA-YH-005",

    tier: "Entry",
    price: TIER_PRICES.Entry,

    shape: "Rectangular",
    frame: "Rich tortoiseshell",
    lens: "Warm brown",

    images: [
      "/images/yuhi/yuhi-front.jpeg",
      "/images/yuhi/yuhi-side.jpeg",
      "/images/yuhi/yuhi-cross.png",
      "/images/yuhi/yuhi-model-1.jpeg",
      "/images/yuhi/yuhi-model-2.jpeg"
    ],
    variants: [
      {
        id: "v_yuhi_tortoise",
        name: "Tortoiseshell Frame & Brown Lens",
        colorName: "Tortoiseshell",
        colorHex: "#7A4A26",
        image: "/images/yuhi/yuhi-front.jpeg"
      }
    ],

    shortDescription:
      "A softly structured rectangular frame in rich tortoiseshell, paired with warm brown lenses. Timeless, effortless and made to glow in its own way.",

    description:
      "Inspired by the warmth of the setting sun, Yuhi captures the beauty of golden hours and the effortless charm of timeless style.\n\nWith its softly structured rectangular silhouette, rich tortoiseshell finish and warm brown lenses, Yuhi brings together vintage character and modern simplicity.\n\nBold in its proportions yet easy to wear, it's the kind of frame that makes an impression without trying too hard. From slow afternoon drives to evenings out, Yuhi adds a little warmth to every look.\n\nSome moments don't need to be loud to be unforgettable. Yuhi is one of them.",

    reelCaption:
      "Yuhi (夕日) means sunset. Tortoiseshell tones. Warm brown lenses. A timeless kind of glow. ✦",

    inStock: true,
    stockQuantity: 5,

    isFeatured: true
  }

];

// --------------------------------------------------
// PRODUCT INFORMATION SECTIONS
// Only details stated in the product descriptions are shown.
// --------------------------------------------------

export const PRODUCT_INFO_SECTIONS = [
  "Details"
] as const;

// --------------------------------------------------
// REVIEWS
// Empty until genuine customer reviews are available.
// --------------------------------------------------

export interface Review {
  id: string;
  rating: number;
  title: string;
  comment: string;
  author: string;
  city: string;
  product: string;
}

export const REVIEWS: Review[] = [];

// --------------------------------------------------
// BRAND VALUES / STORE POLICIES
// --------------------------------------------------

export const BRAND_VALUES = [
  {
    number: "01",
    title: "UV400 PROTECTED",
    description:
      "Every SORA pair comes with UV400 protection."
  },
  {
    number: "02",
    title: "COMPLIMENTARY DELIVERY",
    description:
      "Enjoy free delivery on every order, with no minimum purchase."
  },
  {
    number: "03",
    title: "NO EXCHANGES OR RETURNS",
    description:
      "All purchases are final. Please review your selection carefully before ordering."
  }
];

// --------------------------------------------------
// STORE-WIDE SETTINGS
// --------------------------------------------------

export const STORE_SETTINGS = {
  freeDelivery: true,
  deliveryCharge: 0,
  uvProtection: "UV400 Protected",
  returnsAccepted: false,
  exchangesAccepted: false,
  showStockQuantity: false,
  showOutOfStockStatus: true,
  showVariants: false,
  showProductBadges: false
};
