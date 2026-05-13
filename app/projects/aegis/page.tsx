import Link from "next/link";
import "../../redesign.css";
import "./aegis.css";

export const metadata = {
  title: "AEGIS — Maritime Intelligence Platform · Dimitris Athinaios",
  description:
    "Multi-agent maritime shipping risk platform. CrewAI agents over 7 data sources, 4 database technologies, route + tariff + risk scoring.",
};

const productShots = [
  {
    src: "/redesign/aegis/Dashboard.webp",
    label: "Operations dashboard",
    note: "Vessel state, risk heat-map, and ATA forecasts in one pane.",
  },
  {
    src: "/redesign/aegis/3dGlobe.webp",
    label: "3D globe view",
    note: "Live AIS positions overlaid with active risk zones and choke-point density.",
  },
  {
    src: "/redesign/aegis/2dmap.webp",
    label: "2D operational map",
    note: "Standard mercator projection for incident review and routing decisions.",
  },
];

const analystShots = [
  {
    src: "/redesign/aegis/AEGISTANALYST.webp",
    label: "Analyst — Query",
    note: "Natural-language query → CrewAI delegates to risk, routing, and compliance agents.",
  },
  {
    src: "/redesign/aegis/AEGISTANALYST2.webp",
    label: "Analyst — Reasoning",
    note: "Each agent's intermediate output is captured with W3C PROV lineage for auditability.",
  },
  {
    src: "/redesign/aegis/AEGISTANALYST-Results.webp",
    label: "Analyst — Results",
    note: "Synthesised answer with structured citations, source data, and hallucination check.",
  },
];

const analyticsShots = [
  {
    src: "/redesign/aegis/Tariff.webp",
    label: "Tariff explorer",
  },
  {
    src: "/redesign/aegis/ChokePoint-MarineWeather.webp",
    label: "Choke-point × marine weather",
  },
  {
    src: "/redesign/aegis/ActiveRiskZones.webp",
    label: "Active risk zones",
  },
];

