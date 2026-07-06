/**
 * Section 01 — Selected work. 3 featured projects in alternating
 * left/right rows + a 5-project index grid below.
 */
export function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">
            <span className="bar" />
            <b>01</b>
            <span>Selected work · 11 total</span>
          </span>
          <h2 className="section-title">
            Things <em>built</em>.
          </h2>
        </div>

        <div className="work-featured">
          <article className="work-row reveal">
            <div className="work-media">
              <div className="safari-frame">
                <div className="chrome">
                  <span className="dot r" /><span className="dot y" /><span className="dot g" />
                  <span className="url">neurovault.dathproject.com</span>
                </div>
                <div className="canvas dark">
                  <img src="/redesign/screenshots/neurovault.webp" alt="NeuroVault neural graph view" />
                </div>
              </div>
            </div>
            <div className="work-copy">
              <span className="work-num">/ 01 — AI · Local-first memory</span>
              <h3 className="work-name">Neuro<em>Vault</em>.</h3>
              <p className="work-sub">
                A Tauri desktop app that gives Claude persistent memory across conversations. Markdown vault, knowledge graph, hybrid retrieval — outperforms RAG at 96% hit@3, ~275 tokens/answer, and runs entirely on your machine.
              </p>
              <div className="work-tags">
                <span>Tauri 2</span><span>React 19</span><span>Rust</span><span>SQLite + vec0</span><span>MCP</span>
              </div>
              <a className="work-cta" href="/projects/neurovault">View case study</a>
            </div>
          </article>

          <article className="work-row right reveal">
            <div className="work-copy">
              <span className="work-num">/ 02 — AI · Maritime intelligence</span>
              <h3 className="work-name">AE<em>GIS</em>.</h3>
              <p className="work-sub">
                Maritime shipping risk platform aggregating 7+ sources across 4 database technologies. LLM-powered CrewAI agents for risk, route planning, and trade compliance — with W3C PROV lineage and hallucination checking.
              </p>
              <div className="work-tags">
                <span>FastAPI</span><span>CrewAI</span><span>PostGIS</span><span>Neo4j</span><span>ChromaDB</span><span>deck.gl</span>
              </div>
              <a className="work-cta" href="/projects/aegis">View case study</a>
            </div>
            <div className="work-media">
              <div className="safari-frame">
                <div className="chrome">
                  <span className="dot r" /><span className="dot y" /><span className="dot g" />
                  <span className="url">aegis.dathproject.com</span>
                </div>
                <div className="canvas dark">
                  <img src="/redesign/aegis/Dashboard.webp" alt="AEGIS dashboard" />
                </div>
              </div>
            </div>
          </article>

          <article className="work-row reveal">
            <div className="work-media">
              <div className="safari-frame">
                <div className="chrome">
                  <span className="dot r" /><span className="dot y" /><span className="dot g" />
                  <span className="url">geospatialondon.dathproject.com</span>
                </div>
                <div className="canvas dark">
                  <img src="/redesign/london-synergy/hero.webp" alt="London Synergy Index dashboard" />
                </div>
              </div>
            </div>
            <div className="work-copy">
              <span className="work-num">/ 03 — Geospatial · ML</span>
              <h3 className="work-name">London <em>Synergy</em>.</h3>
              <p className="work-sub">
                Pipeline tessellating Greater London into 55,000 H3 hexagons — LandScan rasters, ONS Census, OSM POIs enriched with graph-centrality. Spatially cross-validated XGBoost; Burt&apos;s Structural Hole Theory applied to retail siting.
              </p>
              <div className="work-tags">
                <span>Python</span><span>XGBoost</span><span>H3</span><span>NetworkX</span><span>Pydeck</span><span>Streamlit</span>
              </div>
              <a className="work-cta" href="/projects/london-synergy-index">
                View case study
              </a>
            </div>
          </article>

          <article className="work-row right reveal">
            <div className="work-copy">
              <span className="work-num">/ 04 — AI · Cascading risk intelligence</span>
              <h3 className="work-name">Risk<em>Terrain</em>.</h3>
              <p className="work-sub">
                A 6-node LangGraph pipeline that ingests live geopolitical events (USGS, NewsAPI), traverses a 154-company supply-chain graph in SurrealDB, and scores cascading exposure in under 8 seconds. Hybrid graph-vector retrieval with sentence-transformer embeddings.
              </p>
              <div className="work-tags">
                <span>Python</span><span>LangGraph</span><span>SurrealDB</span><span>sentence-transformers</span><span>Three.js</span><span>Docker</span>
              </div>
              <a className="work-cta" href="/projects/risk-terrain">View case study</a>
            </div>
            <div className="work-media">
              <div className="safari-frame">
                <div className="chrome">
                  <span className="dot r" /><span className="dot y" /><span className="dot g" />
                  <span className="url">riskterrain.dathproject.com</span>
                </div>
                <div className="canvas dark">
                  <img src="/redesign/risk-terrain/hero.webp" alt="RiskTerrain — TSMC critical-event view" />
                </div>
              </div>
            </div>
          </article>
          <article className="work-row reveal">
            <div className="work-media">
              <div className="safari-frame">
                <div className="chrome">
                  <span className="dot r" /><span className="dot y" /><span className="dot g" />
                  <span className="url">ds2 · internal workspace</span>
                </div>
                <div className="canvas dark">
                  <img src="/redesign/ds2-admin/copilot-conversation-dark.webp" alt="DS2 workspace — agentic copilot mid-action" />
                </div>
              </div>
            </div>
            <div className="work-copy">
              <span className="work-num">/ 05 — Full-stack · Agentic internal tooling</span>
              <h3 className="work-name">DS2 <em>Workspace</em>.</h3>
              <p className="work-sub">
                The private operating system for a two-founder digital-solutions consultancy. An agentic copilot with model routing and a confirm-gate, six owned AI micro-engines, and a full pipeline / leads / content workspace — one authenticated Next.js app, fully themed light and dark.
              </p>
              <div className="work-tags">
                <span>Next.js 15</span><span>React 19</span><span>Supabase</span><span>Anthropic SDK</span><span>Turborepo</span>
              </div>
              <a className="work-cta" href="/projects/ds2-admin">View case study</a>
            </div>
          </article>
          <article className="work-row right reveal">
            <div className="work-copy">
              <span className="work-num">/ 06 — AI · Learning · Web + mobile</span>
              <h3 className="work-name">Node<em>book</em>.</h3>
              <p className="work-sub">
                An on-demand knowledge compiler. Hand it a topic, a link or a question and it compiles a beautiful, cited book — chapters, math, diagrams — then wraps it in a spaced-recall loop so you actually keep it. Next.js 15 web plus an Expo iOS/Android app on Supabase.
              </p>
              <div className="work-tags">
                <span>Next.js 15</span><span>Expo</span><span>Supabase</span><span>KaTeX</span><span>Gemini</span>
              </div>
              <a className="work-cta" href="/projects/nodebook">View case study</a>
            </div>
            <div className="work-media">
              <div className="safari-frame">
                <div className="chrome">
                  <span className="dot r" /><span className="dot y" /><span className="dot g" />
                  <span className="url">node-book.app</span>
                </div>
                <div className="canvas dark">
                  <img src="/redesign/nodebook/hero.webp" alt="Nodebook — learn anything and keep it" />
                </div>
              </div>
            </div>
          </article>
          <article className="work-row reveal">
            <div className="work-media">
              <div className="safari-frame">
                <div className="chrome">
                  <span className="dot r" /><span className="dot y" /><span className="dot g" />
                  <span className="url">DreamBug · storybook app</span>
                </div>
                <div className="canvas dark">
                  <img src="/redesign/dreambug/story-bramwyn-1.webp" alt="DreamBug — an illustrated storybook page" />
                </div>
              </div>
            </div>
            <div className="work-copy">
              <span className="work-num">/ 07 — Mobile · Generative art · Coming soon</span>
              <h3 className="work-name">Dream<em>Bug</em>.</h3>
              <p className="work-sub">
                A personalized children&apos;s storybook app. Parents pick a hero; DreamBug assembles illustrated, age-appropriate books on-demand with a coherent cast and world on every page — from a local, cost-free art pipeline instead of a live paid image API.
              </p>
              <div className="work-tags">
                <span>Expo</span><span>React Native</span><span>Supabase</span><span>Rive</span><span>SDXL · ComfyUI</span>
              </div>
              <a className="work-cta" href="/projects/dreambug" style={{ opacity: 0.72 }}>Coming soon</a>
            </div>
          </article>
        </div>

        <div className="work-index-head reveal">
          <h3>
            Index <em style={{ color: "var(--ink-3)", fontStyle: "normal", fontWeight: 400 }}>· 04 more</em>
          </h3>
          <span
            className="work-num"
            style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--ink-3)" }}
          >
            / all open in case studies
          </span>
        </div>

        <div className="grid-rest grid-rest-2x2">
          <a className="grid-card reveal" href="/projects/housing-crime-analysis">
            <div className="gc-media"><img src="/redesign/housing-crime/hero.webp" alt="London Housing & Crime — opportunity index map" /></div>
            <div className="gc-body">
              <span className="gc-num">/ 08 · Geospatial</span>
              <h4 className="gc-title">London Housing & Crime</h4>
              <p className="gc-sub">Spatio-temporal pipeline merging 1M+ records into a predictive Opportunity Index. XGBoost regressor tuned via Optuna, R² = 0.92.</p>
              <div className="gc-tags">Python · Optuna · XGBoost · Pandas</div>
            </div>
          </a>
          <a className="grid-card reveal" href="/projects/datascrub">
            <div className="gc-media"><img src="/redesign/datascrub/hero.webp" alt="DataScrub" /></div>
            <div className="gc-body">
              <span className="gc-num">/ 09 · AI · Privacy</span>
              <h4 className="gc-title">DataScrub</h4>
              <p className="gc-sub">Privacy-first browser-based data cleaning agent. Rule-based + LLM, optional local Ollama inference, no backend.</p>
              <div className="gc-tags">Vanilla JS · Ollama · PapaParse</div>
            </div>
          </a>
          <a className="grid-card reveal" href="/projects/dataportfolio">
            <div className="gc-media"><img src="/redesign/dataportfolio/hero.webp" alt="Dataportfolio.co.uk — Your CV is a dataset" /></div>
            <div className="gc-body">
              <span className="gc-num">/ 10 · Full-stack</span>
              <h4 className="gc-title">Dataportfolio.co.uk</h4>
              <p className="gc-sub">Production SaaS that automates portfolio creation for data professionals — no-code GUI, dynamic metadata.</p>
              <div className="gc-tags">Next.js · Node.js · PostgreSQL</div>
            </div>
          </a>
          <a className="grid-card reveal" href="/projects/data-engineering-pipeline">
            <div className="gc-media"><img src="/redesign/data-engineering/hero.webp" alt="Data Engineering Pipeline — star schema lakehouse" /></div>
            <div className="gc-body">
              <span className="gc-num">/ 11 · Data Engineering</span>
              <h4 className="gc-title">Data Engineering Pipeline</h4>
              <p className="gc-sub">Star Schema lakehouse unifying NoSQL + CSV. Pandas to flatten nested JSON; Parquet + DuckDB for SQL aggregation.</p>
              <div className="gc-tags">PySpark · MongoDB · DuckDB · Parquet</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
