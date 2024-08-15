import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Testimonials.css'; // Import the CSS file

const Testimonials = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('https://user-backend-02no.onrender.com/feedback/feedbacks');
        setFeedbacks(response.data.feedbacks); // Update this line to access feedbacks property
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };
  
    fetchFeedbacks();
  }, [feedbacks]);

  return (
    <div className="testimonials-container">
      <h2 className="text-center mt-5">Testimonials</h2>
      <div className="feedbacks-row mt-4">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <div key={index} className="feedback-card"> {/* Each card takes 25% width on small screens, 50% on medium screens, and 33.33% on large screens */}
              <div className="card-body">
                <h5 className="card-title">{feedback.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{feedback.cityDistrict}</h6>
                <p className="card-text">{feedback.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col">
            <p>No feedback available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
