export function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">
            <span className="bar" /><b>05</b><span>Get in touch</span>
          </span>
        </div>

        <div className="contact-hero contact-card reveal">
          <div className="contact-portrait">
            <img src="/redesign/profile.jpg" alt="Dimitris Athinaios" />
          </div>
          <div className="contact-info">
            <h2 className="contact-name">
              Dimitris <em>Athinaios</em>
            </h2>
            <a className="contact-email-new" href="mailto:dimo.atheneos@gmail.com">
              dimo.atheneos@gmail.com
              <span className="arr">↗</span>
            </a>
            <div className="process-note inline">
              <span className="process-label">/ How I build</span>
              <p className="process-text">
                Heavy on <em>AI-assisted</em> development — Claude, Cursor, agents, MCP. For specs I use <a href="https://github.com/ifixai-ai/claude-strike" target="_blank" rel="noopener noreferrer">claude-strike</a>; for diagnosing my AI agents I use <a href="https://github.com/ifixai-ai/iFixAi" target="_blank" rel="noopener noreferrer">Diagnostic by IfixAi</a>. The receipts live at <a href="https://github.com/sirdath" target="_blank" rel="noopener noreferrer">@sirdath</a>.
              </p>
            </div>
          </div>
        </div>

        <div className="linktree reveal">
          <a className="link-btn" href="mailto:dimo.atheneos@gmail.com" aria-label="Email" data-magnetic="0.4">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3 7l9 7l9-7" />
            </svg>
            Email
          </a>
          <a className="link-btn" href="https://linkedin.com/in/Dimitriosath" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-magnetic="0.4">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V21h-4V8zm7 0h3.8v1.78h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.65 4.76 6.1V21h-4v-5.85c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V21H7.5V8z" />
            </svg>
            LinkedIn
          </a>
          <a className="link-btn" href="https://github.com/sirdath" target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-magnetic="0.4">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.6 18.4.5 12 .5z" />
            </svg>
            GitHub
          </a>
        </div>

        <div className="contact-grid reveal">
          <div className="contact-col">
            <h5>Open to · What gets me excited</h5>
            <div className="contact-item">
              <span className="label">
                Data <em>Science</em>
                <span className="sub">anything in the field</span>
              </span>
            </div>
            <div className="contact-item">
              <span className="label">
                AI <em>Engineering</em>
                <span className="sub">anything in the craft</span>
              </span>
            </div>
            <div className="contact-item">
              <span className="label">
                Machine <em>Learning</em>
                <span className="sub">my personal favorite</span>
              </span>
              <span className="badge fav">★ Love</span>
            </div>
          </div>

          <div className="contact-col">
            <h5>Languages · Spoken & written</h5>
            <div className="contact-item">
              <span className="label">Greek<span className="sub">GR · native</span></span>
              <span className="badge">Fluent</span>
            </div>
            <div className="contact-item">
              <span className="label">English<span className="sub">GB · C2 proficient</span></span>
              <span className="badge">Fluent</span>
            </div>
            <div className="contact-item">
              <span className="label">Spanish<span className="sub">ES · B1 intermediate</span></span>
            </div>
          </div>
        </div>

        <div className="site-foot">
          <span>© <b>Dimitris Athinaios</b> · 2026 · DATHPROJECT.COM</span>
          <span>Made with care · London ↔ Athens</span>
        </div>
      </div>
    </section>
  );
}
