import React from "react";

function Login() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617, #0f172a, #1d4ed8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "28px",
          overflow: "hidden",
          backdropFilter: "blur(14px)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.35)",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            padding: "60px 50px",
            background:
              "linear-gradient(160deg, rgba(37,99,235,0.30), rgba(139,92,246,0.22))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.08)",
              color: "#93c5fd",
              fontWeight: "600",
              fontSize: "0.9rem",
              marginBottom: "22px",
              width: "fit-content",
            }}
          >
            AI Resume Platform
          </div>

          <h1
            style={{
              fontSize: "3rem",
              lineHeight: "1.1",
              marginBottom: "18px",
              fontWeight: "800",
              color: "#f8fafc",
            }}
          >
            Welcome Back to
            <br />
            Resume Analyzer
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "1.05rem",
              lineHeight: "1.8",
              maxWidth: "420px",
              marginBottom: "28px",
            }}
          >
            Analyze resumes, discover missing skills, and get smart job
            recommendations through a premium dashboard experience.
          </p>

          <div style={{ display: "grid", gap: "14px" }}>
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px",
                padding: "16px 18px",
                color: "#e2e8f0",
              }}
            >
              🚀 Smart ATS score analysis
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px",
                padding: "16px 18px",
                color: "#e2e8f0",
              }}
            >
              💼 Personalized job matching
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px",
                padding: "16px 18px",
                color: "#e2e8f0",
              }}
            >
              📊 Premium dashboard insights
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            padding: "60px 50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <h2
            style={{
              fontSize: "2.2rem",
              marginBottom: "10px",
              color: "#f8fafc",
              fontWeight: "700",
            }}
          >
            Login
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "28px",
              fontSize: "1rem",
            }}
          >
            Continue to your dashboard and resume reports
          </p>

          <form style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#e2e8f0",
                  fontWeight: "600",
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "15px 16px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  fontSize: "1rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#e2e8f0",
                  fontWeight: "600",
                }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "15px 16px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  fontSize: "1rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: "8px",
                padding: "15px 18px",
                border: "none",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                color: "#fff",
                fontWeight: "700",
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 14px 30px rgba(59,130,246,0.25)",
              }}
            >
              Login
            </button>
          </form>

          <p
            style={{
              marginTop: "22px",
              color: "#94a3b8",
              textAlign: "center",
              fontSize: "0.96rem",
            }}
          >
            Don&apos;t have an account?{" "}
            <span style={{ color: "#93c5fd", fontWeight: "600", cursor: "pointer" }}>
              Sign up later
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;