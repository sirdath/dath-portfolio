"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  pulse: number;
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  progress: number;
  hue: number;
}

const NODE_COUNT = 70;
const CONNECTION_DISTANCE = 180;
const MOUSE_RADIUS = 220;

export function ConstellationField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    let W = 0;
    let H = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth * dpr;
      H = canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    let mouseX = -9999;
    let mouseY = -9999;
    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX * dpr;
      mouseY = e.clientY * dpr;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3 * dpr,
        vy: (Math.random() - 0.5) * 0.3 * dpr,
        radius: (1 + Math.random() * 1.4) * dpr,
        hue: Math.random() < 0.65 ? 185 : 280,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const pulses: Pulse[] = [];
    let pulseTimer = 0;

    const spawnPulse = () => {
      const fromIdx = Math.floor(Math.random() * nodes.length);
      const a = nodes[fromIdx];
      let bestIdx = -1;
      let bestDist = CONNECTION_DISTANCE * dpr;
      for (let j = 0; j < nodes.length; j++) {
        if (j === fromIdx) continue;
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = j;
        }
      }
      if (bestIdx >= 0) {
        pulses.push({
          fromIdx,
          toIdx: bestIdx,
          progress: 0,
          hue: a.hue,
        });
      }
    };

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);

      ctx.fillStyle = "rgba(9, 9, 11, 0.85)";
      ctx.fillRect(0, 0, W, H);

      const connDist = CONNECTION_DISTANCE * dpr;
      const mouseRadius = MOUSE_RADIUS * dpr;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.x = Math.max(0, Math.min(W, n.x));
        n.y = Math.max(0, Math.min(H, n.y));
        n.pulse += 0.02;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connDist) {
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            const mdx = mx - mouseX;
            const mdy = my - mouseY;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            let mouseInfluence = 0;
            if (mdist < mouseRadius) {
              mouseInfluence = (1 - mdist / mouseRadius) * 0.85;
            }

            const baseAlpha = (1 - dist / connDist) * 0.18;
            const alpha = Math.min(1, baseAlpha + mouseInfluence);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(${a.hue}, 90%, 65%, ${alpha})`;
            ctx.lineWidth = (0.5 + mouseInfluence * 0.6) * dpr;
            ctx.stroke();
          }
        }
      }

      pulseTimer++;
      if (pulseTimer > 20 && pulses.length < 8) {
        spawnPulse();
        pulseTimer = 0;
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const a = nodes[p.fromIdx];
        const b = nodes[p.toIdx];
        p.progress += 0.025;
        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;
        const fade = Math.sin(p.progress * Math.PI);
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 12 * dpr);
        grad.addColorStop(0, `hsla(${p.hue}, 95%, 75%, ${fade})`);
        grad.addColorStop(1, `hsla(${p.hue}, 95%, 75%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 12 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const n of nodes) {
        const dx = n.x - mouseX;
        const dy = n.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isNear = dist < mouseRadius;
        const intensity = isNear ? 1 - dist / mouseRadius : 0;
        const breath = 0.85 + 0.15 * Math.sin(n.pulse);
        const radius = n.radius * (1 + intensity * 1.8) * breath;
        const alpha = 0.5 + intensity * 0.5;

        const gradient = ctx.createRadialGradient(
          n.x,
          n.y,
          0,
          n.x,
          n.y,
          radius * 5
        );
        gradient.addColorStop(0, `hsla(${n.hue}, 90%, 65%, ${alpha * 0.7})`);
        gradient.addColorStop(1, `hsla(${n.hue}, 90%, 65%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 95%, 80%, ${Math.min(1, alpha + 0.3)})`;
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-void)_85%)] opacity-90" />
    </div>
  );
}
