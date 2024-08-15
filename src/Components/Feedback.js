import React, { useState } from 'react';
import './Feedback.css';
import { useNavigate } from 'react-router-dom';

function Feedback() {
    const [formData, setFormData] = useState({
        name: '',
        cityDistrict: '',
        message: ''
    });
    const [submitMessage, setSubmitMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');

        if (!loggedInUserEmail) {
            setSubmitMessage('Please log in first to submit feedback.');
            setTimeout(() => {
                navigate('/landing');
            }, 5000); // Redirect to /landing after 3 seconds
            return;
        }

        // Validate form inputs
        if (!formData.name.trim() || !formData.cityDistrict.trim() || !formData.message.trim()) {
            setSubmitMessage('All fields are required.');
            return;
        }

        try {
            const response = await fetch('https://user-backend-02no.onrender.com/feedback/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Feedback submission failed');
            }

            setSubmitMessage('Feedback Submitted!');
            setFormData({ name: '', cityDistrict: '', message: '' }); // Reset form
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setSubmitMessage('Error submitting feedback. Please try again later.');
        }
    };

    return (
        <>
            <div className="feedback-container">
                <form onSubmit={handleSubmit} className="feedback-form">
                    <h2 className="form-title">Feedback Form</h2>
                    <div className="input-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="cityDistrict">City District:</label>
                        <input
                            type="text"
                            id="cityDistrict"
                            name="cityDistrict"
                            value={formData.cityDistrict}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button">Submit Feedback</button>
                    {submitMessage && <p className="submit-message">{submitMessage}</p>}
                </form>
            </div>
        </>
    );
}

export default Feedback;
