"use client";

import { motion } from "framer-motion";
import {
  Award,
  Star,
  GraduationCap,
  TrendingUp,
  Shield,
  BarChart3,
  Users,
  Dumbbell,
  type LucideIcon,
} from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  year?: string;
  icon: LucideIcon;
  color: string;
  highlight?: string;
}

interface Extra {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  tags: string[];
}

const certifications: Certification[] = [
  {
    title: "Mathematics for Machine Learning",
    issuer: "Imperial College London",
    year: "Specialisation",
    icon: GraduationCap,
    color: "#00d9ff",
    highlight: "Linear Algebra · Multivariate Calculus · PCA",
  },
  {
    title: "Google Advanced Data Analytics",
    issuer: "Google",
    year: "Professional",
    icon: TrendingUp,
    color: "#a3e635",
    highlight: "Statistical methods · Regression · ML modeling",
  },
  {
    title: "Microsoft Power BI Desktop",
    issuer: "Microsoft",
    year: "Certified",
    icon: BarChart3,
    color: "#fbbf24",
    highlight: "DAX · Power Query · Data modeling",
  },
  {
    title: "IBM Data Analyst",
    issuer: "IBM",
    year: "Professional",
    icon: Shield,
    color: "#fb923c",
    highlight: "Python · SQL · Tableau · IBM Cognos",
  },
];

const extras: Extra[] = [
  {
    title: "Co-Founder & President",
    description:
      "Built the Data Analytics Society at the University of Reading from zero into a thriving 200+ member community. Hosted technical workshops, recruiter networking nights, and a hackathon partnered with industry sponsors.",
    icon: Users,
    color: "#c084fc",
    tags: ["Leadership", "2023-2025", "200+ members"],
  },
  {
    title: "Discipline & Movement",
    description:
      "Karate Black Belt 1-dan. Active kickboxing practitioner. The same Kaizen principles I bring to dojo training — small daily improvements compounding — shape how I approach engineering: deliberate practice, candid feedback, no shortcuts.",
    icon: Dumbbell,
    color: "#ff4d8d",
    tags: ["Karate · 1-dan", "Kickboxing", "Kaizen"],
  },
];

export function CertificationsSection() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-32 bg-void overflow-hidden">
      {/* Subtle backdrop pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ─── CERTIFICATIONS ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-accent-cyan">
              <Award className="w-3 h-3" />
              Certifications
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-text-primary">
              Continuous <span className="italic">learning</span>
            </h2>
            <motion.div
              className="mt-4 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p className="mt-5 max-w-xl mx-auto text-text-muted text-sm sm:text-base">
              Mathematics, machine learning, data analytics —
              fundamentals deliberately deepened.
            </p>
          </div>

          {/* Cert cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm p-6 transition-all duration-300"
                style={{
                  boxShadow: `0 0 0 0 ${cert.color}`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, ${cert.color}10, transparent 60%)`,
                  }}
                />
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
                  }}
                />

                <div className="relative flex items-start gap-4">
                  {/* Icon block */}
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
                    style={{
                      borderColor: `${cert.color}30`,
                      background: `${cert.color}10`,
                    }}
                  >
                    <cert.icon
                      className="w-5 h-5"
                      style={{ color: cert.color }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-dim shrink-0">
                        {cert.issuer}
                      </span>
                      {cert.year && (
                        <span
                          className="text-[10px] font-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border shrink-0"
                          style={{
                            borderColor: `${cert.color}30`,
                            color: cert.color,
                          }}
                        >
                          {cert.year}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-text-primary leading-tight mb-3">
                      {cert.title}
                    </h3>
                    {cert.highlight && (
                      <p className="text-xs text-text-dim leading-relaxed">
                        {cert.highlight}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── BEYOND THE CODE ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-accent-purple">
              <Star className="w-3 h-3" />
              Beyond the Code
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-text-primary">
              The whole <span className="italic">person</span>
            </h2>
            <motion.div
              className="mt-4 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-accent-purple/60 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p className="mt-5 max-w-xl mx-auto text-text-muted text-sm sm:text-base">
              Leadership, discipline, and the principles that shape how
              I work.
            </p>
          </div>

          {/* Featured cards — bigger, more dramatic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {extras.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl"
                style={{
                  background: `
                    radial-gradient(circle at top right, ${item.color}1a, transparent 50%),
                    linear-gradient(to bottom, rgba(15,15,20,0.6), rgba(9,9,11,0.9))
                  `,
                  boxShadow: `0 24px 60px -20px ${item.color}20, inset 0 0 0 1px ${item.color}25`,
                }}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                  }}
                />

                {/* Bottom corner glow */}
                <div
                  className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-700 blur-3xl"
                  style={{ background: item.color }}
                />

                <div className="relative p-8 sm:p-10">
                  {/* Big icon + title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
                      style={{
                        borderColor: `${item.color}40`,
                        background: `${item.color}15`,
                      }}
                    >
                      <item.icon
                        className="w-6 h-6"
                        style={{ color: item.color }}
                      />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-medium leading-tight text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.16em] border bg-white/[0.03]"
                        style={{
                          borderColor: `${item.color}30`,
                          color: item.color,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
