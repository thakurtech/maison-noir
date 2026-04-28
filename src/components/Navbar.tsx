"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "SHOP", href: "/#collection" },
  { label: "OUR HOUSE", href: "/#the-house" },
  { label: "CART (0)", href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "bg-noir/70 backdrop-blur-xl border-b border-subtle"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between py-6 px-8 md:px-12 max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <span
              className="font-cormorant text-cream font-light"
              style={{
                fontSize: "clamp(0.875rem, 1.2vw, 1.125rem)",
                letterSpacing: "0.3em",
              }}
            >
              MAISON NOIR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-14">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link font-inter text-cream-muted/80 hover:text-cream transition-colors duration-300 font-light"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase" as const,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-10 text-cream"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Overlay */}
      <motion.div
        initial={false}
        animate={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-40 bg-noir/95 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden"
      >
        <div className="flex flex-col items-center gap-12">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={
                menuOpen
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.8,
                delay: menuOpen ? 0.2 + i * 0.1 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-cormorant text-cream font-light"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 4rem)",
                  letterSpacing: "0.05em",
                }}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile menu footer */}
        <motion.div
          className="absolute bottom-12 text-center"
          initial={{ opacity: 0 }}
          animate={menuOpen ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span className="eyebrow text-cream-muted/40">A SMALL HOUSE OF PERFUME</span>
        </motion.div>
      </motion.div>
    </>
  );
}
