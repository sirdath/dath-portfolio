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
      aria-label="Dimitrios Athinaios — back to top"
      data-cursor-label="home"
    >
      <svg
        width="68"
        height="26"
        viewBox="0 0 230 90"
        xmlns="http://www.w3.org/2000/svg"
        className="block transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.4)]"
      >
        {/* D — angular octagon with bowl cutout */}
        <path
          d="M 5,5 L 65,5 L 90,25 L 90,65 L 65,85 L 5,85 Z M 22,22 L 58,22 L 73,33 L 73,57 L 58,68 L 22,68 Z"
          fill="white"
          fillRule="evenodd"
        />

        {/* A — angular peak with crossbar and inner cutout */}
        <path
          d="M 105,85 L 145,5 L 170,5 L 210,85 L 188,85 L 180,68 L 135,68 L 127,85 Z M 142,52 L 173,52 L 157.5,21 Z"
          fill="white"
          fillRule="evenodd"
        />
      </svg>
    </motion.button>
  );
}
