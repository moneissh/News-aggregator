import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file for styles

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        email,
        password,
      });
      setMessage(response.data.message); // Show success message
      navigate('/login'); // Optionally redirect to login after signup
    } catch (error) {
      if (error.response) {
        // Show error message from the server
        setMessage(error.response.data.message);
      } else {
        // Show generic error message
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="image-side">
        {/* Background image */}
        <img src="https://play-lh.googleusercontent.com/XKVQpIEEGbjxsX5CFatbRv5b0FMMYJ9bYkhjFa0_XFaOG5iAu4Qz9aWFyK5yOe7R0n0=w240-h480-rw" alt="Background" className="background-image" />
      </div>
      <div className="form-side">
        <div className="signup-box">
          <h2>Signup</h2>
          <form onSubmit={handleSignup} className="signup-form">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="submit-button">Signup</button>
          </form>
          {message && <p className="message">{message}</p>} {/* Display message */}

          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
