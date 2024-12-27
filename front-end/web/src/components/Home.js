import React, { useState } from "react";
import { Link } from "react-router-dom";

// URL of the background image
const backgroundImageUrl = "https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg";

// Image URLs for buttons
const residentsImageUrl = "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg"; // Replace with actual Residents image
const userImageUrl = "https://images.pexels.com/photos/2902378/pexels-photo-2902378.jpeg"; // Replace with actual User image

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <HoverButton text="Residents" imageUrl={residentsImageUrl} link="/resident" />
        <HoverButton text="Employees" imageUrl={userImageUrl} link="/employee" />
      </div>
    </div>
  );
}

// Button component that shows an image with a more transparent dark grey background initially, and a sliding image on hover
const HoverButton = ({ text, imageUrl, link }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={link}>
      <button
        style={styles.button}
        onMouseEnter={() => setHovered(true)} // Trigger hover state
        onMouseLeave={() => setHovered(false)} // Revert on hover out
      >
        <div
          style={{
            ...styles.overlay,
            backgroundColor: hovered ? "rgba(0, 0, 0, 0.5)" : "rgba(64, 64, 64, 0.3)", // Darker grey transparent background
            backgroundImage: hovered ? `url(${imageUrl})` : "none", // Show image on hover, hide it initially
            backgroundPosition: hovered ? "center 20%" : "center", // Change position when hovered
          }}
        >
          <span style={styles.buttonText}>{text}</span>
        </div>
      </button>
    </Link>
  );
};

// Inline styles for a more user-friendly design with background image
const styles = {
  container: {
    position: "relative",
    height: "100vh",
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around", // Spread out the buttons
    alignItems: "center",
    width: "100%",
  },
  button: {
    position: "relative",
    padding: "60px 120px", // Increase button size
    fontSize: "1.5rem", // Increase the text size
    color: "#000", // Text color will be black
    backgroundColor: "transparent", // Make the button transparent
    border: "none", // Remove button border
    borderRadius: "10px",
    cursor: "pointer",
    transition: "transform 0.3s ease", // Add transition effect for hover
    margin: "10px",
    overflow: "hidden",
    minWidth: "300px", // Ensure buttons are large enough
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", // Optional: Adds a subtle shadow for better button visibility
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: "cover", // Ensure the image fills the button
    backgroundPosition: "center", // Start with the image centered
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-position 0.5s ease, background-color 0.3s ease", // Smooth transition for both background color and position
  },
  buttonText: {
    position: "relative",
    zIndex: 1,
    fontWeight: "bold",
    color: "#000", // Text color will be black
  },
};

export default Home;
