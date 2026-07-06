"use client";

import { useEffect } from "react";
import gsap from "gsap";

/**
 * Magnetic pull on any [data-magnetic] element: while the pointer is over it,
 * the element eases toward the cursor by a fraction (data-magnetic="0.4" →
 * 40% of the offset), springing back on leave. quickTo so it never fights
 * itself across frames. Disabled on coarse pointers and reduced-motion.
 *
 * The ambient emerald glow that used to trail the pointer was removed on
 * request — nothing tracks the cursor anymore.
 */
export function CursorFX() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const disposers: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic || "0.4") || 0.4;
      const mx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const my = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
      
      let rectLeft = 0, rectTop = 0, rectWidth = 0, rectHeight = 0;
      
      const onElEnter = () => {
        const r = el.getBoundingClientRect();
        rectLeft = r.left + window.scrollX;
        rectTop = r.top + window.scrollY;
        rectWidth = r.width;
        rectHeight = r.height;
      };

      const onElMove = (e: MouseEvent) => {
        const centerX = rectLeft + rectWidth / 2;
        const centerY = rectTop + rectHeight / 2;
        mx((e.pageX - centerX) * strength);
        my((e.pageY - centerY) * strength);
      };
      
      const onElLeave = () => {
        mx(0);
        my(0);
      };
      
      el.addEventListener("mouseenter", onElEnter);
      el.addEventListener("mousemove", onElMove);
      el.addEventListener("mouseleave", onElLeave);
      disposers.push(() => {
        el.removeEventListener("mouseenter", onElEnter);
        el.removeEventListener("mousemove", onElMove);
        el.removeEventListener("mouseleave", onElLeave);
        gsap.killTweensOf(el);
      });
    });

    return () => {
      disposers.forEach((d) => d());
    };
  }, []);

  return null;
}
