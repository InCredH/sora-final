import { BUNDLE_OFFER, isBundleEligible, Product } from '../data/products';

interface PricedLine {
  product: Product;
  quantity: number;
}

export interface BundleBreakdown {
  /** Number of complete "2 for ₹2,499" bundles applied. */
  bundleCount: number;
  /** Amount saved versus full price on the bundled frames. */
  bundleDiscount: number;
  /** Full-price value of the frames that went into bundles. */
  bundledValue: number;
  /** Eligible frames left over that are not in a bundle (0 or 1). */
  unpairedEligibleUnits: number;
}

/**
 * Pairs bundle-eligible frames (everything except the Hero tier) into
 * "any 2 for ₹2,499" bundles. The most expensive eligible frames are paired
 * first, so a leftover single frame is always the cheapest one and the
 * customer gets the largest saving.
 */
export const calculateBundle = (lines: PricedLine[]): BundleBreakdown => {
  const eligibleUnitPrices = lines
    .filter((line) => isBundleEligible(line.product))
    .flatMap((line) => Array<number>(line.quantity).fill(line.product.price))
    .sort((a, b) => b - a);

  const bundleCount = Math.floor(eligibleUnitPrices.length / BUNDLE_OFFER.size);
  const bundledValue = eligibleUnitPrices
    .slice(0, bundleCount * BUNDLE_OFFER.size)
    .reduce((sum, price) => sum + price, 0);
  const bundleDiscount = Math.max(0, bundledValue - bundleCount * BUNDLE_OFFER.price);

  return {
    bundleCount,
    bundleDiscount,
    bundledValue,
    unpairedEligibleUnits: eligibleUnitPrices.length % BUNDLE_OFFER.size,
  };
};
