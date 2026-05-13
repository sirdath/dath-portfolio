import "../../redesign.css";
import "../aegis/aegis.css";
import { CaseStudyShell } from "@/components/redesign/case-study/CaseStudyShell";

export const metadata = {
  title: "RiskTerrain — S&P 500 cascading-risk intelligence · Dimitris Athinaios",
  description:
    "A 6-node LangGraph pipeline that ingests live geopolitical events, traverses a 154-company supply-chain graph in SurrealDB, and scores cascading risk in under 8 seconds. Hybrid graph-vector retrieval with sentence-transformer embeddings.",
};

const extraNavActions = (
  <a
    href="https://github.com/sirdath/Risk-Terrain-Hackathon-SurrealDB-Langchain"
    target="_blank"
    rel="noopener noreferrer"
    className="aegis-back"
  >
    GitHub ↗
  </a>
);

export default function Page() {
  return (
    <CaseStudyShell title="RiskTerrain" extraNavActions={extraNavActions}>
      {/* ── Hero ── */}
      <header className="aegis-hero wrap">
        <div>
          <span className="eyebrow">
            <span className="bar" />
            <b>Case study</b>
            <span>AI · Risk intelligence</span>
          </span>
          <h1 className="section-title aegis-title">
            Risk<em>Terrain</em>.
          </h1>
          <p className="aegis-tagline">
            A platform that maps how <em>geopolitical disruptions cascade</em> through S&amp;P 500 supply chains. Live events from USGS + NewsAPI go through a 6-node LangGraph pipeline that traverses a 154-company knowledge graph in SurrealDB and emits a per-company exposure score in under 8 seconds.
          </p>
        </div>

        <div className="aegis-stats">
          <div><b>154</b><span>S&amp;P 500 companies</span></div>
          <div><b>6 nodes</b><span>LangGraph pipeline</span></div>
          <div><b>&lt;8s</b><span>End-to-end latency</span></div>
          <div><b>Hybrid</b><span>Graph + vector retrieval</span></div>
        </div>

        <div className="aegis-stack">
          <span className="stack-label">/ Stack</span>
          <div className="stack-chips">
            <span className="chip">Python</span>
            <span className="chip">LangGraph</span>
            <span className="chip">SurrealDB</span>
            <span className="chip">sentence-transformers</span>
            <span className="chip">Three.js</span>
            <span className="chip">Docker</span>
          </div>
        </div>
      </header>

      {/* ── 01 Live demo shot ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          01 / Live <em>view</em>.
        </h2>
        <p className="aegis-lead">
          The dashboard shows the system mid-cascade — a M7.4 earthquake hit Taiwan, the TSMC supply chain lit up, and within seconds the platform identified the S&amp;P 500 companies most exposed (AAPL: 92% critical, AMD: 88% critical) with per-row natural-language reasoning.
        </p>

        <figure className="aegis-arch-feature">
          <div className="aegis-frame">
            <img src="/redesign/risk-terrain/hero.webp" alt="RiskTerrain dashboard — TSMC critical event" loading="lazy" />
          </div>
          <figcaption>
            <b>Cascading-risk view</b>
            <span>3D globe with arcs showing supply-chain propagation from the event epicentre. The side panel ranks affected companies by exposure score with stock-impact context and AI-written rationale per row.</span>
          </figcaption>
        </figure>

        <figure className="aegis-arch-feature">
          <div className="aegis-frame">
            <img src="/redesign/risk-terrain/analysis.webp" alt="RiskTerrain analyzing a political event" loading="lazy" />
          </div>
          <figcaption>
            <b>Political-event mode</b>
            <span>The same pipeline handles non-disaster shocks. Here it ingests a real media-coverage event around US-Iran tensions, classifies it, and surfaces communication-sector companies (AMZN, ADBE, AAPL) with their thematic exposure.</span>
          </figcaption>
        </figure>
      </section>

      {/* ── 02 The pipeline ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          02 / The <em>pipeline</em>.
        </h2>
        <p className="aegis-lead">
          Six nodes, one direction. Each step is independently testable; the whole graph runs in batch (for backtesting) or streaming (for live events). The latency budget is dominated by the graph traversal — everything else is cheap.
        </p>

        <ol className="nv-pipeline">
          <li>
            <span className="nv-step">01</span>
            <div>
              <b>Event ingestion</b>
              <p>Poll USGS earthquakes (60s) and NewsAPI (15min). Each raw event becomes a normalised record: <code className="nv-code">{`{ type, severity, region, timestamp, source }`}</code>.</p>
            </div>
          </li>
          <li>
            <span className="nv-step">02</span>
            <div>
              <b>Classification</b>
              <p>An LLM classifier assigns a category (natural disaster · political instability · trade dispute · cyber) plus a severity score (1-5). Cheap model — this is a fast filter, not a deep analysis.</p>
            </div>
          </li>
          <li>
            <span className="nv-step">03</span>
            <div>
              <b>Entity extraction</b>
              <p>NER pulls company names, regions, sectors, and commodities from the event text. The output is a set of candidate entities to feed the graph step.</p>
            </div>
          </li>
          <li>
            <span className="nv-step">04</span>
            <div>
              <b>Graph traversal</b>
              <p>Multi-hop traversal in SurrealDB. Start from affected entities, walk supplier / customer / competitor edges out to 2-3 hops, collect exposed companies. <em>This is the load-bearing step</em> — the value is here.</p>
            </div>
          </li>
          <li>
            <span className="nv-step">05</span>
            <div>
              <b>Risk scoring</b>
              <p>Per company: weight by graph distance, edge strength, region overlap, and event severity. Fuse into a single 0-100 exposure score. Calibrated against historical event-impact pairs.</p>
            </div>
          </li>
          <li>
            <span className="nv-step">06</span>
            <div>
              <b>Output</b>
              <p>Ranked companies + per-row "why" trace (which edge chain caused exposure). Surfaces in the Three.js 3D terrain frontend.</p>
            </div>
          </li>
        </ol>
      </section>

      {/* ── 03 Hybrid retrieval ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          03 / Hybrid <em>retrieval</em>.
        </h2>
        <p className="aegis-lead">
          Pure graph traversal misses thematic risk — an event about "rare earth export controls" only catches downstream companies if their edges are tagged correctly. Pure vector search misses structural risk — semantic similarity doesn&apos;t encode "who supplies whom." So the system runs both and unions the results.
        </p>

        <div className="nv-two-col">
          <div className="nv-col">
            <h3 className="nv-h3">Graph queries</h3>
            <ul className="nv-list">
              <li>Multi-hop traversal in SurrealDB across <em>supplier</em>, <em>customer</em>, <em>competitor</em> relations.</li>
              <li>Region-aware: edges carry geographic metadata, so "Taiwan earthquake" → semiconductor supply chain on the right continent.</li>
              <li>Returns structural exposure with provenance — which edge chain caused which company to surface.</li>
            </ul>
          </div>
          <div className="nv-col">
            <h3 className="nv-h3">Vector queries</h3>
            <ul className="nv-list">
              <li>sentence-transformer embeddings on company business descriptions.</li>
              <li>Event text is embedded and cosine-similarity-searched against the company corpus.</li>
              <li>Catches thematic risk the graph misses (an event about lithium prices flags battery-related companies the supply graph never explicitly connected).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 04 Graph + events views ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          04 / Graph &amp; <em>events</em>.
        </h2>
        <p className="aegis-lead">
          Beyond the per-event drill-down, two other views let users browse the underlying data. The graph view exposes the supply-chain network directly; the events feed shows every shock the system has detected, with classification + tags.
        </p>

        <figure className="aegis-arch-feature">
          <div className="aegis-frame">
            <img src="/redesign/risk-terrain/graph.webp" alt="RiskTerrain — supply chain graph view" loading="lazy" />
          </div>
          <figcaption>
            <b>Supply-chain graph</b>
            <span>87 companies + 99 supplier / customer / sector-peer edges visible at once. Each arc colour-coded by relationship type. Search any ticker to centre the view on its first- and second-hop neighbours.</span>
          </figcaption>
        </figure>

        <figure className="aegis-arch-feature">
          <div className="aegis-frame">
            <img src="/redesign/risk-terrain/events.webp" alt="RiskTerrain — live events feed" loading="lazy" />
          </div>
          <figcaption>
            <b>Live event feed</b>
            <span>Every ingested event with its classification, source, severity, and affected-region tags. Earthquakes (USGS), missile strikes, oil-price moves, political news (NewsAPI) all flow into the same monitor.</span>
          </figcaption>
        </figure>
      </section>

      {/* ── 05 Why SurrealDB ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          05 / Why <em>SurrealDB</em>.
        </h2>
        <p className="aegis-lead">
          The graph could have lived in Neo4j (more mature) or in PostgreSQL with recursive CTEs (no extra dependency). SurrealDB won three trade-offs.
        </p>

        <div className="nv-arch-notes">
          <div className="nv-note">
            <span className="nv-note-num">Multi-model</span>
            <p>Graph + document + relational in one engine. The event log is a document store; the supply network is a graph; the company metadata is relational. One DB, three shapes.</p>
          </div>
          <div className="nv-note">
            <span className="nv-note-num">SurrealQL ergonomics</span>
            <p>Graph traversal syntax (<code className="nv-code">{`->supplier->company`}</code>) maps directly to the mental model. Neo4j&apos;s Cypher is more powerful but verbose; SurrealQL keeps the pipeline code legible.</p>
          </div>
          <div className="nv-note">
            <span className="nv-note-num">Embedded vector support</span>
            <p>Native vector indexing means the hybrid retrieval doesn&apos;t need a separate vector DB. One container instead of two — important for a hackathon submission.</p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="aegis-section wrap nv-final">
        <h2 className="aegis-h2">
          See <em>it</em>.
        </h2>
        <p className="aegis-lead">
          Source on GitHub. Built for the SurrealDB + LangChain hackathon — sub-8-second risk scoring across 154 S&amp;P 500 companies from the moment an event lands.
        </p>
        <div className="nv-cta-row nv-cta-final">
          <a
            href="https://github.com/sirdath/Risk-Terrain-Hackathon-SurrealDB-Langchain"
            target="_blank"
            rel="noopener noreferrer"
            className="nv-cta-primary"
          >
            github.com/sirdath/Risk-Terrain ↗
          </a>
        </div>
      </section>
    </CaseStudyShell>
  );
}
