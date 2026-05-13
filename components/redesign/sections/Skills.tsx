type Cluster = [num: string, title: string, items: string, lead: string];

const CLUSTERS: Cluster[] = [
  ["/ 01", "Languages", "Python · SQL · R · TypeScript · Rust", "Python"],
  ["/ 02", "ML & Modeling", "XGBoost · PyTorch · TensorFlow · Scikit-learn · Optuna · SHAP", "XGBoost"],
  ["/ 03", "AI & Agents", "LangChain · LangGraph · CrewAI · Ollama · MCP · sentence-transformers", "LangChain"],
  ["/ 04", "Geospatial", "H3 · Pydeck · LandScan · OSM · NetworkX · Graph centrality", "H3"],
  ["/ 05", "Data", "DuckDB · Pandas · NumPy · PySpark · MongoDB · Parquet · Star Schema", "DuckDB"],
  ["/ 06", "Cloud & Ops", "AWS · Databricks · Docker · Kubernetes · Git · MLOps", "AWS"],
];

/**
 * Section 03 — Skills. Infinite-scroll marquee of 6 stack clusters.
 * The track is duplicated (aria-hidden) so the CSS keyframe can
 * slide it -50% for a seamless loop.
 */
export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">
            <span className="bar" /><b>03</b><span>Toolkit · 06 clusters · live ticker</span>
          </span>
          <h2 className="section-title">The <em>stack</em>.</h2>
        </div>
      </div>
      <div className="marquee reveal" aria-label="Skills ticker">
        <div className="marquee-track">
          {[...CLUSTERS, ...CLUSTERS].map((c, i) => {
            const isHidden = i >= CLUSTERS.length;
            const [num, title, items, lead] = c;
            // Bold the lead tool inline. Splitting on the lead avoids
            // dangerouslySetInnerHTML and any escaping concerns.
            const [before, after] = items.split(lead);
            return (
              <span
                key={i}
                className="m-item"
                aria-hidden={isHidden ? "true" : undefined}
              >
                <span className="m-num">{num}</span>
                <span className="m-cluster">{title}</span>
                <span className="m-tools">
                  {before}
                  <b>{lead}</b>
                  {after}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
