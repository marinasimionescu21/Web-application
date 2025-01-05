import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../userfriendly_page/CarePlan.css';

const CarePlanForm = () => {
  const [employees, setEmployees] = useState([]);
  const [residents, setResidents] = useState([]);
  const [carePlans, setCarePlans] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedResident, setSelectedResident] = useState('');
  const [objectives, setObjectives] = useState('');
  const [startDate, setStartDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // Toggle for popup modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesResponse = await axios.get('http://localhost:8080/api/v1/employees/all');
        const residentsResponse = await axios.get('http://localhost:8080/api/v1/residents/all');
        const carePlansResponse = await axios.get('http://localhost:8080/api/v1/careplans/all');
        setEmployees(employeesResponse.data);
        setResidents(residentsResponse.data);
        setCarePlans(carePlansResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error fetching data');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEmployee || !selectedResident || !objectives || !startDate) {
      setMessage('All fields are required');
      return;
    }
    setLoading(true);
    const carePlanData = {
      id_emp: selectedEmployee,
      id_res: selectedResident,
      objectives,
      start_date: startDate,
    };
    try {
      await axios.post('http://localhost:8080/api/v1/careplans/create', carePlanData);
      setMessage('Care plan added successfully!');
      const carePlansResponse = await axios.get('http://localhost:8080/api/v1/careplans/all');
      setCarePlans(carePlansResponse.data);
    } catch (error) {
      console.error('Error adding care plan:', error);
      setMessage('Error adding care plan');
    } finally {
      setLoading(false);
      setShowModal(false); // Close modal after submission
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this care plan?')) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/careplans/delete/${id}`);
        setCarePlans(carePlans.filter((carePlan) => carePlan.id_plan !== id));
        setMessage('Care plan deleted successfully!');
      } catch (error) {
        console.error('Error deleting care plan:', error);
        setMessage('Error deleting care plan');
      }
    }
  };

  return (
    <div className="care-plan-page">
      <h2 className="page-title">Care Plan Management</h2>
      <div className="care-plan-container">
        <h3 className="section-title">Existing Care Plans</h3>
        <div className="care-plan-grid">
          {carePlans.map((carePlan) => (
            <div key={carePlan.id_plan} className="care-plan-card">
              <h4>Plan ID: {carePlan.id_plan}</h4>
              <p>Employee: {carePlan.employee.firstName} {carePlan.employee.lastName}</p>
              <p>Resident: {carePlan.resident.firstName} {carePlan.resident.lastName}</p>
              <p>Objectives: {carePlan.objectives}</p>
              <p>Start Date: {carePlan.start_date}</p>
              <button className="delete-button" onClick={() => handleDelete(carePlan.id_plan)}>
                Delete
              </button>
            </div>
          ))}
        </div>
        <button className="toggle-modal-button" onClick={() => setShowModal(true)}>
          Add New Care Plan
        </button>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal-button" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h3 className="form-title">Add New Care Plan</h3>
            <form onSubmit={handleSubmit}>
              <label>Employee:</label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                required
              >
                <option value="">Select an Employee</option>
                {employees.map((employee) => (
                  <option key={employee.cnp} value={employee.cnp}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>
              <label>Resident:</label>
              <select
                value={selectedResident}
                onChange={(e) => setSelectedResident(e.target.value)}
                required
              >
                <option value="">Select a Resident</option>
                {residents.map((resident) => (
                  <option key={resident.cnp} value={resident.cnp}>
                    {resident.firstName} {resident.lastName}
                  </option>
                ))}
              </select>
              <label>Objectives:</label>
              <textarea
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                required
              ></textarea>
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CarePlanForm;
