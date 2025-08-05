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
import UsageReportChart from "./features/Admin/UsageReportChart.jsx";
import SalesReport from "./features/Admin/SalesReport.jsx";
import UsageTracker from "./features/Admin/UsageTracker.jsx";
import VehicleDetails from "./features/Inventory/VehicleDetails.jsx";
import Chatbot from "./features/Chatbot/Chatbot.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<ShoppingCartProvider>
			<AuthProvider>
				<BrowserRouter>
					<UsageTracker />
					<Chatbot />
					<Routes>
						<Route path="/" element={<App />} />
						<Route path="/inventory" element={<ViewVehicles />} />
						<Route path="/calculator" element={<LoanCalculator />} />
						<Route path="/checkout" element={<Checkout />} />
						<Route path="/addvehicle" element={<AddVehicle />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/admin" element={<AdminDashboard />} />
						<Route path="/usage-report" element={<UsageReportChart />} />
						<Route path="/sales-report" element={<SalesReport />} />
						<Route path="/compare" element={<CompareVehicles />} />
						<Route path="/details/:vehicleId" element={<VehicleDetails />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</ShoppingCartProvider>
	</React.StrictMode>
);

reportWebVitals();
