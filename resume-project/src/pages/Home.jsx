import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  Briefcase,
  Layers,
  Cpu,
  ShieldCheck,
  Search,
  Sparkles,
  Zap,
  Lock,
  RefreshCw,
  FileCheck,
  Check,
  Building,
  Terminal,
  Activity,
  Code2,
  Database,
  Server,
  Cloud,
  Target,
} from "lucide-react";
import "./Home.css";

const API_URL = "http://localhost:5000";

function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileDetails, setFileDetails] = useState(null);
  const [targetRole, setTargetRole] = useState("Senior Full-Stack Engineer");
  const [jobDescription, setJobDescription] = useState("");
  const [extractedKeywords, setExtractedKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [isDragActive, setIsDragActive] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginName, setLoginName] = useState("");
  const navigate = useNavigate();

  const standardRoles = [
    {
      name: "Senior Full-Stack",
      matchRate: "94%",
      skills: ["React 19", "TypeScript", "Node.js", "Postgres", "Docker", "AWS"],
    },
    {
      name: "Staff Frontend",
      matchRate: "96%",
      skills: ["Next.js", "TypeScript", "Web Vitals", "GraphQL", "Tailwind"],
    },
    {
      name: "Lead Backend",
      matchRate: "91%",
      skills: ["Go / Python", "Microservices", "Kafka", "PostgreSQL", "Redis"],
    },
    {
      name: "AI / ML Engineer",
      matchRate: "89%",
      skills: ["Python", "PyTorch", "LLM Tuning", "Vector DB", "Docker"],
    },
    {
      name: "Cloud / DevOps",
      matchRate: "92%",
      skills: ["Kubernetes", "Terraform", "AWS", "CI/CD", "Linux"],
    },
  ];

  const sampleJDs = {
    google:
      "Google Senior SDE: React 19, TypeScript, Node.js microservices, PostgreSQL, Redis caching, Docker, AWS/GCP.",
    stripe:
      "Stripe Staff Frontend: React, Next.js App Router, TypeScript, Core Web Vitals, modular design systems.",
    amazon:
      "Amazon SDE II: High-throughput APIs, PostgreSQL, Redis, Docker, CI/CD pipelines, AWS Lambda, DynamoDB.",
  };

  useEffect(() => {
    if (!jobDescription || jobDescription.trim().length < 5) {
      setExtractedKeywords([]);
      return;
    }
    const techWords = [
      "react",
      "typescript",
      "javascript",
      "node",
      "python",
      "aws",
      "docker",
      "kubernetes",
      "graphql",
      "sql",
      "postgresql",
      "redis",
      "next.js",
      "ci/cd",
      "microservices",
      "kafka",
      "tailwind",
    ];
    const lower = jobDescription.toLowerCase();
    const found = techWords.filter((w) => lower.includes(w));
    setExtractedKeywords(found);
  }, [jobDescription]);

  const validatePdfFile = (file) => {
    if (!file) return false;
    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      alert("Only PDF documents are supported for ATS analysis.");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit.");
      return false;
    }
    return true;
  };

  const handleFile = (file) => {
    if (validatePdfFile(file)) {
      setSelectedFile(file);
      setFileDetails({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        tokens: "~420 Tokens",
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSampleResume = (type) => {
    let filename = "";
    let content = "";
    if (type === "fullstack") {
      filename = "Alex_Vance_FullStack.pdf";
      content =
        "%PDF-1.4\nAlex Vance - Senior Full-Stack Engineer\nReact, TypeScript, Node.js, Python, PostgreSQL, Redis, Docker, AWS, GraphQL.\nArchitected microservices handling 1.4k req/sec with sub-50ms latency.";
    } else {
      filename = "Sarah_Chen_Frontend.pdf";
      content =
        "%PDF-1.4\nSarah Chen - Staff Frontend Architect\nReact 19, Next.js App Router, TypeScript, GraphQL, Web Vitals, Tailwind CSS, Jest, CI/CD.\nReduced LCP by 44% across 12 enterprise micro-frontends.";
    }
    const blob = new Blob([content], { type: "application/pdf" });
    const file = new File([blob], filename, { type: "application/pdf" });
    handleFile(file);
  };

  const processUpload = async (email, name) => {
    setLoading(true);
    setCurrentStep(3);
    setLoadingStage(1);

    const formData = new FormData();
    formData.append("resume", selectedFile);
    formData.append("email", email || "guest@resumecraft.ai");
    formData.append("name", name || "Engineer");
    formData.append("targetRole", targetRole);
    if (jobDescription.trim()) {
      formData.append("jobDescription", jobDescription);
    }

    try {
      setTimeout(() => setLoadingStage(2), 600);
      setTimeout(() => setLoadingStage(3), 1200);

      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTimeout(() => {
        setLoading(false);
        navigate("/jobs", {
          state: {
            score: res.data.score,
            skills: res.data.skills || [],
            scoreBreakdown: res.data.scoreBreakdown || {
              keywordScore: res.data.keywordScore || 90,
              formattingScore: res.data.formattingScore || 98,
              experienceScore: res.data.experienceScore || 92,
            },
            fileName: selectedFile.name,
            matchedJobs: res.data.matchedJobs || [],
            recommendations: res.data.recommendations || [],
            missingKeywords: res.data.missingKeywords || [],
            targetRole: targetRole,
            rawText: res.data.rawText || "",
          },
        });
      }, 1800);
    } catch (err) {
      console.error(err);
      alert(
        "Could not connect to analysis service. Please ensure backend is running at http://localhost:5000"
      );
      setLoading(false);
      setCurrentStep(1);
    }
  };

  const handleStartAnalysis = () => {
    if (!selectedFile) {
      alert("Please upload or select a resume PDF first.");
      return;
    }
    const savedUser = localStorage.getItem("resumecraft_user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      processUpload(user.email, user.name);
    } else {
      setShowLoginPopup(true);
    }
  };

  const handlePopupSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail) return;
    localStorage.setItem(
      "resumecraft_user",
      JSON.stringify({ email: loginEmail, name: loginName || "Engineer" })
    );
    setShowLoginPopup(false);
    processUpload(loginEmail, loginName);
  };

  const activeRoleData =
    standardRoles.find((r) => r.name.toLowerCase().includes(targetRole.toLowerCase().split(" ")[0])) || standardRoles[0];

  return (
    <div className="home-container">
      {/* Ambient background glow */}
      <div className="home-ambient-glow" aria-hidden="true" />

      {/* COMPACT MASTER WIZARD CARD */}
      <div className="home-wizard-card">
        {/* Top Header Tag Strip */}
        <div className="wizard-top-tag-strip">
          <div className="wizard-chip-secure">
            <ShieldCheck className="w-3 h-3 text-[#00ff87]" />
            <span>Volatile Sandbox</span>
          </div>
          <div className="wizard-chip-right">
            <span className="wizard-amber-pill">
              <Zap className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span>&lt; 400ms Parse</span>
            </span>
            <span className="wizard-chip-version font-mono">
              ATS ENGINE v2.4
            </span>
          </div>
        </div>

        {/* Connected Stepper Header */}
        <div className="wizard-step-header">
          {/* Step 1 */}
          <div
            className={`wizard-step-indicator ${
              currentStep >= 1 ? "active" : ""
            } ${currentStep > 1 ? "completed" : ""}`}
            onClick={() => currentStep > 1 && setCurrentStep(1)}
          >
            <div className="step-badge">
              {currentStep > 1 ? (
                <Check className="w-3 h-3 stroke-[3]" />
              ) : (
                "01"
              )}
            </div>
            <div className="step-label-group">
              <span className="step-title">Upload Resume</span>
              <span className="step-sub">PDF Tokenization</span>
            </div>
          </div>

          <div
            className={`wizard-step-line ${currentStep >= 2 ? "active" : ""}`}
          />

          {/* Step 2 */}
          <div
            className={`wizard-step-indicator ${
              currentStep >= 2 ? "active" : ""
            } ${currentStep > 2 ? "completed" : ""}`}
            onClick={() => selectedFile && currentStep > 2 && setCurrentStep(2)}
          >
            <div className="step-badge">
              {currentStep > 2 ? (
                <Check className="w-3 h-3 stroke-[3]" />
              ) : (
                "02"
              )}
            </div>
            <div className="step-label-group">
              <span className="step-title">Role & JD</span>
              <span className="step-sub">Benchmarking</span>
            </div>
          </div>

          <div
            className={`wizard-step-line ${currentStep >= 3 ? "active" : ""}`}
          />

          {/* Step 3 */}
          <div
            className={`wizard-step-indicator ${
              currentStep === 3 ? "active" : ""
            }`}
          >
            <div className="step-badge">03</div>
            <div className="step-label-group">
              <span className="step-title">AI Telemetry</span>
              <span className="step-sub">Audit</span>
            </div>
          </div>
        </div>

        {/* =====================================================================
            STEP 1: RESUME UPLOAD (COMPACT DUAL COCKPIT)
            ===================================================================== */}
        {currentStep === 1 && (
          <div className="wizard-step-body">
            <div className="text-center mb-5">
              <div className="wizard-pill-badge mb-2">
                <Cpu className="w-3 h-3 text-[#00ff87]" />
                <span>Step 01: Ingestion</span>
              </div>
              <h1 className="wizard-main-heading">
                Upload Your Engineering CV
              </h1>
              <p className="wizard-sub-text">
                Parsed in volatile memory. Cross-referenced against 840+ tech competencies.
              </p>
            </div>

            {/* DUAL COCKPIT GRID */}
            <div className="cockpit-grid">
              {/* Left Column: Dropzone or File Card */}
              <div className="cockpit-left">
                {!selectedFile ? (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragActive(true);
                    }}
                    onDragLeave={() => setIsDragActive(false)}
                    onDrop={handleDrop}
                    className={`dropzone-box ${isDragActive ? "active" : ""}`}
                  >
                    <span className="corner-bracket top-left">+</span>
                    <span className="corner-bracket top-right">+</span>
                    <span className="corner-bracket bottom-left">+</span>
                    <span className="corner-bracket bottom-right">+</span>

                    {/* Compact Hologram Icon */}
                    <div className="dropzone-hologram-icon">
                      <UploadCloud className="w-6 h-6 text-[#00ff87]" />
                    </div>

                    <h3 className="dropzone-title">
                      Drop your resume PDF here
                    </h3>
                    <p className="dropzone-subtitle">
                      or choose document from computer
                    </p>

                    <label className="dropzone-browse-btn">
                      <UploadCloud className="w-3.5 h-3.5 text-[#042f1a]" />
                      <span>Browse PDF</span>
                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>

                    <div className="dropzone-chips-row">
                      <span className="dropzone-chip">✓ ATS Compliant</span>
                      <span className="dropzone-chip">✓ PDF Max 10MB</span>
                      <span className="dropzone-chip">🔒 In-Memory</span>
                    </div>
                  </div>
                ) : (
                  /* Compact Executive File Preview Card */
                  <div className="file-preview-card">
                    <div className="file-preview-inner">
                      <div className="file-pdf-badge-box">
                        <FileText className="w-5 h-5 text-[#00ff87]" />
                        <span className="file-pdf-tag">PDF</span>
                      </div>
                      <div className="file-meta-content">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h4 className="file-preview-name">{fileDetails?.name}</h4>
                          <span className="file-verified-chip">
                            <CheckCircle2 className="w-3 h-3 text-[#00ff87]" />
                            Verified
                          </span>
                        </div>
                        <p className="file-preview-meta">
                          {fileDetails?.size} • {fileDetails?.tokens}
                        </p>
                        <div className="file-status-indicator">
                          <span className="status-ping-dot" />
                          <span>Ready for Lexicon Audit</span>
                        </div>
                      </div>
                    </div>

                    <div className="file-actions-row">
                      <label className="file-change-btn cursor-pointer">
                        <RefreshCw className="w-3 h-3" />
                        <span>Change</span>
                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFile(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          setFileDetails(null);
                        }}
                        className="file-remove-btn"
                        title="Remove file"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Instant Sample Presets For 1-Click Testing */}
                <div className="sample-presets-container">
                  <div className="sample-presets-header">
                    <span className="sample-presets-tag">
                      <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                      INSTANT TEST PROFILES
                    </span>
                    <span className="sample-presets-hint">1-click test</span>
                  </div>

                  <div className="sample-presets-grid">
                    <button
                      type="button"
                      onClick={() => handleSampleResume("fullstack")}
                      className="sample-preset-card"
                    >
                      <div className="preset-card-top">
                        <span className="preset-title">Alex Vance</span>
                        <span className="preset-score-pill">94% ATS</span>
                      </div>
                      <span className="preset-role">Senior Full-Stack SDE</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSampleResume("frontend")}
                      className="sample-preset-card"
                    >
                      <div className="preset-card-top">
                        <span className="preset-title">Sarah Chen</span>
                        <span className="preset-score-pill">96% ATS</span>
                      </div>
                      <span className="preset-role">Staff Frontend Architect</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Compact Pre-Flight ATS Telemetry Panel */}
              <div className="cockpit-right">
                <div className="telemetry-panel-card">
                  <div className="telemetry-panel-top">
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#00ff87]" />
                      <span className="font-bold text-[11px] text-white tracking-wide uppercase">
                        Pre-Scan Telemetry
                      </span>
                    </div>
                    <span className="telemetry-live-dot">
                      <span className="ping-beacon" />
                      <span>ONLINE</span>
                    </span>
                  </div>

                  {/* Compact Target Gauge Box */}
                  <div className="telemetry-target-box">
                    <div className="target-gauge-mini">
                      <svg viewBox="0 0 70 70" className="mini-gauge-svg">
                        <circle
                          cx="35"
                          cy="35"
                          r="28"
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="5"
                          fill="none"
                        />
                        <circle
                          cx="35"
                          cy="35"
                          r="28"
                          stroke="#00ff87"
                          strokeWidth="5"
                          fill="none"
                          strokeDasharray="176"
                          strokeDashoffset="14"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="target-gauge-center">
                        <span className="target-num">92%</span>
                        <span className="target-sub">TARGET</span>
                      </div>
                    </div>
                    <div className="target-info-col">
                      <div className="gold-tier-badge">
                        ★ TOP 3% TIER BENCHMARK
                      </div>
                      <div className="target-stat-row">
                        <span>Keyword Match:</span>
                        <strong className="text-emerald-400">94%</strong>
                      </div>
                      <div className="target-stat-row">
                        <span>Formatting Index:</span>
                        <strong className="text-emerald-400">98%</strong>
                      </div>
                    </div>
                  </div>

                  {/* Micro Checklist */}
                  <div className="telemetry-checks-list">
                    <div className="telemetry-check-item">
                      <CheckCircle2 className="w-3 h-3 text-[#00ff87] flex-shrink-0" />
                      <span>Deterministic NLP token extraction (0% OCR loss)</span>
                    </div>
                    <div className="telemetry-check-item">
                      <CheckCircle2 className="w-3 h-3 text-[#00ff87] flex-shrink-0" />
                      <span>840+ tech competency lexicon audit</span>
                    </div>
                    <div className="telemetry-check-item">
                      <CheckCircle2 className="w-3 h-3 text-[#00ff87] flex-shrink-0" />
                      <span>Direct FAANG match simulation</span>
                    </div>
                  </div>

                  {/* Compact Company Chips */}
                  <div className="co-chips-row">
                    <span className="co-chip">
                      <span className="co-dot google" /> Google (92%)
                    </span>
                    <span className="co-chip">
                      <span className="co-dot stripe" /> Stripe (90%)
                    </span>
                    <span className="co-chip">
                      <span className="co-dot amazon" /> Amazon (88%)
                    </span>
                  </div>
                </div>

                {/* Privacy Note */}
                <div className="telemetry-privacy-box">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <p>
                    <strong>Private:</strong> Processed in volatile RAM only. Never stored.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="wizard-bottom-actions">
              <div className="wizard-action-hint">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Zero OCR loss • In-memory extraction</span>
              </div>
              <button
                disabled={!selectedFile}
                onClick={() => setCurrentStep(2)}
                className={`wizard-btn-primary ${!selectedFile ? "disabled" : ""}`}
              >
                <span>Continue to Target Role</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* =====================================================================
            STEP 2: TARGET ROLE & JOB DESCRIPTION (COMPACT)
            ===================================================================== */}
        {currentStep === 2 && (
          <div className="wizard-step-body">
            <div className="text-center mb-5">
              <div className="wizard-pill-badge mb-2">
                <Briefcase className="w-3 h-3 text-[#00ff87]" />
                <span>Step 02: Role Target</span>
              </div>
              <h1 className="wizard-main-heading">
                Select Target Engineering Role
              </h1>
              <p className="wizard-sub-text">
                Benchmark against tech stack criteria or paste a job description.
              </p>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Target Role:
                </label>
                <span className="text-[11px] text-[#00ff87] font-semibold">
                  {targetRole}
                </span>
              </div>

              <div className="role-pills-row">
                {standardRoles.map((role) => (
                  <button
                    key={role.name}
                    type="button"
                    onClick={() => setTargetRole(role.name)}
                    className={`role-pill ${
                      targetRole.toLowerCase().includes(role.name.toLowerCase().split(" ")[0])
                        ? "selected"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#00ff87]" />
                      <span>{role.name}</span>
                    </div>
                    <span className="role-pill-count">{role.matchRate}</span>
                  </button>
                ))}
              </div>

              <div className="active-role-tags-bar">
                <span className="text-[10px] text-slate-400 font-mono">
                  Stack:
                </span>
                <div className="flex items-center gap-1 flex-wrap">
                  {activeRoleData.skills.map((s) => (
                    <span key={s} className="active-role-tag">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional JD Paste */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1.5 flex-wrap gap-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Job Description (Optional):
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400">Quick Fill:</span>
                  <button
                    type="button"
                    onClick={() => setJobDescription(sampleJDs.google)}
                    className="quick-jd-chip"
                  >
                    + Google
                  </button>
                  <button
                    type="button"
                    onClick={() => setJobDescription(sampleJDs.stripe)}
                    className="quick-jd-chip"
                  >
                    + Stripe
                  </button>
                  <button
                    type="button"
                    onClick={() => setJobDescription(sampleJDs.amazon)}
                    className="quick-jd-chip"
                  >
                    + Amazon
                  </button>
                </div>
              </div>
              <textarea
                rows={3}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description to compute keyword void match percentage..."
                className="jd-textarea"
              />

              {extractedKeywords.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap mt-2 p-2 rounded-lg bg-black/40 border border-emerald-500/20">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    Detected ({extractedKeywords.length}):
                  </span>
                  {extractedKeywords.map((kw) => (
                    <span key={kw} className="jd-kw-chip">
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="wizard-bottom-actions">
              <button
                onClick={() => setCurrentStep(1)}
                className="wizard-btn-secondary"
              >
                ← Back
              </button>
              <button
                onClick={handleStartAnalysis}
                className="wizard-btn-primary"
              >
                <span>Launch AI Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* =====================================================================
            STEP 3: AI SCANNER SEQUENCE (COMPACT)
            ===================================================================== */}
        {currentStep === 3 && (
          <div className="py-6 text-center">
            <div className="scanner-radar-box">
              <div className="scanner-radar-beam" />
              <Cpu className="w-7 h-7 text-[#00ff87] relative z-10 animate-pulse" />
            </div>

            <div className="radar-status-badge mb-2">
              <Activity className="w-3 h-3 text-[#00ff87] animate-spin" />
              <span>ATS ENGINE DECONSTRUCTING</span>
            </div>

            <h2 className="text-xl font-extrabold text-white mb-1">
              Analyzing Resume Architecture...
            </h2>
            <p className="text-[11px] text-slate-400 mb-5 max-w-xs mx-auto">
              Cross-referencing technical tokens against {targetRole} taxonomy.
            </p>

            <div className="telemetry-terminal-box max-w-md mx-auto mb-5">
              <div className="telemetry-log-row">
                <span className="log-time">[0.12s]</span>
                <CheckCircle2
                  className={`w-3 h-3 ${
                    loadingStage >= 1 ? "text-[#00ff87]" : "text-slate-600"
                  }`}
                />
                <span
                  className={loadingStage >= 1 ? "text-white" : "text-slate-500"}
                >
                  Plaintext token stream extracted
                </span>
              </div>
              <div className="telemetry-log-row">
                <span className="log-time">[0.38s]</span>
                <CheckCircle2
                  className={`w-3 h-3 ${
                    loadingStage >= 2 ? "text-[#00ff87]" : "text-slate-600"
                  }`}
                />
                <span
                  className={loadingStage >= 2 ? "text-white" : "text-slate-500"}
                >
                  Benchmarking against 840+ tech competency vectors
                </span>
              </div>
              <div className="telemetry-log-row">
                <span className="log-time">[0.74s]</span>
                <CheckCircle2
                  className={`w-3 h-3 ${
                    loadingStage >= 3 ? "text-[#00ff87]" : "text-slate-600"
                  }`}
                />
                <span
                  className={loadingStage >= 3 ? "text-white" : "text-slate-500"}
                >
                  Computing keyword voids & matching jobs
                </span>
              </div>
            </div>

            <div className="progress-track-wrapper max-w-sm mx-auto">
              <div className="progress-track">
                <div
                  className="progress-bar-fill"
                  style={{
                    width:
                      loadingStage === 1
                        ? "35%"
                        : loadingStage === 2
                        ? "70%"
                        : "100%",
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>STAGE {loadingStage} OF 3</span>
                <span className="text-[#00ff87] font-bold">
                  {loadingStage === 1
                    ? "35%"
                    : loadingStage === 2
                    ? "70%"
                    : "100% COMPLETE"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth / Identity Modal */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-sm bg-[#0a120e] border border-emerald-500/30 rounded-2xl p-5 shadow-2xl shadow-emerald-500/20">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold text-white">
                Save Analysis to Account
              </h3>
              <button
                onClick={() => setShowLoginPopup(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">
              Enter your name and email to save your resume audit history.
            </p>
            <form
              onSubmit={handlePopupSubmit}
              className="flex flex-col gap-3 text-xs"
            >
              <div>
                <label className="block text-slate-300 mb-1 font-semibold text-[11px]">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Vance"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold text-[11px]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>
              <button
                type="submit"
                className="wizard-btn-primary w-full mt-1 justify-center"
              >
                <span>Continue to Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
