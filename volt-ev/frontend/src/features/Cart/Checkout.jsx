import "./Checkout.css";

function Checkout() {
	return (
		<div className="checkout-container">
			<div className="checkout-input-info-container">
				<div className="checkout-input-info-first-last-name">
					<h2 className="checkout-input-header 1">Shipping Info</h2>
					<input
						type="text"
						placeholder="First Name"
						className="checkout-input first-name"
					></input>
					<input
						type="text"
						placeholder="Last Name"
						className="checkout-input last-name"
					></input>
				</div>
				<div className="checkout-input-info-address">
					<input
						type="text"
						placeholder="Street Address"
						className="checkout-input street-address"
					></input>
					<input
						type="text"
						placeholder="Apt/Suite/Floor (Optional)"
						className="checkout-input apt-suite"
					></input>
					<div>
						<input
							type="text"
							placeholder="City"
							className="checkout-input city"
						></input>
						<input
							type="text"
							placeholder="Province"
							className="checkout-input province"
						></input>
						<input
							type="text"
							placeholder="Postal Code"
							className="checkout-input postal-code"
						></input>
					</div>
				</div>
				<div className="checkout-input-payment">
					<h2 className="checkout-input-header 2">Payment Info</h2>
					<input
						type="text"
						placeholder="Card Number"
						className="checkout-input card-num"
					></input>
					<input
						type="text"
						placeholder="Exp Date (MM/YYYY)"
						className="checkout-input exp-date"
					></input>
					<input
						type="text"
						placeholder="CVV"
						className="checkout-input cvv"
					></input>
				</div>
			</div>
			<div className="checkout-summary-container">
				<div>
					<div>
						<h3>Subtotal</h3>
						<h3>$59,995</h3>
					</div>
				</div>
				<div>
					<div>
						<h3>Taxes</h3>
						<h3>$1013.92</h3>
					</div>
				</div>
				<div>
					<div>
						<h3>Total</h3>
						<h3>$61,008.92</h3>
					</div>
				</div>
				<button>Pay Now</button>
			</div>
		</div>
	);
}

export default Checkout;
