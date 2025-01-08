import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../userfriendly_page/VisitManagement.css';

function VisitManagement() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [residentCnp, setResidentCnp] = useState('');
  const [residentName, setResidentName] = useState(''); 
  const [visitorName, setVisitorName] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [residents, setResidents] = useState([]);

  // Fetch residents on component mount
  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/residents/all');
        if (response.ok) {
          const data = await response.json();
          setResidents(data);
        } else {
          setError('Failed to fetch residents.');
        }
      } catch (err) {
        setError('An error occurred while fetching residents.');
      }
    };

    fetchResidents();

    // Set default visit date and time
    const now = new Date();
    const defaultDate = now.toISOString().split('T')[0];
    const defaultTime = now.toTimeString().split(':').slice(0, 2).join(':'); // HH:mm format
    setVisitDate(defaultDate);
    setVisitTime(defaultTime);
  }, []);

  const validateForm = () => {
    if (!residentCnp || isNaN(residentCnp)) {
      setError('Please select a valid resident.');
      return false;
    }
    if (!visitorName.trim()) {
      setError('Visitor name cannot be empty.');
      return false;
    }
    if (!visitDate) {
      setError('Please select a visit date.');
      return false;
    }
    if (!visitTime) {
      setError('Please select a visit time.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    const formattedVisitDate = `${visitDate}T${visitTime}`;

    try {
      const response = await fetch('http://localhost:8080/api/v1/visits/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          residentCnp: Number(residentCnp),
          visitorName: visitorName,
          visitDate: formattedVisitDate,
        }),
      });

      if (response.ok) {
        setSuccess('🎉 Visit created successfully!');
        setResidentCnp('');
        setResidentName('');
        setVisitorName('');
        setVisitDate('');
        setVisitTime('');
        setIsFormVisible(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create visit. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="visit-management-container">
      <h1 className="title">Visit Management</h1>
      <p className="description">
        Manage and schedule visits with ease. Use the buttons below to navigate or add a new visit.
      </p>

      <div className="buttons-container">
        <Link to="/visits" className="button-link">
          <button className="view-all-button">📋 View All Visits</button>
        </Link>
        <button
          className={`primary-button ${isFormVisible ? 'cancel-button' : 'add-button'}`}
          onClick={() => {
            setIsFormVisible(!isFormVisible);
            setError('');
            setSuccess('');
          }}
        >
          {isFormVisible ? 'Cancel' : '➕ Add Visit'}
        </button>
      </div>

      {isFormVisible && (
        <form className="add-visit-form" onSubmit={handleSubmit}>
          <h2>Schedule a New Visit</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-field">
            <label>
              Resident: <span className="tooltip">Select a resident from the list.</span>
            </label>
            <select
              value={residentName}
              onChange={(e) => {
                const selectedResident = residents.find(
                  (res) => `${res.firstName} ${res.lastName}` === e.target.value
                );
                if (selectedResident) {
                  setResidentName(`${selectedResident.firstName} ${selectedResident.lastName}`);
                  setResidentCnp(selectedResident.cnp);
                }
              }}
              required
            >
              <option value="">Select Resident</option>
              {residents.map((resident) => (
                <option key={resident.cnp} value={`${resident.firstName} ${resident.lastName}`}>
                  {resident.firstName} {resident.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label>Visitor Name:</label>
            <input
              type="text"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              placeholder="e.g., John Doe"
              required
            />
          </div>

          <div className="form-field">
            <label>Visit Date:</label>
            <input
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label>Visit Time:</label>
            <input
              type="time"
              value={visitTime}
              onChange={(e) => setVisitTime(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? <div className="loading-spinner"></div> : '✅ Schedule Visit'}
          </button>
        </form>
      )}
    </div>
  );
}

export default VisitManagement;
