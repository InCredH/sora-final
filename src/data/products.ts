
export interface ProductVariant {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  image: string;
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

  isFeatured?: boolean;
  isEditorialHero?: boolean;
}

export const isBundleEligible = (product: Product): boolean => product.tier !== "Hero";

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
      "/images/hikari/model-1.jpg",
      "/images/hikari/frame-angle.jpg",
      "/images/hikari/model-smile.jpg",
      "/images/hikari/frame-front.jpg",
      "/images/hikari/model-profile.jpg"
    ],
    variants: [
      {
        id: "v_hikari_gold",
        name: "Gold Frame & Brown Lens",
        colorName: "Gold & Brown",
        colorHex: "#C8A96B",
        image: "/images/hikari/model-1.jpg"
      }
    ],

    shortDescription:
      "A gold geometric frame with warm brown lenses, for the kind of shine that never needs to be loud. Sharp in shape, soft in glow.",

    description:
      "Inspired by the sharp, steady light of a star, Hoshi brings a touch of gold to everyday dressing.\n\nIt works from sunlit brunches to poolside afternoons, and from city streets to holiday evenings.\n\nA sleek geometric frame with clean angles, fine gold-toned metal and warm brown lenses come together in a silhouette that's polished, a little unexpected, and quietly luxurious. Precise in shape, soft in tone, Hoshi is made for the days you want to look put together and the moments you want to be noticed.\n\nSome things shine without trying. Hoshi is one of them.",

    reelCaption:
      "Hoshi (星) means star. Gold frame. Brown lens. Sharp angles, soft glow. ✦",

    inStock: true,

    isFeatured: true,
    isEditorialHero: true
  },

  // --------------------------------------------------
  // CORE — TAIYO (太陽) · THE SUN
  // --------------------------------------------------

  {
    id: "prod_taiyo",
    name: "TAIYO",
    subtitle: "The Sun",
    pronunciation: "TIE-yoh",
    japaneseMeaning: "太陽",
    tagline: "Go big. Glow bigger.",

    slug: "taiyo",
    sku: "SORA-TY-002",

    tier: "Core",
    price: TIER_PRICES.Core,

    shape: "Oversized",
    lens: "Warm honey-amber",

    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_taiyo_honey",
        name: "Honey-Amber Lens",
        colorName: "Honey Amber",
        colorHex: "#C88A45",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85"
      }
    ],

    shortDescription:
      "An oversized frame with warm honey lenses, made to be noticed. Bold in scale, golden in glow.",

    description:
      "Inspired by the warmth and sheer scale of the sun, Taiyo brings a big, golden presence to everyday dressing.\n\nIt works from sunlit brunches to long weekend drives, and from the first light of morning to the last of the afternoon.\n\nWide, oversized lenses in a warm honey-amber tint come together in a silhouette that's generous, glamorous and impossible to miss. Big in shape, soft in colour, Taiyo is made for the days you want to take up space and the moments you want to glow.\n\nSome things are meant to be seen from a distance. Taiyo is one of them.",

    reelCaption:
      "Taiyo (太陽) means sun. Oversized frame. Honey lens. Big presence, golden light. ✦",

    inStock: true,

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
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_aozora_blue",
        name: "Silver Frame & Blue Lens",
        colorName: "Silver & Blue",
        colorHex: "#7299C4",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
      }
    ],

    shortDescription:
      "A silver cat-eye with cool blue lenses, made for days that feel light and endless. Delicate in detail, edgy and bold in attitude.",

    description:
      "Inspired by the endless blue of a clear sky, Aozora brings a fresh, effortless energy to everyday dressing.\n\nIt works from sunny afternoon strolls to weekend getaways, and from coffee runs to long drives under open skies.\n\nA sleek silver-toned metal frame, softly sculpted cat-eye edges and cool blue-tinted lenses come together in a silhouette that's elegant, playful and quietly striking. Delicate in its construction, expressive in its shape, Aozora is made for the days you want to feel a little different without trying too hard.\n\nSome days just call for blue skies. Aozora is one of them.",

    reelCaption:
      "Aozora (青空) means blue sky. Silver frame. Blue lenses. A little piece of endless summer. ✦",

    inStock: true,

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

    frame: "Deep sage-green acetate-style",
    lens: "Matching green tint",

    images: [
      "/images/kaizo/model-1.jpg",
      "/images/kaizo/frame-front.jpg",
      "/images/kaizo/model-2.jpg",
      "/images/kaizo/frame-angle.jpg",
      "/images/kaizo/frame-sky.jpg"
    ],
    variants: [
      {
        id: "v_arashi_sage",
        name: "Sage-Green Frame & Green Lens",
        colorName: "Sage Green",
        colorHex: "#6B7055",
        image: "/images/kaizo/model-1.jpg"
      }
    ],

    shortDescription:
      "A deep sage-green frame with matching tinted lenses, made for a little attitude and a lot of character. Bold in colour, effortless in spirit.",

    description:
      "Inspired by the untamed energy of a storm, Arashi brings a bold, grounded attitude to everyday dressing.\n\nIt works from casual city days to spontaneous road trips, and from slow mornings to nights that turn into stories.\n\nA deep sage-green acetate-style frame with matching green-tinted lenses comes together in a silhouette that's confident, distinctive and effortlessly cool. Rich in colour, strong in character, Arashi is made for the days you want to stand out and the moments you don't feel like following the crowd.\n\nNot every storm needs to be loud. Arashi is one of them.",

    reelCaption:
      "Arashi (嵐) means storm. Sage-green frame. Matching green lenses. Calm colour, storm-like attitude. ✦",

    inStock: true,

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
    tagline: "A little warmth in every view.",

    slug: "yuhi",
    sku: "SORA-YH-005",

    tier: "Entry",
    price: TIER_PRICES.Entry,

    shape: "Rectangular",
    frame: "Rich tortoiseshell with gold-toned accents",
    lens: "Deep brown",

    // TODO: replace with real YUHI photography.
    images: ["/images/yuhi/placeholder.svg"],
    variants: [
      {
        id: "v_yuhi_tortoise",
        name: "Tortoiseshell Frame & Brown Lens",
        colorName: "Tortoiseshell",
        colorHex: "#7A4A26",
        image: "/images/yuhi/placeholder.svg"
      }
    ],

    shortDescription:
      "A vintage-inspired rectangular silhouette in rich tortoiseshell, paired with warm brown lenses. Timeless in character, effortless in style.",

    description:
      "Inspired by the warmth of the setting sun and the quiet beauty of golden hour, Yuhi captures the art of understated elegance.\n\nWith its softly sculpted rectangular silhouette, rich tortoiseshell frame and deep brown lenses, Yuhi brings together vintage charm and contemporary sophistication. Subtle amber tones flow through the frame, adding depth and character, while delicate gold-toned accents lend a refined finishing touch.\n\nDesigned for slow afternoons, spontaneous escapes and evenings that linger a little longer, Yuhi is effortlessly versatile. Neither too bold nor too subtle, it makes its presence felt through thoughtful details and timeless proportions.\n\nSome things never go out of style. They simply find a new light.",

    reelCaption:
      "Yuhi (夕日) means sunset. Tortoiseshell tones. Warm brown lenses. A timeless silhouette. An everyday classic, seen in a different light. ✦",

    inStock: true,

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
