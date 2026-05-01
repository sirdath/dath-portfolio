"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.55 };
  const smoothX = useSpring(trailX, springConfig);
  const smoothY = useSpring(trailY, springConfig);

  const hasMouse = useRef(true);
  const visibleRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) {
      hasMouse.current = false;
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const onMouseEnter = () => {
      visibleRef.current = true;
      setVisible(true);
    };
    const onMouseLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      ) as HTMLElement | null;
      setHovering(!!interactive);
      if (interactive) {
        const label =
          interactive.getAttribute("data-cursor-label") ||
          (interactive.tagName === "A" ? "open" : null);
        setHoverLabel(label);
      } else {
        setHoverLabel(null);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hasMouse.current) return null;

  return (
    <>
      {/* Inner dot — exact tracking */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 0 : 1,
        }}
        transition={{ duration: 0.18 }}
      >
        <div className="w-2 h-2 rounded-full bg-accent-cyan" />
      </motion.div>

      {/* Outer ring — spring-following */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 2.4 : 1,
          backgroundColor: hovering
            ? "rgba(0,240,255,0.12)"
            : "rgba(0,240,255,0)",
          borderColor: hovering
            ? "rgba(0,240,255,0.6)"
            : "rgba(0,240,255,0.4)",
        }}
        transition={{ duration: 0.25 }}
      >
        <div className="w-8 h-8 rounded-full border" />
      </motion.div>

      {/* Trailing label that follows pointer when hovering interactive elements */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "20px",
          translateY: "20px",
        }}
        animate={{
          opacity: hovering && hoverLabel ? 1 : 0,
          y: hovering && hoverLabel ? 20 : 30,
        }}
        transition={{ duration: 0.25 }}
      >
        <span className="rounded-full bg-accent-cyan text-void px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] whitespace-nowrap shadow-[0_4px_24px_rgba(0,240,255,0.3)]">
          {hoverLabel}
        </span>
      </motion.div>
    </>
  );
}
