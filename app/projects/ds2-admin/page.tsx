import "../../redesign.css";
import "../case-study.css";
import { RedesignCursor } from "@/components/redesign/RedesignCursor";
import { CaseStudyShell } from "@/components/redesign/case-study/CaseStudyShell";

export const metadata = {
  title: "DS2 Workspace — Consultancy Operating System · Dimitris Athinaios",
  description:
    "The internal admin workspace for DS, a two-founder digital solutions consultancy. An agentic copilot with model routing and a confirm-gate, six AI micro-engines, and a full pipeline / leads / content operating system on Next.js 15 + Supabase.",
};

const workspaceShots = [
  {
    src: "/redesign/ds2-admin/dashboard-dark.webp",
    label: "Book of business at a glance",
    note: "The daily standup view — active engagements, recurring revenue, pipeline, calendar and fresh leads in one pane.",
  },
  {
    src: "/redesign/ds2-admin/dashboard-light.webp",
    label: "Same view, light theme",
    note: "A fully themed light/dark system — every surface, chart and pill has both a light and dark treatment.",
  },
  {
    src: "/redesign/ds2-admin/projects-dark.webp",
    label: "Client deployments & pipeline",
    note: "Live client deployments, pipeline leads, and the active book with progress bars and status pills.",
  },
];

const copilotShots = [
  {
    src: "/redesign/ds2-admin/copilot-conversation-dark.webp",
    label: "Copilot — mid-action",
    note: "Model-routing badge (FABLE · DEEP), live tool action-cards as the agent works, and a confirm-gate card before anything mutates. Genuinely agentic, not a chat box.",
  },
  {
    src: "/redesign/ds2-admin/copilot-dark.webp",
    label: "Command deck — dark",
    note: "The composer: glass sphere, aurora-mesh background, and a radiant prompt bar wired to the workspace tools.",
  },
  {
    src: "/redesign/ds2-admin/copilot-light.webp",
    label: "Command deck — light",
    note: "The same command deck under the light theme, proving the design system holds across both.",
  },
];

const growthShots = [
  {
    src: "/redesign/ds2-admin/funnel-dark.webp",
    label: "Sales funnel",
    note: "Lead-to-client stages, conversion at each step.",
  },
  {
    src: "/redesign/ds2-admin/calendar-dark.webp",
    label: "Calendar",
    note: "Month grid with the engagement / delivery side panel.",
  },
  {
    src: "/redesign/ds2-admin/notes-dark.webp",
    label: "Notes",
    note: "Working notes and client context, searchable per account.",
  },
];

const contentShots = [
  {
    src: "/redesign/ds2-admin/products-dark.webp",
    label: "Products",
    note: "The six owned micro-engines and their per-client state.",
  },
  {
    src: "/redesign/ds2-admin/articles-dark.webp",
    label: "Articles engine",
    note: "The built-in blog / content engine that feeds the marketing site.",
  },
  {
    src: "/redesign/ds2-admin/competitors-dark.webp",
    label: "Competitor intelligence",
    note: "The Argus-powered competitor-watch tab (shown here in its empty state).",
  },
];

export default function DS2AdminPage() {
  return (
    <>
      <RedesignCursor />
      <CaseStudyShell
        title="DS2 Workspace"
        tagline="The private operating system for a two-founder digital-solutions consultancy — an agentic copilot with model routing and a confirm-gate, six AI micro-engines, and a full pipeline / leads / content workspace, all in one authenticated Next.js app."
        categoryText="Full-stack · Agentic internal tooling"
        stats={[
          { value: "6", label: "AI micro-engines" },
          { value: "3", label: "Model tiers routed" },
          { value: "12", label: "Workspace views" },
          { value: "Supabase", label: "Auth · Postgres · pgvector" },
        ]}
        techStack={[
          "Next.js 15", "React 19", "TypeScript", "Tailwind 4", "Supabase", "Anthropic SDK", "Turborepo", "Remotion", "Vercel",
        ]}
      >

        {/* ── Context ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            00 / What it <em>is</em>.
          </h2>
          <p className="aegis-lead">
            DS is a two-founder digital-solutions consultancy (Athens–London) that ships AI-powered tools to small businesses. This is the private workspace we run the whole firm from — one authenticated app that unifies the client pipeline, live deployments, leads, calendar, content, and six owned AI micro-engines (Aegis, Argus, Plutus, Fama, Xenia, Panoptes) behind a single agentic copilot. Built as a Turborepo monorepo on Next.js 15 and Supabase, with Anthropic models as the reasoning layer. The shots below run on keyless demo data — no real client names or figures are exposed.
          </p>
        </section>

        {/* ── Workspace ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            01 / The <em>workspace</em>.
          </h2>
          <p className="aegis-lead">
            One home for the business: the book of business at a glance, every client deployment, and the active pipeline — all fully themed for light and dark.
          </p>
          <div className="aegis-stack-grid">
            {workspaceShots.map((s) => (
              <figure key={s.src} className="aegis-shot">
                <div className="aegis-frame">
                  <img src={s.src} alt={s.label} loading="lazy" />
                </div>
                <figcaption>
                  <b>{s.label}</b>
                  <span>{s.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── Copilot ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            02 / The agentic <em>copilot</em>.
          </h2>
          <p className="aegis-lead">
            The copilot routes each request to the right model tier (a FABLE · DEEP badge shows which), streams live tool action-cards as it works the workspace, and puts up a confirm-gate before any write. It is the control surface for the whole firm — ask it to draft a proposal, chase an invoice through Plutus, or run a competitor scan, and watch each step happen.
          </p>
          <div className="aegis-stack-grid">
            {copilotShots.map((s) => (
              <figure key={s.src} className="aegis-shot">
                <div className="aegis-frame">
                  <img src={s.src} alt={s.label} loading="lazy" />
                </div>
                <figcaption>
                  <b>{s.label}</b>
                  <span>{s.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── Growth & ops ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            03 / Growth &amp; <em>ops</em>.
          </h2>
          <p className="aegis-lead">
            The day-to-day of running the practice: a sales funnel from first touch to signed client, a delivery calendar, and per-account notes.
          </p>
          <div className="aegis-stack-grid">
            {growthShots.map((s) => (
              <figure key={s.src} className="aegis-shot">
                <div className="aegis-frame">
                  <img src={s.src} alt={s.label} loading="lazy" />
                </div>
                <figcaption>
                  <b>{s.label}</b>
                  <span>{s.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── Content & intel ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            04 / Products &amp; <em>intel</em>.
          </h2>
          <p className="aegis-lead">
            The owned products and the intelligence that feeds sales: the six micro-engines, a content engine that publishes to the marketing site, and Argus-powered competitor tracking.
          </p>
          <div className="aegis-stack-grid">
            {contentShots.map((s) => (
              <figure key={s.src} className="aegis-shot">
                <div className="aegis-frame">
                  <img src={s.src} alt={s.label} loading="lazy" />
                </div>
                <figcaption>
                  <b>{s.label}</b>
                  <span>{s.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

      </CaseStudyShell>
    </>
  );
}
