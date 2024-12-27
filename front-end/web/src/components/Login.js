import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuthToken } from '../helpers/setAuthToken';

function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const errors = {
    uname: "Email address is invalid",
    pass: "Password is invalid"
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email_address, password } = event.target;

    axios.defaults.baseURL = 'http://localhost:8080';

    axios.post("/api/v1/auth/authentication", {
      email: email_address.value,
      password: password.value
    })
    .then(response => {
      const token = response.data.token;
      localStorage.setItem("token", token);
      setAuthToken(token);
      navigate('/home');
      window.location.reload(false);
    })
    .catch((error) => {
      setErrorMessages({ message: 'Something went wrong. Please try again.' });
    });
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && <div className="error">{errorMessages.message}</div>;

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
              width: '80%', /* Reducem lățimea inputului pentru a-l centra */
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
          {renderErrorMessage("uname")}
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
              width: '80%', /* Reducem lățimea inputului pentru a-l centra */
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
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input
            type="submit"
            value="Sign In"
            style={{
              backgroundColor: '#007BFF', /* Albastru */
              color: 'white',
              padding: '12px 24px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              width: '80%', /* Centrăm și butonul */
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007BFF'}
          />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app" style={{ 
      fontFamily: "'Arial', sans-serif", 
      padding: '30px',
      background: 'url("https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg") no-repeat center center fixed', 
      backgroundSize: 'cover', /* Imaginea să ocupe tot ecranul */
      height: '100vh', /* Înălțimea ecranului complet */
      color: '#000' /* Text negru pentru a fi vizibil pe fundalul imaginii */
    }}>
      <div className="login-form" style={{
        maxWidth: '400px', /* Formular mai compact */
        margin: '0 auto',
        padding: '40px', /* Mărim padding-ul pentru a mări zona de fundal alb */
        borderRadius: '8px',
        boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)' /* Fundal semi-transparent pentru formular */
      }}>
        <div className="title" style={{
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          Sign In
        </div>
        {isSubmitted ? <div style={{ color: 'green', textAlign: 'center' }}>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;
