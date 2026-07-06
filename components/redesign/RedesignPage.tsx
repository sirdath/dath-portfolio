"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollFieldBackground } from "./ScrollFieldBackground";
import { CursorFX } from "./CursorFX";
import { RedesignNav } from "./RedesignNav";
import { RedesignHero } from "./RedesignHero";
import { Work } from "./sections/Work";
import { Skills } from "./sections/Skills";
import { Trajectory } from "./sections/Trajectory";
import { Certs } from "./sections/Certs";
import { Contact } from "./sections/Contact";
import { ViewCounter } from "./ViewCounter";

/**
 * Composer for the redesigned home page. Owns two cross-cutting client
 * concerns:
 *   1. The IntersectionObserver that adds .in to any .reveal element
 *      once it enters the viewport — drives the section fade-in.
 *
 * Per-section content lives in components/redesign/sections/*. The
 * scroll-driven hero animation lives in RedesignHero.
 */
export function RedesignPage() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      obs.disconnect();
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Scroll-driven ambient field: map → contours → graph → hex */}
      <ScrollFieldBackground />

      <CursorFX />
      <ViewCounter />

      <RedesignNav />
      <RedesignHero />

      <main className="post">
        <Work />
        <Skills />
        <Trajectory />
        <Certs />
        <Contact />
      </main>
    </>
  );
}
