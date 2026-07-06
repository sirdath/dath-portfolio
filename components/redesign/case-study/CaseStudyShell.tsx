import type { ReactNode } from "react";
import { CaseStudyNav } from "./CaseStudyNav";
import { CaseStudyFooter } from "./CaseStudyFooter";

export interface CaseStudyShellProps {
  title: string;
  tagline?: string;
  categoryText?: string;
  extraNavActions?: ReactNode;
  stats?: { label: string; value: string }[];
  techStack?: string[];
  children: ReactNode;
}

/**
 * High-level wrapper for a project case study page. Composes nav +
 * article + footer with consistent vertical chrome. 
 *
 * It accepts optional props for `tagline`, `categoryText`, `stats`, and `techStack`.
 * If provided, it will automatically render the standard `.aegis-hero` section.
 * Otherwise, it expects the caller to provide their own hero via `children`.
 */
export function CaseStudyShell({
  title,
  tagline,
  categoryText = "Case study",
  extraNavActions,
  stats,
  techStack,
  children,
}: CaseStudyShellProps) {
  const renderHero = tagline || (stats && stats.length > 0) || (techStack && techStack.length > 0);

  return (
    <div className="aegis-page">
      <CaseStudyNav extraActions={extraNavActions} />
      <article>
        {renderHero && (
          <header className="aegis-hero wrap">
            <div className="reveal in">
              <span className="eyebrow">
                <span className="bar" />
                <b>Case study</b>
                <span>{categoryText}</span>
              </span>
              <h1 className="section-title aegis-title">
                {title}
              </h1>
              {tagline && (
                <p className="aegis-tagline">
                  {tagline}
                </p>
              )}
            </div>

            {stats && stats.length > 0 && (
              <div className="aegis-stats">
                {stats.map((s, i) => (
                  <div key={i}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            )}

            {techStack && techStack.length > 0 && (
              <div className="tblk tblk-success tblk-card">
                <header className="tblk-head">
                  <span className="tblk-status">✓</span>
                  <code className="tblk-cmd">build {title.toLowerCase().replace(/\s+/g, '-')} --release</code>
                  <span className="tblk-meta">
                    <span className="tblk-cwd">~/{title.toLowerCase().replace(/\s+/g, '-')}</span>
                    <span className="tblk-time">{techStack.length} deps</span>
                    <span className="tblk-exit">0</span>
                  </span>
                  <div className="tblk-actions">
                    <button className="tblk-collapse" aria-label="Collapse">▾</button>
                  </div>
                </header>
                <pre className="tblk-output">
                  <span className="ansi-green">Ready</span> Stack resolved in 0.23s
                  {"\n"}
                  {techStack.map(chip => `[+] loaded dependency: ${chip}`).join('\n')}
                </pre>
              </div>
            )}
          </header>
        )}
        
        {children}
      </article>
      <CaseStudyFooter title={title} />
    </div>
  );
}
