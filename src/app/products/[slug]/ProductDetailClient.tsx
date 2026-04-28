"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import CSSPerfumeBottle from "@/components/CSSPerfumeBottle";
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
      "All ingredients are ethically sourced and comply with IFRA standards. Our fragrances are free from parabens, phthalates, and synthetic dyes. Each batch undergoes rigorous quality testing.",
  },
  {
    title: "SHIPPING",
    content:
      "Complimentary shipping within India. Orders are carefully wrapped and dispatched within 2–3 business days. International shipping available upon request.",
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
              <Minus size={14} className="text-gold" />
            ) : (
              <Plus size={14} className="text-cream-muted group-hover:text-gold transition-colors duration-300" />
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
              <p className="pb-6 font-inter text-sm text-cream-muted font-light leading-relaxed">
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
          {/* Left: Bottle Display */}
          <div className="md:col-span-7 md:sticky md:top-32 md:self-start">
            <Reveal>
              <GlassCard className="aspect-[4/5] flex items-center justify-center relative overflow-hidden">
                {/* Glow halo */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(201, 169, 97, 0.15) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    pointerEvents: "none",
                  }}
                />
                <div className="relative z-10" style={{ perspective: 1200 }}>
                  <div className="bottle-slow-rotate">
                    <CSSPerfumeBottle
                      scale={1.2}
                      animate={false}
                      variant={variantIndex}
                    />
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          {/* Right: Product Info */}
          <div className="md:col-span-5">
            <Reveal>
              <span className="eyebrow">{product.size.toUpperCase()}</span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl font-light text-cream mt-6 leading-[1.1]">
                {product.name}
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="font-cormorant italic text-xl text-cream-muted mt-3">
                {product.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-gold text-base font-inter font-light mt-12">
                {formatPrice(product.price)}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="font-cormorant italic text-xl sm:text-2xl text-cream-muted mt-12 leading-[1.5]">
                {product.description}
              </p>
            </Reveal>

            {/* Composition */}
            <div className="mt-20">
              <Reveal delay={0.3}>
                <span className="eyebrow">COMPOSITION</span>
              </Reveal>

              <div className="mt-10">
                {notes.map((note, i) => (
                  <Reveal key={note.label} delay={0.35 + i * 0.1}>
                    <div className="border-t border-subtle py-6 flex items-start gap-8 md:gap-12">
                      <span className="eyebrow shrink-0 mt-1 w-16">
                        {note.label}
                      </span>
                      <span className="font-cormorant italic text-cream text-lg">
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
