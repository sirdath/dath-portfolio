"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { projects } from "@/data/projects";

// Cluster radius — distance from cluster center to each card's hex vertex
const CLUSTER_RADIUS = 220;

// Hexagonal vertex offsets per card index (6 projects = 6 hex vertices)
// Angles: -90, -30, 30, 90, 150, 210 (degrees) — top, top-right, bottom-right, bottom, bottom-left, top-left
function getClusterOffset(i: number) {
  const angle = (-90 + i * 60) * (Math.PI / 180);
  return {
    x: Math.cos(angle) * CLUSTER_RADIUS,
    y: Math.sin(angle) * CLUSTER_RADIUS,
    angle: -90 + i * 60, // degrees, for rotation
  };
}

interface AnimatedCardProps {
  index: number;
  spanClass: string;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}

function AnimatedCard({
  index,
  spanClass,
  scrollYProgress,
  reducedMotion,
}: AnimatedCardProps) {
  const project = projects[index];
  const { x: cx, y: cy, angle } = getClusterOffset(index);

  // Per-card phase staggering — cards fracture in waves
  const phaseStart = 0.18 + (index % 3) * 0.04; // 0.18 → 0.26
  const phaseEnd = 0.55 + (index % 3) * 0.05; // 0.55 → 0.65
  const settleEnd = 0.78;

  // Translation: from cluster offset → identity (natural grid position)
  const x = useTransform(
    scrollYProgress,
    [phaseStart, phaseEnd, settleEnd],
    reducedMotion ? [0, 0, 0] : [cx, cx * 0.3, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [phaseStart, phaseEnd, settleEnd],
    reducedMotion ? [0, 0, 0] : [cy - 60, cy * 0.3, 0]
  );

  // 3D rotation: from hex-cluster orientation → flat
  const rotateZ = useTransform(
    scrollYProgress,
    [phaseStart, phaseEnd, settleEnd],
    reducedMotion ? [0, 0, 0] : [angle * 0.3, angle * 0.15, 0]
  );
  const rotateY = useTransform(
    scrollYProgress,
    [phaseStart, phaseEnd, settleEnd],
    reducedMotion ? [0, 0, 0] : [angle * 0.5, angle * 0.2, 0]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [phaseStart, phaseEnd, settleEnd],
    reducedMotion ? [0, 0, 0] : [-25, -10, 0]
  );

  // Scale + opacity: cards grow into final size
  const scale = useTransform(
    scrollYProgress,
    [phaseStart, phaseEnd, settleEnd],
    reducedMotion ? [1, 1, 1] : [0.45, 0.7, 1]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0.1, phaseStart, phaseEnd, settleEnd],
    [0, 0.6, 0.95, 1]
  );

  // Edge glow trail — strongest during the fracture phase
  const glowOpacity = useTransform(
    scrollYProgress,
    [phaseStart, (phaseStart + phaseEnd) / 2, phaseEnd, settleEnd],
    [0, 0.7, 0.4, 0]
  );

  return (
    <motion.div
      className={`relative ${spanClass}`}
      style={{
        x,
        y,
        rotateZ,
        rotateY,
        rotateX,
        scale,
        opacity,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
    >
      {/* Edge glow trail during fracture */}
      <motion.div
        className="absolute -inset-1 rounded-[26px] pointer-events-none"
        style={{
          opacity: glowOpacity,
          background:
            index % 2 === 0
              ? "radial-gradient(circle, rgba(0,240,255,0.35), transparent 70%)"
              : "radial-gradient(circle, rgba(168,85,247,0.35), transparent 70%)",
          filter: "blur(24px)",
        }}
      />
      <ProjectCard project={project} />
    </motion.div>
  );
}

function HexGridBackground({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // Visible during cluster phase, fades during fracture
  const opacity = useTransform(
    scrollYProgress,
    [0.05, 0.2, 0.5, 0.7],
    [0, 0.18, 0.08, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1.15]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      style={{ opacity }}
    >
      <motion.svg
        width="800"
        height="800"
        viewBox="-400 -400 800 800"
        style={{ scale, rotate }}
        className="absolute"
      >
        <defs>
          <linearGradient id="hex-edge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="hex-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {/* Central hexagon */}
        <polygon
          points="0,-220 190,-110 190,110 0,220 -190,110 -190,-110"
          fill="url(#hex-fill)"
          stroke="url(#hex-edge)"
          strokeWidth="1.5"
        />
        {/* Inner radial guides — to the 6 vertices */}
        {[-90, -30, 30, 90, 150, 210].map((deg) => {
          const a = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2={Math.cos(a) * 220}
              y2={Math.sin(a) * 220}
              stroke="url(#hex-edge)"
              strokeWidth="0.75"
              strokeDasharray="3 4"
              opacity="0.5"
            />
          );
        })}
        {/* Corner dots */}
        {[-90, -30, 30, 90, 150, 210].map((deg) => {
          const a = (deg * Math.PI) / 180;
          return (
            <circle
              key={`d-${deg}`}
              cx={Math.cos(a) * 220}
              cy={Math.sin(a) * 220}
              r="3"
              fill="#00f0ff"
            />
          );
        })}
      </motion.svg>
    </motion.div>
  );
}

export function HexGenesis() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Header opacity — fades in during approach phase
  const headerOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.18, 0.7, 0.85],
    [0, 1, 1, 0.6]
  );
  const headerY = useTransform(scrollYProgress, [0.05, 0.2], [40, 0]);

  // Disable 3D on mobile or for reduced motion users
  const useStaticLayout = isMobile || reducedMotion;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl relative">
        {/* Hex grid background — only on desktop */}
        {!useStaticLayout && (
          <HexGridBackground scrollYProgress={scrollYProgress} />
        )}

        {/* Section header */}
        <motion.div
          className="mb-16 text-center relative z-10"
          style={
            useStaticLayout
              ? undefined
              : { opacity: headerOpacity, y: headerY }
          }
          initial={useStaticLayout ? { opacity: 0, y: 20 } : false}
          whileInView={useStaticLayout ? { opacity: 1, y: 0 } : undefined}
          viewport={useStaticLayout ? { once: true } : undefined}
          transition={useStaticLayout ? { duration: 0.6 } : undefined}
        >
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent-cyan">
            Featured Work
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            Projects
          </h2>
          <motion.div
            className="mt-3 mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-accent-cyan to-accent-teal"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <p className="mt-4 max-w-xl mx-auto text-text-muted text-sm sm:text-base">
            Six projects, one hexagon. Geospatial intelligence, AI agents, and
            data engineering — surfacing insight from complex spatial data.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(280px,1fr)] relative z-10">
          {projects.map((project, i) => {
            let spanClass = "";
            switch (project.gridSpan) {
              case "large":
                spanClass =
                  "md:col-span-2 md:row-span-2 min-h-[400px] lg:min-h-[500px]";
                break;
              case "tall":
                spanClass = "md:row-span-2 min-h-[400px] lg:min-h-[500px]";
                break;
              case "wide":
                spanClass = "md:col-span-2 min-h-[280px]";
                break;
              default:
                spanClass = "min-h-[280px]";
            }

            if (useStaticLayout) {
              return (
                <motion.div
                  key={project.id}
                  className={spanClass}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              );
            }

            return (
              <AnimatedCard
                key={project.id}
                index={i}
                spanClass={spanClass}
                scrollYProgress={scrollYProgress}
                reducedMotion={reducedMotion}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
