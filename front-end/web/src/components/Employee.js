import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../userfriendly_page/Employee.css";

function EmployeePage() {
    const [employees, setEmployees] = useState([]);
    const [newemployee, setNewEmployee] = useState({
        firstName: '',
        lastName: '',
        age: '',
        emailAddress: '',
        address: '',
        role: '',
    });
    const [editemployee, setEditEmployee] = useState([]);
    const [message, setMessage] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        fetchemployees();
    }, []);

    const fetchemployees = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/employees/all');
            const filteredEmployees = response.data.filter(employee => employee.role !== 'Admin');
            setEmployees(filteredEmployees);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setMessage('Failed to load employees');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (showEditModal) {
            setEditEmployee({ ...editemployee, [name]: value });
        } else {
            setNewEmployee({ ...newemployee, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newemployee.firstName || !newemployee.lastName || !newemployee.emailAddress) {
            setMessage('Please fill out all required fields');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/v1/employees/create', newemployee);
            setMessage('Employee created successfully!');
            setNewEmployee({
                cnp: '',
                firstName: '',
                lastName: '',
                age: '',
                emailAddress: '',
                address: '',
                role: '',
            });
            fetchemployees();
            setShowModal(false);
        } catch (error) {
            console.error('Error creating employee:', error);
            setMessage('Error creating employee');
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editemployee.cnp) {
            setMessage('Invalid employee CNP');
            return;
        }
        if (!editemployee.firstName || !editemployee.lastName || !editemployee.emailAddress) {
            setMessage('Please fill out all required fields');
            return;
        }
    
        try {
            await axios.put(`http://localhost:8080/api/v1/employees/${editemployee.cnp}`, editemployee);
            setMessage('Employee updated successfully!');
            fetchemployees(); // Refresh the employee list
            setShowEditModal(false); // Close the edit modal
        } catch (error) {
            console.error('Error updating employee:', error);
            setMessage('Error updating employee');
        }
    };

    const handleDelete = async (cnp) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/employees/${cnp}`);
                setMessage('Employee deleted successfully!');
                fetchemployees(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting employee:', error);
                setMessage('Error deleting employee');
            }
        }
    };

    const toggleModal = () => setShowModal(!showModal);
    const toggleEditModal = () => setShowEditModal(!showEditModal);

    const startEditemployee = (employee) => {
        setEditEmployee(employee);
        setShowEditModal(true);
    };

    return (
        <div className="employee-page">
            <h2>Employees Management</h2>

            <div className="employee-list">
                {employees.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>CNP</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.cnp}>
                                    <td>{employee.cnp}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.age}</td>
                                    <td>{employee.emailAddress}</td>
                                    <td>{employee.address}</td>
                                    <td>{employee.role}</td>
                                    <td>
                                        <button className="edit-button" onClick={() => startEditemployee(employee)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(employee.cnp)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No employees found</p>
                )}
            </div>

            <button className="add-employee-button" onClick={toggleModal}>
                Add employee
            </button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Add New employee</h3>
                        <form onSubmit={handleSubmit}>
                            <input name="cnp" value={newemployee.cnp} onChange={handleChange} placeholder="CNP" type="number" />
                            <input name="firstName" value={newemployee.firstName} onChange={handleChange} placeholder="First Name" required />
                            <input name="lastName" value={newemployee.lastName} onChange={handleChange} placeholder="Last Name" required />
                            <input name="age" value={newemployee.age} onChange={handleChange} placeholder="Age" type="number" />
                            <input name="emailAddress" value={newemployee.emailAddress} onChange={handleChange} placeholder="Email Address" required />
                            <input name="address" value={newemployee.address} onChange={handleChange} placeholder="Address" />
                            <select name="role" value={newemployee.role} onChange={handleChange} required>
                                <option value="">Select Role</option>
                                <option value="Asistent">Asistent</option>
                                <option value="Medic">Medic</option>
                                <option value="Functionar">Functionar</option>
                                <option value="Voluntar">Voluntar</option>
                                <option value="Psiholog">Psiholog</option>
                                <option value="Asistent social">Asistent social</option>
                            </select>
                            <button type="submit">Create</button>
                            <button type="button" onClick={toggleModal}>Cancel</button>
                        </form>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Edit Employee</h3>
                        <form onSubmit={handleEditSubmit}>
                            <input name="cnp" value={editemployee.cnp} onChange={handleChange} placeholder="CNP" type="number" readOnly />
                            <input name="firstName" value={editemployee.firstName} onChange={handleChange} placeholder="First Name" required />
                            <input name="lastName" value={editemployee.lastName} onChange={handleChange} placeholder="Last Name" required />
                            <input name="age" value={editemployee.age} onChange={handleChange} placeholder="Age" type="number" />
                            <input name="emailAddress" value={editemployee.emailAddress} onChange={handleChange} placeholder="Email Address" required />
                            <input name="address" value={editemployee.address} onChange={handleChange} placeholder="Address" />
                            <select name="role" value={editemployee.role} onChange={handleChange} required>
                                <option value="">Select Role</option>
                                <option value="Asistent">Asistent</option>
                                <option value="Medic">Medic</option>
                                <option value="Functionar">Functionar</option>
                                <option value="Voluntar">Voluntar</option>
                                <option value="Psiholog">Psiholog</option>
                                <option value="Asistent social">Asistent social</option>
                            </select>
                            <button type="submit">Update</button>
                            <button type="button" onClick={toggleEditModal}>Cancel</button>
                        </form>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            )}

        </div>
    );
}

export default EmployeePage;
