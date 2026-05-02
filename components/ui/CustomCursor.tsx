"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const smoothX = useSpring(cursorX, { damping: 28, stiffness: 480, mass: 0.4 });
  const smoothY = useSpring(cursorY, { damping: 28, stiffness: 480, mass: 0.4 });

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
    <>
      {/* Hexagon outline - spring-smoothed, references the H3 work */}
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
          scale: hovering ? 1.45 : 1,
          rotate: hovering ? 30 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" className="block">
          <polygon
            points="20,4 34,12 34,28 20,36 6,28 6,12"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.4"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 4px rgba(0,240,255,0.5))" }}
          />
        </svg>
      </motion.div>

      {/* Center dot - exact pointer; fades when hovering interactive elements */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: visible ? (hovering ? 0 : 0.9) : 0 }}
        transition={{ duration: 0.18 }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
          style={{ boxShadow: "0 0 5px rgba(0,240,255,0.7)" }}
        />
      </motion.div>
    </>
  );
}
