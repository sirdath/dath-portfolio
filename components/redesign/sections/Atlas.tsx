import { RedesignGlobe } from "../RedesignGlobe";

/**
 * Section 02 — Atlas. Hex-tile globe with red accents at project
 * locations. Section header is server-rendered; the globe itself
 * is a client component (it needs Three.js / WebGL).
 */
export function Atlas() {
  return (
    <section className="section" id="atlas">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">
            <span className="bar" /><b>02</b><span>Atlas · Where the work lives</span>
          </span>
          <h2 className="section-title">Where it <em>lives</em>.</h2>
        </div>
        <RedesignGlobe />
      </div>
    </section>
  );
}
