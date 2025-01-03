import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuthToken } from '../helpers/setAuthToken';
import Modal from './Modal'; // Import the Modal component

function Register() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [role, setRole] = useState('Admin'); // Default role
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const navigate = useNavigate();

    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;
        setRole(selectedRole);
        if (selectedRole === 'Admin') {
            alert("You are about to create an admin role");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessages({}); // Clear previous error messages

        axios.post("api/v1/auth/register", {
            email: event.target.email_address.value,
            password: event.target.password.value,
            role: role
        }).then(response => {
            const token = response.data.token;

            // Set token to local storage and axios common header
            localStorage.setItem("token", token);
            setAuthToken(token);

            navigate('/home');
            window.location.reload(false);
        }).catch(error => {
            if (error.response && error.response.data) {
                setErrorMessages({ message: error.response.data.message });
            } else {
                setErrorMessages({ message: "An unexpected error occurred. Please try again." });
            }
            setShowModal(true); // Show the modal when an error occurs
        });
    };

    const handleCancel = () => {
        navigate('/');
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container" style={{ marginBottom: '15px' }}>
                    <label htmlFor="email_address" style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>Email Address</label>
                    <input
                        type="text"
                        name="email_address"
                        id="email_address"
                        required
                        placeholder="Enter your email"
                        aria-label="Email Address"
                        style={{
                            width: '80%',
                            padding: '12px',
                            fontSize: '14px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            marginTop: '8px',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                    />
                </div>
                <div className="input-container" style={{ marginBottom: '20px' }}>
                    <label htmlFor="password" style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        placeholder="Enter your password"
                        aria-label="Password"
                        style={{
                            width: '80%',
                            padding: '12px',
                            fontSize: '14px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            marginTop: '8px',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                    />
                </div>
                <div className="input-container" style={{ marginBottom: '20px' }}>
                    <label htmlFor="role" style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>Role</label>
                    <select
                        name="role"
                        id="role"
                        value={role}
                        onChange={handleRoleChange}
                        style={{ 
                            color: role === "Admin" ? "red" : "black",
                            width: '80%',
                            padding: '12px',
                            fontSize: '14px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            marginTop: '8px',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                        required
                    >
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <div className="button-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#007BFF',
                            color: 'white',
                            padding: '14px 28px',
                            fontSize: '16px',
                            border: 'none',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                            width: '150px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#0056b3';
                            e.target.style.boxShadow = '0px 6px 8px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#007BFF';
                            e.target.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
                        }}
                        onFocus={(e) => {
                            e.target.style.boxShadow = '0px 0px 0px 4px rgba(0, 123, 255, 0.5)';
                        }}
                        onBlur={(e) => {
                            e.target.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        Register
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        style={{
                            backgroundColor: '#DC3545', // Red color
                            color: 'white',
                            padding: '14px 28px',
                            fontSize: '16px',
                            border: 'none',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                            width: '150px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#C82333';
                            e.target.style.boxShadow = '0px 6px 8px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#DC3545';
                            e.target.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
                        }}
                        onFocus={(e) => {
                            e.target.style.boxShadow = '0px 0px 0px 4px rgba(220, 53, 69, 0.5)';
                        }}
                        onBlur={(e) => {
                            e.target.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="app" style={{ 
            fontFamily: "'Arial', sans-serif", 
            padding: '30px',
            background: 'url("https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg") no-repeat center center fixed', 
            backgroundSize: 'cover',
            height: '100vh',
            color: '#000'
        }}>
            <div className="login-form" style={{
                maxWidth: '400px',
                margin: '0 auto',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
            }}>
                <div className="title" style={{
                    textAlign: 'center',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    marginBottom: '20px'
                }}>
                    Register
                </div>
                {isSubmitted ? <div style={{ color: 'green', textAlign: 'center' }}>User is successfully registered</div> : renderForm}
                <Modal show={showModal} onClose={closeModal} title="Error">
                    {errorMessages.message}
                </Modal>
            </div>
        </div>
    );
}

export default Register;