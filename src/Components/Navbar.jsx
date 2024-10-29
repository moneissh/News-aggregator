// Components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Add your custom styles here

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">News Today</h1>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/news">News</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
