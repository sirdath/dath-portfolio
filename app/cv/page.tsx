import type { Metadata } from "next";
import "../redesign.css";

const CV_FILE = "/cv.pdf";
const DOWNLOAD_NAME = "Dimitrios_Athinaios_CV.pdf";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Curriculum vitae of Dimitrios Athinaios — Geospatial Data Scientist & AI Engineer. MSc Business Analytics (UCL), First Class BSc (Reading).",
  alternates: { canonical: "/cv" },
};

export default function CVPage() {
  return (
    <main className="cv-page">
      <header className="cv-bar">
        <a className="cv-home" href="/" aria-label="Back to dathproject.com">
          <span className="cv-logo">DATH</span>
          <span className="cv-sep">/</span>
          <span className="cv-label">Curriculum Vitae</span>
        </a>
        <nav className="cv-actions">
          <a className="cv-btn" href={CV_FILE} target="_blank" rel="noopener noreferrer">
            Open in new tab ↗
          </a>
          <a className="cv-btn cv-btn-primary" href={CV_FILE} download={DOWNLOAD_NAME}>
            Download PDF ↓
          </a>
        </nav>
      </header>

      <section className="cv-viewer">
        <object data={`${CV_FILE}#view=FitH`} type="application/pdf" className="cv-object" aria-label="CV document">
          {/* Fallback for browsers (notably mobile) that won't render PDFs inline */}
          <div className="cv-fallback">
            <p className="cv-fallback-title">Your browser can&apos;t display the PDF inline.</p>
            <a className="cv-btn cv-btn-primary" href={CV_FILE} download={DOWNLOAD_NAME}>
              Download the CV ↓
            </a>
          </div>
        </object>
      </section>

      <style>{`
        html, body { height: 100%; }
        .cv-page {
          min-height: 100vh; min-height: 100dvh;
          display: flex; flex-direction: column;
          background: var(--bg); color: var(--ink);
        }
        .cv-bar {
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
          padding: 14px clamp(16px, 4vw, 40px);
          border-bottom: 1px solid var(--line);
          background: color-mix(in srgb, var(--bg) 82%, transparent);
          backdrop-filter: blur(10px);
          position: sticky; top: 0; z-index: 10;
        }
        .cv-home { display: inline-flex; align-items: center; gap: 12px; }
        .cv-logo {
          font-family: var(--mono); font-weight: 700; font-size: 15px;
          letter-spacing: .28em; color: var(--accent-2);
        }
        .cv-sep { color: var(--ink-4); }
        .cv-label {
          font-family: var(--mono); font-size: 11px; letter-spacing: .18em;
          text-transform: uppercase; color: var(--ink-3);
        }
        .cv-actions { display: flex; gap: 10px; }
        .cv-btn {
          font-family: var(--mono); font-size: 12px; letter-spacing: .04em;
          padding: 9px 16px; border-radius: 7px;
          border: 1px solid var(--line-2); color: var(--ink-2);
          transition: color .2s ease, border-color .2s ease, background .2s ease, transform .2s ease;
        }
        .cv-btn:hover { color: var(--ink); border-color: var(--accent); transform: translateY(-1px); }
        .cv-btn-primary {
          background: var(--accent); border-color: var(--accent); color: var(--ink);
          font-weight: 600;
        }
        .cv-btn-primary:hover { background: var(--accent-2); border-color: var(--accent-2); color: var(--ink); }
        .cv-viewer { flex: 1; padding: clamp(12px, 3vw, 28px); }
        .cv-object {
          width: 100%; height: 100%; min-height: 70vh;
          border: 1px solid var(--line); border-radius: 12px;
          background: var(--bg-1);
        }
        .cv-fallback {
          height: 100%; min-height: 60vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 18px; text-align: center; padding: 40px;
        }
        .cv-fallback-title { font-family: var(--display); color: var(--ink-2); }
      `}</style>
    </main>
  );
}
