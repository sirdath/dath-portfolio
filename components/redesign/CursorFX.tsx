"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Two GSAP-driven cursor effects, per the project's motion rule (drive
 * UI motion through GSAP, not ad-hoc CSS transitions):
 *
 *   1. A soft emerald glow that *lags* behind the pointer (gsap.quickTo
 *      with an eased duration). The lag is what reads as premium — the
 *      sharp arrow cursor stays instant, the ambient light trails it.
 *   2. Magnetic pull on any [data-magnetic] element: while the pointer
 *      is over it, the element eases toward the cursor by a fraction
 *      (data-magnetic="0.4" → 40% of the offset), springing back on
 *      leave. Also quickTo so it never fights itself across frames.
 *
 * Disabled on coarse pointers and prefers-reduced-motion. All listeners
 * and tweens are disposed on unmount.
 */
export function CursorFX() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const glow = glowRef.current;
    if (!glow) return;

    // Glow follows the pointer with smoothing.
    gsap.set(glow, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(glow, "x", { duration: 0.55, ease: "power3" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.55, ease: "power3" });
    let shown = false;
    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!shown) {
        shown = true;
        gsap.to(glow, { autoAlpha: 1, duration: 0.5, ease: "power2.out" });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Magnetic elements.
    const disposers: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic || "0.4") || 0.4;
      const mx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const my = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
      const onElMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        mx((e.clientX - (r.left + r.width / 2)) * strength);
        my((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const onElLeave = () => {
        mx(0);
        my(0);
      };
      el.addEventListener("mousemove", onElMove);
      el.addEventListener("mouseleave", onElLeave);
      disposers.push(() => {
        el.removeEventListener("mousemove", onElMove);
        el.removeEventListener("mouseleave", onElLeave);
        gsap.killTweensOf(el);
      });
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      disposers.forEach((d) => d());
      gsap.killTweensOf(glow);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
