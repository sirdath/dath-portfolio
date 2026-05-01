"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { projects } from "@/data/projects";

export function ProjectShowcase() {
  return (
    <section id="projects" className="relative w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
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
            Geospatial pipelines, predictive models, and AI-driven analytics
            - built to surface insights from complex spatial data.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(280px,1fr)]">
          {projects.map((project) => {
            let spanClass = "";
            switch (project.gridSpan) {
              case "large":
                spanClass = "md:col-span-2 md:row-span-2 min-h-[400px] lg:min-h-[500px]";
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
              <ProjectCard
                key={project.id}
                project={project}
                className={spanClass}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
