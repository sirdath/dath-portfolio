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

const HEX_RADIUS = 180;

/* ───────────────────────────────────────────────────────────
 * One triangular slice of the hexagon (1/6 of the whole)
 * Anchored at center (0,0); spans angle1 → angle2 to vertices
 * ─────────────────────────────────────────────────────────── */
function HexSegment({
  index,
  fractureProgress,
  rotateProgress,
}: {
  index: number;
  fractureProgress: MotionValue<number>;
  rotateProgress: MotionValue<number>;
}) {
  // Each segment spans 60°
  const a1 = ((-90 + index * 60) * Math.PI) / 180;
  const a2 = ((-90 + (index + 1) * 60) * Math.PI) / 180;
  const x1 = Math.cos(a1) * HEX_RADIUS;
  const y1 = Math.sin(a1) * HEX_RADIUS;
  const x2 = Math.cos(a2) * HEX_RADIUS;
  const y2 = Math.sin(a2) * HEX_RADIUS;

  // Direction the segment flies away (its center angle)
  const centerAngle = ((-90 + (index + 0.5) * 60) * Math.PI) / 180;
  const flyDist = 420;

  // Per-segment fracture animation
  const x = useTransform(
    fractureProgress,
    [0, 1],
    [0, Math.cos(centerAngle) * flyDist]
  );
  const y = useTransform(
    fractureProgress,
    [0, 1],
    [0, Math.sin(centerAngle) * flyDist]
  );
  const segScale = useTransform(fractureProgress, [0, 0.5, 1], [1, 1.05, 0.5]);
  const segOpacity = useTransform(
    fractureProgress,
    [0, 0.4, 1],
    [1, 0.7, 0]
  );
  const segRotate = useTransform(
    fractureProgress,
    [0, 1],
    [0, index % 2 === 0 ? 90 : -90]
  );

  // Global slow rotation while intact (pre-fracture)
  const wholeRotate = useTransform(rotateProgress, [0, 1], [0, 30]);

  const fillColor = index % 2 === 0 ? "url(#hex-grad-cyan)" : "url(#hex-grad-purple)";

  return (
    <motion.g
      style={{
        x,
        y,
        scale: segScale,
        opacity: segOpacity,
        rotate: segRotate,
        originX: 0,
        originY: 0,
      }}
    >
      <motion.g style={{ rotate: wholeRotate, originX: 0, originY: 0 }}>
        <path
          d={`M 0,0 L ${x1},${y1} L ${x2},${y2} Z`}
          fill={fillColor}
          stroke={index % 2 === 0 ? "#00f0ff" : "#a855f7"}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </motion.g>
    </motion.g>
  );
}

/* ───────────────────────────────────────────────────────────
 * The full 3D hexagon display (centered, with tilt + glow)
 * ─────────────────────────────────────────────────────────── */
function HexagonDisplay({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // Visible during cluster phase
  const containerOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.3, 0.55, 0.7],
    [0, 1, 1, 0.4, 0]
  );

  // Hexagon scales up slightly as user "zooms in"
  const containerScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.55],
    [0.7, 1, 1.3]
  );

  // 3D tilt that subtly responds to scroll progress
  const tiltX = useTransform(scrollYProgress, [0, 0.5], [-15, -25]);
  const tiltY = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  // Fracture progress drives segment fly-out
  const fractureProgress = useTransform(
    scrollYProgress,
    [0.3, 0.55],
    [0, 1]
  );

  // Slow rotation of intact hex
  const rotateProgress = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Inner glow that intensifies during fracture
  const glowOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.3, 0.55],
    [0.3, 0.8, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{
        opacity: containerOpacity,
        scale: containerScale,
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative">
        {/* Behind-glow */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            opacity: glowOpacity,
            background:
              "radial-gradient(circle, rgba(0,240,255,0.5) 0%, rgba(168,85,247,0.3) 40%, transparent 70%)",
            filter: "blur(60px)",
            width: HEX_RADIUS * 2.5,
            height: HEX_RADIUS * 2.5,
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
          }}
        />
        <svg
          width={HEX_RADIUS * 3}
          height={HEX_RADIUS * 3}
          viewBox={`${-HEX_RADIUS * 1.5} ${-HEX_RADIUS * 1.5} ${HEX_RADIUS * 3} ${HEX_RADIUS * 3}`}
        >
          <defs>
            <linearGradient id="hex-grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="hex-grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
            </linearGradient>
            <filter id="hex-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#hex-glow)">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <HexSegment
                key={i}
                index={i}
                fractureProgress={fractureProgress}
                rotateProgress={rotateProgress}
              />
            ))}
          </g>
          {/* Inner outline hexagon for definition */}
          <motion.polygon
            points={[0, 1, 2, 3, 4, 5]
              .map((i) => {
                const a = ((-90 + i * 60) * Math.PI) / 180;
                return `${Math.cos(a) * HEX_RADIUS},${Math.sin(a) * HEX_RADIUS}`;
              })
              .join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            style={{
              opacity: useTransform(scrollYProgress, [0.05, 0.3, 0.55], [0.5, 0.5, 0]),
            }}
          />
        </svg>
      </div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────────────────
 * Card with scroll-driven entry from "below the hex"
 * ─────────────────────────────────────────────────────────── */
function AnimatedCard({
  index,
  spanClass,
  scrollYProgress,
  reducedMotion,
}: {
  index: number;
  spanClass: string;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const project = projects[index];

  // Cards fade in during fracture (mid-late) and settle
  const phaseStart = 0.45;
  const phaseEnd = 0.7;

  const opacity = useTransform(
    scrollYProgress,
    [phaseStart, phaseEnd],
    [0, 1]
  );
  const y = useTransform(
    scrollYProgress,
    [phaseStart, phaseEnd],
    reducedMotion ? [0, 0] : [60, 0]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [phaseStart, phaseEnd],
    reducedMotion ? [0, 0] : [12, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [phaseStart, phaseEnd],
    reducedMotion ? [1, 1] : [0.9, 1]
  );

  return (
    <motion.div
      className={`relative ${spanClass}`}
      style={{
        opacity,
        y,
        rotateX,
        scale,
        transformPerspective: 1000,
        willChange: "transform, opacity",
      }}
    >
      <ProjectCard project={project} />
    </motion.div>
  );
}

/* ───────────────────────────────────────────────────────────
 * Main section
 * ─────────────────────────────────────────────────────────── */
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

  // Scroll progress over the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const useStaticLayout = isMobile || reducedMotion;

  // Header opacity / position
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.5, 0.7],
    [0, 1, 1, 0.7]
  );

  if (useStaticLayout) {
    return (
      <section
        id="projects"
        className="relative w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
              Six projects, one hexagon. Geospatial intelligence, AI agents,
              and data engineering.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(280px,1fr)]">
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
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full"
      style={{ minHeight: "220vh" }}
    >
      {/* STICKY HEX VIEWPORT — pinned while user scrolls through cluster + fracture */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Centered hex display */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <HexagonDisplay scrollYProgress={scrollYProgress} />
        </div>

        {/* Header floats above the hex */}
        <motion.div
          className="absolute top-[18vh] left-0 right-0 text-center px-6"
          style={{ opacity: headerOpacity }}
        >
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent-cyan">
            Featured Work
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            Projects
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-text-muted text-sm">
            Six projects, one hexagon
          </p>
        </motion.div>
      </div>

      {/* GRID — appears below sticky as user scrolls past cluster */}
      <div
        className="relative px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32 -mt-[80vh]"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(280px,1fr)]">
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
      </div>
    </section>
  );
}
