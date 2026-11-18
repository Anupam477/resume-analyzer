import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cpu, ArrowRight, ShieldCheck, Sparkles, Lock, Mail, User } from "lucide-react";
import "./Login.css";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@resume.com" && password === "admin123") {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name || "Admin");
      navigate("/admin");
    } else if (email) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name || email.split("@")[0] || "Engineer");
      navigate("/dashboard");
    }
  };

  const handleDemoFill = () => {
    setName("Alex Vance");
    setEmail("alex.vance@tier1.dev");
    setPassword("password123");
  };

  const handleAdminDemoFill = () => {
    setName("Platform Admin");
    setEmail("admin@resume.com");
    setPassword("admin123");
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-grid">
        {/* Left Info Panel */}
        <div className="login-info-panel">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 mb-6">
            <Cpu className="w-3.5 h-3.5 text-[#00ff87]" />
            <span>AI Resume Intelligence</span>
          </div>

          <h1 className="text-3xl font-extrabold text-white mb-4 leading-tight">
            Authenticate to Your<br />Engineering Dashboard
          </h1>

          <p className="text-xs text-slate-400 mb-8 leading-relaxed max-w-sm">
            Save audit histories, track skill gaps, benchmark against live openings, and download verifiable PDF reports.
          </p>

          <div className="flex flex-col gap-3">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-[#00ff87]" />
              <span>Deterministic ATS Lexicon v2.4</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#00ff87]" />
              <span>Live Job Matches at Google, Amazon & Meta</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="login-form-panel">
          <h2 className="text-xl font-bold text-white mb-2">Sign In or Create Account</h2>
          <p className="text-xs text-slate-400 mb-6">
            Enter your details to access your resumes.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Your Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. Alex Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button type="submit" className="login-submit-btn w-full mt-2">
              <span>Enter Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-[#00ff87] hover:text-white underline cursor-pointer"
            >
              Quick Demo Fill
            </button>
            <button
              type="button"
              onClick={handleAdminDemoFill}
              className="text-slate-400 hover:text-white underline cursor-pointer"
            >
              Admin Login (admin123)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
