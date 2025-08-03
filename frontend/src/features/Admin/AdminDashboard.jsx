import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import AddVehicle from "./AddVehicle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);
  const navigate = useNavigate();

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/vehicle/getVehicles");
      setVehicles(response.data.content || response.data);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleLogout = () => {
    window.location.href = "/login";
  };

  const confirmDelete = (id) => {
    setSelectedVehicleId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/vehicle/delete/${selectedVehicleId}`);
      toast.success("Vehicle deleted successfully");
      setShowDeleteModal(false);
      fetchVehicles();
    } catch (err) {
      console.error("Failed to delete vehicle:", err);
      toast.error("Failed to delete vehicle");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/vehicle/edit/${editVehicle.id}`, editVehicle);
      toast.success("Vehicle updated successfully");
      setShowEditModal(false);
      fetchVehicles();
    } catch (err) {
      console.error("Failed to update vehicle:", err);
      toast.error("Failed to update vehicle");
    }
  };

  return (
    <div className="admin-container">
      <ToastContainer />
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

      <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? "Close Form" : "Add Vehicle"}
      </button>

      {showAddForm && <AddVehicle onAddSuccess={fetchVehicles} />}

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

        {vehicles.map((vehicle) => {
          console.log("Vehicle from backend:", vehicle);
          return (
            <div key={vehicle.id} className="table-row">
              <span>{vehicle.model}</span>
              <span>{vehicle.year}</span>
              <span>${vehicle.price}</span>
              <span>{vehicle.range}</span>
              <span>{vehicle.acceleration}</span>
              <span>{vehicle.drivetrain}</span>
              <span>{vehicle.colour}</span>
              <span>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditVehicle(vehicle);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button className="delete-btn" onClick={() => confirmDelete(vehicle.id)}>
                  Delete
                </button>
              </span>
            </div>
          );
        })}
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this vehicle?</p>
            <div className="modal-buttons">
              <button onClick={handleDelete} className="confirm-btn">Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editVehicle && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Vehicle</h3>
            <form onSubmit={handleEditSubmit}>
  <label>Model:</label>
  <input
    type="text"
    value={editVehicle.model || ""}
    onChange={(e) => setEditVehicle({ ...editVehicle, model: e.target.value })}
  />

  <label>Year:</label>
  <input
    type="number"
    value={editVehicle.year}
    onChange={(e) => setEditVehicle({ ...editVehicle, year: parseInt(e.target.value) })}
  />

  <label>Price:</label>
  <input
    type="number"
    value={editVehicle.price}
    onChange={(e) => setEditVehicle({ ...editVehicle, price: parseInt(e.target.value) })}
  />

  <label>Drivetrain:</label>
  <input
    type="text"
    value={editVehicle.drivetrain}
    onChange={(e) => setEditVehicle({ ...editVehicle, drivetrain: e.target.value })}
  />

  <label>Colour:</label>
  <input
    type="text"
    value={editVehicle.colour}
    onChange={(e) => setEditVehicle({ ...editVehicle, colour: e.target.value })}
  />

  <label>Range:</label>
  <input
    type="number"
    value={editVehicle.range}
    onChange={(e) => setEditVehicle({ ...editVehicle, range: parseInt(e.target.value) })}
  />

  <label>Acceleration:</label>
  <input
    type="number"
    value={editVehicle.acceleration}
    onChange={(e) => setEditVehicle({ ...editVehicle, acceleration: parseInt(e.target.value) })}
  />

  <label>Horsepower:</label>
  <input
    type="number"
    value={editVehicle.horsepower}
    onChange={(e) => setEditVehicle({ ...editVehicle, horsepower: parseInt(e.target.value) })}
  />

  <label>Battery:</label>
  <input
    type="number"
    value={editVehicle.battery}
    onChange={(e) => setEditVehicle({ ...editVehicle, battery: parseInt(e.target.value) })}
  />

  <label>Charging:</label>
  <input
    type="number"
    value={editVehicle.charging}
    onChange={(e) => setEditVehicle({ ...editVehicle, charging: parseInt(e.target.value) })}
  />

  <label>Efficiency:</label>
  <input
    type="number"
    value={editVehicle.efficiency}
    onChange={(e) => setEditVehicle({ ...editVehicle, efficiency: parseInt(e.target.value) })}
  />

  <div className="modal-buttons">
    <button type="submit" className="confirm-btn">Save Changes</button>
    <button type="button" onClick={() => setShowEditModal(false)} className="cancel-btn">Cancel</button>
  </div>
</form>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
