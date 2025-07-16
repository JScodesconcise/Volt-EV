import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import axios from "axios";
import "./addvehicles.css";

function AddVehicle() {
	const [files, setFiles] = useState([]);

	const { getRootProps, getInputProps } = useDropzone({
		accept: { "image/*": [] },
		onDrop: (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((obj) => {
					return Object.assign(obj, { preview: URL.createObjectURL(obj) });
				})
			);
		},
	});

	useEffect(() => {
		return () => {
			files.forEach((element) => {
				URL.removeObjectURL(element);
			});
		};
	}, [files]);

	function handleFormSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);

		const formValues = {
			image: formData.get("image"),
			price: formData.get("price"),
			colour: formData.get("colour"),
			drivetrain: formData.get("drivetrain"),
			year: formData.get("year"),
			range: formData.get("range"),
			horsepower: formData.get("horsepower"),
			acceleration: formData.get("acceleration"),
			battery: formData.get("battery"),
			charging: formData.get("charging"),
			efficiency: formData.get("efficiency"),
		};
		console.log(formValues);

		axios
			.post("http://localhost:8080/addvehicle/", {
				image: formData.get("image"),
				price: formData.get("price"),
				colour: formData.get("colour"),
				drivetrain: formData.get("drivetrain"),
				year: formData.get("year"),
				range: formData.get("range"),
				horsepower: formData.get("horsepower"),
				acceleration: formData.get("acceleration"),
				battery: formData.get("battery"),
				charging: formData.get("charging"),
				efficiency: formData.get("efficiency"),
			})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function handleButtonClick() {
		axios.get("http://");
	}
	return (
		<form className="add-vehicle-form" onSubmit={handleFormSubmit}>
			<div {...getRootProps({ className: "dropzone" })}>
				<label for="image"></label>
				<input id="image" name="image" {...getInputProps()} />
				{files.map((file) => (
					<img
						src={file.preview}
						onLoad={() => URL.revokeObjectURL(file)}
						alt="car"
					/>
				))}
			</div>
			<label for="price">Price</label>
			<input type="text" id="price" name="price" />
			<label for="colour">Colour</label>
			<select id="color" name="colour">
				<option value="white">White</option>
				<option value="black">Black</option>
				<option value="navy">Navy</option>
				<option value="beige">Beige</option>
				<option value="orange">Orange</option>
				<option value="gray">Gray</option>
				<option value="green">Green</option>
				<option value="blue">Blue</option>
			</select>
			<label for="drivetrain">Drivetrain</label>
			<select id="drivetrain" name="drivetrain">
				<option value="AWD">AWD</option>
				<option value="RWD">AWD</option>
				<option value="FWD">AWD</option>
			</select>
			<label for="year">Year</label>
			<input id="year" name="year" />
			<label for="range">Range</label>
			<input id="range" name="range" />
			<label for="horsepower">Horsepower</label>
			<input id="horsepower" name="horespower" />
			<label for="acceleration">Acceleration</label>
			<input id="acceleration" name="acceleration" />
			<label for="battery">Battery</label>
			<input id="battery" name="battery" />
			<label for="charging">Charging</label>
			<input id="charging" name="charging" />
			<label for="efficiency">Efficiency</label>
			<input id="efficiency" name="efficiency" />

			<button type="submit">Add Vehicle</button>
			<button onClick={handleButtonClick}></button>
		</form>
	);
}
export default AddVehicle;
