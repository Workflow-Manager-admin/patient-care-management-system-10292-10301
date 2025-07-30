import React from "react";
import { useAuth } from "../context/AuthContext";
import "./TopNavbar.css";

/**
 * Top navigation bar for dashboard.
 */
// PUBLIC_INTERFACE
export default function TopNavbar() {
  const { user, logout } = useAuth();

  return (
    <header className="top-navbar">
      <div className="navbar-title">Patient Care Management</div>
      <div className="navbar-user">
        {user && (
          <>
            <span className="username">{user.username}</span>
            <button className="btn-logout" type="button" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
