"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Clean red arrow cursor for the 2026 redesign. Inline SVG, tip at the
 * top-left of the viewBox so the SVG can be positioned with no offset
 * and the tip sits exactly on the pointer. Filled with #E63946 (brand
 * red, matches the "ai" highlight); thin dark stroke for visibility on
 * light surfaces.
 */
export function RedesignCursor() {
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const smoothX = useSpring(cursorX, { damping: 30, stiffness: 600, mass: 0.3 });
  const smoothY = useSpring(cursorY, { damping: 30, stiffness: 600, mass: 0.3 });

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
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
        // Scale from the tip (top-left) so the hotspot stays anchored
        // when the cursor grows on hover.
        transformOrigin: "0 0",
        position: "fixed",
        top: 0,
        left: 0,
        width: 18,
        height: 22,
        zIndex: 9999,
        pointerEvents: "none",
      }}
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
          fill="#E63946"
          stroke="#0E1117"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
