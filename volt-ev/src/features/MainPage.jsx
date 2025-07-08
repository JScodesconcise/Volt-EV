import React from "react";
import "./mainpage.css";
import "../App.css";
import { NavLink } from "react-router";

function MainPage() {
	return (
		<div className="home-page">
			<nav className="home-nav">
				<div className="nav-components">
					<NavLink to="/" className="home-login">
						Login
					</NavLink>
					<NavLink to="/" className="home-signup">
						Sign Up
					</NavLink>
					<NavLink to="/loan-calculator" className="home-loan-calculator">
						Loan Calculator
					</NavLink>
				</div>
			</nav>

			<div className="home-components">
				<h1 className="homepage-first-line-text">Experience The future</h1>
				<h1 className="homepage-second-line-text">Of Driving</h1>
				<NavLink to="/Inventory" className="shop-now-home">
					Shop Now
				</NavLink>
			</div>
		</div>
	);
}

export default MainPage;
