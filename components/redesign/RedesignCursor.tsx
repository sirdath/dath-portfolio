"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Clean accent arrow cursor for the 2026 redesign. Inline SVG, tip at
 * the top-left of the viewBox so the SVG can be positioned with no
 * offset and the tip sits exactly on the pointer. Filled with #2D8659
 * (brand forest green, matches the section accents); thin dark stroke
 * for visibility on light surfaces.
 */
export function RedesignCursor() {
  const [hovering, setHovering] = useState(false);
  const hasMouse = useRef(true);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) {
      hasMouse.current = false;
      return;
    }

    // Add class to html to trigger cursor hiding only when ready
    document.documentElement.classList.add("cursor-custom-ready");

    const onMouseMove = (e: MouseEvent) => {
      // Direct CSS variable updates for 0-latency tracking
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
      
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };
    const onMouseLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select",
      );
      setHovering(!!interactive);
    };

    // Passive listener for performance
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);
    return () => {
      document.documentElement.classList.remove("cursor-custom-ready");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  if (!hasMouse.current) return null;

  return (
    <div
      style={{
        // Use GPU-accelerated transform driven by CSS variables
        transform: "translate3d(var(--mouse-x, -100px), var(--mouse-y, -100px), 0)",
        position: "fixed",
        top: 0,
        left: 0,
        width: 18,
        height: 22,
        zIndex: 9999,
        pointerEvents: "none",
        willChange: "transform",
      }}
    >
      <motion.div
        style={{ transformOrigin: "0 0" }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.2 : 1,
        }}
        transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <svg
          width="18"
          height="22"
          viewBox="0 0 18 22"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          {/* Classic arrow: tip at (0,0), tail goes down and right */}
          <path
            d="M0 0 L0 17 L4.5 13.5 L7.5 20 L10 19 L7 12.5 L13 12.5 Z"
            fill="#2D8659"
            stroke="#0E1117"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
