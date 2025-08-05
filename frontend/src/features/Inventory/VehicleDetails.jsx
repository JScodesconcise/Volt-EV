import { useLocation } from "react-router";
import "./vehicledetails.css";
import botImg from "../../Media/bot.png";
import batteryPng from "../../Media/battery-charging.png";
import shield from "../../Media/shield-check.png";
import Navbar from "../Layout/Navbar.jsx";
import { useShoppingCart } from "../../hooks/useShoppingCart.jsx";
import Cart from "../Cart/Cart.jsx";
import "../Cart/Cart.css";
import { useEffect } from "react";

function VehicleDetails() {
	const { state } = useLocation();
	const { visibility, cartItems, setCartItems } = useShoppingCart();

	const backgroundStyle = {
		backgroundImage: `url(${state.backgroundImageUrl})`,
		backgroundPosition: "right -120px bottom -50px",
		backgroundRepeat: "repeat",
	};
	function filterVehicle(o1, exclude = []) {
		if (!o1 || typeof o1 !== "object") return o1;
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

	function handleBuyNow(e) {
		e.stopPropagation();
		const newItem = {
			...state,
			image: state.imageUrl, // ← pull from imageUrl into image
			quantity: 1,
		};
		console.log(newItem);
		if (cartItems.length === 0) {
			setCartItems([newItem]);
		} else {
			let found = false;
			const updated = cartItems.map((item) => {
				if (checkIfEqual(item, newItem, ["quantity"])) {
					found = true;
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});
			if (found) {
				setCartItems(updated);
			} else {
				setCartItems([...cartItems, newItem]);
			}
		}
	}
	return (
		<div>
			<Navbar />
			{visibility ? <Cart /> : <></>}
			<div className="vehicle-details-first-page" style={backgroundStyle}>
				<div className="vehicle-details-wrapper">
					<div className="vehicle-details-inner-wrapper">
						<h1 className="vehicle-details-car-title">Model R</h1>
						<h2 className="vehicle-details-car-slogan">
							Redefining Electric Performance
						</h2>
						<h3 className="vehicle-details-car-price">${state.price}</h3>
						<div className="vehicle-details-first-page-specs">
							<div className="vehicle-details-first-page-spec-outer-wrapper 1">
								<div className="vehicle-details-first-page-spec-wrapper 1">
									<h3>{state.range} km</h3>
									<h4>MAX RANGE</h4>
								</div>
							</div>
							<div className="vehicle-details-first-page-spec-outer-wrapper 2">
								<div className="vehicle-details-first-page-spec-wrapper 2">
									<h3>{state.acceleration} s</h3>
									<h4>0-100 km/h</h4>
								</div>
							</div>
							<div className="vehicle-details-first-page-spec-outer-wrapper 3">
								<div className="vehicle-details-first-page-spec-wrapper 3">
									<h3>{state.horsepower} hp</h3>
									<h4>PEAK POWER</h4>
								</div>
							</div>
						</div>

						<button
							className="vehicle-details-buy-now-button"
							onClick={handleBuyNow}
						>
							Buy Now
						</button>
					</div>
				</div>
			</div>
			<div className="vehicle-details-second-page">
				<h2 className="vehicle-details-second-page-title">
					Revolutionary Technology
				</h2>
				<div className="vehicle-details-cards-container">
					<ViewDetailsCard
						imgSrc={botImg}
						header={"Long Lasting Battery"}
						paragraph={
							"Advanced high-density cells deliver over 400 miles of range on a single charge, with intelligent thermal management ensuring peak performance in any climate."
						}
					></ViewDetailsCard>
					<ViewDetailsCard
						imgSrc={batteryPng}
						header={"Autonomous Driving"}
						paragraph={
							"Our AI-powered system seamlessly navigates highways and city streets, adapting in real time to traffic and weather for a truly hands-free experience."
						}
					></ViewDetailsCard>
					<ViewDetailsCard
						imgSrc={shield}
						header={"Exceptional Safety"}
						paragraph={
							"A reinforced carbon-fiber and aluminum chassis plus an integrated suite of active safety features—automatic emergency braking, lane-keep assist, and adaptive cruise control—provides industry-leading protection for every passenger."
						}
					></ViewDetailsCard>
				</div>
			</div>
			<div className="vehicle-details-third-page">
				<div className="vehicle-details-third-page-inner">
					<h2>Technical Specifications</h2>
					<div>
						<div className="technical-specifications-header">
							<h3>Category</h3>
							<h3>Specification</h3>
						</div>
						<div className="technical-specifications battery">
							<h4>Battery</h4>
							<h4>
								<b className="technical-specifications-bolded 1">
									{state.battery}
								</b>{" "}
								kw/h
							</h4>
						</div>
						<div className="technical-specifications charging">
							<h4>Charging</h4>
							<h4>
								<b className="technical-specifications-bolded 2">
									{state.charging}
								</b>{" "}
								kW
							</h4>
						</div>
						<div className="technical-specifications performance">
							<h4>Performance</h4>
							<h4>
								<b className="technical-specifications-bolded 3">
									{state.horsepower}
								</b>{" "}
								hp
							</h4>
						</div>
						<div className="technical-specifications efficiency">
							<h4>Efficiency</h4>
							<h4>
								<b className="technical-specifications-bolded 4">
									{state.efficiency}
								</b>{" "}
								km/kWh
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function ViewDetailsCard({ imgSrc, header, paragraph }) {
	return (
		<div className="vehicle-details-card-wrapper">
			<div className="vehicle-details-card">
				<img src={imgSrc} />
				<h3>{header}</h3>
				<p>{paragraph}</p>
			</div>
		</div>
	);
}

export default VehicleDetails;
