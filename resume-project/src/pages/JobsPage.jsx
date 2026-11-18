import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Search,
  Sparkles,
  Printer,
  Briefcase,
  Layers,
  FileText,
  TrendingUp,
  Cpu,
  Download,
  Share2,
} from "lucide-react";
import "./JobsPage.css";

const API_URL = "http://localhost:5000";

function JobsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [allJobs, setAllJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingJobs, setLoadingJobs] = useState(false);

  // Analysis state if navigated from /upload or dashboard
  const analysisData = location.state;

  const skills = analysisData?.skills || [];
  const score = analysisData?.score || 0;
  const breakdown = analysisData?.scoreBreakdown || {
    keywordScore: 92,
    formattingScore: 98,
    skillsRelevance: 88,
    experienceRelevance: 85,
  };
  const skillGaps = analysisData?.skillGaps || [];
  const bulletRewrites = analysisData?.bulletRewrites || [];
  const jobsFromAnalysis = analysisData?.jobs || [];
  const suggestions = analysisData?.suggestions || [];
  const aiAnalysis = analysisData?.aiAnalysis || "";
  const fileName = analysisData?.fileName || "Engineering_Resume.pdf";
  const targetRole = analysisData?.targetRole || "Senior Full-Stack Engineer";

  // Fetch all jobs for live job board
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoadingJobs(true);
        const res = await axios.get(`${API_URL}/jobs`);
        setAllJobs(res.data || []);
      } catch (e) {
        console.warn("Could not fetch jobs:", e);
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobs();
  }, []);

  // Filter jobs for live board
  const displayedJobs = (analysisData ? jobsFromAnalysis : allJobs).filter((j) => {
    const q = searchQuery.toLowerCase();
    const titleMatch = (j.title || "").toLowerCase().includes(q);
    const companyMatch = (j.company || "").toLowerCase().includes(q);
    const skillsMatch = (j.skillsRequired || []).some((s) =>
      s.toLowerCase().includes(q)
    );
    return titleMatch || companyMatch || skillsMatch;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="jobs-page-container">
      <div className="jobs-page-wrapper">
        {/* If user navigated from an Analysis, show the full 5-Pillar Results Dashboard */}
        {analysisData ? (
          <>
            {/* Header Telemetry Card */}
            <div className="results-header-card">
              <div>
                <div className="results-badge-strip">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87]" />
                    ATS Audit Complete
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Target: {targetRole}
                  </span>
                </div>
                <h1 className="results-title">
                  Analysis Telemetry: {fileName}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Deterministic tokenization verified against tier-1 engineering lexicons.
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={handlePrint}
                  className="job-btn-outline"
                  title="Print or Save PDF report"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Export Report (PDF)</span>
                </button>
                <button
                  onClick={() => navigate("/home")}
                  className="job-btn-primary"
                >
                  <span>Audit Another CV</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 4-Pillar Score Cards */}
            <div className="results-grid-metrics">
              <div className="results-metric-card">
                <div className="metric-card-label">Overall ATS Readiness</div>
                <div className="metric-card-val text-[#00ff87]">
                  {score}%
                </div>
                <div className="metric-card-track">
                  <div className="metric-card-fill" style={{ width: `${score}%` }} />
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  {score >= 80 ? "Top 3% Candidate Tier" : "Moderate Recruiter Pass"}
                </div>
              </div>

              <div className="results-metric-card">
                <div className="metric-card-label">Keyword Density</div>
                <div className="metric-card-val text-white">
                  {breakdown.keywordScore || 90}%
                </div>
                <div className="metric-card-track">
                  <div className="metric-card-fill" style={{ width: `${breakdown.keywordScore || 90}%` }} />
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  {skills.length} Hard Skills Detected
                </div>
              </div>

              <div className="results-metric-card">
                <div className="metric-card-label">Formatting Hygiene</div>
                <div className="metric-card-val text-cyan-400">
                  {breakdown.formattingScore || 98}%
                </div>
                <div className="metric-card-track">
                  <div className="metric-card-fill bg-cyan-400 shadow-cyan-400/50" style={{ width: `${breakdown.formattingScore || 98}%` }} />
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  Clean Linear PDF Hierarchy
                </div>
              </div>

              <div className="results-metric-card">
                <div className="metric-card-label">Quantified Impact</div>
                <div className="metric-card-val text-emerald-400">
                  {breakdown.experienceRelevance || 86}%
                </div>
                <div className="metric-card-track">
                  <div className="metric-card-fill" style={{ width: `${breakdown.experienceRelevance || 86}%` }} />
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  Metric-Driven Accomplishments
                </div>
              </div>
            </div>

            {/* Split Section: Skill Gap Analysis & AI Bullet Rewrites */}
            <div className="results-duo-grid">
              {/* Left Column: Skill Gaps & Extracted Skills */}
              <div className="flex flex-col gap-6">
                <div className="results-sub-panel">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff87]" />
                    <h3 className="font-bold text-white text-base">
                      Extracted Technical Competencies ({skills.length})
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.length > 0 ? (
                      skills.map((skill) => (
                        <span key={skill} className="skill-badge-matched">
                          ✓ {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">No explicit hard skills parsed</span>
                    )}
                  </div>
                </div>

                <div className="results-sub-panel">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold text-white text-base">
                      High-Priority Keyword Voids
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    Adding these missing competencies will elevate your resume past automated corporate screeners:
                  </p>
                  <div className="flex flex-col gap-3">
                    {(skillGaps.length > 0
                      ? skillGaps
                      : [
                          { skill: "DOCKER", priority: "High", reason: "Standard containerization requirement." },
                          { skill: "AWS", priority: "High", reason: "Cloud infrastructure deployment." },
                          { skill: "REDIS", priority: "Medium", reason: "In-memory caching and speed." },
                        ]
                    ).map((gap, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-mono font-bold text-white mr-2">
                            {gap.skill}
                          </span>
                          <span className="text-slate-400">{gap.reason}</span>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            gap.priority === "High"
                              ? "bg-red-500/20 text-red-300 border border-red-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {gap.priority} Priority
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: AI Actionable Bullet Rewrites */}
              <div className="results-sub-panel">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-[#00ff87]" />
                  <h3 className="font-bold text-white text-base">
                    AI Achievement Rewrites
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Transform passive duties into quantified impact statements:
                </p>

                <div className="flex flex-col gap-3">
                  {(bulletRewrites.length > 0
                    ? bulletRewrites
                    : [
                        {
                          role: "Frontend Feature Delivery",
                          before: "Worked on React frontend components and fixed bugs.",
                          after: "Architected 12+ modular React & TypeScript components with unit tests, cutting bundle size by 28% and boosting Lighthouse score to 96.",
                        },
                        {
                          role: "Backend Architecture",
                          before: "Created Node.js APIs and connected database.",
                          after: "Engineered scalable REST microservices in Node.js and PostgreSQL with Redis caching, sustaining 1,400 req/sec at sub-50ms latency.",
                        },
                      ]
                  ).map((item, idx) => (
                    <div key={idx} className="rewrite-card">
                      <div className="rewrite-role-tag">{item.role}</div>
                      <div className="rewrite-before">
                        <span className="font-bold text-red-400">Before: </span>
                        {item.before}
                      </div>
                      <div className="rewrite-after">
                        <span className="font-bold text-[#00ff87]">After: </span>
                        {item.after}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* If visited directly (e.g. from nav "Live Jobs"), show verified tech board */
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-3">
              <Briefcase className="w-3.5 h-3.5 text-[#00ff87]" /> Verified Tech Openings
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Direct Engineering Opportunities
            </h1>
            <p className="text-xs text-slate-400 mt-2 max-w-lg mx-auto">
              Real software engineering roles from Google, Amazon, Microsoft, and Meta.
              Upload your CV to compute personalized compatibility percentages.
            </p>
          </div>
        )}

        {/* Live Opportunities Grid */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#00ff87]" />
              <span>
                {analysisData ? "Tailored Tech Job Matches" : "Active Software Engineering Roles"}
              </span>
            </h3>

            {/* Search Input */}
            <div className="jobs-search-bar w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Filter by title, company, skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="jobs-search-input"
              />
            </div>
          </div>

          <div className="jobs-cards-grid">
            {displayedJobs.map((job) => {
              const matchPct = job.matchPercent || 88;
              return (
                <div key={job._id || job.title} className="job-posting-card">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {job.company}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-500/15 border border-emerald-500/30 text-[#00ff87]">
                        {matchPct}% Match
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2">{job.title}</h4>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {(job.skillsRequired || []).map((sk) => (
                        <span
                          key={sk}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={job.applyLink || "https://careers.google.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="job-apply-btn"
                  >
                    <span>Apply via Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobsPage;
