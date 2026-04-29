"use client";

import { motion } from "framer-motion";

export function DathLogo() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 left-6 z-50 group"
      aria-label="Dimitrios Athinaios — back to top"
    >
      <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500 group-hover:border-accent-cyan/40 group-hover:bg-black/60 group-hover:shadow-[0_0_32px_rgba(0,240,255,0.25)] overflow-hidden">
        {/* Animated gradient sweep on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-cyan/[0.08] via-transparent to-accent-purple/[0.08]" />

        {/* Subtle corner accents */}
        <div className="absolute top-1.5 left-1.5 w-2 h-2 border-l border-t border-accent-cyan/30 group-hover:border-accent-cyan transition-colors duration-500" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-r border-b border-accent-purple/30 group-hover:border-accent-purple transition-colors duration-500" />

        {/* DA monogram - typographic */}
        <span
          className="relative font-[family-name:var(--font-playfair)] italic text-2xl font-medium tracking-tighter bg-gradient-to-br from-accent-cyan via-white to-accent-purple bg-clip-text text-transparent select-none"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
        >
          DA
        </span>
      </div>
    </motion.button>
  );
}
