"use client";

import { useEffect, useState } from "react";

/**
 * Floating "lifetime views" widget.
 *
 * There is no backend (the site is a static export on GitHub Pages), so the
 * count is *simulated* but deterministic: every visitor on a given day sees
 * the exact same number, and it never jumps around on refresh.
 *
 * Model:
 *   - Anchored at ANCHOR_VIEWS on ANCHOR_DATE (Jan 2026).
 *   - Each elapsed day adds a pseudo-random 1–7, derived by hashing that
 *     day's ISO date string. Because the hash is pure, the daily increment
 *     is stable forever — yesterday's contribution can never change.
 *   - Today's increment is included in the total; the count-up animation
 *     starts just below it so the widget feels "live" on each load without
 *     ever showing an inconsistent figure.
 */
const ANCHOR_DATE = Date.UTC(2026, 0, 1); // 2026-01-01 UTC
const ANCHOR_VIEWS = 432;
const DAY_MS = 86_400_000;

/** Cheap, stable string hash (FNV-ish). Pure → same input, same output. */
function hashDate(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Deterministic 1–7 views for a given day. */
function dailyViews(dayMs: number): number {
  const iso = new Date(dayMs).toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
  return (hashDate(iso) % 7) + 1;
}

/** Total lifetime views as of `now`. */
function computeViews(now: number): number {
  let total = ANCHOR_VIEWS;
  // Iterate each full day after the anchor up to and including the current day.
  const startDay = ANCHOR_DATE + DAY_MS;
  const currentDay = Math.floor(now / DAY_MS) * DAY_MS;
  for (let d = startDay; d <= currentDay; d += DAY_MS) {
    total += dailyViews(d);
  }
  return total;
}

export function ViewCounter() {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const total = computeViews(Date.now());

    // Count up from 0 to the real total so the animation is clearly visible.
    const duration = 1500;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setDisplay(Math.round(total * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(total);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <aside className="view-counter" aria-label={`${display} lifetime views since January 2026`}>
      <span className="vc-dot" aria-hidden="true" />
      <span className="vc-body">
        <span className="vc-num">{display.toLocaleString("en-US")}</span>
        <span className="vc-label">lifetime views</span>
      </span>
    </aside>
  );
}
