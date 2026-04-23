import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple mock auth logic for the prototype
    if (email === "admin@resume.com" && password === "admin123") {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name || "Admin");
      navigate("/admin");
    } else if (email && password) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name || "User");
      navigate("/dashboard");
    }
  };

  return (
    <div className="page-animate"
      style={{
        minHeight: "calc(100vh - 75px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        color: "var(--text-main)",
      }}
    >
      <div className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            padding: "60px 50px",
            background:
              "linear-gradient(160deg, var(--glow-2), var(--glow-1))",
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
              background: "var(--bg-secondary)",
              color: "var(--accent-secondary)",
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
              color: "var(--text-main)",
            }}
          >
            Welcome Back to
            <br />
            Resume Analyzer
          </h1>

          <p
            style={{
              color: "var(--text-muted)",
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
                background: "var(--bg-secondary)",
                border: "1px solid var(--glass-border)",
                borderRadius: "18px",
                padding: "16px 18px",
                color: "var(--text-main)",
              }}
            >
              🚀 Smart ATS score analysis
            </div>

            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--glass-border)",
                borderRadius: "18px",
                padding: "16px 18px",
                color: "var(--text-main)",
              }}
            >
              💼 Personalized job matching
            </div>

            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--glass-border)",
                borderRadius: "18px",
                padding: "16px 18px",
                color: "var(--text-main)",
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
            background: "var(--glass-bg)",
          }}
        >
          <h2
            style={{
              fontSize: "2.2rem",
              marginBottom: "10px",
              color: "var(--text-main)",
              fontWeight: "700",
            }}
          >
            Login / Admin
          </h2>

          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "28px",
              fontSize: "1rem",
            }}
          >
            Continue to your dashboard and resume reports
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "var(--text-main)",
                  fontWeight: "600",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                style={{
                  width: "100%",
                  padding: "15px 16px",
                  borderRadius: "16px",
                  border: "1px solid var(--glass-border)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-main)",
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
                  color: "var(--text-main)",
                  fontWeight: "600",
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "15px 16px",
                  borderRadius: "16px",
                  border: "1px solid var(--glass-border)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-main)",
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
                  color: "var(--text-main)",
                  fontWeight: "600",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "15px 16px",
                  borderRadius: "16px",
                  border: "1px solid var(--glass-border)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-main)",
                  fontSize: "1rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-glow"
              style={{
                marginTop: "8px",
                padding: "15px 18px",
                border: "none",
                borderRadius: "16px",
                background: "linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))",
                color: "#fff",
                fontWeight: "700",
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 14px 30px var(--glow-2)",
              }}
            >
              Login / Admin
            </button>
          </form>

          <p
            style={{
              marginTop: "22px",
              color: "var(--text-muted)",
              textAlign: "center",
              fontSize: "0.96rem",
            }}
          >
            Don&apos;t have an account?{" "}
            <span style={{ color: "var(--accent-secondary)", fontWeight: "600", cursor: "pointer" }}>
              Sign up later
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;