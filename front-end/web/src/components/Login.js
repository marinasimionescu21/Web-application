import React, { useState } from "react";
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

import {setAuthToken} from '../helpers/setAuthToken'

function Login() {

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const errors = {
    uname: "invalid email_address",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email_address, password } = document.forms[0]; 

    axios.post("api/v1/auth/register", 
    {
      email_address: event.target.email_address.value,
      password: event.target.password.value}
      )
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
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
          {renderErrorMessage("pass")}
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
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;