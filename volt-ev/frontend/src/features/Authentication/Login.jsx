import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // optional, if you want to redirect after login

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.text(); // backend returns plain text message
      console.log('Server response:', result);

      if (result.toLowerCase().includes("success")) {
        alert("Login successful!");
        // Optional redirect:
        // navigate("/dashboard");
      } else {
        alert("Login failed: " + result);
      }

    } catch (error) {
      console.error("Error during login:", error.message || error);
      alert("An error occurred: " + (error.message || error));
    }
  };

  return (
    <div className="auth-container">
      <Link to="/" className="home-link">Home</Link>

      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login to Your Account</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="primary-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
