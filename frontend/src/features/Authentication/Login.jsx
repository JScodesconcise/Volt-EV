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
	const navigate = useNavigate();
	const { setUser } = useAuth();

	const handleLogin = async (e) => {
		e.preventDefault();

		const payload = {
			email,
			password,
		};

		try {
			const response = await axios.post("http://localhost:8080/api/auth/login", payload);

			const userRole = response.data.role;
			const userId = response.data.userId;
			const userName = response.data.name || "";
			const userEmail = response.data.email || email;

			toast.success("login accepted");

			setUser({ id: userId, role: userRole, name: userName, email: userEmail });

			if (userRole === "admin") {
				navigate("/admin");
			} else {
				navigate("/inventory");
			}
		} catch (error) {
			console.error("Error during login:", error.message || error);
			toast.error("login failed");
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
