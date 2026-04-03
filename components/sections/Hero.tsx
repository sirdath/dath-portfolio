"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GlowButton } from "@/components/shared/GlowButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export function Hero() {
  const nameRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 20, mass: 0.8 };
  const rotateX = useSpring(
    useTransform(mouseY, [-1, 1], [5, -5]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-1, 1], [-5, 5]),
    springConfig
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToShowcase = () => {
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase border border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name — 3D perspective tilt + letter-by-letter reveal */}
        <motion.div variants={itemVariants}>
          <motion.div
            ref={nameRef}
            style={{
              rotateX,
              rotateY,
              transformPerspective: 800,
            }}
          >
            <h1
              className="font-[family-name:var(--font-space-grotesk)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
              style={{ textShadow: "0 4px 12px rgba(0,0,0,0.4)" }}
            >
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Dimitrios
              </motion.span>
              <span className="block mt-2">
                {"Athinaios".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-white"
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.7 + i * 0.05,
                      ease: [0.25, 0.4, 0.25, 1],
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-text-muted font-light tracking-wide"
        >
          Data Scientist & AI Engineer{" "}
          <span className="text-accent-cyan/60">|</span> MSc Business Analytics
          @ UCL
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-2xl text-sm sm:text-base text-text-dim leading-relaxed"
        >
          Building intelligent systems from data to deployment — geospatial
          pipelines, multi-agent platforms, and full-stack AI applications at
          scale.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mt-10">
          <GlowButton onClick={scrollToShowcase}>
            Explore the Data
            <ChevronDown className="w-4 h-4" />
          </GlowButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-dim">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-text-dim" />
        </motion.div>
      </motion.div>
    </section>
  );
}
