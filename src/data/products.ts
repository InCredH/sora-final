
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
  frameMaterial: "Metal" | "Cellulose Propionate";
  uvProtection: string;
  hingeType: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  pronunciation: string;
  japaneseMeaning: string;
  tagline: string;
  slug: string;
  sku: string;

  price: number;
  salePrice: number | null;

  category: "Metal" | "Cellulose Propionate";
  shape: string;

  badge?: "NEW ARRIVAL" | "BESTSELLER" | "LIMITED RUN" | "SALE";

  rating?: number;
  reviewCount?: number;

  images: string[];

  // Optional: only use when a design has actual variants.
  variants: ProductVariant[];

  shortDescription: string;
  description?: string;
  reelCaption?: string;

  specifications: ProductSpec;

  // Internal stock information.
  // Never display the exact quantity on the storefront.
  inStock: boolean;
  stockCount: number;


  isFeatured?: boolean;
  isEditorialHero?: boolean;
}

export const PRODUCTS: Product[] = [

  // --------------------------------------------------
  // 01. HOSHI — THE STAR
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

    price: 1499,
    salePrice: 1299,

    category: "Metal",
    shape: "Geometric",

    rating: 5.0,
    reviewCount: 0,

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
    ],

    shortDescription:
      "A gold geometric frame with warm brown lenses, for the kind of shine that never needs to be loud. Sharp in shape, soft in glow.",

    description:
      "Inspired by the sharp, steady light of a star, Hoshi brings a touch of gold to everyday dressing.\n\nIt works from sunlit brunches to poolside afternoons, and from city streets to holiday evenings.\n\nA sleek geometric frame with clean angles, fine gold-toned metal and warm brown lenses come together in a silhouette that's polished, a little unexpected, and quietly luxurious. Precise in shape, soft in tone, Hoshi is made for the days you want to look put together and the moments you want to be noticed.\n\nSome things shine without trying. Hoshi is one of them.",

    reelCaption:
      "Hoshi (星) means star. Gold frame. Brown lens. Sharp angles, soft glow. ✦",

    specifications: {
      frameWidth: "138 mm",
      lensWidth: "51 mm",
      bridgeWidth: "18 mm",
      templeLength: "142 mm",
      weight: "18 g",
      lensMaterial: "Polycarbonate",
      frameMaterial: "Metal",
      uvProtection: "UV400 Protected",
      hingeType: "Metal Hinges"
    },

    stockCount: 2,
    inStock: true,

    isFeatured: true,
    isEditorialHero: true
  },

  // --------------------------------------------------
  // 02. TAIYO — THE SUN
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

    price: 1599,
    salePrice: null,

    category: "Cellulose Propionate",
    shape: "Oversized Square",

    rating: 0,
    reviewCount: 0,

    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85"
    ],
    variants: [
      {
        id: "v_taiyo_honey",
        name: "Honey Amber",
        colorName: "Honey Amber",
        colorHex: "#C88A45",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85"
      }
    ],

    shortDescription:
      "An oversized frame with warm honey lenses, made to be noticed. Bold in scale, golden in glow.",

    description:
      "Inspired by the warmth and sheer scale of the sun, Taiyo brings a big, golden presence to everyday dressing.\n\nIt works from sunlit brunches to long weekend drives, and from the first light of morning to the last of the afternoon.\n\nWide, oversized lenses in a warm honey-amber tint come together in a silhouette that’s generous, glamorous and impossible to miss. Big in shape, soft in colour, Taiyo is made for the days you want to take up space and the moments you want to glow.\n\nSome things are meant to be seen from a distance. Taiyo is one of them.",

    reelCaption:
      "Taiyo (太陽) means sun. Oversized frame. Honey lens. Big presence, golden light. ✦",

    specifications: {
      frameWidth: "145 mm",
      lensWidth: "56 mm",
      bridgeWidth: "19 mm",
      templeLength: "145 mm",
      weight: "29 g",
      lensMaterial: "Polycarbonate",
      frameMaterial: "Cellulose Propionate",
      uvProtection: "UV400 Protected",
      hingeType: "Reinforced Hinges"
    },

    stockCount: 6,
    inStock: true,

    isFeatured: true
  },

  // --------------------------------------------------
  // 03. AOZORA — THE BLUE SKY
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

    price: 1399,
    salePrice: null,

    category: "Metal",
    shape: "Cat-Eye",

    rating: 0,
    reviewCount: 0,

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

    specifications: {
      frameWidth: "140 mm",
      lensWidth: "52 mm",
      bridgeWidth: "18 mm",
      templeLength: "143 mm",
      weight: "17 g",
      lensMaterial: "Polycarbonate",
      frameMaterial: "Metal",
      uvProtection: "UV400 Protected",
      hingeType: "Metal Hinges"
    },

    stockCount: 5,
    inStock: true,

    isFeatured: true
  },

  // --------------------------------------------------
  // 04. ARASHI — THE STORM
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

    price: 1599,
    salePrice: null,

    category: "Cellulose Propionate",
    shape: "Square",

    rating: 0,
    reviewCount: 0,

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
        name: "Sage Green",
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

    specifications: {
      frameWidth: "144 mm",
      lensWidth: "52 mm",
      bridgeWidth: "20 mm",
      templeLength: "148 mm",
      weight: "28 g",
      lensMaterial: "Polycarbonate",
      frameMaterial: "Cellulose Propionate",
      uvProtection: "UV400 Protected",
      hingeType: "Reinforced Hinges"
    },

    stockCount: 4,
    inStock: true,

    isFeatured: true,
    isEditorialHero: true
  }

];

// --------------------------------------------------
// PRODUCT INFORMATION SECTIONS
// Keep these three sections available on product pages.
// --------------------------------------------------

export const PRODUCT_INFO_SECTIONS = [
  "Dimensions",
  "Materials & Craft",
  "Unboxing & Packaging"
] as const;

// --------------------------------------------------
// REVIEWS
// Empty until genuine customer reviews are available.
// --------------------------------------------------

export const REVIEWS = [];

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
