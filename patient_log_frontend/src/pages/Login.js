import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

/**
 * Login form for user authentication.
 */
// PUBLIC_INTERFACE
export default function Login() {
  const [fields, setFields] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const res = login(fields.username, fields.password);
    if (res.success) {
      setError("");
      navigate("/");
    } else {
      setError(res.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={onSubmit} autoComplete="off">
        <h2>Sign In</h2>
        <label>
          Username
          <input name="username" value={fields.username} onChange={onChange} required />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={fields.password}
            onChange={onChange}
            required
          />
        </label>
        {error && <div className="form-error">{error}</div>}
        <button className="btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
