import rangeLogo from "../../Media/zap.svg";
import acelerationLogo from "../../Media/car-front.svg";
import drivetrainLogo from "../../Media/gauge.svg";
import cartLogo from "../../Media/cart-vehicle-card.svg";
import "./VehicleCard.css";

function VehicleCard({
	image,
	title,
	year,
	drivetrain,
	range,
	acceleration,
	price,
}) {
	return (
		<div className="vehicle-card">
			<img className="vehicle-card-display-image" src={image} />
			<div className="vehicle-card-info-container">
				<div className="vehicle-card-title-and-year-container">
					<h1 className="vehicle-card-title">{title}</h1>
					<h2 className="vehicle-card-year">{year}</h2>
				</div>
				<div className="vehicle-card-car-details">
					<img src={rangeLogo} />
					<h3>{range}</h3>
					<img src={acelerationLogo} />
					<h3>{acceleration}</h3>
					<img src={drivetrainLogo} />
					<h3>{drivetrain}</h3>
				</div>
				<div className="vehicle-card-button-and-price">
					<h2>{price}</h2>
					<button>
						<img src={cartLogo} />
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
}

export default VehicleCard;
