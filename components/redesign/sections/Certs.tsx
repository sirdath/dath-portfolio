interface Cert { from: string; title: string; detail: string; badge: string; }

const CERTS: Cert[] = [
  { from: "Imperial College London", title: "Mathematics for Machine Learning", detail: "Linear algebra · Multivariate calculus · PCA", badge: "Specialisation" },
  { from: "Google", title: "Advanced Data Analytics", detail: "Statistical methods · Regression · ML modeling", badge: "Professional" },
  { from: "Microsoft", title: "Power BI Desktop", detail: "DAX · Power Query · Data modeling", badge: "Certified" },
  { from: "IBM", title: "Data Analyst", detail: "Python · SQL · Tableau · IBM Cognos", badge: "Professional" },
];

export function Certs() {
  return (
    <section className="section" id="certs">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">
            <span className="bar" /><b>05</b><span>Continuous learning · 04 certifications</span>
          </span>
          <h2 className="section-title">Foundations <em>deepened</em>.</h2>
        </div>

        <p className="lead-para reveal">
          I aim to learn something <em>new every day</em>. The tech industry moves fast — <span className="accent">especially AI</span> — and I make a habit of keeping current: papers, model releases, ship logs, and the open-source conversations between them. These certifications are <em>checkpoints, not endpoints</em>.
        </p>

        <div className="certs">
          {CERTS.map((c) => (
            <article key={c.title} className="cert reveal">
              <div>
                <span className="cert-from">{c.from}</span>
                <h4 className="cert-title">{c.title}</h4>
                <p className="cert-detail">{c.detail}</p>
              </div>
              <span className="cert-badge">{c.badge}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
