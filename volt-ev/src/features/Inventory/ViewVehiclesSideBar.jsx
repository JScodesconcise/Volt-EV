import "./viewvehiclessidebar.css";
import { useState } from "react";
import { useRef } from "react";
import priceTag from "../../Media/Vector.svg";
import paint from "../../Media/palette.svg";
import calendar from "../../Media/Group 1.svg";

function ViewVehiclesSideBar() {
	const sideBarRef = useRef(null);

	const car_colours = [
		"#f8fafc",
		"#0e1a1f",
		"#2e5f8a",
		"#c8aa97",
		"#ff9e64",
		"#e0e5e9",
		"#2a9d8f",
		"#007aff",
	];

	return (
		<div ref={sideBarRef} className="view-vehicles-side-bar">
			<div className="filter-vehicle price">
				<div className="title-and-image-filter-container 1">
					<img src={priceTag}></img>
					<h3 className="filter-vehicle-title 1">Price</h3>
				</div>
				<div>
					<Slider sideBarRef={sideBarRef} />
				</div>
			</div>
			<div className="filter-vehicle year">
				<div className="title-and-image-filter-container 2">
					<img src={calendar} />
					<h3 className="filter-vehicle-title 2">Year</h3>
				</div>
				<div>
					<Slider sideBarRef={sideBarRef} />
				</div>
			</div>
			<div className="filter-vehicle colour">
				<div className="title-and-image-filter-container 3">
					<img src={paint} />
					<h3 className="filter-vehicle-title 3">Colour</h3>
					<div className="color-filter-choices-container">
						{car_colours.map((colour, i) => (
							<div
								className="colour-filter-choice"
								style={{ backgroundColor: `${colour}` }}
							></div>
						))}
					</div>
				</div>
			</div>

			<div className="sort-by">
				<h3 className="sort-by-title">Sort By:</h3>
				<div className="sorting-checkbox-container">
					<div className="sorting-checkbox 1">
						<input
							id="priceId"
							className="sort-by Price"
							type="checkbox"
						></input>
						<label htmlFor="priceId">Price</label>
					</div>
					<div className="sorting-checkbox 2">
						<input id="yearId" className="sort-by Year" type="checkbox"></input>
						<label htmlFor="yearId">Year</label>
					</div>
					<div className="sorting-checkbox 3">
						<input
							id="yearId"
							className="sort-by Rating"
							type="checkbox"
						></input>
						<label htmlFor="ratingId">Rating</label>
					</div>
					<div className="sorting-checkbox 4">
						<input
							id="dealId"
							className="sort-by Deals"
							type="checkbox"
						></input>
						<label htmlFor="dealId">Deals</label>
					</div>
				</div>
			</div>
		</div>
	);
}

function Slider({ sideBarRef }) {
	const draggable = useRef(false);
	const startX = useRef(0);
	const startPx = useRef(0);
	const [px, setPx] = useState(0);
	const trackRef = useRef(null);

	const clamp = (v, lo, hi) => Math.max(lo, Math.min(v, hi));

	function onMouseDown(e) {
		draggable.current = true;
		startX.current = e.clientX;
		startPx.current = px;

		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onUp);
	}

	function onMouseMove(e) {
		if (!draggable.current) return;

		const cs = window.getComputedStyle(sideBarRef.current);

		let dx = e.clientX - startX.current;
		let next = clamp(
			startPx.current + dx,
			0,
			trackRef.current.getBoundingClientRect().right - parseInt(cs.marginLeft)
		);

		setPx(next);
	}

	function onUp(e) {
		draggable.current = false;

		document.removeEventListener("mousemove", onMouseMove);
		document.removeEventListener("mouseup", onUp);
	}

	return (
		<div className="slider-container">
			<div
				onMouseDown={onMouseDown}
				className="slider-ball"
				style={{ transform: `translate(${px}px, -50%)` }}
			></div>
			<div ref={trackRef} className="slider-track"></div>
		</div>
	);
}

export default ViewVehiclesSideBar;
