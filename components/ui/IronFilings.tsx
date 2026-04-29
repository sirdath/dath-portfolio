"use client";

// Iron Filings background — flow-field lines that wrap around the DA logo's
// brightness gradient. Cursor adds a swirl pole that bends the field locally.
// Adapted from inspoemergent V13 MagneticField (Canvas 2D, performant).

import { useEffect, useRef } from "react";
import { sampleLogo, type LogoSample } from "@/lib/logoSampler";
import { getAssetPath } from "@/lib/assets";

const LOGO_SRC = "/logos/da-logo.svg";

export function IronFilings() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let disposed = false;
    let raf = 0;
    let sample: LogoSample | null = null;
    let mx = -9999;
    let my = -9999;
    let t = 0;

    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    // Load + smooth the brightness field
    sampleLogo(getAssetPath(LOGO_SRC), {
      step: 1,
      threshold: 80,
      targetWidth: 360,
    })
      .then((s) => {
        if (disposed) return;
        // Box-blur the brightness map for smoother gradients
        const W = s.width;
        const H = s.height;
        const src = new Float32Array(W * H);
        for (let i = 0; i < W * H; i++) src[i] = s.brightness[i] / 255;
        const dst = new Float32Array(W * H);
        const R = 3;
        for (let y = 0; y < H; y++) {
          for (let x = 0; x < W; x++) {
            let sum = 0;
            let cnt = 0;
            for (let dy = -R; dy <= R; dy++) {
              const yy = y + dy;
              if (yy < 0 || yy >= H) continue;
              for (let dx = -R; dx <= R; dx++) {
                const xx = x + dx;
                if (xx < 0 || xx >= W) continue;
                sum += src[yy * W + xx];
                cnt++;
              }
            }
            dst[y * W + x] = sum / cnt;
          }
        }
        sample = {
          ...s,
          brightness: new Uint8Array(W * H), // unused after blur
        };
        // Store smoothed field on closure variable
        smoothedField = dst;
        smoothedW = W;
        smoothedH = H;
        smoothedAspect = s.aspect;
      })
      .catch((err) => {
        // Silent fail — background just won't render flow lines, but ambient noise still works
        // eslint-disable-next-line no-console
        console.warn("[IronFilings] logo sample failed:", err);
      });

    let smoothedField: Float32Array | null = null;
    let smoothedW = 0;
    let smoothedH = 0;
    let smoothedAspect = 2;

    const render = () => {
      raf = requestAnimationFrame(render);
      t += 0.016;
      const cw = canvas.width;
      const ch = canvas.height;

      // Trail fade — keeps line trails subtle
      ctx.fillStyle = "rgba(9, 9, 11, 0.22)";
      ctx.fillRect(0, 0, cw, ch);

      const cursorOn = mx > -100;
      const cursorX = mx * dpr;
      const cursorY = my * dpr;

      // Logo bounding box centered in viewport
      const fitW = cw * 0.55;
      const fitH = smoothedAspect ? fitW / smoothedAspect : 0;
      const ox = (cw - fitW) / 2;
      const oy = (ch - fitH) / 2;

      const fieldAt = (x: number, y: number): number => {
        if (!smoothedField || !smoothedW || !smoothedH) return 0;
        const u = (x - ox) / fitW;
        const v = (y - oy) / fitH;
        if (u < 0 || u > 1 || v < 0 || v > 1) return 0;
        const sx = Math.floor(u * (smoothedW - 1));
        const sy = Math.floor(v * (smoothedH - 1));
        return smoothedField[sy * smoothedW + sx];
      };
      const gradAt = (x: number, y: number, h: number): [number, number] => {
        const fx = fieldAt(x + h, y) - fieldAt(x - h, y);
        const fy = fieldAt(x, y + h) - fieldAt(x, y - h);
        return [fx, fy];
      };

      const COLS = 80;
      const ROWS = Math.round(COLS * (ch / cw));
      const stepX = cw / COLS;
      const stepY = ch / ROWS;
      const segLen = stepX * 1.05;

      ctx.lineCap = "round";

      for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS; i++) {
          // Jitter to break the grid pattern
          const jx = ((i * 13 + j * 7) % 17) / 17 - 0.5;
          const jy = ((i * 5 + j * 11) % 13) / 13 - 0.5;
          const x = i * stepX + stepX / 2 + jx * stepX * 0.6;
          const y = j * stepY + stepY / 2 + jy * stepY * 0.6;

          const br = fieldAt(x, y);
          const [gx, gy] = gradAt(x, y, stepX * 1.4);
          // Tangent (perpendicular to gradient) — wraps around letters
          let dx = -gy;
          let dy = gx;
          let mag = Math.sqrt(dx * dx + dy * dy) + 1e-6;
          dx /= mag;
          dy /= mag;

          // Ambient curl noise so empty areas have flow too
          const noise =
            Math.sin(x * 0.012 + y * 0.014 + t * 0.6) * 0.7 +
            Math.cos(x * 0.018 - y * 0.011 + t * 0.4) * 0.5;
          const inLogo = mag * 200;
          const w = Math.min(1, inLogo);
          const ax = Math.cos(noise);
          const ay = Math.sin(noise);
          dx = dx * w + ax * (1 - w);
          dy = dy * w + ay * (1 - w);
          mag = Math.sqrt(dx * dx + dy * dy) + 1e-6;
          dx /= mag;
          dy /= mag;

          // Cursor swirl
          let nearC = 0;
          if (cursorOn) {
            const ddx = x - cursorX;
            const ddy = y - cursorY;
            const dd2 = ddx * ddx + ddy * ddy;
            const RR = 220 * dpr;
            if (dd2 < RR * RR) {
              const dd = Math.sqrt(dd2) + 1e-6;
              nearC = 1 - dd / RR;
              const px = -ddy / dd;
              const py = ddx / dd;
              dx = dx * (1 - nearC * 0.85) + px * nearC * 0.85;
              dy = dy * (1 - nearC * 0.85) + py * nearC * 0.85;
              mag = Math.sqrt(dx * dx + dy * dy) + 1e-6;
              dx /= mag;
              dy /= mag;
            }
          }

          const L = segLen * (0.55 + br * 0.6 + nearC * 0.4);
          const ax2 = x - dx * L * 0.5;
          const ay2 = y - dy * L * 0.5;
          const bx = x + dx * L * 0.5;
          const by = y + dy * L * 0.5;

          // Color palette — cyan/purple instead of orange
          // inside logo letters: bright cyan/white; outside: dim cyan; cursor: purple
          const inside = br > 0.35;
          let hue: number;
          let sat: number;
          let light: number;
          if (nearC > 0.25) {
            hue = 280; // purple swirl
            sat = 95;
            light = 65 + nearC * 15;
          } else if (inside) {
            hue = 185; // cyan inside logo
            sat = 90;
            light = 75;
          } else {
            hue = 195; // muted cyan elsewhere
            sat = 35;
            light = 45 + nearC * 25;
          }
          const alpha = 0.18 + br * 0.55 + nearC * 0.5;

          ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
          ctx.lineWidth = (1 + nearC * 1.5 + br * 0.6) * dpr;
          ctx.beginPath();
          ctx.moveTo(ax2, ay2);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }

      // Cursor pole glow
      if (cursorOn) {
        const g = ctx.createRadialGradient(
          cursorX,
          cursorY,
          0,
          cursorX,
          cursorY,
          140 * dpr
        );
        g.addColorStop(0, "hsla(280, 95%, 70%, 0.65)");
        g.addColorStop(0.5, "hsla(280, 95%, 60%, 0.18)");
        g.addColorStop(1, "hsla(280, 95%, 60%, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cursorX, cursorY, 140 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-void pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-void)_92%)] opacity-95" />
    </div>
  );
}
