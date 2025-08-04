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
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

function ViewVehicles() {
	const { visibility, setVisibility } = useShoppingCart();
	const [vehicles, setVehicles] = useState([]);
	const [compareChecked, setCompareChecked] = useState(false);
	const [compareList, setCompareList] = useState([]);
	const navigate = useNavigate();

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

	function handleCompare(id) {
		if (compareList.includes(id)) {
			setCompareList(compareList.filter((item) => item !== id));
		} else {
			if (compareList.length === 1) {
				console.log("now here");
				const VehicleArr = [];
				const vehicle1 = vehicles.find(v => v.id === id);
				const vehicle2 = vehicles.find(v => v.id === compareList[0]);
				
				if (vehicle1 && vehicle2) {
					VehicleArr.push(vehicle1);
					VehicleArr.push(vehicle2);
					setCompareList([]);
					navigate("/compare", { state: { VehicleArr } });
				} else {
					console.error("Could not find vehicles with IDs:", id, compareList[0]);
				}
			} else {
				setCompareList([id]);
			}
		}
	}

	return (
		<>
			<Toaster />
			<div className="inventory-container">
				<Navbar></Navbar>
				<h1>Inventory</h1>
				<div className="view-vehicles-sidebar-and-cards">
					<ViewVehiclesSideBar
						vehicles={vehicles}
						setVehicles={setVehicles}
						compareChecked={compareChecked}
						setCompareChecked={setCompareChecked}
					/>
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
								key={car.id}
								id={car.id}
								handleCompare={handleCompare}
								compareChecked={compareChecked}
								i={`${i}`}
							/>
						))}
					</div>
				</div>
				{visibility ? <Cart /> : <></>}
			</div>
		</>
	);
}

export default ViewVehicles;
