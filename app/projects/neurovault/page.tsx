import Link from "next/link";
import "../../redesign.css";
import "../aegis/aegis.css";
import "./neurovault.css";

export const metadata = {
  title: "NeuroVault — Local-first memory for AI · Dimitris Athinaios",
  description:
    "A Tauri desktop app that gives Claude (and any MCP-compatible agent) persistent memory across conversations. Markdown vault + hybrid retrieval, 9.3 MB installer, runs entirely on your machine.",
};

export default function NeuroVaultPage() {
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
          <a
            href="https://neurovault.dathproject.com"
            target="_blank"
            rel="noopener noreferrer"
            className="aegis-back nv-live"
          >
            Live site ↗
          </a>
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
          <div>
            <span className="eyebrow">
              <span className="bar" />
              <b>Case study</b>
              <span>AI · Local-first memory</span>
            </span>
            <h1 className="section-title aegis-title">
              Neuro<em>Vault</em>.
            </h1>
            <p className="aegis-tagline">
              A <em>persistent, local-first</em> memory layer for AI agents. Sits between your local markdown vault and any MCP-compatible agent (Claude Code, Claude Desktop, Cursor, Codex) — giving them a callable <code className="nv-code">recall()</code> + <code className="nv-code">remember()</code> surface that persists forever, with no cloud, no subscription, no Python sidecar.
            </p>
          </div>

          <div className="aegis-stats nv-stats">
            <div><b>9.3 MB</b><span>Installer</span></div>
            <div><b>~35 MB</b><span>Idle RAM</span></div>
            <div><b>&lt;500ms</b><span>Cold start</span></div>
            <div><b>86.67%</b><span>hit@1 default</span></div>
            <div><b>93.33%</b><span>hit@1 + reranker</span></div>
            <div><b>20-50ms</b><span>Recall latency</span></div>
          </div>

          <div className="aegis-stack">
            <span className="stack-label">/ Stack</span>
            <div className="stack-chips">
              <span className="chip">Tauri 2</span>
              <span className="chip">Rust</span>
              <span className="chip">React 19</span>
              <span className="chip">TypeScript</span>
              <span className="chip">SQLite + sqlite-vec</span>
              <span className="chip">fastembed (BGE-small)</span>
              <span className="chip">Axum HTTP</span>
              <span className="chip">MCP</span>
              <span className="chip">FastMCP proxy</span>
            </div>
          </div>

          <div className="nv-cta-row">
            <a
              href="https://neurovault.dathproject.com"
              target="_blank"
              rel="noopener noreferrer"
              className="nv-cta-primary"
            >
              Open neurovault.dathproject.com ↗
            </a>
            <a
              href="https://github.com/sirdath/NeuroVault"
              target="_blank"
              rel="noopener noreferrer"
              className="nv-cta-secondary"
            >
              View source on GitHub →
            </a>
          </div>
        </header>

        {/* ── What it is / isn't ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            01 / What it <em>is</em>.
          </h2>
          <p className="aegis-lead">
            Modern chat assistants have no native long-term memory. Every new session starts from zero. NeuroVault fixes that — without sending anything to a cloud service.
          </p>

          <div className="nv-two-col">
            <div className="nv-col">
              <h3 className="nv-h3">It is</h3>
              <ul className="nv-list">
                <li>A single ~9 MB binary you install once.</li>
                <li>A local markdown vault that <em>is</em> the source of truth (rebuildable from disk).</li>
                <li>An MCP server agents can call to remember and recall — over loopback HTTP.</li>
                <li>An in-process Rust retriever: hybrid semantic + BM25 + graph with optional cross-encoder rerank.</li>
              </ul>
            </div>
            <div className="nv-col">
              <h3 className="nv-h3">It is not</h3>
              <ul className="nv-list nv-list-neg">
                <li>A cloud RAG service. Everything runs on your machine.</li>
                <li>A general-purpose vector DB. It's a memory system for markdown + typed metadata.</li>
                <li>Trying to beat academic benchmarks. It optimises for <em>single user, many agents, no cost per ingest, under 100 ms per recall</em>.</li>
                <li>A Python app. The whole hot path lives in Rust in-process.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Architecture ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            02 / <em>Architecture</em>.
          </h2>
          <p className="aegis-lead">
            One process. The React UI talks to the Rust memory layer via Tauri IPC; external agents talk to the same memory layer over loopback HTTP via a thin FastMCP proxy. The single most important architectural choice: <em>the heavy stuff never runs in the agent's process tree</em>.
          </p>

          <pre className="nv-arch-diagram" aria-label="Architecture diagram">
{`┌─────────────────────────────────────────────────────────────────────┐
│  NeuroVault.exe  (Tauri, single process, ~35 MB idle)               │
│                                                                     │
│  ┌──────────────────┐       ┌──────────────────────────────────────┐│
│  │ React UI         │◄─────►│ Rust memory::* modules (in-process)  ││
│  │  • sidebar       │ Tauri │  • retriever (hybrid + rerank)       ││
│  │  • editor        │  IPC  │  • ingest (chunk/embed/link/BM25)    ││
│  │  • graph view    │       │  • file watcher (notify crate)       ││
│  │  • command palt. │       │  • SQLite + sqlite-vec               ││
│  │  • settings      │       │  • fastembed (BGE-small + rerank)    ││
│  └──────────────────┘       └───┬──────────────────────────────────┘│
│                                 │                                   │
│                             axum HTTP server (127.0.0.1:8765)       │
└─────────────────────────────────┼───────────────────────────────────┘
                                  │ loopback HTTP
                  ┌───────────────┴────────────────┐
                  │  mcp_proxy.py  (~30–50 MB)     │
                  │   FastMCP stdio → HTTP shim    │
                  └───────────────┬────────────────┘
                                  │ stdio JSON-RPC
                                  ▼
                  ┌────────────────────────────────┐
                  │ Claude Code · Cursor · Desktop │
                  └────────────────────────────────┘`}
          </pre>

          <div className="nv-arch-notes">
            <div className="nv-note">
              <span className="nv-note-num">Why Tauri, not Electron</span>
              <p>WebView2 is already on Windows — no shipping a second browser. Installer drops from 150 MB to 9.</p>
            </div>
            <div className="nv-note">
              <span className="nv-note-num">Why one process, not two</span>
              <p>Python had two: desktop + sidecar. Two fastembed loads, two SQLite connections, two sources of truth. The Rust version collapses them — memory runs inside the Tauri process.</p>
            </div>
            <div className="nv-note">
              <span className="nv-note-num">Why HTTP for agents</span>
              <p>UI hits memory via Tauri IPC; agents hit memory via loopback HTTP. Both call the same <code className="nv-code">hybrid_retrieve_throttled</code>. One implementation, two transports.</p>
            </div>
          </div>
        </section>

        {/* ── How recall works ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            03 / How recall <em>works</em>.
          </h2>
          <p className="aegis-lead">
            A retrieval query runs through three signal sources fused into one ranked list. Optionally a cross-encoder reranks the top-K for precision-critical paths.
          </p>

          <ol className="nv-pipeline">
            <li>
              <span className="nv-step">01</span>
              <div>
                <b>Semantic recall (BGE-small + sqlite-vec)</b>
                <p>Query is embedded with title-prefixed context, scored against the chunk vector index. Returns top 30.</p>
              </div>
            </li>
            <li>
              <span className="nv-step">02</span>
              <div>
                <b>BM25 keyword recall</b>
                <p>Independent lexical index over chunks catches exact-token matches the semantic index misses (rare names, code symbols, IDs).</p>
              </div>
            </li>
            <li>
              <span className="nv-step">03</span>
              <div>
                <b>Graph traversal</b>
                <p>Typed edges (semantic similarity / entity mention / wikilink) propagate scores between linked engrams — surfaces context the query didn't ask for but needs.</p>
              </div>
            </li>
            <li>
              <span className="nv-step">04</span>
              <div>
                <b>Fusion + optional rerank</b>
                <p>Reciprocal-rank-fusion produces a single ranking. Cross-encoder rerank is opt-in: <code className="nv-code">~680 ms</code> total instead of <code className="nv-code">25 ms</code>, but boosts hit@1 from 86.67% → 93.33%.</p>
              </div>
            </li>
          </ol>
        </section>

        {/* ── Screenshots ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            04 / Inside the <em>app</em>.
          </h2>
          <p className="aegis-lead">
            The UI is built around three primary surfaces: the markdown editor (boring on purpose), the command palette (where agents&apos; memory operations show up), and the knowledge graph (the only place the hidden links between notes become visible).
          </p>

          <figure className="aegis-arch-feature">
            <div className="aegis-frame">
              <img src="/redesign/neurovault/neural-graph.webp" alt="NeuroVault knowledge graph" loading="lazy" />
            </div>
            <figcaption>
              <b>Knowledge graph view</b>
              <span>Engrams are nodes; typed edges connect them by semantic similarity, shared entities, and explicit wikilinks. Clicking a node opens the underlying markdown.</span>
            </figcaption>
          </figure>

          <figure className="aegis-arch-feature">
            <div className="aegis-frame">
              <img src="/redesign/neurovault/command-palette.webp" alt="NeuroVault command palette" loading="lazy" />
            </div>
            <figcaption>
              <b>Command palette</b>
              <span>One keyboard shortcut to everything — note operations, recall, brain switching, and the same surface agents use through MCP.</span>
            </figcaption>
          </figure>
        </section>

        {/* ── On-disk shape ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            05 / On <em>disk</em>.
          </h2>
          <p className="aegis-lead">
            Everything persists under <code className="nv-code">~/.neurovault/</code>. Markdown files are the source of truth — if <code className="nv-code">brain.db</code> is ever deleted, it&apos;s rebuilt deterministically by re-ingesting every <code className="nv-code">.md</code> in the vault. This is a hard invariant: no memory exists only in the database.
          </p>

          <pre className="nv-arch-diagram nv-fs-tree" aria-label="Filesystem layout">
{`~/.neurovault/
├── brains.json                     ← which brain is active
├── extensions/
│   └── vec0.dll                    ← sqlite-vec binary
└── brains/
    └── <brain_id>/
        ├── brain.db                ← SQLite: 24 tables (engrams,
        │                              chunks, vec_chunks, entities,
        │                              links, temporal_facts, …)
        ├── audit.jsonl             ← append-only tool-call log
        ├── trash/                  ← soft-deleted files
        └── vault/
            ├── *.md                ← markdown (source of truth)
            ├── index.md            ← auto-maintained wiki index
            └── log.md              ← append-only activity feed`}
          </pre>
        </section>

        {/* ── Final CTA ── */}
        <section className="aegis-section wrap nv-final">
          <h2 className="aegis-h2">
            Try <em>it</em>.
          </h2>
          <p className="aegis-lead">
            The full marketing site, downloads, and docs live at neurovault.dathproject.com. The source — Rust + React + Tauri, MIT licensed — is on GitHub.
          </p>
          <div className="nv-cta-row nv-cta-final">
            <a
              href="https://neurovault.dathproject.com"
              target="_blank"
              rel="noopener noreferrer"
              className="nv-cta-primary"
            >
              neurovault.dathproject.com ↗
            </a>
            <a
              href="https://github.com/sirdath/NeuroVault"
              target="_blank"
              rel="noopener noreferrer"
              className="nv-cta-secondary"
            >
              github.com/sirdath/NeuroVault →
            </a>
          </div>
        </section>

        <footer className="aegis-foot wrap">
          <Link href="/" className="aegis-home">← dathproject.com</Link>
          <span>© Dimitris Athinaios · NeuroVault case study</span>
        </footer>
      </article>
    </div>
  );
}
