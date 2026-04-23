import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName") || (userEmail ? userEmail.split("@")[0] : "User");

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  useEffect(() => {
    // Check local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "var(--text-main)" : "var(--text-muted)",
    background: isActive ? "var(--btn-glow-1)" : "transparent",
    padding: "10px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.3s ease",
    display: "inline-block",
  });

  return (
    <nav className="navbar">
      <NavLink to="/home" className="logo">
        Resume Analyzer
      </NavLink>

      <div className="nav-links">
        <NavLink to="/home" style={linkStyle}>
          Home
        </NavLink>

        <NavLink to="/jobs" style={linkStyle}>
          Jobs
        </NavLink>

        <NavLink to="/dashboard" style={linkStyle}>
          Dashboard
        </NavLink>

        {userEmail === "admin@resume.com" && (
          <NavLink to="/admin" style={{ ...linkStyle({ isActive: location.pathname === '/admin' }), color: "#ef4444" }}>
            Admin Panel
          </NavLink>
        )}

        {userEmail ? (
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px", 
            background: "var(--bg-secondary)", 
            padding: "5px 12px 5px 5px", 
            borderRadius: "999px", 
            border: "1px solid var(--glass-border)" 
          }}>
            <div style={{ 
              width: "36px", height: "36px", borderRadius: "50%", 
              background: "linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))", 
              color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", 
              fontWeight: "bold", fontSize: "1rem", boxShadow: "0 4px 10px var(--glow-1)",
              textTransform: "uppercase"
            }}>
              {userName.charAt(0)}
            </div>
            <span style={{ color: "var(--text-main)", fontSize: "0.95rem", fontWeight: "600" }}>
              {userName}
            </span>
            <button 
              onClick={handleLogout}
              style={{
                background: "transparent",
                color: "#ef4444",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                padding: "6px 12px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.85rem",
                transition: "all 0.3s ease",
                marginLeft: "8px"
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login" style={linkStyle}>
            Login
          </NavLink>
        )}
        
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;