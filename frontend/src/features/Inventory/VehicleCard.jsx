import rangeLogo from "../../Media/zap.svg";
import acelerationLogo from "../../Media/car-front.svg";
import drivetrainLogo from "../../Media/gauge.svg";
import cartLogo from "../../Media/cart-vehicle-card.svg";
import "./vehiclecard.css";
import { useShoppingCart } from "../../hooks/useShoppingCart";

function VehicleCard({
	image,
	title,
	year,
	drivetrain,
	range,
	acceleration,
	efficiency,
	charging,
	horsepower,
	colour,
	price,
	id,
}) {
	const { cartItems, setCartItems, visibility } = useShoppingCart();

	function handleAddtoCart() {
		const newItem = {
			image: image,
			title: title,
			year: year,
			drivetrain: drivetrain,
			range: range,
			acceleration: acceleration,
			efficiency: efficiency,
			price: price,
			charging: charging,
			horsepower: horsepower,
			colour: colour,
			quantity: 1,
			id: id,
		};
		if (cartItems.length === 0) {
			setCartItems([...cartItems, newItem]);
		} else {
			let flag = false;
			cartItems.forEach((element) => {
				if (checkIfEqual(element, newItem, ["image", "quantity"])) {
					flag = true;
					setCartItems(
						cartItems.map((vehicle) =>
							vehicle === element
								? { ...vehicle, quantity: vehicle.quantity + 1 }
								: vehicle
						)
					);
				}
			});
			if (flag === false) {
				setCartItems([...cartItems, newItem]);
			}
		}
	}

	function filterVehicle(o1, exclude) {
		if (o1 === null || typeof o1 !== "object") return o1;

		return Object.fromEntries(
			Object.entries(o1)
				.filter(([k]) => !exclude.includes(k))
				.map(([k, v]) => [k, filterVehicle(v, exclude)])
				.sort(([a], [b]) => a.localeCompare(b))
		);
	}
	function checkIfEqual(o1, o2, exclude = []) {
		return (
			JSON.stringify(filterVehicle(o1, exclude)) ===
			JSON.stringify(filterVehicle(o2, exclude))
		);
	}

	return (
		<div className="vehicle-card">
			<img className="vehicle-card-display-image" src={image} />
			<div className="vehicle-card-info-container">
				<div className="vehicle-card-title-and-year-container">
					<h1 className="vehicle-card-title">{title}</h1>
					<div className="vehicle-card-year-container">
						<h2 className="vehicle-card-year">{year}</h2>
					</div>
				</div>
				<div className="vehicle-card-car-details">
					<div className="car-detail-wrapper range">
						<img src={rangeLogo} />
						<h3>{range}</h3>
					</div>
					<div className="car-detail-wrapper acceleration">
						<img src={acelerationLogo} />
						<h3>{acceleration}</h3>
					</div>
					<div className="car-detail-wrapper drivetrain">
						<img src={drivetrainLogo} />
						<h3>{drivetrain}</h3>
					</div>
				</div>
				<div className="vehicle-card-button-and-price">
					<h2 className="vehicle-card-car-price">{price}</h2>
					<button onClick={handleAddtoCart} className="vehicle-card-button">
						<img src={cartLogo} />
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
}

export default VehicleCard;
