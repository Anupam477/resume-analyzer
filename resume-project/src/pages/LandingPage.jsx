import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FileText,
  Check,
  CheckCircle2,
  TrendingUp,
  Search,
  Sparkles,
  Lightbulb,
  BarChart3,
  ArrowRight,
  Sun,
  Moon,
  ExternalLink,
  Briefcase,
  Play,
  Zap,
  Info,
  ChevronDown,
  ShieldCheck,
  Cpu,
  Layers,
  HelpCircle,
  Star,
} from "lucide-react";
import gsap from "gsap";
import ThreeHeroCanvas from "../components/ThreeHeroCanvas";
import "./LandingPage.css";

const API_URL = "http://localhost:5000";

const BENCHMARKS = {
  fullstack: {
    title: "Senior Full-Stack Engineer",
    score: 92,
    badge: "✓ Excellent",
    tierTag: "★ TOP 3% TIER",
    checks: [
      { text: "Strong Skills", active: true },
      { text: "Good Experience", active: true },
      { text: "Well Formatted", active: true },
      { text: "Add More Projects", active: false, info: true },
    ],
    matches: [
      { company: "Google", role: "Software Engineer", match: "92%", logo: "G", logoClass: "em-logo-google" },
      { company: "Microsoft", role: "Full Stack Developer", match: "90%", logo: "M", logoClass: "em-logo-msft" },
      { company: "Amazon", role: "SDE I", match: "88%", logo: "a", logoClass: "em-logo-amzn" },
    ],
  },
  frontend: {
    title: "Staff Frontend Architect",
    score: 95,
    badge: "✓ Top 1% Tier",
    tierTag: "★ TOP 1% STAFF",
    checks: [
      { text: "React 19 & Next.js Core", active: true },
      { text: "Web Vitals & Performance", active: true },
      { text: "TypeScript Type Safety", active: true },
      { text: "Microfrontends Architecture", active: true },
    ],
    matches: [
      { company: "Meta", role: "Staff UI Architect", match: "96%", logo: "M", logoClass: "em-logo-msft" },
      { company: "Netflix", role: "Senior Frontend Engineer", match: "94%", logo: "N", logoClass: "em-logo-google" },
      { company: "Stripe", role: "Design Systems Lead", match: "93%", logo: "S", logoClass: "em-logo-amzn" },
    ],
  },
  ml: {
    title: "Lead ML / AI Engineer",
    score: 91,
    badge: "✓ High Match",
    tierTag: "★ TOP 2% LEAD",
    checks: [
      { text: "PyTorch & Transformers", active: true },
      { text: "LLM Fine-Tuning & RAG", active: true },
      { text: "Vector DB & Embeddings", active: true },
      { text: "Add ML Pipeline CI/CD", active: false, info: true },
    ],
    matches: [
      { company: "OpenAI", role: "Research Engineer", match: "94%", logo: "O", logoClass: "em-logo-google" },
      { company: "DeepMind", role: "Applied Scientist", match: "91%", logo: "D", logoClass: "em-logo-msft" },
      { company: "Anthropic", role: "Model Alignment Engineer", match: "89%", logo: "A", logoClass: "em-logo-amzn" },
    ],
  },
};

