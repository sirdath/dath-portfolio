import "../../redesign.css";
import "../case-study.css";
import { CaseStudyShell } from "@/components/redesign/case-study/CaseStudyShell";

export const metadata = {
  title: "Data Engineering Pipeline — Star Schema Lakehouse · Dimitris Athinaios",
  description:
    "A centralized Star Schema Lakehouse architecture that unifies MongoDB documents, CSV flat files, and nested JSON into a clean analytical layer. Parquet for storage (10-50x compression vs raw JSON), DuckDB for zero-infra SQL aggregation.",
};

export default function Page() {
  return (
    <CaseStudyShell title="Data Engineering Pipeline">
      {/* ── Hero ── */}
      <header className="aegis-hero wrap">
        <div>
          <span className="eyebrow">
            <span className="bar" />
            <b>Case study</b>
            <span>Data engineering · Lakehouse architecture</span>
          </span>
          <h1 className="section-title aegis-title">
            Star Schema <em>Lakehouse</em>.
          </h1>
          <p className="aegis-tagline">
            A centralised lakehouse pipeline that unifies <em>semi-structured</em> sources — MongoDB documents, CSV flat files, deeply nested JSON — into a clean analytical layer. PyMongo + Pandas flatten and engineer derived dimensions; Parquet stores it columnar (10-50× compression); DuckDB queries it with zero infrastructure overhead.
          </p>
        </div>

        <div className="aegis-stats">
          <div><b>10-50×</b><span>Parquet vs raw JSON</span></div>
          <div><b>Zero infra</b><span>DuckDB in-process SQL</span></div>
          <div><b>Star Schema</b><span>Facts + dimensions</span></div>
          <div><b>Snappy</b><span>Per-partition compression</span></div>
        </div>

        <div className="aegis-stack">
          <span className="stack-label">/ Stack</span>
          <div className="stack-chips">
            <span className="chip">Python</span>
            <span className="chip">PySpark</span>
            <span className="chip">MongoDB</span>
            <span className="chip">PyMongo</span>
            <span className="chip">DuckDB</span>
            <span className="chip">Parquet</span>
            <span className="chip">Pandas</span>
          </div>
        </div>
      </header>

      {/* ── 01 Schema design ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          01 / Schema <em>design</em>.
        </h2>
        <p className="aegis-lead">
          A Star Schema centres on <em>fact tables</em> (transactional events) surrounded by <em>dimension tables</em> (geography, time, entity attributes). The denormalised structure trades storage for read speed — analytical queries hit at most one join instead of seven.
        </p>

        <pre className="nv-arch-diagram" aria-label="Star Schema layout">
{`                +-------------------+
                |   dim_time        |
                |   (year, qtr, mo) |
                +---------+---------+
                          |
+--------------+    +-----+----------+    +---------------+
| dim_geo      |----| fact_event     |----| dim_entity    |
| (region,     |    | (id, ts,       |    | (id, name,    |
|  country,    |    |  amount,       |    |  type, tags)  |
|  city, h3)   |    |  fks to dims)  |    +---------------+
+--------------+    +-----+----------+
                          |
                +---------+---------+
                |   dim_source      |
                |   (CSV / Mongo /  |
                |    JSON ingest)   |
                +-------------------+`}
        </pre>

        <p className="aegis-lead" style={{ marginTop: 32 }}>
          Surrogate keys link facts to dimensions. Source provenance is itself a dimension (<code className="nv-code">dim_source</code>), so lineage queries — "which records came from which ingest run?" — are one <code className="nv-code">WHERE</code> clause away.
        </p>
      </section>

      {/* ── 02 ETL pipeline ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          02 / ETL <em>pipeline</em>.
        </h2>
        <p className="aegis-lead">
          Three phases, each idempotent and resumable. The transformation layer is the one that earns its keep — nested JSON is where most lakehouses fall over.
        </p>

        <ol className="nv-pipeline">
          <li>
            <span className="nv-step">01</span>
            <div>
              <b>Extract</b>
              <p>PyMongo pulls from MongoDB with cursor-based batching. Pandas reads CSV with schema inference + type coercion. Both feed into a uniform <code className="nv-code">RawRecord</code> shape before transformation.</p>
            </div>
          </li>
          <li>
            <span className="nv-step">02</span>
            <div>
              <b>Transform</b>
              <p>Nested JSON gets flattened — arrays exploded, deeply-nested objects denormalised into columns. Coordinate pairs are reverse-geocoded into <em>derived geographical dimensions</em> (country, region, city, H3 hex). Temporal features (year, quarter, day-of-week) are pre-computed so the analytical layer doesn&apos;t recompute them on every query.</p>
            </div>
          </li>
          <li>
            <span className="nv-step">03</span>
            <div>
              <b>Load</b>
              <p>Write to Parquet with Snappy compression, partitioned by date for efficient range-scan queries. Each partition is a separate file that DuckDB can read without loading the whole table.</p>
            </div>
          </li>
        </ol>
      </section>

      {/* ── 03 Why these tools ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          03 / Why these <em>tools</em>.
        </h2>
        <p className="aegis-lead">
          Snowflake, BigQuery, and Redshift could have done this. They&apos;d also have added subscription cost, vendor lock-in, and network latency. The lakehouse-on-laptop combo earns its place by sitting one rung below the cloud DWH tier.
        </p>

        <div className="nv-arch-notes">
          <div className="nv-note">
            <span className="nv-note-num">Parquet</span>
            <p>Columnar storage. Queries that touch 3 columns out of 40 read 7.5% of the file. Snappy compression gets 10-50× ratio vs raw JSON for typical event data. Native partition pruning.</p>
          </div>
          <div className="nv-note">
            <span className="nv-note-num">DuckDB</span>
            <p>Embedded analytical SQL engine. Reads Parquet natively, runs in-process, no daemon, no port, no auth. <code className="nv-code">SELECT</code> queries on millions of rows execute in milliseconds. Perfect for analytical workloads that don&apos;t need concurrency.</p>
          </div>
          <div className="nv-note">
            <span className="nv-note-num">PySpark (optional)</span>
            <p>When a single machine isn&apos;t enough — PySpark reads the same Parquet partitions, distributes the workload, writes back to Parquet. The Spark + DuckDB split lets the same lakehouse serve both scale-up (laptop) and scale-out (cluster) consumers.</p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="aegis-section wrap nv-final">
        <h2 className="aegis-h2">
          Source <em>code</em>.
        </h2>
        <p className="aegis-lead">
          Pipeline notebooks, schema definitions, and the Parquet/DuckDB query layer.
        </p>
        <div className="nv-cta-row nv-cta-final">
          <a
            href="https://github.com/sirdath"
            target="_blank"
            rel="noopener noreferrer"
            className="nv-cta-primary"
          >
            github.com/sirdath ↗
          </a>
        </div>
      </section>
    </CaseStudyShell>
  );
}
