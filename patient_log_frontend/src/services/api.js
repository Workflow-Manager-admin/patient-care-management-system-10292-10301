//
// Stubs for RESTful backend API calls for patient logs.
// Replace these with fetch/axios to actual backend.
//

// "Database" emulated with localStorage for frontend demo
const PATIENTS_KEY = "plog_patients";

/**
 * Get all patients (stub).
 */
// PUBLIC_INTERFACE
function getPatients() {
  const patients = JSON.parse(localStorage.getItem(PATIENTS_KEY) || "[]");
  return Promise.resolve(patients);
}

/**
 * Get details for one patient (stub).
 */
// PUBLIC_INTERFACE
function getPatient(id) {
  const patients = JSON.parse(localStorage.getItem(PATIENTS_KEY) || "[]");
  return Promise.resolve(patients.find((p) => p.id === id));
}

/**
 * Create new patient (stub).
 */
// PUBLIC_INTERFACE
function createPatient(data) {
  let patients = JSON.parse(localStorage.getItem(PATIENTS_KEY) || "[]");
  const newId = patients.length > 0 ? Math.max(...patients.map((p) => p.id)) + 1 : 1;
  const patient = { ...data, id: newId, lastVisit: "", logs: data.logs || [] };
  patients.push(patient);
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
  return Promise.resolve(newId);
}

/**
 * Update patient and logs (stub).
 */
// PUBLIC_INTERFACE
function updatePatient(id, data) {
  let patients = JSON.parse(localStorage.getItem(PATIENTS_KEY) || "[]");
  patients = patients.map((p) =>
    p.id === id ? { ...data, id, logs: data.logs || [], lastVisit: data.lastVisit || "" } : p
  );
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
  return Promise.resolve();
}

/**
 * Delete patient (stub).
 */
// PUBLIC_INTERFACE
function deletePatient(id) {
  let patients = JSON.parse(localStorage.getItem(PATIENTS_KEY) || "[]");
  patients = patients.filter((p) => p.id !== id);
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
  return Promise.resolve();
}

const api = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient
};
export default api;