const FAQS = [
  {
    q: "How does ResumeCraft score resumes?",
    a: "ResumeCraft uses deterministic NLP tokenization combined with industry-standard Applicant Tracking System (ATS) parsers. Rather than guessing, it extracts exact technical skills, formatting hierarchies, and quantified achievements to benchmark your profile against tier-1 engineering lexicons.",
  },
  {
    q: "Is my resume kept private and secure?",
    a: "Yes, 100%. Resumes are processed in volatile memory with encryption. We never sell your personal contact info, and you can delete your resume data at any time from your dashboard.",
  },
  {
    q: "Can I target specific job descriptions?",
    a: "Absolutely. In Step 2 of the analysis wizard, you can paste any custom job description or requirements. ResumeCraft will compute an exact match percentage, highlight missing keywords, and suggest targeted bullet point rewrites.",
  },
  {
    q: "How do the AI bullet rewrites work?",
    a: "Our rewrite engine converts passive job duties into high-impact, quantified achievement statements using the Google XYZ formula: 'Accomplished [X] as measured by [Y], by doing [Z]'.",
  },
  {
    q: "Can I export my results as a verifiable PDF report?",
    a: "Yes. From the results page, click 'Export Report (PDF)' to generate a cleanly formatted, executive-ready PDF report summarizing your ATS index, skill matches, and recommended improvements.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  // Live stats & jobs from backend
  const [stats, setStats] = useState({
    totalAudits: 54280,
    avgScore: 92,
    accuracyRate: 98.4,
    latencyMs: 380,
    activeJobs: 10,
  });

  const [liveJobs, setLiveJobs] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeBenchmark, setActiveBenchmark] = useState("fullstack");
  const [openFaq, setOpenFaq] = useState(0);

  // 3D Parallax Tilt for Tablet Card
  const [tilt, setTilt] = useState({ rx: 6, ry: -8, tx: 0, ty: 0 });

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: 6 - y * 12,
      ry: -8 + x * 14,
      tx: x * 8,
      ty: y * 8,
    });
  };

  const handleHeroMouseLeave = () => {
    setTilt({ rx: 6, ry: -8, tx: 0, ty: 0 });
  };

  // User session
  const userEmail = localStorage.getItem("userEmail") || "";
  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "A";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await axios.get(`${API_URL}/stats`).catch(() => null);
        if (statsRes?.data) setStats(statsRes.data);

        const jobsRes = await axios.get(`${API_URL}/jobs`).catch(() => null);
        if (jobsRes?.data && Array.isArray(jobsRes.data)) {
          setLiveJobs(jobsRes.data.slice(0, 4));
        }
      } catch (err) {
        console.warn("Could not fetch platform data:", err.message);
      }
    };
    fetchData();
  }, []);

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".em-anim-item", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".em-tablet-card", {
        opacity: 0,
        scale: 0.94,
        y: 35,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
      });

      gsap.from(".em-feature-card", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.4,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const currentBench = BENCHMARKS[activeBenchmark] || BENCHMARKS.fullstack;
  const strokeOffset = 251.2 - (251.2 * currentBench.score) / 100;

  return (
    <div className="em-page" ref={heroRef}>
      {/* 3D Neural Particle Canvas */}
      <ThreeHeroCanvas />

      {/* Dot Matrix Decorator top-right */}
      <div className="em-dot-grid" aria-hidden="true" />

      {/* =========================================================================
          1. NAVBAR (Exact Match to Reference)
          ========================================================================= */}
      <header className="em-nav">
        <div className="em-container em-nav-inner">
          {/* Logo */}
          <div className="em-logo" onClick={() => navigate("/")}>
            <div className="em-logo-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="m9 15 2 2 4-4" />
              </svg>
            </div>
            <span className="em-logo-text">ResumeCraft</span>
          </div>

          {/* Center Pill Dock */}
          <nav className="em-pill-dock">
            <button className="em-dock-item active" onClick={() => navigate("/")}>
              Home
            </button>
            <button className="em-dock-item" onClick={() => navigate("/home")}>
              Analyze CV
            </button>
            <button className="em-dock-item" onClick={() => navigate("/jobs")}>
              Live Jobs
            </button>
            <button className="em-dock-item" onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>
            <a href="#pricing" className="em-dock-item">
              Pricing
            </a>
          </nav>

          {/* Right: Theme Toggle & Avatar */}
          <div className="em-nav-right">
            <button
              className="em-icon-circle-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div
              className="em-user-avatar"
              onClick={() => navigate(userEmail ? "/dashboard" : "/login")}
              title={userEmail ? `Logged in as ${userEmail}` : "Sign In"}
            >
              {userInitial}
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. HERO SECTION (Split: Left Typography + Right Live ATS Tablet)
          ========================================================================= */}
      <main
        className="em-hero-split"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        <div className="em-container">
          <div className="em-hero-grid">
            {/* Left Column */}
            <div className="em-hero-left">
              {/* Pill Subtitle */}
              <div className="em-anim-item em-sub-pill">
                <span className="em-sub-pill-icon">⚡</span>
                <span>Smarter Resume. Better Opportunities.</span>
              </div>

              {/* Main Headline */}
              <h1 className="em-anim-item em-hero-title">
                Turn Your Resume<br />
                into an{" "}
                <span className="em-opportunity-word">
                  Opportunity
                  <span className="em-brush-underline" />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="em-anim-item em-hero-subtext">
                Analyze your resume with AI, discover matching jobs, and get personalized tips to stand out in the hiring process.
              </p>

              {/* CTA Row */}
              <div className="em-anim-item em-cta-row">
                <button
                  className="em-btn-analyze"
                  onClick={() => navigate("/home")}
                >
                  <span>🚀 Analyze Resume</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  className="em-btn-demo"
                  onClick={() => {
                    const el = document.getElementById("features");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else navigate("/home");
                  }}
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Social Proof with Handwritten Arrow */}
              <div className="em-anim-item em-social-proof">
                <div className="em-avatar-stack">
                  <img
                    className="em-avatar-img"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                  <img
                    className="em-avatar-img"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                  <img
                    className="em-avatar-img"
                    src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                  <img
                    className="em-avatar-img"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                </div>

                <div className="em-proof-text">
                  <div className="em-stars-rating">
                    <span className="em-gold-stars">★★★★★</span>
                    <span className="em-rating-num">4.9/5</span>
                  </div>
                  <strong>1M+ Candidates</strong>
                  <span>Students & Top Engineers Hired</span>
                </div>

                {/* Curved Arrow Callout */}
                <div className="em-handwritten-callout">
                  <svg
                    className="em-curved-arrow"
                    viewBox="0 0 40 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M 30 10 Q 15 15 10 32" />
                    <polyline points="5 26 10 33 17 29" />
                  </svg>
                  <span>Join thousands who got hired!</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live ATS Analytics Tablet Dashboard */}
            <div className="em-hero-right">
              {/* Glowing Orbital Rings Directly Behind The Tablet Card */}
              <div className="em-card-ring-outer" aria-hidden="true" />
              <div className="em-card-ring-inner" aria-hidden="true" />
              <div className="em-card-glow-halo" aria-hidden="true" />

              {/* Floating 3D Translucent Glass Briefcase Icon */}
              <div className="em-floating-briefcase" title="Matched Career Opportunity">
                <Briefcase className="w-8 h-8" />
              </div>

              {/* The Elevated Tablet Card with 3D Parallax */}
              <div
                className="em-tablet-card"
                style={{
                  transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translate3d(${tilt.tx}px, ${tilt.ty}px, 0)`,
                }}
              >
                {/* Benchmark Selector Pills */}
                <div className="em-bench-switcher">
                  <button
                    className={`em-bench-pill ${activeBenchmark === "fullstack" ? "active" : ""}`}
                    onClick={() => setActiveBenchmark("fullstack")}
                  >
                    Full-Stack
                  </button>
                  <button
                    className={`em-bench-pill ${activeBenchmark === "frontend" ? "active" : ""}`}
                    onClick={() => setActiveBenchmark("frontend")}
                  >
                    Frontend
                  </button>
                  <button
                    className={`em-bench-pill ${activeBenchmark === "ml" ? "active" : ""}`}
                    onClick={() => setActiveBenchmark("ml")}
                  >
                    AI / ML
                  </button>
                </div>

                {/* Tablet Header */}
                <div className="em-tablet-top">
                  <div className="em-tablet-logo">
                    <div className="em-logo-icon" style={{ width: 26, height: 26 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="m9 15 2 2 4-4" />
                      </svg>
                    </div>
                    <span>ResumeCraft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="em-gold-tier-badge">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{currentBench.tierTag}</span>
                    </span>
                    <span className="em-trend-badge" title="Placement Velocity High">
                      <TrendingUp className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Upper Section: Circular Ring Gauge + Checklist */}
                <div className="em-tablet-metrics-row">
                  {/* Circular Ring Gauge */}
                  <div className="em-ring-cluster">
                    <div className="em-svg-gauge-box">
                      <svg className="em-svg-gauge" viewBox="0 0 100 100">
                        <circle
                          className="em-ring-bg"
                          cx="50"
                          cy="50"
                          r="40"
                          strokeWidth="10"
                          fill="none"
                        />
                        <circle
                          className="em-ring-fill"
                          cx="50"
                          cy="50"
                          r="40"
                          strokeWidth="10"
                          fill="none"
                          strokeDasharray="251.2"
                          strokeDashoffset={strokeOffset}
                        />
                      </svg>
                      <div className="em-ring-center-content">
                        <div className="em-ring-val">{currentBench.score}%</div>
                        <div className="em-ring-label">ATS SCORE</div>
                      </div>
                    </div>
                    <span className="em-excellent-pill">{currentBench.badge}</span>
                  </div>

                  {/* Checklist on Right */}
                  <div className="em-checklist">
                    {currentBench.checks.map((item, idx) => (
                      <div
                        key={idx}
                        className={`em-check-item ${item.active ? "active" : "warning"}`}
                      >
                        {item.active ? (
                          <span className="em-check-icon">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="em-warning-icon">
                            <Info className="w-3 h-3" />
                          </span>
                        )}
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lower Section: Top Job Matches */}
                <div className="em-tablet-jobs-section">
                  <div className="em-jobs-header-line">
                    <span className="em-jobs-title">Top Job Matches</span>
                    <span className="em-view-all-link" onClick={() => navigate("/jobs")}>
                      View All →
                    </span>
                  </div>

                  <div className="em-job-match-rows">
                    {currentBench.matches.map((m, idx) => (
                      <div
                        key={idx}
                        className="em-match-row"
                        onClick={() => navigate("/home")}
                      >
                        <div className="em-company-badge-group">
                          <div className={`em-company-logo-box ${m.logoClass}`}>
                            {m.logo}
                          </div>
                          <div className="em-job-name-col">
                            <div className="em-company-name">{m.company}</div>
                            <div className="em-job-role-name">{m.role}</div>
                          </div>
                        </div>
                        <span className="em-pct-badge">{m.match} Match</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* =========================================================================
          3. BOTTOM BAR: 4 FEATURE CARDS (Pinned Glassmorphism Row)
          ========================================================================= */}
      <section className="em-bottom-bar-section" id="features">
        <div className="em-container">
          <div className="em-feature-cards-grid">
            {/* Card 1 */}
            <div className="em-feature-card" onClick={() => navigate("/home")}>
              <div className="em-feat-icon-box">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="em-feat-content">
                <div className="em-feat-title">AI-Powered Analysis</div>
                <div className="em-feat-desc">Get instant ATS score & personalized insights.</div>
              </div>
              <ArrowRight className="w-4 h-4 em-feat-arrow" />
            </div>

            {/* Card 2 */}
            <div className="em-feature-card" onClick={() => navigate("/jobs")}>
              <div className="em-feat-icon-box">
                <Search className="w-5 h-5" />
              </div>
              <div className="em-feat-content">
                <div className="em-feat-title">Discover Jobs</div>
                <div className="em-feat-desc">Find the best opportunities for your skills.</div>
              </div>
              <ArrowRight className="w-4 h-4 em-feat-arrow" />
            </div>

            {/* Card 3 */}
            <div className="em-feature-card" onClick={() => navigate("/home")}>
              <div className="em-feat-icon-box em-feat-gold">
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>
              <div className="em-feat-content">
                <div className="em-feat-title">Smart Suggestions</div>
                <div className="em-feat-desc">Improve with expert tips and recommendations.</div>
              </div>
              <ArrowRight className="w-4 h-4 em-feat-arrow" />
            </div>

            {/* Card 4 */}
            <div className="em-feature-card" onClick={() => navigate("/dashboard")}>
              <div className="em-feat-icon-box">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="em-feat-content">
                <div className="em-feat-title">Track Progress</div>
                <div className="em-feat-desc">Monitor your growth and scores over time.</div>
              </div>
              <ArrowRight className="w-4 h-4 em-feat-arrow" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. HOW IT WORKS (4-Stage Algorithmic Pipeline)
          ========================================================================= */}
      <section className="em-section-wrap">
        <div className="em-container">
          <div className="em-section-header">
            <div className="em-tag-label">ALGORITHMIC PIPELINE</div>
            <h2 className="em-section-heading">How ResumeCraft elevates your candidacy.</h2>
            <p className="em-section-subheading">
              A deterministic 4-stage pipeline that deconstructs your resume the exact way enterprise applicant tracking parsers do.
            </p>
          </div>

          <div className="em-pipeline-row">
            <div className="em-pipeline-box">
              <div className="em-pipeline-badge">01</div>
              <h3>Raw PDF Ingestion</h3>
              <p>Extracts plaintext tokens, structural sections, and technical keywords with zero OCR loss.</p>
            </div>

            <div className="em-pipeline-box">
              <div className="em-pipeline-badge">02</div>
              <h3>Lexicon Benchmarking</h3>
              <p>Cross-checks your profile against modern tech stacks (React, Node, Cloud, DB, DevOps).</p>
            </div>

            <div className="em-pipeline-box">
              <div className="em-pipeline-badge">03</div>
              <h3>Void & Gap Radar</h3>
              <p>Highlights missing high-weight competencies that prevent your CV from clearing screening gates.</p>
            </div>

            <div className="em-pipeline-box">
              <div className="em-pipeline-badge">04</div>
              <h3>Direct Job Routing</h3>
              <p>Computes instant compatibility percentages for open positions at Google, Amazon, Meta & Microsoft.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. BENTO GRID: ENTERPRISE ARCHITECTURE
          ========================================================================= */}
      <section className="em-section-wrap">
        <div className="em-container">
          <div className="em-section-header">
            <div className="em-tag-label">ENTERPRISE ARCHITECTURE</div>
            <h2 className="em-section-heading">Engineered for high-impact candidates.</h2>
            <p className="em-section-subheading">
              Built on production-grade parsing engines with verified corporate benchmark taxonomies.
            </p>
          </div>

          <div className="em-bento-grid">
            {/* Bento Card 1: Deterministic NLP */}
            <div className="em-bento-card em-bento-wide">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-5 h-5 text-[#00ff87]" />
                <h3 className="text-lg font-bold text-white">Deterministic NLP Tokenization</h3>
              </div>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Unlike generic LLM wrappers that hallucinate nonexistent credentials, ResumeCraft uses deterministic parsing rules to inspect your exact skills and experience metrics.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React 19", "TypeScript 5.8", "Node.js", "GraphQL", "PostgreSQL", "Docker", "AWS Lambda"].map((tag) => (
                  <span key={tag} className="em-tech-chip">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bento Card 2: Keyword Void Radar */}
            <div className="em-bento-card">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Keyword Void Radar</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Pinpoints high-value missing competencies before recruiters discard your profile.
              </p>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold flex items-center gap-2">
                <span>⚠️ Missing: Redis caching, CI/CD pipelines</span>
              </div>
            </div>

            {/* Bento Card 3: Screening Bypass */}
            <div className="em-bento-card">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#00ff87]" />
                <h3 className="text-lg font-bold text-white">Recruiter Screening Bypass</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Verified against real ATS filters (Workday, Greenhouse, Lever, Taleo) to maximize callback conversion.
              </p>
              <div className="em-pct-badge inline-block text-xs">Tier A • Guaranteed Pass</div>
            </div>

            {/* Bento Card 4: Sub-Second Latency */}
            <div className="em-bento-card em-bento-wide">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-bold text-white">Sub-400ms In-Memory Extraction</h3>
                </div>
                <span className="font-mono text-xs text-[#00ff87] font-bold">Latency: 380ms</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                High-throughput PDF parsing pipeline running with sub-second response times and immediate telemetry feedback.
              </p>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-[#00ff87] w-4/5 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. LIVE JOBS SHOWCASE
          ========================================================================= */}
      <section className="em-section-wrap">
        <div className="em-container">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="em-tag-label">VERIFIED TECH OPENINGS</div>
              <h2 className="em-section-heading mb-0 text-left">Matched roles for audited resumes.</h2>
            </div>
            <button
              onClick={() => navigate("/jobs")}
              className="em-btn-demo"
            >
              <span>Explore All Jobs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="em-live-jobs-grid">
            {liveJobs.length > 0
              ? liveJobs.map((job) => (
                  <div key={job._id || job.title} className="em-saas-job-card">
                    <div>
                      <div className="em-job-pill-row">
                        <span className="em-co-badge">{job.company}</span>
                        <span className="em-pct-badge">Match Ready</span>
                      </div>
                      <h4 className="text-white font-bold text-sm mb-3">{job.title}</h4>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {(job.skillsRequired || []).slice(0, 3).map((sk) => (
                          <span key={sk} className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-300">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate("/home")}
                      className="em-audit-role-btn"
                    >
                      <span>Audit CV For Role</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              : [
                  { title: "Software Engineer", company: "Google", tags: ["React", "TypeScript", "Node.js"] },
                  { title: "Full Stack Developer", company: "Microsoft", tags: ["React", "Cloud", "SQL"] },
                  { title: "SDE I", company: "Amazon", tags: ["Java", "AWS", "DynamoDB"] },
                  { title: "Frontend Architect", company: "Netflix", tags: ["React", "Performance"] },
                ].map((job, idx) => (
                  <div key={idx} className="em-saas-job-card">
                    <div>
                      <div className="em-job-pill-row">
                        <span className="em-co-badge">{job.company}</span>
                        <span className="em-pct-badge">92% Match</span>
                      </div>
                      <h4 className="text-white font-bold text-sm mb-3">{job.title}</h4>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {job.tags.map((t) => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate("/home")}
                      className="em-audit-role-btn"
                    >
                      <span>Audit CV For Role</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. INTERACTIVE FAQ ACCORDION
          ========================================================================= */}
      <section className="em-section-wrap">
        <div className="em-container">
          <div className="em-section-header">
            <div className="em-tag-label">FREQUENTLY ASKED QUESTIONS</div>
            <h2 className="em-section-heading">Everything you need to know.</h2>
            <p className="em-section-subheading">Got questions about ATS audits, security, or job matching? We've got answers.</p>
          </div>

          <div className="em-faq-list max-w-3xl mx-auto">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`em-faq-item ${isOpen ? "open" : ""}`}
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                >
                  <div className="em-faq-question">
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#00ff87]" : "text-slate-400"}`} />
                  </div>
                  {isOpen && (
                    <div className="em-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. PRICING SECTION
          ========================================================================= */}
      <section id="pricing" className="em-section-wrap">
        <div className="em-container">
          <div className="em-section-header">
            <div className="em-tag-label">PRICING PLANS</div>
            <h2 className="em-section-heading">Simple investment for career growth.</h2>
            <p className="em-section-subheading">Choose the plan that fits your career acceleration goals.</p>
          </div>

          <div className="em-pricing-row">
            {/* Community Free */}
            <div className="em-price-box">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Community Audit</h3>
                <p className="text-xs text-slate-400 mb-4">Essential ATS checking for active job seekers.</p>
                <div className="em-price-num">$0 <span>/ forever</span></div>
                <ul className="em-feature-list">
                  <li><CheckCircle2 className="w-4 h-4" /> Instant PDF parse in &lt; 400ms</li>
                  <li><CheckCircle2 className="w-4 h-4" /> Real ATS score & keyword index</li>
                  <li><CheckCircle2 className="w-4 h-4" /> Top verified tech jobs access</li>
                  <li><CheckCircle2 className="w-4 h-4" /> Recent session audit history</li>
                </ul>
              </div>
              <button
                onClick={() => navigate("/home")}
                className="em-btn-demo w-full justify-center"
              >
                Start Free Audit
              </button>
            </div>

            {/* Pro Featured */}
            <div className="em-price-box featured">
              <span className="em-featured-tag">MOST POPULAR</span>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Pro Engineer</h3>
                <p className="text-xs text-emerald-300 mb-4">Comprehensive suite for maximum interview call rates.</p>
                <div className="em-price-num">$19 <span>/ month</span></div>
                <ul className="em-feature-list">
                  <li><CheckCircle2 className="w-4 h-4" /> Everything in Community</li>
                  <li><CheckCircle2 className="w-4 h-4" /> Keyword Void Radar & Gap Analysis</li>
                  <li><CheckCircle2 className="w-4 h-4" /> AI Quantified Bullet Point Rewrites</li>
                  <li><CheckCircle2 className="w-4 h-4" /> Custom Job Description Targeting</li>
                  <li><CheckCircle2 className="w-4 h-4" /> Downloadable PDF Audit Reports</li>
                </ul>
              </div>
              <button
                onClick={() => navigate("/home")}
                className="em-btn-analyze w-full justify-center text-center"
              >
                Upgrade to Pro
              </button>
            </div>

            {/* Lifetime */}
            <div className="em-price-box">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Lifetime Pass</h3>
                <p className="text-xs text-slate-400 mb-4">One-time payment for perpetual access.</p>
                <div className="em-price-num">$49 <span>/ one-time</span></div>
                <ul className="em-feature-list">
                  <li><CheckCircle2 className="w-4 h-4" /> All current & future Pro features</li>
                  <li><CheckCircle2 className="w-4 h-4" /> Unlimited resume audit versions</li>
                  <li><CheckCircle2 className="w-4 h-4" /> Direct recruiter referral queue</li>
                  <li><CheckCircle2 className="w-4 h-4" /> Priority scanning processing</li>
                </ul>
              </div>
              <button
                onClick={() => navigate("/home")}
                className="em-btn-demo w-full justify-center"
              >
                Get Lifetime Pass
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FOOTER
          ========================================================================= */}
      <footer className="em-footer">
        <div className="em-container em-footer-row">
          <div className="flex items-center gap-2.5">
            <div className="em-logo-icon" style={{ width: 24, height: 24 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="m9 15 2 2 4-4" />
              </svg>
            </div>
            <span className="font-bold text-white text-sm">ResumeCraft</span>
            <span className="text-slate-500">• AI Resume Intelligence</span>
          </div>

          <div className="em-footer-links">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/home")}>Analyze CV</button>
            <button onClick={() => navigate("/jobs")}>Live Jobs</button>
            <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button onClick={() => navigate("/login")}>Sign In</button>
          </div>

          <div>© {new Date().getFullYear()} ResumeCraft. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
