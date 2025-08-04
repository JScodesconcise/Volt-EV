import "./Checkout.css";
import { useShoppingCart } from "../../hooks/useShoppingCart";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

function Checkout() {
	const { cartItems, setCartItems } = useShoppingCart();
	const [total, setTotal] = useState(0);
	const { user } = useAuth();

	useEffect(() => {
		let count = 0;
		for (let i = 0; i < cartItems.length; i++) {
			count += parseInt(cartItems[i].price.replace("$", "").replace(" ", ""));
		}
		setTotal(count);
	}, [cartItems]);

	function handleFormSubmit(e) {
		e.preventDefault();

		const form = e.target;
		const orderData = {
			fName: form.fName.value,
			lName: form.lName.value,
			address: form.address.value,
			apt: parseInt(form.apt.value) || 0,
			city: form.city.value,
			province: form.province.value,
			postalCode: form.postalCode.value,
			cardNumber: form.cardNumber.value,
			expiryDate: form.expiryDate.value,
			cvv: parseInt(form.cvv.value),
			userId: user.id,
			vehicleNames: cartItems.map((car) => car.title)
		};

		axios.post("http://localhost:8080/order/placeorder", orderData, {
			headers: { "Content-Type": "application/json" }
		})
			.then((res) => {
				toast.success("Payment succeeded");
				setCartItems([]); // Optionally clear cart
			})
			.catch((err) => {
				console.error("Checkout error:", err);
				toast.error("Payment failed");
			});
	}

	return (
		<>
			<Toaster />
			<form className="checkout-container" onSubmit={handleFormSubmit}>
				<div className="checkout-input-info-container">
					<div className="checkout-input-info-inner-container">
						<div className="checkout-input-info-first-last-name">
							<h2 className="checkout-input-header 1">Shipping Info</h2>
							<input type="text" placeholder="First Name" className="checkout-input first-name" name="fName" required />
							<input type="text" placeholder="Last Name" className="checkout-input last-name" name="lName" required />
						</div>
						<div className="checkout-input-info-address">
							<input type="text" placeholder="Street Address" className="checkout-input street-address" name="address" required />
							<input type="text" placeholder="Apt/Suite/Floor (Optional)" className="checkout-input apt-suite" name="apt" />
							<div>
								<input type="text" placeholder="City" className="checkout-input city" name="city" required />
								<input type="text" placeholder="Province" className="checkout-input province" name="province" required />
								<input type="text" placeholder="Postal Code" className="checkout-input postal-code" name="postalCode" required />
							</div>
						</div>
						<div className="checkout-input-payment">
							<h2 className="checkout-input-header 2">Payment Info</h2>
							<input type="text" placeholder="Card Number" className="checkout-input card-num" name="cardNumber" required />
							<input type="text" placeholder="Exp Date (MM/YYYY)" className="checkout-input exp-date" name="expiryDate" required />
							<input type="text" placeholder="CVV" className="checkout-input cvv" name="cvv" required />
						</div>
					</div>
				</div>
				<div className="checkout-summary-container">
					<div className="checkout-summary-inner-container">
						<div className="product-outer-wrapper-checkout">
							{cartItems.map((car, i) => (
								<div key={i} className="product-inner-wrapper-checkout">
									<img src={car.image} className="vehicle-image-checkout" alt="vehicle" />
									<div className="vehicle-titles-wrapper-checkout">
										<h2 className="vehicle-title-checkout">{car.title}</h2>
										<h3 className="vehicle-colour-checkout">Colour: {car.colour}</h3>
									</div>
								</div>
							))}
						</div>

						<div>
							<div className="subtotal-wrapper-checkout">
								<h3>Subtotal</h3>
								<h3>{`$${total.toFixed(2)}`}</h3>
							</div>
							<div className="taxes-wrapper-checkout">
								<h3>Taxes</h3>
								<h3>{`$${(total * 0.13).toFixed(2)}`}</h3>
							</div>
							<div className="total-wrapper-checkout">
								<h3>Total</h3>
								<h3>{`$${(total * 1.13).toFixed(2)}`}</h3>
							</div>
							<div className="pay-button-checkout-wrapper">
								<button type="submit" className="pay-button-checkout">Pay Now</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}

export default Checkout;
