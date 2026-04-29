"use client";

import { motion } from "framer-motion";

export function DathLogo() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 left-6 z-50 group"
      aria-label="Scroll to top"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_2px_8px_rgba(0,240,255,0.25)] transition-all duration-300 group-hover:drop-shadow-[0_2px_16px_rgba(0,240,255,0.5)]"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        {/* Outer rounded square */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="12"
          stroke="url(#logoGrad)"
          strokeWidth="1.5"
          fill="rgba(9, 9, 11, 0.6)"
          className="backdrop-blur-md"
        />
        {/* D — left side, rounded vertical bar with curve */}
        <path
          d="M11 13 L11 35 L19 35 C25 35 28 31 28 24 C28 17 25 13 19 13 Z"
          fill="url(#logoGrad)"
        />
        {/* A — right side, geometric triangle with crossbar */}
        <path
          d="M30 35 L36 13 L37 13 L43 35 L40 35 L38.7 30 L34.3 30 L33 35 Z M35 27 L38 27 L36.5 21 Z"
          fill="url(#logoGrad)"
        />
      </svg>
    </motion.button>
  );
}
