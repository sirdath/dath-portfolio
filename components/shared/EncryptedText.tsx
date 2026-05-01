"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface EncryptedTextProps {
  text: string;
  delay?: number;
  className?: string;
  totalDurationMs?: number;
  perCharDelayMs?: number;
}

/**
 * Cipher-decode reveal: each character cycles through random letters
 * before settling on its final glyph. Per-char stagger creates a wave.
 */
export function EncryptedText({
  text,
  delay = 0,
  className = "",
  totalDurationMs = 1400,
  perCharDelayMs = 50,
}: EncryptedTextProps) {
  const [display, setDisplay] = useState<string[]>(() =>
    text.split("").map((c) => (c === " " ? " " : ""))
  );
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now() + delay;
    const settleTime = totalDurationMs;

    const tick = (now: number) => {
      const elapsed = now - start;
      let allSettled = true;
      const next = text.split("").map((targetChar, i) => {
        if (targetChar === " ") return " ";
        const charStart = i * perCharDelayMs;
        if (elapsed < charStart) {
          allSettled = false;
          return "";
        }
        const charProgress = (elapsed - charStart) / (settleTime - charStart);
        if (charProgress >= 1) return targetChar;
        allSettled = false;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });
      setDisplay(next);
      if (!allSettled) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [text, delay, totalDurationMs, perCharDelayMs]);

  return (
    <span className={className} aria-label={text}>
      {display.map((c, i) => (
        <span
          key={i}
          className="inline-block"
          style={{ minWidth: c === "" ? "0.55ch" : undefined }}
        >
          {c === "" ? " " : c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}
