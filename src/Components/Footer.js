import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/logo.png';
import google from '../Images/google.png';
import x from '../Images/x.png';
import facebook from '../Images/facebook.png';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="logo" className="logo-image" />
            <span className="travel-text">Travel</span>
            <span className="sage-text">Sage</span>
          </Link>
          <p>Explore the world with TravelSage, your gateway to unforgettable travel experiences.</p>
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <img src={google} alt="Google" className="footer-icon" />
          </a>
          <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
            <img src={x} alt="X" className="footer-icon" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" className="footer-icon" />
          </a>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Website</h3>
          <ul className="footer-list">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/topdestinations">Destinations</Link></li>
            <li><Link to="/packages">Packages</Link></li>
            <li><Link to="/customizedpackage">Create Package</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Help</h3>
          <ul className="footer-list">
            <li><Link to="/help">Help/FAQ</Link></li>
            <li><Link to="/cancel">Cancel Booking</Link></li>
            <li><Link to="/press">Press</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">More</h3>
          <ul className="footer-list">
            <li><Link to="/tips">Travel Tips</Link></li>
            <li><Link to="/sitemap">Site Map</Link></li>
            <li><Link to="/partnerships">Partnerships</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Terms</h3>
          <ul className="footer-list">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms Of Use</Link></li>
            <li><Link to="/accessibility">Accessibility</Link></li>
          </ul>
        </div>
      </div>
      <hr className="footer-line" />
      <div className="copyright-bar">
        <p>&copy; TravelSage 2024. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
