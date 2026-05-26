import "../../redesign.css";
import "../case-study.css";
import { CaseStudyShell } from "@/components/redesign/case-study/CaseStudyShell";

export const metadata = {
  title: "Dataportfolio.co.uk — No-code portfolio SaaS · Dimitris Athinaios",
  description:
    "A production SaaS that automates portfolio creation for data professionals. Form-based GUI, real-time preview, dynamic SEO metadata, custom domain + SSL. Next.js + Node.js + PostgreSQL.",
};

const extraNavActions = (
  <>
    <a
      href="https://dataportfolio.co.uk"
      target="_blank"
      rel="noopener noreferrer"
      className="aegis-back nv-live"
    >
      Live site ↗
    </a>
  </>
);

export default function Page() {
  return (
    <CaseStudyShell title="Dataportfolio.co.uk" extraNavActions={extraNavActions}>
      {/* ── Hero ── */}
      <header className="aegis-hero wrap">
        <div>
          <span className="eyebrow">
            <span className="bar" />
            <b>Case study</b>
            <span>Full-stack · Production SaaS</span>
          </span>
          <h1 className="section-title aegis-title">
            Data<em>portfolio</em>.
          </h1>
          <p className="aegis-tagline">
            A production SaaS that lets data professionals ship a portfolio site <em>without writing code</em>. Form-based editors, drag-and-drop layout, real-time preview, dynamic SEO metadata per page, custom domain with SSL — all driven by a Next.js + Node.js + PostgreSQL stack.
          </p>
        </div>

        <div className="aegis-stats">
          <div><b>No-code</b><span>Form-based editor</span></div>
          <div><b>Realtime</b><span>Preview before publish</span></div>
          <div><b>SEO-ready</b><span>Per-page metadata</span></div>
          <div><b>Custom domain</b><span>SSL provisioned</span></div>
        </div>

        <div className="aegis-stack">
          <span className="stack-label">/ Stack</span>
          <div className="stack-chips">
            <span className="chip">Next.js</span>
            <span className="chip">React</span>
            <span className="chip">Node.js</span>
            <span className="chip">PostgreSQL</span>
            <span className="chip">Tailwind</span>
          </div>
        </div>

        <div className="nv-cta-row">
          <a
            href="https://dataportfolio.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="nv-cta-primary"
          >
            Open dataportfolio.co.uk ↗
          </a>
        </div>
      </header>

      {/* ── 01 What it solves ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          01 / What it <em>solves</em>.
        </h2>
        <p className="aegis-lead">
          Data scientists, analysts, and ML engineers regularly need a personal site for job hunting or freelance work — but spinning one up from scratch wastes a weekend (or several). Dataportfolio compresses that to about 20 minutes.
        </p>

        <div className="nv-two-col">
          <div className="nv-col">
            <h3 className="nv-h3">Before</h3>
            <ul className="nv-list nv-list-neg">
              <li>Pick a static-site generator (Next, Hugo, Astro, …)</li>
              <li>Pick + theme a template you don&apos;t love</li>
              <li>Hand-edit JSON / markdown for every project</li>
              <li>Hand-write OG tags per page for LinkedIn shares</li>
              <li>Buy a domain, point DNS, hope SSL works</li>
              <li>Deploy and pray nothing breaks on the next push</li>
            </ul>
          </div>
          <div className="nv-col">
            <h3 className="nv-h3">After</h3>
            <ul className="nv-list">
              <li>Sign up; pick a layout.</li>
              <li>Fill in <em>forms</em> — projects, skills, experience.</li>
              <li>Watch the preview update as you type.</li>
              <li>Hit publish. SEO metadata, social cards, custom domain, SSL — all provisioned automatically.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 02 How it works ── */}
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          02 / How it <em>works</em>.
        </h2>
        <p className="aegis-lead">
          Hybrid Next.js rendering keeps both edit-time and publish-time experiences fast — SSR for the live portfolio pages (SEO + first-paint), client-side state for the editor.
        </p>

        <div className="nv-arch-notes">
          <div className="nv-note">
            <span className="nv-note-num">Editor (client-side)</span>
            <p>React form components with optimistic UI updates. Every keystroke updates the preview without round-tripping to the server. State is persisted to PostgreSQL on debounced flushes.</p>
          </div>
          <div className="nv-note">
            <span className="nv-note-num">API (Node.js)</span>
            <p>REST endpoints for CRUD over user, project, skill, and experience entities. Auth via signed cookies. Validation at the boundary, with constraints mirrored in the database.</p>
          </div>
          <div className="nv-note">
            <span className="nv-note-num">Published portfolio (SSR)</span>
            <p>Each user&apos;s portfolio renders as a Next.js route under their custom domain. Metadata, Open Graph tags, and structured data are generated server-side from the database — every share gets a clean preview card.</p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="aegis-section wrap nv-final">
        <h2 className="aegis-h2">
          Try <em>it</em>.
        </h2>
        <p className="aegis-lead">
          Live production deployment. Free to try; takes about 20 minutes to ship a credible portfolio.
        </p>
        <div className="nv-cta-row nv-cta-final">
          <a
            href="https://dataportfolio.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="nv-cta-primary"
          >
            dataportfolio.co.uk ↗
          </a>
        </div>
      </section>
    </CaseStudyShell>
  );
}
