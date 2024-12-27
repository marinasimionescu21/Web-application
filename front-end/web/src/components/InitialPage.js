import React, { useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import "../userfriendly_page/InitialPage.css"; // Assuming you add a CSS file for styles

function InitialPage() {
    return (
        <div className="initial-page">
            <header className="initial-page-header">
                <h1>Welcome to Our Application!</h1>
                <p>We're excited to have you here. Explore and enjoy!</p>
            </header>
            <main className="button-container">
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/register">
                    <button>Register</button>
                </Link>
            </main>
        </div>
    );
}

export default InitialPage;
=======

function InitialPage() {
    return (<h2>START PAGE</h2>);
}

export default InitialPage;
>>>>>>> 7d22ca3cfb891676cf031ad47243c336d8db5674
