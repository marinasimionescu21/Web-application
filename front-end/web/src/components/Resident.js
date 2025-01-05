import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../userfriendly_page/Resident.css"; // Add custom styles

function Resident() {
    const [residents, setResidents] = useState([]);
    const [newResident, setNewResident] = useState({
        firstName: '',
        lastName: '',
        age: '',
        medical_history: '',
        cnp: '',
        id_room: '',
        admission_date: '',
        birth_date: '',
    })
    ;
        const [residentToEdit, setResidentToEdit] = useState(null);
        const [message, setMessage] = useState('');
        const [showModal, setShowModal] = useState(false);
        const [showEditModal, setShowEditModal] = useState(false);
    
        useEffect(() => {
            fetchResidents();
        }, []);
    
        const fetchResidents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/residents/all');
                setResidents(response.data);
            } catch (error) {
                console.error('Error fetching residents:', error);
                setMessage('Failed to load residents');
            }
        };
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            if (showEditModal) {
                setResidentToEdit({ ...residentToEdit, [name]: value });
            } else {
                setNewResident({ ...newResident, [name]: value });
            }
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!newResident.firstName || !newResident.lastName || !newResident.cnp) {
                setMessage('Please fill out all required fields');
                return;
            }
    
            try {
                await axios.post(`http://localhost:8080/api/v1/residents/create`, newResident);
                setMessage('Resident created successfully!');
                setNewResident({
                    firstName: '',
                    lastName: '',
                    age: '',
                    medical_history: '',
                    cnp: '',
                    id_room: '',
                    admission_date: '',
                    birth_date: '',
                });
                fetchResidents();
                setShowModal(false);
            } catch (error) {
                console.error('Error creating resident:', error);
                setMessage('Error creating resident');
            }
        };
    
        const handleEditSubmit = async (e) => {
            e.preventDefault();
            if (!residentToEdit.cnp) {
                setMessage('Invalid resident CNP');
                return;
            }
    
            try {
                await axios.put(`http://localhost:8080/api/v1/residents/${residentToEdit.cnp}`, residentToEdit);
                setMessage('Resident updated successfully!');
                fetchResidents();
                setShowEditModal(false);
            } catch (error) {
                console.error('Error updating resident:', error);
                setMessage('Error updating resident');
            }
        };
    
        const handleDelete = async (cnp) => {
            const confirmDelete = window.confirm('Are you sure you want to delete this resident?');
            if (confirmDelete) {
                try {
                    await axios.delete(`http://localhost:8080/api/v1/residents/${cnp}`);
                    setMessage('Resident deleted successfully!');
                    fetchResidents();
                } catch (error) {
                    console.error('Error deleting resident:', error);
                    setMessage('Error deleting resident');
                }
            }
        };
    
        const toggleModal = () => setShowModal(!showModal);
        const toggleEditModal = () => setShowEditModal(!showEditModal);
    
        const startEditResident = (resident) => {
            setResidentToEdit(resident);
            setShowEditModal(true);
        };
    
        return (
            <div className="resident-page">
                <h2>Resident Management</h2>
    
                <div className="resident-list">
                    {residents.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Medical History</th>
                                    <th>CNP</th>
                                    <th>Room ID</th>
                                    <th>Admission Date</th>
                                    <th>Birth Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {residents.map((resident) => (
                                    <tr key={resident.cnp}>
                                        <td>{resident.firstName}</td>
                                        <td>{resident.lastName}</td>
                                        <td>{resident.age}</td>
                                        <td>{resident.medical_history}</td>
                                        <td>{resident.cnp}</td>
                                        <td>{resident.id_room}</td>
                                        <td>{resident.admission_date}</td>
                                        <td>{resident.birth_date}</td>
                                        <td>
                                            <button className="edit-button" onClick={() => startEditResident(resident)}>Edit</button>
                                            <button className="delete-button" onClick={() => handleDelete(resident.cnp)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No residents found</p>
                    )}
                </div>
    
                <button className="add-resident-button" onClick={toggleModal}>
                    Add Resident
                </button>
    
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Add New Resident</h3>
                            <form onSubmit={handleSubmit}>
                                <input name="firstName" value={newResident.firstName} onChange={handleChange} placeholder="First Name" required />
                                <input name="lastName" value={newResident.lastName} onChange={handleChange} placeholder="Last Name" required />
                                <input name="age" value={newResident.age} onChange={handleChange} placeholder="Age" type="number" />
                                <input name="medical_history" value={newResident.medical_history} onChange={handleChange} placeholder="Medical History" />
                                <input name="cnp" value={newResident.cnp} onChange={handleChange} placeholder="CNP" required />
                                <input name="id_room" value={newResident.id_room} onChange={handleChange} placeholder="Room ID" type="number" />
                                <input name="admission_date" value={newResident.admission_date} onChange={handleChange} placeholder="Admission Date" type="date" />
                                <input name="birth_date" value={newResident.birth_date} onChange={handleChange} placeholder="Birth Date" type="date" />
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
                            <h3>Edit Resident</h3>
                            <form onSubmit={handleEditSubmit}>
                                <input name="firstName" value={residentToEdit.firstName} onChange={handleChange} placeholder="First Name" required />
                                <input name="lastName" value={residentToEdit.lastName} onChange={handleChange} placeholder="Last Name" required />
                                <input name="age" value={residentToEdit.age} onChange={handleChange} placeholder="Age" type="number" />
                                <input name="medical_history" value={residentToEdit.medical_history} onChange={handleChange} placeholder="Medical History" />
                                <input name="cnp" value={residentToEdit.cnp} onChange={handleChange} placeholder="CNP" required readOnly />
                                <input name="id_room" value={residentToEdit.id_room} onChange={handleChange} placeholder="Room ID" type="number" />
                                <input name="admission_date" value={residentToEdit.admission_date} onChange={handleChange} placeholder="Admission Date" type="date" />
                                <input name="birth_date" value={residentToEdit.birth_date} onChange={handleChange} placeholder="Birth Date" type="date" />
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
    
    export default Resident;

