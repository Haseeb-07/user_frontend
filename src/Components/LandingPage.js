import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import image from '../Images/t4.png';
// import PackageCard from './PackageCard'; // Import PackageCard component

const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cnic, setCnic] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://user-backend-02no.onrender.com/login', { email, password });
      console.log(response.data);
      setSuccessMessage('Login successful');
      setEmail('');
      setPassword('');
      setError('');

      // Save email to local storage upon successful login
      localStorage.setItem('loggedInUserEmail', email);
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');
      setPassword('');
      setSuccessMessage('');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://user-backend-02no.onrender.com/signup', {
        firstName,
        lastName,
        email,
        password,
        cnic,
        phoneNumber,
        streetAddress
      });
  
      console.log(response.data);
      setSuccessMessage('User signed up successfully');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setCnic('');
      setPhoneNumber('');
      setStreetAddress('');
      setError('');
    } catch (error) {
      console.error('Signup error:', error);
  
      if (error.response && error.response.status === 400) {
        if (error.response.data && error.response.data.message) {
          setError(error.response.data.message); // Use the specific message from the server if available
        } else {
          setError('Invalid data provided. Please check your details.'); // Generic message for bad request
        }
      } else {
        setError('Error signing up. Please try again later.'); // Generic error message for other errors
      }
  
      setSuccessMessage('');
    }
  };
  

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccessMessage('');
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setCnic('');
    setPhoneNumber('');
    setStreetAddress('');
  };

  return (
    <div className="row">
      <div className="left-section col-md-6">
        <div className="form-container">
          <div className="title-container">
            <img src={image} alt="TravelSage" className="title-image" />
            <h1 className="title">TravelSage</h1>
          </div>
          {isLogin ? (
            <LoginComponent handleLogin={handleLogin} setEmail={setEmail} setPassword={setPassword} email={email} password={password} error={error} successMessage={successMessage} toggleForm={toggleForm} />
          ) : (
            <SignupComponent
              handleSignup={handleSignup}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setEmail={setEmail}
              setPassword={setPassword}
              setCnic={setCnic}
              setPhoneNumber={setPhoneNumber}
              setStreetAddress={setStreetAddress}
              firstName={firstName}
              lastName={lastName}
              email={email}
              password={password}
              cnic={cnic}
              phoneNumber={phoneNumber}
              streetAddress={streetAddress}
              error={error}
              successMessage={successMessage}
              toggleForm={toggleForm}
            />
          )}
        </div>
      </div>
      <div className="right-section col-md-6">
        {/* <PackageCard loggedInEmail={email} />  */}
        
        <div className="text-center mb-5">
          {isLogin ? (
            <>
              <h2>Welcome Back!</h2>
              <p>Please Login with the given details to continue</p>
              <p>New at TravelSage? Sign Up </p>
              <button className="btn btn-primary" onClick={toggleForm}>Sign Up</button>
            </>
          ) : (
            <>
              <h2>Hello!</h2>
              <p>Please provide the required information to get registered.</p>
              <p>Already have an account? Sign In </p>
              <button className="btn btn-primary" onClick={toggleForm}>Sign In</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const LoginComponent = ({ handleLogin, setEmail, setPassword, email, password, error, successMessage, toggleForm }) => (
  <>
    <h2>Sign in to your account</h2>
    {successMessage && <div className="alert alert-success">{successMessage}</div>}
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  </>
);

const SignupComponent = ({ handleSignup, setFirstName, setLastName, setEmail, setPassword, setCnic, setPhoneNumber, setStreetAddress, firstName, lastName, email, password, cnic, phoneNumber, streetAddress, error, successMessage, toggleForm }) => (
  <>
    <h2>Create a new Account</h2>
    {successMessage && <div className="alert alert-success">{successMessage}</div>}
    <form onSubmit={handleSignup}>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="cnic" className="form-label">CNIC</label>
        <input type="text" className="form-control" id="cnic" value={cnic} onChange={(e) => setCnic(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
        <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="streetAddress" className="form-label">Street Address</label>
        <input type="text" className="form-control" id="streetAddress" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} required />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
    <p>Already have an account? <span onClick={toggleForm} style={{ cursor: 'pointer', color: 'blue' }}>Login</span></p>
  </>
);

export default LandingPage;
