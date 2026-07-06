import "../../redesign.css";
import "../case-study.css";
import { RedesignCursor } from "@/components/redesign/RedesignCursor";
import { CaseStudyShell } from "@/components/redesign/case-study/CaseStudyShell";

export const metadata = {
  title: "Nodebook — On-demand knowledge compiler · Dimitris Athinaios",
  description:
    "Nodebook (node-book.app) turns any topic, link or question into a finished, cited book — chapters, diagrams, math, and a spaced-recall loop so you actually remember it. Next.js 15 web + Expo mobile on Supabase, with a Gemini consensus engine.",
};

const compileShots = [
  {
    src: "/redesign/nodebook/hero.webp",
    label: "Learn anything — and keep it",
    note: "The command surface: type a topic or paste a link, and Nodebook compiles a rigorous, cited lesson that locks into memory with spaced practice.",
  },
  {
    src: "/redesign/nodebook/compile.webp",
    label: "Topic in, understanding out",
    note: "Hand it a topic, get a real cited module taught four ways, then make it stick — quizzes and flip-cards on a spaced schedule.",
  },
];

const libraryShots = [
  {
    src: "/redesign/nodebook/covers.webp",
    label: "A library that's yours",
    note: "Every compiled lesson becomes a real, on-topic cover — a shelf of knowledge built one compile at a time, not a stack of stock gradients.",
  },
  {
    src: "/redesign/nodebook/practice.webp",
    label: "Practice that beats forgetting",
    note: "Each module ships with a 12–16 question bank and flip-cards on a spaced-repetition schedule, plus a deterministic Daily Review.",
  },
];

export default function NodebookPage() {
  return (
    <>
      <RedesignCursor />
      <CaseStudyShell
        title="Nodebook"
        tagline="An on-demand knowledge compiler. Submit a topic, a link or a question and Nodebook compiles a beautiful, finished book — chapters, diagrams, math and cited sources — then wraps it in a spaced-recall loop so you finish the module, trust it, and still remember it next month."
        categoryText="AI · Learning · Web + mobile"
        stats={[
          { value: "Web + iOS", label: "Next.js + Expo" },
          { value: "Cited", label: "Grounded synthesis" },
          { value: "Spaced", label: "Recall by design" },
          { value: "node-book.app", label: "Live" },
        ]}
        techStack={[
          "Next.js 15", "React 19", "Expo / React Native", "TypeScript", "Supabase", "KaTeX", "Gemini", "Tailwind 4", "Vercel",
        ]}
      >

        {/* ── Context ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            00 / What it <em>is</em>.
          </h2>
          <p className="aegis-lead">
            The promise isn&apos;t access to information — it&apos;s retention and trust. Where ChatGPT is ephemeral, Wikipedia unguided, and podcasts passive, Nodebook pairs grounded, cited synthesis with a book-shaped container and a spaced-recall loop. It&apos;s built as a pnpm monorepo: a Next.js 15 web app on Vercel with Supabase auth and row-level security, and an Expo (React Native) app for iOS and Android sharing the same backend — with KaTeX for real math and a Gemini consensus engine grounding every module in sources. Live at node-book.app.
          </p>
        </section>

        {/* ── Compile ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            01 / Topic in, understanding <em>out</em>.
          </h2>
          <p className="aegis-lead">
            You hand it a topic; it hands back a clear, cited module taught four ways — plain, worked example, metaphor, and visual — then immediately turns that into retrieval practice. Compilation is grounded in real sources, not a single model&apos;s guess.
          </p>
          <div className="aegis-stack-grid">
            {compileShots.map((s) => (
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

        {/* ── Library + practice ── */}
        <section className="aegis-section wrap">
          <h2 className="aegis-h2">
            02 / A library that <em>sticks</em>.
          </h2>
          <p className="aegis-lead">
            Everything you compile is kept — a growing shelf of on-topic covers — and everything you learn is defended against forgetting with a spaced-repetition question bank and a deterministic Daily Review.
          </p>
          <div className="aegis-stack-grid">
            {libraryShots.map((s) => (
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
