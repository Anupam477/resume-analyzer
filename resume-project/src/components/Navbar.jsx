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

  const navItemClass = ({ isActive }) =>
    `ref-sub-dock-link ${isActive ? "active" : ""}`;

  return (
    <header className="ref-sub-navbar">
      {/* Brand Logo */}
      <NavLink to="/" className="ref-sub-logo">
        <span className="text-xl">🌱</span>
        <span className="ref-sub-logo-text">ResumeCraft</span>
      </NavLink>

      {/* Pill Dock Center Navigation */}
      <nav className="ref-sub-dock">
        <NavLink to="/" className={navItemClass}>
          Home
        </NavLink>
        <NavLink to="/home" className={navItemClass}>
          Analyze
        </NavLink>
        <NavLink to="/jobs" className={navItemClass}>
          Jobs
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
      <div className="ref-sub-actions">
        {userEmail ? (
          <div className="flex items-center gap-3">
            <div className="ref-user-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-semibold text-[#faf7f2] hidden sm:inline">
              {userName}
            </span>
            <button onClick={handleLogout} className="ref-btn-logout">
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="ref-btn-sub-login">
            Sign In
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Navbar;
