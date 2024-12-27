import React, { useState } from "react";
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
