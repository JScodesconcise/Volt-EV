import "./Checkout.css";
import { useShoppingCart } from "../../hooks/useShoppingCart";

function Checkout() {
	const { cartItems, setCartItems } = useShoppingCart();
	return (
		<div className="checkout-container">
			<div className="checkout-input-info-container">
				<div className="checkout-input-info-inner-container">
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
			</div>
			<div className="checkout-summary-container">
				<div className="checkout-summary-inner-container">
					<div className="product-outer-wrapper-checkout">
						{cartItems.map((car) => (
							<div className="product-inner-wrapper-checkout">
								<img src={car.image} className="vehicle-image-checkout" />
								<div className="vehicle-titles-wrapper-checkout">
									<h2 className="vehicle-title-checkout">{car.title}</h2>
									<h3 className="vehicle-colour-checkout">
										Colour: {car.colour}
									</h3>
								</div>
							</div>
						))}
					</div>

					<div>
						<div className="subtotal-wrapper-checkout">
							<h3>Subtotal</h3>
							<h3>$59,995</h3>
						</div>
						<div className="taxes-wrapper-checkout">
							<h3>Taxes</h3>
							<h3>$1013.92</h3>
						</div>
						<div className="total-wrapper-checkout">
							<h3>Total</h3>
							<h3>$61,008.92</h3>
						</div>
						<div className="pay-button-checkout-wrapper">
							<button className="pay-button-checkout">Pay Now</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
