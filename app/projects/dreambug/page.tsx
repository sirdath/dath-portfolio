import "../../redesign.css";
import "../case-study.css";
import { CaseStudyShell } from "@/components/redesign/case-study/CaseStudyShell";

export const metadata = {
  title: "DreamBug — Personalized children's storybooks · Dimitris Athinaios",
  description:
    "A personalized children's storybook app that assembles illustrated, age-appropriate books on-demand from a local, cost-free art pipeline. Full case study coming soon.",
};

export default function DreamBugPage() {
  return (
    <CaseStudyShell
      title="DreamBug"
      tagline="A personalized children's storybook app — parents pick a hero and DreamBug assembles illustrated, age-appropriate books on-demand, with a coherent cast and world on every page, from a local cost-free art pipeline."
      categoryText="Mobile · Generative art · Coming soon"
    >
      <section className="aegis-section wrap" style={{ textAlign: "center" }}>
        <span
          className="eyebrow"
          style={{ justifyContent: "center", marginBottom: "1.25rem" }}
        >
          <span className="bar" />
          <b>Coming soon</b>
        </span>
        <h2 className="aegis-h2" style={{ textAlign: "center" }}>
          Full case study <em>coming soon</em>.
        </h2>
        <p className="aegis-lead" style={{ marginLeft: "auto", marginRight: "auto" }}>
          DreamBug is still in the workshop. The full write-up — the reader, the story gallery, and how the local art pipeline keeps a character consistent across a whole book — is on its way. Here&apos;s a first page in the meantime.
        </p>
        <figure className="aegis-shot" style={{ maxWidth: "820px", margin: "2.5rem auto 0" }}>
          <div className="aegis-frame">
            <img
              src="/redesign/dreambug/story-bramwyn-1.webp"
              alt="DreamBug — a first illustrated storybook page"
              loading="lazy"
            />
          </div>
          <figcaption>
            <b>Bramwyn and the Soft Dark</b>
            <span>A page from the pipeline — a warm, lantern-lit bedtime scene.</span>
          </figcaption>
        </figure>
      </section>
    </CaseStudyShell>
  );
}
