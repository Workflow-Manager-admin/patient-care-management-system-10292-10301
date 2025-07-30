import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./PatientList.css";

/**
 * Patient listing and search.
 */
// PUBLIC_INTERFACE
export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch patients from backend (stub).
    setLoading(true);
    api
      .getPatients()
      .then((res) => setPatients(res))
      .finally(() => setLoading(false));
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredPatients = patients.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toString().includes(search)
    );
  });

  const handleDelete = (id) => {
    if (window.confirm("Delete patient and logs?")) {
      api.deletePatient(id).then(() => {
        setPatients((pats) => pats.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <div className="patient-list-page">
      <div className="list-header">
        <h2>Patient List</h2>
        <button className="btn-primary" onClick={() => navigate("/patients/new")}>
          + Add Patient
        </button>
      </div>
      <div className="list-controls">
        <input
          type="text"
          placeholder="Search name or ID"
          value={search}
          onChange={handleSearchChange}
          className="search-box"
        />
      </div>
      {loading ? (
        <div style={{ margin: "2rem" }}>Loading...</div>
      ) : (
        <table className="patient-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Last Visit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>
                  <button
                    className="btn-link"
                    onClick={() => navigate(`/patients/${patient.id}`)}
                  >
                    {patient.name}
                  </button>
                </td>
                <td>{patient.dob}</td>
                <td>{patient.lastVisit || "-"}</td>
                <td>
                  <button
                    className="btn-small"
                    onClick={() => navigate(`/patients/${patient.id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-small btn-accent"
                    onClick={() => handleDelete(patient.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan={5}>No results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
