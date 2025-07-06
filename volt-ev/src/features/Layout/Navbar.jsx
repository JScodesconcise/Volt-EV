import React from "react";
import { NavLink } from "react-router";
import CartLogo from "../../Media/CartLogo.svg";
import "./navbar.css";

function Navbar() {
	return (
		<nav className="navbar-container">
			<div></div>
			<div className="nav-items">
				<NavLink to="/" className="main-login">
					Login
				</NavLink>
				<NavLink to="/" className="main-signup">
					Sign Up
				</NavLink>
				<img src={CartLogo} className="" />
			</div>
		</nav>
	);
}
export default Navbar;
