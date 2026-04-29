"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { ChevronDown, ArrowRight, Mail } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export function Hero() {
  const nameRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 70, damping: 22, mass: 0.9 };
  const rotateX = useSpring(
    useTransform(mouseY, [-1, 1], [4, -4]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-1, 1], [-4, 4]),
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

  const scrollToContact = () => {
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Top meta line */}
      <motion.div
        className="absolute top-8 right-8 z-10 hidden md:flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-text-dim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <span className="inline-block w-8 h-px bg-text-dim/40" />
        <span>London · UCL · 2026</span>
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-medium tracking-[0.2em] uppercase border border-accent-cyan/20 bg-accent-cyan/[0.04] text-accent-cyan/90 mb-10 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-cyan" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Name with 3D tilt + letter-by-letter reveal */}
        <motion.div variants={itemVariants} className="mb-2">
          <motion.div
            ref={nameRef}
            style={{
              rotateX,
              rotateY,
              transformPerspective: 900,
              transformStyle: "preserve-3d",
            }}
          >
            <h1
              className="font-[family-name:var(--font-playfair)] text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-medium tracking-[-0.02em] leading-[0.92]"
              style={{ textShadow: "0 8px 32px rgba(0,0,0,0.6)" }}
            >
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              >
                Dimitrios
              </motion.span>
              <span className="block italic font-normal text-white/95">
                {"Athinaios".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.9 + i * 0.06,
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

        {/* Animated underline */}
        <motion.div
          className="h-px w-32 bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
        />

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-text-muted font-light tracking-wide font-[family-name:var(--font-inter)]"
        >
          Data Scientist <span className="text-accent-cyan/40 mx-2">·</span>{" "}
          AI Engineer{" "}
          <span className="text-accent-cyan/40 mx-2">·</span> MSc @ UCL
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-5 max-w-xl text-sm sm:text-base text-text-dim leading-relaxed font-[family-name:var(--font-inter)]"
        >
          Building intelligent systems from data to deployment — geospatial
          pipelines, multi-agent platforms, and full-stack AI applications at
          scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col sm:flex-row items-center gap-3"
        >
          <button
            onClick={scrollToShowcase}
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium bg-white text-void hover:bg-accent-cyan transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,240,255,0.4)]"
          >
            View Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={scrollToContact}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium border border-white/15 text-white/90 hover:border-accent-cyan/40 hover:text-accent-cyan hover:bg-accent-cyan/[0.04] transition-all duration-300 backdrop-blur-sm"
          >
            <Mail className="w-4 h-4" />
            Get in touch
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToShowcase}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        aria-label="Scroll to projects"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-text-dim group-hover:text-accent-cyan transition-colors">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-text-dim group-hover:text-accent-cyan transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
}
