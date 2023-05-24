import React, { useState } from "react";
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import {setAuthToken} from '../helpers/setAuthToken'


function Register() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
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