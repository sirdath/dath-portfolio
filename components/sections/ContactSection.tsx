"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Languages, Github } from "lucide-react";
import { GlowButton } from "@/components/shared/GlowButton";

const languages = [
  { name: "Greek", level: "Native" },
  { name: "English", level: "C2 Proficient" },
  { name: "Spanish", level: "B1 Intermediate" },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-32 overflow-hidden bg-surface-light border-t border-white/[0.04]">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.05),transparent_50%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left Column: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent-purple">
              Let's Connect
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight">
              Ready to build something extraordinary?
            </h2>
            <p className="mt-6 text-text-muted leading-relaxed max-w-md">
              Whether you're looking for Geospatial Intelligence, AI pipelines, or just want to chat about data science, I'm always open to discussing new projects and opportunities.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <GlowButton onClick={() => window.open('mailto:dimo.atheneos@gmail.com', '_blank')}>
                <Mail className="w-4 h-4" />
                Email Me
              </GlowButton>
              <a
                href="https://linkedin.com/in/Dimitriosath"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-text-primary hover:bg-white/10 hover:border-white/20 transition-all font-medium text-sm"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                LinkedIn
              </a>
              <a
                href="https://github.com/daththeanalyst"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-text-primary hover:bg-white/10 hover:border-white/20 transition-all font-medium text-sm"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </motion.div>

          {/* Right Column: Languages */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="p-8 rounded-3xl bg-void border border-white/[0.06] shadow-xl relative overflow-hidden group">
              {/* Decorative border gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Languages className="w-5 h-5 text-accent-cyan" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary font-[family-name:var(--font-space-grotesk)]">
                    Languages
                  </h3>
                </div>

                <div className="space-y-4">
                  {languages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <span className="font-medium text-text-primary">{lang.name}</span>
                      <span className="text-sm text-text-muted">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
