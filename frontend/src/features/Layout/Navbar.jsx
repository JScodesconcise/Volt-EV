import React from "react";
import { NavLink, useNavigate } from "react-router";
import CartLogo from "../../Media/CartLogo.svg";
import "./navbar.css";
import { useShoppingCart } from "../../hooks/useShoppingCart.jsx";

function Navbar() {
	const { visibility, setVisibility } = useShoppingCart();

	return (
		<nav className="navbar-container">
			<div className="nav-items">
				<NavLink to="/login" className="main-login">
					Login
				</NavLink>
				<NavLink to="/register" className="main-signup">
					Sign Up
				</NavLink>
				<NavLink to="/calculator" className="main-loan-calculator">
					Loan Calculator
				</NavLink>
				<img
					src={CartLogo}
					className="cart-image"
					onClick={() => setVisibility(true)}
				/>
			</div>
		</nav>
	);
}
export default Navbar;
