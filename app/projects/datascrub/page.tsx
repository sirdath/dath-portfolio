import "../../redesign.css";
import "../case-study.css";
import { CaseStudyShell } from "@/components/redesign/case-study/CaseStudyShell";

export const metadata = {
  title: "DataScrub — Privacy-first browser data cleaning · Dimitris Athinaios",
  description:
    "A client-side data cleaning agent that pairs deterministic rule-based automation with optional LLM intelligence. Runs entirely in the browser — no backend, no server, no data leaves your machine in Local Mode.",
};

const extraNavActions = (
  <a
    href="https://github.com/sirdath/DataScrub"
    target="_blank"
    rel="noopener noreferrer"
    className="aegis-back"
  >
    GitHub ↗
  </a>
);

export default function Page() {
  return (
    <CaseStudyShell title="DataScrub" extraNavActions={extraNavActions}>
      {/* ── Hero ── */}
      <header className="aegis-hero wrap">
        <div>
          <span className="eyebrow">
            <span className="bar" />
            <b>Case study</b>
            <span>AI · Privacy-first data cleaning</span>
          </span>
          <h1 className="section-title aegis-title">
            Data<em>Scrub</em>.
          </h1>
          <p className="aegis-tagline">
            A <em>browser-only</em> data cleaning utility that pairs deterministic rule-based automation with optional LLM intelligence. The whole app is a single static file — no backend, no server, no data ever leaves your machine in Local Mode.
          </p>
        </div>

        <div className="aegis-stats">
          <div><b>9</b><span>Color themes</span></div>
          <div><b>4</b><span>LLM providers</span></div>
          <div><b>IQR</b><span>Outlier detection</span></div>
          <div><b>Undo / Redo</b><span>Full history stack</span></div>
        </div>

        <div className="aegis-stack">
          <span className="stack-label">/ Stack</span>
          <div className="stack-chips">
            <span className="chip">JavaScript ES6+</span>
            <span className="chip">PapaParse</span>
            <span className="chip">SheetJS</span>
            <span className="chip">Ollama</span>
            <span className="chip">Groq</span>
            <span className="chip">OpenAI</span>
            <span className="chip">OpenRouter</span>
            <span className="chip">Static-page deploy</span>
          </div>
        </div>
      </header>

      {/* ── 01 Two modes ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          01 / Two <em>modes</em>.
        </h2>
        <p className="aegis-lead">
          DataScrub doesn&apos;t force a privacy/intelligence trade-off — you pick which side of the fence each dataset sits on. Sensitive data stays local; non-sensitive data gets frontier-model reasoning.
        </p>

        <div className="nv-two-col">
          <div className="nv-col">
            <h3 className="nv-h3">Local mode (Ollama)</h3>
            <ul className="nv-list">
              <li>Runs against a locally-installed Ollama instance.</li>
              <li><em>No data crosses the network</em> — once Ollama is running, the internet can be off.</li>
              <li>Recommended models: <code className="nv-code">qwen2.5:7b</code>, <code className="nv-code">llama3.1:8b</code>, <code className="nv-code">mistral</code>, <code className="nv-code">gemma2</code>.</li>
              <li>Best for healthcare, finance, HR, anything regulated.</li>
            </ul>
          </div>
          <div className="nv-col">
            <h3 className="nv-h3">Cloud mode</h3>
            <ul className="nv-list">
              <li>Connects to Groq (low latency), OpenAI, or OpenRouter.</li>
              <li>Only <em>snippets</em> transit the wire — column schemas, summaries, specific queries — never the full dataset.</li>
              <li>API keys live in browser <code className="nv-code">localStorage</code>; clear at any time.</li>
              <li>Best for general analytical work where regulatory constraints don&apos;t apply.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 02 Privacy by design ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          02 / Privacy <em>by design</em>.
        </h2>
        <p className="aegis-lead">
          Three architectural decisions remove entire categories of risk from a typical "AI for data" tool.
        </p>

        <div className="nv-arch-notes">
          <div className="nv-note">
            <span className="nv-note-num">No DataScrub servers</span>
            <p>The project has no backend. The whole application is a set of static files (HTML/CSS/JS) — open them in any modern browser. There&apos;s nothing to log, nothing to breach.</p>
          </div>
          <div className="nv-note">
            <span className="nv-note-num">No telemetry</span>
            <p>No analytics, no error reporting, no usage pings. The team has zero visibility into who runs it or what data they clean.</p>
          </div>
          <div className="nv-note">
            <span className="nv-note-num">API keys stay local</span>
            <p>When Cloud mode is enabled, the user&apos;s OpenAI/Groq/OpenRouter key lives in <code className="nv-code">localStorage</code> only. Requests originate from the user&apos;s browser directly to the provider — DataScrub is not a man-in-the-middle.</p>
          </div>
        </div>
      </section>

      {/* ── 03 What the agent does ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          03 / What the <em>agent</em> does.
        </h2>
        <p className="aegis-lead">
          Rule-based automation handles the boring 80% (whitespace, NULL/N/A/None standardisation, exact duplicates, IQR outliers). The AI layer handles the judgment calls.
        </p>

        <ol className="nv-pipeline">
          <li>
            <span className="nv-step">01</span>
            <div>
              <b>Profile</b>
              <p>The agent inspects each column — type inference, distribution, missingness rate, suspected role (key / numeric / categorical / freeform). Output is a one-page summary, not a table dump.</p>
            </div>
          </li>
          <li>
            <span className="nv-step">02</span>
            <div>
              <b>Suggest imputations</b>
              <p>Per-column: mean / median / mode / "leave as null" / "drop the row" — with statistical justification per choice. Users can supply domain context (<em>"this is healthcare data, prefer median for age"</em>) so suggestions align with the actual problem.</p>
            </div>
          </li>
          <li>
            <span className="nv-step">03</span>
            <div>
              <b>Flag outliers</b>
              <p>IQR-based detection with cap or remove options. The agent annotates each flagged row with a reason rather than a binary outlier tag.</p>
            </div>
          </li>
          <li>
            <span className="nv-step">04</span>
            <div>
              <b>Natural-language queries</b>
              <p>"How many rows have invalid postcodes?" "Show me the 10 worst missingness columns." The agent translates these into operations on the dataset and returns the result inline.</p>
            </div>
          </li>
        </ol>
      </section>

      {/* ── 04 Get Ollama running ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          04 / Local <em>setup</em>.
        </h2>
        <p className="aegis-lead">
          Local mode needs Ollama running on the same machine. The connection is browser → <code className="nv-code">localhost:11434</code>, which means a one-time CORS configuration step.
        </p>

        <pre className="nv-arch-diagram nv-fs-tree" aria-label="Ollama setup steps">
{`# 1. Install Ollama from https://ollama.com

# 2. Pull a model
ollama pull qwen2.5:7b

# 3. Start the server with CORS open for the DataScrub page
OLLAMA_ORIGINS="*" ollama serve

# 4. In DataScrub settings, select "Ollama" and point at
#    http://localhost:11434

# Done — no data leaves your machine from this point on.`}
        </pre>
      </section>

      {/* ── Final CTA ── */}
      <section className="aegis-section wrap nv-final">
        <h2 className="aegis-h2">
          Try <em>it</em>.
        </h2>
        <p className="aegis-lead">
          MIT licensed. Open the index.html locally, or fork and host on any static-page provider (GitHub Pages, Cloudflare Pages, Netlify).
        </p>
        <div className="nv-cta-row nv-cta-final">
          <a
            href="https://github.com/sirdath/DataScrub"
            target="_blank"
            rel="noopener noreferrer"
            className="nv-cta-primary"
          >
            github.com/sirdath/DataScrub ↗
          </a>
        </div>
      </section>
    </CaseStudyShell>
  );
}
