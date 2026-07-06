import type { Metadata } from "next";
import Link from "next/link";
import "../redesign.css";

const CV_FILE = "/cv.pdf";
const DOWNLOAD_NAME = "Dimitrios_Athinaios_CV.pdf";

const projects = [
  {
    name: "RiskTerrain",
    href: "/projects/risk-terrain",
    image: "/redesign/risk-terrain/hero.webp",
    eyebrow: "SurrealDB Hackathon · AI risk intelligence",
    summary:
      "A 6-node LangGraph pipeline that ingests live geopolitical events, traverses a 154-company supply-chain graph in SurrealDB, and scores cascading exposure in under 8 seconds.",
    stack: ["SurrealDB", "LangGraph", "Python", "Three.js"],
  },
  {
    name: "NeuroVault",
    href: "/projects/neurovault",
    image: "/redesign/screenshots/neurovault.webp",
    eyebrow: "AI · Local-first memory",
    summary:
      "A Tauri desktop app that gives AI agents persistent memory through a local markdown vault, knowledge graph, hybrid retrieval, and MCP-compatible recall/remember tools.",
    stack: ["Tauri", "Rust", "React", "SQLite", "MCP"],
  },
  {
    name: "DS2 Workspace",
    href: "/projects/ds2-admin",
    image: "/redesign/ds2-admin/copilot-conversation-dark.webp",
    eyebrow: "Admin panel · Agentic internal tooling",
    summary:
      "A private operating system for a two-founder consultancy: admin dashboard, pipeline, leads, calendar, content tools, and an agentic copilot with confirm-gated actions.",
    stack: ["Next.js", "React", "Supabase", "Agents"],
  },
  {
    name: "AEGIS",
    href: "/projects/aegis",
    image: "/redesign/aegis/Dashboard.webp",
    eyebrow: "AI · Maritime intelligence",
    summary:
      "A maritime shipping risk platform that combines live data sources, geospatial views, and CrewAI agents for route, tariff, and risk analysis with provenance.",
    stack: ["FastAPI", "CrewAI", "PostGIS", "Neo4j"],
  },
  {
    name: "Nodebook",
    href: "/projects/nodebook",
    image: "/redesign/nodebook/hero.webp",
    eyebrow: "AI learning · Web + mobile",
    summary:
      "An on-demand knowledge compiler: topic, link, or question in; cited module, diagrams, math, and spaced-recall practice out. Built across Next.js, Expo, Supabase, and Gemini.",
    stack: ["Next.js", "Expo", "Supabase", "Gemini"],
  },
  {
    name: "DreamBug",
    href: "/projects/dreambug",
    image: "/redesign/dreambug/story-bramwyn-1.webp",
    eyebrow: "Mobile · Generative storybooks",
    summary:
      "A personalized children's storybook app where parents pick a hero and the product assembles illustrated, age-appropriate books with coherent characters and worlds.",
    stack: ["Expo", "React Native", "Supabase", "Rive"],
  },
];

export const metadata: Metadata = {
  title: "CV - Dimitris Athinaios",
  description: "Curriculum vitae of Dimitris Athinaios.",
  alternates: { canonical: "/cv" },
};

