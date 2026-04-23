import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginName, setLoginName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const validatePdfFile = (file) => {
    if (!file) return false;

    const isPdfMimeType = file.type === "application/pdf";
    const isPdfExtension = file.name.toLowerCase().endsWith(".pdf");

    if (!isPdfMimeType && !isPdfExtension) {
      alert("Only PDF files are allowed");
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!validatePdfFile(file)) {
      e.target.value = "";
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!validatePdfFile(file)) return;

    setSelectedFile(file);
  };

  const processUpload = async (emailToUse, nameToUse) => {
    const formData = new FormData();
    formData.append("resume", selectedFile);
    formData.append("userEmail", emailToUse);
    if (nameToUse) formData.append("userName", nameToUse);

    try {
      setLoading(true);

      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      });

      navigate("/jobs", {
        state: {
          skills: res.data.skills || [],
          score: res.data.score || 0,
          jobs: res.data.jobs || [],
          suggestions: res.data.suggestions || [],
          aiAnalysis: res.data.aiAnalysis || "No AI analysis available",
          fileName: selectedFile.name,
        },
      });
    } catch (error) {
      console.log("Upload error full:", error);

      if (error.code === "ECONNABORTED") {
        alert("Request timeout. Backend response took too long.");
      } else if (error.response) {
        alert(error.response.data?.error || "Server error during upload");
      } else if (error.request) {
        alert("Cannot connect to backend. Make sure backend is running on port 5000.");
      } else {
        alert("Upload failed. Please try again.");
      }
    } finally {
      setLoading(false);
      setShowLoginPopup(false);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a PDF file first");
      return;
    }

    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    if (userEmail) {
      processUpload(userEmail, userName);
    } else {
      setShowLoginPopup(true);
    }
  };

  const handlePopupSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginName) return;
    localStorage.setItem("userEmail", loginEmail);
    localStorage.setItem("userName", loginName);
    processUpload(loginEmail, loginName);
  };

  return (
    <div className="page-animate"
      style={{
        minHeight: "calc(100vh - 75px)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        overflow: "hidden",
        boxSizing: "border-box",
        color: "var(--text-main)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "980px",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "24px",
          alignItems: "stretch",
        }}
      >
        <div className="glass-panel"
          style={{
            padding: "55px 42px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "10px 20px",
              borderRadius: "999px",
              background: "var(--bg-secondary)",
              color: "var(--text-muted)",
              fontWeight: "600",
              marginBottom: "24px",
              fontSize: "0.92rem",
            }}
          >
            AI Powered Resume Screening
          </div>

          <h1
            style={{
              fontSize: "3.2rem",
              color: "var(--text-main)",
              marginBottom: "18px",
              fontWeight: "800",
              lineHeight: "1.15",
            }}
          >
            AI Resume
            <br />
            Analyzer
          </h1>

          <p
            style={{
              fontSize: "1.08rem",
              color: "var(--text-muted)",
              marginBottom: "28px",
              lineHeight: "1.8",
              maxWidth: "520px",
            }}
          >
            Upload your resume, detect your skills, calculate your ATS score,
            and discover relevant job recommendations through a premium
            full-stack experience.
          </p>

          <div style={{ display: "grid", gap: "14px" }}>
            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--glass-border)",
                borderRadius: "18px",
                padding: "15px 18px",
                color: "var(--text-main)",
                fontSize: "0.98rem",
              }}
            >
              🚀 Smart skill extraction
            </div>

            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--glass-border)",
                borderRadius: "18px",
                padding: "15px 18px",
                color: "var(--text-main)",
                fontSize: "0.98rem",
              }}
            >
              📊 ATS score analysis
            </div>

            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--glass-border)",
                borderRadius: "18px",
                padding: "15px 18px",
                color: "var(--text-main)",
                fontSize: "0.98rem",
              }}
            >
              💼 Job recommendations instantly
            </div>
          </div>
        </div>

        <div className="glass-panel"
          style={{
            padding: "42px 32px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              color: "var(--text-main)",
              marginBottom: "12px",
              fontSize: "2rem",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Upload Resume
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "var(--text-muted)",
              marginBottom: "24px",
              lineHeight: "1.7",
              fontSize: "0.98rem",
            }}
          >
            Drag and drop your PDF resume here or browse from your device.
          </p>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragActive(true);
            }}
            onDragLeave={() => setIsDragActive(false)}
            onDrop={handleDrop}
            style={{
              width: "100%",
              padding: "28px 20px",
              borderRadius: "22px",
              border: isDragActive
                ? "2px solid var(--accent-secondary)"
                : "2px dashed var(--glass-border)",
              background: isDragActive
                ? "var(--glow-2)"
                : "var(--glass-bg)",
              textAlign: "center",
              marginBottom: "18px",
              transition: "0.3s ease",
              boxSizing: "border-box",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "10px" }}>📄</div>

            <p
              style={{
                color: "var(--text-main)",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              {isDragActive ? "Drop your resume here" : "Drop PDF here"}
            </p>

            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.92rem",
                marginBottom: "14px",
              }}
            >
              Supported format: PDF only
            </p>

            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "14px",
                border: "1px solid var(--glass-border)",
                background: "var(--bg-secondary)",
                color: "var(--text-main)",
                fontSize: "0.95rem",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
            />
          </div>

          {selectedFile && (
            <div
              style={{
                background: "var(--glow-1)",
                border: "1px solid var(--accent-primary)",
                color: "var(--text-main)",
                padding: "14px 16px",
                borderRadius: "16px",
                marginBottom: "18px",
                fontSize: "0.95rem",
                wordBreak: "break-word",
              }}
            >
              Selected File: <strong>{selectedFile.name}</strong>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="btn-glow"
            style={{
              width: "100%",
              padding: "17px",
              border: "none",
              borderRadius: "16px",
              background: "linear-gradient(90deg, var(--accent-secondary), var(--accent-primary))",
              color: "#fff",
              fontWeight: "700",
              fontSize: "1.05rem",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.75 : 1,
              boxShadow: "0 14px 30px var(--glow-2)",
              transition: "0.3s ease",
            }}
          >
            {loading ? "Analyzing Resume..." : "Upload Resume"}
          </button>

          <p
            style={{
              marginTop: "16px",
              textAlign: "center",
              color: "var(--text-muted)",
              fontSize: "0.88rem",
            }}
          >
            Get instant score, detected skills, and matched job roles.
          </p>
        </div>
      </div>

      {/* Login Popup Modal */}
      {showLoginPopup && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(5px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div className="glass-panel page-animate" style={{ padding: "40px", maxWidth: "420px", width: "90%", textAlign: "center", background: "var(--nav-bg)" }}>
            <h2 style={{ marginBottom: "15px", color: "var(--text-main)", fontSize: "1.8rem" }}>Login Required</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "25px", fontSize: "1rem", lineHeight: "1.6" }}>
              Please enter your email to securely save your resume and access your personalized dashboard.
            </p>
            <form onSubmit={handlePopupSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input
                type="text"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                placeholder="Full Name (e.g. John Doe)"
                required
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "14px",
                  border: "1px solid var(--glass-border)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-main)",
                  outline: "none",
                  fontSize: "1.05rem"
                }}
              />
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter your email (e.g. user@test.com)"
                required
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "14px",
                  border: "1px solid var(--glass-border)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-main)",
                  outline: "none",
                  fontSize: "1.05rem"
                }}
              />
              <div style={{ display: "flex", gap: "12px", marginTop: "15px" }}>
                <button
                  type="button"
                  onClick={() => setShowLoginPopup(false)}
                  style={{
                    flex: 1, padding: "14px", borderRadius: "12px", border: "1px solid var(--glass-border)",
                    background: "transparent", color: "var(--text-main)", cursor: "pointer", fontWeight: "600",
                    fontSize: "1rem"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-glow"
                  disabled={loading}
                  style={{
                    flex: 1, padding: "14px", borderRadius: "12px", border: "none",
                    background: "linear-gradient(90deg, var(--accent-secondary), var(--accent-primary))",
                    color: "#fff", cursor: loading ? "not-allowed" : "pointer", fontWeight: "700",
                    fontSize: "1rem", opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? "Uploading..." : "Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;