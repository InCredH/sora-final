/**
 * Editable public copy lives here (and nowhere else) so it can move into the
 * admin or a CMS later without touching page code.
 */
export const SITE = {
  name: "SORA",
  tagline: "SEE YOUR WAY.",
  /** Replace with the real profile URL */
  instagramUrl: "https://www.instagram.com/",
  contact: {
    email: "[email address]",
    phone: "[phone / WhatsApp]",
    address: "[studio address]",
    hours: "[opening hours]",
  },
};

export const NAV = [
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_NAV = [
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
  { label: "Shipping", to: "/shipping-returns" },
  { label: "Returns", to: "/shipping-returns?section=returns" },
];

export const HERO = {
  line: "Timeless shades for modern days.",
  cta: { label: "SHOP NOW", to: "/shop" },
  // secondary: { label: "OUR STORY", to: "/about" },
};

export const BRAND_STATEMENT = {
  title: "SEE YOUR WAY.",
  body: ["A person's style is not just what they wear.", "It is how they choose to see the world."],
  note: "Confidence looks good on you.",
  cta: { label: "OUR STORY", to: "/about" },
};

/** The campaign block is driven by this object so it can become admin-editable later. */
export const CAMPAIGN = {
  label: "The Edit",
  title: "New Collection",
  lines: ["Bolder shapes.", "Softer tones.", "Same vision."],
  cta: { label: "EXPLORE", to: "/shop?new=1" },
  image: "sun-sand",
  imageAlt: "SORA frame resting on warm stone",
};

export const VALUES = ["UV PROTECTION", "PREMIUM QUALITY", "SUSTAINABLE PACKAGING", "TIMELESS DESIGN"] as const;

/** Placeholder tiles until the Instagram feed is connected */
export const INSTAGRAM_TILES: Array<{ kind: "image" | "burgundy" | "olive"; asset?: string; alt?: string }> = [
  { kind: "image", asset: "woman-2", alt: "SORA in soft daylight" },
  { kind: "image", asset: "sun-sand", alt: "Frame on sunlit stone" },
  { kind: "burgundy" },
  { kind: "image", asset: "cliffs", alt: "Coastline" },
  { kind: "image", asset: "pouch", alt: "Linen pouch" },
  { kind: "olive" },
];

export const FAQ = [
  { q: "How do I choose the right frame?", a: "Start with the shape you are drawn to. Each product page lists material, colour and dimensions so you can compare before you buy." },
  { q: "How do I care for my SORA?", a: "Wipe lenses with a soft cloth, rinse with lukewarm water when needed, and keep your pair in its pouch when it is not on your face." },
  { q: "How long does delivery take?", a: "Delivery timelines will be published here once they are confirmed." },
  { q: "Can I return or exchange an item?", a: "Our returns policy will appear here. You can also find it on the Shipping & Returns page." },
  { q: "Which payment methods do you accept?", a: "Online checkout is not open yet. Accepted payment methods will be listed here when it is." },
  { q: "How can I reach SORA?", a: "Send a note through the Contact page and we will get back to you." },
];

export const SHIPPING_SECTIONS = [
  {
    id: "shipping",
    title: "Shipping",
    items: [
      { h: "Processing time", p: "Details to be added." },
      { h: "Delivery timelines", p: "Details to be added." },
      { h: "Shipping charges", p: "Details to be added." },
      { h: "Order tracking", p: "Details to be added." },
    ],
  },
  {
    id: "returns",
    title: "Returns & exchanges",
    items: [
      { h: "Return window", p: "Details to be added." },
      { h: "Condition of items", p: "Details to be added." },
      { h: "How to start a return", p: "Details to be added." },
      { h: "Refunds", p: "Details to be added." },
    ],
  },
];

export const LEGAL = {
  privacy: { title: "Privacy Policy", body: "Privacy policy text will be added here." },
  terms: { title: "Terms & Conditions", body: "Terms and conditions text will be added here." },
};
