"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAssetPath } from "@/lib/assets";
import type { Project } from "@/data/projects";
import Link from "next/link";
import { Safari } from "@/components/magicui/safari";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const mediaSrc = getAssetPath(project.mediaUrl);
  const isVideoOrGif = project.mediaType === "video" || project.mediaType === "gif";

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <motion.div
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-[24px] cursor-pointer h-full bg-void border border-white/[0.08] shadow-lg transition-all duration-500 hover:bg-surface hover:border-accent-cyan/20 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.15)]",
          className
        )}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_0%,rgba(0,240,255,0.1),transparent_70%)] pointer-events-none" />

        {/* Top: Media */}
        <div className="relative z-10 w-full flex-1 p-6 md:p-8 flex items-center justify-center overflow-hidden shrink-0 min-h-[220px]">
          {isVideoOrGif ? (
            <div className="w-full h-full max-w-2xl transform transition-transform duration-700 ease-[cubic-bezier(0.25,0.4,0.25,1)] group-hover:scale-[1.03] group-hover:-translate-y-2">
              <Safari className="w-full h-full shadow-2xl">
                {project.mediaType === "video" ? (
                  <video
                    src={mediaSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={mediaSrc}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </Safari>
            </div>
          ) : (
            <div className="w-full h-full max-w-2xl rounded-xl overflow-hidden shadow-2xl border border-white/10 transform transition-transform duration-700 ease-[cubic-bezier(0.25,0.4,0.25,1)] group-hover:scale-[1.03] group-hover:-translate-y-2">
              <img
                src={mediaSrc}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Bottom: Info */}
        <div className="relative z-10 p-6 md:p-8 pt-0 flex flex-col justify-end shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider border border-white/10 bg-white/5 text-text-muted backdrop-blur-sm">
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider border border-accent-purple/30 bg-accent-purple/10 text-accent-purple shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                Featured
              </span>
            )}
          </div>

          <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl sm:text-2xl font-bold text-text-primary leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-cyan group-hover:to-accent-teal transition-all duration-300">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-text-muted line-clamp-2">
            {project.subtitle} - {project.description}
          </p>

          {/* Tech stack & Links Container */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.03] border border-white/[0.05] text-text-dim group-hover:border-white/10 group-hover:text-text-muted transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.03] border border-white/[0.05] text-text-dim">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
              {project.githubUrl && (
                <span className="text-text-muted hover:text-accent-cyan transition-colors">
                  <Github className="w-4 h-4" />
                </span>
              )}
              {project.liveUrl && (
                <span className="text-text-muted hover:text-accent-cyan transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
