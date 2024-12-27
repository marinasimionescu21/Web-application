import React, { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuthToken } from '../helpers/setAuthToken';
=======
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import {setAuthToken} from '../helpers/setAuthToken'

>>>>>>> 7d22ca3cfb891676cf031ad47243c336d8db5674

function Register() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
<<<<<<< HEAD
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
=======
    const [email_address, password, role] = useState('');

    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      //Prevent page reload
      event.preventDefault();
  
      var { email_address, password, role } = document.forms[0];
  
      // Find user login info
      //const userData = database.find((user) => user.email_address === uname.value);
  
      // Compare user info
      /*if (userData) {
        if (userData.password !== pass.value) {
          // Invalid password
          setErrorMessages({ name: "pass", message: errors.pass });
        } else {
          setIsSubmitted(true);
        }
      } else {
        // email_address not found
        setErrorMessages({ name: "uname", message: errors.uname });
      }*/

      console.log(event.target.email_address.value);

      axios.post("api/v1/auth/register", {
        email_address: event.target.email_address.value,
        password: event.target.password.value,
        role: event.target.role.value})
     .then(response => {
       //get token from response
       const token  =  response.data.token;

       console.log(token);
 
       //set JWT token to local
       localStorage.setItem("token", token);
 
       //set token to axios common header
       setAuthToken(token);

       navigate('/home');

       window.location.reload(false);
     });

    };
  
    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
      name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
      );
  
    // JSX code for login form
    const renderForm = (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>email_address </label>
            <input type="text" name="email_address" required />
            {renderErrorMessage("email_address")}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="password" required />
            {renderErrorMessage("password")}
            <label>Role </label>
            <input type="text" name="role" required />
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
>>>>>>> 7d22ca3cfb891676cf031ad47243c336d8db5674
