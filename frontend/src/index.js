// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewVehicles from "./features/Inventory/ViewVehicles";
import LoanCalculator from "./features/LoanCalculator/LoanCalculator";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext.jsx";
import Checkout from "./features/Cart/Checkout.jsx";
import AddVehicle from "./features/Admin/AddVehicle.jsx";
import Login from "./features/Authentication/Login.jsx";
import Register from "./features/Authentication/Register.jsx";
import AdminDashboard from "./features/Admin/AdminDashboard.jsx";
import CompareVehicles from "./features/CompareVehicles/CompareVehicles.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<ShoppingCartProvider>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<App />} />
						<Route path="/inventory" element={<ViewVehicles />} />
						<Route path="/calculator" element={<LoanCalculator />} />
						<Route path="/checkout" element={<Checkout />} />
						<Route path="/addvehicle" element={<AddVehicle />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/admin" element={<AdminDashboard />} />
						<Route path="/compare" element={<CompareVehicles />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</ShoppingCartProvider>
	</React.StrictMode>
);

reportWebVitals();
