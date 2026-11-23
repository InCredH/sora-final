import { BUNDLE_TIERS, isBundleEligible, Product } from '../data/products';

interface PricedLine {
  product: Product;
  quantity: number;
}

export interface AppliedBundle {
  size: number;
  price: number;
  count: number;
}

export interface BundleBreakdown {
  /** Bundles applied, e.g. two "2 for ₹2,499". */
  bundles: AppliedBundle[];
  /** Total number of bundles applied. */
  bundleCount: number;
  /** Amount saved versus full price on the bundled frames. */
  bundleDiscount: number;
  /** Full-price value of the frames that went into bundles. */
  bundledValue: number;
  /** Eligible frames in the bag (everything except HOSHI). */
  eligibleUnits: number;
  /** Eligible frames left over that are not in a bundle. */
  unpairedEligibleUnits: number;
}

/**
 * Groups bundle-eligible frames (everything except the Hero tier) into
 * the bundles in BUNDLE_TIERS (currently "2 for ₹2,499"). Every mix of
 * bundle sizes is tried and the one that saves the customer the most wins. The most
 * expensive frames go into bundles first, so any leftover frame is the
 * cheapest one.
 */
export const calculateBundle = (lines: PricedLine[]): BundleBreakdown => {
  const prices = lines
    .filter((line) => isBundleEligible(line.product))
    .flatMap((line) => Array<number>(line.quantity).fill(line.product.price))
    .sort((a, b) => b - a);

  const n = prices.length;
  const prefix = [0];
  for (const p of prices) prefix.push(prefix[prefix.length - 1] + p);

  // best[u] = biggest saving from bundling exactly the u priciest frames.
  const best: { discount: number; counts: number[] }[] = [{ discount: 0, counts: BUNDLE_TIERS.map(() => 0) }];
  for (let u = 1; u <= n; u++) {
    let pick: { discount: number; counts: number[] } | null = null;
    BUNDLE_TIERS.forEach((tier, i) => {
      const prev = best[u - tier.size];
      if (u < tier.size || !prev) return;
      const discount = prev.discount + prefix[u] - prefix[u - tier.size] - tier.price;
      if (!pick || discount > pick.discount) {
        const counts = [...prev.counts];
        counts[i] += 1;
        pick = { discount, counts };
      }
    });
    best.push(pick ?? (undefined as never));
  }

  // Bigger saving wins; on a tie, bundle more frames.
  let units = 0;
  for (let u = 1; u <= n; u++) {
    if (best[u] && best[u].discount >= best[units].discount) units = u;
  }
  const chosen = best[units];

  const bundles: AppliedBundle[] = BUNDLE_TIERS.map((t, i) => ({ size: t.size, price: t.price, count: chosen.counts[i] }))
    .filter((b) => b.count > 0)
    .sort((a, b) => b.size - a.size);
  const bundleCount = bundles.reduce((sum, b) => sum + b.count, 0);

  return {
    bundles,
    bundleCount,
    bundleDiscount: Math.max(0, chosen.discount),
    bundledValue: prefix[units],
    eligibleUnits: n,
    unpairedEligibleUnits: n - units,
  };
};

/** e.g. "2 for ₹2,499" or "2 × 2 for ₹2,499". */
export const describeBundles = (bundles: AppliedBundle[], formatPrice: (n: number) => string): string =>
  bundles
    .map((b) => `${b.count > 1 ? `${b.count} × ` : ''}${b.size} for ${formatPrice(b.price)}`)
    .join(' + ');
