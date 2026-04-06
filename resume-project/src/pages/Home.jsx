import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
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

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

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
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #020617, #0f172a, #1e3a8a)",
        padding: "20px",
        overflow: "hidden",
        boxSizing: "border-box",
        color: "#fff",
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
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: "30px",
            padding: "55px 42px",
            boxShadow: "0 18px 50px rgba(0,0,0,0.30)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "10px 20px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.08)",
              color: "#cbd5e1",
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
              color: "#f8fafc",
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
              color: "#94a3b8",
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
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px",
                padding: "15px 18px",
                color: "#e2e8f0",
                fontSize: "0.98rem",
              }}
            >
              🚀 Smart skill extraction
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px",
                padding: "15px 18px",
                color: "#e2e8f0",
                fontSize: "0.98rem",
              }}
            >
              📊 ATS score analysis
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px",
                padding: "15px 18px",
                color: "#e2e8f0",
                fontSize: "0.98rem",
              }}
            >
              💼 Job recommendations instantly
            </div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: "30px",
            padding: "42px 32px",
            boxShadow: "0 18px 50px rgba(0,0,0,0.30)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              color: "#f8fafc",
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
              color: "#94a3b8",
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
                ? "2px solid #60a5fa"
                : "2px dashed rgba(255,255,255,0.20)",
              background: isDragActive
                ? "rgba(59,130,246,0.12)"
                : "rgba(255,255,255,0.04)",
              textAlign: "center",
              marginBottom: "18px",
              transition: "0.3s ease",
              boxSizing: "border-box",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "10px" }}>📄</div>

            <p
              style={{
                color: "#e2e8f0",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              {isDragActive ? "Drop your resume here" : "Drop PDF here"}
            </p>

            <p
              style={{
                color: "#94a3b8",
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
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                color: "#e2e8f0",
                fontSize: "0.95rem",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
            />
          </div>

          {selectedFile && (
            <div
              style={{
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.25)",
                color: "#d1fae5",
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
            style={{
              width: "100%",
              padding: "17px",
              border: "none",
              borderRadius: "16px",
              background: "linear-gradient(90deg, #2563eb, #6d28d9)",
              color: "#fff",
              fontWeight: "700",
              fontSize: "1.05rem",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.75 : 1,
              boxShadow: "0 14px 30px rgba(37,99,235,0.28)",
              transition: "0.3s ease",
            }}
          >
            {loading ? "Analyzing Resume..." : "Upload Resume"}
          </button>

          <p
            style={{
              marginTop: "16px",
              textAlign: "center",
              color: "#64748b",
              fontSize: "0.88rem",
            }}
          >
            Get instant score, detected skills, and matched job roles.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;