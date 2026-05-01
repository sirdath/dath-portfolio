# Portfolio Components Rundown

> Snapshot for handing off to another Claude session. As of 2026-05-01, commit `e7ced6b`.
> Live: https://daththeanalyst.github.io/dath-portfolio/
> Repo: https://github.com/daththeanalyst/dath-portfolio

---

## ⚡ TL;DR - what this site is

Next.js 16 portfolio for **Dimitrios Athinaios** - Data Scientist & AI Engineer based in London, UCL MSc Business Analytics. Static export to GitHub Pages at `basePath: /dath-portfolio`. Dark cyberpunk theme (cyan `#00f0ff` + purple `#a855f7` accents on `#09090b` void background).

7 projects. Single-page composition with hero + project atlas globe + project bento grid + timeline + certifications + contact, plus dynamic project detail pages at `/projects/[slug]`.

---

## 🏗️ Stack

| Layer | Tech | Notes |
|-------|------|-------|
| Framework | Next.js 16.1.6 (App Router) | `output: 'export'` for static |
| React | 19.2.3 | client components throughout |
| Styling | Tailwind CSS v4 | `@theme inline` for tokens, `@layer components` for utilities |
| Animation | Framer Motion v12 | `useScroll`, `useTransform`, `useMotionValue`, `useSpring` |
| 3D | Three.js + @react-three/fiber + @react-three/drei | particle globes, shader dot grid |
| Globe | react-globe.gl 2.37.1 | Project Atlas with NASA earth-blue-marble texture |
| Fonts | Inter (body), Space Grotesk (headings), Playfair Display (display), JetBrains Mono (code) | all `display: 'swap'` |
| Icons | lucide-react | inline SVG icons |
| Deploy | gh-pages → GitHub Pages | `npm run deploy` |

---

## 📁 File structure

```
DATH-PERSONAL-PORTFOLIO/
├── app/
│   ├── globals.css              ← theme tokens, beacon CSS, contact mesh keyframes
│   ├── layout.tsx               ← fonts, CustomCursor mount
│   ├── page.tsx                 ← homepage composition
│   ├── icon.svg                 ← favicon (white DA monogram)
│   └── projects/
│       └── [slug]/page.tsx      ← dynamic project detail page
├── components/
│   ├── magicui/                 ← MagicUI primitives (marquee, retro-grid, safari)
│   ├── projects/
│   │   └── ProjectDetailSections.tsx   ← rich detail sections
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── TechMarquee.tsx
│   │   ├── GlobeSection.tsx     ← Project Atlas (real Earth + beacons)
│   │   ├── ProjectShowcase.tsx  ← bento grid
│   │   ├── TimelineSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   └── ContactSection.tsx   ← dramatic redesign
│   ├── shared/
│   │   ├── BackButton.tsx       ← uses router.back() for scroll restoration
│   │   ├── DathLogo.tsx         ← angular DA monogram, white, top-left fixed
│   │   ├── EncryptedText.tsx    ← cipher-decode reveal animation
│   │   ├── GlowButton.tsx       ← animated CTA
│   │   └── ProjectCard.tsx      ← bento card with spotlight hover
│   └── ui/
│       ├── Background3D.tsx     ← old particle globe (KEPT for revert)
│       ├── Background3DLazy.tsx ← old lazy wrapper (KEPT)
│       ├── CustomCursor.tsx     ← DA logo cursor with mix-blend-difference
│       ├── ShaderDotGrid.tsx    ← NEW: interactive shader dot grid background
│       └── ShaderDotGridLazy.tsx ← lazy wrapper, ssr:false
├── data/
│   └── projects.ts              ← 7 projects with full detailContent
├── lib/
│   ├── assets.ts                ← getAssetPath() helper for basePath prefixing
│   └── utils.ts                 ← cn() class merger
├── public/
│   ├── images/
│   │   └── projects/
│   │       ├── *.svg            ← bento card thumbnails (one per project)
│   │       └── heroes/
│   │           └── *-hero.svg   ← detail page hero backgrounds
│   └── logos/
│       └── da-logo.svg          ← unused now, kept for reference
├── INSPIRATION.md               ← massive vault of patterns, libraries, refs
├── COMPONENTS.md                ← this file
├── memory/
│   └── portfolio_feature_ideas.md ← in-flight feature ideas
└── package.json
```

---

## 🧩 Component-by-component breakdown

### Background

