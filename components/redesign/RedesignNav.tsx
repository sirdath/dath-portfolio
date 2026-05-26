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
          <a href="#work" data-magnetic="0.5">Work</a>
          <a href="#skills" data-magnetic="0.5">Skills</a>
          <a href="#trajectory" data-magnetic="0.5">Trajectory</a>
          <a href="#contact" data-magnetic="0.5">Contact</a>
        </div>
      </div>
    </nav>
  );
}
