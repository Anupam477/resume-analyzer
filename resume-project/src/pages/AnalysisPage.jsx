import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Printer,
  Sparkles,
  Briefcase,
  FileText,
  Cpu,
  Layers,
} from "lucide-react";
import "./AnalysisPage.css";

function AnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div className="analysis-container">
        <div className="section" style={{ textAlign: "center", padding: "60px 30px" }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 20,
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            color: "#00ff87",
          }}>
            <FileText className="w-8 h-8" />
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", marginBottom: 8 }}>
            No Active Analysis Found
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#94a3b8", maxWidth: 420, margin: "0 auto 28px", lineHeight: 1.6 }}>
            Upload a resume PDF to run deterministic parsing, detect technical skills, calculate keyword voids, and benchmark against top tech roles.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
            <button
              className="next-btn"
              style={{ marginTop: 0 }}
              onClick={() => navigate("/home")}
            >
              Upload Resume (PDF) →
            </button>
            <button
              className="next-btn"
              style={{
                marginTop: 0,
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
                boxShadow: "none",
              }}
              onClick={() => navigate("/dashboard")}
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const score = data.score || 88;
  const skills = data.skills || [];
  const suggestions = data.suggestions || [
    "Quantify your project outcomes with precise percentage gains.",
    "Add modern cloud infrastructure keywords like AWS and Docker.",
  ];

  return (
    <div className="analysis-container">
      <div style={{ maxWidth: 840, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 999, background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#00ff87", fontSize: "0.78rem", fontWeight: 700, marginBottom: 16 }}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Deterministic Audit Complete</span>
        </div>

        <h1>Resume Intelligence Report</h1>
        <p style={{ color: "#94a3b8", fontSize: "0.92rem", marginBottom: 30 }}>
          Comprehensive scoring breakdown and high-impact recommendation matrix.
        </p>

        {/* Circular Score Badge */}
        <div className="score-box">
          <h2>{score}%</h2>
          <p>ATS SCORE</p>
        </div>

        {/* Detected Skills */}
        <div className="section">
          <h3>
            <Layers className="w-5 h-5 inline mr-2 text-[#00ff87]" />
            Extracted Technical Competencies ({skills.length})
          </h3>
          <div className="skills">
            {skills.length > 0 ? (
              skills.map((skill, i) => (
                <span key={i}>✓ {skill}</span>
              ))
            ) : (
              <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>No skills detected</p>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="section">
          <h3>
            <Sparkles className="w-5 h-5 inline mr-2 text-[#00ff87]" />
            Algorithmic Recommendations
          </h3>
          <ul>
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
          <button
            className="next-btn"
            style={{ marginTop: 0 }}
            onClick={() =>
              navigate("/jobs", {
                state: {
                  jobs: data.jobs,
                  skills: data.skills,
                  score: data.score,
                  scoreBreakdown: data.scoreBreakdown,
                  skillGaps: data.skillGaps,
                  bulletRewrites: data.bulletRewrites,
                },
              })
            }
          >
            Explore Matched Tech Jobs →
          </button>
          <button
            className="next-btn"
            style={{
              marginTop: 0,
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              color: "#ffffff",
              boxShadow: "none",
            }}
            onClick={() => navigate("/home")}
          >
            Audit Another CV
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
