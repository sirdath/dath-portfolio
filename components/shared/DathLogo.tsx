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
        {/* DA - single merged silhouette with V-valley between letters */}
        <path
          d="M 5,12 L 70,12 L 95,42 L 148,12 L 170,12 L 215,82 L 5,82 Z M 22,28 L 58,28 L 75,42 L 75,52 L 58,66 L 22,66 Z M 142,56 L 174,56 L 158,28 Z"
          fill="white"
          fillRule="evenodd"
        />
      </svg>
    </motion.button>
  );
}
