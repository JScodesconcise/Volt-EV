import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import "./addvehicles.css";

function AddVehicle() {
	const [files, setFiles] = useState([]);

	const { getRootProps, getInputProps } = useDropzone({
		accept: { "image/*": [] },
		onDrop: (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((obj) => {
					Object.assign(obj, { preview: URL.createObjectURL(obj) });
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

	function handleFormSubmit(e) {}
	return (
		<form onSubmit={handleFormSubmit}>
			<div {...getRootProps({ className: "dropzone" })}>
				<label for="image" />
				<input id="image" name="image" {...getInputProps()} />
				{files.map((file) => (
					<img src={file.preview} onLoad={() => URL.removeObjectURL(file)} />
				))}
				<label for="price">Price</label>
				<input type="text" id="price" name="price" />
				<label for="color">Colour</label>
				<select id="color" name="color">
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
				<input id="year" />
				<label for="range">Range</label>
				<input id="range" />
				<label for="horsepower">Horsepower</label>
				<input id="horsepower" />
				<label for="acceleration">Acceleration</label>
				<input id="aceleration" />
				<label for="battery">Battery</label>
				<input id="battery" />
				<label for="charging">Charging</label>
				<input id="charging" />
				<label for="efficiency">Efficiency</label>
				<input id="efficiency" />
			</div>
			<button type="submit"></button>
		</form>
	);
}
export default AddVehicle;
