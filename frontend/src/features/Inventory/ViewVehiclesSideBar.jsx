import "./viewvehiclessidebar.css";
import { useState, useRef } from "react";
import priceTag from "../../Media/Vector.svg";
import paint from "../../Media/palette.svg";
import calendar from "../../Media/Group 1.svg";
import axios from "axios";
import { Slider } from "@mui/material";
import { useDebouncedCallback } from "../../hooks/useDebouncedCallback.jsx";

function ViewVehiclesSideBar({
	vehicles,
	setVehicles,
	compareChecked,
	setCompareChecked,
}) {
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

	const getDealParam = () => (dealsChecked ? "&deal=true" : "");

	const debouncedQueryYear = useDebouncedCallback((filters) => {
		axios
			.get(
				`http://localhost:8080/vehicle/getVehicles?page=0` +
					`&sortBy=${filters.sortBy}` +
					`&colours=${filters.resultString}` +
					`&startYear=${filters.firstVal}&endYear=${filters.secondVal}` +
					`&startPrice=${priceSliderValue[0]}&endPrice=${priceSliderValue[1]}` +
					getDealParam()
			)
			.then((response) => setVehicles(response.data))
			.catch((err) => console.log(err));
	}, 300);

	const debouncedQueryPrice = useDebouncedCallback((filters) => {
		axios
			.get(
				`http://localhost:8080/vehicle/getVehicles?page=0` +
					`&sortBy=${filters.sortBy}` +
					`&colours=${filters.resultString}` +
					`&startYear=${yearSliderValue[0]}&endYear=${yearSliderValue[1]}` +
					`&startPrice=${filters.firstVal}&endPrice=${filters.secondVal}` +
					getDealParam()
			)
			.then((response) => setVehicles(response.data))
			.catch((err) => console.log(err));
	}, 300);

	function valuetext(value) {
		return `${value}°C`;
	}

	function sendSliderRequest(type, firstVal, secondVal) {
		const resultString =
			activeColours.length === 0 ? "" : activeColours.join("&colours=");
		const filters = {
			sortBy: sortByAxios,
			resultString,
			firstVal,
			secondVal,
		};
		type === "year"
			? debouncedQueryYear(filters)
			: debouncedQueryPrice(filters);
	}

	function handleSortRequest(sortBy) {
		const resultString =
			activeColours.length === 0 ? "" : activeColours.join("&colours=");
		axios
			.get(
				`http://localhost:8080/vehicle/getVehicles?page=0` +
					`&sortBy=${sortBy}` +
					`&colours=${resultString}` +
					`&startPrice=${priceSliderValue[0]}&endPrice=${priceSliderValue[1]}` +
					`&startYear=${yearSliderValue[0]}&endYear=${yearSliderValue[1]}` +
					getDealParam()
			)
			.then((response) => setVehicles(response.data))
			.catch((err) => console.log(err));
	}

	function handleColourClick(e) {
		const colourId = e.target.id;
		const newColours = activeColours.includes(colourId)
			? activeColours.filter((c) => c !== colourId)
			: [...activeColours, colourId];
		setActiveColours(newColours);

		const resultString = newColours.join("&colours=");
		axios
			.get(
				`http://localhost:8080/vehicle/getVehicles?page=0` +
					`&colours=${resultString}` +
					`&sortBy=${sortByAxios}` +
					`&startPrice=${priceSliderValue[0]}&endPrice=${priceSliderValue[1]}` +
					`&startYear=${yearSliderValue[0]}&endYear=${yearSliderValue[1]}` +
					getDealParam()
			)
			.then((response) => setVehicles(response.data))
			.catch((err) => console.log(err));
	}

	const handlePriceSliderChange = (e, newValue, activeThumb) => {
		if (activeThumb === 0) {
			const new0 = Math.min(
				newValue[0],
				priceSliderValue[1] - minDistancePrice
			);
			sendSliderRequest("price", new0, priceSliderValue[1]);
			setPriceSliderValue([new0, priceSliderValue[1]]);
		} else {
			const new1 = Math.max(
				newValue[1],
				priceSliderValue[0] + minDistancePrice
			);
			sendSliderRequest("price", priceSliderValue[0], new1);
			setPriceSliderValue([priceSliderValue[0], new1]);
		}
	};

	const handleYearSliderChange = (e, newValue, activeThumb) => {
		if (activeThumb === 0) {
			const new0 = Math.min(newValue[0], yearSliderValue[1] - minDistanceYear);
			sendSliderRequest("year", new0, yearSliderValue[1]);
			setYearSliderValue([new0, yearSliderValue[1]]);
		} else {
			const new1 = Math.max(newValue[1], yearSliderValue[0] + minDistanceYear);
			sendSliderRequest("year", yearSliderValue[0], new1);
			setYearSliderValue([yearSliderValue[0], new1]);
		}
	};

	function handleYearChange(e) {
		if (e.target.checked) {
			setDealsChecked(false);
			setPriceChecked(false);
			setRatingChecked(false);
			setYearChecked(true);
			setSortByAxios("year");
			handleSortRequest("year");
		} else {
			setYearChecked(false);
			setSortByAxios("");
			handleSortRequest("");
		}
	}

	function handlePriceChange(e) {
		if (e.target.checked) {
			setDealsChecked(false);
			setRatingChecked(false);
			setYearChecked(false);
			setPriceChecked(true);
			setSortByAxios("price");
			handleSortRequest("price");
		} else {
			setPriceChecked(false);
			setSortByAxios("");
			handleSortRequest("");
		}
	}

	function handleDealsChange(e) {
		const checked = e.target.checked;
		setYearChecked(false);
		setPriceChecked(false);
		setRatingChecked(false);
		setDealsChecked(checked);

		handleSortRequest(sortByAxios);
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
						<img src={priceTag} alt="Price icon" />
						<h3 className="filter-vehicle-title 1">Price</h3>
					</div>
				</div>
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
			<div className="filter-vehicle year">
				<div className="title-and-image-filter-container 2">
					<div className="filter-vehicle-title-wrapper calendar">
						<img src={calendar} alt="Year icon" />
						<h3 className="filter-vehicle-title 2">Year</h3>
					</div>
				</div>
				<Slider
					value={yearSliderValue}
					onChange={handleYearSliderChange}
					valueLabelDisplay="auto"
					getAriaValueText={valuetext}
					disableSwap
					min={2000}
					max={2025}
				/>
			</div>
			<div className="filter-vehicle colour">
				<div className="title-and-image-filter-container 3">
					<div className="filter-vehicle-title-wrapper paint">
						<img src={paint} alt="Colour icon" />
						<h3 className="filter-vehicle-title 3">Colour</h3>
					</div>
				</div>
				<div className="color-filter-choices-container">
					{car_colours.map((c, i) => (
						<div
							key={i}
							id={c.colour}
							className={`colour-filter-choice ${
								activeColours.includes(c.colour) ? "active" : ""
							} ${i}`}
							style={{ backgroundColor: c.hex }}
							onClick={handleColourClick}
						/>
					))}
				</div>
			</div>
			<div className="sort-by-container">
				<h3 className="sort-by-title">Sort By:</h3>
				<div className="sorting-checkbox-container">
					<label>
						<input
							type="checkbox"
							checked={priceChecked}
							onChange={handlePriceChange}
						/>{" "}
						Price
					</label>
					<label>
						<input
							type="checkbox"
							checked={yearChecked}
							onChange={handleYearChange}
						/>{" "}
						Year
					</label>
					<label>
						<input
							type="checkbox"
							checked={dealsChecked}
							onChange={handleDealsChange}
						/>{" "}
						Deals
					</label>
				</div>
			</div>
			<div className="compare-two-vehicles">
				<h3 className="compare-vehicles-title">Compare:</h3>
				<input
					type="checkbox"
					checked={compareChecked}
					onClick={() => setCompareChecked(!compareChecked)}
				/>
			</div>
		</div>
	);
}

export default ViewVehiclesSideBar;
