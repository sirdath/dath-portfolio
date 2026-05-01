"use client";

import { useEffect, useState } from "react";
import { ShaderDotGridLazy } from "./ShaderDotGridLazy";
import { FlowFieldLazy } from "./FlowFieldLazy";

/**
 * Crossfades between two interactive 3D backgrounds based on scroll position.
 * - Top of page → Project Atlas: ShaderDotGrid (dot grid + mouse trail)
 * - Past Atlas → Bottom of page: FlowField (flowing noise field with mouse vortex)
 *
 * Atlas section itself has a solid bg-void so neither is visible during it.
 */
export function BackgroundManager() {
  const [progress, setProgress] = useState(0); // 0 = dot grid, 1 = flow field

  useEffect(() => {
    const handler = () => {
      const atlas = document.getElementById("atlas");
      if (!atlas) {
        setProgress(0);
        return;
      }
      const rect = atlas.getBoundingClientRect();
      // Crossfade triggered as atlas scrolls past viewport center
      // 0 when atlas mid is below half-viewport (still on hero/marquee)
      // 1 when atlas bottom passes viewport top (scrolled past atlas)
      const atlasMidpoint = (rect.top + rect.bottom) / 2;
      const t = 1 - Math.max(0, Math.min(1, atlasMidpoint / window.innerHeight));
      setProgress(t);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-0 transition-opacity duration-700 ease-out"
        style={{ opacity: 1 - progress }}
      >
        <ShaderDotGridLazy />
      </div>
      <div
        className="fixed inset-0 z-0 transition-opacity duration-700 ease-out"
        style={{ opacity: progress }}
      >
        <FlowFieldLazy />
      </div>
    </>
  );
}
