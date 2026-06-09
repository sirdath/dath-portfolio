import { TimelineBeam } from "../TimelineBeam";

interface Entry {
  year: string;
  role: string;
  kind: string;
  edu?: boolean;
  org: string;
  grade?: string;
  note: string;
  tags: string[];
}

const ENTRIES: Entry[] = [
  {
    year: "2026.04 — 09",
    role: "Geospatial Data Scientist",
    kind: "Exp · Placement",
    org: "Intelmatix · London (Dissertation)",
    note: "Engineering a spatial network of 1.7M+ POIs (Python, NetworkX). Architecting serverless AWS pipelines (S3, Glue, Athena) for high-dimensional geospatial datasets at scale.",
    tags: ["Python", "NetworkX", "AWS · Glue · Athena"],
  },
  {
    year: "2025.09 — 26.09",
    role: "MSc Business Analytics",
    kind: "Edu · MSc",
    edu: true,
    org: "UCL School of Management · London",
    grade: "Current grade: 75% · Distinction track",
    note: "Modules in Data Engineering (MLOps, Docker, AWS, SQL), Operational Analytics, Machine Learning, Predictive Analytics.",
    tags: ["MLOps", "SQL", "Predictive Analytics"],
  },
  {
    year: "2024.05 — 08",
    role: "Data Scientist",
    kind: "Exp · Internship",
    org: "Globassure · Athens",
    note: "Built a data-scraping pipeline to identify potential client leads, securing 7 startup contracts for employee insurance coverage. Cleaned and processed 120,000+ records.",
    tags: ["Python", "Pandas", "EDA", "Web Scraping"],
  },
  {
    year: "2022.09 — 25.06",
    role: "BSc Business Management — Data Analytics",
    kind: "Edu · BSc",
    edu: true,
    org: "Henley Business School · University of Reading",
    grade: "First Class Honours",
    note: "Modules in Data Analytics, Machine Learning, Information Systems. Co-founded the Data Analytics Society (200+ members, 2023–2025).",
    tags: ["First Class", "Co-founder", "Data Society"],
  },
];

export function Trajectory() {
  return (
    <section className="section" id="trajectory">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">
            <span className="bar" /><b>03</b><span>Trajectory · Education & experience</span>
          </span>
          <h2 className="section-title">The <em>path</em>.</h2>
        </div>

        <div className="timeline">
          <TimelineBeam />
          {ENTRIES.map((e, i) => (
            <article key={i} className={`tl-row reveal${e.edu ? " edu" : ""}`}>
              <span className="tl-year">{e.year}</span>
              <div className="tl-spine"><span className="tl-dot" /></div>
              <div className="tl-main">
                <div className="tl-head">
                  <h4 className="tl-role">{e.role}</h4>
                  <span className={`tl-kind${e.edu ? " edu" : ""}`}>{e.kind}</span>
                </div>
                <span className="tl-org">{e.org}</span>
                {e.grade && <span className="tl-grade">{e.grade}</span>}
                <p className="tl-note">{e.note}</p>
                <div className="tl-tags-inline">
                  {e.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
