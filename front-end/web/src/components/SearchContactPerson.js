// src/components/SearchContactPersons.js

import React, { useState } from "react";
import axios from "axios";

const SearchContactPersons = () => {
  const [searchName, setSearchName] = useState("");
  const [contactPersons, setContactPersons] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchName) {
      setErrorMessage("Please enter a name to search.");
      return;
    }

    axios
      .get(`http://localhost:8080/api/v1/contact-persons/search/${searchName}`)
      .then((response) => {
        setContactPersons(response.data);
        setErrorMessage(""); // Clear error if the search is successful
      })
      .catch((error) => {
        setErrorMessage("No contact persons found for this name.");
        setContactPersons([]); // Clear previous results on failure
      });
  };

  return (
    <div>
      <h2>Search Contact Persons by Resident's Name</h2>

      <form onSubmit={handleSearch}>
        <div>
          <label>Enter Resident's Name:</label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            required
          />
        </div>

        <button type="submit">Search</button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {contactPersons.length > 0 && (
        <div>
          <h3>Search Results</h3>
          <ul>
            {contactPersons.map((contactPerson) => (
              <li key={contactPerson.id}>
                <p>Name: {contactPerson.name}</p>
                <p>Phone: {contactPerson.phoneNumber}</p>
                <p>Email: {contactPerson.email}</p>
                <p>Address: {contactPerson.address}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchContactPersons;
