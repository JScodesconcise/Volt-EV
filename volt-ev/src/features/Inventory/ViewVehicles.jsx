import Navbar from "../Layout/Navbar.jsx";
import "./viewvehicles.css";
import ViewVehiclesSideBar from "./ViewVehiclesSideBar.jsx";
import VehicleCard from "./VehicleCard.jsx";
import BlackVehicleCardImage from "../../Media/EV black view.png";

function ViewVehicles() {
	return (
		<div className="inventory-container">
			<Navbar></Navbar>
			<h1>Inventory</h1>
			<div className="view-vehicles-sidebar-and-cards">
				<ViewVehiclesSideBar />
				<VehicleCard
					title={`Model R`}
					image={BlackVehicleCardImage}
					year={2023}
					range={`500km`}
					drivetrain={`AWD`}
					acceleration={`3.1s`}
					price={`$59 955`}
				/>
			</div>
		</div>
	);
}

export default ViewVehicles;
