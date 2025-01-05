import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaBars, FaArrowLeft, FaUserFriends, FaBriefcase, FaBuilding, FaPager } from 'react-icons/fa';

export default function Navbar() {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate(); // To redirect after logout
  const location = useLocation(); // To detect when the page changes
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar visibility

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate('/'); // Redirect to home page after logout
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle the sidebar open/close state
  };

  // Close the sidebar when the page changes
  useEffect(() => {
    setSidebarOpen(false); // Close the sidebar whenever the page changes
  }, [location]);

  return (
    auth ? (
      <div style={styles.navContainer}>
        {/* Burger Icon to toggle sidebar */}
        <button className="burger-menu" style={styles.burgerMenu} onClick={toggleSidebar}>
          <FaBars />
        </button>

        {/* Sidebar (conditionally rendered based on state) */}
        <nav className={`nav ${sidebarOpen ? "open" : ""}`} style={sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}>
          <button className="back-button" onClick={toggleSidebar} style={styles.backButton}>
            <FaArrowLeft /> {/* Back button to close sidebar */}
          </button>
          <ul style={styles.menu}>
            <CustomLink to="/home">
              <FaHome /> Home
            </CustomLink>
            <CustomLink to="/resident">
              <FaUserFriends /> Residents
            </CustomLink>
            <CustomLink to="/employee">
              <FaBriefcase /> Employees
            </CustomLink>
            <CustomLink to="/room">
              <FaBuilding /> Rooms
            </CustomLink>
            <CustomLink to="/careplan">
              <FaPager /> Care Plans
            </CustomLink>
            <CustomLink to="/contactperson">
              <FaUserFriends /> Contact Person
            </CustomLink>
          </ul>
          <div style={styles.logoutWrapper}>
            <button onClick={handleLogout} className="logout-button" style={styles.logoutButton}>
              <span style={styles.icon}>
                <FaSignOutAlt />
              </span>
              <span style={styles.linkText}>Logout</span>
            </button>
          </div>
        </nav>
      </div>
    ) : null // Render nothing if auth is falsy
  );
}

function CustomLink({ to, children, ...props }) {
  return (
    <li style={styles.link}>
      <Link to={to} {...props} style={styles.navLink}>
        <span style={styles.icon}>{children[0]}</span> {/* Extract icon */}
        <span style={styles.linkText}>{children[1]}</span> {/* Extract text */}
      </Link>
    </li>
  );
}

// Inline styles for the navbar
const styles = {
  navContainer: {
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 10,
  },
  burgerMenu: {
    fontSize: "2rem",
    color: "#fff",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  sidebarClosed: {
    display: "none",
  },
  sidebarOpen: {
    display: "flex",
    flexDirection: "column", // Stack items vertically
    justifyContent: "space-between", // Space between top items and logout button
    position: "fixed",
    top: 0,
    left: 0,
    width: "250px",
    height: "100%",
    backgroundColor: "#333",
    padding: "20px",
    zIndex: 1000,
  },
  backButton: {
    color: "#fff",
    fontSize: "1.5rem",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    marginBottom: "1rem",
  },
  menu: {
    listStyleType: "none", // Removes bullet points
    padding: 0,
    flexGrow: 1, // Allows menu items to take up remaining space if needed
  },
  link: {
    marginBottom: "15px",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#fff",
  },
  icon: {
    marginRight: "10px", // Adjust margin for spacing
    fontSize: "1.5rem",
  },
  linkText: {
    fontSize: "1rem",
  },
  logoutWrapper: {
    marginTop: "auto", // Push the logout button down
    marginBottom: "20px", // Add space from the bottom
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    fontSize: "1.5rem",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
};
