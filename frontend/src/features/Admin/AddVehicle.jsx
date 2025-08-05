import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import "./addvehicles.css";

function AddVehicle() {
	const navigate = useNavigate();
	const [files, setFiles] = useState([]);
	const [backgroundFile, setBackgroundFile] = useState([]);
	const fileRef = useRef(null);
	const backgroundFileRef = useRef(null);

	const baseStyle = {
		backgroundColor: "#E0E5E9",
		height: "100px",
		width: "100%",
		border: "2px dashed black",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};
	const commonOps = {
		accept: { "image/*": [] },
		maxFiles: 1,
	};

	const onDropVehicle = (acceptedFiles) => {
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
	};
	const onDropBackground = (acceptedFiles) => {
		setBackgroundFile(
			acceptedFiles.map((obj) => {
				return Object.assign(obj, { preview: URL.createObjectURL(obj) });
			})
		);
		if (fileRef.current) {
			const dt = new DataTransfer();
			acceptedFiles.forEach((file) => {
				dt.items.add(file);
			});
			backgroundFileRef.current.files = dt.files;
		}
	};

	const focusedStyle = {};
	const acceptStyle = {};
	const rejectStyle = {};

	useEffect(() => {
		return () => {
			files.forEach((element) => {
				URL.revokeObjectURL(element);
			});
		};
	}, [files]);

	const {
		getRootProps: getVehicleRootProps,
		getInputProps: getVehicleInputProps,
		isFocused,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		commonOps,
		onDrop: onDropVehicle,
	});

	const {
		getRootProps: getBackgroundRootProps,
		getInputProps: getBackgroundInputProps,
	} = useDropzone({
		commonOps,
		onDrop: onDropBackground,
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
			.post("http://localhost:8080/vehicle/upload", formData)
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	return (
		<div className="add-vehicles-container">
			<div className="add-vehicles-form-wrapper">
				<form className="add-vehicle-form" onSubmit={handleFormSubmit}>
					<h1 className="add-vehicle-title">Add New Vehicles</h1>
					<h2 className="add-vehicles-dropzone-title vehicle">
						Vehicle Card Image
					</h2>
					<div
						{...getVehicleRootProps({ className: "dropzone 1" })}
						style={style}
					>
						<input
							name="image"
							type="file"
							ref={fileRef}
							className="add-vehicles-file-input"
						/>
						<input {...getVehicleInputProps()} />
						<h2>Click to Upload image</h2>
					</div>

					<div className="files-wrapper-add-vehicle vehicle">
						{files.map((file) => (
							<img
								src={file.preview}
								onLoad={() => URL.revokeObjectURL(file)}
								alt="car"
								key={`vehicle-image`}
								className="add-vehicle-dropzone-image vehicle"
							/>
						))}
					</div>
					<h2 className="add-vehicles-dropzone-title background">
						Vehicle Background Image
					</h2>
					<div
						{...getBackgroundRootProps({ className: "dropzone 2" })}
						style={style}
					>
						<input
							name="backgroundImage"
							type="file"
							ref={backgroundFileRef}
							className="add-vehicles-file-input background"
						/>
						<input {...getBackgroundInputProps()} />
						<h2>Click to Upload image</h2>
					</div>
					<div className="files-wrapper-add-vehicle background">
						{backgroundFile.map((file) => (
							<img
								src={file.preview}
								onLoad={() => URL.revokeObjectURL(file)}
								alt="car"
								key={`vehicle-image`}
								className="add-vehicle-dropzone-image"
							/>
						))}
					</div>
					<label for="tite" className="add-vehicles-input-label title">
						Title
					</label>
					<input
						type="text"
						id="title"
						name="title"
						className="add-vehicles-text-input title"
					/>
					<label for="price" className="add-vehicles-input-label price">
						Price
					</label>
					<input
						type="text"
						id="price"
						name="price"
						className="add-vehicles-text-input price"
					/>
					<label for="colour" className="add-vehicles-input-label colour">
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
					<label for="colour" className="add-vehicles-input-label Deal">
						Deal
					</label>
					<select id="color" name="deal">
						<option value="true">Yes</option>
						<option value="false">No</option>
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
	);
}
export default AddVehicle;
