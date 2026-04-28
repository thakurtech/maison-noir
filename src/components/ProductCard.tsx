"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import GlassCard from "./GlassCard";
import CSSPerfumeBottle from "./CSSPerfumeBottle";
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
          <div className="relative aspect-[3/4] bg-gradient-to-br from-noir-elevated to-noir overflow-hidden flex items-center justify-center">
            {/* Glow behind bottle on hover */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms]"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(201, 169, 97, 0.08) 0%, transparent 60%)",
              }}
            />

            {/* Bottle */}
            <div className="relative z-10 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-y-[20deg]"
              style={{
                transform: "scale(0.7)",
                transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="group-hover:[transform:rotateY(20deg)] transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                <CSSPerfumeBottle
                  animate={true}
                  variant={index as 0 | 1 | 2}
                  scale={1}
                />
              </div>
            </div>
          </div>

          {/* Card Info */}
          <div className="p-8">
            <h3 className="font-cormorant text-2xl text-cream font-light">
              {product.name}
            </h3>
            <p className="font-cormorant italic text-sm text-cream-muted mt-1">
              {product.subtitle}
            </p>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-gold text-sm font-inter font-light">
                {formatPrice(product.price)}
              </span>
              <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-cream-muted group-hover:text-gold transition-colors duration-300">
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
