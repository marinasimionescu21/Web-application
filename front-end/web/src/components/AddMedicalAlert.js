import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { ClipLoader } from "react-spinners"; // For loading indicator
import "../userfriendly_page/AddMedicalAlert.css";

const AddMedicalAlert = () => {
  // State for medical alert form fields
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [resident, setResident] = useState(null); // The selected resident
  const [employee, setEmployee] = useState(null); // The selected employee
  const [residents, setResidents] = useState([]); // List of residents for dropdown
  const [employees, setEmployees] = useState([]); // List of employees for dropdown
  const [loadingResidents, setLoadingResidents] = useState(false); // Loading state for residents
  const [loadingEmployees, setLoadingEmployees] = useState(false); // Loading state for employees
  const [loadingSubmit, setLoadingSubmit] = useState(false); // Loading state for form submission
  const [errorMessage, setErrorMessage] = useState(""); // For handling errors
  const [successMessage, setSuccessMessage] = useState(""); // For success message

  // Fetch residents and employees when the component mounts
  useEffect(() => {
    setLoadingResidents(true);
    setLoadingEmployees(true);

    // Fetch residents
    axios
      .get("http://localhost:8080/api/v1/residents/all")
      .then((response) => {
        const residentOptions = response.data.map((resident) => ({
          value: resident.cnp,
          label: `${resident.firstName} ${resident.lastName}`,
        }));
        setResidents(residentOptions);
      })
      .catch((error) => {
        console.error("Error fetching residents:", error);
        setErrorMessage("Error fetching residents. Please try again.");
      })
      .finally(() => setLoadingResidents(false));

    // Fetch employees
    axios
      .get("http://localhost:8080/api/v1/employees/all")
      .then((response) => {
        const employeeOptions = response.data.map((employee) => ({
          value: employee.cnp,
          label: `${employee.firstName} ${employee.lastName}`,
        }));
        setEmployees(employeeOptions);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setErrorMessage("Error fetching employees. Please try again.");
      })
      .finally(() => setLoadingEmployees(false));
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!resident || !employee) {
      setErrorMessage("Please select both a resident and an employee.");
      return;
    }

    setLoadingSubmit(true);
    const medicalAlertData = { date, details, resident: { cnp: resident.value }, employee: { cnp: employee.value } };

    axios
      .post("http://localhost:8080/api/v1/medical-alerts/create", medicalAlertData)
      .then(() => {
        setSuccessMessage("Medical alert added successfully!");
        // Reset form fields
        setDate("");
        setDetails("");
        setResident(null);
        setEmployee(null);
        setErrorMessage(""); // Clear previous error message if successful
      })
      .catch((error) => {
        console.error("Error adding medical alert:", error);
        setErrorMessage("Failed to add medical alert. Please try again.");
      })
      .finally(() => setLoadingSubmit(false));
  };

  return (
    <div className="medical-alert-form-container">
      <h2>Add Medical Alert</h2>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="medical-alert-form">
        {/* Resident Select Dropdown */}
        <div className="form-group">
          <label htmlFor="resident">Select Resident:</label>
          {loadingResidents ? (
            <ClipLoader size={30} color="#4caf50" />
          ) : (
            <Select
              id="resident"
              options={residents}
              value={resident}
              onChange={setResident}
              placeholder="Select a Resident"
              isClearable
              className="react-select"
            />
          )}
          <small>Select the resident related to this medical alert.</small>
        </div>

        {/* Employee Select Dropdown */}
        <div className="form-group">
          <label htmlFor="employee">Select Employee:</label>
          {loadingEmployees ? (
            <ClipLoader size={30} color="#4caf50" />
          ) : (
            <Select
              id="employee"
              options={employees}
              value={employee}
              onChange={setEmployee}
              placeholder="Select an Employee"
              isClearable
              className="react-select"
            />
          )}
          <small>Select the employee handling this medical alert.</small>
        </div>

        {/* Date Field */}
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            aria-required="true"
          />
          <small>Select the date of the medical alert.</small>
        </div>

        {/* Details Field */}
        <div className="form-group">
          <label htmlFor="details">Details:</label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            placeholder="Enter details about the medical alert"
            aria-required="true"
          />
          <small>Provide a description of the medical alert.</small>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" disabled={loadingSubmit} className="submit-btn">
            {loadingSubmit ? "Adding..." : "Add Medical Alert"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicalAlert;
