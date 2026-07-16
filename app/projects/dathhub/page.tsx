import "../../redesign.css";
import "../case-study.css";
import { CaseStudyShell } from "@/components/redesign/case-study/CaseStudyShell";

export const metadata = {
  title: "DATHHUB — Local-first AI command center · Dimitris Athinaios",
  description:
    "A summonable Tauri desktop command center with persistent AI workspaces, NeuroVault memory, Google Calendar, local voice, and a permission broker for agent actions.",
};

const surfaces = [
  {
    title: "Workspace chats",
    body: "Multiple independent chat panes can run side by side. Each keeps its own transcript, agent session, engine choice, attachments, and compacted memory.",
  },
  {
    title: "Life + work context",
    body: "Calendar, goals, tasks, recent VS Code workspaces, open pull requests, briefs, and project state are first-class views instead of context pasted into a chatbot.",
  },
  {
    title: "Durable memory",
    body: "NeuroVault provides separate local brains, hybrid retrieval, and inspectable notes over MCP. The HUD can recall context without flattening a life into one giant prompt.",
  },
  {
    title: "Voice without a meter",
    body: "Whisper speech-to-text and Kokoro text-to-speech run on-device. Voice is optional, private, and does not add another usage bill.",
  },
];

export default function DathhubPage() {
  return (
    <CaseStudyShell
      title="DATHHUB"
      tagline="A local-first Jarvis for running life and work from one summonable desktop HUD — persistent AI workspaces, memory, calendar, goals, projects, voice, and explicit control over what agents are allowed to do."
      categoryText="AI · Local-first desktop · Agentic systems"
      stats={[
        { value: "⌘⇧Space", label: "Summon anywhere" },
        { value: "3", label: "Runtime layers" },
        { value: "Local", label: "Vault · memory · audit" },
        { value: "OAuth", label: "Subscription billing" },
      ]}
      techStack={[
        "Tauri 2",
        "React 19",
        "TypeScript",
        "Rust",
        "Node.js",
        "Agent SDK",
        "NeuroVault MCP",
        "SQLite",
        "WebSocket",
        "Whisper + Kokoro",
      ]}
    >
      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          00 / What it <em>is</em>.
        </h2>
        <p className="aegis-lead">
          Most AI assistants are another tab. DATHHUB is the control surface around the work itself: a transparent desktop HUD that appears over any app, opens several independent agent workspaces side by side, and connects them to the same local memory, calendar, goals, projects, and permission system. It is a personal operating system rather than a chat skin — built to make the assistant useful across days without surrendering the machine to it.
        </p>
      </section>

      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          01 / One <em>command surface</em>.
        </h2>
        <p className="aegis-lead">
          The Home view combines a live agent workspace with a glanceable day dashboard. Every chat is a durable workspace: close the HUD, switch projects, or restart the app and its transcript and agent session remain recoverable.
        </p>
        <figure className="aegis-arch-feature">
          <div className="aegis-frame">
            <img
              src="/redesign/dathhub/home.webp"
              alt="DATHHUB Home HUD with daily widgets and a live AI workspace"
              loading="eager"
            />
          </div>
          <figcaption>
            <b>Home HUD — agent + operating context</b>
            <span>A privacy-safe capture: the agent explains how it turns calendar, tasks, goals, and priorities into a realistic day plan.</span>
          </figcaption>
        </figure>
      </section>

      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          02 / More than a <em>chat box</em>.
        </h2>
        <div className="nv-arch-notes">
          {surfaces.map((surface, index) => (
            <div className="nv-note" key={surface.title}>
              <span className="nv-note-num">{String(index + 1).padStart(2, "0")} · {surface.title}</span>
              <p>{surface.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          03 / Three-layer <em>runtime</em>.
        </h2>
        <p className="aegis-lead">
          The UI never needs to understand a model provider&apos;s raw message stream. A Rust desktop core owns the machine boundary, a Node sidecar owns agent sessions and tools, and the React HUD consumes one small local protocol.
        </p>
        <pre className="nv-arch-diagram" aria-label="DATHHUB architecture">
{`┌────────────────────────────────────────────────────────────┐
│ React HUD · views · widgets · multi-workspace chat         │
└──────────────────────────┬─────────────────────────────────┘
                           │ Tauri IPC + local WebSocket
             ┌─────────────┴─────────────┐
             │                           │
┌────────────▼────────────┐  ┌───────────▼───────────────────┐
│ Rust desktop core       │  │ Node agent sidecar            │
│ hotkey · tray · vault   │  │ sessions · tools · streaming │
│ watchers · Gatekeeper   │  │ calendar · voice · routing   │
└────────────┬────────────┘  └───────────┬───────────────────┘
             │                           │ stdio MCP
             │               ┌───────────▼───────────────────┐
             └───────────────►│ NeuroVault local memory      │
                             │ SQLite · notes · hybrid recall│
                             └───────────────────────────────┘`}
        </pre>
      </section>

      <section className="aegis-section wrap">
        <h2 className="aegis-h2">
          04 / Permission is a <em>product surface</em>.
        </h2>
        <p className="aegis-lead">
          DATHHUB does not reduce safety to “allow everything” or “decline everything.” Gatekeeper applies deterministic secret and destructive-command blocks first, user rules next, then escalates uncertain actions. Its local audit trail and kill switch make autonomy inspectable and reversible.
        </p>
        <figure className="aegis-arch-feature">
          <div className="aegis-frame">
            <img
              src="/redesign/dathhub/gatekeeper.webp"
              alt="DATHHUB Gatekeeper permission policy dashboard"
              loading="lazy"
            />
          </div>
          <figcaption>
            <b>Gatekeeper — one policy layer for every agent session</b>
            <span>Policy modes, explicit allow/deny rules, trusted sessions, and a kill switch. The live command feed is redacted in this public capture.</span>
          </figcaption>
        </figure>
      </section>

      <section className="aegis-section wrap nv-final">
        <h2 className="aegis-h2">
          05 / The constraint that <em>shaped it</em>.
        </h2>
        <p className="aegis-lead">
          The design brief is deliberately strict: local-first storage, no telemetry, subscription OAuth instead of silent metered API fallback, on-device voice, and human escalation for sensitive actions. Those constraints are not compliance copy added later — they determine the architecture.
        </p>
      </section>
    </CaseStudyShell>
  );
}
