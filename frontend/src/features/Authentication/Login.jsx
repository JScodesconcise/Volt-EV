import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import "./Auth.css";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate(); // optional, if you want to redirect after login
	const { setUser } = useAuth();

	const handleLogin = async (e) => {
		e.preventDefault();

		const payload = {
			email,
			password,
		};

		try {
			const response = axios
				.post("http://localhost:8080/api/auth/login", payload)
				.then((res) => {
					toast.success("login accepted");
					setUser({ id: res.data.userId });
				})
				.catch((err) => toast.error("login failed"));
		} catch (error) {
			console.error("Error during login:", error.message || error);
			alert("An error occurred: " + (error.message || error));
		}
	};

	return (
		<>
			<Toaster />
			<div className="auth-container">
				<Link to="/" className="home-link">
					Home
				</Link>

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

					<button type="submit" className="primary-btn">
						Login
					</button>
				</form>
			</div>
		</>
	);
};

export default Login;
