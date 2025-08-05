import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import garbageicon from "../../Media/garbageicon.svg";
import blackModelRPicture from "../../Media/EV black view.png";
import plusicon from "../../Media/plus.svg";
import minusicon from "../../Media/minus.svg";
import arrowleft from "../../Media/arrow-left.svg";
import zap from "../../Media/zap-cart.svg";
import "./Cart.css";
import { useShoppingCart } from "../../hooks/useShoppingCart.jsx";

function Cart() {
	const { setVisibility, cartItems, setCartItems } = useShoppingCart();
	const [total, setTotal] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		let count = 0;
		cartItems.forEach((item) => {
			// normalize price to a number
			const raw = item.price;
			const priceNum =
				typeof raw === "string" ? parseFloat(raw.replace(/[^0-9.]/g, "")) : raw;
			count += priceNum * (item.quantity || 1);
		});
		setTotal(count);
	}, [cartItems]);

	return (
		<div className="shopping-cart-container">
			<div className="cart-blur" onClick={() => setVisibility(false)}></div>
			<div className="cart-display">
				<h1 className="shopping-cart-title">Shopping Cart</h1>
				<div className="cart-item-price-container">
					<div className="cart-item-wrapper">
						{cartItems.map((car, i) => (
							<CartItem
								image={car.image}
								title={car.title}
								colour={car.colour}
								quantity={car.quantity}
								price={car.price}
								key={`cart-item ${i}`}
								i={`${i}`}
								id={car.id}
							/>
						))}
					</div>

					<div className="cart-total-buttons-container">
						<div className="cart-total-price">
							<h2>Total</h2>
							<h2 className="cart-total-price-dollar">{`$ ${total}`}</h2>
						</div>
						<div className="cart-buttons">
							<button
								className="continue-shopping-button"
								onClick={() => {
									setVisibility(false);
									navigate("/inventory");
								}}
							>
								<div className="button-image-title-container continue-shopping">
									<img src={arrowleft} />
									Continue Shopping
								</div>
							</button>
							<NavLink to="/checkout" className="checkout-button">
								<div className="button-image-title-container continue-shopping">
									<img src={zap} />
									Proceeed to Checkout
								</div>
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function CartItem({ image, title, colour, quantity, price, i, id }) {
	const { cartItems, setCartItems } = useShoppingCart();

	function handleGarbageClick() {
		setCartItems(cartItems.filter((item) => item.id !== id));
	}

	return (
		<div className={`cart-item ${i}`}>
			<div className="cart-vehicle-info">
				<img className="vehicle-picture-cart" src={image} />
				<div>
					<h1 className="vehicle-checkout-title">{title}</h1>
					<h3 className="vehicle-checkout-colour">Colour: {colour}</h3>
					<CarCounter quantity={quantity} id={id} />
				</div>
			</div>
			<div className="cart-vehicle-price-remove">
				<h3>{price}</h3>
				<img
					className="garbage-icon-cart"
					src={garbageicon}
					onClick={handleGarbageClick}
				/>
			</div>
		</div>
	);
}

function CarCounter({ quantity, id }) {
	const { cartItems, setCartItems } = useShoppingCart();

	function handleMinusClick() {
		if (quantity === 1) {
			setCartItems(cartItems.filter((item) => item.id !== id));
		} else {
			setCartItems(
				cartItems.map((item) =>
					item.id === id ? { ...item, quantity: quantity - 1 } : { ...item }
				)
			);
		}
	}
	function handlePlusClick() {
		setCartItems(
			cartItems.map((item) =>
				item.id === id ? { ...item, quantity: quantity + 1 } : { ...item }
			)
		);
	}

	return (
		<div className="car-counter-container">
			<button className="car-counter-button-plus" onClick={handlePlusClick}>
				<img src={plusicon} />
			</button>
			<h1 className="car-counter-quantity">{quantity}</h1>
			<button className="car-counter-button-minus" onClick={handleMinusClick}>
				<img src={minusicon} />
			</button>
		</div>
	);
}

export default Cart;
