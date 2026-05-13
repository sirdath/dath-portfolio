import "../../redesign.css";
import "../aegis/aegis.css";
import { CaseStudyShell } from "@/components/redesign/case-study/CaseStudyShell";

export const metadata = {
  title: "London Synergy Index — Predictive site selection · Dimitris Athinaios",
  description:
    "Geospatial pipeline tessellating Greater London into 55,000 H3 hexagons, fusing LandScan rasters, ONS Census, and OSM POIs with graph-centrality features. Spatially cross-validated XGBoost finds retail siting opportunities; Burt's Structural Hole Theory locates market gaps.",
};

const extraNavActions = (
  <>
    <a
      href="https://geospatialondon.dathproject.com"
      target="_blank"
      rel="noopener noreferrer"
      className="aegis-back nv-live"
    >
      Live site ↗
    </a>
    <a
      href="https://github.com/sirdath/geospatial-site-selection"
      target="_blank"
      rel="noopener noreferrer"
      className="aegis-back"
    >
      GitHub ↗
    </a>
  </>
);

export default function Page() {
  return (
    <CaseStudyShell title="London Synergy Index" extraNavActions={extraNavActions}>
      {/* ── Hero ── */}
      <header className="aegis-hero wrap">
        <div>
          <span className="eyebrow">
            <span className="bar" />
            <b>Case study</b>
            <span>Geospatial · Machine learning</span>
          </span>
          <h1 className="section-title aegis-title">
            London <em>Synergy</em>.
          </h1>
          <p className="aegis-tagline">
            A geospatial intelligence platform that identifies <em>underserved retail locations</em> across Greater London. Tessellating the city into 55,000 H3 hexagons, enriching each with satellite-derived population data, census demographics, and POI density features, and scoring every hexagon for investment potential via a spatially cross-validated XGBoost classifier.
          </p>
        </div>

        <div className="aegis-stats">
          <div><b>55,000</b><span>H3 hexagons</span></div>
          <div><b>3 sources</b><span>LandScan · ONS · OSM</span></div>
          <div><b>Spatial CV</b><span>No autocorrelation leak</span></div>
          <div><b>Burt</b><span>Structural-hole theory</span></div>
        </div>

        <div className="aegis-stack">
          <span className="stack-label">/ Stack</span>
          <div className="stack-chips">
            <span className="chip">Python</span>
            <span className="chip">XGBoost</span>
            <span className="chip">H3</span>
            <span className="chip">NetworkX</span>
            <span className="chip">Streamlit</span>
            <span className="chip">Pydeck</span>
            <span className="chip">AWS</span>
          </div>
        </div>

        <div className="nv-cta-row">
          <a
            href="https://geospatialondon.dathproject.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nv-cta-primary"
          >
            Open geospatialondon.dathproject.com ↗
          </a>
          <a
            href="https://github.com/sirdath/geospatial-site-selection"
            target="_blank"
            rel="noopener noreferrer"
            className="nv-cta-secondary"
          >
            View source →
          </a>
        </div>
      </header>

      {/* ── 01 Hero shot ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          01 / The <em>interface</em>.
        </h2>
        <p className="aegis-lead">
          The deployed app is a Streamlit dashboard wrapping a Pydeck 3D hex-grid view of London. Each hexagon is colour-encoded by its predicted investment-potential score; users can filter by sector, hover for explanations, and inspect top-ranked sites in detail.
        </p>

        <figure className="aegis-arch-feature">
          <div className="aegis-frame">
            <img src="/redesign/london-synergy/hero.webp" alt="London Synergy Index dashboard view" loading="lazy" />
          </div>
          <figcaption>
            <b>Live dashboard</b>
            <span>55,000 hexagons rendered as a Pydeck 3D layer. Colour intensity = predicted opportunity score from the spatially-CV XGBoost classifier.</span>
          </figcaption>
        </figure>

        <figure className="aegis-arch-feature">
          <div className="aegis-frame">
            <img src="/redesign/london-synergy/interface.webp" alt="London Synergy filter and analysis interface" loading="lazy" />
          </div>
          <figcaption>
            <b>Filter + analyse</b>
            <span>Each hexagon&apos;s feature vector is inspectable — demographics, accessibility, competition density, network-centrality. The model&apos;s decision becomes auditable, not a black box.</span>
          </figcaption>
        </figure>
      </section>

      {/* ── 02 Spatial feature engineering ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          02 / Feature <em>engineering</em>.
        </h2>
        <p className="aegis-lead">
          Each H3 hexagon at resolution 8 (~0.7 km² per hex) is enriched with features from three independent data sources. The pipeline outputs a unified feature matrix where row = hexagon, columns = ~40 engineered variables.
        </p>

        <ol className="nv-pipeline">
          <li>
            <span className="nv-step">01</span>
            <div>
              <b>LandScan rasters → population per hex</b>
              <p>Satellite-derived 30-arc-second population grids, reprojected and aggregated to H3 cells. Captures absolute density and rural/urban gradient at sub-LSOA granularity.</p>
            </div>
          </li>
          <li>
            <span className="nv-step">02</span>
            <div>
              <b>ONS Census 2021 → demographic profile per hex</b>
              <p>Age distribution, income deciles, employment status, ethnicity, deprivation indices. Joined via LSOA centroid → H3 lookup so each hexagon inherits its containing LSOA&apos;s statistics.</p>
            </div>
          </li>
          <li>
            <span className="nv-step">03</span>
            <div>
              <b>OSM POIs → competition + centrality</b>
              <p>OpenStreetMap points of interest (retail, leisure, services) extracted by category. Each hex gets a count, a category mix vector, and graph-centrality scores from a NetworkX-built spatial network. The centrality features encode "how reachable is this hex from the rest of the city?"</p>
            </div>
          </li>
          <li>
            <span className="nv-step">04</span>
            <div>
              <b>Burt&apos;s Structural Hole metrics</b>
              <p>Adapted from network science: a structural hole is a gap between two well-connected clusters that a new node could bridge. Translated to retail siting: hexagons that bridge under-served clusters score higher. This is the project&apos;s most distinctive feature.</p>
            </div>
          </li>
        </ol>
      </section>

      {/* ── 03 Why spatial CV ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          03 / Why spatial <em>cross-validation</em>.
        </h2>
        <p className="aegis-lead">
          The single most important methodological choice. Standard k-fold CV would make this model look great — and be useless on new data.
        </p>

        <div className="nv-two-col">
          <div className="nv-col">
            <h3 className="nv-h3">Standard k-fold (wrong)</h3>
            <ul className="nv-list nv-list-neg">
              <li>Train and test hexagons are randomly mixed.</li>
              <li>Hexagons are <em>spatially autocorrelated</em> — neighbours share population, demographics, POI patterns.</li>
              <li>The model essentially memorises the local neighbourhood and "predicts" the same hex it&apos;s already seen variants of.</li>
              <li>Inflated R² / accuracy that won&apos;t hold on unseen regions.</li>
            </ul>
          </div>
          <div className="nv-col">
            <h3 className="nv-h3">Spatial CV (right)</h3>
            <ul className="nv-list">
              <li>Test set is a <em>contiguous geographic region</em> held out from training.</li>
              <li>Adjacent hexagons in train and test are forbidden — the model sees the rest of the city, then has to predict an unseen borough.</li>
              <li>Honest performance estimate: how well does this model generalise to a NEW area of London?</li>
              <li>Lower headline numbers, real-world useful.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 04 Recommendations ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          04 / The <em>output</em>.
        </h2>
        <p className="aegis-lead">
          For any sector or store concept, the model ranks all 55,000 hexagons and surfaces the top candidates with their feature decomposition — which factors drove the score, which neighbouring hexagons are also high-potential, and how confident the prediction is.
        </p>

        <figure className="aegis-arch-feature">
          <div className="aegis-frame">
            <img src="/redesign/london-synergy/recommendations.webp" alt="Top recommended sites ranked by opportunity score" loading="lazy" />
          </div>
          <figcaption>
            <b>Top recommendations</b>
            <span>Ranked output for a given retail concept. Each row carries the opportunity score, contributing feature breakdown, and a one-click jump to the live map.</span>
          </figcaption>
        </figure>
      </section>

      {/* ── Final CTA ── */}
      <section className="aegis-section wrap nv-final">
        <h2 className="aegis-h2">
          Explore <em>it</em>.
        </h2>
        <p className="aegis-lead">
          The live Streamlit dashboard is deployed at geospatialondon.dathproject.com. Full notebooks, the Optuna search artifacts, and the feature engineering pipeline live in the GitHub repo.
        </p>
        <div className="nv-cta-row nv-cta-final">
          <a
            href="https://geospatialondon.dathproject.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nv-cta-primary"
          >
            geospatialondon.dathproject.com ↗
          </a>
          <a
            href="https://github.com/sirdath/geospatial-site-selection"
            target="_blank"
            rel="noopener noreferrer"
            className="nv-cta-secondary"
          >
            github.com/sirdath/geospatial-site-selection →
          </a>
        </div>
      </section>
    </CaseStudyShell>
  );
}
