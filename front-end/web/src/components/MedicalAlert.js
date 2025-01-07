import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import "../userfriendly_page/MedicalAlert.css";

const MedicalAlert = () => {
  const [residents, setResidents] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedResident, setSelectedResident] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [medicalAlerts, setMedicalAlerts] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch residents for dropdown
  useEffect(() => {
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
        setErrorMessage("Failed to load residents. Please try again.");
      });
  }, []);

  // Fetch employees for dropdown
  useEffect(() => {
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
        setErrorMessage("Failed to load employees. Please try again.");
      });
  }, []);

  // Search for medical alerts by resident
  const handleResidentSearch = () => {
    if (selectedResident && selectedResident.value) {
      axios
        .get(`http://localhost:8080/api/v1/medical-alerts/resident/${selectedResident.value}`)
        .then((response) => {
          setMedicalAlerts(response.data);
          setSearchPerformed(true);
        })
        .catch((error) => {
          console.error("Error fetching medical alerts:", error);
          setErrorMessage("Failed to load medical alerts. Please try again.");
        });
    } else {
      setErrorMessage("Please select a valid resident before searching.");
    }
  };

  // Search for medical alerts by employee
  const handleEmployeeSearch = () => {
    if (selectedEmployee && selectedEmployee.value) {
      axios
        .get(`http://localhost:8080/api/v1/medical-alerts/employee/${selectedEmployee.value}`)
        .then((response) => {
          setMedicalAlerts(response.data);
          setSearchPerformed(true);
        })
        .catch((error) => {
          console.error("Error fetching medical alerts:", error);
          setErrorMessage("Failed to load medical alerts. Please try again.");
        });
    } else {
      setErrorMessage("Please select a valid employee before searching.");
    }
  };

  return (
    <div className="medical-alert-page">
      <h1>Medical Alert Management</h1>
      <p>Manage medical alerts for residents and employees here.</p>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Search Section Layout (2 Columns) */}
      <div className="search-section">
        {/* Resident Dropdown and Search Button */}
        <div className="dropdown-container">
          <h2>Search by Resident</h2>
          <Select
            options={residents}
            value={selectedResident}
            onChange={setSelectedResident}
            placeholder="Select a Resident"
            isClearable
            className="resident-dropdown"
          />
          <button onClick={handleResidentSearch} disabled={!selectedResident} className="search-button">
            Search by Resident
          </button>
        </div>

        {/* Employee Dropdown and Search Button */}
        <div className="dropdown-container">
          <h2>Search by Employee</h2>
          <Select
            options={employees}
            value={selectedEmployee}
            onChange={setSelectedEmployee}
            placeholder="Select an Employee"
            isClearable
            className="employee-dropdown"
          />
          <button onClick={handleEmployeeSearch} disabled={!selectedEmployee} className="search-button">
            Search by Employee
          </button>
        </div>
      </div>

      {/* Add Medical Alert Button */}
      <div className="add-alert-container">
        <Link to="/add-medical-alert" className="add-alert-button">
          Add Medical Alert
        </Link>
      </div>

      {/* Display Medical Alerts */}
      <div className="search-results">
        {searchPerformed && medicalAlerts.length > 0 && (
          <ul>
            {medicalAlerts.map((alert) => (
              <li key={alert.idAlert}>
                <strong>Date:</strong> {alert.date} <br />
                <strong>Details:</strong> {alert.details} <br />
                <strong>Handled By:</strong> {alert.employee.firstName} {alert.employee.lastName}
              </li>
            ))}
          </ul>
        )}
        {searchPerformed && medicalAlerts.length === 0 && (
          <p>No medical alerts found for the selected individual.</p>
        )}
      </div>
    </div>
  );
};

export default MedicalAlert;
