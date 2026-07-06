"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-driven ambient background. One fixed canvas that morphs through
 * four "scenes" as scroll progresses:
 *   0.00  abstract map      (organic coastlines + faint graticule)
 *   0.33  contour field     (topographic iso-lines around peaks)
 *   0.66  knowledge graph   (drifting nodes + edges)
 *   1.00  H3 hex grid       (hexagon tessellation)
 *
 * Efficiency model (kept as lean as possible):
 *   - The three CALM scenes (map/contour/hex) are painted ONCE into cached
 *     offscreen canvases per resize; per frame they are a GPU blit at a
 *     scroll-driven alpha, not trig recomputed each frame.
 *   - The rAF loop is fully event-driven: it runs ONLY while the graph is on
 *     screen (for its slow drift) or when a scroll/resize needs a recomposite,
 *     then stops (raf = 0). No wakeups when parked. Drift is capped at 30fps
 *     (invisible for slow motion, half the work). Sleeps when the tab hides.
 *   - No cursor tracking of any kind.
 *   - Reduced-motion safe: no drift, redraw on scroll only.
 */
export function ScrollFieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0,
      H = 0,
      maxScroll = 0;

    const R = (s: number) => {
      const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    type Node = { x: number; y: number; vx: number; vy: number };
    const cfg: { land: any[]; peaks: any[]; nodes: Node[]; hexSize: number } = {
      land: [],
      peaks: [],
      nodes: [],
      hexSize: 42,
    };

    // Cached offscreen layers for the three calm scenes (rebuilt on resize).
    const layerMap = document.createElement("canvas");
    const layerContour = document.createElement("canvas");
    const layerHex = document.createElement("canvas");

    const buildStatic = () => {
      cfg.land = [
        { x: 0.26, y: 0.34, r: 0.19, drift: 1.0, sq: 0.72 },
        { x: 0.72, y: 0.3, r: 0.13, drift: -0.8, sq: 0.8 },
        { x: 0.6, y: 0.68, r: 0.22, drift: 0.6, sq: 0.7 },
        { x: 0.12, y: 0.78, r: 0.1, drift: -1.1, sq: 0.85 },
      ].map((l, i) => ({
        ...l,
        oct: [
          { a: 0.18, f: 3, p: R(i + 1) * 6.28 },
          { a: 0.1, f: 5, p: R(i + 2) * 6.28 },
          { a: 0.06, f: 8, p: R(i + 3) * 6.28 },
        ],
      }));
      cfg.peaks = [
        { x: 0.3, y: 0.42, r: 0.34, rings: 8, amp: 0.06, f1: 3, f2: 6 },
        { x: 0.74, y: 0.36, r: 0.26, rings: 6, amp: 0.08, f1: 4, f2: 7 },
        { x: 0.56, y: 0.74, r: 0.3, rings: 7, amp: 0.05, f1: 5, f2: 3 },
      ].map((p, i) => ({ ...p, p1: R(i + 5) * 6.28, p2: R(i + 9) * 6.28 }));
    };

    const buildNodes = () => {
      const n = Math.round(Math.min(70, Math.max(40, (W * H) / 30000)));
      cfg.nodes = Array.from({ length: n }, (_, i) => ({
        x: R(i * 2 + 1) * W,
        y: R(i * 2 + 2) * H,
        vx: (R(i * 3 + 1) - 0.5) * 0.28,
        vy: (R(i * 3 + 2) - 0.5) * 0.28,
      }));
    };

    const calcMax = () => {
      maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    };

    // ---------- calm scenes: painted ONCE into a cached layer ----------
    const paintMap = (c: CanvasRenderingContext2D) => {
      const grat = new Path2D();
      const gx = W / 9,
        gy = H / 6;
      for (let x = gx; x < W; x += gx) {
        grat.moveTo(x, 0);
        grat.lineTo(x, H);
      }
      for (let y = gy; y < H; y += gy) {
        grat.moveTo(0, y);
        grat.lineTo(W, y);
      }
      c.lineWidth = 1;
      c.strokeStyle = "rgba(45,134,89,0.05)";
      c.stroke(grat);
      const coast = new Path2D();
      const fill = new Path2D();
      for (const lm of cfg.land) {
        const cx = lm.x * W,
          cy = lm.y * H,
          base = lm.r * Math.min(W, H);
        const sub = new Path2D();
        const steps = 76;
        for (let i = 0; i <= steps; i++) {
          const ang = (i / steps) * Math.PI * 2;
          let rr = base;
          for (const o of lm.oct) rr += o.a * base * Math.sin(ang * o.f + o.p);
          const x = cx + Math.cos(ang) * rr;
          const y = cy + Math.sin(ang) * rr * lm.sq;
          i ? sub.lineTo(x, y) : sub.moveTo(x, y);
        }
        sub.closePath();
        coast.addPath(sub);
        fill.addPath(sub);
      }
      c.fillStyle = "rgba(31,111,67,0.05)";
      c.fill(fill);
      c.lineWidth = 1.4;
      c.strokeStyle = "rgba(220,239,230,0.16)";
      c.stroke(coast);
    };

    const paintContours = (c: CanvasRenderingContext2D) => {
      c.lineWidth = 1;
      for (const pk of cfg.peaks) {
        const cx = pk.x * W,
          cy = pk.y * H;
        for (let k = 1; k <= pk.rings; k++) {
          const rr = (k / pk.rings) * pk.r * Math.min(W, H);
          const al = 0.06 + 0.16 * (1 - k / pk.rings);
          const ring = new Path2D();
          const steps = 60;
          for (let i = 0; i <= steps; i++) {
            const ang = (i / steps) * Math.PI * 2;
            let rad = rr;
            rad += pk.amp * rr * Math.sin(ang * pk.f1 + pk.p1);
            rad += pk.amp * 0.5 * rr * Math.sin(ang * pk.f2 + pk.p2);
            const x = cx + Math.cos(ang) * rad;
            const y = cy + Math.sin(ang) * rad;
            i ? ring.lineTo(x, y) : ring.moveTo(x, y);
          }
          ring.closePath();
          c.strokeStyle = `rgba(45,134,89,${al})`;
          c.stroke(ring);
        }
      }
    };

    const addHex = (path: Path2D, cx: number, cy: number, s: number) => {
      for (let i = 0; i < 6; i++) {
        const ang = (Math.PI / 180) * (60 * i - 90);
        const x = cx + s * Math.cos(ang),
          y = cy + s * Math.sin(ang);
        i ? path.lineTo(x, y) : path.moveTo(x, y);
      }
      path.closePath();
    };

    const paintHex = (c: CanvasRenderingContext2D) => {
      const s = cfg.hexSize;
      const hw = Math.sqrt(3) * s;
      const vh = 1.5 * s;
      const stroke = new Path2D();
      const fill = new Path2D();
      let ri = 0;
      for (let y = 0; y < H + s; y += vh, ri++) {
        const xoff = (ri % 2) * (hw / 2);
        for (let x = -hw; x < W + hw; x += hw) {
          const cx = x + xoff,
            cy = y;
          addHex(stroke, cx, cy, s);
          const dx = cx - W * 0.5,
            dy = cy - H * 0.5;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.sin(dist * 0.012) > 0.72) addHex(fill, cx, cy, s);
        }
      }
      c.lineWidth = 1;
      c.strokeStyle = "rgba(45,134,89,0.09)";
      c.stroke(stroke);
      c.fillStyle = "rgba(45,134,89,0.1)";
      c.fill(fill);
    };

    const paintLayer = (
      el: HTMLCanvasElement,
      fn: (c: CanvasRenderingContext2D) => void,
    ) => {
      el.width = Math.max(1, Math.floor(W));
      el.height = Math.max(1, Math.floor(H));
      const c = el.getContext("2d");
      if (!c) return;
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.clearRect(0, 0, W, H);
      fn(c);
    };

    const buildLayers = () => {
      paintLayer(layerMap, paintMap);
      paintLayer(layerContour, paintContours);
      paintLayer(layerHex, paintHex);
    };

    const resize = () => {
      const prevW = W || 0,
        prevH = H || 0;
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      // Intentionally 1x (no devicePixelRatio) — soft bg, big perf win.
      canvas.width = Math.floor(W);
      canvas.height = Math.floor(H);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (!cfg.nodes.length) buildNodes();
      else if (prevW && prevH) {
        const rx = W / prevW,
          ry = H / prevH;
        cfg.nodes.forEach((nd) => {
          nd.x *= rx;
          nd.y *= ry;
        });
      }
      cfg.hexSize = Math.max(34, Math.min(52, Math.min(W, H) / 18));
      calcMax();
      buildLayers();
    };

    // ---------- live scene: the constellation (only dynamic layer) ----------
    const drawGraph = (a: number, animate: boolean) => {
      ctx.globalAlpha = a;
      const ns = cfg.nodes;
      if (animate) {
        for (const n of ns) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > W) n.vx *= -1;
          if (n.y < 0 || n.y > H) n.vy *= -1;
        }
      }
      const maxd = Math.min(W, H) * 0.2;
      const maxd2 = maxd * maxd;
      const edges = new Path2D();
      for (let i = 0; i < ns.length; i++) {
        const A = ns[i];
        for (let j = i + 1; j < ns.length; j++) {
          const B = ns[j];
          const dx = A.x - B.x,
            dy = A.y - B.y;
          if (dx * dx + dy * dy < maxd2) {
            edges.moveTo(A.x, A.y);
            edges.lineTo(B.x, B.y);
          }
        }
      }
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(45,134,89,0.16)";
      ctx.stroke(edges);
      const dots = new Path2D();
      for (const n of ns) {
        dots.moveTo(n.x + 2, n.y);
        dots.arc(n.x, n.y, 2, 0, Math.PI * 2);
      }
      ctx.fillStyle = "rgba(64,150,104,0.7)";
      ctx.fill(dots);
      ctx.globalAlpha = 1;
    };

    // ---------- compositor ----------
    const centers = [0, 1 / 3, 2 / 3, 1];
    const win = 0.4;
    const eps = 0.012;
    const progress = () =>
      maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;

    const weights = (p: number) => {
      const raw = centers.map((c) => Math.max(0, 1 - Math.abs(p - c) / win));
      const sum = raw.reduce((s, v) => s + v, 0) || 1;
      return raw.map((v) => v / sum);
    };

    const render = (animate: boolean) => {
      ctx.clearRect(0, 0, W, H);
      const w = weights(progress());
      if (w[0] > eps) {
        ctx.globalAlpha = w[0];
        ctx.drawImage(layerMap, 0, 0);
      }
      if (w[1] > eps) {
        ctx.globalAlpha = w[1];
        ctx.drawImage(layerContour, 0, 0);
      }
      ctx.globalAlpha = 1;
      if (w[2] > eps) drawGraph(w[2], animate);
      if (w[3] > eps) {
        ctx.globalAlpha = w[3];
        ctx.drawImage(layerHex, 0, 0);
      }
      ctx.globalAlpha = 1;
    };

    buildStatic();
    resize();

    // ---------- event-driven loop (idle when there is nothing to do) --------
    let raf = 0;
    let last = 0;
    let needsStatic = true;
    const gap = 1000 / 30; // drift needs no more than 30fps
    const markStatic = () => {
      needsStatic = true;
    };

    const frame = (now: number) => {
      if (document.hidden) {
        raf = 0; // sleep until the tab is visible again
        return;
      }
      const graphLive = !reduced && weights(progress())[2] > eps;
      if (needsStatic) {
        needsStatic = false;
        last = now;
        render(graphLive);
      } else if (graphLive && now - last >= gap) {
        last = now;
        render(true);
      }
      // Keep looping only while there is real work; otherwise go fully idle.
      raf = graphLive || needsStatic ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    kick();

    const onScroll = () => {
      calcMax();
      markStatic();
      kick();
    };
    const onResize = () => {
      resize();
      markStatic();
      kick();
    };
    const onVis = () => {
      if (!document.hidden) {
        markStatic();
        kick();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="orbsbg orbsbg-fixed" aria-hidden="true">
      <canvas ref={canvasRef} className="fieldcanvas" />
    </div>
  );
}
