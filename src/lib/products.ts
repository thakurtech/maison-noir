export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  notes: { top: string; heart: string; base: string };
  description: string;
  size: string;
  image: string;
};

export const products: Product[] = [
  {
    slug: "noir-01",
    name: "NOIR 01",
    subtitle: "Oud & Amber",
    price: 14000,
    notes: {
      top: "Bergamot, Pink Pepper",
      heart: "Bulgarian Rose, Saffron",
      base: "Cambodian Oud, Ambergris, Sandalwood",
    },
    description:
      "A meditation in resin and warmth. Composed slowly, worn quietly.",
    size: "50ml — Eau de Parfum",
    image: "/images/noir-01.png",
  },
  {
    slug: "noir-02",
    name: "NOIR 02",
    subtitle: "Iris & Vetiver",
    price: 14000,
    notes: {
      top: "Green Mandarin, Cardamom",
      heart: "Iris Pallida, Orris Butter",
      base: "Haitian Vetiver, Cashmeran",
    },
    description:
      "Cool, mineral, almost architectural. For mornings that demand restraint.",
    size: "50ml — Eau de Parfum",
    image: "/images/noir-02.png",
  },
  {
    slug: "noir-03",
    name: "NOIR 03",
    subtitle: "Rose & Tobacco",
    price: 16000,
    notes: {
      top: "Black Pepper, Pink Grapefruit",
      heart: "Damask Rose Absolute",
      base: "Tobacco Leaf, Tonka, Vanilla Bourbon",
    },
    description:
      "Smoke and petals. The last hour of a long evening.",
    size: "50ml — Eau de Parfum",
    image: "/images/noir-03.png",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
