import React, { useState } from "react";
import axios from "axios";
import "./feedback.css";

export default function FeedbackForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = { name, email, message };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/feedback`, feedback, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies in the request if needed
      });

      if (response.status === 201) {
        alert('Feedback submitted successfully!');
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert('Failed to submit feedback.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting your feedback.');
    }
  };

  return (
    <div className="feedback_div" style={{background: props.maincol}}>
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>Submit Your Feedback</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button className="buttonss" type="submit">Submit</button>
    </form>
    <div className="purplebox" style={{background: props.maincol}}></div>
    </div>
  );
}
