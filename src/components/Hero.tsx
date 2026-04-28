"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import MagneticButton from "./MagneticButton";
import { WordReveal } from "./Reveal";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bottleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bottleScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const bottleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setMousePos({
        x: ((e.clientX - centerX) / (rect.width / 2)) * 8,
        y: ((e.clientY - centerY) / (rect.height / 2)) * -8,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-noir"
    >
      {/* Background Glow Blobs */}
      <div
        className="absolute opacity-15"
        style={{
          top: "10%",
          left: "15%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201, 169, 97, 0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "drift-1 16s ease-in-out infinite",
        }}
      />
      <div
        className="absolute opacity-10"
        style={{
          top: "50%",
          right: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201, 169, 97, 0.25) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "drift-2 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute opacity-10"
        style={{
          bottom: "10%",
          left: "40%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201, 169, 97, 0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "drift-3 14s ease-in-out infinite",
        }}
      />

      {/* Film Grain */}
      <div className="film-grain" />

      {/* Content Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center h-full max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Left: Text */}
        <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-center pt-20 md:pt-0">
          <motion.span
            className="eyebrow text-gold/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            EAU DE PARFUM — 50ML
          </motion.span>

          <WordReveal
            text="Composed in silence."
            className="mt-8 font-cormorant text-cream font-light leading-[0.95]"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.03em" }}
            stagger={0.12}
            delay={0.5}
          />

          <motion.p
            className="mt-10 font-cormorant italic text-cream-muted max-w-md leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            A perfume for those who notice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14"
          >
            <Link href="/#collection">
              <MagneticButton>DISCOVER THE COLLECTION</MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Right: Hero Bottle Image */}
        <div className="md:col-span-6 lg:col-span-5 flex items-center justify-center mt-8 md:mt-0">
          <motion.div
            className="relative w-full max-w-[500px] aspect-[3/4]"
            style={{
              y: bottleY,
              scale: bottleScale,
              opacity: bottleOpacity,
              rotateX: mousePos.y * 0.3,
              rotateY: mousePos.x * 0.3,
            }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Glow Halo Behind */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bottle-glow"
              style={{
                width: "120%",
                height: "120%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(201, 169, 97, 0.15) 0%, transparent 65%)",
                filter: "blur(60px)",
                pointerEvents: "none",
              }}
            />

            <Image
              src="/images/hero-bottle.png"
              alt="MAISON NOIR Perfume"
              fill
              className="object-contain drop-shadow-2xl relative z-10"
              priority
              sizes="(max-width: 768px) 80vw, 40vw"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="font-inter text-[9px] tracking-[0.3em] text-cream-muted/40 uppercase font-light">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-8 bg-cream-muted/20 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
