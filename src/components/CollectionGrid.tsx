"use client";

import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import Reveal, { WordReveal } from "./Reveal";

export default function CollectionGrid() {
  return (
    <section id="collection" className="py-32 md:py-48 max-w-[1440px] mx-auto px-6 md:px-12">
      {/* Header */}
      <div className="mb-24 md:mb-32 text-center">
        <Reveal>
          <span className="eyebrow text-gold/80">THE COLLECTION</span>
        </Reveal>

        <WordReveal
          text="Three compositions."
          className="mt-8 font-cormorant text-cream font-light text-center justify-center"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            letterSpacing: "-0.02em",
          }}
          delay={0.2}
        />

        <Reveal delay={0.4}>
          <p
            className="mt-8 font-cormorant italic text-cream-muted text-center max-w-md mx-auto leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
          >
            Each made in small batches. Each, a different language.
          </p>
        </Reveal>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
