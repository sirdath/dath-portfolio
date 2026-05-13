"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Editorial cursor for the 2026 redesign — the A from the DATH logo,
 * positioned so its apex (top edge) sits exactly on the pointer
 * position. Acts as a literal brand-integrated arrow cursor.
 */
export function RedesignCursor() {
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Gentle spring so it feels deliberate, not jittery
  const smoothX = useSpring(cursorX, { damping: 28, stiffness: 540, mass: 0.35 });
  const smoothY = useSpring(cursorY, { damping: 28, stiffness: 540, mass: 0.35 });

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

  // Display size: 22px tall — small enough to feel cursor-sized.
  // Source PNG is 59x96 (aspect 0.62); preserve aspect ratio when sizing.
  const CURSOR_HEIGHT = 22;
  const CURSOR_WIDTH = Math.round(22 * (59 / 96));

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
        // translateX -50% centers the apex horizontally on the pointer.
        // translateY 0 keeps the TOP edge of the image AT the pointer Y.
        // Result: the A's apex (top point) sits exactly on the pointer.
        translateX: "-50%",
        translateY: "0%",
        position: "fixed",
        top: 0,
        left: 0,
        width: CURSOR_WIDTH,
        height: CURSOR_HEIGHT,
        zIndex: 9999,
        pointerEvents: "none",
      }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: hovering ? 1.25 : 1,
      }}
      transition={{ duration: 0.28, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <img
        src="/redesign/cursor-a.png"
        alt=""
        width={CURSOR_WIDTH}
        height={CURSOR_HEIGHT}
        style={{ display: "block" }}
      />
    </motion.div>
  );
}
