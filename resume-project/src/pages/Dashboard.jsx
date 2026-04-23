import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchResumes = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/resumes?email=${userEmail}`);
      setResumes(res.data || []);
    } catch (error) {
      console.log("Error fetching resumes:", error);
      alert("Failed to load resumes. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this resume?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/resumes/${id}`);
      fetchResumes();
    } catch (error) {
      console.log("Delete error:", error);
      alert("Delete failed");
    }
  };

  const handleViewJobs = (item) => {
    navigate("/jobs", {
      state: {
        skills: item.skills || [],
        score: item.score || 0,
        jobs: item.jobs || [],
        suggestions: item.suggestions || [],
        aiAnalysis: item.aiAnalysis || "",
        fileName: item.filename || "Resume",
      },
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="page-animate"
      style={{
        minHeight: "calc(100vh - 75px)",
        padding: "50px 20px",
        color: "var(--text-main)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "3rem",
            marginBottom: "10px",
            fontWeight: "800",
          }}
        >
          Resume Dashboard
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            marginBottom: "40px",
          }}
        >
          Your uploaded resumes and analysis
        </p>

        {loading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2 style={{ color: "var(--text-muted)" }}>Loading resumes...</h2>
          </div>
        ) : resumes.length === 0 ? (
          <div
            style={{
              background: "var(--glass-bg)",
              padding: "35px",
              borderRadius: "24px",
              textAlign: "center",
            }}
          >
            <h2>No resumes found</h2>
            <button
              onClick={() => navigate("/")}
              style={{
                marginTop: "20px",
                padding: "12px 20px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Upload Resume
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {resumes.map((item) => (
              <div
                key={item._id}
                style={{
                  background: "var(--glass-bg)",
                  borderRadius: "22px",
                  padding: "20px",
                  minHeight: "230px",
                  boxSizing: "border-box",
                  overflow: "hidden",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 14px 0",
                    fontSize: "1.3rem",
                    lineHeight: "1.4",
                    wordBreak: "break-word",
                  }}
                >
                  {item.filename || "Resume"}
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "16px",
                    maxWidth: "100%",
                    overflow: "hidden",
                  }}
                >
                  {item.skills?.length > 0 ? (
                    item.skills.map((s, i) => (
                      <span
                        key={i}
                        style={{
                          background: "var(--bg-secondary)",
                          color: "var(--accent-secondary)",
                          padding: "6px 12px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                          maxWidth: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: "var(--text-muted)" }}>No skills</span>
                  )}
                </div>

                <p style={{ margin: "0 0 10px 0", fontSize: "1.05rem" }}>
                  Score:{" "}
                  <strong style={{ color: getScoreColor(item.score) }}>
                    {item.score}%
                  </strong>
                </p>

                <div
                  style={{
                    height: "8px",
                    background: "var(--glass-border)",
                    borderRadius: "10px",
                    marginBottom: "18px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${item.score}%`,
                      height: "100%",
                      background: getScoreColor(item.score),
                      borderRadius: "10px",
                    }}
                  ></div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  <button
                    onClick={() => handleViewJobs(item)}
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    View Jobs
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      background: "#dc2626",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;