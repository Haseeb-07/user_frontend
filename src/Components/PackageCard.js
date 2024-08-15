import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Modal.css';

function PackageCard({ viewMode, setViewMode }) {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggedInEmail, setLoggedInEmail] = useState('');
  const [formData, setFormData] = useState({
    numberOfPersons: '',
    phoneNo: '',
    pickupLocation: '',
    cnic: '',
  });
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookingMessage, setBookingMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://user-backend-02no.onrender.com/packages');
        setPackages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching packages:', error);
        setLoading(false);
      }
    };

    fetchPackages();

    // Retrieve logged in email from local storage
    const email = localStorage.getItem('loggedInUserEmail');
    if (email) {
      setLoggedInEmail(email);
    }
  }, []);

  const handleBookNow = (index) => {
    if (!loggedInEmail) {
      setBookingStatus('error');
      setBookingMessage('Please log in first to book travel package.');
      setTimeout(() => {
        navigate('/landing');
      }, 3000); // Redirect to /landing after 3 seconds
      return;
    }

    setSelectedPackage(packages[index]);
    setShowModal(true);
    setBookingStatus(null); // Reset booking status when modal opens
    setBookingMessage(''); // Reset booking message when modal opens
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setValidationErrors((prevState) => ({
      ...prevState,
      [name]: '', // Clear validation error for the changed field
    }));
  };

  const resetFormData = () => {
    setFormData({
      numberOfPersons: '',
      phoneNo: '',
      pickupLocation: '',
      cnic: '',
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!Number.isInteger(Number(formData.numberOfPersons)) || Number(formData.numberOfPersons) < 1) {
      errors.numberOfPersons = 'Number of persons must be a positive integer';
    }
    if (!/^\d{11}$/.test(formData.phoneNo)) {
      errors.phoneNo = 'Phone number must be exactly 11 digits';
    }
    if (!formData.pickupLocation.trim()) {
      errors.pickupLocation = 'Pickup location is required';
    }
    if (!/^\d{14}$/.test(formData.cnic)) {
      errors.cnic = 'CNIC must be exactly 14 digits';
    }
    return errors;
  };

  const handleConfirmBooking = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const response = await axios.post('https://user-backend-02no.onrender.com/pending-bookings', {
        package_name: selectedPackage.name,
        destinations: selectedPackage.destinations, // Include destinations
        booked_by_email: loggedInEmail,
        numberOfPersons: formData.numberOfPersons,
        phoneNo: formData.phoneNo,
        pickupLocation: formData.pickupLocation,
        cnic: formData.cnic,
      });
      setBookingStatus('success');
      setBookingMessage('Your booking has been received, our team will contact you.');
      console.log('Booking confirmed:', response.data);
      setShowModal(false); // Close the modal on successful booking
      resetFormData(); // Clear the input fields
    } catch (error) {
      setBookingStatus('error');
      setBookingMessage('Error confirming booking. Please try again.');
      console.error('Error confirming booking:', error);
    }
  };

  const handleCancelModal = () => {
    setShowModal(false);
    resetFormData(); // Clear the input fields on cancel
  };

  if (loading) {
    return <p>Loading packages...</p>;
  }

  return (
    <div>
      {/* Display booking message at the top */}
      {bookingStatus === 'success' && <Alert variant="success" className="mt-3">{bookingMessage}</Alert>}
      {bookingStatus === 'error' && <Alert variant="danger" className="mt-3">{bookingMessage}</Alert>}

      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        {viewMode === 'available' ? renderAvailablePackages(packages, handleBookNow) : null}
        {showModal && renderBookingModal(selectedPackage, handleConfirmBooking, handleCancelModal, formData, handleChange, validationErrors)}
      </div>
    </div>
  );
}

function renderAvailablePackages(packages, handleBookNow) {
  return packages.map((packageData, index) => (
    <div key={index} style={{ textAlign: 'center', width: '18rem' }}>
      <Card>
        <Card.Body>
          <Card.Title>{packageData.name}</Card.Title>
          <Card.Text>
            <strong>Destinations:</strong> {packageData.destinations.join(', ')}<br />
            <strong>Start Date:</strong> {new Date(packageData.startDate).toLocaleDateString()}<br />
            <strong>End Date:</strong> {new Date(packageData.endDate).toLocaleDateString()}<br />
            <strong>Price per person:</strong> {packageData.price}
          </Card.Text>
          <Button className="button button-primary" onClick={() => handleBookNow(index)}>
            Book Now
          </Button>
        </Card.Body>
      </Card>
    </div>
  ));
}

function renderBookingModal(selectedPackage, handleConfirmBooking, handleCancelModal, formData, handleChange, validationErrors) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Booking</h2>
        <p>Are you sure you want to book the package: {selectedPackage.name}?</p>
        <Form>
          <Form.Group controlId="numberOfPersons">
            <Form.Label>Number of Persons</Form.Label>
            <Form.Control
              type="number"
              name="numberOfPersons"
              value={formData.numberOfPersons}
              onChange={handleChange}
              min="1"
              isInvalid={!!validationErrors.numberOfPersons}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.numberOfPersons}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="phoneNo">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              isInvalid={!!validationErrors.phoneNo}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.phoneNo}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="pickupLocation">
            <Form.Label>Pickup Location</Form.Label>
            <Form.Control
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              isInvalid={!!validationErrors.pickupLocation}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.pickupLocation}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="cnic">
            <Form.Label>CNIC</Form.Label>
            <Form.Control
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              isInvalid={!!validationErrors.cnic}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.cnic}</Form.Control.Feedback>
          </Form.Group>
        </Form>
        <Button className="modal-button modal-confirm-button" onClick={handleConfirmBooking}>
          Confirm
        </Button>
        <Button className="modal-button modal-cancel-button" onClick={handleCancelModal}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default PackageCard;
