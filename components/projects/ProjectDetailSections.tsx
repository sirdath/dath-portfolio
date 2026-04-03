"use client";

import { motion } from "framer-motion";
import type { ProjectDetailContent } from "@/data/projects";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

function SectionWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-text-primary mb-6">
      {children}
    </h2>
  );
}

export function ProjectDetailSections({
  content,
}: {
  content: ProjectDetailContent;
}) {
  return (
    <div className="space-y-16">
      {/* Overview */}
      <SectionWrapper>
        <p className="text-lg leading-relaxed text-text-muted">
          {content.overview}
        </p>
      </SectionWrapper>

      {/* Architecture Diagram */}
      {content.architectureDiagram && (
        <SectionWrapper>
          <SectionHeading>Architecture</SectionHeading>
          <div className="glass rounded-2xl p-6 sm:p-8 border-l-2 border-accent-cyan/30 overflow-x-auto">
            <pre className="font-[family-name:var(--font-jetbrains-mono)] text-xs sm:text-sm text-accent-cyan/80 leading-relaxed whitespace-pre">
              {content.architectureDiagram}
            </pre>
          </div>
        </SectionWrapper>
      )}

      {/* Key Features */}
      {content.keyFeatures && content.keyFeatures.length > 0 && (
        <SectionWrapper>
          <SectionHeading>Key Features</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.keyFeatures.map((feature, i) => (
              <div
                key={i}
                className="glass rounded-xl px-5 py-4 flex items-start gap-3 hover:border-accent-cyan/20 transition-colors duration-300"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0" />
                <span className="text-sm text-text-muted leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Content Sections */}
      {content.sections.map((section, i) => (
        <SectionWrapper key={i}>
          <SectionHeading>{section.heading}</SectionHeading>
          <p className="text-text-muted leading-relaxed">{section.body}</p>
          {section.bullets && section.bullets.length > 0 && (
            <ul className="mt-4 space-y-2">
              {section.bullets.map((bullet, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-text-muted">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-purple shrink-0" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </SectionWrapper>
      ))}

      {/* Data Sources */}
      {content.dataSources && content.dataSources.length > 0 && (
        <SectionWrapper>
          <SectionHeading>Data Sources</SectionHeading>
          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-text-dim font-medium uppercase tracking-wider text-xs">
                    Source
                  </th>
                  <th className="text-left px-5 py-3 text-text-dim font-medium uppercase tracking-wider text-xs">
                    Type
                  </th>
                  <th className="text-left px-5 py-3 text-text-dim font-medium uppercase tracking-wider text-xs">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {content.dataSources.map((source, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/5 last:border-0 ${
                      i % 2 === 1 ? "bg-white/[0.02]" : ""
                    }`}
                  >
                    <td className="px-5 py-3 text-text-primary font-medium">
                      {source.name}
                    </td>
                    <td className="px-5 py-3 text-text-muted">{source.type}</td>
                    <td className="px-5 py-3 text-text-muted">
                      {source.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionWrapper>
      )}

      {/* API Endpoints */}
      {content.apiEndpoints && content.apiEndpoints.length > 0 && (
        <SectionWrapper>
          <SectionHeading>API Endpoints</SectionHeading>
          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-text-dim font-medium uppercase tracking-wider text-xs">
                    Method
                  </th>
                  <th className="text-left px-5 py-3 text-text-dim font-medium uppercase tracking-wider text-xs">
                    Endpoint
                  </th>
                  <th className="text-left px-5 py-3 text-text-dim font-medium uppercase tracking-wider text-xs">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {content.apiEndpoints.map((endpoint, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/5 last:border-0 ${
                      i % 2 === 1 ? "bg-white/[0.02]" : ""
                    }`}
                  >
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider ${
                          endpoint.method === "GET"
                            ? "bg-accent-cyan/10 text-accent-cyan"
                            : "bg-accent-purple/10 text-accent-purple"
                        }`}
                      >
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-[family-name:var(--font-jetbrains-mono)] text-xs text-text-primary">
                      {endpoint.path}
                    </td>
                    <td className="px-5 py-3 text-text-muted">
                      {endpoint.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionWrapper>
      )}
    </div>
  );
}