export default function AegisPage() {
  return (
    <div className="aegis-page">
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
          <Link href="/#work" className="aegis-back">
            ← Back to work
          </Link>
          <Link href="/#contact" className="status-pill nav-status">
            <span className="dot" aria-hidden="true" />
            <span className="when">Aug 15, 2026</span>
          </Link>
        </div>
      </nav>

      <article>
        {/* ── Hero ── */}
        <header className="aegis-hero wrap">
          <div className="reveal in">
            <span className="eyebrow">
              <span className="bar" />
              <b>Case study</b>
              <span>AI · Maritime intelligence</span>
            </span>
            <h1 className="section-title aegis-title">
              AE<em>GIS</em>.
            </h1>
            <p className="aegis-tagline">
              A multi-agent platform for monitoring maritime shipping risk across <em>chokepoints</em>, supply chains, and tariff regimes — built on top of seven live data sources, four database technologies, and a CrewAI orchestrator with W3C PROV lineage.
            </p>
          </div>

          <div className="aegis-stats">
            <div><b>7+</b><span>Data sources</span></div>
            <div><b>4</b><span>Databases</span></div>
            <div><b>3</b><span>LLM agents</span></div>
            <div><b>W3C PROV</b><span>Lineage layer</span></div>
          </div>

          <div className="aegis-stack">
            <span className="stack-label">/ Stack</span>
            <div className="stack-chips">
              <span className="chip">FastAPI</span>
              <span className="chip">React 19</span>
              <span className="chip">CrewAI</span>
              <span className="chip">PostGIS</span>
              <span className="chip">Neo4j</span>
              <span className="chip">ChromaDB</span>
              <span className="chip">Redis</span>
              <span className="chip">deck.gl</span>
              <span className="chip">Docker</span>
            </div>
          </div>
        </header>

        {/* ── Product views ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            01 / Operations <em>views</em>.
          </h2>
          <p className="aegis-lead">
            Three views, one mental model. The 3D globe is for situational awareness; the 2D map for incident triage; the dashboard for daily standup metrics.
          </p>
          <div className="aegis-stack-grid">
            {productShots.map((s) => (
              <figure key={s.src} className="aegis-shot">
                <div className="aegis-frame">
                  <img src={s.src} alt={s.label} loading="lazy" />
                </div>
                <figcaption>
                  <b>{s.label}</b>
                  <span>{s.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── AI Analyst ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            02 / AI <em>analyst</em>.
          </h2>
          <p className="aegis-lead">
            Natural-language queries route to a CrewAI orchestrator with three specialised agents — risk, routing, compliance. Every intermediate step is captured with W3C PROV lineage; final answers ship with structured citations and a hallucination check pass.
          </p>
          <div className="aegis-analyst-row">
            {analystShots.map((s) => (
              <figure key={s.src} className="aegis-shot">
                <div className="aegis-frame">
                  <img src={s.src} alt={s.label} loading="lazy" />
                </div>
                <figcaption>
                  <b>{s.label}</b>
                  <span>{s.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── Risk analytics ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            03 / Risk <em>analytics</em>.
          </h2>
          <p className="aegis-lead">
            Choke-points (Strait of Hormuz, Suez, Malacca) are weighted by marine weather, active risk zones, and tariff exposure. Each variable is independently queryable, then composed into a single per-vessel risk score.
          </p>
          <div className="aegis-stack-grid">
            {analyticsShots.map((s) => (
              <figure key={s.src} className="aegis-shot">
                <div className="aegis-frame">
                  <img src={s.src} alt={s.label} loading="lazy" />
                </div>
                <figcaption>
                  <b>{s.label}</b>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── Architecture ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            04 / <em>Architecture</em>.
          </h2>
          <p className="aegis-lead">
            7 ingestion sources land in a Redis cache, then split across PostGIS (vessels & zones), Neo4j (route + supplier graphs), and ChromaDB (vector store for the analyst's RAG layer). FastAPI sits in front; deck.gl renders globe + map; CrewAI runs the agent loop on a separate worker.
          </p>

          <figure className="aegis-arch-feature">
            <div className="aegis-frame">
              <img src="/redesign/aegis/AegisArchitectureUpdated.webp" alt="System architecture diagram" loading="lazy" />
            </div>
            <figcaption>
              <b>System architecture</b>
              <span>End-to-end pipeline from ingestion → storage → orchestration → presentation.</span>
            </figcaption>
          </figure>

          <div className="aegis-stack-grid aegis-arch-pair">
            <figure className="aegis-shot">
              <div className="aegis-frame">
                <img src="/redesign/aegis/DataflowDiagram.webp" alt="Data flow diagram" loading="lazy" />
              </div>
              <figcaption>
                <b>Data flow</b>
                <span>How each source's records get normalised, joined, and indexed.</span>
              </figcaption>
            </figure>
            <figure className="aegis-shot">
              <div className="aegis-frame">
                <img src="/redesign/aegis/ERD.webp" alt="Entity-relationship diagram" loading="lazy" />
              </div>
              <figcaption>
                <b>Entity-relationship</b>
                <span>Vessel, route, port, supplier, risk-event — and how they link.</span>
              </figcaption>
            </figure>
          </div>

          <div className="aegis-stack-grid aegis-arch-pair">
            <figure className="aegis-shot">
              <div className="aegis-frame">
                <img src="/redesign/aegis/SwaggerAPIdocs1.webp" alt="API documentation overview" loading="lazy" />
              </div>
              <figcaption>
                <b>API surface (1/2)</b>
                <span>OpenAPI-generated Swagger for the FastAPI service.</span>
              </figcaption>
            </figure>
            <figure className="aegis-shot">
              <div className="aegis-frame">
                <img src="/redesign/aegis/SwaggerAPIdocs2.webp" alt="API documentation detail" loading="lazy" />
              </div>
              <figcaption>
                <b>API surface (2/2)</b>
                <span>Agent endpoints, with request/response schemas inline.</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="aegis-foot wrap">
          <Link href="/" className="aegis-home">← dathproject.com</Link>
          <span>© Dimitris Athinaios · AEGIS case study</span>
        </footer>
      </article>
    </div>
  );
}
