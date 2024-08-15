import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyBookingCard from './MyBookingCard'; // Adjust the path as necessary
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const MyBookingList = (e) => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchMyBookings = async () => {
      const email = localStorage.getItem('loggedInUserEmail');
      if (!email) {
        setError('Please log in to view your bookings.');
        return;
      }
      
      setIsLoggedIn(true);

      try {
        const response = await axios.get('https://user-backend-02no.onrender.com/api/mybookings', {
          params: { email }
        });
        // Filter out duplicate bookings based on booking ID
        const uniqueBookings = response.data.filter((booking, index, self) =>
          index === self.findIndex((b) => b._id === booking._id)
        );
        setBookings(uniqueBookings);
      } catch (error) {
        setError('Error fetching my bookings. Please try again later.');
        console.error('Error fetching my bookings:', error);
      }
    };

    fetchMyBookings();
  }, []);

  return (
    <div style={{ overflow: 'hidden'}}>
      <h1>My Bookings</h1>
      <Link to="/packages">
        <Button className="button button-secondary">All packages</Button>
      </Link>

      {error && <Alert variant="danger">{error}</Alert>}
      {!isLoggedIn && <p>Please log in to view your bookings.</p>}
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <MyBookingCard key={booking._id} booking={booking} />
        ))
      ) : (
        isLoggedIn && <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookingList;
