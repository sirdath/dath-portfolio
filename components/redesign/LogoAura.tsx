"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.MeshGradient),
  { ssr: false },
);
const GrainGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.GrainGradient),
  { ssr: false },
);
const GodRays = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.GodRays),
  { ssr: false },
);
const NeuroNoise = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.NeuroNoise),
  { ssr: false },
);

const FILL = { width: "100%", height: "100%" } as const;

/* Jewel-emerald + two-tone gold palette. The black is slightly green-tinted
   so it blends into the emerald rather than reading as a hard cutout. Gold
   spots are interleaved with emerald spots so yellow stays visible at all
   times instead of rotating in and out of the frame. */
const BLACK_GREEN = "#050A08";
const EMERALD_DEEP = "#0A3D2A";
const EMERALD_MID = "#1A8553";
const EMERALD_BRIGHT = "#2EBE7E";
const GOLD_WARM = "#EAB838";
const GOLD_BRIGHT = "#FFD647";

const COLORS = [
  EMERALD_DEEP,
  GOLD_WARM,
  EMERALD_MID,
  GOLD_BRIGHT,
  EMERALD_BRIGHT,
  GOLD_WARM,
  BLACK_GREEN,
];

/* maxPixelCount caps GPU fragment work — a 4K retina canvas would otherwise
   shade ~33M pixels per frame on this layer alone. 1.6M gives Linear-tier
   smoothness on a MacBook GPU without visible aliasing inside the masked
   halo area. */
const MAX_PIXELS = 1_600_000;

/** V3 (default) — God Rays. Light rays radiate from the center where
 *  the DATH logo sits, blended with our emerald + gold palette. The
 *  central glow (midSize/midIntensity) gives the logo a haloed feel
 *  while the rays themselves project majestically outward. No grain
 *  texture — the only noise is shader-side ray distortion. */
function V3GodRays() {
  return (
    <GodRays
      colorBack={BLACK_GREEN}
      colorBloom={GOLD_BRIGHT}
      colors={[EMERALD_DEEP, EMERALD_MID, EMERALD_BRIGHT, GOLD_WARM, GOLD_BRIGHT]}
      density={0.45}
      intensity={0.55}
      spotty={0.32}
      midSize={0.3}
      midIntensity={0.72}
      bloom={0.42}
      speed={0.18}
      scale={1.0}
      maxPixelCount={MAX_PIXELS}
      style={FILL}
    />
  );
}

/** V1 — original MeshGradient (smooth flowing colour spots, no grain). */
function V1Mesh() {
  return (
    <MeshGradient
      colors={COLORS}
      distortion={0.95}
      swirl={0.32}
      grainMixer={0}
      grainOverlay={0}
      speed={0.28}
      scale={1.2}
      maxPixelCount={MAX_PIXELS}
      style={FILL}
    />
  );
}

/** V2 — the grain blob preserved for opt-in via ?g=2 only.
 *  Skipped by default because the user disliked the sand texture. */
function V2GrainBlob() {
  return (
    <GrainGradient
      colorBack={BLACK_GREEN}
      colors={COLORS.slice(0, 5)}
      softness={0.95}
      intensity={0.78}
      noise={0.5}
      shape="blob"
      speed={0.42}
      scale={1.6}
      maxPixelCount={MAX_PIXELS}
      style={FILL}
    />
  );
}

/** V4 — Neuro noise. Glowing web of fluid lines + soft intersections.
 *  Three-tone (back / mid / front) so the green↔gold contrast carries
 *  the whole pattern. Algorithm from @zozuar's viral GLSL post. */
function V4NeuroNoise() {
  return (
    <NeuroNoise
      colorBack={BLACK_GREEN}
      colorMid={EMERALD_MID}
      colorFront={GOLD_BRIGHT}
      brightness={0.65}
      contrast={0.55}
      speed={0.22}
      scale={1.1}
      maxPixelCount={MAX_PIXELS}
      style={FILL}
    />
  );
}

/**
 * Custom shader-driven aura that radiates from behind the DATH logo.
 *
 * Renders a smooth WebGL MeshGradient inside the hero .stage. A radial
 * CSS mask fades the gradient at the edges so it reads as a soft
 * atmosphere around the brand mark rather than a wall of colour.
 *
 * Interactivity is CSS-only: a single mousemove listener flips the
 * --cursor-active custom property on :root, which the gold ring CSS
 * uses to subtly bloom while the user is moving. The shader itself
 * never re-renders, so its native 60fps animation is uninterrupted.
 *
 * Variant chosen by ?g=1|2|3 in the URL. Default v3.
 */
export function LogoAura() {
  const [variant, setVariant] = useState<"1" | "2" | "3" | "4">("3");

  useEffect(() => {
    const read = () => {
      const g = new URLSearchParams(window.location.search).get("g");
      if (g === "1" || g === "2" || g === "4") setVariant(g);
      else setVariant("3");
    };
    read();
    window.addEventListener("popstate", read);

    /* CSS-only interactivity: while the cursor is moving, flip the
       --cursor-active flag to 1; reset to 0 after ~1.2s of stillness.
       Setting a CSS custom property is cheap; no React re-renders. */
    let idleTimer: number | undefined;
    const onMove = () => {
      document.documentElement.style.setProperty("--cursor-active", "1");
      if (idleTimer) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        document.documentElement.style.setProperty("--cursor-active", "0");
      }, 1200);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("popstate", read);
      window.removeEventListener("mousemove", onMove);
      if (idleTimer) window.clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div className="logo-aura" aria-hidden="true">
      {variant === "1" ? (
        <V1Mesh />
      ) : variant === "2" ? (
        <V2GrainBlob />
      ) : variant === "4" ? (
        <V4NeuroNoise />
      ) : (
        <V3GodRays />
      )}
    </div>
  );
}
