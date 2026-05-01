"use client";

import { motion } from "framer-motion";

export function DathLogo() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 left-6 z-50 group"
      aria-label="Dimitrios Athinaios — back to top"
      data-cursor-label="home"
    >
      {/* Glow shadow that blooms on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle,rgba(0,240,255,0.4),transparent_70%)] blur-xl pointer-events-none" />

      <div className="relative px-3 py-2.5 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md transition-all duration-500 group-hover:border-accent-cyan/40 group-hover:bg-black/70">
        {/* Corner ticks */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 border-l border-t border-accent-cyan/40 group-hover:border-accent-cyan transition-colors duration-500" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-r border-b border-accent-purple/40 group-hover:border-accent-purple transition-colors duration-500" />

        <svg
          width="56"
          height="22"
          viewBox="0 0 230 90"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
        >
          <defs>
            <linearGradient id="daLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* D — angular octagon with bowl cutout */}
          <path
            d="M 5,5 L 65,5 L 90,25 L 90,65 L 65,85 L 5,85 Z M 22,22 L 58,22 L 73,33 L 73,57 L 58,68 L 22,68 Z"
            fill="url(#daLogoGrad)"
            fillRule="evenodd"
          />

          {/* A — angular peak with crossbar and inner cutout */}
          <path
            d="M 105,85 L 145,5 L 170,5 L 210,85 L 188,85 L 180,68 L 135,68 L 127,85 Z M 142,52 L 173,52 L 157.5,21 Z"
            fill="url(#daLogoGrad)"
            fillRule="evenodd"
          />
        </svg>
      </div>
    </motion.button>
  );
}
