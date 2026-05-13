import type { ReactNode } from "react";
import { CaseStudyNav } from "./CaseStudyNav";
import { CaseStudyFooter } from "./CaseStudyFooter";

/**
 * High-level wrapper for a project case study page. Composes nav +
 * article + footer with consistent vertical chrome. Each per-project
 * page calls <CaseStudyShell title="..."> and writes the hero +
 * sections inline as children.
 *
 * `extraNavActions` is the slot for project-specific buttons in the
 * navbar (e.g., GitHub repo, Live site). Keep them as <Link> or <a>
 * with className="aegis-back" or "aegis-back nv-live" for consistency
 * with existing AEGIS / NeuroVault pages.
 */
export function CaseStudyShell({
  title,
  extraNavActions,
  children,
}: {
  title: string;
  extraNavActions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="aegis-page">
      <CaseStudyNav extraActions={extraNavActions} />
      <article>{children}</article>
      <CaseStudyFooter title={title} />
    </div>
  );
}
