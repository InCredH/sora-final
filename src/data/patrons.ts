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
    productId: "prod_arashi",
    productName: "ARASHI",
    productCategory: "The Storm",
    productPrice: 1499,
    productImage: "/images/kaizo/frame-front.jpg",
    quote: "Living in the ARASHI frame. Snapped in natural daylight and featured on the SORA runway.",
    verifiedBadge: true,
    featuredStory: "Verified Patron • Runway Flagship Feature"
  },
  {
    id: "patron-2",
    instagramHandle: "@tanya.luminary",
    name: "Tanya M.",
    city: "Mumbai // Bandra West",
    image: "/images/hikari/model-smile.jpg",
    productId: "prod_hoshi",
    productName: "HOSHI",
    productCategory: "The Star",
    productPrice: 1799,
    productImage: "/images/hikari/frame-angle.jpg",
    quote: "The gold geometric frame is pure elegance in the golden hour.",
    verifiedBadge: true,
    featuredStory: "Verified Patron • Studio Highlight"
  }
];
