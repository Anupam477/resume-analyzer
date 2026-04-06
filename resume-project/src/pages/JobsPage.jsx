import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function JobsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const skills = location.state?.skills || [];
  const score = location.state?.score || 0;
  const jobs = location.state?.jobs || [];
  const suggestions = location.state?.suggestions || [];
  const aiAnalysis = location.state?.aiAnalysis || "";

  const skillDatabase = [
    "java",
    "python",
    "c",
    "c++",
    "javascript",
    "react",
    "node",
    "express",
    "mongodb",
    "mysql",
    "html",
    "css",
    "bootstrap",
    "sql",
    "git",
    "github",
  ];

  const missingSkills = skillDatabase.filter((skill) => !skills.includes(skill));

  const getScoreColor = (value) => {
    if (value >= 80) return "#22c55e";
    if (value >= 60) return "#f59e0b";
    return "#ef4444";
  };

  if (!location.state) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#020617,#0f172a,#1e293b)",
          color: "#fff",
          padding: "40px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "22px",
            padding: "40px 30px",
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "14px" }}>⚠️</div>

          <h2
            style={{
              marginBottom: "12px",
              fontSize: "2rem",
              color: "#f8fafc",
            }}
          >
            No Resume Analysis Found
          </h2>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.7",
              marginBottom: "24px",
            }}
          >
            First upload your resume from the Home page. After analysis, your
            jobs and AI suggestions will appear here.
          </p>

          <button
            onClick={() => navigate("/")}
            style={{
              padding: "12px 22px",
              borderRadius: "12px",
              border: "none",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1rem",
            }}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "linear-gradient(135deg,#020617,#0f172a,#1e293b)",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            marginBottom: "10px",
            fontWeight: "800",
            color: "#f8fafc",
          }}
        >
          Resume Analysis 🚀
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "28px",
            fontSize: "1rem",
          }}
        >
          Review your ATS score, detected skills, missing technologies, and job recommendations.
        </p>

        <div
          style={{
            marginTop: "20px",
            padding: "28px",
            borderRadius: "22px",
            textAlign: "center",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
          }}
        >
          <h2 style={{ color: "#cbd5e1", marginBottom: "8px" }}>ATS Score</h2>
          <h1
            style={{
              fontSize: "3.2rem",
              color: getScoreColor(score),
              margin: 0,
              fontWeight: "800",
            }}
          >
            {score}%
          </h1>
        </div>

        <div
          style={{
            marginTop: "25px",
            padding: "25px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "16px", color: "#f8fafc" }}>Detected Skills</h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {skills.length > 0 ? (
              skills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
                    padding: "9px 14px",
                    borderRadius: "999px",
                    color: "#fff",
                    fontWeight: "500",
                    boxShadow: "0 8px 18px rgba(37,99,235,0.22)",
                  }}
                >
                  {skill}
                </span>
              ))
            ) : (
              <p style={{ color: "#94a3b8", margin: 0 }}>No skills detected.</p>
            )}
          </div>
        </div>

        <div
          style={{
            marginTop: "25px",
            padding: "25px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2 style={{ color: "#f87171", marginBottom: "16px" }}>Missing Skills</h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {missingSkills.slice(0, 6).map((skill, i) => (
              <span
                key={i}
                style={{
                  background: "rgba(127,29,29,0.9)",
                  padding: "9px 14px",
                  borderRadius: "999px",
                  color: "#fff",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "25px",
            padding: "25px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2 style={{ color: "#22c55e", marginBottom: "16px" }}>AI Suggestions 💡</h2>

          {suggestions && suggestions.length > 0 ? (
            <div style={{ display: "grid", gap: "12px" }}>
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "14px",
                    background: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.18)",
                    color: "#dcfce7",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#cbd5e1" }}>Great! Your resume looks strong 🚀</p>
          )}
        </div>

        <h2 style={{ marginTop: "30px", marginBottom: "16px", color: "#f8fafc" }}>
          Recommended Jobs
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "22px",
            marginTop: "15px",
          }}
        >
          {jobs.map((job, i) => {
            const matched = (job.skillsRequired || []).filter((s) =>
              skills.includes(s)
            );

            return (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "24px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 16px 35px rgba(0,0,0,0.16)",
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: "12px", fontSize: "1.7rem" }}>
                  {job.title}
                </h3>

                <p style={{ margin: "8px 0", color: "#e2e8f0" }}>
                  <strong>Company:</strong> {job.company}
                </p>

                <p style={{ margin: "8px 0", color: "#e2e8f0" }}>
                  <strong>Required:</strong> {(job.skillsRequired || []).join(", ")}
                </p>

                <p style={{ margin: "8px 0", color: "#4ade80" }}>
                  <strong>Matched:</strong> {matched.join(", ") || "None"}
                </p>

                <p style={{ margin: "8px 0", color: "#60a5fa" }}>
                  <strong>Match:</strong> {job.matchPercent || 0}%
                </p>

                <button
                  onClick={() =>
                    window.open(
                      job.applyLink || "https://www.linkedin.com/jobs/",
                      "_blank"
                    )
                  }
                  style={{
                    width: "100%",
                    marginTop: "14px",
                    padding: "12px",
                    borderRadius: "12px",
                    border: "none",
                    background: "linear-gradient(90deg, #2563eb, #4f46e5)",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "1rem",
                    boxShadow: "0 12px 24px rgba(37,99,235,0.24)",
                  }}
                >
                  Apply Now
                </button>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: "30px",
            padding: "28px",
            borderRadius: "22px",
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(99,102,241,0.12))",
            border: "1px solid rgba(59,130,246,0.22)",
            boxShadow: "0 12px 30px rgba(59,130,246,0.14)",
          }}
        >
          <h2
            style={{
              color: "#93c5fd",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "1.6rem",
            }}
          >
            🤖 AI-Powered Resume Insights
          </h2>

          {aiAnalysis ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {aiAnalysis
                .split("\n")
                .filter((line) => line.trim() !== "")
                .map((line, i) => {
                  const isPoint = line.trim().startsWith("-");

                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        padding: "14px 16px",
                        borderRadius: "14px",
                        background: isPoint
                          ? "rgba(248,113,113,0.08)"
                          : "rgba(255,255,255,0.05)",
                        border: isPoint
                          ? "1px solid rgba(248,113,113,0.18)"
                          : "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <span style={{ fontSize: "1rem", marginTop: "2px" }}>
                        {isPoint ? "⚠️" : "✨"}
                      </span>

                      <span
                        style={{
                          color: isPoint ? "#fecaca" : "#e2e8f0",
                          lineHeight: "1.7",
                          fontSize: "0.98rem",
                        }}
                      >
                        {line.replace("-", "").trim()}
                      </span>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p style={{ color: "#cbd5e1", margin: 0 }}>No AI analysis available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobsPage;