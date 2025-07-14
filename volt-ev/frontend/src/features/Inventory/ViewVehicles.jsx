import Navbar from "../Layout/Navbar.jsx";
import "./viewvehicles.css";
import ViewVehiclesSideBar from "./ViewVehiclesSideBar.jsx";
import VehicleCard from "./VehicleCard.jsx";
import BlackVehicleCardImage from "../../Media/EV black view.png";
import Cart from "../Cart/Cart.jsx";
import { useShoppingCart } from "../../contexts/ShoppingCartContext.jsx";

function ViewVehicles() {
	const { visibility, setVisibility } = useShoppingCart();

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
			{visibility ? <Cart /> : <></>}
		</div>
	);
}

export default ViewVehicles;
