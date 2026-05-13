import { LondonOpportunityMap } from "../LondonOpportunityMap";

/**
 * Section 02 — Opportunity map. Replaced the generic project-locations
 * globe with the actual output of the London Synergy model: top-10
 * predicted opportunity sites per retail category, hover-to-inspect
 * with SHAP drivers + tier metadata. Driven by data exported from
 * the production model at sirdath/geospatial-site-selection.
 */
export function Atlas() {
  return (
    <section className="section" id="atlas">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">
            <span className="bar" /><b>02</b><span>Model output · Live data from the Synergy project</span>
          </span>
          <h2 className="section-title">The <em>opportunity</em> map.</h2>
          <p className="lead-para reveal" style={{ marginTop: "-24px" }}>
            This isn&apos;t a generic globe — it&apos;s the actual top-10 ranking output of the <em>London Synergy</em> XGBoost classifier across 15,430 H3 hexagons and 33 boroughs. Switch the category to see how the model&apos;s predictions shift; hover a borough for its SHAP drivers.
          </p>
        </div>
        <LondonOpportunityMap />
      </div>
    </section>
  );
}
