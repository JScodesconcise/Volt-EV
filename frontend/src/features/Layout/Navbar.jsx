import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CartLogo from "../../Media/CartLogo.svg";
import "./navbar.css";
import { useShoppingCart } from "../../hooks/useShoppingCart.jsx";
import { AuthContext } from "../../contexts/AuthContext"; // adjust path if needed
import { toast } from "react-hot-toast";

function Navbar() {
	const { visibility, setVisibility } = useShoppingCart();
	const { user, setUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		setUser(null);
		toast.success("Logged out");
		navigate("/");
	};

	return (
		<nav className="navbar-container">
			<div className="nav-items">
				{/* Always visible */}
				<NavLink to="/calculator" className="main-loan-calculator">
					Loan Calculator
				</NavLink>

				{/* Conditionally show login/signup or logout */}
				{user && user.id ? (
					<>
						<NavLink to="#" className="main-loan-calculator" style={{ pointerEvents: "none" }}>
  Welcome, {user.name || user.email}
</NavLink>
<NavLink to="#" className="main-loan-calculator" onClick={handleLogout}>
  Logout
</NavLink>

					</>
				) : (
					<>
						<NavLink to="/login" className="main-login">
							Login
						</NavLink>
						<NavLink to="/register" className="main-signup">
							Sign Up
						</NavLink>
					</>
				)}

				{/* Always visible cart icon */}
				<img
					src={CartLogo}
					className="cart-image"
					onClick={() => setVisibility(true)}
					alt="cart"
				/>
			</div>
		</nav>
	);
}

export default Navbar;
