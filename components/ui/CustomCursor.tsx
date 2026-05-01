"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring-smoothed position for the logo
  const springConfig = { damping: 22, stiffness: 240, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

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
      {/* Tight tracking dot — exact pointer location */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? (hovering ? 0 : 0.9) : 0,
          scale: hovering ? 0 : 1,
        }}
        transition={{ duration: 0.18 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </motion.div>

      {/* DA Logo cursor — spring-smoothed, mix-blend-difference for any-bg legibility */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.6 : 1,
          rotate: hovering ? 8 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <svg
          width="44"
          height="18"
          viewBox="0 0 230 90"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
          style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.4))" }}
        >
          {/* D — angular octagon with bowl cutout */}
          <path
            d="M 5,5 L 65,5 L 90,25 L 90,65 L 65,85 L 5,85 Z M 22,22 L 58,22 L 73,33 L 73,57 L 58,68 L 22,68 Z"
            fill="white"
            fillRule="evenodd"
          />
          {/* A — angular peak with crossbar and inner cutout */}
          <path
            d="M 105,85 L 145,5 L 170,5 L 210,85 L 188,85 L 180,68 L 135,68 L 127,85 Z M 142,52 L 173,52 L 157.5,21 Z"
            fill="white"
            fillRule="evenodd"
          />
        </svg>
      </motion.div>
    </>
  );
}
