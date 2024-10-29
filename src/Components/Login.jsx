import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure this imports your CSS

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      if (response.data.token) { // Adjust this condition based on your API response
        localStorage.setItem('token', response.data.token); // Store token if necessary
        setIsLoggedIn(true); // Update the logged-in state
        navigate('/home'); // Redirect to home page
      } else {
        setMessage('Login failed: No token returned.'); 
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="form-side">
        <div className="login-box">
          {/* Centered Logo */}
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE7NOCw5TXI8NQAQ6cswIYCuRVE9TtjAbggQ&s" alt="Logo" className="login-logo" />
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          {message && <p className="message">{message}</p>}
          <p>
            Don’t have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