#### `components/ui/ShaderDotGrid.tsx` ⭐ (NEW - current background)
**Purpose:** Interactive shader-based dot grid covering the entire viewport behind all content.
**How it works:**
- Custom GLSL fragment shader on a fullscreen `planeGeometry` quad
- 55×55 grid of cyan/purple SDF dots (Signed Distance Function for crisp circles)
- Tracks last 8 mouse positions in a circular buffer with 0.7s lifetime each
- Each trail point fades intensity over its lifetime
- Dots within 0.18 distance of any trail point scale 6× bigger + brighten 5×
- Cyan→purple gradient based on radial position + time
- Slow ambient pulse (0.3Hz radial mask from center)
**Performance:** Single draw call, ~3KB shader. DPR clamped to [1,2]. High-performance GPU mode.
**Mouse tracking:** Window-level listener (NOT canvas pointer events) so it works even with `pointer-events: none` on canvas.
**Usage:** Imported in `app/page.tsx` via `ShaderDotGridLazy` (next/dynamic, ssr:false).

#### `components/ui/Background3D.tsx` (old, kept for revert)
Three.js particle globe with 1500 cyan particles + auto-rotation. Replaced by ShaderDotGrid but kept in repo. Re-enable by swapping import in `app/page.tsx`.

---

### Cursor

#### `components/ui/CustomCursor.tsx`
**Purpose:** Custom cursor that replaces the native pointer with the DA monogram on devices with precise pointers.
**How it works:**
- 1.5px tracking dot (exact pointer position) using `mix-blend-difference`
- DA logo SVG (44×18px, white) follows with spring-smoothed lag (stiffness 220, damping 22, mass 0.55)
- On hover over `a`, `button`, `[role="button"]`, `[data-cursor-hover]`: dot vanishes, logo scales 1.6×
- Hidden via `@media (pointer: fine)` not matching (touch devices skip entirely)
**Usage:** Mounted globally in `app/layout.tsx`.

---

### Sections (in order on homepage)

#### `components/sections/Hero.tsx`
**Purpose:** First-screen hero with name, role, CTAs.
**Features:**
- Status badge with pulsing cyan dot
- 3D mouse-tracking tilt on the name container (perspective 900, max ±4°)
- "Dimitrios" rendered via `EncryptedText` component (cipher decode reveal)
- "Athinaios" rendered with letter-by-letter blur reveal (per-letter motion stagger)
- Both names in Playfair Display, italic for surname
- Animated underline (gradient line scaleX 0→1)
- Subtitle: "Data Scientist · AI Engineer · MSc @ UCL"
- Two CTAs: "View Projects" (white pill) + "Get in touch" (bordered with mail icon)
- Sparkles overlay (60 cyan twinkling particles drifting upward)
- Scroll indicator at bottom (clickable)
- Top-right meta line: "London · UCL · 2026"

#### `components/sections/TechMarquee.tsx`
**Purpose:** Horizontal scrolling tech logos. Uses `magicui/marquee.tsx`.

#### `components/sections/GlobeSection.tsx` ⭐ (Project Atlas)
**Purpose:** Interactive 3D Earth with project beacons at real-world locations.
**Features:**
- Real Earth (NASA `earth-blue-marble.jpg` daytime texture + topology bump map)
- Light blue atmosphere halo (`#88ccff`)
- Auto-rotates at 0.35 speed
- 7 HTML beacons (chill version):
  - 90px vertical light beam
  - 14px pulsing core with white-hot inner dot
  - Single radar ring (was 2 - toned down)
  - Glassmorphic floating label with project number, name, region
  - Each beacon uses a unique color (no duplicates):
    - 01 NeuroVault: teal `#22d3ee`
    - 02 AEGIS: cyan `#00f0ff`
    - 03 London Synergy: purple `#a855f7`
    - 04 Housing & Crime: magenta `#ec4899`
    - 05 RiskTerrain: amber `#f59e0b`
    - 06 Data Engineering: emerald `#10b981`
    - 07 Dataportfolio: rose `#f43f5e`
- Surface-level pulsing rings via `react-globe.gl` `ringsData`
- Animated dashed arcs (Strait of Hormuz → London → NYC, shipping route metaphor)
- Click pin → camera flies to location (1.5s smooth zoom)
- Symmetric 50/50 grid layout (globe canvas + side panel)
- Side panel: AnimatePresence active project card with project-color tinted background, big project number, Playfair italic title, monospace coordinates, tech pills, "Open project" CTA. Plus full beacon list with active row indicator (Framer Motion `layoutId`). Plus 7/4/3 stats footer.
- Live status indicator top-left ("LIVE · 7 BEACONS · 4 REGIONS")
- Coordinate readout bottom-left that updates with selection

