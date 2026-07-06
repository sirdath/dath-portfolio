"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

/**
 * Scroll-driven 360vh hero with sticky stage. Five phases:
 *   1. Logo centered (brand mark)
 *   2. Brand glyphs split outward, name letters fade in
 *   3. DIMITRIS reveals
 *   4. ATHINAIOS reveals ("ai" stays accent-green italic)
 *   5. Letters retract, logo flies + docks into the navbar
 *
 * All animation is driven by a dozen CSS variables on #stage which the
 * framer-motion scroll handler computes per frame. JSX intentionally identical to
 * the original port so existing CSS selectors keep working.
 */
export function RedesignHero() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  
  // Use Framer Motion's useScroll which hooks into their optimized render loop
  const { scrollY } = useScroll();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [roleText, setRoleText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const extRefs = useRef<{ dExt: HTMLElement[]; aExt: HTMLElement[] }>({ dExt: [], aExt: [] });
  const heroMetricsRef = useRef({ offsetTop: 0, offsetHeight: 0 });

  useEffect(() => {
    const updateMetrics = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      if (heroRef.current) {
        heroMetricsRef.current = {
          offsetTop: heroRef.current.offsetTop,
          offsetHeight: heroRef.current.offsetHeight,
        };
      }
    };
    
    // Initial size and grid bg setup
    updateMetrics();
    requestAnimationFrame(() => {
      document.querySelector(".grid-bg")?.classList.add("in");
    });
    
    // Typewriter effect for role text
    const fullText = "Data Scientist · AI Engineer";
    let i = 0;
    const interval = setInterval(() => {
      setRoleText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 45);
    
    // Cache DOM nodes once
    extRefs.current.dExt = Array.from(document.querySelectorAll(".row-d .L.ext")) as HTMLElement[];
    extRefs.current.aExt = Array.from(document.querySelectorAll(".row-a .L.ext")) as HTMLElement[];

    const onResize = () => {
      updateMetrics();
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      clearInterval(interval);
    };
  }, []);

  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
  const smooth = (a: number, b: number, x: number) => {
    const t = clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };

  // Run the computation efficiently on scroll change
  useMotionValueEvent(scrollY, "change", (latestScrollY) => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage || windowSize.height === 0) return;

    const { dExt, aExt } = extRefs.current;
    const heroOffsetTop = heroMetricsRef.current.offsetTop;
    const heroOffsetHeight = heroMetricsRef.current.offsetHeight;

    const rectTop = heroOffsetTop - latestScrollY;
    const total = heroOffsetHeight - windowSize.height;
    const scrolled = -rectTop;
    const p = clamp(scrolled / total, 0, 1);

    const s = (a: number, b: number) => smooth(a, b, p);
    const pAlignFwd = 1 - s(0.04, 0.22);
    const pRevD_f = s(0.18, 0.4);
    const pRevA_f = s(0.42, 0.66);
    const collapse = s(0.78, 0.92);
    const pAlignRev = s(0.84, 0.95);
    const pAlign = Math.max(pAlignFwd, pAlignRev);
    const pType = Math.min(s(0.02, 0.16), 1 - s(0.96, 1.0));
    const pLogoOut = 1 - s(0.02, 0.16);
    const pLogoIn = s(0.93, 0.99);
    const pLogo = Math.max(pLogoOut, pLogoIn);
    const winR = clamp((p - 0.9) / 0.04, 0, 1);
    const logoScale = 1 + 0.1 * (1 - pLogoIn) * winR;
    const logoBlur = 6 * (1 - pLogoIn) * winR;
    const logoGlow = winR * (1 - pLogoIn);

    const stagger = 0.13;
    const ramp = 0.2;
    for (let i = 0; i < aExt.length; i++) {
      const t = clamp((collapse - i * stagger) / ramp, 0, 1);
      aExt[i].style.setProperty("--lt-rev", (pRevA_f * (1 - t)).toFixed(3));
    }
    for (let i = 0; i < dExt.length; i++) {
      const idx = dExt.length - 1 - i;
      const t = clamp((collapse - idx * stagger) / ramp, 0, 1);
      dExt[i].style.setProperty("--lt-rev", (pRevD_f * (1 - t)).toFixed(3));
    }

    const pFin = s(0.62, 0.74);
    stage.style.setProperty("--p", String(p));
    stage.style.setProperty("--p-logo", String(pLogo));
    stage.style.setProperty("--p-align", String(pAlign));
    stage.style.setProperty("--p-fin", String(pFin));
    stage.style.setProperty("--p-type", String(pType));
    stage.style.setProperty("--logo-scale", String(logoScale));
    stage.style.setProperty("--logo-blur", logoBlur.toFixed(2) + "px");
    stage.style.setProperty("--logo-glow", Math.max(0, logoGlow).toFixed(3));

    // Fly past the hero — DATH logo → small mark at top-left of navbar
    const heroBottomY = heroOffsetTop + heroOffsetHeight - windowSize.height;
    const flySpan = windowSize.height * 0.7;
    const flyP = clamp((latestScrollY - heroBottomY) / flySpan, 0, 1);
    
    // Must match the --logoW clamp in app/redesign.css:
    const logoWnow = Math.max(160, Math.min(0.40 * windowSize.width, 480));
    const targetCompositeW = 152;
    const targetCenterX = 40 + targetCompositeW / 2;
    const targetCenterY = 28;
    const flyTx = (targetCenterX - windowSize.width / 2) * flyP;
    const flyTy = (targetCenterY - windowSize.height / 2) * flyP;
    const flyScale = 1 + (targetCompositeW / logoWnow - 1) * flyP;

    stage.style.setProperty("--fly-tx", flyTx.toFixed(1) + "px");
    stage.style.setProperty("--fly-ty", flyTy.toFixed(1) + "px");
    stage.style.setProperty("--fly-scale", flyScale.toFixed(4));
    stage.style.setProperty("--fly-p", flyP.toFixed(3));
    stage.style.setProperty("--fly-p-gt-half", flyP > 0.55 ? "auto" : "none");

    const navBrand = document.getElementById("navBrand");
    if (navBrand) {
      const navBrandOp = clamp((flyP - 0.94) / 0.06, 0, 1);
      navBrand.style.setProperty("--nav-brand-op", navBrandOp.toFixed(3));
      navBrand.style.setProperty("--nav-brand-pe", navBrandOp > 0.5 ? "auto" : "none");
    }

    if (flyP > 0.02) stage.style.setProperty("--p-logo", "1");
  });

  return (
    <section ref={heroRef} className="hero" id="top">
      <div ref={stageRef} className="stage" id="stage">
        <div className="hero-lamp" aria-hidden="true" />
        <a className="dath-logo" href="#top" id="brandLink" aria-label="DATHPROJECT — back to top">
          <img src="/redesign/dath-logo.png" alt="DATH brand mark" />
          <span className="caption">
            D<b>imitris</b> · A<b>thinaios</b>
          </span>
        </a>

        <h1 className="hname" aria-label="Dimitris Athinaios">
          <span className="row row-d">
            <img className="brand-glyph brand-d" src="/redesign/brand-d.png" alt="D" />
            <span className="L ext">i</span>
            <span className="L ext">m</span>
            <span className="L ext">i</span>
            <span className="L ext">t</span>
            <span className="L ext">r</span>
            <span className="L ext">i</span>
            <span className="L ext">s</span>
          </span>
          <span className="row row-a">
            <img className="brand-glyph brand-ath" src="/redesign/brand-ath.png" alt="Ath" />
            <span className="L ext">i</span>
            <span className="L ext">n</span>
            <span className="L ext ai">a</span>
            <span className="L ext ai">i</span>
            <span className="L ext">o</span>
            <span className="L ext">s</span>
          </span>
        </h1>

        <aside className="side left" aria-hidden="true">
          <span className="lbl">Dimitris Athinaios</span>
          <span>
            {roleText}
            {isTyping && <span className="strm-caret" />}
          </span>
          <p className="role">
            Hard problems, <em>end to end</em>. Geospatial ML · multi-agent AI · full-stack data systems — the kind of work I'm proud to put my name on.
          </p>
        </aside>

        <aside className="side right" aria-hidden="true">
          <span className="lbl">Etymology</span>
          <div className="key"><span>Athens · Origin</span><b>Ath</b></div>
          <div className="key"><span>Inside · Domain</span><b>In</b></div>
          <div className="key"><span>Intelligence</span><b className="ai-key">Ai</b></div>
          <div className="key"><span>Operating System</span><b>Os</b></div>
        </aside>

        <div className="scroll-cue">
          <span className="line" />
        </div>
      </div>
    </section>
  );
}
