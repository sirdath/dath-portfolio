import Link from "next/link";

/**
 * Shared footer for every project case study page. Mirrors the
 * .aegis-foot block from app/projects/aegis/aegis.css.
 */
export function CaseStudyFooter({ title }: { title: string }) {
  return (
    <footer className="aegis-foot wrap">
      <Link href="/" className="aegis-home">
        ← dathproject.com
      </Link>
      <span>
        © Dimitris Athinaios · {title} case study
      </span>
    </footer>
  );
}
