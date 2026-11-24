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
    instagramHandle: "@_incred.h_",
    name: "Harsh H.",
    city: "Pune // Viman Nagar",
    image: "/images-web/arashi/arashi-model-1.jpg",
    productId: "prod_arashi",
    productName: "ARASHI",
    productCategory: "The Storm",
    productPrice: 1499,
    productImage: "/images-web/arashi/arashi-front.jpg",
    quote: "Living in the ARASHI frame. Snapped in natural daylight and featured on the SORA runway.",
    verifiedBadge: true,
    featuredStory: "Verified Patron • Community Feature"
  },
  {
    id: "patron-3",
    instagramHandle: "@nazneen",
    name: "Nazneen M.",
    city: "Mumbai // Kharghar",
    image: "/images-web/nagi/nagi-model-2.jpg",
    productId: "prod_nagi",
    productName: "NAGI",
    productCategory: "The Star",
    productPrice: 1799,
    productImage: "/images-web/nagi/nagi-front.jpg",
    quote: "Thought of experimenting with sunglasses and SORA didn't disappoint. The NAGI frame is a perfect blend.",
    verifiedBadge: true,
    featuredStory: "Verified Patron • Studio Highlight"
  },
  {
    id: "patron-2",
    instagramHandle: "@gaawwrgi",
    name: "Gargi T.",
    city: "Mumbai // Kharghar",
    image: "/images-web/hoshi/hoshi-black-model-1.jpg",
    productId: "prod_hoshi",
    productName: "HOSHI",
    productCategory: "The Star",
    productPrice: 1799,
    productImage: "/images-web/hoshi/hoshi-black-front.jpg",
    quote: "The gold geometric frame is pure elegance in the golden hour.",
    verifiedBadge: true,
    featuredStory: "Verified Patron • Studio Highlight"
  },
  
];
