"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Gentle spring: smooths micro-jitter without lagging behind the
  // pointer in any noticeable way. Damping > stiffness so the cursor
  // settles cleanly instead of oscillating.
  const smoothX = useSpring(cursorX, { damping: 30, stiffness: 500, mass: 0.4 });
  const smoothY = useSpring(cursorY, { damping: 30, stiffness: 500, mass: 0.4 });

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
      );
      setHovering(!!interactive);
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
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: hovering ? 1.1 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <img
        src="/cursor-scope.gif"
        alt=""
        width={56}
        height={56}
        className="block"
        style={{
          imageRendering: "pixelated",
          filter:
            "drop-shadow(0 0 4px rgba(0,240,255,0.4)) drop-shadow(0 0 2px rgba(0,0,0,0.7))",
        }}
      />
    </motion.div>
  );
}
