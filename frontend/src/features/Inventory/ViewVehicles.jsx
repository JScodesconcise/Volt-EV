import Navbar from "../Layout/Navbar.jsx";
import "./viewvehicles.css";
import ViewVehiclesSideBar from "./ViewVehiclesSideBar.jsx";
import VehicleCard from "./VehicleCard.jsx";
import BlackVehicleCardImage from "../../Media/EV black view.png";
import Cart from "../Cart/Cart.jsx";
import { useEffect, useState } from "react";
import { useShoppingCart } from "../../hooks/useShoppingCart.jsx";
import axios from "axios";
import { useDebouncedCallback } from "../../hooks/useDebouncedCallback.jsx";

function ViewVehicles() {
	const { visibility, setVisibility } = useShoppingCart();
	const [vehicles, setVehicles] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8080/vehicle/getVehicles")
			.then((response) => {
				setVehicles(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="inventory-container">
			<Navbar></Navbar>
			<h1>Inventory</h1>
			<div className="view-vehicles-sidebar-and-cards">
				<ViewVehiclesSideBar vehicles={vehicles} setVehicles={setVehicles} />
				<div className="vehicle-card-wrapper">
					{vehicles.map((car, i) => (
						<VehicleCard
							title={`Model R`}
							image={`${car.imageUrl}`}
							year={`${car.year}`}
							colour={car.colour}
							range={`${car.range}km`}
							drivetrain={`${car.drivetrain}`}
							acceleration={`${car.acceleration}s`}
							price={`$ ${car.price}`}
							charging={car.charging}
							horsepower={car.horsepower}
							battery={car.battery}
							efficiency={car.efficiency}
							key={`car ${i}`}
							id={`car ${i}`}
						/>
					))}
				</div>
			</div>
			{visibility ? <Cart /> : <></>}
		</div>
	);
}

export default ViewVehicles;
