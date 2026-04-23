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
          background: "var(--bg-main)",
          color: "var(--text-main)",
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
            background: "var(--glass-bg)",
            borderRadius: "22px",
            padding: "40px 30px",
            textAlign: "center",
            border: "1px solid var(--glass-border)",
            boxShadow: "0 20px 50px var(--glass-shadow)",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "14px" }}>⚠️</div>

          <h2
            style={{
              marginBottom: "12px",
              fontSize: "2rem",
              color: "var(--text-main)",
            }}
          >
            No Resume Analysis Found
          </h2>

          <p
            style={{
              color: "var(--text-muted)",
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
              background: "linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))",
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
    <div className="page-animate"
      style={{
        minHeight: "calc(100vh - 75px)",
        padding: "40px 20px",
        color: "var(--text-main)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            marginBottom: "10px",
            fontWeight: "800",
            color: "var(--text-main)",
          }}
        >
          Resume Analysis 🚀
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            marginBottom: "28px",
            fontSize: "1rem",
          }}
        >
          Review your ATS score, detected skills, missing technologies, and job recommendations.
        </p>

        <div className="glass-panel"
          style={{
            marginTop: "20px",
            padding: "28px",
          }}
        >
          <h2 style={{ color: "var(--text-muted)", marginBottom: "8px" }}>ATS Score</h2>
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
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <h2 style={{ marginBottom: "16px", color: "var(--text-main)" }}>Detected Skills</h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {skills.length > 0 ? (
              skills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    background: "linear-gradient(90deg, var(--accent-secondary), var(--accent-primary))",
                    padding: "9px 14px",
                    borderRadius: "999px",
                    color: "#fff",
                    fontWeight: "500",
                    boxShadow: "0 8px 18px var(--glow-2)",
                  }}
                >
                  {skill}
                </span>
              ))
            ) : (
              <p style={{ color: "var(--text-muted)", margin: 0 }}>No skills detected.</p>
            )}
          </div>
        </div>

        <div
          style={{
            marginTop: "25px",
            padding: "25px",
            borderRadius: "20px",
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
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
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
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
            <p style={{ color: "var(--text-muted)" }}>Great! Your resume looks strong 🚀</p>
          )}
        </div>

        <h2 style={{ marginTop: "30px", marginBottom: "16px", color: "var(--text-main)" }}>
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
                  background: "var(--glass-bg)",
                  padding: "24px",
                  borderRadius: "20px",
                  border: "1px solid var(--glass-border)",
                  boxShadow: "0 16px 35px var(--glass-shadow)",
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: "12px", fontSize: "1.7rem" }}>
                  {job.title}
                </h3>

                <p style={{ margin: "8px 0", color: "var(--text-main)" }}>
                  <strong>Company:</strong> {job.company}
                </p>

                <p style={{ margin: "8px 0", color: "var(--text-main)" }}>
                  <strong>Required:</strong> {(job.skillsRequired || []).join(", ")}
                </p>

                <p style={{ margin: "8px 0", color: "var(--accent-primary)" }}>
                  <strong>Matched:</strong> {matched.join(", ") || "None"}
                </p>

                <p style={{ margin: "8px 0", color: "var(--accent-secondary)" }}>
                  <strong>Match:</strong> {job.matchPercent || 0}%
                </p>

                <button className="btn-glow"
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
                    background: "linear-gradient(90deg, var(--accent-secondary), var(--accent-primary))",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "1rem",
                    boxShadow: "0 12px 24px var(--glow-2)",
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
            background: "var(--bg-secondary)",
            border: "1px solid var(--accent-secondary)",
            boxShadow: "0 12px 30px var(--glow-2)",
          }}
        >
          <h2
            style={{
              color: "var(--accent-secondary)",
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
                          : "var(--bg-secondary)",
                        border: isPoint
                          ? "1px solid rgba(248,113,113,0.18)"
                          : "1px solid var(--glass-border)",
                      }}
                    >
                      <span style={{ fontSize: "1rem", marginTop: "2px" }}>
                        {isPoint ? "⚠️" : "✨"}
                      </span>

                      <span
                        style={{
                          color: isPoint ? "#fecaca" : "var(--text-main)",
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
            <p style={{ color: "var(--text-muted)", margin: 0 }}>No AI analysis available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobsPage;