import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import PackageCard from '../Components/PackageCard';
import '../Components/Packages.css';
import {   useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Packages() {
  const [viewMode, setViewMode] = useState('available'); // This state controls the view mode
  const [loggedInEmail, setLoggedInEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve logged in email from local storage
    const email = localStorage.getItem('loggedInUserEmail');
    if (email) {
      setLoggedInEmail(email);
    }
  }, []);

  const handleMyBookingsClick = () => {
    if (!loggedInEmail) {
      setAlertMessage('Please log in first to see your bookings.');
      setTimeout(() => {
        navigate('/landing');
      }, 3000); // Redirect to /landing after 3 seconds
      return;
    }
    navigate('/mybookings');
  };

  return (
    <>
      <Navbar />
      <div className="book">
        <h1>{viewMode === 'available' && 'Book Your Package!'}</h1>
      </div>
      {alertMessage && <Alert variant="danger" className="mt-3">{alertMessage}</Alert>}
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button className="button button-secondary" onClick={handleMyBookingsClick}>
          My Bookings
        </Button>
      </div>
      <PackageCard viewMode={viewMode} setViewMode={setViewMode} />
      <Footer />
    </>
  );
}

export default Packages;
