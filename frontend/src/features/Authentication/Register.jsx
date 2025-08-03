import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { useAuth } from "../../hooks/useAuth";


const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
	e.preventDefault();

	if (formData.password !== formData.confirmPassword) {
		toast.error("Passwords do not match");
		return;
	}

	const payload = {
		name: formData.name,
		email: formData.email,
		password: formData.password,
		role: formData.role,
	};

	try {
		const response = await fetch('http://localhost:8080/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json(); // Expect JSON, not plain text

		toast.success("registration successful");
		setUser({ id: result.userId, role: result.role });

		// Redirect based on role
		if (result.role === "admin") {
			navigate("/admin");
		} else {
			navigate("/inventory");
		}
	} catch (error) {
		console.error("Error during registration:", error.message || error);
		toast.error("registration failed");
	}
};



 return (
  <>
    <Toaster /> {/* Add this line for toast notifications */}
    <div className="auth-container">
      <Link to="/" className="home-link">Home</Link>

      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Create an Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="primary-btn">Register</button>
      </form>
    </div>
  </>
);
};

export default Register;
