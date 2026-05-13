"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Editorial cursor for the 2026 redesign. Simple red ring, gentle spring,
 * pixel-precise center dot. No glow, no halo — designed to feel as
 * deliberate as the rest of the design system.
 */
export function RedesignCursor() {
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Gentle spring on the ring, tight tracking on the dot.
  const smoothX = useSpring(cursorX, { damping: 30, stiffness: 520, mass: 0.35 });
  const smoothY = useSpring(cursorY, { damping: 30, stiffness: 520, mass: 0.35 });

  const hasMouse = useRef(true);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) {
      hasMouse.current = false;
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hasMouse.current) return null;

  return (
    <>
      {/* Outer ring — spring-smoothed */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1.5px solid #E63946",
          background: hovering ? "rgba(230, 57, 70, 0.18)" : "transparent",
          zIndex: 9998,
          pointerEvents: "none",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.45 : 1,
        }}
        transition={{ duration: 0.28, ease: [0.25, 0.4, 0.25, 1] }}
      />

      {/* Center dot — tracks the exact pointer */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "#E63946",
          zIndex: 9999,
          pointerEvents: "none",
        }}
        animate={{ opacity: visible ? (hovering ? 0 : 0.95) : 0 }}
        transition={{ duration: 0.18 }}
      />
    </>
  );
}
