import "../../redesign.css";
import "../aegis/aegis.css";
import { CaseStudyShell } from "@/components/redesign/case-study/CaseStudyShell";

export const metadata = {
  title: "London Housing & Crime — Opportunity Index · Dimitris Athinaios",
  description:
    "Spatio-temporal pipeline merging 1M+ records of London housing transactions and crime data. Custom Opportunity Index identifies neighborhoods where prices are about to follow safety improvements. Optuna-tuned XGBoost regressor at R² = 0.92.",
};

const extraNavActions = (
  <a
    href="https://github.com/sirdath/DS"
    target="_blank"
    rel="noopener noreferrer"
    className="aegis-back"
  >
    GitHub ↗
  </a>
);

export default function Page() {
  return (
    <CaseStudyShell title="London Housing & Crime" extraNavActions={extraNavActions}>
      {/* ── Hero ── */}
      <header className="aegis-hero wrap">
        <div>
          <span className="eyebrow">
            <span className="bar" />
            <b>Case study</b>
            <span>Geospatial · Predictive analytics</span>
          </span>
          <h1 className="section-title aegis-title">
            London Housing &amp; <em>Crime</em>.
          </h1>
          <p className="aegis-tagline">
            A spatio-temporal pipeline merging <em>1M+ records</em> from London&apos;s housing market and Met Police crime data to construct an <em>Opportunity Index</em> — a composite score identifying neighborhoods where property values lag the underlying safety trajectory. An Optuna-tuned XGBoost regressor scores R² = 0.92 on held-out data.
          </p>
        </div>

        <div className="aegis-stats">
          <div><b>1M+</b><span>Records merged</span></div>
          <div><b>R² 0.92</b><span>Held-out test set</span></div>
          <div><b>LSOA</b><span>Spatial join granularity</span></div>
          <div><b>Optuna</b><span>200-trial TPE search</span></div>
        </div>

        <div className="aegis-stack">
          <span className="stack-label">/ Stack</span>
          <div className="stack-chips">
            <span className="chip">Python</span>
            <span className="chip">Scikit-learn</span>
            <span className="chip">XGBoost</span>
            <span className="chip">Optuna</span>
            <span className="chip">Pandas</span>
            <span className="chip">GeoPandas</span>
          </div>
        </div>
      </header>

      {/* ── 01 The Opportunity Index ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          01 / The Opportunity <em>Index</em>.
        </h2>
        <p className="aegis-lead">
          A composite metric that finds neighborhoods where <em>crime is declining faster than prices are rising</em>. That gap is an investment window — the area is becoming safer but hasn&apos;t been repriced yet. The index is the project&apos;s point of view; everything else exists to make it accurate.
        </p>

        <div className="nv-arch-notes">
          <div className="nv-note">
            <span className="nv-note-num">Crime trajectory</span>
            <p>Normalised rolling 12-month change in incident rate, weighted by severity. A neighborhood with falling crime contributes positively to the index.</p>
          </div>
          <div className="nv-note">
            <span className="nv-note-num">Price momentum</span>
            <p>Rolling 12-month price velocity. A neighborhood with rapidly rising prices contributes <em>negatively</em> — the market has already priced in the improvement.</p>
          </div>
          <div className="nv-note">
            <span className="nv-note-num">Accessibility &amp; greenspace</span>
            <p>Transport proximity and parks-per-LSOA enter as moderators. Two equally safe neighborhoods with different accessibility profiles get different scores.</p>
          </div>
        </div>
      </section>

      {/* ── 02 Data pipeline ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          02 / Data <em>pipeline</em>.
        </h2>
        <p className="aegis-lead">
          Two source datasets, one spatial join, four engineered feature families. Missing data is handled by <em>spatial interpolation</em>, not simple imputation — adjacent LSOAs share enough socioeconomic structure that a kNN fill outperforms column-mean.
        </p>

        <ol className="nv-pipeline">
          <li>
            <span className="nv-step">01</span>
            <div>
              <b>Ingest</b>
              <p>Land Registry Price Paid Data (housing transactions, 2010–present) + Met Police monthly crime CSV exports. Both are wide and dirty.</p>
            </div>
          </li>
          <li>
            <span className="nv-step">02</span>
            <div>
              <b>Spatial join</b>
              <p>Both datasets resolve to LSOA polygons (Lower Layer Super Output Areas — ~1,500 residents each, the standard UK statistical unit). The join is a point-in-polygon operation with GeoPandas.</p>
            </div>
          </li>
          <li>
            <span className="nv-step">03</span>
            <div>
              <b>Feature engineering</b>
              <p>Rolling crime rates (12-month / 24-month), seasonal decomposition (STL), price velocity (year-on-year %), accessibility (km to nearest tube / overground), greenspace ratio. ~40 features per LSOA-month.</p>
            </div>
          </li>
          <li>
            <span className="nv-step">04</span>
            <div>
              <b>Optuna search</b>
              <p>200 TPE trials over <code className="nv-code">max_depth</code>, <code className="nv-code">learning_rate</code>, <code className="nv-code">subsample</code>, <code className="nv-code">colsample_bytree</code>, <code className="nv-code">reg_alpha</code>, <code className="nv-code">reg_lambda</code>. Objective: temporal-split R² (train on past, test on recent).</p>
            </div>
          </li>
        </ol>
      </section>

      {/* ── 03 Validation ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          03 / What R² = 0.92 actually <em>means</em>.
        </h2>
        <p className="aegis-lead">
          The headline number is meaningful only with the right test methodology. Two design choices keep it honest.
        </p>

        <div className="nv-two-col">
          <div className="nv-col">
            <h3 className="nv-h3">Temporal split, not random</h3>
            <ul className="nv-list">
              <li>Training data is everything pre-2024; test data is 2024 onward.</li>
              <li>Random k-fold would leak future information backwards — the model would memorise the period instead of generalising.</li>
              <li>The temporal split simulates the actual deployment scenario: predict tomorrow given everything up to today.</li>
            </ul>
          </div>
          <div className="nv-col">
            <h3 className="nv-h3">Spatial integrity</h3>
            <ul className="nv-list">
              <li>Adjacent LSOAs are <em>not</em> independent — there&apos;s strong spatial autocorrelation in crime + price.</li>
              <li>Test LSOAs are held out as <em>contiguous regions</em>, not individual cells, so the model can&apos;t cheat by interpolating from neighbours it&apos;s seen in training.</li>
              <li>R² = 0.92 under this regime is genuinely about generalisation, not memorisation.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="aegis-section wrap nv-final">
        <h2 className="aegis-h2">
          Code <em>+ data</em>.
        </h2>
        <p className="aegis-lead">
          Full notebooks, the Optuna study, and the LSOA-level Opportunity Index outputs live in the repo.
        </p>
        <div className="nv-cta-row nv-cta-final">
          <a
            href="https://github.com/sirdath/DS"
            target="_blank"
            rel="noopener noreferrer"
            className="nv-cta-primary"
          >
            github.com/sirdath/DS ↗
          </a>
        </div>
      </section>
    </CaseStudyShell>
  );
}
