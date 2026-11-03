export interface PatronPost {
  id: string;
  instagramHandle: string;
  name: string;
  city: string;
  image: string;
  productId: string;
  productName: string;
  productCategory: string;
  productPrice: number;
  productImage: string;
  quote: string;
  verifiedBadge: boolean;
  featuredStory: string;
}

export const PATRON_POSTS: PatronPost[] = [
  {
    id: "patron-1",
    instagramHandle: "@aditya.perspective",
    name: "Aditya V.",
    city: "Mumbai // Bandra",
    image: "/images/kaizo/model-1.jpg",
    productId: "prod_kaizo",
    productName: "KAIZŌ",
    productCategory: "Bio-Acetate",
    productPrice: 2499,
    productImage: "/images/kaizo/frame-front.jpg",
    quote: "Living in the KAIZŌ frame. Natural horn striations and golden-hour optics. Snapped in natural daylight and featured on the SORA runway.",
    verifiedBadge: true,
    featuredStory: "Verified Patron • Runway Flagship Feature"
  },
  {
    id: "patron-2",
    instagramHandle: "@tanya.luminary",
    name: "Tanya M.",
    city: "Mumbai // Bandra West",
    image: "/images/hikari/model-smile.jpg",
    productId: "prod_hikari",
    productName: "HIKARI",
    productCategory: "Titanium",
    productPrice: 2999,
    productImage: "/images/hikari/frame-angle.jpg",
    quote: "The 18K champagne gold hexagonal micro-frame is pure elegance. Featherlight 16 grams and crystal-clear polarized amber optics in the golden hour.",
    verifiedBadge: true,
    featuredStory: "Verified Patron • Studio Highlight"
  },
  {
    id: "patron-3",
    instagramHandle: "@zayd.visuals",
    name: "Zayd Al-Mansoor",
    city: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85",
    productId: "prod_sorrel",
    productName: "SORREL",
    productCategory: "Bio-Acetate",
    productPrice: 2299,
    productImage: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85",
    quote: "Razor-cut browline with zero glare under desert sun. Tagged #SeenInSORA and made it to the homepage.",
    verifiedBadge: true,
    featuredStory: "Verified Patron • International Look"
  },
  {
    id: "patron-4",
    instagramHandle: "@tanya_couture",
    name: "Tanya Sen",
    city: "New Delhi, India",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
    productId: "prod_terra",
    productName: "TERRA",
    productCategory: "Bio-Acetate",
    productPrice: 1999,
    productImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85",
    quote: "Mineral tortoise that matches every tailored jacket. Love how SORA replaced traditional models with actual customers.",
    verifiedBadge: true,
    featuredStory: "Verified Patron • Community Spotlight"
  }
];
