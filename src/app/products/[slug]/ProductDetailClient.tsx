"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/GlassCard";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { formatPrice, type Product } from "@/lib/products";

interface ProductDetailClientProps {
  product: Product;
  variantIndex: 0 | 1 | 2;
}

const accordionItems = [
  {
    title: "INGREDIENTS",
    content:
      "All ingredients are ethically sourced and comply with IFRA standards. Our fragrances are free from parabens, phthalates, and synthetic dyes. Each batch undergoes rigorous quality testing in our atelier.",
  },
  {
    title: "SHIPPING",
    content:
      "Complimentary shipping within India. Orders are carefully wrapped in our signature black tissue and dispatched within 2–3 business days. International shipping available upon request.",
  },
  {
    title: "RETURNS",
    content:
      "We accept returns within 14 days of delivery for unopened products in their original packaging. Please contact us for return authorization.",
  },
];

function AccordionItem({
  title,
  content,
  index,
}: {
  title: string;
  content: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Reveal delay={0.1 * index}>
      <div className="border-t border-subtle">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-6 group"
          data-hoverable
        >
          <span className="eyebrow">{title}</span>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {isOpen ? (
              <Minus size={14} className="text-gold" strokeWidth={1.5} />
            ) : (
              <Plus size={14} className="text-cream-muted/60 group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
            )}
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p
                className="pb-6 font-inter text-cream-muted/70 font-light leading-[1.8]"
                style={{ fontSize: "13px", letterSpacing: "0.01em" }}
              >
                {content}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function ProductDetailClient({
  product,
  variantIndex,
}: ProductDetailClientProps) {
  const notes = [
    { label: "TOP", value: product.notes.top },
    { label: "HEART", value: product.notes.heart },
    { label: "BASE", value: product.notes.base },
  ];

  return (
    <>
      <div className="pt-32 pb-32 max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left: Product Image Display */}
          <div className="md:col-span-7 md:sticky md:top-32 md:self-start">
            <Reveal>
              <GlassCard className="aspect-[4/5] relative overflow-hidden">
                {/* Glow halo */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
                  style={{
                    width: "80%",
                    height: "80%",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(201, 169, 97, 0.12) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    pointerEvents: "none",
                  }}
                />

                {/* Product Image */}
                <div className="absolute inset-0 p-8 md:p-12">
                  <div className="relative w-full h-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 90vw, 55vw"
                      priority
                    />
                  </div>
                </div>
              </GlassCard>
            </Reveal>

            {/* Ingredients Image Below */}
            <Reveal delay={0.2}>
              <div className="mt-6 relative aspect-[16/7] overflow-hidden rounded-sm">
                <Image
                  src="/images/ingredients.png"
                  alt="Raw ingredients"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 55vw"
                />
                <div className="absolute inset-0 bg-noir/40" />
                <div className="absolute bottom-6 left-6">
                  <span className="eyebrow text-cream/60">RAW INGREDIENTS</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Product Info */}
          <div className="md:col-span-5">
            <Reveal>
              <span className="eyebrow text-gold/70">
                {product.size.toUpperCase()}
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1
                className="font-cormorant font-light text-cream mt-6 leading-[1.05]"
                style={{
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                {product.name}
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p
                className="font-cormorant italic text-cream-muted/70 mt-3"
                style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)" }}
              >
                {product.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p
                className="text-gold/90 font-inter font-light mt-12"
                style={{ fontSize: "15px", letterSpacing: "0.04em" }}
              >
                {formatPrice(product.price)}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p
                className="font-cormorant italic text-cream-muted mt-12 leading-[1.7]"
                style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)" }}
              >
                {product.description}
              </p>
            </Reveal>

            {/* Composition */}
            <div className="mt-20">
              <Reveal delay={0.3}>
                <span className="eyebrow text-cream-muted/50">COMPOSITION</span>
              </Reveal>

              <div className="mt-10">
                {notes.map((note, i) => (
                  <Reveal key={note.label} delay={0.35 + i * 0.1}>
                    <div className="border-t border-subtle py-6 flex items-start gap-8 md:gap-12">
                      <span className="eyebrow shrink-0 mt-1 w-16 text-cream-muted/50">
                        {note.label}
                      </span>
                      <span
                        className="font-cormorant italic text-cream/90"
                        style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}
                      >
                        {note.value}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <Reveal delay={0.6}>
              <div className="mt-20">
                <MagneticButton className="w-full">
                  ADD TO CART
                </MagneticButton>
              </div>
            </Reveal>

            {/* Accordion */}
            <div className="mt-16">
              {accordionItems.map((item, i) => (
                <AccordionItem
                  key={item.title}
                  title={item.title}
                  content={item.content}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
