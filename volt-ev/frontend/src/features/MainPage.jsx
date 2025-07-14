// src/features/MainPage.jsx
import React from "react";
import "./mainpage.css";
import "../App.css";
import { NavLink } from "react-router-dom";

function MainPage() {
	return (
		<div className="home-page">
			<nav className="home-nav">
				<div className="nav-components">
					<NavLink to="/login" className="home-login">Login</NavLink>
					<NavLink to="/register" className="home-signup">Sign Up</NavLink>
				</div>
			</nav>

			<div className="home-components">
				<h1 className="homepage-first-line-text">Experience The Future</h1>
				<h1 className="homepage-second-line-text">Of Driving</h1>
				<NavLink to="/inventory" className="shop-now-home">
					Shop Now
				</NavLink>
			</div>
		</div>
	);
}

export default MainPage;