**CSS:** Beacon classes in `app/globals.css` (`.beacon-wrap`, `.beacon-beam`, `.beacon-core`, `.beacon-ring`, `.beacon-label`).

#### `components/sections/ProjectShowcase.tsx`
**Purpose:** Bento grid of all 7 projects with `gridSpan` based layout (large/tall/wide/normal).
**Features:** Uses `ProjectCard` for each project. Section header with eyebrow + Playfair title + animated underline.

#### `components/sections/TimelineSection.tsx`
**Purpose:** Career timeline with vertical line + alternating side cards. Section header pattern matches showcase.

#### `components/sections/CertificationsSection.tsx`
**Purpose:** Two-column layout (certs + relevant coursework). Glass cards with hover lift.

#### `components/sections/ContactSection.tsx` ⭐ (DRAMATIC redesign)
**Purpose:** Final section before footer. Full-width centered, no left/right column split.
**Features:**
- 3 drifting blurred orbs (cyan, purple, magenta) with `mesh-drift-1/2/3` keyframes
- Dotted grid pattern overlay (3% opacity)
- Pulsing dot eyebrow ("Let's Connect")
- Massive Playfair headline: "Ready to build something extraordinary?" with `text-shimmer-cyan` class on "extraordinary" (gradient sweep animation)
- Description paragraph
- 3 contact cards (Email/LinkedIn/GitHub):
  - Each with project-color icon, label, mono sublabel
  - Hover: spotlight + top accent line + arrow lift
  - `data-cursor-label` for cursor hover labels
- Languages section with elegant cards + animated proficiency bars:
  - Greek (100), English (95), Spanish (50)
  - Cyan-to-purple gradient bars grow on view
  - Flag emojis + level labels
- Bottom signature: "Made with care · London · 2026"

---

### Shared components

#### `components/shared/DathLogo.tsx`
**Purpose:** Top-left fixed logo, scrolls to top on click.
**Visual:** Pure white angular DA monogram (octagonal D + angular A with crossbar), 68×26px. Soft white drop-shadow brightens on hover (1.06× scale). No frame, no ticks - minimal.

#### `components/shared/EncryptedText.tsx`
**Purpose:** Cipher decode reveal animation. Used on "Dimitrios" in hero.
**How it works:** Each character cycles through random letters before settling. Per-char delay creates a wave. Uses `requestAnimationFrame` loop, `performance.now()` for timing.
**Props:** `text`, `delay`, `className`, `totalDurationMs`, `perCharDelayMs`.

#### `components/shared/ProjectCard.tsx`
**Purpose:** Bento grid card for each project.
**Features:**
- Cursor-tracked radial spotlight (cyan→purple gradient follows mouse over card)
- Static glow on hover from top
- Media (image/video/gif) with subtle scale + lift on hover
- Category badge + Featured badge if applicable
- Title with cyan hover color (was rainbow gradient - simplified for performance)
- Tech stack pills (first 4 + count of remaining)
- GitHub/LiveURL icons (revealed on hover)

#### `components/shared/BackButton.tsx`
**Purpose:** Back navigation on project detail pages.
**How it works:** Uses `router.back()` (not `<Link href="/">`) so browser scroll position is restored when returning to homepage.

#### `components/shared/GlowButton.tsx`
**Purpose:** Reusable animated CTA. Used in Contact section's email button.

---

### Project detail page

#### `app/projects/[slug]/page.tsx`
Server component. Reads `projects` data, finds project by slug, renders enhanced or simple layout based on `detailContent` presence.

#### `components/projects/ProjectDetailSections.tsx`
Client component for rich detail sections with Framer Motion `whileInView` animations.
**Renders (when present):**
- Overview paragraph
- Architecture diagram (`<pre>` with mono font, glass card, cyan border)
- Key features grid (glass cards with cyan dot bullets, 2-column on desktop)
- Content sections (heading + body + bullets)
- Data sources table (glass-styled with alternating row opacity)
- API endpoints table (method badges: GET=cyan, POST=purple)

---

### UI primitives

#### `components/ui/Sparkles.tsx`
**Purpose:** Twinkling cyan particles drifting upward through the hero.
**How it works:** Canvas 2D, 60 particles with varying size/opacity/twinkle phase. ResizeObserver for parent dimension tracking.

#### `components/magicui/marquee.tsx`
MagicUI primitive used by `TechMarquee`.

#### `components/magicui/safari.tsx`
Browser frame component used by `ProjectCard` for video/gif media.

#### `components/magicui/retro-grid.tsx`
Available but currently unused.

---

## 🎨 Design tokens (in `app/globals.css`)

