"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Tracing beam for the Trajectory timeline. Renders a bright emerald→ice
 * line in the spine column that "draws" from top to bottom as the section
 * scrolls through the viewport (ScrollTrigger scrub). The faint per-row
 * spines stay as the static track underneath.
 *
 * Desktop only — on mobile the timeline collapses to a single column and
 * the spine is hidden, so the beam is gated behind a matchMedia query.
 * Must be rendered as a direct child of the position:relative .timeline.
 */
export function TimelineBeam() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const track = el?.parentElement;
      if (!el || !track) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 761px)", () => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: track,
              start: "top 72%",
              end: "bottom 60%",
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <span ref={ref} className="tl-beam" aria-hidden="true" />;
}
