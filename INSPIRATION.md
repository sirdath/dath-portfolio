# Portfolio Inspiration Vault

> Raw dump of every cool pattern, animation, 3D effect, transition, and signature element collected from:
> - **DATHSTEL** (ds-site monorepo at `c:/Users/Dath/OneDrive/Desktop/DATHSTEL/`)
> - **frontendmaxxing** (`c:/Users/Dath/OneDrive/Desktop/AntiGravity Stuff/frontendmaxxing/` + `DATHSTEL/packages/frontendmaxxing-reference/`)
> - **inspoemergent** repo (20 hero variants V01-V20, in `frontendmaxxing-reference/external-repos/`)
> - **21st.dev Magic MCP** queries
>
> Use this as a buffet - pick what fits the moment. Every entry has a file path or component name so you can pull the actual code.

---

## TABLE OF CONTENTS

1. [Hero Sections & Animated Backgrounds](#1-hero-sections--animated-backgrounds)
2. [The 20 Hero Variants (V01-V20)](#2-the-20-hero-variants-v01-v20)
3. [Project Showcases / Bento Grids](#3-project-showcases--bento-grids)
4. [Project Detail Pages](#4-project-detail-pages)
5. [3D Backgrounds & Canvas Scenes](#5-3d-backgrounds--canvas-scenes)
6. [Mouse Cursor Effects](#6-mouse-cursor-effects)
7. [Text Effects & Typography](#7-text-effects--typography)
8. [Navigation Patterns](#8-navigation-patterns)
9. [Page Transitions](#9-page-transitions)
10. [Cards & Hover Effects](#10-cards--hover-effects)
11. [Section Layouts](#11-section-layouts)
12. [Contact Sections & Footers](#12-contact-sections--footers)
13. [Buttons & CTAs](#13-buttons--ctas)
14. [Scroll Animations](#14-scroll-animations)
15. [Marquees & Tickers](#15-marquees--tickers)
16. [Glassmorphism & Visual Effects](#16-glassmorphism--visual-effects)
17. [Loaders & Micro-interactions](#17-loaders--micro-interactions)
18. [Distortion & Glitch Effects](#18-distortion--glitch-effects)
19. [Particle Systems](#19-particle-systems)
20. [Performance & Accessibility](#20-performance--accessibility)
21. [Design Tokens & Typography Hierarchy](#21-design-tokens--typography-hierarchy)
22. [Magic MCP Component Sources](#22-magic-mcp-component-sources)

---

## 1. HERO SECTIONS & ANIMATED BACKGROUNDS

### From DATHSTEL ds-site

**1.1 AnimParticleAssembly** | `apps/ds-site/src/components/heroes/anim-particle-assembly.tsx`
WebGL/Three.js particles spawn in chaos, assemble into logo via attribute-based shaders. Cursor repulsion field with smoothstep falloff. **Why impressive:** Cubic-bezier easing in vertex shader, additive blending, depth writes disabled for crisp overlaps.

**1.2 AnimIsosurface** | `apps/ds-site/src/components/heroes/anim-isosurface.tsx`
Marching-cubes metaballs morph between drift and logo silhouette. PBR chrome with clearcoat 1.0, metalness 0.95, rim lighting. Mouse attracts an extra ball.

**1.3 AnimIronFilings** | `apps/ds-site/src/components/heroes/anim-iron-filings.tsx`
Pure Canvas 2D - particles trace tangent-field flow along logo brightness gradient (perpendicular to gradient = field lines wrapping letters). Cursor swirl pole. Lightweight, no GPU.

**1.4 AnimAsciiRain** | `apps/ds-site/src/components/heroes/anim-ascii-rain.tsx`
Monospaced glyphs drift; brightness sampled from logo controls which character appears (10-char scale). Cursor scrambles nearby chars. Ultra-light, no WebGL.

**1.5 AnimRaymarch** | `apps/ds-site/src/components/heroes/anim-raymarch.tsx`
GLSL fragment shader raymarches an SDF rounded-box with logo etched into surface. 80 iterations, normal sampling via 4-tap finite differences, refraction + reflection + Fresnel (power 3.5). Orbit camera follows mouse.

**1.6 AnimStrata** | `apps/ds-site/src/components/heroes/anim-strata.tsx`
9 z-stacked logo planes at varying depths, additive blending, parallax follows cursor. Depth recession via cyan→white tint. Slow breath via scale sin oscillation.

**1.7 HeroShell** | `apps/ds-site/src/components/heroes/hero-shell.tsx`
Wrapper for any animation: darkening veil (multi-stop radial+linear gradient stack 55%→20%→65%), candidate badge with glowing dot, text overlay with pointer-events separation.

### From Magic MCP

**1.8 Ethereal Cinematic Hero** (Magic MCP "Ethereal")
Three.js Icosahedron with custom GLSL: cosine palette gradients, Cook-Torrance BRDF (3 moving lights), GGX distribution, animated palette crossfade per scroll section. Post-processing: UnrealBloom + ACES filmic + chromatic aberration + grain + vignette + letterbox.

**1.9 Digital Serenity** (Magic MCP)
Slate gradient minimal landing. Word-appear staggered animations with blur(10px)→blur(0) transitions. Mouse-following radial gradient overlay. Click ripples. SVG grid lines drawing in (stroke-dashoffset).

**1.10 Hero Designali** (Magic MCP)
Animated canvas with mouse-tracking color trails - HSL-cycling Bezier lines following cursor. Plus shape positioned at corners. ShineBorder component with conic-gradient animation. Available-now pulsing dot.

**1.11 Portfolio Hero (Alex Kane)** (Magic MCP)
Massive ALEX/KANE typography in Fira Code monospace, blur-text reveal letter-by-letter, profile picture overlapping huge name centered. Theme toggle (dark/light), menu panel slide-down.

**1.12 Hero 03** (Magic MCP)
Massive 10rem serif typography "DIGITAL PRODUCTS DESIGN/CODE" with inline icons (heart SVG between letters). Vertical "Design Award" badge fixed to right edge. Background dot grid pattern.

---

## 2. THE 20 HERO VARIANTS (V01-V20)

> Located in `DATHSTEL/packages/frontendmaxxing-reference/external-repos/inspoemergent/frontend/src/components/variants/`
> Most use a `sampleLogo` helper that converts logo PNG to brightness map.

| # | Name | Technique | One-line description |
|---|------|-----------|----------------------|
| **V01** | Particles | WebGL + vertex shaders | Pixels assemble from chaos sphere; cursor repulsion field |
| **V02** | MagneticGrid | WebGL instanced points | 200×80 dot lattice; brightness controls dot size; cursor attracts dots with pull field + z-ripple |
| **V03** | LiquidRipple | Canvas 2D | Logo via horizontal slice displacement; radial ripples from cursor; click-to-drop wave |
| **V04** | Shards | Canvas 2D | Logo split into 26×14 rectangular shards; cursor repels; scroll shatters with rotation |
| **V05** | Voxels | WebGL InstancedMesh | 3D cubes height-extruded by brightness; mouse lift, wave anim, gentle orbit camera |
| **V06** | Smoke | WebGL additive blending | Particles bloom with personal smoke trajectory; cursor pushes aside; scroll increases density |
| **V07** | FisheyeDots | Canvas 2D | 160×80 dot grid with fisheye bulge lens distortion at cursor; quadratic falloff |
| **V08** | EchoTrail | Canvas/WebGL trail buffer | Particles with fading trails that echo behind movement |
| **V09** | RGBGlitch | Canvas 2D channel split | RGB decomposition with screen blending; cursor drives chromatic aberration; scroll = glitch slices + scanlines |
| **V10** | ASCII | Canvas 2D monospace | Logo as 15-char monospaced ASCII; cursor scrambles glyphs; scroll increases chaos |
| **V11** | FluidSmear | Canvas 2D / WebGL | Fluid simulation or smear distortion |
| **V12** | MarqueeMask | Canvas 2D mask blend | Text marquee with animated mask |
| **V13** | MagneticField (Iron Filings) | Canvas 2D + Sobel gradient | Field lines flow along brightness gradient; ambient curl noise; cursor swirl pole |
| **V14** | HoloCard | Framer Motion 3D | Tilting card with holographic logo (3× RGB-shifted + crisp white); mouse rotateX/Y; chromatic split; conic light sweep |
| **V15** | VerletMesh | Canvas 2D + Verlet physics | 2D spring mesh from logo outline (step 9); cursor drag/swirl; spring tension colors |
| **V16** | LiquidGlass | WebGL/Canvas morphing | Liquid-glass morphing effect |
| **V17** | GravityOrbits | WebGL N-body | Particles orbit under gravity simulation |
| **V18** | DepthDiorama | WebGL/Canvas depth-sort | Layered depth-based parallax diorama |
| **V19** | SpectrumBars | Canvas 2D / WebGL | Frequency-spectrum bar animation |
| **V20** | NeonRain | Canvas 2D | Neon wireframe outline via edge detection + breathing glow; binary rain inside strokes; cursor makes outline glow red; CRT vignette |

---

## 3. PROJECT SHOWCASES / BENTO GRIDS

### From Magic MCP

**3.1 Colorful Bento Grid**
Asymmetric bento (3-col × 3-row) with pastel-tinted cards. Each card has a tagline pill ("1,000 Downloads") + main bold pill ("UX + Product-Led"). On hover: `scale-105 + rotate-1/-3 + shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)]`. Each card has slightly different rotation direction.

**3.2 BentoGridShowcase**
Slot-based 3-col grid with `md:row-span-3` for tall main feature card, `md:row-span-2` for stat card. Framer Motion stagger container variant (0.1s delay, 0.1s stagger). Spring physics on items (stiffness 100, damping 10).

**3.3 BentoGridWithFeatures (Ali Imam style)**
6-col grid with mixed `lg:col-span-2/4/6` widths. Border-divided cells (border-r/border-b on each card). Skeleton with rotated overlapping image stack - group-hover unrotates and scales. Yellow (#fff200) accent for hover state.

### From DATHSTEL

**3.4 Proof Section** | `apps/ds-site/src/components/sections/proof.tsx`
Case studies in 2-column layout (header + story). Each card: `Challenge / Approach / Outcome` subsections with `text-xs uppercase` labels. Asymmetric `md:grid-cols-[1fr_2fr]` split. Tag badges add visual rhythm.

---

## 4. PROJECT DETAIL PAGES

### Patterns to consider

- **Sticky nav scroll-link**: ScrollLegend pattern (left side of viewport, dashes indicate sections, active dash is wider + colored)
- **Hero media banner**: 70vh full-width image/video with title overlay + back button
- **Architecture diagram**: ASCII art in `<pre>` with mono font in glass card with cyan border
- **Key features grid**: Glass cards with cyan dot bullets, 2-column on desktop
- **Data tables**: Glass-styled with alternating row opacity; method badges (GET=cyan, POST=purple)
- **Image gallery**: Tilt-on-hover (V14 HoloCard pattern) for screenshots
- **Sources/references**: Link blocks with external arrow icon, hover underline grow

---

## 5. 3D BACKGROUNDS & CANVAS SCENES

**5.1 CanvasBackground** | `apps/ds-site/src/components/canvas-background.tsx`
React Three Fiber. 100 instanced icosahedrons on scroll parallax + gentle rotation. Stars environment with fade + speed. Floating group with slow drift.
**Technique:** `<Instances>` (single draw call), dummy matrix copy pattern, `<Stars>` primitive.

**5.2 AnimatedLogo3D** | `apps/ds-site/src/components/animated-logo-3d.tsx`
3D text via `drei.Text` with `meshPhysicalMaterial` (metalness 0.8, clearcoat). Float + PresentationControls. Hover smoothly lerps emissive intensity.

**5.3 Particles.js Presets** | `frontendmaxxing/effects/particles.js`
Canvas 2D particle system with 5 presets: network, starfield, snow, fireflies, bubbles. Mouse repulsion, spatial hashing for connect-on-proximity.

**5.4 Three.js Marching Cubes** (V05/Isosurface)
Use for organic blob shapes that morph between forms. Heavy but stunning.

---

## 6. MOUSE CURSOR EFFECTS

### From DATHSTEL

**6.1 Cursor (logo follower)** | `apps/inspo-gallery/src/components/Cursor.tsx`
28×28px image cursor follows pointer with `useMotionValue` + RAF + transform3d. Hidden on touch via `(pointer: fine)` media query. Two-layer drop-shadow for legibility on any background.

### From frontendmaxxing/effects/cursor-effects.js

**6.2 CursorFX presets**:
- `custom` - replace cursor, grow on interactive elements
- `trail` - cascading dot trail
- `magnetic` - pull toward cursor with smoothing lerp
- `spotlight` - radial gradient overlay following cursor

### From Magic MCP

**6.3 MagneticCursor** (Magic MCP "Fluid Magnetic Cursor")
GSAP-driven cursor with vec2 physics. Uses `data-magnetic` attribute on elements. Features:
- Speed-based scaleX/Y stretch (rotation toward velocity vector)
- On hover: morphs to wrap target element bounds
- `mix-blend-mode: exclusion` for auto-contrast on any background
- `backdrop-filter: contrast(1.5)` for visibility on low-contrast bg
- Elastic ease for magnetic snap (`elastic.out(1, 0.3)`)

**6.4 CursorFX Engine** (Magic MCP "Cursor")
Full canvas-based engine with:
- Tapered light trails (HSL color shift by speed)
- Magnetic particle swarm (50-pop, attract toward cursor)
- Glass refraction effect
- White glowing core with shadowBlur 20

**6.5 Pointer (Motion)** (Magic MCP)
Replace cursor with custom React component (emoji, animated SVG, etc). Sets parent `cursor: none`, listens for mouseenter/leave/move on parent only. AnimatePresence for graceful enter/exit.

---

## 7. TEXT EFFECTS & TYPOGRAPHY

### From frontendmaxxing/effects/text-reveal.js + text-wave.js

**7.1 Split text reveal** - char/word/line splitter with stagger animation. Effects:
- `fadeUp` - opacity + translateY
- `scaleIn` - opacity + scale
- `rotateIn` - opacity + rotateX
- `typewriter` - cursor + char-by-char
- `scramble/decode` - random chars cycling to final

**7.2 Text wave** - character blur/scale/opacity wave cascade. Auto-loop timing scaled to text length.

### From Magic MCP

**7.3 WhisperText** (GSAP ScrollTrigger)
Words slide in from offset (x or y) with staggered delay. Triggered by ScrollTrigger at `top 90%`. `power2.out` ease.

**7.4 TextReveal (Cinematic)** (Magic MCP)
Per-character animation: `blur(12px) → blur(0)`, translateY 40% → 0, scale 1.1 → 1. `cubic-bezier(0.16, 1, 0.3, 1)` (back-out). 0.04s delay multiplier per char index. Replay button with shine animation.

**7.5 TextRevealEffect** (GSAP variants)
7 reveal variants: `revealX/Y/XY` and reverse, plus `scale`. Tunable blur, duration, stagger, word/character spacing.

### Typography patterns from DATHSTEL

**7.6 Multi-tier hierarchy** (used throughout):
- `text-xs uppercase tracking-[0.2em]` - labels (eyebrows)
- `text-3xl md:text-4xl font-semibold` - section headings
- `text-sm md:text-base` - body
- Color modulation via opacity scale (ink-100/300/500), not different hues

**7.7 Hero entrance keyframe** | `apps/ds-site/src/app/globals.css`
`@keyframes ds-rise-in` (translateY + opacity) with staggered delay classes 100/200/320/480ms. Respects `prefers-reduced-motion`.

---

## 8. NAVIGATION PATTERNS

### From DATHSTEL

**8.1 SectionIndicator** | `apps/inspo-gallery/src/components/SectionIndicator.tsx`
- Fixed top bar with current section name (Framer Motion `key` animation for swap)
- Side tick marks (clickable jump targets)
- `mix-blend-difference` on top bar = legible on any background
- Tick width animates on hover (tactile feedback)

### From Magic MCP

**8.2 Header (sticky scroll-aware)** (Magic MCP "Header 1")
Sticky header that gets backdrop-blur background only after scrolling 10px (via `useScroll(10)` hook). Mobile menu via React portal with zoom-in animation.

**8.3 FloatingNav (dock-style)** (Magic MCP)
Fixed bottom-center dock with sliding active indicator (Framer Motion spring stiffness 400 / damping 30). Icons + labels. Updates indicator position via `getBoundingClientRect`.

**8.4 ScrollLegend** (Magic MCP)
Left-side fixed dashes (one per section). Active dash widens and changes color. Section name appears on hover only (slide-in from left). Uses scroll position to detect active section.

**8.5 useScroll hook** (Magic MCP)
```ts
function useScroll(threshold: number) {
  // returns boolean - true if scrollY > threshold
}
```
Useful for sticky header backgrounds, scroll-progress bars, etc.

---

## 9. PAGE TRANSITIONS

### From frontendmaxxing/animations

**9.1 ScrollReveal (GSAP + ScrollTrigger)** | `apps/ds-site/src/components/scroll-reveal.tsx`
Wrapper component. Elements fade in + slide up (y: 50) + rotateX on scroll trigger. `transformOrigin: 'top'`, `power3.out`, `toggleActions` for reversible. `perspective: 1000px` on container for 3D depth.

### From Magic MCP

**9.2 ScrollAdventure** (Page-by-page split scroll)
Vertical wheel hijacked for paged navigation. Each page has a left half + right half that slide in opposite directions (one from top, one from bottom). 1000ms transition. Arrow keys also navigate.

**9.3 Ethereal Scroll Hero** (Magic MCP)
Single Three.js mesh persists across sections; on each section enter, animates `uSectionIndex` uniform → palette crossfade. ScrollTrigger pins. GSAP scrub with rotation tied to scroll progress (no auto-rotation).

**9.4 V14 HoloCard 3D Tilt**
Element wrapped in `perspective: 1400px`. Mouse mapped to rotateX (-18°→18°) and rotateY (22°→-22°). Spring-smoothed via `useSpring` (stiffness 130, damping 18, mass 0.6). Highlight position + chromatic shift derived from same spring.

### Concept ideas

**9.5 Card Zoom + 3D Push** - clicked card lifts forward in 3D space, scales to fill viewport, becomes detail page hero. Uses Framer Motion `layoutId` for shared element.

**9.6 Card Flip Reveal** - 180° Y-rotation, back face is new page. CSS `backface-visibility: hidden`.

**9.7 Folding Origami** - 4 page panels rotate away in 3D, revealing detail page underneath.

**9.8 Depth Push** - current page tilts/recedes in z-space, new page comes forward.

**9.9 Browser View Transitions API** - native `document.startViewTransition()` + CSS `view-transition-name` for shared element morphing.

---

## 10. CARDS & HOVER EFFECTS

### From frontendmaxxing/components

**10.1 Card variants** | `frontendmaxxing/components/cards.js`:
- 3D flip on click
- Expandable accordion
- Tilt with glare (perspective + radial-gradient follow mouse)
- Spotlight follow (CSS custom properties `--mouse-x` / `--mouse-y`)

### From Magic MCP

**10.2 InteractiveCard (Tilt + Glare)** (Magic MCP "Tilt Card")
- Mouse position normalized (-50%→50%) → maps to rotateX (-tiltFactor → tiltFactor)
- Hover scale to 1.07
- Box-shadow lifts on hover
- Glare effect: radial-gradient at mouse position with `mix-blend-mode: screen` and rgba intensity

**10.3 SimpleTilt (3D follow mouse)** (Magic MCP)
useMotionValue → useSpring → useTransform pipeline. RotateX/Y from y/x. Default values: 7.5deg max tilt.
- Border outline on hover via AnimatePresence
- `transformStyle: 'preserve-3d'` so children can have `translateZ(50px)` for depth

### Hover patterns from DATHSTEL

**10.4 Subtle hover state** - change `bg-ink-900/60` to `bg-ink-800/40` (opacity-driven, not color-driven). `border-ink-800/60` → `border-ink-700` lightens. **Hover state is restraint, not noise.**

---

## 11. SECTION LAYOUTS

### From DATHSTEL

**11.1 WhatWeDo** | `apps/ds-site/src/components/sections/what-we-do.tsx`
2-col grid of capability cards. Mono numbering (01–05). **Gap-as-grid-border pattern**: gap-px reveals darker color underlay = clean dividers without `<hr>` tags.

**11.2 WhatMakesUsDifferent** | `apps/ds-site/src/components/sections/what-makes-us-different.tsx`
Four principles in 2-col grid. Subtle radial gradient at bottom-right (rgba accent @ 6% opacity). Italic quote at bottom. **Color restraint** (low-opacity accent only) = premium feel.

**11.3 ProcessPreview** | `apps/ds-site/src/components/sections/process-preview.tsx`
7-step timeline with `grid-cols-[auto_1fr_2fr]` (number | title | summary). Mono step numbers create rhythm. `gap-12` for breathing room.

**11.4 TrustSignals** | `apps/ds-site/src/components/sections/trust-signals.tsx`
6 principle cards (3-col) + 2 testimonial cards (2-col). Two-tier visual hierarchy (`bg-ink-950` solid for principles, `bg-ink-900/30` translucent for testimonials).

**11.5 EngageUs** | `apps/ds-site/src/components/sections/engage-us.tsx`
3 engagement paths in 3-col grid. Center card `featured: true` has bright border + different background. Bullet list with `-` separator. `flex-col + mt-auto` to push bullets to bottom.

**11.6 FinalCTA** | `apps/ds-site/src/components/sections/final-cta.tsx`
Centered CTA section with radial-gradient ellipse glow. Two CTAs (primary white pill + secondary bordered) + italic closing quote.

### Container pattern (used everywhere)

**11.7 Container rhythm**: `max-w-6xl mx-auto px-6 md:px-8` - never squished, generous max-w (1536px). Responsive padding 6→8 on md.

---

## 12. CONTACT SECTIONS & FOOTERS

### From Magic MCP

**12.1 Contact Page (3-col bento)** (Magic MCP "Contact Page")
Three boxes: Email / Office / Phone. Each has icon + title + main text + description. Boxes share borders (`border-r md:border-b-0`). Copy-to-clipboard buttons with check/copy icon swap animation. Below: social links as pill buttons. Background: dot grid pattern with radial mask.

**12.2 Modern Footer (Chillbion)** (Magic MCP)
4-col grid. Each column: logo+description / Services / Company / Contact. Social icons as round buttons with gradient hover. Background: SVG grid pattern + ellipse-masked. Pre-footer copyright bar.

**12.3 Minimal Footer**
Single-line footer with copyright + 3 inline links separated by vertical rules. Compact, classy.

### Patterns to remember

**12.4 "Find us online" social pill row** (Contact Page demo)
Social buttons as `bg-muted/50 hover:bg-accent rounded-full px-4 py-2` pills with icon + label. Centered, wraps responsively.

**12.5 Border-shared boxes layout**
`flex flex-col + border-b md:border-r md:border-b-0` - boxes share single-pixel borders without doubling. Header bar (`bg-muted/40` + `border-b`) + body + footer description (`border-t`) within each box.

---

## 13. BUTTONS & CTAs

### From frontendmaxxing/blocks/buttons.js

**13.1 Material ripple** - click creates expanding circle from click point.
**13.2 Magnetic hover** - element translates toward cursor within proximity (typical: 50px range).
**13.3 Submit state machine** - idle → loading (spinner) → success (check) → reset.

### From Magic MCP

**13.4 ShineBorder** (Hero Designali)
Shine animation via `before:` pseudo with `background-size: 300% 300%` + radial gradient + mask composite. Configurable colors via array prop, duration in seconds. Uses `motion-safe:before:animate-[shine-pulse_var(--duration)_infinite_linear]`.

### CTA pair pattern (DATHSTEL)

**13.5 Primary + secondary pair**:
- Primary: `bg-white text-ink-950` solid pill, `hover:bg-ink-100`
- Secondary: `border border-white/40 text-white` pill with `backdrop-blur-sm` and `hover:bg-white/10`
- Used in HeroShell + FinalCTA - classic conversion pattern

---

## 14. SCROLL ANIMATIONS

### Tools available

**14.1 GSAP ScrollTrigger** - scrub-linked scroll, pin sections, toggleActions for reversible reveals
**14.2 Framer Motion `useScroll` + `useTransform`** - scroll progress 0→1 as MotionValue, derived transforms
**14.3 IntersectionObserver** - `whileInView` + `viewport: { once: true, margin: "-50px" }`

### Scroll-driven patterns from DATHSTEL

**14.4 ScrollReveal pattern** | `scroll-reveal.tsx`
```js
gsap.fromTo(elements,
  { opacity: 0, y: 50, rotationX: 10 },
  {
    opacity: 1, y: 0, rotationX: 0,
    duration: 1, ease: 'power3.out',
    transformOrigin: 'top',
    scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' }
  }
);
```

### Scroll progress UX

**14.5 Scroll-linked progress bar** - fixed-top thin bar that grows with scroll percentage. Use Framer's `useScroll().scrollYProgress` mapped to `scaleX`.

**14.6 Velocity-based effects** - `(scrollY - lastY) * 0.01` gives velocity. Use to drive twist/skew/parallax intensity (Ethereal Hero pattern).

---

## 15. MARQUEES & TICKERS

### From DATHSTEL

**15.1 Marquee** | `components/magicui/marquee.tsx` (already in your project)
Horizontal & vertical, customizable speed, pauseOnHover, repeats N times.

### From frontendmaxxing/components

**15.2 Marquee.js** - infinite scrolling text with **velocity from page scroll** (faster scroll = faster marquee). transform translate3d, scroll velocity tracking.

### Ideas to extend

**15.3 Marquee variants**:
- `marquee-fade` - gradient mask at edges
- `marquee-xl` - large typography variant (tech names instead of logos)
- Mix horizontal + vertical (DATHSTEL pattern)
- Reverse-direction pair (one row left, one right)

---

## 16. GLASSMORPHISM & VISUAL EFFECTS

### From DATHSTEL

**16.1 Backdrop blur layers**:
- `backdrop-blur-sm` - buttons (frosted)
- `backdrop-blur-md` - sticky header (legible bg-ink-950/70 + blur)
- Restraint: never `blur-lg` unless decorative
- Heavy `blur(40px) saturate(180%)` for hero glass overlays

**16.2 Multi-layer drop-shadow** - particles + cursors use 2-layer drop-shadow for depth without box-shadow's harsh edges.

**16.3 Subtle radial gradients** - large radial accents at top/bottom-right/center, rgba(accent, 0.06–0.08). Off-center positioning feels intentional.

### From frontendmaxxing/effects/glassmorphism.css

**16.4 Glassmorphism stack**:
- `background: rgba(255,255,255,0.06)`
- `backdrop-filter: blur(20px) saturate(180%)`
- `border: 1px solid rgba(255,255,255,0.12)`
- `box-shadow: 0 8px 32px rgba(0,0,0,0.4) inset 0 1px 0 rgba(255,255,255,0.1)`

### Glow patterns

**16.5 Text glow via drop-shadow** (cursor.tsx) - `drop-shadow(0 1px 2px rgba(0,0,0,0.6))`. Subtler than `text-shadow`.

**16.6 Edge glow on cards** - `box-shadow: 0 0 30px -5px rgba(accent, 0.15)` on hover. Negative spread keeps it tight.

---

## 17. LOADERS & MICRO-INTERACTIONS

### From frontendmaxxing/blocks/loaders.js

**17.1 Spinning rings** - SVG with stroke-dasharray + rotation
**17.2 Progress arcs** - circular progress with stroke-dashoffset transition
**17.3 Skeleton screens** - pulse animation on placeholder rectangles

### From frontendmaxxing/micro/interactions.js

**17.4 Tap feedback ripple** - pointer event triggers expanding circle
**17.5 Long-press detection** - hold timer with cancel on movement
**17.6 Swipe gesture** - velocity calculation from pointer events

---

## 18. DISTORTION & GLITCH EFFECTS

### From frontendmaxxing/effects

**18.1 Distortion.js**:
- **Ripple warp** - scale + skew on event
- **Stretch on velocity** - element stretches in direction of motion
- **Noise jitter** - random translate/rotate (subtle)

**18.2 Glitch CSS** | `frontendmaxxing/effects/glitch.css`
Multiple text layers with offset hue + clip-path bands that animate. Sub-1s glitch flashes.

**18.3 RGB chromatic split** (V09 / V14) - render same element 3× with red/green/blue offsets. Use `mix-blend-mode: screen` on overlapping copies.

---

## 19. PARTICLE SYSTEMS

### From frontendmaxxing/effects/particles.js

**19.1 Particle presets**:
- **Network** - connect lines between near particles
- **Starfield** - 3D-projected dots with z-depth
- **Snow** - gentle falling with horizontal drift
- **Fireflies** - scattered glowing points with breath
- **Bubbles** - rising with size variation

**19.2 Verlet integration** (V15) - physics-accurate springs/cloth without solving full N-body

**19.3 Spatial hashing** - for fast neighbor lookup in dense particle systems

### Cursor field interactions

**19.4 Repulsion field** - `(distance < radius) ? push_outward : 0` with smoothstep falloff
**19.5 Swirl field** - perpendicular tangent vector from center → cursor
**19.6 Attraction** - particles fall toward cursor with velocity damping

---

## 20. PERFORMANCE & ACCESSIBILITY

### Performance optimizations from DATHSTEL

**20.1 DPR clamping** - `Math.min(window.devicePixelRatio, 2)` on all canvas/WebGL
**20.2 Logo sample caching** - `Map<key, Promise<sample>>` prevents re-decode
**20.3 Instanced rendering** - `<Instances>` for repeated geometries (single draw call for 100 particles)
**20.4 Dynamic imports** - `next/dynamic` with `ssr: false` for Three.js bundles (defers ~200KB+)

### Accessibility patterns

**20.5 prefers-reduced-motion** - wrap animations in `@media (prefers-reduced-motion: reduce) { animation: none; transform: none; }`

**20.6 Pointer fine query** - `@media (pointer: fine)` to enable custom cursor only on devices with precise pointers (skip touch).

**20.7 ARIA labels** on icon-only buttons. `role="button"` on interactive divs.

---

## 21. DESIGN TOKENS & TYPOGRAPHY HIERARCHY

### From DATHSTEL

**21.1 Color scale** | `packages/ds-tokens/src/tokens.css`
```
--ink-950: #0a0a0a   (deepest bg)
--ink-900: #111111   (cards)
--ink-800: #1f1f1f   (borders)
--ink-300: #b3b3b3   (secondary text)
--ink-100: #f0f0f0   (primary text)
--ink-50:  #fafafa   (highest contrast)
--accent-primary: #0f62fe   (hard blue)
--accent-soft: #4d8dff      (soft blue, for low-key accents)
```

**21.2 Motion tokens**:
- `--duration-fast: 150ms`
- `--duration-base: 240ms`
- `--duration-slow: 400ms`
- `--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)` (Material standard)

**21.3 Two-tier accent** - hard primary + soft variant lets you use accent at full saturation for key moments and soft for ambient glows.

### Your portfolio's existing tokens (for reference)

```
--color-void: #09090b
--color-obsidian: #0c0c14
--color-surface: #111118
--color-accent-cyan: #00f0ff
--color-accent-purple: #a855f7
--color-accent-teal: #22d3ee
--color-accent-magenta: #ec4899
```

---

## 22. MAGIC MCP COMPONENT SOURCES

> All retrieved via `mcp__magic__21st_magic_component_inspiration`. Run new queries with phrases like "magnetic cursor", "bento grid", "scroll progress", etc. for more.

| Component | Search query | Key technique |
|-----------|--------------|---------------|
| Hero Designali | portfolio hero cinematic | Canvas mouse trails + ShineBorder |
| Portfolio Hero (Alex Kane) | portfolio hero cinematic | Massive monospace + blur reveal |
| Hero 03 | portfolio hero cinematic | 10rem serif + heart icon inline |
| Colorful Bento Grid | project showcase bento | Pastel cards + rotation hover |
| BentoGridShowcase | project showcase bento | Slot-based 3-col with row-span |
| BentoGridWithFeatures | project showcase bento | Border-divided + skeleton overlap |
| Footer (Chillbion) | contact section footer | 4-col + grid pattern + ellipse mask |
| Contact Page | contact section footer | 3-col bento with copy buttons |
| Minimal Footer | contact section footer | Single-line + vertical rules |
| Digital Serenity | page transition 3d | Word-appear stagger + mouse glow |
| Ethereal | page transition 3d | Three.js + section palette crossfade |
| ScrollAdventure | page transition 3d | Page-by-page split scroll hijack |
| Fluid Magnetic Cursor | custom cursor magnetic | GSAP velocity stretch + mix-blend |
| Pointer | custom cursor magnetic | Parent-scoped custom cursor |
| Cursor FX Engine | custom cursor magnetic | Canvas trails + magnetic particles |
| WhisperText | text reveal scramble | GSAP ScrollTrigger word stagger |
| TextReveal | text reveal scramble | Per-char blur+scale+translate |
| TextRevealEffect | text reveal scramble | 7 reveal variants (X/Y/XY/scale) |
| Header 1 | floating nav dock | Sticky + useScroll(10) for blur bg |
| FloatingNav | floating nav dock | Bottom dock + sliding indicator |
| ScrollLegend | floating nav dock | Side dashes + active highlight |

---

## 23. HOW TO USE THIS VAULT

### Workflow

1. **Pick a category** that matches what you're trying to build
2. **Skim the 3-5 most-promising entries** in that category
3. **Read the actual file** (path is given) or **re-query Magic MCP** to fetch fresh code
4. **Adapt to your stack**: Next.js 16 / TypeScript / Tailwind v4 / Framer Motion v12 / Three.js / Three Fiber
5. **Match your tokens**: cyan #00f0ff, purple #a855f7, void #09090b backdrop
6. **Test on throttled CPU** (Chrome DevTools 4× slowdown)
7. **Respect prefers-reduced-motion** - provide a static fallback

### When in doubt, copy from your own existing patterns

Your portfolio already has solid versions of:
- Bento grid (`components/sections/ProjectShowcase.tsx`)
- Project detail pages (`app/projects/[slug]/page.tsx` + `ProjectDetailSections.tsx`)
- Hero with 3D tilt + letter blur reveal (`components/sections/Hero.tsx`)
- DA logo (`components/shared/DathLogo.tsx`)
- Custom cursor (`components/ui/CustomCursor.tsx`)
- Marquee (`components/magicui/marquee.tsx`)
- Three.js particle globe (`components/ui/Background3D.tsx`)
- Glass utilities (`app/globals.css`)
- Scroll-triggered animations (Framer Motion `whileInView`)

For each new feature: check if the *category* in this vault has something more interesting, then upgrade incrementally.

### Re-running searches

To get fresh component snippets when picking up later, use Magic MCP:
```
mcp__magic__21st_magic_component_inspiration({
  message: "<plain-english description of what you want>",
  searchQuery: "<2-4 keywords>"
})
```

For raw code from the local files, use Read on the paths in this vault.

---

## 24. SIGNATURE COMBINATIONS - what makes a portfolio FEEL premium

Based on what shows up across DATHSTEL + frontendmaxxing + Awwwards-tier sites:

1. **One signature animation** as the hero (V13 Iron Filings, V05 Voxels, V18 DepthDiorama, or AnimStrata) - *not five*. The whole site is built around it.

2. **Restrained color motion** - opacity-driven hierarchy, single-hue accents at 6–15% intensity for ambient glows, full saturation for *one* key moment per page.

3. **Smooth-but-fast easing** - `cubic-bezier(0.25, 0.4, 0.25, 1)` for content, `power3.out` for entrances, `elastic.out(1, 0.3)` for magnetic snaps. Never linear, never bounce-heavy.

4. **Premium micro-interactions** - backdrop-blur `8–16px`, subtle borders `border-white/[0.08]`, hover lifts `translate-y-0.5`, edge glows `shadow-[0_0_30px_-5px_rgba(accent,0.15)]`.

5. **Performance discipline** - DPR clamping, lazy-load heavy bundles, instanced rendering, `prefers-reduced-motion` fallbacks, `pointer: fine` for cursor effects.

6. **Typography hierarchy via tracking + opacity, not size alone** - `text-xs uppercase tracking-[0.3em] text-text-dim` for labels reads as "premium label" not "small text".

7. **Content rhythm** - every section has eyebrow + heading + underline rule + body. Cards have category badge + title + body + tech pills + hover-revealed icons.

---

*This vault snapshot taken 2026-04-29. Re-query Magic MCP and re-read source folders for fresher inspiration.*

---

# 🌐 ADDENDUM - WEB RESEARCH (2026-05-01)

> Online research dump: latest component libraries, Awwwards SOTD trends, cutting-edge Codrops tutorials, top studios to study. Use this to bias toward what's *actually shipping* in 2026, not just what's in DATHSTEL/frontendmaxxing.

---

## 25. STATE OF THE STACK (May 2026)

### What's hot

- **Motion (formerly Framer Motion)** is the de-facto React animation library - 30M monthly downloads. v12+ has deeper SSR/server-component integration.
- **GSAP + ScrollTrigger + Lenis** is the cinematic-portfolio standard. ScrollSmoother is a paid add-on; Lenis is the free alternative most studios use.
- **WebGPU** shipped in Safari 26 (Sept 2025) - now universal. Three.js's **TSL (Three Shading Language)** compiles one shader to both WGSL (WebGPU) and GLSL (WebGL).
- **React Three Fiber (R3F)** is the de-facto choice for React 3D. Maintained by **pmndrs** (Poimandres).
- **CSS Scroll-Driven Animations** (`animation-timeline: scroll()` + `view()`) are universal in 2026 - zero JS, runs on compositor thread. Replace simple ScrollTrigger reveals with this.
- **AI-generated Three.js scenes** via natural language are emerging - useful for prototyping atmospheric backgrounds.

### What's fading

- jQuery / vanilla scroll listeners (use ScrollTrigger or scroll-driven CSS)
- Heavy GLSL boilerplate when TSL handles it
- Static "Hero → About → Projects" grid layouts (replaced by **narrative scroll worlds**)

---

## 26. ACETERNITY UI - FULL COMPONENT MAP

> [ui.aceternity.com](https://ui.aceternity.com/components) - Tailwind + Framer Motion. Drop-in compatible with shadcn. **The most plug-and-play premium components in 2026.**

### Hero & Layout
- **Hero Parallax** - scroll rotation/translation/opacity layers
- **Hero Highlight** - background effect with text highlight (perfect for hero bg)
- **Container Scroll Animation** - 3D rotation on scroll for marketing sections
- **Macbook Scroll** - image emerges from screen on scroll (Apple-style)

### 3D & Card Effects
- **3D Card Effect** - card perspective elevates on hover
- **3D Globe** - realistic globe with tooltips and avatar pins ⭐ *(your AEGIS thematic match)*
- **3D Pin** - gradient pin animates on hover
- **3D Marquee** - 3D marquee grid for testimonials
- **Comet Card** - perspective 3D tilt (as on Perplexity Comet)
- **Evervault Card** - card hover reveals encrypted text + gradient
- **Wobble Card** - translates and scales on mousemove

### Backgrounds (the deep menu)
- **Aurora Background** - northern lights ambient
- **Background Beams** - beams following SVG path
- **Background Beams With Collision** - exploding beam intersections
- **Background Boxes** - full-width grid that highlights cells on hover
- **Background Gradient (Animated)** - moving multi-stop gradient
- **Background Lines** - SVG paths animating in waves
- **Background Ripple Effect** - grid cells ripple from click point ⭐
- **Dotted Glow Background** - opacity animation with glow
- **Grid and Dot Backgrounds** - subtle pattern bases
- **Glowing Effect** - adaptive border glow
- **Google Gemini Effect** - SVG morph (as on gemini.google.com)
- **Noise Background** - animated gradients + grain
- **Scales** - repeating diagonal/horizontal/vertical line pattern
- **Vortex Background** - wavy swirly vortex (good for CTAs)
- **Wavy Background** - moving waves

### Scroll & Parallax
- **Parallax Scroll** - grid where two columns scroll opposite directions
- **Sticky Scroll Reveal** - sticky container with text reveal
- **Tracing Beam** - beam follows SVG path, length adjusts with scroll velocity
- **Parallax Hero Images** - mouse-driven blur/fade depth

### Text Effects
- **Canvas Text** - canvas-rendered animated text with curved color lines
- **Colourful Text** - text with color/filter/scale FX
- **Container Text Flip** - flips through words, container width animates
- **Encrypted Text** - gradual reveal through gibberish ⭐
- **Flip Words / Layout Text Flip** - word cycling
- **Text Generate Effect** - fade-in word by word
- **Text Hover Effect** - outline gradient on hover
- **Text Reveal Card** - mousemove reveals hidden text at bottom of card ⭐
- **Typewriter Effect** - generates text as if typed

### Cursor & Interaction
- **Direction Aware Hover** - direction-aware reveal (Framer Motion)
- **Following Pointer** - animated custom pointer
- **Lens** - zooms into images/videos
- **Pointer Highlight** - text highlights when in view (with pointer + border)
- **SVG Mask Effect** - reveals on cursor hover via mask

### Notable Specials
- **Card Spotlight** - radial gradient reveals on cursor
- **Card Stack** - testimonial/quote stacking
- **Focus Cards** - hover focuses one, blurs others ⭐ *(great for project grid)*
- **Sparkles** - configurable sparkle FX (background or standalone)

---

## 27. OTHER COMPONENT LIBRARIES WORTH KNOWING

| Library | URL | Strength |
|---------|-----|----------|
| **Motion Primitives** | motion-primitives.com | Simpler than Aceternity. Easy drop-in for existing codebases. |
| **Magic UI** | magicui.design | Data-presentation specialty (charts, tickers, marquees) - already in your repo |
| **React Bits** | reactbits.dev | Animated text, components, backgrounds |
| **Animate UI** | animate-ui.com | Pure animated React components |
| **Aceternity UI Pro** | ui.aceternity.com/pro | Premium templates ($) |
| **shadcn/ui** | ui.shadcn.com | Foundation primitives - combine with Aceternity for marketing pages |
| **Spectrum UI** | shadcn.io/template/arihantcodes-spectrum-ui | Free Next template |

**Recommendation**: Stay with `Magic UI + Aceternity UI` mix. shadcn for primitive plumbing.

---

## 28. AWWWARDS-TIER PORTFOLIO STUDIOS (2026)

> Studios pushing limits worth dissecting. **Open each in DevTools, inspect their scroll handlers, copy the pattern.**

| # | Studio | URL | Signature element |
|---|--------|-----|-------------------|
| 1 | **Bruno Simon** | bruno-simon.com | Full 3D drivable car portfolio (Site of the Month Jan 2026) |
| 2 | **Joseph Santamaria** | joseph-santamaria.com | Scroll-driven Three.js 3D world with astronaut narrative ⭐ |
| 3 | **Arnaud Rocca** | arnaudrocca.com | GSAP + WebGL minimalist with dynamic project color accents |
| 4 | **Corentin Bernadou** | corentinbernadou.com | Swiss-inspired layouts + subtle WebGL geometry, vanilla JS |
| 5 | **Roman Jean-Elie** | romanjean-elie.com | Fold effect + MeshPortal system (FBO masking) |
| 6 | **Phantom.Land** | phantom.land | "Shape-shifting vessel" WebGL theatrics + kinetic grids |
| 7 | **Obys Agency** | des.obys.agency | Experimental motion + refined typography (art installation feel) |
| 8 | **Samsy Ninja** | samsy.ninja | 50+ awards, 3D interactive + computational design |
| 9 | **T-KO Space** | t-ko.space | Immersive 3D environments, spatial interfaces |
| 10 | **Chipsa Design** | chipsa.design | WebGL/3D/CGI emotional UIs ("interfaces that feel alive") |
| 11 | **Stōkt Creative** | wearestokt.com | Bold 3D + interactive branding |
| 12 | **Hnine Interaction** | interaction.hnine.com | App-style immersive (requires JS) |
| 13 | **dverso studio** | dversostudio.io | Three.js + AI integration |
| 14 | **Immersive Garden** | immersive-g.com | Cinematic WebGL storytelling |
| 15 | **Utsubo** | utsubo.com | Real-time 3D, WebGPU specialist |
| 16 | **Jordan Delcros** | jordan-delcros.com | WebGL + generative visuals |
| 17 | **Studio Null** | madebynull.com | Interactive web spaces ("make the web fun again") |
| 18 | **Basement Studio** | basement.studio | Bold digital ecosystems |
| 19 | **CUSP** | (search Awwwards) | Experimental nav + scroll triggers (SOTD March 2026) |
| 20 | **Jason Bergh** | jasonbergh.com | Video-bg + parallax (cinematic for video pros) |

---

## 29. CUTTING-EDGE CODROPS TUTORIALS (2026)

> Each is a step-by-step recipe. Prefer these to "look at the live site and guess."

### 29.1 More Than a Portfolio: Scroll-Driven 3D World ⭐ (April 28, 2026)
[link](https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/)

**Stack**: Three.js + GSAP (ScrollTrigger, Observer, SplitText) + Blender + KTX2/Basis Universal + Draco

**Patterns to steal**:
- **GPU instancing** for repeated geometry (floating blocks, debris) - collapses to single draw call → 144fps
- **Low-res render targets** for atmospheric effects, then composite back at full res ("user never notices, phone doesn't suffer")
- **Dynamic culling** instead of static LOD - aggressively cull off-screen geometry
- **GSAP Observer** to unify mouse/touch/trackpad into one consistent camera input
- **Snap-block scrolling** for one critical mid-site sequence (page-turn feel) without breaking scroll continuity elsewhere
- **Tesseract transition** when opening a project (4D shape unfolds + dissolves)
- **WebGL shader contact menu** - "Ink Bleed" effect, written to NDC space (`gl_Position = vec4(pos.xy, 0, 1)`) so it pins to screen regardless of camera

### 29.2 WebGL Portfolio (Roman Jean-Elie) ⭐ (Nov 2025)
[link](https://tympanus.net/codrops/2025/11/27/letting-the-creative-process-shape-a-webgl-portfolio/)

**Patterns to steal**:
- **Fold effect** - WebGL sticker fold via vector projection + fake shadow rendering based on curvature
- **MeshPortal system** - bounded 3D scene rendered to texture via Frame Buffer Objects, masked to viewport regions; dynamically repositions across sections via normalized DOM bounds (pixel → 0-1 WebGL space)
- **Text morphing** - GSAP MorphSVG + canvas rendering callbacks (not DOM) for 60fps
- **Velocity stretch shader** - sine-wave distortion driven by scroll velocity, max at viewport center, decays after stop ⭐ *(perfect for project titles)*
- **Hash-based nav** - single-page with simultaneous in/out animations during section transitions

### 29.3 Sticky Grid Scroll (March 2026)
[link](https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/)

**Pattern**: "Scrolling does not move the scene, it advances time inside it." Fixed viewport pinned during scroll, grid animation unfolds in 3 phases:

1. **Reveal (0-45%)**: Even cols animate from top, odd cols from bottom (staggered)
2. **Zoom (45-90%)**: Grid scales 1→2.05, lateral cols shift ±40% horizontal, center col items shift ±40% vertical
3. **Content toggle (90-100%)**: Title slides in via yPercent, description + button fade in

**Implementation**: 425vh container, sticky wrapper, GSAP timelines with `-=0.6` offsets, Lenis lerp 0.08, gsap.ticker syncs Lenis to GSAP frame.

### 29.4 Dual-Wave Text Animation (Jan 2026)
[link](https://tympanus.net/codrops/2026/01/15/building-a-scroll-driven-dual-wave-text-animation-with-gsap/)

**Pattern**: Two columns of text oscillate horizontally in opposite sine waves, centered image updates based on which text is closest to viewport center.

**Math**: `phase = (waveNumber × index) + (waveSpeed × scrollProgress × 2π) - π/2`
- `waveNumber` = frequency
- `waveSpeed` = scroll responsiveness
- Sine output [-1, 1] → normalized → mapped to column move boundaries

**Reuse**: Project showcases (text + thumbnail), testimonials (quote + logo), timeline (event + image).

### 29.5 Scroll-Revealed WebGL Gallery (Feb 2026)
[link](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/)

**Patterns to steal**:
- **DOM-WebGL sync** - `PlaneGeometry` meshes scaled/positioned via `getBoundingClientRect` to match HTML images
- **ScrollSmoother in same tick as render** - keeps WebGL planes aligned with DOM during scroll
- **`uProgress` shader uniform** for image reveals on viewport entry, `toggleActions: "play reset restart reset"` for restart on scroll-back
- **SplitText line stagger** with `yPercent` transforms tied to scroll
- **Barba.js Flip transitions** - capture state, append to new container, animate without jumps

### 29.6 Horizontal Parallax Gallery: DOM → WebGL (Feb 2026)
[link](https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/)

**Pattern**: Build smooth horizontal parallax in plain DOM/CSS first, then progressively upgrade to GPU-powered WebGL with shaders for richer effects (tear, ripple, distortion).

### 29.7 CSS Scroll-Driven Animations (replacing GSAP for simple cases)
[link](https://medium.com/@alexdev82/scroll-driven-animations-replace-gsap-scrolltrigger-with-pure-css-b7d054ae3d02)

**Pattern**: Use `animation-timeline: scroll()` and `view()` directly in CSS for fade/slide reveals, progress bars, parallax backgrounds. **Zero JS, runs on compositor.** Use this for 80% of basic scroll animations and keep GSAP for the dramatic moments.

---

## 30. SPECIFIC PATTERNS WORTH STEALING

> Highly opinionated picks based on what shows up across multiple top-tier sites.

### 30.1 The Tesseract / Geometric Transition
On project click: 4D shape (or hexagonal prism) unfolds in 3D, dissolves to reveal new page. Joseph Santamaria nails this.
**Stack**: Three.js + GSAP timeline. Estimated effort: 1 day for polished version.

### 30.2 Velocity Stretch on Scroll
Project titles distort via sine wave, magnitude tied to scroll velocity. Maximum at viewport center.
**Stack**: GSAP velocity tracking + Three.js ShaderMaterial. Code shape:
```glsl
uniform float uVelocity;
float stretch = sin(uv.y * PI) * uVelocity * 0.3;
pos.x += stretch;
```

### 30.3 GSAP Observer Unified Input
One handler for mouse/touch/trackpad means consistent camera control across devices. **No more separate touch handlers.**

### 30.4 Snap-Block Scroll for One Sequence Only
Most of site uses smooth scroll, but ONE critical sequence (e.g., the project showcase) snaps between blocks like page-turns. Without breaking continuity elsewhere.

### 30.5 Ink Bleed Shader Menu
Contact menu opens via WebGL "ink bleeding into water" shader. Pins to screen via NDC bypass.

### 30.6 Custom Soundtrack with Lowpass Filter
Background music applies a lowpass filter when entering project pages - creates "stepping into adjacent room" perception. Web Audio API is enough.

### 30.7 Single-Color Project Accents
Each project gets ONE accent color. Hero/cards/buttons all shift to that color when viewed. Drives visual variety without redesigning.

### 30.8 PJAX / Smart Page Transitions
Don't reload the page. Use `Barba.js` (or Next.js's `useTransition` + `view-transition-name`) to keep WebGL scenes alive across navigation.

### 30.9 Scroll-Based Color/Mood Shift in 3D
Shader uniforms (`uSectionIndex`, `uPalette`) crossfade between palettes as user scrolls through sections. Same Three.js mesh persists, but its mood transforms.

### 30.10 GPU Instancing Discipline
If you have >10 of anything (particles, blocks, dust motes), use `InstancedMesh`. Single draw call = 144fps even on low-tier hardware.

---

## 31. AI-ASSISTED 3D (NEW IN 2026)

- **Prompt-to-Three.js scenes** via tools like Spline AI, Polycam, Anthropic Sonnet 4.6 with R3F context
- **Texture generation** via Stable Diffusion 3.5 / Midjourney v7 + KTX2 compression
- **Shader assistance** - describe a look, get TSL code

For *your* portfolio: useful for prototyping atmospheric backgrounds quickly, then hand-tuning.

---

## 32. UPDATED RECOMMENDATIONS FOR YOUR PORTFOLIO

Given:
- Static export to GitHub Pages constraint
- Existing Next.js 16 / Three.js / Framer Motion / Tailwind v4 stack
- 6 projects with geospatial/AI/data themes
- Already has DA monogram, custom cursor, particle globe, project bento

**Three most-impactful upgrades in priority order**:

1. **Velocity-stretch shader on project titles** - drop into existing project cards, low risk, high "wow." Codrops 29.2 pattern.

2. **Aceternity 3D Globe + project pins as nav alternative** - directly references your AEGIS work. Click a pin → smooth zoom → project page. Replaces or augments your bento grid.

3. **Sticky Grid Scroll for projects section** - Codrops 29.3 pattern. The 3-phase scroll-driven reveal is *exactly* the wow moment HexGenesis tried (and missed). This is the proven recipe.

**Lower-effort polish**:
- Replace GSAP-style ScrollTrigger reveals with CSS scroll-driven (`animation-timeline: scroll()`) where possible
- Add Aceternity's **Encrypted Text** to your name reveal
- Add **Card Spotlight** to your project cards
- Use **Following Pointer** as a richer custom cursor

---

*Web research snapshot: 2026-05-01. The frontier moves fast - re-search annually.*

## SOURCES

- [Awwwards Sites of the Day](https://www.awwwards.com/websites/sites_of_the_day/)
- [Awwwards 3D Best](https://www.awwwards.com/websites/3d/)
- [Three.js 2026 Guide (Oflight)](https://www.oflight.co.jp/en/columns/threejs-webgpu-tsl-r3f-2026)
- [What's New in Three.js 2026 (Utsubo)](https://www.utsubo.com/blog/threejs-2026-what-changed)
- [Top React Animation Libraries 2026 (Syncfusion)](https://www.syncfusion.com/blogs/post/top-react-animation-libraries)
- [LogRocket: Best React Animation Libraries 2026](https://blog.logrocket.com/best-react-animation-libraries/)
- [Aceternity UI Components](https://ui.aceternity.com/components)
- [Motion (formerly Framer Motion)](https://motion.dev/)
- [React Bits](https://reactbits.dev/)
- [Codrops: Joseph Santamaria's 3D Portfolio](https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/)
- [Codrops: WebGL Portfolio Creative Process](https://tympanus.net/codrops/2025/11/27/letting-the-creative-process-shape-a-webgl-portfolio/)
- [Codrops: Sticky Grid Scroll](https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/)
- [Codrops: Dual-Wave Text Animation](https://tympanus.net/codrops/2026/01/15/building-a-scroll-driven-dual-wave-text-animation-with-gsap/)
- [Codrops: WebGL Gallery with GSAP+Astro+Barba](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/)
- [Codrops: Horizontal Parallax DOM to WebGL](https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/)
- [Codrops: Arnaud Rocca's GSAP+WebGL Portfolio](https://tympanus.net/codrops/2026/03/31/arnaud-roccas-portfolio-from-a-gsap-powered-motion-system-to-fluid-webgl/)
- [Codrops: Corentin Bernadou's Swiss-WebGL Portfolio](https://tympanus.net/codrops/2026/03/05/inside-corentin-bernadous-portfolio-swiss-inspired-layouts-webgl-geometry-and-thoughtful-motion/)
- [CSS Scroll-Driven Animations (Medium)](https://medium.com/@alexdev82/scroll-driven-animations-replace-gsap-scrolltrigger-with-pure-css-b7d054ae3d02)
- [Top 100 Portfolios 2026 (Muz.li)](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/)
- [Best Modern Portfolio Examples 2026 (Wegic)](https://wegic.ai/inspiration/best-modern-portfolio-website-design-examples)

---

# 🛰️ ADDENDUM 2 - GLOBE.GL + VANTA.JS (must-use libraries)

> Two MVP-tier libraries for portfolio backgrounds and geographic data visualization. Both are dependency-light and embed cleanly in Next.js.

---

## 33. GLOBE.GL - vasturiano/globe.gl

**Repo:** https://github.com/vasturiano/globe.gl
**React wrapper:** [react-globe.gl](https://github.com/vasturiano/react-globe.gl) (already in your portfolio at `components/sections/GlobeSection.tsx`)
**Built on:** Three.js + WebGL

### Available visualization layers

| Layer | What it does | Portfolio use |
|-------|-------------|---------------|
| **Points** | Cylindrical pin markers (height = data value) | Project locations as bars |
| **Arcs** | Animated dashed arcs between two lat/lng | Shipping routes, connections (used in your atlas) |
| **Polygons** | Extruded country shapes (3D height) | Country-level data viz |
| **Paths** | Lines following surface | Submarine cables, flight paths |
| **Tiles** | Square/rectangle regions on surface | Grid-based zones |
| **Heatmaps** | Gaussian KDE density visualization | Population density, activity hotspots |
| **HexBin** | Hexagonal binning aggregation ⭐ | **Perfect H3 thematic match** |
| **Hex Polygons** | Tesselated countries from hex grid | Stylized H3-look country borders |
| **Particles** | Point clouds positioned anywhere | Satellites, atmospheric effects |
| **Rings** | Self-propagating ripple animations | Radar pulses, beacon emanations |
| **Labels** | 3D text positioned at lat/lng | Place names, project labels |
| **HTML Elements** | CSS2D DOM overlay at lat/lng ⭐ | **Custom beacons (used in your atlas)** |
| **Custom Layers** | User-defined Three.js objects | Anything - stations, satellites, fleets |

### Iconic example demos (worth studying)

- **World Population** - population density via heatmap
- **Airline Routes** - US international flight network with arcs
- **Submarine Cables** - Global infrastructure paths
- **Satellites** - Real-time orbital tracking with particle layer
- **Earthquakes & Volcanoes** - Event clustering with hex binning
- **Moon Landing Sites** - Historical markers with custom HTML

### What you're already using

```tsx
import Globe from "react-globe.gl";

<Globe
  globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
  bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
  showAtmosphere
  atmosphereColor="#88ccff"
  ringsData={...}
  htmlElementsData={PROJECT_PINS}
  arcsData={...}
/>
```

### Available globe textures (CDN-hosted)

| Texture URL suffix | Look |
|---|---|
| `earth-day.jpg` | Standard daytime - NASA visible Earth |
| `earth-blue-marble.jpg` | Vibrant blue oceans, green continents (current) |
| `earth-night.jpg` | City lights at night (cyberpunk) |
| `earth-dark.jpg` | Muted dark earth |
| `earth-water.png` | Water-only mask (sci-fi look) |
| `earth-topology.png` | Topology bump map (use as `bumpImageUrl`) |

CDN base: `//cdn.jsdelivr.net/npm/three-globe/example/img/`

### Features to consider for your portfolio

1. **HexBin layer** - directly references your H3 work. Bin project regions into hexagons that stick up from the surface.
2. **Submarine cable paths** - extend AEGIS arcs into actual maritime routes following coastlines.
3. **Satellites particle layer** - orbital data points around the globe (atmospheric, never literal).
4. **Hex polygons mode** - render countries as hexagonal mosaics (looks like H3 tessellation).
5. **Custom Three.js layer** - drop in 3D ship/plane models at coordinates.

---

## 34. VANTA.JS - tengbao/vanta

**Repo:** https://github.com/tengbao/vanta
**Demo:** https://www.vantajs.com/
**Size:** ~120KB gzipped
**Built on:** Three.js (some effects use p5.js)

### Available 3D background effects

| Effect | Description | Vibe |
|--------|-------------|------|
| **WAVES** | Water-like rippling animated mesh ⭐ | Calm, oceanic, premium |
| **BIRDS** | Flying birds flocking in 3D space ⭐ | Organic, kinetic |
| **FOG** | Atmospheric volumetric fog | Mysterious, dreamy |
| **CLOUDS** | Realistic cloud simulation | Sky, expansive |
| **CLOUDS2** | Stylized alternative cloud effect | Cartoonish, animated |
| **TRUNK** | Generative tree-like fractal | Organic growth |
| **TOPOLOGY** | Abstract topological lines (p5) | Mathematical, clean |
| **NET** | Connected dot network | Tech, data |
| **HALO** | Glowing ring/aura effect | Atmospheric, sci-fi |
| **DOTS** | Floating dot particle system | Minimal, ambient |
| **CELLS** | Cellular voronoi pattern | Biological, structured |
| **GLOBE** | 3D globe with rotating dots | Direct alternative to react-globe.gl |
| **RINGS** | Concentric pulsing rings | Energy, focus |

### React/Next.js integration

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

export function VantaBg() {
  const ref = useRef<HTMLDivElement>(null);
  const [vanta, setVanta] = useState<any>(null);

  useEffect(() => {
    if (!vanta && ref.current) {
      // Dynamic import to avoid SSR
      Promise.all([import("vanta/dist/vanta.waves.min"), import("three")]).then(
        ([WAVES, THREE]) => {
          setVanta(
            (WAVES as any).default({
              el: ref.current,
              THREE: THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200,
              minWidth: 200,
              scale: 1,
              scaleMobile: 1,
              color: 0x00f0ff,
              shininess: 50,
              waveHeight: 20,
              waveSpeed: 0.5,
              zoom: 0.95,
            })
          );
        }
      );
    }
    return () => vanta?.destroy();
  }, [vanta]);

  return <div ref={ref} className="fixed inset-0 z-0" />;
}
```

**Install:** `npm install vanta three`

### Why Vanta is good for portfolios

- **One-line setup** - just pass an element ref
- **Mouse/touch responsive** - every effect reacts to interaction
- **Customizable params** - colors, speed, density, all tweakable
- **Smaller than custom Three.js** - pre-optimized, ~120KB
- **Battle-tested** - used by thousands of sites since 2018
- **Easy to swap** - change one import to test a different effect

### When to use Vanta vs custom Three.js

| Use Vanta | Use custom Three.js / r3f |
|-----------|---------------------------|
| Atmospheric backdrop, ambient | Interactive scene with object selection |
| Quick wow factor | Bespoke aesthetic (your IronFilings, Hex Genesis attempts) |
| Don't need cursor logic | Need precise pin/marker interaction |
| Same effect everywhere | Scene composition with multiple layers |

### Recommendation for your portfolio

**Don't replace your particle globe with Vanta** - your custom Three.js scene is more on-brand. But Vanta could shine in:

1. **Project detail page heroes** - `WAVES` for AEGIS (maritime), `TOPOLOGY` for London Synergy (H3 grid feel), `NET` for RiskTerrain (network analysis)
2. **About/Contact section** - `FOG` or `HALO` for atmospheric depth
3. **Section transitions** - `BIRDS` or `DOTS` between major sections
4. **404 page** - any of them, no risk of conflict

### Quick effect-to-project pairing

| Project | Vanta effect | Why |
|---------|--------------|-----|
| AEGIS | WAVES (cyan, low waveHeight) | Maritime/ocean theme |
| London Synergy | TOPOLOGY (p5 lines) | H3 hexagonal grid feel |
| RiskTerrain | NET | Connected supply chain graph |
| Data Engineering | DOTS | Particle data flow |
| Housing & Crime | CELLS | Cellular geographic regions |
| Dataportfolio | HALO | Glowing/branded landing |

---

## 35. UPDATED RECOMMENDATIONS WITH THESE LIBRARIES

Building on Section 32, here's what's most impactful given globe.gl + Vanta:

### Tier 1 - quick wins (1-2 hours each)
1. **Vanta WAVES on AEGIS detail page hero** - instant maritime vibe
2. **Vanta TOPOLOGY on London Synergy detail page** - references H3 work
3. **Add HexBin layer to Project Atlas** - H3 thematic match, technically yours

### Tier 2 - bigger upgrades (1 day each)
4. **Submarine cable paths layer** in atlas (animated dashed paths along coastlines for AEGIS shipping routes)
5. **Satellite particle layer** orbiting the atlas globe (atmospheric, ambient)

### Tier 3 - signature features (2-3 days)
6. **Multi-globe atlas** - switch between earth-blue-marble, earth-night, earth-water with a toggle for different "moods"
7. **Live data on globe** - fetch real shipping/trade data and render it on the atlas (from AEGIS API even?)

---

*globe.gl + vanta added: 2026-05-01*

## SOURCES (this addendum)

- [globe.gl GitHub](https://github.com/vasturiano/globe.gl)
- [react-globe.gl GitHub](https://github.com/vasturiano/react-globe.gl)
- [globe.gl examples](https://globe.gl/) (vasturiano demos)
- [Vanta.js GitHub](https://github.com/tengbao/vanta)
- [Vanta.js demo site](https://www.vantajs.com/)
- [three-globe textures CDN](https://cdn.jsdelivr.net/npm/three-globe/example/img/)

---

# 🎨 ADDENDUM 3 - GALAXY (UI components) + BABYLON.JS (3D engine)

> Two more reference libraries to know about. Galaxy = grab-and-go UI bits. Babylon.js = the heavyweight Three.js alternative for ambitious 3D scenes.

---

## 36. GALAXY - uiverse-io/galaxy

**Repo:** https://github.com/uiverse-io/galaxy
**Browse + copy:** https://uiverse.io/
**License:** MIT (no attribution required, but appreciated)
**Catalog:** 3,000+ community-made UI elements

### Component categories

| Category | Examples |
|----------|----------|
| **Buttons** | Animated, neon, magnetic, neumorphic, shine, hover-fill |
| **Cards** | Hover-tilt, glow, glass, flip, spotlight, parallax |
| **Checkboxes** | Animated checks, swipe states, neon variants |
| **Forms** | Floating-label inputs, animated underlines, focus rings |
| **Inputs** | Neon, glass, animated borders, search bars |
| **Notifications** | Toast variants, alert cards, banner styles |
| **Radio buttons** | Animated, sliding indicators, custom shapes |
| **Toggle switches** | Skeuomorphic, neon, animated states |
| **Tooltips** | Slide, fade, pop animations |
| **Loaders** | 3000+ - spinners, progress bars, skeletons, dots |
| **Patterns** | CSS background patterns, gradients, grids |

### Why it's useful

- **Massive catalog** - when you want "a glowing pill button" or "a neon toggle," there are 50+ options to pick from
- **CSS or Tailwind** - copy directly, no install
- **Curated** - every submission is reviewed before inclusion
- **No build step needed** - it's just HTML + CSS

### How to use

1. Browse https://uiverse.io/
2. Pick a component, copy its HTML + CSS (or Tailwind variant)
3. Paste into your component, adapt classes to your design tokens
4. Replace inline colors with your accent variables (`var(--color-accent-cyan)` etc.)

### Best fits for your portfolio

- **Loaders** - for project page entry, when content is mounting
- **Toggle switches** - for any preference settings (dark mode, sound on/off if you add audio)
- **Notification toasts** - for "copied to clipboard" feedback on contact section
- **Animated buttons** - alternative styles for the `Open project` CTA in atlas
- **Patterns** - CSS-only background patterns to layer behind sections

### When NOT to use

- For hero animations or signature features - Galaxy components are *building blocks*, not centerpieces. Don't make your hero a Uiverse button - make your hero something custom and use Uiverse for the small touches around it.

---

## 37. BABYLON.JS - BabylonJS/Babylon.js

**Repo:** https://github.com/BabylonJS/Babylon.js (25.4k★)
**Site:** https://www.babylonjs.com/
**Playground:** https://playground.babylonjs.com/
**License:** Apache 2.0

### What it is

A complete 3D game/rendering engine built on **WebGL / WebGL2 / WebGPU**. Originally Microsoft-backed, now community-maintained. The "batteries-included" alternative to Three.js.

### Core features (out of the box)

| Capability | Babylon.js | Three.js |
|------------|------------|----------|
| **Physics engine** | ✅ Built-in (Cannon, Oimo, Havok adapters) | ❌ Use rapier/cannon separately |
| **GUI system** | ✅ Babylon GUI (canvas-rendered UI for 3D scenes) | ❌ DOM overlay or sprites |
| **WebXR / VR / AR** | ✅ First-class | ⚠️ Possible via WebXR API |
| **Animation system** | ✅ Built-in keyframe + skeletal | ✅ Has it but less batteries-included |
| **Asset pipeline** | ✅ Blender / 3DS Max / Maya / Unity exporters | ✅ glTF support |
| **Shader tools** | ✅ Node Material Editor (visual shader graph) | ❌ Write GLSL by hand |
| **Bundle size** | Heavier (~600KB+ for full engine) | Lighter (~150KB+ tree-shakable) |
| **Maturity** | 47k+ commits, 623+ releases | Comparable, larger community |

### React integration

```bash
npm install @babylonjs/core @babylonjs/loaders react-babylonjs
```

```tsx
import { Engine, Scene } from "react-babylonjs";

<Engine antialias adaptToDeviceRatio canvasId="babylon-canvas">
  <Scene>
    <freeCamera name="cam" position={new Vector3(0, 5, -10)} setTarget={Vector3.Zero()} />
    <hemisphericLight name="light" intensity={0.7} direction={Vector3.Up()} />
    <box name="box" size={2} position={new Vector3(0, 1, 0)}>
      <standardMaterial name="mat" diffuseColor={Color3.FromHexString("#00f0ff")} />
    </box>
  </Scene>
</Engine>
```

### When to choose Babylon.js over Three.js

| Use Babylon.js | Use Three.js / R3F |
|----------------|---------------------|
| Game-like portfolio (Bruno Simon's car portfolio style) | Atmospheric backgrounds, simpler scenes |
| WebXR / VR experience | Standard 2D-with-3D-elements |
| Need physics on multiple objects | Don't need physics or only minimal |
| Visual node-based shader editing | Comfortable writing GLSL |
| Complex character animation | Simple object animation |
| Shipping a 3D-first product | Shipping a content site with 3D accents |

### Standout features worth knowing

1. **Node Material Editor (NME)** - visual graph-based shader builder. Drag nodes to compose materials, export GLSL. Insanely productive vs raw GLSL.
2. **Babylon GUI** - render UI directly inside the 3D canvas (buttons, sliders, panels positioned in 3D space). Great for VR.
3. **Asset Manager** - built-in async loading of meshes/textures with progress events.
4. **Inspector** - live debug panel for any scene (`scene.debugLayer.show()`).
5. **Sandbox** - drop a `.glb` file at https://sandbox.babylonjs.com/ to inspect/test.
6. **WebGPU rendering** - opt-in, faster than WebGL for compute-heavy scenes.

### Notable Babylon-built portfolios / experiences

- **Bruno Simon's car portfolio** uses Three.js, but Babylon would handle the same with built-in physics
- **Microsoft Hololens demos** - many use Babylon.js for WebXR
- **Babylon.js Playground itself** - proves what's achievable

### For YOUR portfolio specifically

**Honest take**: stick with Three.js / R3F. You're already deep in that ecosystem (`react-globe.gl`, Background3D particle globe). Babylon's strengths (physics, GUI, XR) aren't strengths your portfolio needs.

**Where Babylon.js MIGHT be worth it:**
1. **A standalone "WebXR demo" page** - show off VR/AR portfolio support
2. **A driveable car portfolio** Bruno-Simon-style - physics-heavy
3. **A future product showcase** that needs game-tier 3D fidelity

For now, log it in your "things to know" library and don't switch.

---

## 38. UPDATED MASTER LIBRARY MATRIX

What to reach for, by use case:

| Need | First choice | Backup |
|------|-------------|--------|
| **Animated React UI components** | Aceternity UI | Magic UI / React Bits |
| **Pre-built buttons / loaders / toggles** | Galaxy (Uiverse) | Aceternity UI |
| **Geographic 3D viz (atlas, pins, routes)** | globe.gl / react-globe.gl ⭐ already using | Custom Three.js |
| **Atmospheric 3D backgrounds (waves, fog, birds)** | Vanta.js | Custom Three.js |
| **Custom 3D scenes (light)** | Three.js + R3F ⭐ already using | Babylon.js |
| **Game-like / physics 3D** | Babylon.js | Three.js + cannon-es |
| **Smooth scroll** | Lenis | Locomotive |
| **Scroll-triggered timelines** | GSAP ScrollTrigger | Framer Motion useScroll |
| **CSS-only scroll animations** | `animation-timeline: scroll()` | n/a |
| **Animated SVG paths** | GSAP MorphSVG | Flubber.js |
| **Page transitions (multi-page)** | Next.js view-transitions API | Barba.js (with vanilla) |
| **Animated text reveal** | Framer Motion `motion.span` stagger | GSAP SplitText |
| **Particle systems** | Three.js shader-based | Vanta DOTS/CELLS |
| **Heatmaps / hex bins on globe** | globe.gl HexBin layer | deck.gl |

---

*Galaxy + Babylon.js added: 2026-05-01*

## SOURCES (this addendum)

- [uiverse-io/galaxy GitHub](https://github.com/uiverse-io/galaxy)
- [Uiverse.io browse + copy](https://uiverse.io/)
- [BabylonJS/Babylon.js GitHub](https://github.com/BabylonJS/Babylon.js)
- [Babylon.js Playground](https://playground.babylonjs.com/)
- [Babylon.js Sandbox](https://sandbox.babylonjs.com/)
- [react-babylonjs npm](https://www.npmjs.com/package/react-babylonjs)
