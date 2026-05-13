/**
 * Sticky top navigation for the redesign. Brand mark + location +
 * section anchors + availability status pill. Single-line, nowrap.
 * The brand img has id="navBrand" so RedesignHero can fade it in
 * once the flying hero logo docks at the top-left.
 */
export function RedesignNav() {
  return (
    <nav className="nav">
      <div className="nav-left">
        <a className="nav-brand" id="navBrand" href="#top" aria-label="DATHPROJECT — back to top">
          <img src="/redesign/dath-logo.png" alt="DATH brand mark" />
        </a>
        <span className="nav-loc">London · UK</span>
      </div>
      <div className="nav-right">
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#trajectory">Trajectory</a>
        </div>
        <a className="status-pill nav-status" href="#contact">
          <span className="dot" aria-hidden="true" />
          <span className="when">Aug 15, 2026</span>
        </a>
      </div>
    </nav>
  );
}
