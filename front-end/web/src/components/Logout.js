<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Logout icon
import { setAuthToken } from '../helpers/setAuthToken';

function Logout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Remove token and reset auth
        localStorage.removeItem('token');
        setAuthToken(null);
        console.log(localStorage.getItem("token")); // Should return null

        // Set a timeout to simulate loading for 1 second, then redirect
        setTimeout(() => {
            setLoading(false); // Hide loading screen
            navigate('/'); // Redirect to home page
        }, 1000); // 1000ms = 1 second
    }, [navigate]);

    // If loading, display a loading spinner and a message
    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <h2 style={styles.loadingText}>Logging you out... Please wait.</h2>
            </div>
        );
    }

    // Once loading is complete, the redirect will happen
    return (
        <div style={styles.logoutContainer}>
            <button style={styles.logoutButton} onClick={() => navigate('/')}>
                <FaSignOutAlt style={styles.icon} /> Logout
            </button>
        </div>
    );
}

const styles = {
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f7f7f7',  // Light background color
    },
    spinner: {
        border: '8px solid #f3f3f3',  // Light gray background for spinner
        borderTop: '8px solid #3498db',  // Blue color for spinner
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite', // Animation for rotating the spinner
    },
    loadingText: {
        marginTop: '20px',
        fontSize: '18px',
        color: '#333', // Dark text for readability
        fontWeight: 'bold',
        animation: 'fadeIn 1s ease-in-out', // Fade-in effect for text
    },
    logoutContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f7f7f7',  // Light background color
    },
    logoutButton: {
        backgroundColor: 'transparent', // Transparent background
        color: '#FF5733', // Orange-red color for text and icon
        padding: '15px 40px',  // Padding to make the button larger
        fontSize: '18px',
        fontWeight: 'bold',
        border: '2px solid #FF5733',  // Border in the same color as the text
        borderRadius: '50px',  // Rounded corners for a smooth look
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',  // Smooth transition for hover effect
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Slight shadow for depth
    },
    icon: {
        marginRight: '10px',  // Space between the icon and text
        fontSize: '20px',  // Slightly larger icon
    },
    logoutButtonHover: {
        backgroundColor: '#D44229',  // Darker red for hover effect
        color: 'white',  // Change text color to white on hover
        borderColor: '#D44229', // Darker border color on hover
    },
};

const styleSheet = document.styleSheets[0];

styleSheet.insertRule(`
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`, styleSheet.cssRules.length);

export default Logout;
=======
import { useNavigate} from 'react-router-dom';
import {setAuthToken} from '../helpers/setAuthToken'

function Logout() {
    localStorage.removeItem('token');
    console.log(localStorage.getItem("token"));
    const navigate = useNavigate();
    setAuthToken(null);
    return (<h2>Home page</h2>);  
    navigate('/');
}

export default Logout;
>>>>>>> 7d22ca3cfb891676cf031ad47243c336d8db5674
