"use client";

import { useEffect, useRef } from "react";

interface SparklesProps {
  density?: number;
  color?: string;
  className?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vy: number;
  twinkle: number;
  twinkleSpeed: number;
}

/**
 * Subtle sparkles overlay - twinkling particles drifting upward.
 * Aceternity-style ambient effect for hero/CTA backgrounds.
 */
export function Sparkles({
  density = 70,
  color = "#00f0ff",
  className = "",
  minSize = 0.4,
  maxSize = 1.6,
  speed = 0.3,
}: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    let W = 0;
    let H = 0;
    let sparkles: Sparkle[] = [];
    let raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      W = canvas.width = parent.clientWidth * dpr;
      H = canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      // re-init sparkles when size changes
      sparkles = Array.from({ length: density }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: (minSize + Math.random() * (maxSize - minSize)) * dpr,
        opacity: 0.2 + Math.random() * 0.5,
        vy: -(speed + Math.random() * speed) * dpr,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, W, H);
      for (const s of sparkles) {
        s.y += s.vy;
        s.twinkle += s.twinkleSpeed;
        if (s.y < -10) {
          s.y = H + 10;
          s.x = Math.random() * W;
        }
        const a = s.opacity * (0.5 + 0.5 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = a;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density, color, minSize, maxSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
