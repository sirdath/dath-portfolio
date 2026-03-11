import { projects } from "@/data/projects";
import { getAssetPath } from "@/lib/assets";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void">
        <p className="text-text-muted">Project not found.</p>
      </div>
    );
  }

  const mediaSrc = getAssetPath(project.mediaUrl);

  return (
    <main className="min-h-screen bg-void">
      {/* Hero media header */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {project.mediaType === "video" ? (
          <video
            src={mediaSrc}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={mediaSrc}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />

        {/* Back button */}
        <Link
          href="/"
          className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-text-muted border border-white/10 bg-white/5 backdrop-blur-md hover:border-accent-cyan/30 hover:text-accent-cyan transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-8 sm:p-12">
          <span className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-[10px] font-medium uppercase tracking-wider border border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan">
            {project.category}
          </span>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary">
            {project.title}
          </h1>
          <p className="mt-2 text-lg text-text-muted">{project.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 sm:px-8 py-16 sm:py-24">
        {/* Description */}
        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-text-muted">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mt-12">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-text-primary mb-6">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {project.techStack.map((tech) => (
              <div
                key={tech}
                className="glass rounded-xl px-4 py-3 text-center text-sm font-medium text-text-muted hover:border-accent-cyan/20 hover:text-accent-cyan transition-all duration-300"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="mt-12 flex items-center gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-white/10 bg-white/5 text-text-muted hover:border-accent-cyan/30 hover:text-accent-cyan transition-all"
            >
              View Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-accent-cyan/30 bg-accent-cyan/5 text-accent-cyan hover:bg-accent-cyan/10 transition-all"
            >
              Live Site
            </a>
          )}
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
