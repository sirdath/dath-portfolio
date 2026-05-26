import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared top navigation for every project case study page. Renders the
 * brand mark + location on the left, optional project-specific actions
 * (e.g., GitHub repo, Live site) + back link + status pill on the right.
 *
 * Uses the same .nav / .nav-case / .nav-brand-static / .status-pill
 * primitives defined in app/redesign.css + app/projects/aegis/aegis.css.
 */
export function CaseStudyNav({ extraActions }: { extraActions?: ReactNode }) {
  return (
    <nav className="nav nav-case">
      <div className="nav-left">
        <Link
          className="nav-brand nav-brand-static"
          href="/"
          aria-label="Back to dathproject.com"
        >
          <img src="/redesign/dath-logo.png" alt="DATH brand mark" />
        </Link>
        <span className="nav-loc">London · UK</span>
      </div>
      <div className="nav-right">
        {extraActions}
        <Link href="/#work" className="aegis-back">
          ← Back to work
        </Link>
        <Link href="/#contact" className="aegis-back">
          Contact
        </Link>
      </div>
    </nav>
  );
}
