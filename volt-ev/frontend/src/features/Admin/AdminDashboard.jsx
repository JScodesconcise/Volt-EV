import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const dummyVehicles = [
  {
    id: 1,
    name: "Model R",
    year: 2023,
    price: 59955,
    range: "500km",
    acceleration: "3.1s",
    drivetrain: "AWD",
    color: "Black",
  },
];

const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState(dummyVehicles);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>

        <div className="admin-actions">
          <button className="report-btn" onClick={() => navigate("/usage-report")}>
            Usage Report
          </button>
          <button className="report-btn" onClick={() => navigate("/sales-report")}>
            Sales Report
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <button className="add-btn">Add Vehicle</button>

      <div className="vehicle-table">
        <div className="table-header">
          <span>Model</span>
          <span>Year</span>
          <span>Price</span>
          <span>Range</span>
          <span>Acceleration</span>
          <span>Drivetrain</span>
          <span>Color</span>
          <span>Actions</span>
        </div>

        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="table-row">
            <span>{vehicle.name}</span>
            <span>{vehicle.year}</span>
            <span>${vehicle.price}</span>
            <span>{vehicle.range}</span>
            <span>{vehicle.acceleration}</span>
            <span>{vehicle.drivetrain}</span>
            <span>{vehicle.color}</span>
            <span>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
