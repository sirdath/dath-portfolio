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
      {/* Tight tracking dot - exact pointer location */}
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

      {/* DA Logo cursor - spring-smoothed, mix-blend-difference for any-bg legibility */}
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
        <img
          src="/dath-logo.svg"
          alt=""
          width={48}
          height={32}
          className="block"
          style={{
            filter:
              "brightness(0) invert(1) drop-shadow(0 0 6px rgba(255,255,255,0.4))",
          }}
        />
      </motion.div>
    </>
  );
}