```css
@theme inline {
  --color-void: #09090b;            /* main background */
  --color-obsidian: #0c0c14;
  --color-surface: #111118;
  --color-surface-light: #1a1a24;
  --color-accent-cyan: #00f0ff;     /* primary accent */
  --color-accent-purple: #a855f7;
  --color-accent-teal: #22d3ee;
  --color-accent-magenta: #ec4899;
  --color-text-primary: #f0f0f0;
  --color-text-muted: #a1a1aa;
  --color-text-dim: #52525b;
  --color-glass-border: rgba(255, 255, 255, 0.08);
  --color-glass-bg: rgba(255, 255, 255, 0.03);

  --font-heading: var(--font-space-grotesk);
  --font-body: var(--font-inter);
  --font-mono: var(--font-jetbrains-mono);
  --font-display: var(--font-playfair);
}
```

**Custom animations defined:**
- `border-rotate` - conic gradient angle for animated borders
- `marquee` / `marquee-reverse` / `marquee-vertical` / `marquee-vertical-reverse`
- `grid-scroll` - 60px vertical scroll
- `beacon-pulse` - chill version (1 → 1.25 scale, 3.2s)
- `beacon-ring` - radar ring expansion (0.6 → 2.8 scale, 3.6s)
- `beacon-beam-pulse` - beam scale + opacity, 3.6s
- `mesh-drift-1/2/3` - drifting blurred orbs in Contact section
- `shimmer-sweep` - gradient text shimmer
- `lang-bar-grow` - proficiency bar grow

**Custom utility classes:**
- `.glass` - frosted glass (8px blur)
- `.glow-cyan` / `.glow-purple` / `.glow-text-cyan`
- `.animated-border` - conic gradient rotating border
- `.text-shimmer-cyan` - shimmer-sweeping text gradient
- `.beacon-*` - Project Atlas beacon styles
- `.animate-marquee*` - marquee variants

---

## 📊 Project data (`data/projects.ts`)

7 projects, all with `featured`, `category`, `gridSpan`, full `detailContent`:

| # | id | category | gridSpan | Featured |
|---|-----|---------|---------|----------|
| 0 | neurovault | ai | large | ✅ |
| 1 | aegis | ai | large | ✅ |
| 2 | london-synergy-index | geospatial | large | ✅ |
| 3 | housing-crime-analysis | geospatial | tall | ✅ |
| 4 | risk-terrain | ai | wide | ✅ |
| 5 | data-engineering-pipeline | data-engineering | normal | |
| 6 | dataportfolio | fullstack | normal | |

`detailContent` shape:
```ts
{
  overview: string;
  sections: { heading; body; bullets? }[];
  architectureDiagram?: string;  // ASCII
  keyFeatures?: string[];
  dataSources?: { name; type; details }[];
  apiEndpoints?: { method; path; description }[];
}
```

---

## 🔍 Key files to look at first

If a future session is asked to modify the portfolio, here's the priority order:

1. **`app/page.tsx`** - section order, what's rendered
2. **`data/projects.ts`** - all project data + types
3. **`app/globals.css`** - theme tokens, animations
4. **`components/sections/Hero.tsx`** - first-screen hero
5. **`components/sections/GlobeSection.tsx`** - Project Atlas (most complex section)
6. **`components/sections/ContactSection.tsx`** - last section before footer
7. **`components/shared/ProjectCard.tsx`** - bento card
8. **`components/ui/ShaderDotGrid.tsx`** - current background

---

## 🚧 In-flight feature ideas (not yet built)

From `memory/portfolio_feature_ideas.md`:

1. **Fake AI chatbot** with predetermined messages (AEGIS multi-agent themed, no real LLM)
2. **Hex genesis transition** for Projects section (3D hexagon fractures into cards on scroll)
3. **Custom domain** dataportfolio.co.uk (DNS via GoDaddy, currently on `daththeanalyst.github.io/dath-portfolio`)

User has dismissed these for now but flagged them as future signature features.

---

## ⚙️ Commands

```bash
npm run dev          # local dev at http://localhost:3000
npm run build        # static export to ./out
npm run deploy       # push ./out to gh-pages branch
```

---

## 📚 Reference docs in repo

- `INSPIRATION.md` - comprehensive vault of patterns, libraries (globe.gl, vanta.js, Galaxy/Uiverse, Babylon.js), Codrops tutorials, Aceternity UI catalog, master library matrix
- `COMPONENTS.md` - this file (component-by-component breakdown for handoff)
- `memory/` - auto-memory dir, ignored by build

---

*Snapshot: 2026-05-01, commit `e7ced6b`. Pull latest before editing.*
