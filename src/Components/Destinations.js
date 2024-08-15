import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Destinations.css'; // Ensure this CSS file is correctly linked

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('https://user-backend-02no.onrender.com/destinations');
        setDestinations(response.data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <div className="container mt-5">
      <div className="Dest"><h3>Trending Destinations These Days</h3></div>
      <div className="destination-grid">
        {destinations.map(destination => (
          <div key={destination._id} className="dest-card">
            <div className="dest-card-body">
              <h5 className="dest-card-title">{destination.name}</h5>
              <p className="dest-card-text">{destination.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