export default function CVPage() {
  return (
    <main className="cv-page">
      <nav className="cv-nav" aria-label="CV navigation">
        <Link className="cv-brand" href="/" aria-label="Back to dathproject.com">
          <span>DATH</span>
          <b>/ cv</b>
        </Link>
        <div className="cv-actions">
          <a className="cv-btn" href={CV_FILE} target="_blank" rel="noopener noreferrer">
            Open PDF
          </a>
          <a className="cv-btn cv-btn-primary" href={CV_FILE} download={DOWNLOAD_NAME}>
            Download
          </a>
        </div>
      </nav>

      <section className="cv-shell" aria-label="Dimitris Athinaios CV">
        <iframe src={`${CV_FILE}#view=FitH`} title="Dimitris Athinaios CV" />
      </section>

      <section className="cv-projects" aria-labelledby="cv-projects-title">
        <div className="cv-projects-head">
          <span>Selected projects</span>
          <h1 id="cv-projects-title">A few things I have built.</h1>
        </div>

        <div className="cv-project-grid">
          {projects.map((project) => (
            <article key={project.name} className="cv-project-card">
              <div className="cv-project-image">
                <img src={project.image} alt={`${project.name} preview`} loading="lazy" />
              </div>
              <div className="cv-project-body">
                <span>{project.eyebrow}</span>
                <h2>{project.name}</h2>
                <p>{project.summary}</p>
                <div className="cv-project-stack">
                  {project.stack.map((item) => (
                    <b key={item}>{item}</b>
                  ))}
                </div>
                <Link className="cv-project-link" href={project.href}>
                  View case study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <style>{`
        html, body { min-height: 100%; }
        .cv-page {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          background: var(--bg);
          color: var(--ink);
          font-family: var(--sans);
        }
        .cv-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 12px clamp(14px, 3vw, 32px);
          border-bottom: 1px solid var(--line);
          background: rgba(11, 15, 14, .88);
          backdrop-filter: blur(12px);
        }
        .cv-brand,
        .cv-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .cv-brand span {
          color: var(--accent-2);
          font-weight: 800;
          letter-spacing: .3em;
        }
        .cv-brand b {
          color: var(--ink-3);
          font-weight: 500;
        }
        .cv-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 36px;
          padding: 9px 13px;
          border: 1px solid var(--line-2);
          border-radius: 7px;
          color: var(--ink-2);
          transition: color .2s ease, border-color .2s ease, background .2s ease;
        }
        .cv-btn:hover {
          color: var(--ink);
          border-color: var(--hilite);
        }
        .cv-btn-primary {
          color: var(--ink);
          border-color: var(--accent);
          background: var(--accent);
          font-weight: 700;
        }
        .cv-btn-primary:hover {
          border-color: var(--accent-2);
          background: var(--accent-2);
        }
        .cv-shell {
          flex: 1;
          min-height: 0;
          padding: clamp(8px, 1.6vw, 18px);
        }
        .cv-shell iframe {
          display: block;
          width: 100%;
          height: calc(100vh - 62px - clamp(16px, 3.2vw, 36px));
          height: calc(100dvh - 62px - clamp(16px, 3.2vw, 36px));
          min-height: 720px;
          border: 1px solid var(--line-2);
          border-radius: 8px;
          background: #fff;
        }
        .cv-projects {
          padding: clamp(34px, 6vw, 72px) clamp(14px, 4vw, 48px);
          border-top: 1px solid var(--line);
          background:
            radial-gradient(circle at 12% 0%, rgba(45, 134, 89, .16), transparent 28rem),
            var(--bg);
        }
        .cv-projects-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 22px;
          margin-bottom: 20px;
        }
        .cv-projects-head span,
        .cv-project-body > span {
          color: var(--hilite);
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .cv-projects-head h1 {
          max-width: 760px;
          font-family: var(--display);
          font-size: clamp(28px, 4vw, 48px);
          line-height: 1;
          letter-spacing: 0;
        }
        .cv-project-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .cv-project-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-height: 100%;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: rgba(19, 25, 24, .66);
          transition: transform .2s ease, border-color .2s ease, background .2s ease;
        }
        .cv-project-card:hover {
          transform: translateY(-3px);
          border-color: rgba(220, 239, 230, .26);
          background: rgba(25, 33, 31, .78);
        }
        .cv-project-image {
          aspect-ratio: 16 / 10;
          max-height: 154px;
          background: var(--bg-1);
          border-bottom: 1px solid var(--line);
        }
        .cv-project-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .cv-project-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          padding: 15px;
        }
        .cv-project-body h2 {
          margin-top: 8px;
          font-family: var(--display);
          font-size: 26px;
          line-height: 1;
          letter-spacing: 0;
        }
        .cv-project-body p {
          margin-top: 10px;
          color: var(--ink-2);
          font-size: 14px;
          line-height: 1.46;
        }
        .cv-project-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 13px;
        }
        .cv-project-stack b {
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 5px 8px;
          color: var(--ink-2);
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 500;
        }
        .cv-project-link {
          align-self: flex-start;
          margin-top: auto;
          padding-top: 16px;
          color: var(--hilite);
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: .1em;
          text-transform: uppercase;
        }
        .cv-project-link::after {
          content: " ->";
        }
        .cv-project-link:hover {
          color: var(--ink);
        }
        @media (max-width: 640px) {
          .cv-nav {
            align-items: flex-start;
            flex-direction: column;
          }
          .cv-actions {
            width: 100%;
          }
          .cv-btn {
            flex: 1;
          }
          .cv-shell iframe {
            min-height: 560px;
          }
          .cv-projects-head {
            display: block;
          }
          .cv-projects-head span {
            display: block;
            margin-bottom: 12px;
          }
          .cv-project-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .cv-projects {
            padding: 32px 12px 40px;
          }
          .cv-project-card {
            display: grid;
            grid-template-columns: 108px minmax(0, 1fr);
          }
          .cv-project-image {
            aspect-ratio: auto;
            max-height: none;
            min-height: 100%;
            border-right: 1px solid var(--line);
            border-bottom: 0;
          }
          .cv-project-body {
            padding: 12px;
          }
          .cv-project-body > span {
            font-size: 9px;
            letter-spacing: .1em;
          }
          .cv-project-body h2 {
            font-size: 22px;
          }
          .cv-project-body p {
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            font-size: 13px;
          }
          .cv-project-stack {
            gap: 5px;
            margin-top: 10px;
          }
          .cv-project-stack b {
            padding: 4px 6px;
            font-size: 9px;
          }
          .cv-project-link {
            padding-top: 12px;
            font-size: 10px;
          }
        }
        @media (min-width: 641px) and (max-width: 1040px) {
          .cv-project-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </main>
  );
}
