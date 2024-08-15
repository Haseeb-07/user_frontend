import React from 'react';
import Card from 'react-bootstrap/Card';

const MyBookingCard = ({ booking }) => {
  return (
    <div className="my-booking-card col-12 col-sm-6 col-md-4 col-lg-3">
      <Card className="w-100">
        <Card.Body>
          <Card.Title>{booking.package_name}</Card.Title>
          <Card.Text>
            <strong>Booked by:</strong> {booking.booked_by.email}<br />
            <strong>Number of Persons:</strong> {booking.numberOfPersons}<br />
            <strong>Phone No:</strong> {booking.phoneNo}<br />
            <strong>Pickup Location:</strong> {booking.pickupLocation}<br />
            <strong>CNIC:</strong> {booking.cnic}<br />
            <strong>Destinations:</strong> {booking.destinations.join(', ')}<br />
            <strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}<br />
            <strong>Status:</strong> {booking.status}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyBookingCard;
