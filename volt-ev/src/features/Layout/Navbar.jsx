import React from "react";
import { NavLink, useNavigate } from "react-router";
import CartLogo from "../../Media/CartLogo.svg";
import "./navbar.css";

function Navbar() {
	return (
		<nav className="navbar-container">
			<div className="nav-items">
				<NavLink to="/" className="main-login">
					Login
				</NavLink>
				<NavLink to="/" className="main-signup">
					Sign Up
				</NavLink>
				<NavLink to="/calculator" className="main-loan-calculator">
					Loan Calculator
				</NavLink>
				<img src={CartLogo} className="cart-image" />
			</div>
		</nav>
	);
}
export default Navbar;
