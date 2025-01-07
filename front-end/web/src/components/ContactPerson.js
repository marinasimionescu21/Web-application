import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import '../userfriendly_page/ContactPerson.css';

const ContactPerson = () => {
  const [residents, setResidents] = useState([]);
  const [selectedResident, setSelectedResident] = useState(null);
  const [contactPersons, setContactPersons] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if search is performed
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

  // Search for contact persons
  const handleSearch = () => {
    if (selectedResident) {
      axios
        .get(`http://localhost:8080/api/v1/contact-persons/${selectedResident.value}`)
        .then((response) => {
          setContactPersons(response.data);
          setSearchPerformed(true); // Indicate that a search has been performed
        })
        .catch((error) => {
          console.error("Error fetching contact persons:", error);
          setErrorMessage("Failed to load contact persons. Please try again.");
        });
    }
  };

  return (
    <div className="contact-person-page">
      <h1>Contact Person Management</h1>
      <p>Manage your contact persons here.</p>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Dropdown and Search Button */}
      <div className="dropdown-container">
        <Select
          options={residents}
          value={selectedResident}
          onChange={setSelectedResident}
          placeholder="Select a Resident"
          isClearable
          className="resident-dropdown"
        />
        <button onClick={handleSearch} disabled={!selectedResident} className="search-button">
          Search
        </button>
      </div>

      {/* Add Contact Person Button */}
      <div className="add-contact-container">
        <Link to="/add-contact-person" className="add-contact-button">
          Add Contact Person
        </Link>
      </div>

      {/* Display Contact Persons */}
      <div className="search-results">
        {searchPerformed && contactPersons.length > 0 && (
          <ul>
            {contactPersons.map((person) => (
              <li key={person.id}>
                <strong>Name:</strong> {person.name} <br />
                <strong>Phone:</strong> {person.phoneNumber} <br />
                <strong>Email:</strong> {person.email} <br />
                <strong>Address:</strong> {person.address}
              </li>
            ))}
          </ul>
        )}
        {searchPerformed && contactPersons.length === 0 && (
          <p>No contact persons found for the selected resident.</p>
        )}
      </div>
    </div>
  );
};

export default ContactPerson;
