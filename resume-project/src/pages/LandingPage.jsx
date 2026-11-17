import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="ref-landing-container bg-dot-matrix">
      {/* Background Radial Violet Spotlight */}
      <div className="hero-violet-spotlight absolute inset-0 pointer-events-none -z-10" />

      {/* =========================================================================
          1. TOP NAVIGATION (Matching the pill nav in reference image)
          ========================================================================= */}
      <header className="ref-header">
        {/* Brand Logo */}
        <div className="ref-logo" onClick={() => navigate('/')}>
          <span className="ref-logo-icon">🌱</span>
          <span className="ref-logo-text">ResumeCraft</span>
        </div>

        {/* Center Pill Dock */}
        <nav className="ref-pill-dock">
          <button className="ref-dock-link active" onClick={() => navigate('/')}>
            Home
          </button>
          <button className="ref-dock-link" onClick={() => navigate('/home')}>
            Analyze
          </button>
          <button className="ref-dock-link" onClick={() => navigate('/jobs')}>
            Jobs
          </button>
          <button className="ref-dock-link" onClick={() => navigate('/dashboard')}>
            Dashboard
          </button>
        </nav>

        {/* Right Action */}
        <div className="ref-nav-right">
          <button className="ref-btn-outline" onClick={() => navigate('/home')}>
            Upload CV
          </button>
        </div>
      </header>

      {/* =========================================================================
          2. HERO SECTION
          ========================================================================= */}
      <main className="ref-hero-section">
        {/* Tagline Horizontal Links */}
        <div className="ref-tagline-row">
          <span className="ref-tag-item">→ Instant parsing</span>
          <span className="ref-tag-item">→ Keyword radar</span>
          <span className="ref-tag-item">→ Career doctor</span>
        </div>

        {/* Main Headline with Sparkle & Floating "NEW DROP" Sticker */}
        <div className="ref-title-wrapper">
          {/* Sparkle Icon Badge on the left */}
          <div className="ref-sparkle-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
            </svg>
          </div>

          <h1 className="ref-headline">
            Grow your career,<br />
            one interview a month.
          </h1>

          {/* Floating Rotated Circular Sticker Badge on the right */}
          <div className="ref-sticker-badge">
            <span>ATS</span>
            <span>READY</span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="ref-subtext">
          Parsed, benchmarked and optimized to pass modern screening algorithms.<br className="hidden sm:inline" />
          Direct algorithmic feedback delivered to your screen in under 400ms.
        </p>

        {/* Dual Pill Action Buttons */}
        <div className="ref-cta-group">
          <button className="btn-ref-primary" onClick={() => navigate('/home')}>
            Start my audit
          </button>
          <button className="btn-ref-ghost" onClick={() => navigate('/jobs')}>
            How it works
          </button>
        </div>

        {/* =========================================================================
            3. THREE SHOWCASE DASHBOARD CARDS (Exact match to reference image)
            ========================================================================= */}
        <div className="ref-cards-stage">
          {/* LEFT CARD: Light Cream "Shelf health" / "Resume health" Card */}
          <div className="ref-card ref-card-left">
            <div className="ref-card-header">
              <div className="ref-icon-box-purple">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                </svg>
              </div>
              <span className="ref-card-title text-slate-800">Resume health</span>
            </div>

            {/* List of Skills with Purple Bars & Numeric Scores */}
            <div className="ref-skills-list">
              {[
                { name: 'React.js', score: 92, pct: '92%' },
                { name: 'TypeScript', score: 88, pct: '88%' },
                { name: 'Node.js', score: 97, pct: '97%' },
                { name: 'SQL Databases', score: 74, pct: '74%' },
                { name: 'System Design', score: 61, pct: '61%' },
              ].map((item) => (
                <div key={item.name} className="ref-skill-row">
                  <span className="ref-skill-name">{item.name}</span>
                  <div className="ref-bar-track">
                    <div className="ref-bar-fill" style={{ width: item.pct }} />
                  </div>
                  <span className="ref-skill-score">{item.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER HERO CARD: Elevated Solid Purple "Plant of the month" / "Score Gauge" Card */}
          <div className="ref-card ref-card-center">
            <span className="ref-center-badge-text">ATS Match Score</span>

            {/* Semi-circular Speedometer Gauge */}
            <div className="ref-gauge-container">
              <svg className="ref-gauge-svg" viewBox="0 0 200 120">
                {/* Background track arc */}
                <path
                  d="M 25 105 A 75 75 0 0 1 175 105"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.22)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                {/* Active white indicator arc */}
                <path
                  d="M 25 105 A 75 75 0 0 1 175 105"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="16"
                  strokeDasharray="235"
                  strokeDashoffset="24"
                  strokeLinecap="round"
                />
              </svg>
              {/* Giant Numeric Score in the center */}
              <div className="ref-gauge-number">92</div>
            </div>

            <div className="ref-center-subtitle">
              Senior Engineer, thriving
            </div>
          </div>

          {/* RIGHT CARD: Light Cream "Watering streak" / "Interview streak" Card */}
          <div className="ref-card ref-card-right">
            <div className="ref-card-header justify-between">
              <div className="flex items-center gap-2">
                <div className="ref-icon-box-purple">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                </div>
                <span className="ref-card-title text-slate-800">Interview streak</span>
              </div>
              <span className="text-xs font-semibold text-slate-500">12 weeks</span>
            </div>

            {/* Line Chart Graphic */}
            <div className="ref-chart-wrapper">
              <svg className="ref-line-chart" viewBox="0 0 260 100" preserveAspectRatio="none">
                {/* Horizontal Baseline Grids */}
                <line x1="0" y1="20" x2="260" y2="20" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                <line x1="0" y1="50" x2="260" y2="50" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                <line x1="0" y1="80" x2="260" y2="80" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />

                {/* Purple Upward Trend Line */}
                <polyline
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="10,80 50,70 90,55 130,62 170,42 210,32 250,22"
                />
              </svg>
            </div>
          </div>
        </div>
      </main>

      {/* =========================================================================
          4. HOW IT WORKS & CAPABILITIES (Clean Editorial Flow)
          ========================================================================= */}
      <section className="ref-features-section">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-[#a78bfa] font-bold">
            Deterministic Analysis
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#faf7f2] mt-2">
            Engineered to bypass ATS filters.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="ref-feature-pill-card">
            <div className="ref-feat-num">01</div>
            <h3 className="text-lg font-bold text-[#faf7f2] mb-2">NLP Tokenization</h3>
            <p className="text-sm text-[#e8dcc4]/70">
              Extracts hard tech skills, years of experience, and taxonomy tags with zero hallucination.
            </p>
          </div>

          <div className="ref-feature-pill-card">
            <div className="ref-feat-num">02</div>
            <h3 className="text-lg font-bold text-[#faf7f2] mb-2">Keyword Void Radar</h3>
            <p className="text-sm text-[#e8dcc4]/70">
              Exposes missing high-weight competencies that prevent your CV from reaching hiring teams.
            </p>
          </div>

          <div className="ref-feature-pill-card">
            <div className="ref-feat-num">03</div>
            <h3 className="text-lg font-bold text-[#faf7f2] mb-2">Live Match Routing</h3>
            <p className="text-sm text-[#e8dcc4]/70">
              Automatically calculates percent compatibility against open positions at Google, Amazon & Meta.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FOOTER
          ========================================================================= */}
      <footer className="ref-footer">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#e8dcc4]/60">
          <div className="flex items-center gap-2">
            <span>🌱</span>
            <span className="font-bold text-[#faf7f2]">ResumeCraft</span>
            <span>• Built for high-growth engineers</span>
          </div>
          <div>© 2026 ResumeCraft. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
