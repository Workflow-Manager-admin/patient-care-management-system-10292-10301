import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import PatientList from "./pages/PatientList";
import PatientDetail from "./pages/PatientDetail";
import PatientForm from "./pages/PatientForm";
import Login from "./pages/Login";
import AuthProvider, { useAuth } from "./context/AuthContext";
import "./App.css";

// Top-level main layout with sidebar and top navbar
function DashboardLayout({ children }) {
  return (
    <div className="dashboard-root">
      <Sidebar />
      <div className="main-content-area">
        <TopNavbar />
        <div className="main-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [theme] = useState("light"); // theme switch not required, stick to light

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<PatientList />} />
                    <Route path="/patients" element={<PatientList />} />
                    <Route path="/patients/new" element={<PatientForm />} />
                    <Route path="/patients/:id" element={<PatientDetail />} />
                    <Route path="/patients/:id/edit" element={<PatientForm />} />
                    {/* Fallback route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
