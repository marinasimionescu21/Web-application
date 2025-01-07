import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../userfriendly_page/Visits.css";

// Visits.js - All-in-one component

function Visits() {
  const [searchQuery, setSearchQuery] = useState('');
  const [residents, setResidents] = useState([]);
  const [selectedResident, setSelectedResident] = useState(null);
  const [visitDates, setVisitDates] = useState([]);
  const [visitorName, setVisitorName] = useState('');
  const [loading, setLoading] = useState(false); 
  const [loadingVisits, setLoadingVisits] = useState(false); 
  const [error, setError] = useState(null); // Error state for data fetching
  const [filteredResidents, setFilteredResidents] = useState([]); // For auto-suggestions

  // Handle search input change and filter residents on the fly
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter residents based on query
    if (query === '') {
      setFilteredResidents(residents); // Show all if query is empty
    } else {
      const filtered = residents.filter((resident) =>
        `${resident.firstName} ${resident.lastName}`.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResidents(filtered);
    }
  };

  // Fetch residents when component mounts
  useEffect(() => {
    const fetchResidents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/v1/residents/all');
        setResidents(response.data);
        setFilteredResidents(response.data); // Initialize filtered residents with all
      } catch (error) {
        setError('Failed to load residents');
        console.error('Error fetching residents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

  // Fetch visit dates for the selected resident
  useEffect(() => {
    if (selectedResident) {
      fetchVisitDates();
    }
  }, [selectedResident]);

  const fetchVisitDates = async () => {
    setLoadingVisits(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/visits/resident/${selectedResident.cnp}`);
      const dates = response.data.map((visit) => {
        const visitDate = new Date(visit.visitDate);
        visitDate.visitorName = visit.visitorName;
        return visitDate;
      });
      setVisitDates(dates);
    } catch (error) {
      setError('Failed to load visit dates');
      console.error('Error fetching visits:', error);
    } finally {
      setLoadingVisits(false);
    }
  };

  const handleResidentSelect = (resident) => {
    setSelectedResident(resident);
    setVisitorName('');  // Reset visitor name when a new resident is selected
  };

  const handleDateClick = (date) => {
    const selectedDate = visitDates.find((d) => d.toDateString() === date.toDateString());
    if (selectedDate) {
      setVisitorName(selectedDate.visitorName);
    } else {
      setVisitorName('No visits scheduled');
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      return visitDates.some((visitDate) => visitDate.toDateString() === date.toDateString()) ? 'highlight' : '';
    }
    return '';
  };

  return (
    <div className="visits-container">
      {/* Search Section */}
      <div className="search-container">
        <h2>Search for Resident</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Enter resident name"
          className="search-input"
        />
        
        {loading && <p>Loading residents...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Auto-suggestions */}
        {searchQuery && !loading && !error && (
          <ul className="suggestions-list">
            {filteredResidents.length > 0 ? (
              filteredResidents.map((resident) => (
                <li
                  key={resident.cnp}
                  onClick={() => handleResidentSelect(resident)}
                  className="suggestion-item"
                >
                  {resident.firstName} {resident.lastName}
                </li>
              ))
            ) : (
              <p>No matching residents found</p>
            )}
          </ul>
        )}
      </div>

      {/* Resident Calendar */}
      {selectedResident && (
        <div className="calendar-container">
          {loadingVisits ? (
            <p>Loading visit dates...</p>
          ) : (
            <Calendar
              onClickDay={handleDateClick}
              tileClassName={tileClassName}
              value={new Date()}  // Show current date
            />
          )}
        </div>
      )}

      {/* Visit Details */}
      {visitorName && (
        <div className="visit-details">
          <p><strong>Visitor:</strong> {visitorName}</p>
        </div>
      )}
    </div>
  );
}

export default Visits;
