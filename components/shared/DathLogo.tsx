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
      <svg
        width="68"
        height="26"
        viewBox="0 0 230 90"
        xmlns="http://www.w3.org/2000/svg"
        className="block transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.4)]"
      >
        {/* D - bold angular shape with chevron bowl cutout */}
        <path
          d="M 5,12 L 70,12 L 95,35 L 95,55 L 70,78 L 5,78 Z M 22,28 L 62,28 L 78,40 L 78,50 L 62,62 L 22,62 Z"
          fill="white"
          fillRule="evenodd"
        />

        {/* A - sharp angular peak with slash-triangle inner */}
        <path
          d="M 105,78 L 148,12 L 168,12 L 210,78 L 188,78 L 180,64 L 134,64 L 127,78 Z M 144,50 L 172,50 L 158,24 Z"
          fill="white"
          fillRule="evenodd"
        />
      </svg>
    </motion.button>
  );
}
