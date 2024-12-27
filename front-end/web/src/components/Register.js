import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuthToken } from '../helpers/setAuthToken';

function Register() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [role, setRole] = useState('Admin'); // Default role
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
            console.error("There was an error!", error);
        });
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Email Address </label>
                    <input type="text" name="email_address" required />
                    {renderErrorMessage("email_address")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="password" required />
                    {renderErrorMessage("password")}
                </div>
                <div className="input-container">
                    <label>Role </label>
                    <select
                        name="role"
                        value={role}
                        onChange={handleRoleChange}
                        style={{ color: role === "Admin" ? "red" : "black" }}
                        required
                    >
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Register</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );
}

export default Register;
