import React, { useEffect, useState } from "react";
import "../userfriendly_page/Resident.css"; // Add custom styles

function Resident() {
    const [residents, setResidents] = useState([]);  // State to store residents data
    const [loading, setLoading] = useState(true);  // State to track loading state
    const [error, setError] = useState(null); // State to track error if any
    const [newResident, setNewResident] = useState({
        firstName: "",
        lastName: "",
        age: "",
        medical_history: "",
        cnp: "",
        id_room: "",
        id_plan: "",
        admission_date: "", // New field
        birth_date: "", // New field
    }); // State to manage new resident form
    const [residentToEdit, setResidentToEdit] = useState(null); // State for editing a resident
    const [isFormVisible, setIsFormVisible] = useState(false);  // State to toggle form visibility

    // Fetch residents when component mounts
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/residents/all")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch residents data");
                }
                return response.json();
            })
            .then(data => {
                setResidents(data);  // Set the residents data
                setLoading(false);  // Set loading to false once data is fetched
            })
            .catch(err => {
                setError(err.message);  // Set error if something goes wrong
                setLoading(false);  // Set loading to false even if there is an error
            });
    }, []); // Empty dependency array ensures this runs only once, when the component mounts

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewResident(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission (Add or Update)
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the form from refreshing the page

        // Perform validation
        const { firstName, lastName, age, medical_history, cnp, id_room, id_plan, admission_date, birth_date } = newResident;
        if (!firstName || !lastName || !age || !medical_history || !cnp || !id_room || !id_plan || !admission_date || !birth_date) {
            alert("All fields are required");
            return;
        }

        // Prepare the data to send
        const residentData = {
            firstName,
            lastName,
            age,
            medical_history,
            cnp,
            id_room: Number(id_room),  // Ensure numeric conversion for id_room
            id_plan: Number(id_plan),  // Ensure numeric conversion for id_plan
            admission_date,
            birth_date,
        };

        // If residentToEdit is not null, it's an update operation
        if (residentToEdit) {
            fetch(`http://localhost:8080/api/v1/residents/update/${residentToEdit.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(residentData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to update resident");
                    }
                    return response.json();
                })
                .then((data) => {
                    // Update the local residents list with the updated data
                    setResidents(prevResidents =>
                        prevResidents.map(resident =>
                            resident.id === data.id ? { ...resident, ...residentData } : resident
                        )
                    );
                    setResidentToEdit(null); // Reset editing state
                    setNewResident({}); // Clear the form
                    setIsFormVisible(false); // Hide the form
                })
                .catch((err) => {
                    setError("Failed to update resident: " + err.message);  // Handle error
                });
        } else {
            // Optimistically update the table by adding the new resident directly
            const updatedResidents = [...residents, { ...residentData, id: Date.now() }]; // Temporary ID for the new resident
            setResidents(updatedResidents);

            // Send POST request to backend
            fetch("http://localhost:8080/api/v1/residents/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(residentData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to add resident");
                    }
                    return response.json();  // Parse response to JSON
                })
                .then((data) => {
                    // Once the resident is successfully added, replace the temporary ID with the real ID from the server
                    setResidents(prevResidents =>
                        prevResidents.map(resident =>
                            resident.id === undefined ? { ...resident, id: data.id } : resident
                        )
                    );
                    setNewResident({}); // Reset form fields
                    setIsFormVisible(false);  // Hide form after submission
                })
                .catch((err) => {
                    setError("Failed to add resident: " + err.message);  // Handle error
                });
        }
    };

    // Handle delete functionality
    const handleDelete = (id) => {
        // Optimistically remove the resident from the UI
        const updatedResidents = residents.filter(resident => resident.id !== id);
        setResidents(updatedResidents);

        // Send DELETE request to backend
        fetch(`http://localhost:8080/api/v1/residents/delete/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to delete resident");
                }
            })
            .catch((err) => {
                // If the delete fails, add the resident back to the list
                setResidents(residents);
                setError("Failed to delete resident: " + err.message);  // Handle error
            });
    };

    // Handle edit functionality
    const handleEdit = (resident) => {
        setResidentToEdit(resident);
        setNewResident(resident); // Pre-fill form with current resident data
        setIsFormVisible(true); // Show the form
    };

    // Render loading, error, or the table of residents
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="resident-page">
            <h2 className="page-title">Resident Management</h2>

            {/* Button to toggle the form */}
            <button onClick={() => setIsFormVisible(prev => !prev)}>
                {isFormVisible ? (residentToEdit ? "Edit Resident" : "Hide Form") : "Add New Resident"}
            </button>

            {/* Add/Edit Resident Form */}
            {isFormVisible && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={newResident.firstName || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={newResident.lastName || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={newResident.age || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Medical History:</label>
                        <input
                            type="text"
                            name="medical_history"
                            value={newResident.medical_history || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>CNP:</label>
                        <input
                            type="text"
                            name="cnp"
                            value={newResident.cnp || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Room ID:</label>
                        <input
                            type="number"
                            name="id_room"
                            value={newResident.id_room || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Care Plan ID:</label>
                        <input
                            type="number"
                            name="id_plan"
                            value={newResident.id_plan || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Admission Date:</label>
                        <input
                            type="date"
                            name="admission_date"
                            value={newResident.admission_date || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Birth Date:</label>
                        <input
                            type="date"
                            name="birth_date"
                            value={newResident.birth_date || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">{residentToEdit ? "Update Resident" : "Add Resident"}</button>
                </form>
            )}

            {/* Scrollable Residents Table */}
            <div className="resident-table-container">
                <table className="resident-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Medical History</th>
                            <th>CNP</th>
                            <th>Room ID</th>
                            <th>Care Plan ID</th>
                            <th>Admission Date</th> {/* New column */}
                            <th>Birth Date</th> {/* New column */}
                            <th>Action</th> {/* New column for delete */}
                        </tr>
                    </thead>
                    <tbody>
                        {residents.map((resident) => (
                            <tr key={resident.id}>
                                <td>{resident.firstName}</td>
                                <td>{resident.lastName}</td>
                                <td>{resident.age}</td>
                                <td>{resident.medical_history}</td>
                                <td>{resident.cnp}</td>
                                <td>{resident.id_room}</td>
                                <td>{resident.id_plan}</td>
                                <td>{resident.admission_date}</td>
                                <td>{resident.birth_date}</td>
                                <td>
                                    {/* Edit and Delete Buttons */}
                                    <button onClick={() => handleEdit(resident)}>Edit</button>
                                    <button onClick={() => handleDelete(resident.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Resident;