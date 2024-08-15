import React from 'react';
import './BestServices.css'; 
import destination from '../Images/destination.png';
import hotel from '../Images/hotel.png';
import car from '../Images/car.png';
import travelbus from '../Images/travelbus.png'; 

function BestServices() {
  return (
    <div className="services-wrapper">
      <div className="services-container">
        <h2 className="how-we-work">HOW WE WORK</h2>
        <h1 className="services-offered">We Offer Best Services</h1>
        <div className="service-row">
          <div className="service-box">
            <div className="service-icon">
              <img src={destination} alt="Destination" className="destination-logo" />
            </div>
            <div className="service-details">
              <h3 className="service-heading">Choose Destination</h3>
              <p className="service-text">
              Choose your dream destination and let TravelSage make it a reality.
              </p>
            </div>
          </div>
          <div className="service-box">
            <div className="service-icon">
              <img src={hotel} alt="Hotel" className="hotel-logo" />
            </div>
            <div className="service-details">
              <h3 className="service-heading">Best Packages</h3>
              <p className="service-text">
               Explore our curated selection of the best travel packages, designed to create unforgettable experiences.
              </p>
            </div>
          </div>
          <div className="service-box">
            <div className="service-icon">
              <img src={car} alt="Car" className="car-logo" />
            </div>
            <div className="service-details">
              <h3 className="service-heading">Car Transport</h3>
              <p className="service-text">
                Explore in comfort with our premium car transportation options.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="image-container">
        <img src={travelbus} alt="Travel Bus" className="travel-bus-image" />
      </div>
    </div>
  );
}

export default BestServices;
