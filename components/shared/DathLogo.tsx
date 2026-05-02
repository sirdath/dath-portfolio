"use client";

import { motion } from "framer-motion";

export function DathLogo() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 left-6 z-50 group"
      aria-label="Dimitrios Athinaios - back to top"
      data-cursor-label="home"
    >
      <img
        src="/dath-logo.svg"
        alt="Dath logo"
        width={150}
        height={100}
        className="block transition-all duration-300 [filter:brightness(0)_invert(1)_drop-shadow(0_0_8px_rgba(255,255,255,0.15))] group-hover:[filter:brightness(0)_invert(1)_drop-shadow(0_0_16px_rgba(255,255,255,0.4))]"
      />
    </motion.button>
  );
}
