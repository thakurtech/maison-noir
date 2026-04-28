"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import GlassCard from "./GlassCard";
import { formatPrice, type Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={`/products/${product.slug}`} className="block group">
        <GlassCard className="hover:-translate-y-2 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
          {/* Image Area */}
          <div className="relative aspect-[3/4] bg-gradient-to-br from-noir-elevated to-noir overflow-hidden">
            {/* Glow behind bottle on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] z-10"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(201, 169, 97, 0.12) 0%, transparent 60%)",
              }}
            />

            {/* Product Image */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 90vw, 30vw"
                />
              </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-noir-glass to-transparent z-20 pointer-events-none" />
          </div>

          {/* Card Info */}
          <div className="p-8">
            <h3
              className="font-cormorant text-cream font-light"
              style={{ fontSize: "clamp(1.5rem, 2vw, 1.75rem)", letterSpacing: "-0.01em" }}
            >
              {product.name}
            </h3>
            <p className="font-cormorant italic text-[13px] text-cream-muted/70 mt-1.5 tracking-wide">
              {product.subtitle}
            </p>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-gold/90 font-inter font-light" style={{ fontSize: "13px", letterSpacing: "0.04em" }}>
                {formatPrice(product.price)}
              </span>
              <span
                className="font-inter uppercase text-cream-muted/60 group-hover:text-gold transition-colors duration-300"
                style={{ fontSize: "9px", letterSpacing: "0.3em" }}
              >
                VIEW{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
