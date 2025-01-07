import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../userfriendly_page/VisitManagement.css';

function VisitManagement() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [residentCnp, setResidentCnp] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Prepopulate the date and time fields with defaults
  React.useEffect(() => {
    const now = new Date();
    const defaultDate = now.toISOString().split('T')[0];
    const defaultTime = now.toTimeString().split(':').slice(0, 2).join(':'); // HH:mm format
    setVisitDate(defaultDate);
    setVisitTime(defaultTime);
  }, []);

  const validateForm = () => {
    if (!residentCnp || isNaN(residentCnp)) {
      setError('Please enter a valid numeric Resident CNP.');
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
              Resident CNP: <span className="tooltip">Enter a valid 13-digit CNP number.</span>
            </label>
            <input
              type="text"
              value={residentCnp}
              onChange={(e) => setResidentCnp(e.target.value)}
              placeholder="e.g., 1234567890123"
              required
            />
          </div>
          <div className="form-field">
            <label>
              Visitor Name: <span className="tooltip">Enter the full name of the visitor.</span>
            </label>
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
            {loading ? 'Submitting...' : '✅ Schedule Visit'}
          </button>
        </form>
      )}
    </div>
  );
}

export default VisitManagement;
