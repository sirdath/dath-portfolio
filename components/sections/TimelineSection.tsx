"use client";

import { motion } from "framer-motion";
import { timeline } from "@/data/timeline";
import { cn } from "@/lib/utils";
import { GraduationCap, Briefcase } from "lucide-react";

export function TimelineSection() {
  return (
    <section id="experience" className="relative w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-32 bg-inherit">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent-purple">
            Journey
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            Experience & Education
          </h2>
          <motion.div
            className="mt-3 mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-accent-purple to-accent-magenta"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

          <div className="space-y-12 sm:space-y-24">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={cn(
                    "relative flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-16",
                    isEven ? "sm:flex-row-reverse" : ""
                  )}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 sm:left-1/2 top-0 sm:top-1/2 -translate-x-1/2 sm:-translate-y-1/2 w-10 h-10 rounded-full bg-void border border-white/10 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    {item.type === "education" ? (
                      <GraduationCap className="w-4 h-4 text-accent-cyan" />
                    ) : (
                      <Briefcase className="w-4 h-4 text-accent-purple" />
                    )}
                  </div>

                  {/* Content Container (Card) */}
                  <motion.div
                    className={cn(
                      "flex-1 w-full pl-12 sm:pl-0",
                      isEven ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:text-left"
                    )}
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="group relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className={cn(
                        "absolute top-4 bottom-4 w-0.5 bg-gradient-to-b from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                        isEven ? "right-0 via-accent-purple/50" : "left-0 via-accent-cyan/50"
                      )} />
                      
                      <div className="relative z-10">
                        <span className="text-xs font-mono text-text-dim mb-2 block">
                          {item.date}
                        </span>
                        <h3 className="text-xl font-bold text-text-primary font-[family-name:var(--font-space-grotesk)]">
                          {item.title}
                        </h3>
                        <p className="text-sm font-medium text-accent-cyan/80 mt-1">
                          {item.organization}
                        </p>
                        <p className="mt-4 text-sm text-text-muted leading-relaxed">
                          {item.description}
                        </p>

                        {item.skills && (
                          <div
                            className={cn(
                              "mt-6 flex flex-wrap gap-2",
                              isEven ? "sm:justify-end" : "sm:justify-start"
                            )}
                          >
                            {item.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 text-[10px] font-medium tracking-wide rounded-md bg-white/[0.02] border border-white/[0.05] text-text-dim"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Empty space for the other side */}
                  <div className="hidden sm:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
