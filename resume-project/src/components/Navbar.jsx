import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Sun, Moon, LogOut } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName") || (userEmail ? userEmail.split("@")[0] : "User");

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const navItemClass = ({ isActive }) =>
    `em-nav-item ${isActive ? "active" : ""}`;

  return (
    <header className="em-global-navbar">
      {/* Brand Logo */}
      <NavLink to="/" className="em-nav-logo">
        <div className="em-nav-logo-icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="m9 15 2 2 4-4" />
          </svg>
        </div>
        <span className="em-nav-logo-text">ResumeCraft</span>
      </NavLink>

      {/* Pill Dock Center Navigation */}
      <nav className="em-center-dock">
        <NavLink to="/" className={navItemClass}>
          Home
        </NavLink>
        <NavLink to="/home" className={navItemClass}>
          Analyze CV
        </NavLink>
        <NavLink to="/jobs" className={navItemClass}>
          Live Jobs
        </NavLink>
        <NavLink to="/dashboard" className={navItemClass}>
          Dashboard
        </NavLink>
        {userEmail === "admin@resume.com" && (
          <NavLink to="/admin" className={navItemClass}>
            Admin
          </NavLink>
        )}
      </nav>

      {/* User / Auth Controls */}
      <div className="em-nav-controls">
        <button
          className="em-nav-circle-btn"
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {userEmail ? (
          <div className="flex items-center gap-3">
            <div
              className="em-user-avatar-circle"
              onClick={() => navigate("/dashboard")}
              title={userName}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              className="em-btn-signout"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="em-btn-signin">
            Sign In
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Navbar;
