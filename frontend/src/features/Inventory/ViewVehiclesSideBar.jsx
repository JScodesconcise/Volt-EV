import "./viewvehiclessidebar.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import priceTag from "../../Media/Vector.svg";
import paint from "../../Media/palette.svg";
import calendar from "../../Media/Group 1.svg";
import axios from "axios";
import { Slider } from "@mui/material";
import { useDebouncedCallback } from "../../hooks/useDebouncedCallback.jsx";

function ViewVehiclesSideBar({ vehicles, setVehicles }) {
	const sideBarRef = useRef(null);

	const [priceChecked, setPriceChecked] = useState(false);
	const [yearChecked, setYearChecked] = useState(false);
	const [ratingChecked, setRatingChecked] = useState(false);
	const [dealsChecked, setDealsChecked] = useState(false);

	const [priceSliderValue, setPriceSliderValue] = useState([50, 100000]);
	const [yearSliderValue, setYearSliderValue] = useState([2000, 2025]);

	const [activeColours, setActiveColours] = useState([]);
	const [sortByAxios, setSortByAxios] = useState("");

	const car_colours = [
		{ hex: "#f8fafc", colour: "white" },
		{ hex: "#0e1a1f", colour: "black" },
		{ hex: "#2e5f8a", colour: "navy" },
		{ hex: "#c8aa97", colour: "brown" },
		{ hex: "#ff9e64", colour: "orange" },
		{ hex: "#e0e5e9", colour: "gray" },
		{ hex: "#2a9d8f", colour: "green" },
		{ hex: "#007aff", colour: "blue" },
	];

	const minDistanceYear = 10;
	const minDistancePrice = 10000;

	const debouncedQueryYear = useDebouncedCallback((filters) => {
		axios
			.get(
				`http://localhost:8080/vehicle/getVehicles?page=0&sortBy=${filters.sortBy}&colours=${filters.resultString}&startYear=${filters.firstVal}&endYear=${filters.secondVal}&startPrice=${priceSliderValue[0]}&endPrice=${priceSliderValue[1]}`
			)
			.then((response) => {
				setVehicles(response.data);
			})
			.catch((err) => console.log(err));
	}, 300);

	const debouncedQueryPrice = useDebouncedCallback((filters) => {
		axios
			.get(
				`http://localhost:8080/vehicle/getVehicles?page=0&sortBy=${filters.sortBy}&colours=${filters.resultString}&startYear=${yearSliderValue[0]}&endYear=${yearSliderValue[1]}&startPrice=${filters.firstVal}&endPrice=${filters.secondVal}`
			)
			.then((response) => {
				setVehicles(response.data);
			})
			.catch((err) => console.log(err));
	}, 300);

	function valuetext(value) {
		return `${value}°C`;
	}

	function sendSliderRequest(type, firstVal, secondVal) {
		const resultString =
			activeColours.length === 0
				? ""
				: "&colours=".concat(activeColours.join("&colours="));
		if (type === "year") {
			const filters = {
				sortBy: sortByAxios,
				resultString: resultString,
				firstVal: firstVal,
				secondVal: secondVal,
			};
			debouncedQueryYear(filters);
		} else {
			const filters = {
				sortBy: sortByAxios,
				resultString: resultString,
				firstVal: firstVal,
				secondVal: secondVal,
			};
			debouncedQueryPrice(filters);
		}
	}

	function handleSortRequest(sortBy) {
		const resultString =
			activeColours.length === 0
				? ""
				: "&colours=".concat(activeColours.join("&colours="));
		axios
			.get(
				`http://localhost:8080/vehicle/getVehicles?page=0&sortBy=${sortBy}&colours=${resultString}&startPrice=${priceSliderValue[0]}&endPrice=${priceSliderValue[1]}&startYear=${yearSliderValue[0]}&endYear=${yearSliderValue[1]}`
			)
			.then((response) => {
				setVehicles(response.data);
			})
			.catch((err) => console.log(err));
	}

	function handleColourClick(e) {
		let resultString;
		if (activeColours.includes(e.target.id)) {
			setActiveColours(
				activeColours.filter((colour) => colour !== e.target.id)
			);
			resultString = "";
		} else {
			resultString = activeColours
				.join("&colours=")
				.concat("&colours=" + e.target.id);
			setActiveColours([...activeColours, e.target.id]);
		}
		axios
			.get(
				`http://localhost:8080/vehicle/getVehicles?page=0&colours=${resultString}&sortBy=${sortByAxios}&startPrice=${priceSliderValue[0]}&endPrice=${priceSliderValue[1]}&startYear=${yearSliderValue[0]}&endYear=${yearSliderValue[1]}`
			)
			.then((response) => {
				setVehicles(response.data);
			})
			.catch((err) => console.log(err));
	}

	const handlePriceSliderChange = (event, newValue, activeThumb) => {
		if (activeThumb === 0) {
			const new_0 = Math.min(
				newValue[0],
				priceSliderValue[1] - minDistancePrice
			);
			console.log("NEW 0:" + new_0);
			sendSliderRequest("price", new_0, priceSliderValue[1]);
			setPriceSliderValue([new_0, priceSliderValue[1]]);
		} else {
			const new_1 = Math.max(
				newValue[1],
				priceSliderValue[0] + minDistancePrice
			);
			sendSliderRequest("price", priceSliderValue[0], new_1);
			setPriceSliderValue([priceSliderValue[0], new_1]);
		}
	};

	const handleYearSliderChange = (event, newValue, activeThumb) => {
		if (activeThumb === 0) {
			const new_0 = Math.min(newValue[0], yearSliderValue[1] - minDistanceYear);
			sendSliderRequest("year", new_0, yearSliderValue[1]);
			setYearSliderValue([new_0, yearSliderValue[1]]);
		} else {
			const new_1 = Math.max(newValue[1], yearSliderValue[0] + minDistanceYear);
			sendSliderRequest("year", yearSliderValue[0], new_1);
			setYearSliderValue([yearSliderValue[0], new_1]);
		}
	};

	function handleYearChange(e) {
		if (e.target.checked) {
			setDealsChecked(false);
			setPriceChecked(false);
			setRatingChecked(false);
			setYearChecked(true);
			handleSortRequest("year");
		} else {
			setSortByAxios("year");
			setYearChecked(false);
			handleSortRequest("");
		}
	}

	function handlePriceChange(e) {
		if (e.target.checked) {
			setDealsChecked(false);
			setRatingChecked(false);
			setYearChecked(false);
			setPriceChecked(true);
			handleSortRequest("price");
		} else {
			setSortByAxios("price");
			setPriceChecked(false);
			handleSortRequest("");
		}
	}

	function handleDealsChange(e) {
		if (e.target.checked) {
			setYearChecked(false);
			setPriceChecked(false);
			setRatingChecked(false);
			setDealsChecked(true);
		} else {
			setDealsChecked(false);
		}
	}

	function handleRatingChange(e) {
		if (e.target.checked) {
			setDealsChecked(false);
			setPriceChecked(false);
			setYearChecked(false);
			setRatingChecked(true);
		} else {
			setRatingChecked(false);
		}
	}

	return (
		<div ref={sideBarRef} className="view-vehicles-side-bar">
			<div className="filter-vehicle price">
				<div className="title-and-image-filter-container 1">
					<div className="filter-vehicle-title-wrapper price">
						<img src={priceTag}></img>
						<div className="title-filter-wrapper price">
							<h3 className="filter-vehicle-title 1">Price</h3>
						</div>
					</div>
				</div>
				<div>
					<Slider
						value={priceSliderValue}
						onChange={handlePriceSliderChange}
						valueLabelDisplay="auto"
						getAriaValueText={valuetext}
						disableSwap
						min={30000}
						max={100000}
					/>
				</div>
			</div>
			<div className="filter-vehicle year">
				<div className="title-and-image-filter-container 2">
					<div className="filter-vehicle-title-wrapper calendar">
						<img src={calendar} />
						<div className="title-filter-wrapper calendar">
							<h3 className="filter-vehicle-title 2">Year</h3>
						</div>
					</div>
				</div>
				<div>
					<Slider
						value={yearSliderValue}
						onChange={handleYearSliderChange}
						valueLabelDisplay="auto"
						getAriaValueText={valuetext}
						disableSwap
						max={2025}
						min={2000}
					/>
				</div>
			</div>
			<div className="filter-vehicle colour">
				<div className="title-and-image-filter-container 3">
					<div className="filter-vehicle-title-wrapper paint">
						<img src={paint} />
						<div className="title-filter-wrapper colour">
							<h3 className="filter-vehicle-title 3">Colour</h3>
						</div>
					</div>
				</div>
				<div className="color-filter-choices-container">
					{car_colours.map((colour, i) => (
						<div
							className={`colour-filter-choice ${
								activeColours.includes(colour.colour) ? "active" : ""
							} ${i}`}
							style={{ backgroundColor: `${colour.hex}` }}
							id={`${colour.colour}`}
							onClick={handleColourClick}
							key={`${colour.colour} ${i}`}
						></div>
					))}
				</div>
			</div>

			<div className="sort-by-container">
				<h3 className="sort-by-title">Sort By:</h3>
				<div className="sorting-checkbox-container">
					<div className="sorting-checkbox 1">
						<input
							id="priceId"
							className="sort-by-checkbox Price"
							type="checkbox"
							onChange={handlePriceChange}
							checked={priceChecked}
						/>
						<label htmlFor="priceId">Price</label>
					</div>
					<div className="sorting-checkbox 2">
						<input
							id="yearId"
							className="sort-by-checkbox Year"
							type="checkbox"
							onChange={handleYearChange}
							checked={yearChecked}
						/>
						<label htmlFor="yearId">Year</label>
					</div>
					<div className="sorting-checkbox 3">
						<input
							id="yearId"
							className="sort-by-checkbox Rating"
							type="checkbox"
							onChange={handleRatingChange}
							checked={ratingChecked}
						/>
						<label htmlFor="ratingId">Rating</label>
					</div>
					<div className="sorting-checkbox 4">
						<input
							id="dealId"
							className="sort-by-checkbox Deals"
							type="checkbox"
							onChange={handleDealsChange}
							checked={dealsChecked}
						/>
						<label htmlFor="dealId">Deals</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ViewVehiclesSideBar;
