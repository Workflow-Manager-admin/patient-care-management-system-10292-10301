import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../services/api";
import "./PatientForm.css";

/**
 * Form for adding or editing patient and logs.
 */
// PUBLIC_INTERFACE
export default function PatientForm() {
  const { id } = useParams();
  const { state } = useLocation();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    logs: []
  });
  const [logForm, setLogForm] = useState({
    date: "",
    symptoms: "",
    treatments: "",
    notes: ""
  });
  const [editTab, setEditTab] = useState(state && state.tab === "log" ? "log" : "info");
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      api
        .getPatient(Number(id))
        .then((p) => {
          if (!p) return;
          setForm(p);
        })
        .finally(() => setLoading(false));
    }
  }, [isEdit, id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const handleLogInput = (e) => {
    const { name, value } = e.target;
    setLogForm((lf) => ({ ...lf, [name]: value }));
  };

  const handleAddLog = () => {
    if (!logForm.date) return;
    setForm((f) => ({
      ...f,
      logs: [
        ...(f.logs || []),
        { ...logForm }
      ]
    }));
    setLogForm({ date: "", symptoms: "", treatments: "", notes: "" });
  };

  const handleRemoveLog = (idx) => {
    setForm((f) => ({
      ...f,
      logs: f.logs.filter((_, i) => i !== idx)
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.dob) return;
    if (isEdit) {
      api.updatePatient(Number(id), form).then(() => {
        navigate(`/patients/${id}`);
      });
    } else {
      api.createPatient(form).then((newId) => {
        navigate(`/patients/${newId}`);
      });
    }
  };

  if (loading) return <div style={{ margin: "2rem" }}>Loading...</div>;

  return (
    <div className="patient-form-page">
      <div className="form-header">
        <h2>{isEdit ? "Edit Patient" : "Add Patient"}</h2>
        {isEdit && (
          <div className="tabs">
            <button
              className={editTab === "info" ? "tab-btn active" : "tab-btn"}
              onClick={() => setEditTab("info")}
            >
              Info
            </button>
            <button
              className={editTab === "log" ? "tab-btn active" : "tab-btn"}
              onClick={() => setEditTab("log")}
            >
              Patient Logs
            </button>
          </div>
        )}
      </div>
      <form className="patient-form" onSubmit={onSubmit} autoComplete="off">
        {editTab === "info" && (
          <>
            <label>
              Name*
              <input name="name" value={form.name} onChange={handleInput} required />
            </label>
            <label>
              Date of Birth*
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleInput}
                required
              />
            </label>
            <label>
              Gender
              <select name="gender" value={form.gender} onChange={handleInput}>
                <option value="">-</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </>
        )}
        {editTab === "log" && (
          <>
            <div className="log-form-grid">
              <label>
                Date*
                <input
                  type="date"
                  name="date"
                  value={logForm.date}
                  onChange={handleLogInput}
                  required
                />
              </label>
              <label>
                Symptoms
                <input
                  name="symptoms"
                  value={logForm.symptoms}
                  onChange={handleLogInput}
                />
              </label>
              <label>
                Treatments
                <input
                  name="treatments"
                  value={logForm.treatments}
                  onChange={handleLogInput}
                />
              </label>
              <label>
                Notes
                <input
                  name="notes"
                  value={logForm.notes}
                  onChange={handleLogInput}
                />
              </label>
              <button type="button" className="btn-secondary" onClick={handleAddLog}>
                + Add Log Entry
              </button>
            </div>
            {form.logs.length > 0 && (
              <div className="log-entries-list">
                <h4>Log Entries:</h4>
                <ul>
                  {form.logs.map((log, idx) => (
                    <li key={idx}>
                      <strong>{log.date}:</strong> {log.symptoms}, {log.treatments}, {log.notes}
                      <button
                        className="btn-small btn-accent"
                        type="button"
                        onClick={() => handleRemoveLog(idx)}
                        style={{ marginLeft: "10px" }}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        <div className="form-actions">
          <button className="btn-primary" type="submit">
            {isEdit ? "Update" : "Create"}
          </button>
          <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
