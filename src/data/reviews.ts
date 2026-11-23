// --------------------------------------------------
// PRODUCT REVIEWS
// --------------------------------------------------
//
// PRODUCT_REVIEWS: real customer reviews. These show on the live website.
// Add one entry per review, e.g. from a WhatsApp or Instagram DM
// (ask the customer before using their name).
//
// SAMPLE_REVIEWS: placeholder reviews for checking the design. They only
// show while running the site locally (npm run dev) and never on the
// live website, because made-up reviews shown to real shoppers would
// mislead them. Delete them once real reviews are in.

export interface ProductReview {
  id: string;
  productId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  author: string;
  city: string;
  comment: string;
}

export const PRODUCT_REVIEWS: ProductReview[] = [];

const SAMPLE_REVIEWS: ProductReview[] = [
  { id: 's1', productId: 'prod_hoshi', rating: 5, author: 'Riya S.', city: 'Mumbai', comment: 'The gold frame looks so much richer in person. Light on the face and I get asked about them every time I wear them.' },
  { id: 's2', productId: 'prod_hoshi', rating: 5, author: 'Kabir M.', city: 'Pune', comment: 'Sharp shape, well finished. Feels like a much more expensive pair.' },
  { id: 's3', productId: 'prod_nagi', rating: 5, author: 'Ananya R.', city: 'Bengaluru', comment: 'Solid build and very comfortable. My everyday pair now.' },
  { id: 's4', productId: 'prod_nagi', rating: 5, author: 'Dev P.', city: 'Ahmedabad', comment: 'Fits well, lenses are clear and dark enough for afternoon drives.' },
  { id: 's5', productId: 'prod_aozora', rating: 5, author: 'Meher K.', city: 'Delhi', comment: 'The blue lenses are so much fun. Perfect for beach days.' },
  { id: 's6', productId: 'prod_aozora', rating: 5, author: 'Ishaan T.', city: 'Goa', comment: 'Light, fits well and looks great in photos.' },
  { id: 's7', productId: 'prod_arashi', rating: 5, author: 'Tanvi J.', city: 'Hyderabad', comment: 'Love the green. Thick frame, feels sturdy, and great for the price.' },
  { id: 's8', productId: 'prod_arashi', rating: 5, author: 'Arjun N.', city: 'Chennai', comment: 'Bold look without being too much. Wear them daily.' },
  { id: 's9', productId: 'prod_yuhi', rating: 5, author: 'Sana A.', city: 'Jaipur', comment: 'The tortoiseshell is beautiful and goes with everything.' },
  { id: 's10', productId: 'prod_yuhi', rating: 5, author: 'Rohan V.', city: 'Kolkata', comment: 'Light, comfortable and a classic shape. Great value.' },
];

export const SHOW_SAMPLE_REVIEWS = import.meta.env.DEV;

export const getProductReviews = (productId: string): ProductReview[] =>
  [...PRODUCT_REVIEWS, ...(SHOW_SAMPLE_REVIEWS ? SAMPLE_REVIEWS : [])].filter(
    (r) => r.productId === productId
  );

export const getRatingSummary = (productId: string) => {
  const reviews = getProductReviews(productId);
  if (reviews.length === 0) return null;
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return { average: Math.round(average * 10) / 10, count: reviews.length, reviews };
};
