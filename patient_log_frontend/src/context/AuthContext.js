import React, { createContext, useContext, useState } from "react";

// PUBLIC_INTERFACE
const AuthContext = createContext();

/**
 * Provider for auth state. Simulates user login/logout. Replace with backend REST integration.
 */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    localStorage.getItem("plog_user")
      ? JSON.parse(localStorage.getItem("plog_user"))
      : null
  );

  // PUBLIC_INTERFACE
  const login = (username, password) => {
    // API stub for authentication -- replace with actual REST call
    if (username === "admin" && password === "admin") {
      const userData = { username: "admin" };
      setUser(userData);
      localStorage.setItem("plog_user", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    setUser(null);
    localStorage.removeItem("plog_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
