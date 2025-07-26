import { useDropzone } from "react-dropzone";
<<<<<<< HEAD
import { useState, useEffect, useRef, useMemo } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> 9cbf8dbac4d4600256eab4e2e5cacd963708b4f1
import axios from "axios";
import "./addvehicles.css";

function AddVehicle() {
	const [files, setFiles] = useState([]);
<<<<<<< HEAD
	const fileRef = useRef(null);

	const baseStyle = {
		backgroundColor: "#E0E5E9",
		height: "100px",
		width: "100%",
		border: "2px dashed black",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};
	const focusedStyle = {};
	const acceptStyle = {};
	const rejectStyle = {};
=======

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
>>>>>>> 9cbf8dbac4d4600256eab4e2e5cacd963708b4f1

	useEffect(() => {
		return () => {
			files.forEach((element) => {
<<<<<<< HEAD
				URL.revokeObjectURL(element);
=======
				URL.removeObjectURL(element);
>>>>>>> 9cbf8dbac4d4600256eab4e2e5cacd963708b4f1
			});
		};
	}, [files]);

<<<<<<< HEAD
	const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
		useDropzone({
			accept: { "image/*": [] },
			onDrop: (acceptedFiles) => {
				setFiles(
					acceptedFiles.map((obj) => {
						return Object.assign(obj, { preview: URL.createObjectURL(obj) });
					})
				);
				if (fileRef.current) {
					const dt = new DataTransfer();
					acceptedFiles.forEach((file) => {
						dt.items.add(file);
					});
					fileRef.current.files = dt.files;
				}
			},
		});

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isFocused ? focusedStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isFocused, isDragAccept, isDragReject]
	);

	function handleFormSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		console.log(formData);
		axios
			.post("http://localhost:8080/addvehicle/upload", formData)
=======
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
>>>>>>> 9cbf8dbac4d4600256eab4e2e5cacd963708b4f1
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	}
<<<<<<< HEAD
	return (
		<div className="add-vehicles-container">
			<div className="add-vehicles-form-wrapper">
				<form className="add-vehicle-form" onSubmit={handleFormSubmit}>
					<h1 className="add-vehicle-title">Add New Vehicles</h1>
					<div {...getRootProps({ className: "dropzone" })} style={style}>
						<input
							name="image"
							type="file"
							ref={fileRef}
							className="add-vehicles-file-input"
						/>
						<input {...getInputProps()} />
						<h2>Click to Upload image</h2>
					</div>
					<div>
						{files.map((file) => (
							<img
								src={file.preview}
								onLoad={() => URL.revokeObjectURL(file)}
								alt="car"
								key={`vehicle-image`}
								className="add-vehicle-dropzone-image"
							/>
						))}
					</div>

					<label for="price" className="add-vehicles-input-label price">
						Price
					</label>
					<input
						type="text"
						id="price"
						name="price"
						className="add-vehicles-text-input price"
					/>
					<label for="colour" className="add-vehicles-input-label price">
						Colour
					</label>
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
					<label
						for="drivetrain"
						className="add-vehicles-input-label drivetrain"
					>
						Drivetrain
					</label>
					<select id="drivetrain" name="drivetrain">
						<option value="AWD">AWD</option>
						<option value="RWD">RWD</option>
						<option value="FWD">FWD</option>
					</select>
					<label for="year" className="add-vehicles-input-label year">
						Year
					</label>
					<input
						id="year"
						name="year"
						className="add-vehicles-text-input year"
					/>
					<label for="range" className="add-vehicles-input-label range">
						Range
					</label>
					<input
						id="range"
						name="range"
						className="add-vehicles-text-input range"
					/>
					<label
						for="horsepower"
						className="add-vehicles-input-label horsepower"
					>
						Horsepower
					</label>
					<input
						id="horsepower"
						name="horespower"
						className="add-vehicles-text-input horsepower"
					/>
					<label
						for="acceleration"
						className="add-vehicles-input-label acceleration"
					>
						Acceleration
					</label>
					<input
						id="acceleration"
						name="acceleration"
						className="add-vehicles-text-input acceleration"
					/>
					<label for="battery" className="add-vehicles-input-label battery">
						Battery
					</label>
					<input
						id="battery"
						name="battery"
						className="add-vehicles-text-input battery"
					/>
					<label for="charging" className="add-vehicles-input-label charging">
						Charging
					</label>
					<input
						id="charging"
						name="charging"
						className="add-vehicles-text-input charging"
					/>
					<label
						for="efficiency"
						className="add-vehicles-input-label efficiency"
					>
						Efficiency
					</label>
					<input
						id="efficiency"
						name="efficiency"
						className="add-vehicles-text-input efficiency"
					/>

					<button type="submit" className="submit-button-add-vehicle">
						Add Vehicle
					</button>
				</form>
			</div>
		</div>
=======
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
>>>>>>> 9cbf8dbac4d4600256eab4e2e5cacd963708b4f1
	);
}
export default AddVehicle;
