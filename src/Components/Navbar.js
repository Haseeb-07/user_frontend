import React, { useState } from 'react';
import logo from '../Images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import './Navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');

    const handleLogout = () => {
        // Remove email from local storage
        localStorage.removeItem('loggedInUserEmail');
        // Navigate to landing page
        navigate('/landing');
    };

    return (
        <nav className="navbar">
            <div className="main-container">
                <Link to="/home" className="navbar-logo">
                    <img src={logo} alt="logo" className="logo-image" />
                    <span className="travel-text">Travel</span>
                    <span className="sage-text">Sage</span>
                </Link>
                <button className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>
                <div className={`navbar-links-items ${isOpen ? "open" : ""}`} id="navbarText">
                    <ul className="items">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link home" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/feedback" className="nav-link about">Feedback</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/topdestinations" className="nav-link destinations">Destinations</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/packages" className="nav-link packages">Packages</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/customizedpackage" className="btn btn-success btn-transparent-border">Create Package</Link>
                        </li>
                        {loggedInUserEmail && (
                            <li className="nav-item">
                                <div className="user-container">
                                    {/* Display the logged-in user's email */}
                                    <p>{loggedInUserEmail}</p>
                                    {/* Logout icon with size prop */}
                                    <CiLogout className="logout-icon" title="Logout" cursor="pointer" size={24} onClick={handleLogout} />
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
