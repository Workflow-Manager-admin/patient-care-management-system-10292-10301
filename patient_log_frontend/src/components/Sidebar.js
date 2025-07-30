import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

/**
 * Sidebar navigation for dashboard layout.
 */
// PUBLIC_INTERFACE
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo">🩺</span>
        <span className="sidebar-title">Patient Log</span>
      </div>
      <nav className="sidebar-nav">
        <NavLink end to="/patients" className="sidebar-link">
          Patient List
        </NavLink>
        <NavLink to="/patients/new" className="sidebar-link">
          Add Patient
        </NavLink>
      </nav>
    </aside>
  );
}
