import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#ffffff" : "#cbd5e1",
    background: isActive ? "rgba(37, 99, 235, 0.18)" : "transparent",
    padding: "10px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.3s ease",
    display: "inline-block",
  });

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        Resume Analyzer
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>

        <NavLink to="/jobs" style={linkStyle}>
          Jobs
        </NavLink>

        <NavLink to="/dashboard" style={linkStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/login" style={linkStyle}>
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;