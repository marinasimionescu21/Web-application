import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { ClipLoader } from "react-spinners";  // For loading indicator
import '../userfriendly_page/AddContactPerson.css';

const AddContactPerson = () => {
  // State for contact person form fields
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [resident, setResident] = useState(null);  // The selected resident
  const [residents, setResidents] = useState([]);  // List of all residents for the dropdown
  const [loadingResidents, setLoadingResidents] = useState(false); // Loading state for residents
  const [loadingSubmit, setLoadingSubmit] = useState(false); // Loading state for form submission
  const [errorMessage, setErrorMessage] = useState(""); // For handling errors
  const [successMessage, setSuccessMessage] = useState(""); // For success message

  // Fetch residents when the component mounts
  useEffect(() => {
    setLoadingResidents(true);
    axios
      .get("http://localhost:8080/api/v1/residents/all") // Fetch all residents from the backend
      .then((response) => {
        const residentsData = response.data.map((resident) => ({
          value: resident.cnp,
          label: `${resident.firstName} ${resident.lastName}`,
        }));
        setResidents(residentsData);
      })
      .catch((error) => {
        console.error("There was an error fetching residents!", error);
        setErrorMessage("Error fetching residents. Please try again.");
      })
      .finally(() => setLoadingResidents(false));
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!resident) {
      setErrorMessage("Please select a resident.");
      return;
    }

    setLoadingSubmit(true);
    const contactPersonData = { name, phoneNumber, email, address };

    axios
      .post(`http://localhost:8080/api/v1/contact-persons/${resident.value}`, contactPersonData)
      .then(() => {
        setSuccessMessage("Contact person added successfully!");
        // Reset form fields
        setName("");
        setPhoneNumber("");
        setEmail("");
        setAddress("");
        setResident(null);
        setErrorMessage(""); // Clear previous error message if successful
      })
      .catch((error) => {
        console.error("There was an error adding the contact person!", error);
        setErrorMessage("Failed to add contact person. Please try again.");
      })
      .finally(() => setLoadingSubmit(false));
  };

  return (
    <div className="contact-form-container">
      <h2>Add Contact Person</h2>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="contact-form">
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
          <small>Select a resident from the list.</small>
        </div>

        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter contact person's name"
            aria-describedby="nameHelp"
            aria-required="true"
          />
          <small id="nameHelp" className="form-text text-muted">Full name of the contact person.</small>
        </div>

        {/* Phone Number Field */}
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="Enter phone number"
            pattern="^\+?[1-9]\d{1,14}$"  // For phone number validation
            aria-describedby="phoneHelp"
            aria-required="true"
          />
          <small id="phoneHelp" className="form-text text-muted">Include country code (e.g., +1 for USA).</small>
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email address"
            aria-describedby="emailHelp"
            aria-required="true"
          />
          <small id="emailHelp" className="form-text text-muted">Enter a valid email address.</small>
        </div>

        {/* Address Field */}
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Enter address"
            aria-describedby="addressHelp"
            aria-required="true"
          />
          <small id="addressHelp" className="form-text text-muted">Street, city, postal code, etc.</small>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" disabled={loadingSubmit} className="submit-btn">
            {loadingSubmit ? "Adding..." : "Add Contact Person"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContactPerson;
