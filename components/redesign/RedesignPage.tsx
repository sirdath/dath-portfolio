"use client";

import { useEffect } from "react";
import { RedesignCursor } from "./RedesignCursor";

/**
 * 2026 portfolio redesign — faithful port of the static index.html in
 * D:\Downloads\DATHPROJECT.COM\. The CSS lives in app/redesign.css; the
 * scroll-driven hero animation lives in this component's useEffect.
 *
 * Hero is 360vh tall with a sticky stage; the scroll listener computes a
 * dozen CSS variables on every frame to drive: brand-glyph alignment,
 * per-letter reveal/erasure, side-info ramp-in, logo fly-to-navbar.
 */
export function RedesignPage() {
  useEffect(() => {
    // Reveal grid-bg
    requestAnimationFrame(() => {
      document.querySelector(".grid-bg")?.classList.add("in");
    });

    // Scroll-driven hero variables
    const hero = document.querySelector(".hero") as HTMLElement | null;
    const stage = document.getElementById("stage");
    const dExt = Array.from(document.querySelectorAll(".row-d .L.ext")) as HTMLElement[];
    const aExt = Array.from(document.querySelectorAll(".row-a .L.ext")) as HTMLElement[];

    const clamp = (v: number, a: number, b: number) =>
      Math.max(a, Math.min(b, v));
    const smooth = (a: number, b: number, x: number) => {
      const t = clamp((x - a) / (b - a), 0, 1);
      return t * t * (3 - 2 * t);
    };

    const update = () => {
      if (!hero || !stage) return;
      const rect = hero.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const p = clamp(scrolled / total, 0, 1);

      const s = (a: number, b: number) => smooth(a, b, p);
      const pAlignFwd = 1 - s(0.04, 0.22);
      const pRevD_f = s(0.18, 0.4);
      const pRevA_f = s(0.42, 0.66);

      const collapse = s(0.78, 0.92);
      const pAlignRev = s(0.84, 0.95);
      const pAlign = Math.max(pAlignFwd, pAlignRev);

      const pType = Math.min(s(0.02, 0.16), 1 - s(0.96, 1.0));
      const pLogoOut = 1 - s(0.02, 0.16);
      const pLogoIn = s(0.93, 0.99);
      const pLogo = Math.max(pLogoOut, pLogoIn);

      const winR = clamp((p - 0.9) / 0.04, 0, 1);
      const logoScale = 1 + 0.1 * (1 - pLogoIn) * winR;
      const logoBlur = 6 * (1 - pLogoIn) * winR;
      const logoGlow = winR * (1 - pLogoIn);

      const stagger = 0.13;
      const ramp = 0.2;
      for (let i = 0; i < aExt.length; i++) {
        const t = clamp((collapse - i * stagger) / ramp, 0, 1);
        aExt[i].style.setProperty(
          "--lt-rev",
          (pRevA_f * (1 - t)).toFixed(3),
        );
      }
      for (let i = 0; i < dExt.length; i++) {
        const idx = dExt.length - 1 - i;
        const t = clamp((collapse - idx * stagger) / ramp, 0, 1);
        dExt[i].style.setProperty(
          "--lt-rev",
          (pRevD_f * (1 - t)).toFixed(3),
        );
      }

      const pFin = s(0.62, 0.74);

      stage.style.setProperty("--p", String(p));
      stage.style.setProperty("--p-logo", String(pLogo));
      stage.style.setProperty("--p-align", String(pAlign));
      stage.style.setProperty("--p-fin", String(pFin));
      stage.style.setProperty("--p-type", String(pType));
      stage.style.setProperty("--logo-scale", String(logoScale));
      stage.style.setProperty("--logo-blur", logoBlur.toFixed(2) + "px");
      stage.style.setProperty(
        "--logo-glow",
        Math.max(0, logoGlow).toFixed(3),
      );

      // Fly the logo to the navbar position past the hero
      const heroBottomY = hero.offsetTop + hero.offsetHeight - window.innerHeight;
      const flySpan = window.innerHeight * 0.7;
      const flyP = clamp(
        (window.scrollY - heroBottomY) / flySpan,
        0,
        1,
      );
      const logoWnow = Math.max(300, Math.min(0.34 * window.innerWidth, 480));
      const targetCompositeW = 152;
      const targetCenterX = 40 + targetCompositeW / 2;
      const targetCenterY = 28;
      const flyTx = (targetCenterX - window.innerWidth / 2) * flyP;
      const flyTy = (targetCenterY - window.innerHeight / 2) * flyP;
      const flyScale =
        1 + (targetCompositeW / logoWnow - 1) * flyP;

      stage.style.setProperty("--fly-tx", flyTx.toFixed(1) + "px");
      stage.style.setProperty("--fly-ty", flyTy.toFixed(1) + "px");
      stage.style.setProperty("--fly-scale", flyScale.toFixed(4));
      stage.style.setProperty("--fly-p", flyP.toFixed(3));
      stage.style.setProperty(
        "--fly-p-gt-half",
        flyP > 0.55 ? "auto" : "none",
      );

      const navBrand = document.getElementById("navBrand");
      if (navBrand) {
        const navBrandOp = clamp((flyP - 0.94) / 0.06, 0, 1);
        navBrand.style.setProperty("--nav-brand-op", navBrandOp.toFixed(3));
        navBrand.style.setProperty(
          "--nav-brand-pe",
          navBrandOp > 0.5 ? "auto" : "none",
        );
      }

      if (flyP > 0.02) stage.style.setProperty("--p-logo", "1");
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    // Reveal observer
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((el) => revealObs.observe(el));

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      revealObs.disconnect();
    };
  }, []);

  return (
    <>
      <RedesignCursor />
      <div className="grid-bg" aria-hidden="true" />

      <nav className="nav">
        <div className="nav-left">
          <a className="nav-brand" id="navBrand" href="#top" aria-label="DATHPROJECT — back to top">
            <img src="/redesign/dath-logo.png" alt="DATH brand mark" />
          </a>
          <span className="nav-loc">London · UK</span>
        </div>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#trajectory">Trajectory</a>
          </div>
          <a className="status-pill nav-status" href="#contact">
            <span className="dot" aria-hidden="true" />
            <span className="lbl">Available</span>
            <span className="when">Aug 15, 2026</span>
            <span className="arr" aria-hidden="true">→</span>
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="stage" id="stage">
          <a className="dath-logo" href="#top" id="brandLink" aria-label="DATHPROJECT — back to top">
            <img src="/redesign/dath-logo.png" alt="DATH brand mark" />
            <span className="caption">
              D<b>imitris</b> · A<b>thinaios</b>
            </span>
          </a>

          <h1 className="hname" aria-label="Dimitris Athinaios">
            <span className="row row-d">
              <img className="brand-glyph brand-d" src="/redesign/brand-d.png" alt="D" />
              <span className="L ext">i</span>
              <span className="L ext">m</span>
              <span className="L ext">i</span>
              <span className="L ext">t</span>
              <span className="L ext">r</span>
              <span className="L ext">i</span>
              <span className="L ext">s</span>
            </span>
            <span className="row row-a">
              <img className="brand-glyph brand-ath" src="/redesign/brand-ath.png" alt="Ath" />
              <span className="L ext">i</span>
              <span className="L ext">n</span>
              <span className="L ext ai">a</span>
              <span className="L ext ai">i</span>
              <span className="L ext">o</span>
              <span className="L ext">s</span>
            </span>
          </h1>

          <aside className="side left" aria-hidden="true">
            <span className="lbl">Dimitris Athinaios</span>
            <span>Data Scientist · AI Engineer</span>
            <p className="role">
              Building <em>intelligent systems</em> — geospatial pipelines, multi-agent platforms, full-stack ML.
            </p>
          </aside>

          <aside className="side right" aria-hidden="true">
            <span className="lbl">Etymology</span>
            <div className="key"><span>Athens · Origin</span><b>Ath</b></div>
            <div className="key"><span>Inside · Domain</span><b>In</b></div>
            <div className="key"><span>Intelligence</span><b className="ai-key">Ai</b></div>
            <div className="key"><span>Operating System</span><b>Os</b></div>
          </aside>

          <div className="scroll-cue">
            <span className="line" />
          </div>
        </div>
      </section>

      <main className="post">
        {/* ── 01 WORK ── */}
        <section className="section" id="work">
          <div className="wrap">
            <div className="reveal">
              <span className="eyebrow">
                <span className="bar" />
                <b>01</b>
                <span>Selected work · 08 total</span>
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
                      <img src="/images/projects/heroes/neurovault-hero.svg" alt="NeuroVault interface" />
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
                  <a className="work-cta" href="https://github.com/sirdath/NeuroVault" target="_blank" rel="noopener noreferrer">
                    View case study
                  </a>
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
                      <img src="/images/projects/heroes/aegis-hero.svg" alt="AEGIS dashboard" />
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
                      <img src="/images/projects/heroes/london-synergy-hero.svg" alt="London Synergy Index" />
                    </div>
                  </div>
                </div>
                <div className="work-copy">
                  <span className="work-num">/ 03 — Geospatial · ML</span>
                  <h3 className="work-name">London <em>Synergy</em>.</h3>
                  <p className="work-sub">
                    Pipeline tessellating Greater London into 55,000 H3 hexagons — LandScan rasters, ONS Census, OSM POIs enriched with graph-centrality. Spatially cross-validated XGBoost; Burt's Structural Hole Theory applied to retail siting.
                  </p>
                  <div className="work-tags">
                    <span>Python</span><span>XGBoost</span><span>H3</span><span>NetworkX</span><span>Pydeck</span><span>Streamlit</span>
                  </div>
                  <a className="work-cta" href="https://geospatialondon.dathproject.com" target="_blank" rel="noopener noreferrer">
                    Open live site
                  </a>
                </div>
              </article>
            </div>

            <div className="work-index-head reveal">
              <h3>
                Index <em style={{ color: "var(--ink-3)", fontStyle: "normal", fontWeight: 400 }}>· 05 more</em>
              </h3>
              <span className="work-num" style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--ink-3)" }}>
                / all open in case studies
              </span>
            </div>

            <div className="grid-rest">
              <a className="grid-card reveal" href="/projects/housing-crime-analysis">
                <div className="gc-media"><img src="/images/projects/heroes/housing-crime-hero.svg" alt="London Housing & Crime" /></div>
                <div className="gc-body">
                  <span className="gc-num">/ 04 · Geospatial</span>
                  <h4 className="gc-title">London Housing & Crime</h4>
                  <p className="gc-sub">Spatio-temporal pipeline merging 1M+ records into a predictive Opportunity Index. XGBoost regressor tuned via Optuna, R² = 0.92.</p>
                  <div className="gc-tags">Python · Optuna · XGBoost · Pandas</div>
                </div>
              </a>
              <a className="grid-card reveal" href="/projects/risk-terrain">
                <div className="gc-media"><img src="/images/projects/heroes/risk-terrain-hero.svg" alt="RiskTerrain" /></div>
                <div className="gc-body">
                  <span className="gc-num">/ 05 · AI · Risk</span>
                  <h4 className="gc-title">RiskTerrain</h4>
                  <p className="gc-sub">6-node LangGraph pipeline scoring cascading risk across S&P 500 supply chains in SurrealDB. Sub-8-second end-to-end.</p>
                  <div className="gc-tags">LangGraph · SurrealDB · Three.js</div>
                </div>
              </a>
              <a className="grid-card reveal" href="/projects/datascrub">
                <div className="gc-media"><img src="/images/projects/heroes/datascrub-hero.svg" alt="DataScrub" /></div>
                <div className="gc-body">
                  <span className="gc-num">/ 06 · AI · Privacy</span>
                  <h4 className="gc-title">DataScrub</h4>
                  <p className="gc-sub">Privacy-first browser-based data cleaning agent. Rule-based + LLM, optional local Ollama inference, no backend.</p>
                  <div className="gc-tags">Vanilla JS · Ollama · PapaParse</div>
                </div>
              </a>
              <a className="grid-card reveal" href="/projects/dataportfolio">
                <div className="gc-media"><img src="/images/projects/heroes/dataportfolio-hero.svg" alt="Dataportfolio.co.uk" /></div>
                <div className="gc-body">
                  <span className="gc-num">/ 07 · Full-stack</span>
                  <h4 className="gc-title">Dataportfolio.co.uk</h4>
                  <p className="gc-sub">Production SaaS that automates portfolio creation for data professionals — no-code GUI, dynamic metadata.</p>
                  <div className="gc-tags">Next.js · Node.js · PostgreSQL</div>
                </div>
              </a>
              <a className="grid-card reveal" href="/projects/data-engineering-pipeline">
                <div className="gc-media"><img src="/images/projects/heroes/data-engineering-hero.svg" alt="Data Engineering Pipeline" /></div>
                <div className="gc-body">
                  <span className="gc-num">/ 08 · Data Engineering</span>
                  <h4 className="gc-title">Data Engineering Pipeline</h4>
                  <p className="gc-sub">Star Schema lakehouse unifying NoSQL + CSV. Pandas to flatten nested JSON; Parquet + DuckDB for SQL aggregation.</p>
                  <div className="gc-tags">PySpark · MongoDB · DuckDB · Parquet</div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ── 02 SKILLS ── */}
        <section className="section" id="skills">
          <div className="wrap">
            <div className="reveal">
              <span className="eyebrow">
                <span className="bar" /><b>02</b><span>Toolkit · 06 clusters · live ticker</span>
              </span>
              <h2 className="section-title">The <em>stack</em>.</h2>
            </div>
          </div>
          <div className="marquee reveal" aria-label="Skills ticker">
            <div className="marquee-track">
              {[
                ["/ 01", "Languages", "Python · SQL · R · TypeScript · Rust", "Python"],
                ["/ 02", "ML & Modeling", "XGBoost · PyTorch · TensorFlow · Scikit-learn · Optuna · SHAP", "XGBoost"],
                ["/ 03", "AI & Agents", "LangChain · LangGraph · CrewAI · Ollama · MCP · sentence-transformers", "LangChain"],
                ["/ 04", "Geospatial", "H3 · Pydeck · LandScan · OSM · NetworkX · Graph centrality", "H3"],
                ["/ 05", "Data", "DuckDB · Pandas · NumPy · PySpark · MongoDB · Parquet · Star Schema", "DuckDB"],
                ["/ 06", "Cloud & Ops", "AWS · Databricks · Docker · Kubernetes · Git · MLOps", "AWS"],
              ].flatMap((item, i, arr) => [
                <span key={`a${i}`} className="m-item">
                  <span className="m-num">{item[0]}</span>
                  <span className="m-cluster">{item[1]}</span>
                  <span className="m-tools" dangerouslySetInnerHTML={{ __html: item[2].replace(item[3], `<b>${item[3]}</b>`) }} />
                </span>,
                <span key={`b${i}`} className="m-item" aria-hidden="true">
                  <span className="m-num">{item[0]}</span>
                  <span className="m-cluster">{item[1]}</span>
                  <span className="m-tools" dangerouslySetInnerHTML={{ __html: item[2].replace(item[3], `<b>${item[3]}</b>`) }} />
                </span>,
              ])}
            </div>
          </div>
        </section>

        {/* ── 03 TRAJECTORY ── */}
        <section className="section" id="trajectory">
          <div className="wrap">
            <div className="reveal">
              <span className="eyebrow">
                <span className="bar" /><b>03</b><span>Trajectory · Education & experience</span>
              </span>
              <h2 className="section-title">The <em>path</em>.</h2>
            </div>

            <div className="timeline">
              <article className="tl-row reveal">
                <span className="tl-year">2026.04 — 09</span>
                <div className="tl-spine"><span className="tl-dot" /></div>
                <div className="tl-main">
                  <div className="tl-head">
                    <h4 className="tl-role">Geospatial Data Scientist</h4>
                    <span className="tl-kind">Exp · Placement</span>
                  </div>
                  <span className="tl-org">Intelmatix · London (Dissertation)</span>
                  <p className="tl-note">Engineering a spatial network of 1M+ POIs (Python, NetworkX). Architecting serverless AWS pipelines (S3, Glue, Athena) for high-dimensional geospatial datasets at scale.</p>
                  <div className="tl-tags-inline"><span>Python</span><span>NetworkX</span><span>AWS · Glue · Athena</span></div>
                </div>
              </article>

              <article className="tl-row edu reveal">
                <span className="tl-year">2025.09 — 26.09</span>
                <div className="tl-spine"><span className="tl-dot" /></div>
                <div className="tl-main">
                  <div className="tl-head">
                    <h4 className="tl-role">MSc Business Analytics</h4>
                    <span className="tl-kind edu">Edu · MSc</span>
                  </div>
                  <span className="tl-org">UCL School of Management · London</span>
                  <p className="tl-note">Current grade: 75% — distinction track. Modules in Data Engineering (MLOps, Docker, AWS, SQL), Operational Analytics, Machine Learning, Predictive Analytics.</p>
                  <div className="tl-tags-inline"><span>MLOps</span><span>SQL</span><span>Predictive Analytics</span></div>
                </div>
              </article>

              <article className="tl-row reveal">
                <span className="tl-year">2024.05 — 08</span>
                <div className="tl-spine"><span className="tl-dot" /></div>
                <div className="tl-main">
                  <div className="tl-head">
                    <h4 className="tl-role">Data Scientist</h4>
                    <span className="tl-kind">Exp · Internship</span>
                  </div>
                  <span className="tl-org">Globassure · Athens</span>
                  <p className="tl-note">Built a data-scraping pipeline to identify potential client leads, securing 7 startup contracts for employee insurance coverage. Cleaned and processed 120,000+ records.</p>
                  <div className="tl-tags-inline"><span>Python</span><span>Pandas</span><span>EDA</span><span>Web Scraping</span></div>
                </div>
              </article>

              <article className="tl-row edu reveal">
                <span className="tl-year">2022.09 — 25.06</span>
                <div className="tl-spine"><span className="tl-dot" /></div>
                <div className="tl-main">
                  <div className="tl-head">
                    <h4 className="tl-role">BSc Business Management — Data Analytics</h4>
                    <span className="tl-kind edu">Edu · BSc</span>
                  </div>
                  <span className="tl-org">Henley Business School · University of Reading</span>
                  <p className="tl-note">First Class Honours. Modules in Data Analytics, Machine Learning, Information Systems. Co-founded the Data Analytics Society (200+ members, 2023–2025).</p>
                  <div className="tl-tags-inline"><span>First Class</span><span>Co-founder</span><span>Data Society</span></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── 04 CERTS ── */}
        <section className="section" id="certs">
          <div className="wrap">
            <div className="reveal">
              <span className="eyebrow">
                <span className="bar" /><b>04</b><span>Continuous learning · 04 certifications</span>
              </span>
              <h2 className="section-title">Foundations <em>deepened</em>.</h2>
            </div>

            <p className="lead-para reveal">
              I aim to learn something <em>new every day</em>. The tech industry moves fast — <span className="accent">especially AI</span> — and I make a habit of keeping current: papers, model releases, ship logs, and the open-source conversations between them. These certifications are <em>checkpoints, not endpoints</em>.
            </p>

            <div className="certs">
              <article className="cert reveal">
                <div>
                  <span className="cert-from">Imperial College London</span>
                  <h4 className="cert-title">Mathematics for Machine Learning</h4>
                  <p className="cert-detail">Linear algebra · Multivariate calculus · PCA</p>
                </div>
                <span className="cert-badge">Specialisation</span>
              </article>
              <article className="cert reveal">
                <div>
                  <span className="cert-from">Google</span>
                  <h4 className="cert-title">Advanced Data Analytics</h4>
                  <p className="cert-detail">Statistical methods · Regression · ML modeling</p>
                </div>
                <span className="cert-badge">Professional</span>
              </article>
              <article className="cert reveal">
                <div>
                  <span className="cert-from">Microsoft</span>
                  <h4 className="cert-title">Power BI Desktop</h4>
                  <p className="cert-detail">DAX · Power Query · Data modeling</p>
                </div>
                <span className="cert-badge">Certified</span>
              </article>
              <article className="cert reveal">
                <div>
                  <span className="cert-from">IBM</span>
                  <h4 className="cert-title">Data Analyst</h4>
                  <p className="cert-detail">Python · SQL · Tableau · IBM Cognos</p>
                </div>
                <span className="cert-badge">Professional</span>
              </article>
            </div>
          </div>
        </section>

        {/* ── 05 CONTACT ── */}
        <section className="section contact" id="contact">
          <div className="wrap">
            <div className="reveal">
              <span className="eyebrow">
                <span className="bar" /><b>05</b><span>Get in touch · Available Spring 2026</span>
              </span>
            </div>
            <a className="contact-email reveal" href="mailto:dimo.atheneos@gmail.com">
              dimo.atheneos<br />@gmail<em>.com</em>
              <span className="arr">↗</span>
            </a>

            <div className="process-note reveal">
              <span className="process-label">/ How I build</span>
              <p className="process-text">
                Heavy on <em>AI-assisted</em> and <em>spec-driven</em> development — Claude, Cursor, agents, MCP. The receipts live at <a href="https://github.com/sirdath" target="_blank" rel="noopener noreferrer">@sirdath</a>.
              </p>
            </div>

            <div className="linktree reveal">
              <a className="link-btn" href="mailto:dimo.atheneos@gmail.com" aria-label="Email">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3 7l9 7l9-7" />
                </svg>
                Email
              </a>
              <a className="link-btn" href="https://linkedin.com/in/Dimitriosath" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V21h-4V8zm7 0h3.8v1.78h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.65 4.76 6.1V21h-4v-5.85c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V21H7.5V8z" />
                </svg>
                LinkedIn
              </a>
              <a className="link-btn" href="https://github.com/sirdath" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.6 18.4.5 12 .5z" />
                </svg>
                GitHub
              </a>
              <a className="link-btn primary" href="#" aria-label="Download CV">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 3v13M6 11l6 6l6-6M4 21h16" />
                </svg>
                Download CV
              </a>
            </div>

            <div className="contact-grid reveal">
              <div className="contact-col">
                <h5>Open to · What gets me excited</h5>
                <div className="contact-item">
                  <span className="label">
                    Data <em>Science</em>
                    <span className="sub">anything in the field</span>
                  </span>
                </div>
                <div className="contact-item">
                  <span className="label">
                    AI <em>Engineering</em>
                    <span className="sub">anything in the craft</span>
                  </span>
                </div>
                <div className="contact-item">
                  <span className="label">
                    Machine <em>Learning</em>
                    <span className="sub">my personal favorite</span>
                  </span>
                  <span className="badge fav">★ Love</span>
                </div>
              </div>

              <div className="contact-col">
                <h5>Languages · Spoken & written</h5>
                <div className="contact-item">
                  <span className="label">
                    Greek<span className="sub">GR · native</span>
                  </span>
                  <span className="badge">Fluent</span>
                </div>
                <div className="contact-item">
                  <span className="label">
                    English<span className="sub">GB · C2 proficient</span>
                  </span>
                  <span className="badge">Fluent</span>
                </div>
                <div className="contact-item">
                  <span className="label">
                    Spanish<span className="sub">ES · B1 intermediate</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="site-foot">
              <span>© <b>Dimitris Athinaios</b> · 2026 · DATHPROJECT.COM</span>
              <span>Made with care · London ↔ Athens</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
