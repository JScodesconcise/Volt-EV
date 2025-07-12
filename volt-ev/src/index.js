import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router";
import ViewVehicles from "./features/Inventory/ViewVehicles";
import LoanCalculator from "./features/LoanCalculator/LoanCalculator";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext.jsx";
import Checkout from "./features/Cart/Checkout.jsx";
import AddVehicle from "./features/Admin/AddVehicle.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<ShoppingCartProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/inventory" element={<ViewVehicles />}></Route>
					<Route path="/calculator" element={<LoanCalculator />}></Route>
					<Route path="/checkout" element={<Checkout />}></Route>
					<Route path="/" element={<App />} />
					<Route path="/addvehicle" element={<AddVehicle />} />
				</Routes>
			</BrowserRouter>
		</ShoppingCartProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
