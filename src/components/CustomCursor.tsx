"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const checkDesktop = () => {
      const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
      setIsDesktop(mq.matches);
      if (mq.matches) {
        document.documentElement.classList.add("has-custom-cursor");
      } else {
        document.documentElement.classList.remove("has-custom-cursor");
      }
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => {
      window.removeEventListener("resize", checkDesktop);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Check for hoverable elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-hoverable]")
      ) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-hoverable]")
      ) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    // Smooth ring follow with delay
    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px) scale(${isHovering ? 1.8 : 1})`;
      }

      rafRef.current = requestAnimationFrame(animateRing);
    };

    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isDesktop, isHovering, isVisible]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#c9a961",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 300ms ease",
          willChange: "transform",
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid #c9a961",
          backgroundColor: isHovering ? "rgba(201, 169, 97, 0.1)" : "transparent",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 300ms ease, background-color 300ms ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
