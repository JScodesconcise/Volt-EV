import { useShoppingCart } from "../../contexts/ShoppingCartContext.jsx";
import { useState } from "react";
import garbageicon from "../../Media/garbageicon.svg";
import blackModelRPicture from "../../Media/EV black view.png";
import plusicon from "../../Media/plus.svg";
import minusicon from "../../Media/minus.svg";
import arrowleft from "../../Media/arrow-left.svg";
import zap from "../../Media/zap-cart.svg";
import "./Cart.css";

function Cart({ vehicles }) {
	const { setVisibility } = useShoppingCart();
	const [total, setTotal] = useState(0);

	return (
		<div className="shopping-cart-container">
			<div className="cart-blur" onClick={() => setVisibility(false)}></div>
			<div className="cart-display">
				<h1 className="shopping-cart-title">Shopping Cart</h1>
				<CartItem
					image={blackModelRPicture}
					title={`Model R`}
					color={`black`}
					quantity={1}
					price={`$59 955`}
				/>
				<div className="cart-total-price">
					<h2>Total</h2>
					<h2>$59 955</h2>
				</div>
				<div className="cart-buttons">
					<button>
						<img src={arrowleft} />
						Continue Shopping
					</button>
					<button>
						<img src={zap} />
						Proceeed to Checkout
					</button>
				</div>
			</div>
		</div>
	);
}

function CartItem({ image, title, color, quantity, price }) {
	return (
		<div className="cart-item">
			<div className="cart-vehicle-info">
				<img className="vehicle-picture-cart" src={image} />
				<div>
					<h1>{title}</h1>
					<h3>color: {color}</h3>
					<CarCounter quantity={quantity} />
				</div>
			</div>
			<div className="cart-vehicle-price-remove">
				<h3>{price}</h3>
				<img className="garbage-icon-cart" src={garbageicon} />
			</div>
		</div>
	);
}

function CarCounter({ quantity }) {
	const [number, setNumber] = useState(quantity);

	return (
		<div className="car-counter-container">
			<button className="car-counter-button-plus">
				<img src={plusicon} />
			</button>
			<h1 className="car-counter-quantity">{quantity}</h1>
			<button className="car-counter-button-minus">
				<img src={minusicon} />
			</button>
		</div>
	);
}

export default Cart;
