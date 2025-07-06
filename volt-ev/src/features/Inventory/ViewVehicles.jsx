import Navbar from "../Layout/Navbar.jsx";
import "./viewvehicles.css";
import ViewVehiclesSideBar from "./ViewVehiclesSideBar.jsx";

function ViewVehicles() {
	return (
		<div className="inventory-container">
			<Navbar></Navbar>
			<h1>Inventory</h1>
			<ViewVehiclesSideBar></ViewVehiclesSideBar>
		</div>
	);
}

export default ViewVehicles;
