"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight, Sparkles } from "lucide-react";

const languages = [
  { name: "Greek", level: "Native", proficiency: 100, flag: "🇬🇷" },
  { name: "English", level: "C2 Proficient", proficiency: 100, flag: "🇬🇧" },
  { name: "Spanish", level: "B1 Intermediate", proficiency: 50, flag: "🇪🇸" },
];

const contactLinks = [
  {
    label: "Email",
    sublabel: "dimo.atheneos@gmail.com",
    icon: Mail,
    href: "mailto:dimo.atheneos@gmail.com",
    color: "#00f0ff",
    primary: true,
  },
  {
    label: "LinkedIn",
    sublabel: "/in/Dimitriosath",
    icon: Linkedin,
    href: "https://linkedin.com/in/Dimitriosath",
    color: "#a855f7",
    primary: false,
  },
  {
    label: "GitHub",
    sublabel: "/daththeanalyst",
    icon: Github,
    href: "https://github.com/daththeanalyst",
    color: "#ec4899",
    primary: false,
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full px-4 sm:px-6 lg:px-8 py-32 sm:py-40 overflow-hidden border-t border-white/[0.04]"
    >
      {/* ─── Subtle ambient background ──────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 3 gentle orbs (was 5) */}
        <div
          className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full blur-3xl opacity-18"
          style={{
            background: "radial-gradient(circle, #00f0ff 0%, transparent 70%)",
            animation: "mesh-drift-1 32s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full blur-3xl opacity-16"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            animation: "mesh-drift-2 36s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
          style={{
            background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
            animation: "mesh-drift-3 40s ease-in-out infinite",
          }}
        />
      </div>

      {/* Subtle wave divider at top */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C400,80 800,20 1440,60 L1440,0 L0,0 Z"
            fill="url(#waveGrad)"
            opacity="0.08"
          />
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.4em] text-accent-cyan/90">
            Let's Connect
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          className="text-center font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight text-white mb-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
        >
          Ready to build something{" "}
          <span className="italic text-shimmer-cyan">extraordinary</span>?
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-center text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Geospatial intelligence, AI pipelines, multi-agent platforms - or
          just data science chats. Always open to interesting work.
        </motion.p>

        {/* Contact link cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
          }}
        >
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ y: -3, scale: 1.015 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md p-5 transition-all duration-300 hover:border-white/20"
              style={
                link.primary
                  ? {
                      boxShadow: `0 0 0 0 ${link.color}`,
                    }
                  : undefined
              }
              data-cursor-label={link.label.toLowerCase()}
            >
              {/* Hover spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${link.color}18, transparent 70%)`,
                }}
              />
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${link.color}, transparent)`,
                }}
              />

              <div className="relative flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors"
                    style={{
                      borderColor: `${link.color}30`,
                      background: `${link.color}10`,
                    }}
                  >
                    <link.icon
                      className="w-4 h-4 transition-colors"
                      style={{ color: link.color }}
                    />
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 text-text-dim transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: link.color }}
                  />
                </div>
                <div>
                  <div className="text-base font-medium text-white mb-0.5">
                    {link.label}
                  </div>
                  <div className="text-xs text-text-dim font-mono truncate">
                    {link.sublabel}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Languages section - elegant cards with proficiency bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-text-muted">
              <Sparkles className="w-3 h-3" />
              Languages
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + i * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                whileHover={{ y: -2 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-void/40 backdrop-blur-md p-5"
              >
                {/* Hover gradient sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-cyan/[0.04] to-accent-purple/[0.04] pointer-events-none" />

                <div className="relative">
                  {/* Flag + name */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="text-base font-medium text-white">
                        {lang.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-dim">
                      {lang.level.split(" ")[0]}
                    </span>
                  </div>

                  {/* Proficiency bar - direct width animation (no scaleX) */}
                  <div className="relative h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-3">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, #00f0ff 0%, #a855f7 100%)`,
                        boxShadow:
                          lang.proficiency === 100
                            ? "0 0 8px rgba(168, 85, 247, 0.5)"
                            : undefined,
                      }}
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${lang.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.4,
                        delay: 0.7 + i * 0.15,
                        ease: [0.25, 0.4, 0.25, 1],
                      }}
                    />
                  </div>

                  {/* Sub-label + max indicator */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-text-dim">
                      {lang.level}
                    </span>
                    {lang.proficiency === 100 && (
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-accent-cyan">
                        ◆ MAX
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom signature line */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-text-dim">
            <span className="h-px w-8 bg-text-dim/40" />
            <span>Made with care · London · 2026</span>
            <span className="h-px w-8 bg-text-dim/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
