import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./PatientDetail.css";

/**
 * Detailed patient record view with logs.
 */
// PUBLIC_INTERFACE
export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .getPatient(Number(id))
      .then((res) => setPatient(res))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ margin: "2rem" }}>Loading...</div>;
  if (!patient) return <div style={{ margin: "2rem" }}>Patient not found.</div>;

  return (
    <div className="patient-detail-page">
      <div className="detail-header">
        <h2>
          {patient.name} <span className="patient-id">#{patient.id}</span>
        </h2>
        <button
          className="btn-primary"
          onClick={() => navigate(`/patients/${patient.id}/edit`)}
        >
          Edit Patient
        </button>
      </div>
      <div className="patient-info-grid">
        <div><strong>Date of Birth:</strong> {patient.dob}</div>
        <div><strong>Gender:</strong> {patient.gender || "-"}</div>
        <div><strong>Last Visit:</strong> {patient.lastVisit || "-"}</div>
      </div>
      <div className="logs-section">
        <h3>Patient Logs</h3>
        <button
          className="btn-secondary"
          onClick={() => navigate(`/patients/${patient.id}/edit`, { state: { tab: "log" } })}
        >
          + Add Log Entry
        </button>
        {patient.logs && patient.logs.length > 0 ? (
          <table className="logs-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Symptoms</th>
                <th>Treatments</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {patient.logs.map((log) => (
                <tr key={log.date}>
                  <td>{log.date}</td>
                  <td>{log.symptoms}</td>
                  <td>{log.treatments}</td>
                  <td>{log.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-logs">No log entries.</div>
        )}
      </div>
    </div>
  );
}
